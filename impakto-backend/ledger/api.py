from ninja import Router, File
from ninja.files import UploadedFile
from typing import List
from core.api import AuthBearer
from .models import Transaction
from .schemas import TransactionIn, TransactionOut

# IMPORTANT: If you haven't created ai_service.py yet, this will crash! 
# Make sure ai_service.py exists in the same folder.
from .ai_service import extract_ledger_data 

router = Router(auth=AuthBearer())

@router.post("/activity", response={201: TransactionOut})
def log_transaction(request, payload: TransactionIn):
    """Creates a new transaction linked to the authenticated MSME."""
    transaction = Transaction.objects.create(
        user=request.auth,
        **payload.dict()
    )
    return 201, transaction

@router.get("/activity", response=List[TransactionOut])
def list_transactions(request):
    """Retrieves all transactions for the authenticated MSME."""
    transactions = Transaction.objects.filter(user=request.auth).order_by('-transaction_date')
    return transactions

@router.post("/digitize", response={200: TransactionIn, 400: dict})
def digitize_ledger_image(request, file: UploadedFile = File(...)):
    """
    Receives an image file from the mobile app, passes it to Gemini for OCR,
    and returns the structured JSON data so the user can review it.
    """
    try:
        # Read the raw image bytes
        image_bytes = file.read()
        
        # Pass it to our Gemini AI service
        parsed_data = extract_ledger_data(image_bytes)
        
        # Return the extracted JSON back to React (NOT saving to DB yet)
        return 200, parsed_data
        
    except Exception as e:
        return 400, {"detail": str(e)}