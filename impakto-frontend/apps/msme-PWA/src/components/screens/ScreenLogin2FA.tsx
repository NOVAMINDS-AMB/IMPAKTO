import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Sprout, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ScreenLogin2FAProps {
  onNext: (userType: 'user1' | 'user2') => void;
  onBack: () => void;
  username: string;
}

export function ScreenLogin2FA({ onNext, onBack, username }: ScreenLogin2FAProps) {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    // Dummy verification logic for MVP: Accept any 6 digit code
    if (code.length === 6) {
      // Read the real database status we saved in the previous step
      const hasActiveLoan = localStorage.getItem('has_active_loan') === 'true';
      
      if (hasActiveLoan) {
        onNext('user2'); // Route to active loan dashboard
      } else {
        onNext('user1'); // Route to no loan dashboard
      }
    }
  };

  return (
    <MobileScreen>
      <button onClick={onBack} className="mb-6 text-gray-600 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white-100 rounded-full p-3">
            <img 
            src="/Impakto Official Logo.jpeg" 
            alt="Impakto logo" 
            className="w-8 h-8 object-contain" 
            />
          </div>
          <h1 className="text-2xl text-gray-900">
            <span className="font-bold">Impakto</span>
          </h1>
        </div>
        <h2 className="text-2xl mb-2 text-gray-900">Verify your identity</h2>
        <p className="text-gray-600 mb-8">
          We've sent a verification code to your registered phone number
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Demo Mode:</span><br/>
            Enter any 6-digit code (e.g. 123456) to proceed. Your dashboard will load based on your real database profile.
          </p>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            className="w-full px-4 py-4 text-lg text-center tracking-widest font-mono border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button className="mt-4 text-emerald-600 font-medium">Resend code</button>
      </div>
      <div className="mt-auto">
        <PrimaryButton onClick={handleVerify} disabled={code.length !== 6}>
          Verify
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}