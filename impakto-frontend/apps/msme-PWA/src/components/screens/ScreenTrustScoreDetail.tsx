import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, Award, CheckCircle2, History, Activity, TrendingUp, LineChart, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scoringService, TrustScoreData } from '../../lib/scoring';

interface ScreenTrustScoreDetailProps {
  onBack: () => void;
  isNewUser: boolean;
}

export function ScreenTrustScoreDetail({ onBack, isNewUser }: ScreenTrustScoreDetailProps) {
  const [scoreData, setScoreData] = useState<TrustScoreData | null>(null);
  const [isLoading, setIsLoading] = useState(!isNewUser); // Only load if not a new user
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNewUser) {
      fetchScore();
    }
  }, [isNewUser]);

  const fetchScore = async () => {
    try {
      setIsLoading(true);
      const data = await scoringService.getMyScore();
      setScoreData(data);
    } catch (err) {
      setError('Failed to load your Trust Score. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to determine gradient colors based on score
  const getScoreClasses = (score: number) => {
    if (score >= 800) return 'bg-gradient-to-br from-emerald-500 to-emerald-600';
    if (score >= 600) return 'bg-gradient-to-br from-amber-500 to-amber-600';
    return 'bg-gradient-to-br from-red-500 to-red-600';
  };

  // Helper to determine status text
  const getScoreStatus = (score: number) => {
    if (score >= 800) return 'Excellent Standing';
    if (score >= 600) return 'Good Standing';
    return 'Needs Improvement';
  };

  // 1. New User Empty State (Kept exactly as you designed it)
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

        <div className="flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
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

  // 2. Loading State for Returning Users
  if (isLoading) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Analyzing ledger metrics...</p>
        </div>
      </MobileScreen>
    );
  }

  // 3. Live Score Dashboard
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

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center">
          {error}
        </div>
      ) : scoreData ? (
        <div className="flex-1 overflow-y-auto space-y-4 pb-6">
          
          {/* Dynamic Score Display */}
          <div className={`${getScoreClasses(scoreData.total_score)} rounded-xl p-6 text-emerald-600 text-center shadow-md`}>
            <div className="flex items-center justify-center mb-3">
              <Award className="w-12 h-12" />
            </div>
            <p className="text-sm opacity-90 mb-2">Your Trust Score</p>
            <p className="text-5xl font-bold mb-2">{scoreData.total_score}</p>
            <p className="font-medium">{getScoreStatus(scoreData.total_score)}</p>
          </div>

          {/* Score Factors */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Score Breakdown</h3>
            
            <div className="space-y-4">
              {/* Metric 1: Activity Consistency */}
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg p-2 mt-1 flex-shrink-0">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">Activity Consistency</p>
                    <span className="text-sm text-blue-600 font-bold">+{scoreData.activity_consistency} <span className="text-gray-400 text-xs font-normal">/ 200</span></span>
                  </div>
                  <p className="text-sm text-gray-600">Based on regular ledger entries</p>
                </div>
              </div>

              {/* Metric 2: Revenue Stability (CV) */}
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-lg p-2 mt-1 flex-shrink-0">
                  <LineChart className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">Revenue Stability</p>
                    <span className="text-sm text-purple-600 font-bold">+{scoreData.revenue_stability} <span className="text-gray-400 text-xs font-normal">/ 250</span></span>
                  </div>
                  <p className="text-sm text-gray-600">Measures the reliability of your income</p>
                </div>
              </div>

              {/* Metric 3: Growth Trends */}
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-lg p-2 mt-1 flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">Growth Trends</p>
                    <span className="text-sm text-emerald-600 font-bold">+{scoreData.growth_trend} <span className="text-gray-400 text-xs font-normal">/ 150</span></span>
                  </div>
                  <p className="text-sm text-gray-600">Period-over-period revenue growth</p>
                </div>
              </div>

              {/* Metric 4: Verification Strength */}
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 rounded-lg p-2 mt-1 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">Verification Strength</p>
                    <span className="text-sm text-amber-600 font-bold">+{scoreData.verification_strength} <span className="text-gray-400 text-xs font-normal">/ 100</span></span>
                  </div>
                  <p className="text-sm text-gray-600">Identity and KYC verification</p>
                </div>
              </div>

              {/* Metric 5: Repayment Behavior */}
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 rounded-lg p-2 mt-1 flex-shrink-0">
                  <History className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">Repayment Behavior</p>
                    <span className="text-sm text-indigo-600 font-bold">+{scoreData.repayment_behavior} <span className="text-gray-400 text-xs font-normal">/ 300</span></span>
                  </div>
                  <p className="text-sm text-gray-600">Performance on previous loans</p>
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
      ) : null}

      <div className="mt-auto">
        <PrimaryButton onClick={onBack}>
          Back to Dashboard
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}