import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Sprout, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ScreenLoginProps {
  onNext: () => void;
  onBack: () => void;
}

export function ScreenLogin({ onNext, onBack }: ScreenLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <MobileScreen>
      <button 
        onClick={onBack}
        className="mb-6 text-gray-600 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-100 rounded-full p-3">
            <Sprout className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl text-gray-900">
            <span className="font-bold">Impakto</span>
          </h1>
        </div>

        <h2 className="text-2xl mb-2 text-gray-900">
          Welcome back
        </h2>
        <p className="text-gray-600 mb-8">
          Sign in to continue to your business dashboard
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
              className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>
          Sign In
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}