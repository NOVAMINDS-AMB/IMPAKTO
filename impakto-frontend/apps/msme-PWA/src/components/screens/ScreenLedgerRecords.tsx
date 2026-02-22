import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, Plus, TrendingUp, TrendingDown } from 'lucide-react';

interface ScreenLedgerRecordsProps {
  onBack: () => void;
  onScanNew: () => void;
  onViewEntry?: (entryId: number) => void;
}

export function ScreenLedgerRecords({ onBack, onScanNew, onViewEntry }: ScreenLedgerRecordsProps) {
  const entries = [
    {
      id: 1,
      date: 'Feb 10, 2026',
      type: 'sale',
      description: 'Rice - 5kg bags',
      amount: 2500,
    },
    {
      id: 2,
      date: 'Feb 9, 2026',
      type: 'expense',
      description: 'Stock purchase',
      amount: 1800,
    },
    {
      id: 3,
      date: 'Feb 8, 2026',
      type: 'sale',
      description: 'Cooking oil',
      amount: 1200,
    },
    {
      id: 4,
      date: 'Feb 7, 2026',
      type: 'sale',
      description: 'Beans - 2kg',
      amount: 350,
    },
    {
      id: 5,
      date: 'Feb 6, 2026',
      type: 'expense',
      description: 'Transportation',
      amount: 400,
    },
  ];

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <button 
        onClick={onBack}
        className="mb-4 text-gray-600 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1 text-gray-900">Ledger Entries</h2>
          <p className="text-gray-600">Your business transactions</p>
        </div>
        <button
          onClick={onScanNew}
          className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onViewEntry?.(entry.id)}
            className="w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {entry.type === 'sale' ? (
                    <div className="bg-emerald-100 rounded-lg p-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="bg-red-100 rounded-lg p-1.5">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                  )}
                  <span className="text-xs text-gray-500">{entry.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {entry.description}
                </h3>
                <p className="text-xs text-gray-500 capitalize">{entry.type}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${
                  entry.type === 'sale' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {entry.type === 'sale' ? '+' : '-'}Kshs {entry.amount}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </MobileScreen>
  );
}