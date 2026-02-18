import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Lightbulb } from 'lucide-react';

interface Screen14InsightNotificationProps {
  onNext: () => void;
}

export function Screen14InsightNotification({ onNext }: Screen14InsightNotificationProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8 bg-yellow-100 rounded-full p-6">
          <Lightbulb className="w-16 h-16 text-yellow-600" />
        </div>
        <h2 className="text-2xl mb-4 text-gray-900">
          Your flour sales increased this week
        </h2>
        <p className="text-gray-600 text-lg">
          You may need more stock
        </p>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          See Suggestion
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
