import { useState } from 'react';
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { DollarSign, Calendar } from 'lucide-react';
import { loansService, LoanEligibility, Loan } from '../../lib/loans';

interface Screen16LoanReviewProps {
  eligibility: LoanEligibility | null;
  onNext: (loan: Loan) => void;
  onBack: () => void;
}

export function Screen16LoanReview({ eligibility, onNext, onBack }: Screen16LoanReviewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!eligibility) return;
    try {
      setLoading(true);
      setError(null);
      const loan = await loansService.applyForLoan(eligibility.max_amount);
      onNext(loan);
    } catch (err: any) {
      setError(err.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  if (!eligibility) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <p className="text-center mt-10">No eligibility data.</p>
        <PrimaryButton onClick={onBack}>Go Back</PrimaryButton>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl mb-2 text-gray-900">Review Your Loan</h2>
        <p className="text-gray-600">Please confirm the details</p>
      </div>

      <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-100 rounded-lg p-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-gray-600">Loan Amount</span>
          </div>
          <p className="text-4xl text-gray-900 mb-4">Kshs {eligibility.max_amount.toLocaleString()}</p>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 rounded-lg p-2">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-600">Repayment Duration</span>
            </div>
            <p className="text-2xl text-gray-900">{eligibility.repayment_duration_days} days</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-gray-700">
            Your Trust Score qualifies you for this loan at {eligibility.interest_rate}% interest rate.
          </p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={handleApply} disabled={loading}>
          {loading ? 'Processing...' : 'Confirm Application'}
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
