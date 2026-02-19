import { useState } from 'react';
import { Header } from './Header';
import { LoanData } from './PortfolioOverview';

interface PastLoanDetailProps {
  onHome: () => void;
  onBack: () => void;
  loanData?: LoanData;
}

export function PastLoanDetail({ onHome, onBack, loanData }: PastLoanDetailProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Default data if no loanData is provided
  const loan = loanData || {
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
  };

  const isCompleted = loan.status === 'Completed';
  const isActive = loan.status === 'Active';
  const isApproved = loan.status === 'Approved';

  return (
    <div className="min-h-screen">
      <Header title="Loan Detail" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-4xl mx-auto p-6">
        {isCompleted && (
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <p className="text-blue-900 text-sm">
              This is a historical record of a completed loan. All information is read-only and maintained for audit and review purposes.
            </p>
          </div>
        )}

        {isActive && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
            <p className="text-yellow-900 text-sm">
              This loan is currently active. Borrower is making regular payments.
            </p>
          </div>
        )}

        {isApproved && (
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
            <p className="text-green-900 text-sm">
              This loan was recently approved and is awaiting first payment.
            </p>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
            <h2>Loan Summary</h2>
            <span className={`px-3 py-1 rounded text-sm ${loan.statusColor}`}>
              {loan.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Borrower:</span>
              <span className="ml-2">{loan.borrower}</span>
            </div>
            <div>
              <span className="text-gray-600">Application ID:</span>
              <span className="ml-2">{loan.id}</span>
            </div>
            <div>
              <span className="text-gray-600">Amount:</span>
              <span className="ml-2">{loan.amount}</span>
            </div>
            <div>
              <span className="text-gray-600">Term:</span>
              <span className="ml-2">{loan.term || '6 months'}</span>
            </div>
            <div>
              <span className="text-gray-600">Approved Date:</span>
              <span className="ml-2">{loan.approvedDate || loan.date}</span>
            </div>
            {loan.completionDate && (
              <div>
                <span className="text-gray-600">Completion Date:</span>
                <span className="ml-2">{loan.completionDate}</span>
              </div>
            )}
            <div>
              <span className="text-gray-600">Approved By:</span>
              <span className="ml-2">{loan.approvedBy || 'Jean-Paul'}</span>
            </div>
            <div>
              <span className="text-gray-600">Current Status:</span>
              <span className={`ml-2 ${isCompleted ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {loan.finalStatus || loan.status}
              </span>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="bg-white border border-gray-200 rounded mb-4">
          <div
            onClick={() => toggleSection('transactions')}
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <h3>Transaction History</h3>
            <span className="text-gray-500">{expandedSection === 'transactions' ? '−' : '+'}</span>
          </div>
          {expandedSection === 'transactions' && (
            <div className="px-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>May 10, 2025 - Deposit</span>
                  <span className="text-green-600">+Kshs 1,200</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>April 22, 2025 - Purchase</span>
                  <span className="text-red-600">−Kshs 280</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>April 05, 2025 - Deposit</span>
                  <span className="text-green-600">+Kshs 950</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>March 18, 2025 - Purchase</span>
                  <span className="text-red-600">−Kshs 340</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Repayment History Section */}
        <div className="bg-white border border-gray-200 rounded mb-4">
          <div
            onClick={() => toggleSection('repayments')}
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <h3>Repayment History</h3>
            <span className="text-gray-500">{expandedSection === 'repayments' ? '−' : '+'}</span>
          </div>
          {expandedSection === 'repayments' && (
            <div className="px-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div>Payment 1 - Aug 15, 2025</div>
                    <div className="text-xs text-gray-500">Kshs 300.00</div>
                  </div>
                  <span className="text-green-600">On Time</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div>Payment 2 - Sep 15, 2025</div>
                    <div className="text-xs text-gray-500">Kshs 300.00</div>
                  </div>
                  <span className="text-green-600">On Time</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div>Payment 3 - Oct 15, 2025</div>
                    <div className="text-xs text-gray-500">Kshs 300.00</div>
                  </div>
                  <span className="text-green-600">On Time</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div>Payment 4 - Nov 15, 2025</div>
                    <div className="text-xs text-gray-500">Kshs 300.00</div>
                  </div>
                  <span className="text-green-600">On Time</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div>Payment 5 - Dec 15, 2025</div>
                    <div className="text-xs text-gray-500">Kshs 300.00</div>
                  </div>
                  <span className="text-green-600">On Time</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div>Final Payment - Dec 20, 2025</div>
                    <div className="text-xs text-gray-500">Kshs 300.00</div>
                  </div>
                  <span className="text-green-600">Early</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Risk Indicators Section */}
        <div className="bg-white border border-gray-200 rounded mb-4">
          <div
            onClick={() => toggleSection('risk')}
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <h3>Risk Indicators (At Time of Approval)</h3>
            <span className="text-gray-500">{expandedSection === 'risk' ? '−' : '+'}</span>
          </div>
          {expandedSection === 'risk' && (
            <div className="px-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Credit History Score</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Good (695)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Debt-to-Income Ratio</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">Moderate (35%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment History</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Income Stability</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Stable</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Score Explanation Section */}
        <div className="bg-white border border-gray-200 rounded mb-6">
          <div
            onClick={() => toggleSection('score')}
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <h3>Score Explanation (At Time of Approval)</h3>
            <span className="text-gray-500">{expandedSection === 'score' ? '−' : '+'}</span>
          </div>
          {expandedSection === 'score' && (
            <div className="px-4 pb-4 border-t border-gray-200 pt-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Overall Risk Score</span>
                  <span className="text-xl">72/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Score indicated LOW-MODERATE RISK</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="block mb-1">Positive Factors:</span>
                  <ul className="pl-4 space-y-1 text-gray-700">
                    <li>• Stable employment (2+ years)</li>
                    <li>• Previous micro-savings account in good standing</li>
                    <li>• Strong community references</li>
                    <li>• All required documentation provided</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <span className="block mb-1">Risk Factors:</span>
                  <ul className="pl-4 space-y-1 text-gray-700">
                    <li>• First-time borrower with limited credit history</li>
                    <li>• Moderate debt-to-income ratio</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Decision Outcome</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Approval Decision:</span>
              <span className="text-green-600">Approved</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Decision Date:</span>
              <span>July 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Officer:</span>
              <span>Jean-Paul</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Actual Performance:</span>
              <span className="text-green-600">Excellent - All payments on time, closed early</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Decision Quality:</span>
              <span className="text-green-600">Validated - Borrower performed as expected</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded p-4">
          <h3 className="text-green-900 mb-2 text-sm">Decision Validation</h3>
          <p className="text-green-800 text-sm">
            This loan was successfully repaid with all payments made on time. The initial risk assessment of 72/100 (Low-Moderate Risk) proved accurate. The borrower's performance validates the approval decision made by loan officer Jean-Paul on July 15, 2025.
          </p>
        </div>
      </div>
    </div>
  );
}