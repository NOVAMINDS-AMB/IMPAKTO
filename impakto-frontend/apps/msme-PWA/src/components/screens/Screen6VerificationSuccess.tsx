import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle } from 'lucide-react';

interface Screen6VerificationSuccessProps {
  onNext: () => void;
}

export function Screen6VerificationSuccess({ onNext }: Screen6VerificationSuccessProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-emerald-600 mx-auto" />
        </div>
        <h2 className="text-2xl mb-4 text-gray-900">
          Your identity is verified
        </h2>
        <p className="text-gray-600 text-lg">
          You're all set to continue
        </p>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Continue
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
