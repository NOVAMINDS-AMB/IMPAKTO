import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, TrendingUp, TrendingDown, Sparkles, Loader2 } from 'lucide-react';
import { useLedgerEntries } from '../../hooks/useLedger'; // Import the new hook

interface ScreenUpdatedLedgerProps {
  onBack: () => void;
}

export function ScreenUpdatedLedger({ onBack }: ScreenUpdatedLedgerProps) {
  // Replace static data with the hook. Assuming User ID 1 for testing.
  const { data: entries, isLoading, isError } = useLedgerEntries(1);

  if (isLoading) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
        </div>
      </MobileScreen>
    );
  }

  if (isError ||!entries) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <p className="text-red-500 text-center mt-10">Failed to load ledger.</p>
        <PrimaryButton onClick={onBack}>Go Back</PrimaryButton>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <button onClick={onBack} className="mb-4 text-gray-600 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="mb-6">
        <h2 className="text-2xl mb-1 text-gray-900">Updated Ledger</h2>
        <p className="text-gray-600">Your latest business transactions</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {entries.map((entry: any) => (
          <div
            key={entry.id}
            className={`bg-white rounded-xl p-4 border-2 ${
             !entry.is_verified? 'border-emerald-400 shadow-lg shadow-emerald-100' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {entry.type === 'SALE'? (
                    <div className="bg-emerald-100 rounded-lg p-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="bg-red-100 rounded-lg p-1.5">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                  )}
                  {/* Format the ISO timestamp into a readable date */}
                  <span className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {entry.type} Transaction
                </h3>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${
                  entry.type === 'SALE'? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {entry.type === 'SALE'? '+' : '-'} Kshs {entry.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <PrimaryButton onClick={onBack}>Back to Dashboard</PrimaryButton>
      </div>
    </MobileScreen>
  );
}