import { MobileScreen } from '../MobileScreen';
import { 
  Camera, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Award, 
  Lightbulb, 
  DollarSign,
  ChevronRight,
  Sprout,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

interface ScreenMainDashboardProps {
  isNewUser: boolean;
  onScanLedger: () => void;
  onViewLedger: () => void;
  onViewTrustScore: () => void;
  onViewAISuggestions: () => void;
  onLoanApplication: () => void;
  onLogout: () => void;
  onSettings: () => void;
}

export function ScreenMainDashboard({ 
  isNewUser, 
  onScanLedger, 
  onViewLedger,
  onViewTrustScore,
  onViewAISuggestions,
  onLoanApplication,
  onLogout,
  onSettings
}: ScreenMainDashboardProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <MobileScreen backgroundColor="bg-gray-50">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between relative">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <img 
            src="/Impakto Official Logo.jpeg" 
            alt="Impakto logo" 
            className="w-8 h-8 object-contain" 
            />
            <h1 className="text-xl text-gray-900 font-bold">Impakto</h1>
          </div>
          <p className="text-gray-600">Your Business Dashboard</p>
        </div>

        {/* User Menu Icon */}
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="bg-emerald-100 rounded-full p-2 hover:bg-emerald-200 transition-colors"
        >
          <User className="w-6 h-6 text-emerald-600" />
        </button>

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 min-w-[180px]">
            <button
              onClick={() => {
                setShowUserMenu(false);
                onSettings();
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                setShowUserMenu(false);
                onLogout();
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Overview of Activities */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Business Overview</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 rounded-lg p-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-gray-600 text-sm">Total Sales</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {isNewUser ? 'Kshs 0' : 'Kshs 12,500'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 rounded-lg p-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-gray-600 text-sm">Total Expenses</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {isNewUser ? 'Kshs 0' : 'Kshs 7,800'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-600 text-sm">Current Balance</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {isNewUser ? 'Kshs 0' : 'Kshs 4,700'}
              </p>
            </div>
          </div>
        </div>

        {/* Ledger Scanning Feature */}
        <button
          onClick={isNewUser ? onScanLedger : onViewLedger}
          className="w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-lg p-3">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ledger Records</h3>
                <p className="text-sm text-gray-600">
                  {isNewUser 
                    ? 'Scan your first ledger to get started' 
                    : 'View records or add new entries'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Trust Score Feature */}
        <button
          onClick={onViewTrustScore}
          className="w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 rounded-lg p-3">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Trust Score</h3>
                <p className="text-sm text-gray-600">
                  {isNewUser 
                    ? 'Build your score with ledger entries' 
                    : 'View your current trust score'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* AI Suggestions Feature */}
        <button
          onClick={onViewAISuggestions}
          className="w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-100 rounded-lg p-3">
                <Lightbulb className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Suggestions</h3>
                <p className="text-sm text-gray-600">
                  {isNewUser 
                    ? 'Available after a few ledger entries' 
                    : 'Get personalized business insights'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Loan Procedure Feature */}
        <button
          onClick={onLoanApplication}
          className="w-full bg-emerald-600 rounded-xl p-4 text-left hover:bg-emerald-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Loan Services</h3>
                <p className="text-sm text-emerald-100">
                  {isNewUser 
                    ? 'Access capital for your business' 
                    : 'View status or apply for new loan'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>
    </MobileScreen>
  );
}