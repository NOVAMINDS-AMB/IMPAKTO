from ninja import Schema
from typing import Optional

class LoginRequest(Schema):
    username: str
    password: str

class LoginResponse(Schema):
    token: str
    user_id: str
    username: str
    role: str
    has_active_loan: Optional[bool] = None # Crucial for your ScreenLogin2FA routing
    employee_id: Optional[str] = None
    
class MSMESignupRequest(Schema):
    name: str
    email: str
    phone: str
    password: str
    
class ProfileResponse(Schema):
    name: str
    email: str
    phone: str
    username: str
    role: str
    has_active_loan: Optional[bool] = None

class ProfileUpdateRequest(Schema):
    name: str
    email: str
    phone: str
    username: str
    current_password: Optional[str] = None
    new_password: Optional[str] = None