import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Smartphone } from 'lucide-react';
import { useState } from 'react';

interface Screen20RepaymentProps {
  onNext: () => void;
}

export function Screen20Repayment({ onNext }: Screen20RepaymentProps) {
  const [pin, setPin] = useState('');

  return (
    <MobileScreen>
      <div className="mb-6">
        <h2 className="text-2xl mb-2 text-gray-900">Confirm Repayment</h2>
        <p className="text-gray-600">Enter your mobile money PIN</p>
      </div>

      <div className="flex-1">
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Amount to Pay</p>
          <p className="text-4xl text-gray-900">Kshs 20,000</p>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Mobile Money PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter your PIN"
            maxLength={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-center text-2xl tracking-widest"
          />
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Confirm Repayment
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
