from ninja import Schema
from datetime import datetime

class TrustScoreOut(Schema):
    total_score: int
    activity_consistency: float
    revenue_stability: float
    verification_strength: float
    repayment_behavior: float
    growth_trend: float
    last_calculated: datetime