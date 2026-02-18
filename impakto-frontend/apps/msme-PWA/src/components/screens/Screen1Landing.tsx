import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Sprout } from 'lucide-react';

interface Screen1LandingProps {
  onNext: () => void;
  onLogin: () => void;
}

export function Screen1Landing({ onNext, onLogin }: Screen1LandingProps) {
  return (
    <MobileScreen>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-8 bg-emerald-100 rounded-full p-6">
          <Sprout className="w-16 h-16 text-emerald-600" />
        </div>
        <h1 className="text-3xl mb-2 text-gray-900">
          <span className="font-bold">Impakto</span>
        </h1>
        <h2 className="text-2xl mb-4 text-gray-900">
          Grow your business with confidence
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Turn your sales records into access to capital
        </p>
      </div>
      
      <div className="mt-auto space-y-3">
        <PrimaryButton onClick={onNext}>
          Get Started
        </PrimaryButton>
        <button 
          onClick={onLogin}
          className="w-full py-4 text-emerald-600 font-semibold text-lg rounded-2xl border-2 border-emerald-600 bg-white hover:bg-emerald-50 transition-colors"
        >
          Sign In
        </button>
      </div>
    </MobileScreen>
  );
}