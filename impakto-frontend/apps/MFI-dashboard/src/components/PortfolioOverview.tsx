import { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';

export interface LoanData {
  id: string;
  borrower: string;
  amount: string;
  status: string;
  date: string;
  statusColor: string;
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

export const mockLoans: LoanData[] = [
  {
    id: 'LA-2024-00158',
    borrower: 'Maria Santos',
    amount: 'Kshs 3,000.00',
    status: 'Approved',
    date: 'Feb 4, 2026',
    statusColor: 'bg-green-100 text-green-800',
    term: '6 months',
    approvedDate: 'Feb 4, 2026',
    approvedBy: 'Jean-Paul',
    finalStatus: 'Recently Approved',
  },
  {
    id: 'LA-2024-00145',
    borrower: 'Carlos Rodriguez',
    amount: 'Kshs 2,500.00',
    status: 'Active',
    date: 'Jan 28, 2026',
    statusColor: 'bg-blue-100 text-blue-800',
    term: '4 months',
    approvedDate: 'Jan 28, 2026',
    approvedBy: 'Jean-Paul',
    finalStatus: 'In Progress - 2 payments made',
  },
  {
    id: 'LA-2024-00132',
    borrower: 'Ana Martinez',
    amount: 'Kshs 4,200.00',
    status: 'Active',
    date: 'Jan 15, 2026',
    statusColor: 'bg-blue-100 text-blue-800',
    term: '8 months',
    approvedDate: 'Jan 15, 2026',
    approvedBy: 'Jean-Paul',
    finalStatus: 'In Progress - 3 payments made',
  },
  {
    id: 'LA-2023-00891',
    borrower: 'Luis Fernandez',
    amount: 'Kshs 1,800.00',
    status: 'Completed',
    date: 'Dec 20, 2025',
    statusColor: 'bg-gray-100 text-gray-800',
    term: '6 months',
    approvedDate: 'July 15, 2025',
    completionDate: 'December 20, 2025',
    approvedBy: 'Jean-Paul',
    finalStatus: 'Paid in Full',
  },
  {
    id: 'LA-2023-00876',
    borrower: 'Sofia Garcia',
    amount: 'Kshs 3,500.00',
    status: 'Completed',
    date: 'Dec 10, 2025',
    statusColor: 'bg-gray-100 text-gray-800',
    term: '6 months',
    approvedDate: 'June 10, 2025',
    completionDate: 'December 10, 2025',
    approvedBy: 'Jean-Paul',
    finalStatus: 'Paid in Full',
  },
];

export function PortfolioOverview({ onCreateBorrower, onViewPerformance, onOpenPastLoan, onSettings, onLogout }: PortfolioOverviewProps) {
  const [showDropdown, setShowDropdown] = useState(false);

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
            <div className="text-2xl">23</div>
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
        
        <div className="bg-white border border-gray-200 rounded">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 text-sm text-gray-600">
            <div>Loan ID</div>
            <div>Borrower</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Date</div>
          </div>
          
          {mockLoans.map((loan) => (
            <div
              key={loan.id}
              onClick={() => onOpenPastLoan(loan)}
              className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="text-sm">{loan.id}</div>
              <div className="text-sm">{loan.borrower}</div>
              <div className="text-sm">{loan.amount}</div>
              <div>
                <span className={`px-2 py-1 rounded text-xs ${loan.statusColor}`}>
                  {loan.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">{loan.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}