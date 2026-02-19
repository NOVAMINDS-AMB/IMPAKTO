import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, Award, CheckCircle2, TrendingUp, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { useTrustScore } from '../../hooks/useTrustScore';

interface ScreenTrustScoreDetailProps {
  onBack: () => void;
  isNewUser: boolean;
}

export function ScreenTrustScoreDetail({ onBack, isNewUser }: ScreenTrustScoreDetailProps) {
  // Pass in 1 to match the temporary user_id in your sync API
  const { data, isLoading, isError } = useTrustScore(1);

  if (isNewUser) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <button onClick={onBack} className="mb-4 text-gray-600 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
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
          <PrimaryButton onClick={onBack}>Go Back to Dashboard</PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  if (isLoading) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
        </div>
      </MobileScreen>
    );
  }

  if (isError ||!data) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600">Unable to load your live Trust Score.</p>
        </div>
        <div className="mt-auto pt-4">
          <PrimaryButton onClick={onBack}>Return</PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  const getStanding = (score: number) => {
    if (score >= 750) return "Excellent Standing";
    if (score >= 600) return "Good Standing";
    if (score >= 450) return "Building Trust";
    return "Requires Action";
  };

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <button onClick={onBack} className="mb-4 text-gray-600 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <h2 className="text-2xl mb-1 text-gray-900">Trust Score</h2>
      <p className="text-gray-600 mb-6">Your real-time business credibility rating</p>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Dynamic Score Display */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white text-center shadow-md">
          <div className="flex items-center justify-center mb-3">
            <Award className="w-12 h-12" />
          </div>
          <p className="text-sm text-amber-100 mb-2">Overall Trust Score</p>
          <p className="text-5xl font-bold mb-2">{data.overall_score}</p>
          <p className="text-amber-100 font-medium">{getStanding(data.overall_score)}</p>
        </div>

        {/* Dynamic Score Factors */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Score Breakdown</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 rounded-lg p-2 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">Activity Consistency</p>
                  <span className="text-sm text-emerald-600 font-semibold">
                    {Math.round(data.consistency_index * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Based on {data.activity_count} ledger entries over 30 days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-lg p-2 mt-1">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">Revenue Stability</p>
                  <span className="text-sm text-blue-600 font-semibold">
                    {Math.round(data.stability_index * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Calculated from the variance of your transaction volumes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-100 rounded-lg p-2 mt-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">Verification Strength</p>
                  <span className="text-sm text-purple-600 font-semibold">
                    {Math.round(data.verification_index * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {data.verified_count} out of {data.activity_count} activities are formally verified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Actionable Insights */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Actionable Intelligence</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {data.consistency_index < 0.8 && (
              <li>• Log activities more frequently to boost your consistency index.</li>
            )}
            {data.verification_index < 0.5 && (
              <li>• Request counterparty confirmations to verify existing transactions.</li>
            )}
            {data.stability_index < 0.6 && (
              <li>• Consolidate wildly fluctuating transaction values to improve stability scoring.</li>
            )}
            {data.consistency_index >= 0.8 && data.verification_index >= 0.5 && (
              <li>• Excellent data health! Maintain current operational patterns.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <PrimaryButton onClick={onBack}>Back to Dashboard</PrimaryButton>
      </div>
    </MobileScreen>
  );
}