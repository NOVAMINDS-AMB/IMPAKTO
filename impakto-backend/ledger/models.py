from django.db import models
from django.conf import settings
import uuid

class Activity(models.Model):
    class ActivityType(models.TextChoices):
        SALE = 'SALE', 'Sale'
        HARVEST = 'HARVEST', 'Harvest'
        EXPENSE = 'EXPENSE', 'Expense'
        LEDGER_SCAN = 'LEDGER_SCAN', 'Ledger Scan'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    type = models.CharField(max_length=20, choices=ActivityType.choices)
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField()
    
    # Evidence (The Photo)
    evidence_image = models.ImageField(upload_to='evidence/%Y/%m/', null=True, blank=True)
    
    # Verification Status
    is_verified = models.BooleanField(default=False)
    trust_score_impact = models.FloatField(default=0.0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.type} - {self.amount}"
# Create your models here.
