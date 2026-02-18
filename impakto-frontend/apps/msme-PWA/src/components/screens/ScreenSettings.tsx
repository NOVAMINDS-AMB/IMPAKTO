import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, User, Mail, Phone, Lock, Save } from 'lucide-react';
import { useState } from 'react';

interface ScreenSettingsProps {
  onBack: () => void;
  userType: 'new' | 'user1' | 'user2';
}

export function ScreenSettings({ onBack, userType }: ScreenSettingsProps) {
  // Set different default values based on user type
  const getDefaultValues = () => {
    if (userType === 'user1') {
      return {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+254 712 345 678',
        username: 'johndoe',
      };
    } else if (userType === 'user2') {
      return {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+254 723 456 789',
        username: 'janesmith',
      };
    } else {
      return {
        name: 'New User',
        email: 'newuser@email.com',
        phone: '+254 700 000 000',
        username: 'newuser',
      };
    }
  };

  const defaults = getDefaultValues();
  const [name, setName] = useState(defaults.name);
  const [email, setEmail] = useState(defaults.email);
  const [phone, setPhone] = useState(defaults.phone);
  const [username, setUsername] = useState(defaults.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      <button 
        onClick={onBack}
        className="mb-4 text-gray-600 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <h2 className="text-2xl mb-1 text-gray-900">Settings</h2>
      <p className="text-gray-600 mb-6">Manage your account information</p>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 flex items-center gap-3">
          <Save className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-800 font-medium">
            Your settings have been saved successfully!
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Personal Information Section */}
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            Personal Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-600" />
            Change Password
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">Passwords do not match</p>
              </div>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Account Type:</span> {
              userType === 'new' ? 'New User' : 
              userType === 'user1' ? 'Active User (No Loan)' : 
              'Active User (With Loan)'
            }
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <PrimaryButton onClick={handleSave}>
          Save Changes
        </PrimaryButton>
      </div>
    </MobileScreen>
  );
}
