import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle2, TrendingUp, TrendingDown, Calendar, DollarSign, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ledgerService, TransactionData } from '../../lib/ledger';

interface ScreenDigitizedEntryProps {
  onNext: () => void;
}

export function ScreenDigitizedEntry({ onNext }: ScreenDigitizedEntryProps) {
  const [draftData, setDraftData] = useState<TransactionData[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // 1. Load the AI's extracted data from memory when the screen opens
  useEffect(() => {
    const savedDraft = localStorage.getItem('impakto_draft_transaction');
    if (savedDraft) {
      try {
        setDraftData(JSON.parse(savedDraft));
      } catch (e) {
        setError('Failed to load extracted data.');
      }
    } else {
      setError('No extracted data found. Please go back and retake the photo.');
    }
  }, []);

  // 2. The function to officially save it to the database
  const handleConfirmAndSave = async () => {
    if (!draftData || draftData.length === 0) return;
    
    setIsSaving(true);
    setError('');

    try {
      // Send the approved data to Django!
      await Promise.all(draftData.map(data => ledgerService.createTransaction(data)));
      
      // Clear the temporary draft from memory
      localStorage.removeItem('impakto_draft_transaction');
      
      // Move to the next screen
      onNext();
    } catch (err: any) {
      setError(err.message || 'Failed to save to database. Please try again.');
      setIsSaving(false);
    }
  };

  // Formatters
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount).replace('KES', 'Kshs');
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString; // Fallback to raw string if date is weird
    }
  };

  if (error) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <PrimaryButton onClick={() => window.history.back()}>Go Back</PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  if (!draftData) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Success Header */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-900">AI Extraction Complete!</h3>
            <p className="text-sm text-emerald-700">Please review the details below</p>
          </div>
        </div>

        <h2 className="text-2xl mb-1 text-gray-900">Review Entries</h2>
        <p className="text-gray-600 mb-6">Confirm Impakto AI read your handwriting correctly.</p>

        <div className="space-y-4">
          {draftData.map((data, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 space-y-4 shadow-sm">
              {/* Transaction Type */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className={`rounded-lg p-3 ${data.transaction_type === 'INCOME' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  {data.transaction_type === 'INCOME' ? (
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div className="flex-1 overflow-y-auto">
                  <p className="text-sm text-gray-600">Transaction Type</p>
                  <p className="font-semibold text-gray-900">
                    {data.transaction_type === 'INCOME' ? 'Income / Sale' : 'Expense'}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(data.transaction_date)}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="bg-amber-100 rounded-lg p-3">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-semibold text-gray-900 text-xl">{formatCurrency(data.amount)}</p>
                </div>
              </div>

              {/* Description & Category */}
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-lg p-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-semibold text-gray-900">{data.description || data.category || 'N/A'}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{data.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <p className="text-sm text-blue-800">
            Saving these entries will update your ledger and immediately recalculate your Trust Score.
          </p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex gap-3">
        <button 
          onClick={() => window.history.back()}
          disabled={isSaving}
          className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold disabled:opacity-50"
        >
          Retake
        </button>
        <div className="flex-1 overflow-y-auto">
          <PrimaryButton onClick={handleConfirmAndSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2 inline" /> Saving...
              </>
            ) : (
              'Confirm & Save'
            )}
          </PrimaryButton>
        </div>
      </div>
    </MobileScreen>
  );
}