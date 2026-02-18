import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle2, TrendingUp, Calendar, DollarSign, FileText } from 'lucide-react';

interface ScreenDigitizedEntryProps {
  onNext: () => void;
}

export function ScreenDigitizedEntry({ onNext }: ScreenDigitizedEntryProps) {
  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <div className="flex-1">
        {/* Success Header */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-900">Entry Digitized!</h3>
            <p className="text-sm text-emerald-700">Your new ledger entry has been added</p>
          </div>
        </div>

        <h2 className="text-2xl mb-1 text-gray-900">New Entry Details</h2>
        <p className="text-gray-600 mb-6">Review the scanned information</p>

        {/* Entry Details Card */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 space-y-4">
          {/* Transaction Type */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="bg-emerald-100 rounded-lg p-3">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Transaction Type</p>
              <p className="font-semibold text-gray-900">Sale</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="bg-blue-100 rounded-lg p-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-900">Feb 10, 2026</p>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="bg-amber-100 rounded-lg p-3">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Amount</p>
              <p className="font-semibold text-gray-900 text-xl">$150</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 rounded-lg p-3">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Description</p>
              <p className="font-semibold text-gray-900">Maize - 10kg bags</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
          <p className="text-sm text-blue-800">
            This entry has been added to your ledger records and will help improve your trust score
          </p>
        </div>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          View Updated Ledger
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
