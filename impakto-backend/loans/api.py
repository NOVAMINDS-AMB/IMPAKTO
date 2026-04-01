from ninja import Router
from django.utils import timezone
from decimal import Decimal
from datetime import timedelta
from django.shortcuts import get_object_or_404
from core.api import AuthBearer
from scoring.models import TrustScore
from .models import Loan
from .schemas import LoanEligibilityOut, LoanRequestIn, LoanOut, RepaymentIn
from .services import simulate_mpesa_disbursement, simulate_mpesa_stk_push
from core.models import MSMEProfile

router = Router(auth=AuthBearer())

@router.get("/eligibility", response=LoanEligibilityOut)
def get_eligibility(request):
    """
    Check if the user is eligible for a loan based on their TrustScore.
    """
    user = request.auth
    
    try:
        score_obj = user.trust_score
        score = score_obj.total_score
    except TrustScore.DoesNotExist:
        # User has no trust score yet
        return 200, LoanEligibilityOut(
            is_eligible=False, 
            max_amount=0, 
            interest_rate=0, 
            repayment_duration_days=0,
            reason="You need to digitize your ledger to build a trust score first."
        )

    # Basic underwriting logic
    if score < 350:
        return 200, LoanEligibilityOut(
            is_eligible=False, 
            max_amount=0, 
            interest_rate=0, 
            repayment_duration_days=0,
            reason="Your trust score is too low to qualify for a loan."
        )
    elif score < 600:
        return 200, LoanEligibilityOut(
            is_eligible=True, 
            max_amount=5000, 
            interest_rate=8.0, 
            repayment_duration_days=30
        )
    elif score < 800:
        return 200, LoanEligibilityOut(
            is_eligible=True, 
            max_amount=15000, 
            interest_rate=6.0, 
            repayment_duration_days=45
        )
    else:
        return 200, LoanEligibilityOut(
            is_eligible=True, 
            max_amount=50000, 
            interest_rate=5.0, 
            repayment_duration_days=90
        )

@router.post("/apply", response={201: LoanOut, 400: dict})
def apply_for_loan(request, payload: LoanRequestIn):
    """
    Apply for a loan. Automatically approves and disburses if eligible and under limit.
    """
    user = request.auth
    
    # Check if they already have an active loan
    active_loan = Loan.objects.filter(user=user, status=Loan.LoanStatus.ACTIVE).first()
    if active_loan:
        return 400, {"detail": "You already have an active loan."}
        
    # Re-evaluate eligibility
    try:
        score_obj = user.trust_score
        score = score_obj.total_score
    except TrustScore.DoesNotExist:
        return 400, {"detail": "No trust score found. Please digitize your ledger."}
        
    max_amount = 0
    interest_rate = 0
    duration_days = 0
    
    if score >= 800:
        max_amount, interest_rate, duration_days = 50000, 5.0, 90
    elif score >= 600:
        max_amount, interest_rate, duration_days = 15000, 6.0, 45
    elif score >= 350:
        max_amount, interest_rate, duration_days = 5000, 8.0, 30
    else:
        return 400, {"detail": "Trust score too low to qualify for a loan."}
        
    if payload.requested_amount > max_amount:
        return 400, {"detail": f"Requested amount exceeds your limit of Kshs {max_amount}."}
        
    # Create the loan (mocking instant approval + disbursement)
    loan = Loan.objects.create(
        user=user,
        principal_amount=payload.requested_amount,
        interest_rate=interest_rate,
        repayment_duration_days=duration_days,
        status=Loan.LoanStatus.ACTIVE,
        outstanding_balance=float(payload.requested_amount) * (1 + (interest_rate/100)), # Simple interest
        disbursed_at=timezone.now(),
        due_date=timezone.now() + timedelta(days=duration_days)
    )
    
    # Simulate M-Pesa Disbursement
    simulate_mpesa_disbursement(user.phone_number or "0700000000", float(payload.requested_amount))
    
    # Update MSME Profile
    profile, _ = MSMEProfile.objects.get_or_create(user=user)
    profile.has_active_loan = True
    profile.save()
    
    return 201, loan

@router.get("/active", response={200: LoanOut, 404: dict})
def get_active_loan(request):
    """
    Fetch the user's currently active loan.
    """
    loan = Loan.objects.filter(user=request.auth, status=Loan.LoanStatus.ACTIVE).first()
    if not loan:
        return 404, {"detail": "No active loan found."}
    return 200, loan

@router.post("/{loan_id}/repay", response={200: LoanOut, 400: dict})
def repay_loan(request, loan_id: int, payload: RepaymentIn):
    """
    Make a payment towards an active loan. Simulates M-Pesa STK push collection.
    """
    loan = get_object_or_404(Loan, id=loan_id, user=request.auth)
    
    if loan.status != Loan.LoanStatus.ACTIVE:
        return 400, {"detail": "This loan is not active."}
        
    if payload.amount <= 0:
        return 400, {"detail": "Repayment amount must be greater than zero."}
        
    # Simulate STK Push
    simulate_mpesa_stk_push(request.auth.phone_number or "0700000000", payload.amount)
    
    # Update Balance
    loan.outstanding_balance -= Decimal(str(payload.amount))
    
    # Check if fully paid
    if loan.outstanding_balance <= 0:
        loan.outstanding_balance = 0
        loan.status = Loan.LoanStatus.REPAID
        
        # Free up user profile to apply for new loans
        if hasattr(request.auth, "msme_profile"):
            request.auth.msme_profile.has_active_loan = False
            request.auth.msme_profile.save()
            
    loan.save()
    return 200, loan
