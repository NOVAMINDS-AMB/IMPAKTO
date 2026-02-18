import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, Lightbulb, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';

interface ScreenAISuggestionsProps {
  onBack: () => void;
  onGetStockCapital: () => void;
  isNewUser: boolean;
}

export function ScreenAISuggestions({ onBack, onGetStockCapital, isNewUser }: ScreenAISuggestionsProps) {
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

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="bg-cyan-100 rounded-full p-6 mb-6">
            <Lightbulb className="w-16 h-16 text-cyan-600" />
          </div>
          <h2 className="text-2xl mb-3 text-gray-900">AI Suggestions Coming Soon</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xs">
            Add a few ledger entries to unlock personalized AI-powered business insights
          </p>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={onBack}>
            Go Back to Dashboard
          </PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <button 
        onClick={onBack}
        className="mb-4 text-gray-600 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <h2 className="text-2xl mb-1 text-gray-900">AI Suggestions</h2>
      <p className="text-gray-600 mb-6">Personalized insights for your business</p>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {/* Stock Capital Suggestion */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-white/20 rounded-lg p-2">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Get Stock Capital</h3>
              <p className="text-sm text-emerald-50">
                Based on your sales patterns, you could benefit from additional capital to increase your inventory
              </p>
            </div>
          </div>
          <button
            onClick={onGetStockCapital}
            className="w-full bg-white text-emerald-600 font-semibold py-3 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Apply for Loan
          </button>
        </div>

        {/* Best Selling Items */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-cyan-100 rounded-lg p-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Best Sellers</h3>
              <p className="text-sm text-gray-600">
                Vegetables are your top-performing category. Consider stocking more variety.
              </p>
            </div>
          </div>
        </div>

        {/* Inventory Alert */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-amber-100 rounded-lg p-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Restock Reminder</h3>
              <p className="text-sm text-gray-600">
                Your daily sales average suggests you may run low on stock by Thursday.
              </p>
            </div>
          </div>
        </div>

        {/* Profit Optimization */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-purple-100 rounded-lg p-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Profit Tip</h3>
              <p className="text-sm text-gray-600">
                Your profit margin could improve by 15% by reducing transport costs through bulk purchases.
              </p>
            </div>
          </div>
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
