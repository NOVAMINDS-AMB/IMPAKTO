import { MobileScreen } from '../MobileScreen';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Loader2, Receipt } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ledgerService, TransactionResponse } from '../../lib/ledger';

interface ScreenLedgerRecordsProps {
  onBack: () => void;
  onScanNew: () => void;
  onViewEntry?: (entryId: number) => void;
}

export function ScreenLedgerRecords({ onBack, onScanNew, onViewEntry }: ScreenLedgerRecordsProps) {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the data as soon as the screen loads
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const data = await ledgerService.getTransactions();
      // Reverse the data so the newest transactions show at the top
      setTransactions(data.reverse());
    } catch (err) {
      setError('Failed to load ledger records. Check your connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format money nicely (e.g., Kshs 1,500)
  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-KE', { 
      style: 'currency', 
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(num).replace('KES', 'Kshs');
  };

  // Helper to safely format the date (e.g., Feb 10, 2026)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <button 
        onClick={onBack}
        className="mb-4 text-gray-600 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1 text-gray-900">Ledger Entries</h2>
          <p className="text-gray-600">Your business transactions</p>
        </div>
        <button
          onClick={onScanNew}
          className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Loading State vs Empty State vs Data List */}
      {isLoading ? (
         <div className="flex-1 flex flex-col items-center justify-center mt-20 overflow-y-auto">
           <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
           <p className="text-gray-500">Syncing with secure vault...</p>
         </div>
      ) : transactions.length === 0 ? (
         <div className="text-center mt-20 p-8 bg-white rounded-xl border border-gray-200">
           <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
           <p className="text-gray-700 font-medium">No records found</p>
           <p className="text-sm text-gray-500 mt-1">Tap the + button above to add your first sale or expense.</p>
         </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3 pb-6">
          {transactions.map((tx) => (
            <button
              key={tx.id}
              onClick={() => onViewEntry?.(tx.id)}
              className="w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-1">
                    {tx.transaction_type === 'INCOME' ? (
                      <div className="bg-emerald-100 rounded-lg p-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="bg-red-100 rounded-lg p-1.5">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                    <span className="text-xs text-gray-500">{formatDate(tx.transaction_date)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {tx.description || tx.category}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">{tx.transaction_type.toLowerCase()}</p>
                </div>
                <div className="text-right mt-1">
                  <p className={`text-lg font-bold ${
                    tx.transaction_type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'
                  }`}>
                    {tx.transaction_type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </MobileScreen>
  );
}