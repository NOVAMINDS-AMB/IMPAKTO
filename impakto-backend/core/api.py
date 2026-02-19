from ninja import Router
from typing import List

router = Router(tags=["Core"])

@router.get("/portfolio")
def get_portfolio(request):
    # Dummy data combined with your specific User 1 and User 2 demo states
    return