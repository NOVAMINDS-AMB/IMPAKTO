import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface Screen10DashboardProps {
  onNext: () => void;
}

export function Screen10Dashboard({ onNext }: Screen10DashboardProps) {
  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl mb-1 text-gray-900">Your Business</h2>
        <p className="text-gray-600">Overview of your activity</p>
      </div>

      <div className="flex-1 space-y-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-100 rounded-lg p-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-gray-600">Total Sales</span>
          </div>
          <p className="text-3xl text-gray-900">$1,250</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 rounded-lg p-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-gray-600">Total Expenses</span>
          </div>
          <p className="text-3xl text-gray-900">$780</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 rounded-lg p-2">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-600">Current Balance</span>
          </div>
          <p className="text-3xl text-gray-900">$470</p>
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Add Today's Sales
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
