import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, Award, CheckCircle2, Clock, Calendar } from 'lucide-react';

interface ScreenTrustScoreDetailProps {
  onBack: () => void;
  isNewUser: boolean;
}

export function ScreenTrustScoreDetail({ onBack, isNewUser }: ScreenTrustScoreDetailProps) {
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
          <div className="bg-amber-100 rounded-full p-6 mb-6">
            <Award className="w-16 h-16 text-amber-600" />
          </div>
          <h2 className="text-2xl mb-3 text-gray-900">Build Your Trust Score</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xs">
            Start adding ledger entries to build your trust score and unlock better loan terms
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

      <h2 className="text-2xl mb-1 text-gray-900">Trust Score</h2>
      <p className="text-gray-600 mb-6">Your business credibility rating</p>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Score Display */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white text-center">
          <div className="flex items-center justify-center mb-3">
            <Award className="w-12 h-12" />
          </div>
          <p className="text-sm text-amber-100 mb-2">Your Trust Score</p>
          <p className="text-5xl font-bold mb-2">725</p>
          <p className="text-amber-100">Good Standing</p>
        </div>

        {/* Score Factors */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Score Breakdown</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 rounded-lg p-2 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">Regular Activity</p>
                  <span className="text-sm text-emerald-600 font-semibold">+250</span>
                </div>
                <p className="text-sm text-gray-600">
                  Consistent ledger entries over the past 30 days
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 rounded-lg p-2 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">Verified Identity</p>
                  <span className="text-sm text-emerald-600 font-semibold">+200</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your identity has been verified
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-lg p-2 mt-1">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">Account Age</p>
                  <span className="text-sm text-blue-600 font-semibold">+175</span>
                </div>
                <p className="text-sm text-gray-600">
                  Active member for 3 months
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-amber-100 rounded-lg p-2 mt-1">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">Payment History</p>
                  <span className="text-sm text-amber-600 font-semibold">+100</span>
                </div>
                <p className="text-sm text-gray-600">
                  Build more history by taking out and repaying loans
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips to Improve */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">How to Improve</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Continue adding daily ledger entries</li>
            <li>• Apply for and repay loans on time</li>
            <li>• Maintain consistent business activity</li>
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
