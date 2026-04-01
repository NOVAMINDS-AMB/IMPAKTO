import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, TrendingUp, TrendingDown, Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ledgerService, TransactionResponse } from '../../lib/ledger';

interface ScreenUpdatedLedgerProps {
  onBack: () => void;
}

export function ScreenUpdatedLedger({ onBack }: ScreenUpdatedLedgerProps) {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUpdatedLedger();
  }, []);

  const fetchUpdatedLedger = async () => {
    try {
      setIsLoading(true);
      const data = await ledgerService.getTransactions();
      // Since the backend orders by date descending, the newest is first
      setTransactions(data);
    } catch (err) {
      setError('Failed to load updated ledger.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(num).replace('KES', 'Kshs');
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
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

      <div className="mb-6">
        <h2 className="text-2xl mb-1 text-gray-900">Updated Ledger</h2>
        <p className="text-gray-600">Your latest business transactions</p>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-10 overflow-y-auto">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
          <p className="text-gray-500">Retrieving updated records...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center">
          {error}
        </div>
      ) : (
        <>
          {/* New Entry Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 mb-4 text-white shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">1 New Entry Added</h3>
            </div>
            <p className="text-sm text-emerald-100">
              Your ledger has been updated with the latest transaction
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pb-6">
            {transactions.map((entry, index) => {
              // Highlight the very first item as the newly added one
              const isNew = index === 0; 
              
              return (
                <div
                  key={entry.id}
                  className={`bg-white rounded-xl p-4 border-2 transition-all ${
                    isNew 
                      ? 'border-emerald-400 shadow-lg shadow-emerald-100' 
                      : 'border-gray-200 shadow-sm'
                  }`}
                >
                  {isNew && (
                    <div className="flex items-center gap-1 mb-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-600 uppercase">New</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 overflow-y-auto">
                      <div className="flex items-center gap-2 mb-1">
                        {entry.transaction_type === 'INCOME' ? (
                          <div className="bg-emerald-100 rounded-lg p-1.5">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="bg-red-100 rounded-lg p-1.5">
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                        <span className="text-xs text-gray-500">{formatDate(entry.transaction_date)}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {entry.description || entry.category}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">{entry.transaction_type.toLowerCase()}</p>
                    </div>
                    <div className="text-right mt-1">
                      <p className={`text-lg font-bold ${
                        entry.transaction_type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'
                      }`}>
                        {entry.transaction_type === 'INCOME' ? '+' : '-'}{formatCurrency(entry.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-auto pt-4">
        <PrimaryButton onClick={onBack}>
          Back to Dashboard
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}