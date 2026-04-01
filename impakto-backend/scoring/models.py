from django.db import models
from django.conf import settings

class TrustScore(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trust_score')
    
    # Overall Score (0 - 1000)
    total_score = models.IntegerField(default=300) # Base score for new users
    
    # The 5 Metric Breakdowns
    activity_consistency = models.FloatField(default=0.0)   # Max 200
    revenue_stability = models.FloatField(default=0.0)      # Max 250 (Uses CV)
    verification_strength = models.FloatField(default=100.0)# Max 100 (Default 100 if email/phone verified)
    repayment_behavior = models.FloatField(default=150.0)   # Max 300 (Default 150 for no history)
    growth_trend = models.FloatField(default=0.0)           # Max 150
    
    last_calculated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Score: {self.total_score}"