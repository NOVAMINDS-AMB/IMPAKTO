import { useState } from 'react';
import { Header } from './Header';

interface LoanReviewProps {
  onApprove: () => void;
  onHome: () => void;
  onBack: () => void;
}

export function LoanReview({ onApprove, onHome, onBack }: LoanReviewProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen">
      <Header title="Loan Review" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Loan Summary</h2>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Borrower:</span>
              <span className="ml-2">Maria Santos</span>
            </div>
            <div>
              <span className="text-gray-600">Application ID:</span>
              <span className="ml-2">LA-2024-00158</span>
            </div>
            <div>
              <span className="text-gray-600">Amount:</span>
              <span className="ml-2">Kshs 3,000.00</span>
            </div>
            <div>
              <span className="text-gray-600">Term:</span>
              <span className="ml-2">6 months</span>
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
                  <span>Jan 15, 2026 - Deposit</span>
                  <span className="text-green-600">+Kshs 2,500</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Jan 08, 2026 - Purchase</span>
                  <span className="text-red-600">−Kshs 450</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Dec 22, 2025 - Deposit</span>
                  <span className="text-green-600">+Kshs 1,800</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Dec 10, 2025 - Purchase</span>
                  <span className="text-red-600">−Kshs 320</span>
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
                    <div>Previous Loan: ML-2025-00089</div>
                    <div className="text-xs text-gray-500">$2,000 - 6 months</div>
                  </div>
                  <span className="text-green-600">Paid in Full</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div>Payment Record</div>
                    <div className="text-xs text-gray-500">6/6 payments on time</div>
                  </div>
                  <span className="text-green-600">100% On-Time</span>
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
            <h3>Risk Indicators</h3>
            <span className="text-gray-500">{expandedSection === 'risk' ? '−' : '+'}</span>
          </div>
          {expandedSection === 'risk' && (
            <div className="px-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Credit History Score</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Good (720)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Debt-to-Income Ratio</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Low (28%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment History</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Excellent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Income Stability</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">Moderate</span>
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
            <h3>Score Explanation</h3>
            <span className="text-gray-500">{expandedSection === 'score' ? '−' : '+'}</span>
          </div>
          {expandedSection === 'score' && (
            <div className="px-4 pb-4 border-t border-gray-200 pt-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Overall Risk Score</span>
                  <span className="text-xl">78/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Score indicates LOW RISK</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="block mb-1">Positive Factors:</span>
                  <ul className="pl-4 space-y-1 text-gray-700">
                    <li>• Perfect repayment history on previous loan</li>
                    <li>• Stable income from established business (3 years)</li>
                    <li>• Low existing debt burden</li>
                    <li>• Complete documentation provided</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <span className="block mb-1">Risk Factors:</span>
                  <ul className="pl-4 space-y-1 text-gray-700">
                    <li>• Income variability in seasonal business</li>
                    <li>• Limited credit history (only 1 previous loan)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
          <p className="text-green-900">
            Based on the analysis above, this loan application meets approval criteria.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button className="border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-50 transition-colors">
            Request More Information
          </button>
          <button
            onClick={onApprove}
            className="bg-green-600 text-white py-2 px-8 rounded hover:bg-green-700 transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}