from django.db import models
from django.conf import settings

class Transaction(models.Model):
    class TransactionType(models.TextChoices):
        INCOME = 'INCOME', 'Income'
        EXPENSE = 'EXPENSE', 'Expense'

    class Category(models.TextChoices):
        # Income categories
        SALES = 'SALES', 'Sales'
        SERVICE_FEE = 'SERVICE_FEE', 'Service Fee'
        OTHER_INCOME = 'OTHER_INCOME', 'Other Income'
        
        # Expense categories
        INVENTORY = 'INVENTORY', 'Inventory/Restock'
        RENT = 'RENT', 'Rent'
        UTILITIES = 'UTILITIES', 'Utilities'
        PAYROLL = 'PAYROLL', 'Payroll'
        MARKETING = 'MARKETING', 'Marketing'
        TRANSPORT = 'TRANSPORT', 'Transport'
        OTHER_EXPENSE = 'OTHER_EXPENSE', 'Other Expense'

    # Link every transaction directly to the MSME who created it
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='transactions'
    )
    
    # max_digits=12 allows up to 9,999,999,999.99
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    
    transaction_type = models.CharField(
        max_length=10, 
        choices=TransactionType.choices
    )
    
    category = models.CharField(
        max_length=20, 
        choices=Category.choices
    )
    
    description = models.TextField(blank=True, null=True)
    
    # The actual date the sale/expense happened (chosen by the user)
    transaction_date = models.DateField()
    
    # Audit timestamps (set automatically by the server)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Automatically sort newest transactions first
        ordering = ['-transaction_date', '-created_at']
        
        # Database indexes make retrieving an MSME's history lightning fast
        indexes = [
            models.Index(fields=['user', 'transaction_date']),
            models.Index(fields=['transaction_type']),
        ]

    def __str__(self):
        return f"{self.user.username} | {self.get_transaction_type_display()} | {self.amount}"