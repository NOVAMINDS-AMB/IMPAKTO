import { Header } from './Header';

interface LoanApplicationOverviewProps {
  onOpen: () => void;
  onHome: () => void;
  onBack: () => void;
}

export function LoanApplicationOverview({ onOpen, onHome, onBack }: LoanApplicationOverviewProps) {
  return (
    <div className="min-h-screen">
      <Header title="Loan Application Overview" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Application Details</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-600 block mb-1">Application ID</span>
              <span>LA-2024-00158</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-1">Submission Date</span>
              <span>February 4, 2026</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-1">Borrower Name</span>
              <span>Maria Santos</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-1">Loan Officer</span>
              <span>Jean-Paul</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm mb-3">Loan Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span>Microenterprise Loan - 6 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
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
                <span className="text-gray-600">Status:</span>
                <span className="text-yellow-600">Pending Review</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <p className="text-blue-900 text-sm">
            This application is ready for review. Click below to begin the loan review process.
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onOpen}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
          >
            Open loan application
          </button>
        </div>
      </div>
    </div>
  );
}