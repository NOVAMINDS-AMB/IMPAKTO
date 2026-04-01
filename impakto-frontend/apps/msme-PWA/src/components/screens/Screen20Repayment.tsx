import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Smartphone } from 'lucide-react';
import { useState } from 'react';
import { loansService, Loan } from '../../lib/loans';

interface Screen20RepaymentProps {
  loan: Loan | null;
  onNext: (updatedLoan: Loan) => void;
  onBack: () => void;
}

export function Screen20Repayment({ loan, onNext, onBack }: Screen20RepaymentProps) {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRepay = async () => {
    if (!loan || !pin) return;
    try {
      setLoading(true);
      setError(null);
      // Use minimum of hardcoded 1000 or outstanding balance for demo
      const amount = Math.min(1000, loan.outstanding_balance);
      const updatedLoan = await loansService.repayLoan(loan.id, amount);
      onNext(updatedLoan);
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
        <p className="text-gray-600">Enter your mobile money PIN</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Amount to Pay</p>
          <p className="text-4xl text-gray-900">Kshs {Math.min(1000, loan.outstanding_balance).toLocaleString()}</p>
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
        <PrimaryButton onClick={handleRepay} disabled={loading || pin.length < 4}>
          {loading ? 'Processing...' : 'Confirm Repayment'}
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
