import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { useState } from 'react';

interface Screen2SignUpProps {
  onNext: () => void;
}

export function Screen2SignUp({ onNext }: Screen2SignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <MobileScreen>
      <h2 className="text-2xl mb-2 text-gray-900">Create your account</h2>
      <p className="text-gray-600 mb-6">We'll need a few details to get you started</p>
      
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
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