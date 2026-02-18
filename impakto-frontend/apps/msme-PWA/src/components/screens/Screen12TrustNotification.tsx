import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Star } from 'lucide-react';

interface Screen12TrustNotificationProps {
  onNext: () => void;
}

export function Screen12TrustNotification({ onNext }: Screen12TrustNotificationProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8 bg-purple-100 rounded-full p-6">
          <Star className="w-16 h-16 text-purple-600" />
        </div>
        <h2 className="text-2xl mb-4 text-gray-900">
          Your Trust Score is ready
        </h2>
        <p className="text-gray-600 text-lg">
          See how you're doing
        </p>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          View Trust Score
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
