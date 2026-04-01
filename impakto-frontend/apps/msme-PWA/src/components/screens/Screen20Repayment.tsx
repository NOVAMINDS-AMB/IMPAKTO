import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { loansService, Loan } from '../../lib/loans';

interface Screen20RepaymentProps {
  loan: Loan | null;
  onNext: (updatedLoan: Loan, amountPaid: number) => void;
  onBack: () => void;
}

export function Screen20Repayment({ loan, onNext, onBack }: Screen20RepaymentProps) {
  const [pin, setPin] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loan) {
      setAmountStr(Math.min(1000, loan.outstanding_balance).toString());
    }
  }, [loan]);

  const handleRepay = async () => {
    if (!loan || !pin) return;
    const amount = parseFloat(amountStr);
    
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (amount > loan.outstanding_balance) {
      setError(`Amount cannot exceed outstanding balance of Kshs ${loan.outstanding_balance.toLocaleString()}`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const updatedLoan = await loansService.repayLoan(loan.id, amount);
      onNext(updatedLoan, amount);
    } catch (err: any) {
      setError(err.message || 'Repayment failed');
    } finally {
      setLoading(false);
    }
  };

  if (!loan) {
    return (
      <MobileScreen>
        <p className="text-center mt-10">No active loan.</p>
        <PrimaryButton onClick={onBack}>Go Back</PrimaryButton>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen>
      <div className="mb-6">
        <h2 className="text-2xl mb-2 text-gray-900">Confirm Repayment</h2>
        <p className="text-gray-600">Enter payment details</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Amount to Pay (Kshs)</p>
          <input
            type="number"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            className="w-full bg-transparent text-center focus:outline-none text-4xl text-gray-900 border-b-2 border-emerald-500 pb-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Mobile Money PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter your PIN"
            maxLength={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-center text-2xl tracking-widest"
          />
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={handleRepay} disabled={loading || pin.length < 4 || !amountStr}>
          {loading ? 'Processing...' : 'Confirm Repayment'}
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
