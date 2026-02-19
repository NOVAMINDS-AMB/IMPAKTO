from django.db import models
from django.conf import settings

class TrustProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="trust_profile")
    
    # 1. Welford's Algorithm Aggregates (For Revenue Stability)
    revenue_count = models.IntegerField(default=0)
    revenue_mean = models.FloatField(default=0.0)
    revenue_m2 = models.FloatField(default=0.0) # Sum of squares of differences
    
    # 2. Verification Aggregates (For Verification Strength)
    total_activities = models.IntegerField(default=0)
    weighted_verification_sum = models.FloatField(default=0.0)

    # 3. Computed Indices
    vsi_score = models.FloatField(default=0.0) # Verification Strength Index
    rsi_score = models.FloatField(default=0.0) # Revenue Stability Index
    
    # 4. Final Composite Score
    trust_score = models.IntegerField(default=0) # Scale 0-100
    
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Score: {self.trust_score}"

# Create your models here.
