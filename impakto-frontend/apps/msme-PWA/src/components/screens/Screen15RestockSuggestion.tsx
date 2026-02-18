import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Package, DollarSign } from 'lucide-react';

interface Screen15RestockSuggestionProps {
  onNext: () => void;
}

export function Screen15RestockSuggestion({ onNext }: Screen15RestockSuggestionProps) {
  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl mb-2 text-gray-900">Restock Suggestion</h2>
        <p className="text-gray-600">Based on your sales trends</p>
      </div>

      <div className="flex-1 space-y-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-100 rounded-lg p-2">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-gray-900">Suggested Restock</span>
          </div>
          <p className="text-xl text-gray-900">Extra flour inventory</p>
        </div>

        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-100 rounded-lg p-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-gray-900">Suggested Loan Amount</span>
          </div>
          <p className="text-3xl text-emerald-600">$200</p>
          <p className="text-sm text-gray-600 mt-2">To help you purchase inventory</p>
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Get Stock Capital
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
