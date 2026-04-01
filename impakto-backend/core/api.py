from ninja import Router
from django.contrib.auth import authenticate
from .schemas import LoginRequest, LoginResponse, MSMESignupRequest, ProfileResponse, ProfileUpdateRequest
from .models import User, MSMEProfile
import jwt
import datetime
from django.conf import settings
from ninja.security import HttpBearer
from django.shortcuts import get_object_or_404
from ninja import File
from ninja.files import UploadedFile
from .kyc_service import extract_id_data, match_faces

router = Router()

# --- Security: JWT Bearer Token Authenticator ---
class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        if token in ["null", "undefined", ""]:
            print("🛑 AUTH FAILED: Frontend sent an empty or 'null' token string.")
            return None
            
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            print(f"✅ TOKEN DECODED: Looking for user_id -> {user_id}")
            
            user = User.objects.filter(id=user_id).first()
            
            if user:
                print(f"🎉 USER FOUND: Welcome {user.username}")
                return user
            else:
                print("🛑 AUTH FAILED: Token is valid, but this user does NOT exist in the local database!")
                return None
                
        except jwt.ExpiredSignatureError:
            print("🛑 AUTH FAILED: Token has expired.")
            return None
        except jwt.DecodeError:
            print("🛑 AUTH FAILED: Token signature is invalid. (Likely a SECRET_KEY mismatch).")
            return None

# --- Profile Endpoints ---
@router.get("/profile", response=ProfileResponse, auth=AuthBearer())
def get_profile(request):
    user = request.auth # This is the securely authenticated user
    
    has_active_loan = False
    if hasattr(user, 'msme_profile'):
        has_active_loan = user.msme_profile.has_active_loan
        
    return {
        "name": f"{user.first_name} {user.last_name}".strip(),
        "email": user.email,
        "phone": user.phone_number,
        "username": user.username,
        "role": user.role,
        "has_active_loan": has_active_loan
    }

@router.put("/profile", response={200: ProfileResponse, 400: dict}, auth=AuthBearer())
def update_profile(request, data: ProfileUpdateRequest):
    user = request.auth
    
    # 1. Handle Password Update (if requested)
    if data.current_password and data.new_password:
        if user.check_password(data.current_password):
            user.set_password(data.new_password)
        else:
            return 400, {"detail": "Incorrect current password."}
            
    # 2. Update Basic Info
    name_parts = data.name.strip().split(" ", 1)
    user.first_name = name_parts[0]
    user.last_name = name_parts[1] if len(name_parts) > 1 else ""
    user.email = data.email
    user.phone_number = data.phone
    user.username = data.username
    user.save()
    
    # 3. Return updated profile
    has_active_loan = False
    if hasattr(user, 'msme_profile'):
        has_active_loan = user.msme_profile.has_active_loan
        
    return 200, {
        "name": f"{user.first_name} {user.last_name}".strip(),
        "email": user.email,
        "phone": user.phone_number,
        "username": user.username,
        "role": user.role,
        "has_active_loan": has_active_loan
    }

def generate_jwt(user):
    payload = {
        'user_id': str(user.id),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
    }
    # In production, use SECRET_KEY. 
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

@router.post("/login", response={200: LoginResponse, 401: dict})
def login(request, data: LoginRequest):
    user = authenticate(username=data.username, password=data.password)
    
    if user is not None:
        token = generate_jwt(user)
        
        # Prepare the response based on the user's role
        response_data = {
            "token": token,
            "user_id": str(user.id),
            "username": user.username,
            "role": user.role,
        }
        
        # Attach specific profile data (replaces your frontend hardcoded checks)
        if user.role == 'msme' and hasattr(user, 'msme_profile'):
            response_data["has_active_loan"] = user.msme_profile.has_active_loan
        elif user.role == 'mfi_officer' and hasattr(user, 'mfi_profile'):
            response_data["employee_id"] = user.mfi_profile.employee_id
            
        return 200, response_data
    else:
        return 401, {"detail": "Invalid credentials"}
    
@router.post("/signup", response={201: LoginResponse, 400: dict})
def signup(request, data: MSMESignupRequest):
    # 1. Check if email already exists
    if User.objects.filter(email=data.email).exists():
        return 400, {"detail": "A user with this email already exists."}
    
    # 2. Safely split the full name into first and last name
    name_parts = data.name.strip().split(" ", 1)
    first_name = name_parts[0]
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    try:
        # 3. Create the base User
        # Django requires a username. Since emails are unique, it's safest to use the email as the username.
        user = User.objects.create_user(
            username=data.email, 
            email=data.email,
            password=data.password,
            first_name=first_name,
            last_name=last_name,
            phone_number=data.phone,
            role='msme'
        )

        # 4. Create the attached MSME Profile (defaults to no active loan)
        MSMEProfile.objects.create(user=user, has_active_loan=False)

        # 5. Generate token so they don't have to log in again immediately
        token = generate_jwt(user)

        return 201, {
            "token": token,
            "user_id": str(user.id),
            "username": user.username,
            "role": user.role,
            "has_active_loan": False 
        }

    except Exception as e:
        return 400, {"detail": "Failed to create account. Please check your information."}
    
@router.post("/kyc/extract-id", response={200: dict, 400: dict}, auth=AuthBearer())
def kyc_extract_id(request, file: UploadedFile = File(...)):
    """
    Receives an ID card image, passes it to Gemini for OCR, 
    and returns the extracted identity details.
    """
    try:
        image_bytes = file.read()
        
        # Pass to the AI brain
        kyc_data = extract_id_data(image_bytes)
        
        # Here, we could cross-reference kyc_data['first_name'] with request.auth.first_name
        # to ensure the ID matches the person who created the account.
        
        return 200, kyc_data
        
    except Exception as e:
        return 400, {"detail": str(e)}
    
@router.post("/kyc/match-faces", response={200: dict, 400: dict}, auth=AuthBearer())
def kyc_match_faces(request, id_image: UploadedFile = File(...), selfie_image: UploadedFile = File(...)):
    """
    Receives the ID photo and the Selfie photo, compares them, 
    and returns the biometric match confidence.
    """
    try:
        id_bytes = id_image.read()
        selfie_bytes = selfie_image.read()
        
        match_result = match_faces(id_bytes, selfie_bytes)
        return 200, match_result
        
    except Exception as e:
        return 400, {"detail": str(e)}   