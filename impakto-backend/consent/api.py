from ninja import Router
from django.shortcuts import get_object_or_404
from.models import ConsentGrant
from scoring.models import TrustProfile

router = Router(tags=["MFI Access"])

@router.get("/view-profile/{grant_id}")
def view_msme_profile(request, grant_id: str):
    # 1. Validate the consent token
    grant = get_object_or_404(ConsentGrant, id=grant_id)
    
    if not grant.is_valid:
        return 403, {"error": "This data sharing link has expired or been revoked."}
    
    # 2. Fetch the MSME's profile securely
    profile = get_object_or_404(TrustProfile, user=grant.owner)
    
    response_data = {
        "msme_id": grant.owner.id,
        "trust_score": profile.trust_score,
        "metrics": {
            "revenue_stability_index": round(profile.rsi_score, 2),
            "verification_strength_index": round(profile.vsi_score, 2),
            "total_activities_logged": profile.total_activities
        },
        "sharing_scope": grant.scope,
        "expires_in_days": (grant.expires_at - grant.created_at).days
    }
    
    # 3. If they granted FULL_LEDGER, we could also attach the activity history here
    # (Leaving this out for the initial test to keep it simple)

    return response_data