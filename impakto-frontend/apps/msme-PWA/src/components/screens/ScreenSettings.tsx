import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, User, Mail, Phone, Lock, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ScreenSettingsProps {
  onBack: () => void;
  userType: 'new' | 'user1' | 'user2'; // Kept for backwards compatibility with your routing
}

export function ScreenSettings({ onBack, userType }: ScreenSettingsProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [hasActiveLoan, setHasActiveLoan] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch real user data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('impakto_msme_token');
        const response = await fetch('http://localhost:8000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
          setUsername(data.username);
          setHasActiveLoan(data.has_active_loan);
        } else {
          setError('Failed to load profile data.');
        }
      } catch (err) {
        setError('Network error connecting to the server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('impakto_msme_token');
      const response = await fetch('http://localhost:8000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          username,
          current_password: currentPassword || null,
          new_password: newPassword || null
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError(data.detail || 'Failed to update profile.');
      }
    } catch (err) {
      setError('Network error while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading profile data...</p>
        </div>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      {/* 1. Top Section - Direct children of MobileScreen */}
      <button onClick={onBack} className="mb-4 text-gray-600 flex items-center gap-2 flex-shrink-0">
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <h2 className="text-2xl mb-1 text-gray-900 flex-shrink-0">Settings</h2>
      <p className="text-gray-600 mb-6 flex-shrink-0">Manage your account information</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex-shrink-0">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 flex items-center gap-3 flex-shrink-0">
          <Save className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-800 font-medium">Your settings have been saved successfully!</p>
        </div>
      )}

      {/* 2. Middle Section - flex-1 pushes the button down, overflow handles scrolling */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-2">
        {/* Personal Information */}
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" /> Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm flex items-center gap-2"><Mail className="w-4 h-4" /> Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> Phone Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-600" /> Change Password
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Leave blank if not changing" className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        {/* Account Status Info */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Account Status:</span> {hasActiveLoan ? 'Active User (With Loan)' : 'Active User (No Loan)'}
          </p>
        </div>
      </div>

      {/* 3. Bottom Section - mt-auto and flex-shrink-0 lock it to the bottom */}
      <div className="mt-auto pt-4 pb-6 flex-shrink-0 bg-gray-50 border-t border-gray-200">
        <PrimaryButton onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}