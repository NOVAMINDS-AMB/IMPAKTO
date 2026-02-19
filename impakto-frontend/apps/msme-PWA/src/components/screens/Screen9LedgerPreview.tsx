import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle } from 'lucide-react';

interface Screen9LedgerPreviewProps {
  onNext: () => void;
}

export function Screen9LedgerPreview({ onNext }: Screen9LedgerPreviewProps) {
  return (
    <MobileScreen>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl text-gray-900">Your records are ready</h2>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 rounded-xl p-4 mb-6">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 text-gray-700">Date</th>
                <th className="text-left p-3 text-gray-700">Item</th>
                <th className="text-right p-3 text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 text-gray-600">Feb 1</td>
                <td className="p-3 text-gray-900">Flour</td>
                <td className="p-3 text-right text-gray-900">Kshs 250</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">Feb 2</td>
                <td className="p-3 text-gray-900">Sugar</td>
                <td className="p-3 text-right text-gray-900">Kshs 150</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">Feb 3</td>
                <td className="p-3 text-gray-900">Rice</td>
                <td className="p-3 text-right text-gray-900">Kshs 300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          View Dashboard
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
