import uuid
import random
from typing import Dict, Any

def simulate_mpesa_disbursement(phone_number: str, amount: float) -> Dict[str, Any]:
    """
    Simulates a B2C M-Pesa transfer from the MFI to the MSME's phone.
    """
    print(f"💰 SIMULATING M-PESA DISBURSEMENT | {amount} KES to {phone_number}")
    transaction_id = f"MPESA_{uuid.uuid4().hex[:8].upper()}"
    return {
        "success": True,
        "transaction_id": transaction_id,
        "amount_disbursed": amount,
        "message": "Funds successfully sent to mobile money account."
    }

def simulate_mpesa_stk_push(phone_number: str, amount: float) -> Dict[str, Any]:
    """
    Simulates an M-Pesa STK Push prompt to collect repayment from the MSME.
    """
    print(f"📲 SIMULATING M-PESA STK PUSH | Requesting {amount} KES from {phone_number}")
    transaction_id = f"MPESA_{uuid.uuid4().hex[:8].upper()}"
    # In a real scenario, this would initiate the prompt, and a webhook would confirm it asynchronously.
    # We are simulating immediate success for the demo.
    return {
        "success": True,
        "transaction_id": transaction_id,
        "amount_paid": amount,
        "message": "Repayment successfully received via M-Pesa."
    }
