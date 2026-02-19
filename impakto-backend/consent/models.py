from django.db import models
from django.conf import settings
import uuid
from datetime import timedelta
from django.utils import timezone

def default_expiration():
    return timezone.now() + timedelta(days=7) # Access lasts for 7 days

class ConsentGrant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # The MSME sharing the data
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="granted_consents")
    
    # What data are they sharing? (e.g., just the score, or the full ledger?)
    SCOPE_CHOICES = [
        ('SCORE_ONLY', 'Trust Score Only'),
        ('FULL_LEDGER', 'Full Financial Ledger'),
        ('IDENTITY_ONLY', 'Identity Verification Only'),
    ]
    scope = models.CharField(max_length=20, choices=SCOPE_CHOICES, default='SCORE_ONLY')
    
    expires_at = models.DateTimeField(default=default_expiration)
    is_revoked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_valid(self):
        return not self.is_revoked and self.expires_at > timezone.now()

    def __str__(self):
        return f"Grant {self.id} by {self.owner.username}"