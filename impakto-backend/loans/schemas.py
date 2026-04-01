from ninja import Schema
from typing import Optional
from datetime import datetime

class LoanEligibilityOut(Schema):
    is_eligible: bool
    max_amount: float
    interest_rate: float
    repayment_duration_days: int
    reason: Optional[str] = None

class LoanRequestIn(Schema):
    requested_amount: float

class LoanOut(Schema):
    id: int
    principal_amount: float
    interest_rate: float
    repayment_duration_days: int
    status: str
    outstanding_balance: float
    disbursed_at: Optional[datetime]
    due_date: Optional[datetime]
    created_at: datetime

class RepaymentIn(Schema):
    amount: float
