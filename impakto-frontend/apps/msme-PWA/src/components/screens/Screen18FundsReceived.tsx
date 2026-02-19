import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Smartphone, CheckCircle } from 'lucide-react';

interface Screen18FundsReceivedProps {
  onNext: () => void;
}

export function Screen18FundsReceived({ onNext }: Screen18FundsReceivedProps) {
  return (
    <MobileScreen backgroundColor="bg-gradient-to-b from-emerald-50 to-white">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8 relative">
          <div className="bg-emerald-100 rounded-full p-6 inline-block">
            <Smartphone className="w-16 h-16 text-emerald-600" />
          </div>
          <div className="absolute -top-2 -right-2 bg-emerald-600 rounded-full p-1">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl mb-4 text-gray-900">
          Funds sent to your mobile money
        </h2>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <p className="text-gray-600 mb-2">Amount Received</p>
          <p className="text-4xl text-emerald-600">Kshs 20,000</p>
        </div>
        
        <p className="text-gray-600">
          Check your mobile money account
        </p>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Go to Dashboard
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
