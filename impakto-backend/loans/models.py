from django.db import models
from django.conf import settings

class Loan(models.Model):
    class LoanStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        APPROVED = 'APPROVED', 'Approved'
        ACTIVE = 'ACTIVE', 'Active'
        REPAID = 'REPAID', 'Repaid'
        DEFAULTED = 'DEFAULTED', 'Defaulted'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='loans'
    )
    
    principal_amount = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage rate, e.g. 5.00 for 5%")
    repayment_duration_days = models.IntegerField(help_text="Duration in days")
    
    status = models.CharField(
        max_length=20,
        choices=LoanStatus.choices,
        default=LoanStatus.PENDING
    )
    
    outstanding_balance = models.DecimalField(max_digits=12, decimal_places=2)
    
    disbursed_at = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Loan {self.id} | {self.user.username} | {self.status} | Balance: {self.outstanding_balance}"
