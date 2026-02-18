import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Shield } from 'lucide-react';

interface Screen3VerificationPromptProps {
  onNext: () => void;
}

export function Screen3VerificationPrompt({ onNext }: Screen3VerificationPromptProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8 bg-blue-100 rounded-full p-6">
          <Shield className="w-16 h-16 text-blue-600" />
        </div>
        <h2 className="text-2xl mb-4 text-gray-900">
          Verify your identity to continue
        </h2>
        <p className="text-gray-600 text-lg">
          This helps us keep your account safe
        </p>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Start Verification
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
