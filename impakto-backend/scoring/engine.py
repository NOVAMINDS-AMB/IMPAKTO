from django.utils import timezone
from datetime import timedelta
from statistics import mean, stdev
from ledger.models import Transaction
from .models import TrustScore

class TrustScoreEngine:
    def __init__(self, user):
        self.user = user
        self.today = timezone.now().date()
        self.thirty_days_ago = self.today - timedelta(days=30)
        
        # Fetch the user's income transactions from the last 30 days
        self.recent_incomes = Transaction.objects.filter(
            user=self.user,
            transaction_type='INCOME',
            transaction_date__gte=self.thirty_days_ago
        ).order_by('transaction_date')

    def calculate_activity_consistency(self):
        """Max 200 points. Based on how many distinct days they logged entries."""
        if not self.recent_incomes.exists(): return 0.0
        
        active_days = self.recent_incomes.values('transaction_date').distinct().count()
        # If they log at least 15 days out of 30, they get perfect consistency
        consistency_ratio = min(active_days / 15.0, 1.0) 
        return round(consistency_ratio * 200, 2)

    def calculate_revenue_stability(self):
        """Max 250 points. Uses Coefficient of Variation (CV) to measure absolute stability."""
        if self.recent_incomes.count() < 2:
            return 0.0 # Not enough data for standard deviation
            
        # Group revenues by day (or week, depending on preference)
        daily_totals = {}
        for tx in self.recent_incomes:
            daily_totals[tx.transaction_date] = daily_totals.get(tx.transaction_date, 0) + float(tx.amount)
            
        amounts = list(daily_totals.values())
        if len(amounts) < 2: return 0.0
        
        mu = mean(amounts)
        if mu == 0: return 0.0
        
        sigma = stdev(amounts)
        cv = sigma / mu  # The magic formula!
        
        # Scoring logic: 
        # CV of 0.0 (Perfect stability) = 250 pts
        # CV of 1.0 or higher (High volatility) = 0 pts
        stability_score = max(0.0, 250 - (cv * 250))
        return round(stability_score, 2)

    def calculate_growth_trend(self):
        """Max 150 points. Compares first 15 days vs last 15 days."""
        fifteen_days_ago = self.today - timedelta(days=15)
        
        first_half = sum(float(tx.amount) for tx in self.recent_incomes if tx.transaction_date < fifteen_days_ago)
        second_half = sum(float(tx.amount) for tx in self.recent_incomes if tx.transaction_date >= fifteen_days_ago)
        
        if first_half == 0: return 50.0 # Base points for just starting
        
        growth_ratio = (second_half - first_half) / first_half
        # Cap growth score at +50% growth
        score = 50.0 + min(max(growth_ratio * 200, 0), 100.0) 
        return round(score, 2)

    def calculate_score(self):
        """Runs all metrics, updates the DB, and returns the TrustScore object."""
        score_obj, created = TrustScore.objects.get_or_create(user=self.user)
        
        # 1. Dynamic Ledger Metrics
        score_obj.activity_consistency = self.calculate_activity_consistency()
        score_obj.revenue_stability = self.calculate_revenue_stability()
        score_obj.growth_trend = self.calculate_growth_trend()
        
        # 2. Static/Profile Metrics (Hardcoded for now until we build KYC & Loans)
        score_obj.verification_strength = 100.0 
        score_obj.repayment_behavior = 150.0 
        
        # 3. Summation
        total = sum([
            score_obj.activity_consistency,
            score_obj.revenue_stability,
            score_obj.growth_trend,
            score_obj.verification_strength,
            score_obj.repayment_behavior
        ])
        
        score_obj.total_score = int(total)
        score_obj.save()
        return score_obj