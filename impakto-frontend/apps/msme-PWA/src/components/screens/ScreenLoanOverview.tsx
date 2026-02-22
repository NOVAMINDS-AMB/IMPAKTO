import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, DollarSign, Clock, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

interface ScreenLoanOverviewProps {
  onBack: () => void;
  onApplyNewLoan: () => void;
  onViewRepayment: () => void;
  hasActiveLoan: boolean;
  isNewUser: boolean;
}

export function ScreenLoanOverview({ 
  onBack, 
  onApplyNewLoan, 
  onViewRepayment,
  hasActiveLoan,
  isNewUser
}: ScreenLoanOverviewProps) {
  // New users can't access loan services yet
  if (isNewUser) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <button 
          onClick={onBack}
          className="mb-4 text-gray-600 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-amber-100 rounded-full p-6 mb-6">
            <Lock className="w-16 h-16 text-amber-600" />
          </div>
          <h2 className="text-2xl mb-3 text-gray-900">Build Your Trust Score First</h2>
          <p className="text-gray-600 mb-8">
            Keep adding ledger entries to build your trust score and unlock loan services
          </p>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-left w-full">
            <h3 className="font-semibold text-emerald-900 mb-3">Why Get a Loan?</h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Increase your inventory and boost sales</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Flexible repayment terms that fit your business</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Build trust score through successful repayments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Fast approval based on your ledger history</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={onBack}>
            Back to Dashboard
          </PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  // Continuing user with no active loan
  if (!hasActiveLoan) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <button 
          onClick={onBack}
          className="mb-4 text-gray-600 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <h2 className="text-2xl mb-1 text-gray-900">Loan Services</h2>
        <p className="text-gray-600 mb-6">Access capital for your business</p>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Loan Benefits */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h3 className="font-semibold text-emerald-900 mb-3">Why Get a Loan?</h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Increase your inventory and boost sales</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Flexible repayment terms that fit your business</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Build trust score through successful repayments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Fast approval based on your ledger history</span>
              </li>
            </ul>
          </div>

          {/* Loan Options */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Available Amounts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Small Loan</span>
                <span className="font-semibold text-gray-900">Kshs 1,000 - Kshs 5,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Medium Loan</span>
                <span className="font-semibold text-gray-900">Kshs 5,000 - Kshs 15,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Large Loan</span>
                <span className="font-semibold text-gray-900">Kshs 15,000 - Kshs 50,000</span>
              </div>
            </div>
          </div>

          {/* Loan Terms Info */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Loan Information</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium text-gray-900">5% - 8%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Repayment Period</span>
                <span className="font-medium text-gray-900">4 - 12 weeks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Application Status</span>
                <span className="font-medium text-emerald-600">Ready to Apply</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={onApplyNewLoan}>
            Apply for Loan
          </PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  // User has active loan
  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <button 
        onClick={onBack}
        className="mb-4 text-gray-600 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <h2 className="text-2xl mb-1 text-gray-900">Active Loan</h2>
      <p className="text-gray-600 mb-6">Your current loan details</p>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Loan Summary */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Loan Amount</h3>
          </div>
          <p className="text-4xl font-bold mb-1">Kshs 15,000</p>
          <p className="text-emerald-100">Approved on Feb 5, 2026</p>
        </div>

        {/* Outstanding Amount */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-amber-100 rounded-lg p-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Outstanding Balance</p>
              <p className="text-2xl font-semibold text-gray-900">Kshs 5,000</p>
            </div>
          </div>
        </div>

        {/* Repayment Schedule */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Next Payment Due</p>
              <p className="text-xl font-semibold text-gray-900">Feb 15, 2026</p>
              <p className="text-sm text-gray-600 mt-1">Amount: Kshs 1,000</p>
            </div>
          </div>
        </div>

        {/* Loan Status */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Loan Details</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Interest Rate</span>
              <span className="font-medium text-gray-900">5%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Repayment Period</span>
              <span className="font-medium text-gray-900">6 weeks</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-emerald-600">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onViewRepayment}>
          Make Payment
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}