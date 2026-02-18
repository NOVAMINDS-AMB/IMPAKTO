import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { DollarSign, Calendar, Clock } from 'lucide-react';

interface Screen19OutstandingLoanProps {
  onNext: () => void;
  onGoToDashboard: () => void;
}

export function Screen19OutstandingLoan({ onNext, onGoToDashboard }: Screen19OutstandingLoanProps) {
  return (
    <MobileScreen>
      <div className="flex-1">
        <h2 className="text-2xl mb-2 text-gray-900">Your Loan</h2>
        <p className="text-gray-600 mb-8">View your loan details</p>

        <div className="space-y-4">
          {/* Outstanding Balance */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" />
              <p className="text-sm text-emerald-100">Outstanding Balance</p>
            </div>
            <p className="text-4xl font-bold">$500</p>
          </div>

          {/* Loan Details */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Loan Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Disbursed Date</p>
                  <p className="font-medium text-gray-900">Feb 5, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-amber-100 rounded-lg p-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Payment Due</p>
                  <p className="font-medium text-gray-900">Feb 15, 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Repayment Schedule */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Repayment Schedule</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Amount per week</span>
                <span className="font-medium text-gray-900">$100</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">6 weeks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium text-gray-900">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto space-y-3">
        <PrimaryButton onClick={onNext}>
          Repay Loan
        </PrimaryButton>
        <button
          onClick={onGoToDashboard}
          className="w-full py-4 rounded-xl font-semibold border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </MobileScreen>
  );
}