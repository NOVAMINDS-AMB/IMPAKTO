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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === 'msme') {
          // Store the JWT token and the loan status in local storage
          localStorage.setItem('impakto_msme_token', data.token);
          localStorage.setItem('has_active_loan', data.has_active_loan ? 'true' : 'false');
          
          onNext(); // Proceed to 2FA Screen
        } else {
          setError('Access denied. This portal is for MSMEs only.');
        }
      } else {
        setError(data.detail || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
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
        <h2 className="text-2xl mb-2 text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mb-8">Sign in to continue to your business dashboard</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. johndoe or janesmith"
              className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <PrimaryButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}