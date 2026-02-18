import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle } from 'lucide-react';

interface Screen17LoanApprovalProps {
  onNext: () => void;
}

export function Screen17LoanApproval({ onNext }: Screen17LoanApprovalProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-emerald-600 mx-auto" />
        </div>
        <h2 className="text-3xl mb-4 text-gray-900">
          Your loan is approved
        </h2>
        <p className="text-gray-600 text-lg">
          Funds will be sent to your mobile money account
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
