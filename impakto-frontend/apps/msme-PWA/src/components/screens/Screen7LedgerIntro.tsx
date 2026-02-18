import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { BookOpen } from 'lucide-react';

interface Screen7LedgerIntroProps {
  onNext: () => void;
}

export function Screen7LedgerIntro({ onNext }: Screen7LedgerIntroProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8 bg-amber-100 rounded-full p-6">
          <BookOpen className="w-16 h-16 text-amber-600" />
        </div>
        <h2 className="text-2xl mb-4 text-gray-900">
          Add your sales records
        </h2>
        <p className="text-gray-600 text-lg">
          Take a photo of your sales notebook
        </p>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Scan Ledger
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
