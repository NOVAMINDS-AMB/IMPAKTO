import { Header } from './Header';

interface SettingsProps {
  onHome: () => void;
  onBack: () => void;
}

export function Settings({ onHome, onBack }: SettingsProps) {
  return (
    <div className="min-h-screen">
      <Header title="Settings" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Loan Officer Profile</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="Jean-Paul"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="jean-paul@impakto.com"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="+1 234 567 8900"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Employee ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="EMP-2024-0042"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Employee ID cannot be changed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Change Password</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700">Current Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Notification Preferences</h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm">Email notifications for new loan applications</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm">SMS alerts for overdue payments</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Weekly portfolio performance summary</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onBack}
            className="border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
