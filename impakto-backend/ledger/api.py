# impakto-backend/ledger/api.py

from ninja import Router, Schema, UploadedFile, File, Form
from typing import Optional, List
from django.shortcuts import get_object_or_404
from.models import Activity

router = Router(tags=["Ledger"])

# Pydantic Schema for Input Validation
class ActivitySchema(Schema):
    id: str
    type: str
    amount: Optional[float] = None
    timestamp: str

# Schema for sending data BACK to the frontend
class ActivityResponse(Schema):
    id: str
    type: str
    amount: float
    timestamp: str
    evidence_url: Optional[str] = None
    is_verified: bool

@router.get("/history", response=List)
def get_activity_history(request):
    """
    Retrieves the chronological ledger of activities.
    """
    # Temporary mock user assignment pending full auth integration
    user_id = 1 
    activities = Activity.objects.filter(user_id=user_id).order_by('-timestamp')
    
    return [
        {
            "id": str(a.id),
            "type": a.type,
            "amount": a.amount,
            "timestamp": a.timestamp.isoformat(),
            "evidence_url": request.build_absolute_uri(a.evidence_image.url) if a.evidence_image else None,
            "is_verified": a.is_verified
        }
        for a in activities
    ]

@router.post("/sync")
def sync_activity(
    request, 
    payload: ActivitySchema = Form(...),
    evidence: UploadedFile = File(None)
):
    """
    Synchronizes offline or newly captured activities with the central ledger.
    """
    user_id = 1 # Assigned to default testing user
    
    activity, created = Activity.objects.update_or_create(
        id=payload.id,
        defaults={
            "user_id": user_id,
            "type": payload.type,
            "amount": payload.amount,
            "timestamp": payload.timestamp,
            "evidence_image": evidence
        }
    )

    # Future integration point for asynchronous processing
    # e.g., process_ledger_image.delay(activity.id)
    # e.g., trigger_score_recalculation_event(user_id)

    return {"status": "synced", "server_id": str(activity.id), "created": created}