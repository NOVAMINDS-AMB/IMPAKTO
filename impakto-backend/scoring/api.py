from ninja import Router
from.services import TrustScoringService

router = Router(tags=["Scoring"])

@router.get("/{user_id}/score")
def get_trust_score(request, user_id: int):
    # Calls the service layer dynamically
    return TrustScoringService.calculate_trust_signals(user_id)