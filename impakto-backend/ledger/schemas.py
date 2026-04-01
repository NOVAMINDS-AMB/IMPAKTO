from ninja import Schema
from datetime import date, datetime
from typing import Optional
from decimal import Decimal

class TransactionIn(Schema):
    amount: Decimal
    transaction_type: str
    category: str
    transaction_date: date
    description: Optional[str] = None

class TransactionOut(Schema):
    id: int
    amount: Decimal
    transaction_type: str
    category: str
    transaction_date: date
    description: Optional[str] = None
    created_at: datetime