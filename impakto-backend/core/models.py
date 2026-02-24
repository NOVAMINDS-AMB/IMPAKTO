import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Base user model for all Impakto actors."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    ROLE_CHOICES = (
        ('msme', 'MSME'),
        ('mfi_officer', 'MFI Officer'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='msme')
    phone_number = models.CharField(max_length=20, blank=True)
    
    # Force email to be unique, making it reliable for future logins
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email

class MSMEProfile(models.Model):
    """Specific data for MSME actors."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='msme_profile')
    has_active_loan = models.BooleanField(default=False) 
    
    def __str__(self):
        return f"MSME Profile: {self.user.email}"

class MFIOfficerProfile(models.Model):
    """Specific data for Institutional actors."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mfi_profile')
    employee_id = models.CharField(max_length=50, unique=True) 
    
    # Notification Preferences from MFI Settings
    notify_new_applications = models.BooleanField(default=True)
    notify_overdue_sms = models.BooleanField(default=True)
    notify_weekly_summary = models.BooleanField(default=False)

    def __str__(self):
        return f"MFI Officer: {self.employee_id}"