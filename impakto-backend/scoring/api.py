from ninja import Router
from core.api import AuthBearer
from .schemas import TrustScoreOut
from .models import TrustScore
from .engine import TrustScoreEngine

router = Router(auth=AuthBearer())

@router.get("/my-score", response=TrustScoreOut)
def get_trust_score(request):
    """
    Fetches the current trust score. Automatically recalculates 
    it based on the latest ledger entries.
    """
    # Initialize the engine for the logged-in user
    engine = TrustScoreEngine(request.auth)
    
    # Calculate and save the fresh score
    score_obj = engine.calculate_score()
    
    return score_obj