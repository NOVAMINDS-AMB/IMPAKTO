import { Header } from './Header';

interface ApprovedLoanStatusProps {
  onReturnToPortfolio: () => void;
  onHome: () => void;
}

export function ApprovedLoanStatus({ onReturnToPortfolio, onHome }: ApprovedLoanStatusProps) {
  return (
    <div className="min-h-screen">
      <Header title="Loan Approved" onHome={onHome} showNavigation={false} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-300 rounded p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
              ✓
            </div>
            <div className="flex-1">
              <h2 className="text-green-900 mb-2">Loan Successfully Approved</h2>
              <p className="text-green-800">
                Application LA-2024-00158 has been approved and is now being processed for disbursement.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
            <h2>Loan Details</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">Approved</span>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Application ID:</span>
              <span>LA-2024-00158</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Borrower:</span>
              <span>Maria Santos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Amount:</span>
              <span>$3,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Term:</span>
              <span>6 months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span>18% APR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Approved By:</span>
              <span>Jean-Paul</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Approval Date:</span>
              <span>February 4, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expected Disbursement:</span>
              <span>February 6, 2026</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <h3 className="text-blue-900 mb-2 text-sm">Next Steps</h3>
          <ul className="space-y-1 text-blue-800 text-sm">
            <li>• Disbursement will be processed within 2 business days</li>
            <li>• Borrower will be notified via SMS and email</li>
            <li>• First payment due: March 6, 2026</li>
          </ul>
        </div>
        
        <div className="flex justify-end gap-3">
          <button className="border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-50 transition-colors">
            View approved loan
          </button>
          <button
            onClick={onReturnToPortfolio}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
          >
            Return to portfolio
          </button>
        </div>
      </div>
    </div>
  );
}