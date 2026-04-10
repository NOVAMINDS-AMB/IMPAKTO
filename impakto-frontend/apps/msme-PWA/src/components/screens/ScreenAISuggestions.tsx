import { useState, useEffect } from 'react';
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import {
  ArrowLeft,
  Lightbulb,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { insightsService, Insight, InsightType } from '../../lib/insights';

// ─── Icon & colour helpers ────────────────────────────────────────────────────

const CARD_STYLES: Record<InsightType, { bg: string; iconBg: string; iconColor: string }> = {
  loan:        { bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600', iconBg: 'bg-white/20', iconColor: 'text-white' },
  best_seller: { bg: 'bg-white border border-gray-200', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
  restock:     { bg: 'bg-white border border-gray-200', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  profit:      { bg: 'bg-white border border-gray-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
};

const CARD_ICONS: Record<InsightType, React.FC<{ className?: string }>> = {
  loan:        (p) => <DollarSign {...p} />,
  best_seller: (p) => <TrendingUp {...p} />,
  restock:     (p) => <AlertCircle {...p} />,
  profit:      (p) => <Lightbulb {...p} />,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function InsightCard({
  insight,
  onGetStockCapital,
}: {
  insight: Insight;
  onGetStockCapital: () => void;
}) {
  const style = CARD_STYLES[insight.type];
  const Icon = CARD_ICONS[insight.type];
  const isLoan = insight.type === 'loan';

  return (
    <div className={`rounded-xl p-4 ${style.bg}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`rounded-lg p-2 flex-shrink-0 ${style.iconBg}`}>
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${isLoan ? 'text-white' : 'text-gray-900'}`}>
            {insight.title}
          </h3>
          <p className={`text-sm ${isLoan ? 'text-emerald-50' : 'text-gray-600'}`}>
            {insight.body}
          </p>
        </div>
      </div>

      {isLoan && insight.cta && (
        <button
          onClick={onGetStockCapital}
          className="w-full bg-white text-emerald-600 font-semibold py-3 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          {insight.cta}
        </button>
      )}
    </div>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

interface ScreenAISuggestionsProps {
  onBack: () => void;
  onGetStockCapital: () => void;
  isNewUser: boolean;
}

export function ScreenAISuggestions({ onBack, onGetStockCapital, isNewUser }: ScreenAISuggestionsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [hasEnoughData, setHasEnoughData] = useState<boolean | null>(null); // null = not fetched yet
  const [transactionCount, setTransactionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInsights = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await insightsService.getInsights();
      setInsights(result.insights);
      setHasEnoughData(result.hasEnoughData);
      setTransactionCount(result.transactionCount);
    } catch (err) {
      console.error(err);
      setError('Unable to load insights. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  // ── Shared header ──
  const Header = () => (
    <button
      onClick={onBack}
      className="mb-4 text-gray-600 flex items-center gap-2 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Dashboard
    </button>
  );

  // ── Loading state ──
  if (isLoading) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <Header />
        <h2 className="text-2xl mb-1 text-gray-900">AI Suggestions</h2>
        <p className="text-gray-600 mb-6">Analyzing your business data…</p>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="bg-cyan-100 rounded-full p-6">
            <Loader2 className="w-16 h-16 text-cyan-600 animate-spin" />
          </div>
          <p className="text-gray-500 text-sm">Crunching your numbers…</p>
        </div>
      </MobileScreen>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <div className="bg-red-100 rounded-full p-6">
            <AlertCircle className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-xl text-gray-900">Something went wrong</h2>
          <p className="text-gray-500 text-sm max-w-xs">{error}</p>
          <button
            onClick={fetchInsights}
            className="flex items-center gap-2 text-emerald-600 font-semibold mt-2 hover:text-emerald-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
        <div className="mt-auto">
          <PrimaryButton onClick={onBack}>Back to Dashboard</PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  // ── Empty state: new user or fewer than 3 transactions ──
  if (!hasEnoughData) {
    const remaining = Math.max(0, 3 - transactionCount);
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
          <div className="bg-cyan-100 rounded-full p-6 mb-6">
            <Lightbulb className="w-16 h-16 text-cyan-600" />
          </div>
          <h2 className="text-2xl mb-3 text-gray-900">AI Suggestions</h2>
          <p className="text-gray-600 text-lg mb-3 max-w-xs">
            {transactionCount === 0
              ? 'Scan your first ledger to unlock personalized business insights.'
              : `Add ${remaining} more ledger entr${remaining === 1 ? 'y' : 'ies'} to unlock personalized insights.`}
          </p>
          {transactionCount > 0 && (
            <div className="flex gap-1 mt-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full ${
                    i < transactionCount ? 'bg-cyan-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-auto">
          <PrimaryButton onClick={onBack}>Go Back to Dashboard</PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  // ── Rich state: real insights ──
  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <Header />

      <div className="mb-6">
        <h2 className="text-2xl text-gray-900">AI Suggestions</h2>
        <p className="text-gray-600 text-sm">
          Based on your {transactionCount} ledger entr{transactionCount === 1 ? 'y' : 'ies'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {insights.map((insight) => (
          <InsightCard
            key={insight.type}
            insight={insight}
            onGetStockCapital={onGetStockCapital}
          />
        ))}
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onBack}>Back to Dashboard</PrimaryButton>
      </div>
    </MobileScreen>
  );
}
