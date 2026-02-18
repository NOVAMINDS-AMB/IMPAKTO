import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle2, TrendingUp } from 'lucide-react';

interface Screen21RepaymentSuccessProps {
  onReset: () => void;
  onGoToDashboard: () => void;
}

export function Screen21RepaymentSuccess({ onReset, onGoToDashboard }: Screen21RepaymentSuccessProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-emerald-100 rounded-full p-6 mb-6">
          <CheckCircle2 className="w-20 h-20 text-emerald-600" />
        </div>
        
        <h2 className="text-2xl mb-3 text-gray-900">
          Payment Successful!
        </h2>
        
        <p className="text-gray-600 mb-8">
          Your payment has been received and recorded
        </p>

        {/* Payment Details */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 w-full mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-gray-900 text-lg">$100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Remaining Balance</span>
              <span className="font-semibold text-gray-900 text-lg">$400</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Next Payment Due</span>
              <span className="font-semibold text-gray-900">Feb 22, 2026</span>
            </div>
          </div>
        </div>

        {/* Trust Score Impact */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 w-full">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Trust Score Updated</h3>
          </div>
          <p className="text-sm text-emerald-800">
            Great job! Your trust score has improved with this on-time payment
          </p>
        </div>
      </div>
      
      <div className="mt-auto space-y-3">
        <PrimaryButton onClick={onGoToDashboard}>
          Done
        </PrimaryButton>
        <button
          onClick={onReset}
          className="w-full py-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Start Demo Over
        </button>
      </div>
    </MobileScreen>
  );
}