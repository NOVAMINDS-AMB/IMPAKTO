import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Star } from 'lucide-react';

interface Screen13TrustScoreProps {
  onNext: () => void;
}

export function Screen13TrustScore({ onNext }: Screen13TrustScoreProps) {
  return (
    <MobileScreen backgroundColor="bg-gradient-to-b from-purple-50 to-white">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8">
          <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <div className="text-7xl text-purple-600 mb-4">
            750
          </div>
          <div className="text-gray-500 text-sm uppercase tracking-wide mb-6">Trust Score</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-xs">
          <p className="text-gray-700">
            This score helps you access capital
          </p>
        </div>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Continue
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
