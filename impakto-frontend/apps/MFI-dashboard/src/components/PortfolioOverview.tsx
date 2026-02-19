import { useState } from 'react';
import { ChevronDown, User, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Updated interface to match the data coming from the Django API
export interface LoanData {
  id: string;
  type: string;
  amount: string | number;
  is_verified: boolean;
  timestamp: string | number | Date;
  // Keep these if you still need them for the past loan modal
  borrower?: string;
  term?: string;
  approvedDate?: string;
  completionDate?: string;
  approvedBy?: string;
  finalStatus?: string;
}

interface PortfolioOverviewProps {
  onCreateBorrower: () => void;
  onViewPerformance: () => void;
  onOpenPastLoan: (loan: LoanData) => void;
  onSettings: () => void;
  onLogout: () => void;
}

export function PortfolioOverview({ 
  onCreateBorrower, 
  onViewPerformance, 
  onOpenPastLoan, 
  onSettings, 
  onLogout 
}: PortfolioOverviewProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Fetch the data dynamically from Django using TanStack Query
  const { data: loans, isLoading } = useQuery({
    queryKey: ['mfi_portfolio'],
    queryFn: async () => {
      const res = await fetch('http://127.0.0.1:8000/api/mfi/portfolio');
      if (!res.ok) throw new Error('Failed to fetch portfolio');
      return res.json();
    }
  });

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1>Portfolio Overview</h1>
          
          {/* Loan Officer Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm">Jean-Paul</div>
                <div className="text-xs text-gray-500">Loan Officer</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onSettings();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors border-t border-gray-200 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="text-sm text-gray-600 mb-1">Total Loans</div>
            <div className="text-2xl">{loans?.length || 0}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="text-sm text-gray-600 mb-1">Active Loans</div>
            <div className="text-2xl">12</div>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="text-sm text-gray-600 mb-1">Total Value</div>
            <div className="text-2xl">Kshs 68,400</div>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="text-sm text-gray-600 mb-1">Approval Rate</div>
            <div className="text-2xl">87%</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2>Recent Loans</h2>
          <div className="flex gap-3">
            <button
              onClick={onCreateBorrower}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Create borrower
            </button>
            <button
              onClick={onViewPerformance}
              className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
            >
              View portfolio performance
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div>Loan ID</div>
            <div>Type</div>
            <div>Amount</div>
            <div>Verification</div>
            <div>Date</div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            loans?.map((loan: LoanData) => (
              <div
                key={loan.id}
                onClick={() => onOpenPastLoan(loan)}
                className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors items-center"
              >
                <div className="text-sm font-mono text-gray-600 truncate pr-4" title={loan.id}>
                  {loan.id.split('-').slice(0, 2).join('-')}...
                </div>
                <div className="text-sm font-medium text-gray-900">{loan.type}</div>
                <div className="text-sm text-gray-900">Kshs {loan.amount}</div>
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${loan.is_verified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {loan.is_verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                    {new Date(loan.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}