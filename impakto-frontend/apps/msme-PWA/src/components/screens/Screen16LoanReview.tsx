import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { DollarSign, Calendar } from 'lucide-react';

interface Screen16LoanReviewProps {
  onNext: () => void;
}

export function Screen16LoanReview({ onNext }: Screen16LoanReviewProps) {
  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl mb-2 text-gray-900">Review Your Loan</h2>
        <p className="text-gray-600">Please confirm the details</p>
      </div>

      <div className="flex-1 space-y-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-100 rounded-lg p-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-gray-600">Loan Amount</span>
          </div>
          <p className="text-4xl text-gray-900 mb-4">$200</p>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 rounded-lg p-2">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-600">Repayment Duration</span>
            </div>
            <p className="text-2xl text-gray-900">30 days</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-gray-700">
            Your Trust Score qualifies you for this loan with favorable terms
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Confirm Application
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
