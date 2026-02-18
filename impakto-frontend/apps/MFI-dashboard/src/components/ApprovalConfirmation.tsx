import { Header } from './Header';

interface ApprovalConfirmationProps {
  onConfirm: () => void;
  onHome: () => void;
  onBack: () => void;
}

export function ApprovalConfirmation({ onConfirm, onHome, onBack }: ApprovalConfirmationProps) {
  return (
    <div className="min-h-screen">
      <Header title="Approval Confirmation" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-300 rounded p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
              !
            </div>
            <div className="flex-1">
              <h2 className="text-yellow-900 mb-2">Confirm Loan Approval</h2>
              <p className="text-yellow-800 mb-4">
                You are about to approve this loan application. This action will:
              </p>
              
              <ul className="space-y-2 text-yellow-800 mb-4">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Commit funds of $3,000.00 to borrower Maria Santos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Initiate disbursement process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Create a binding loan agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Record your approval decision in the system</span>
                </li>
              </ul>
              
              <p className="text-yellow-900">
                This decision will be permanently recorded and attributed to loan officer Jean-Paul.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Loan Details Summary</h2>
          
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
              <span className="text-gray-600">Loan Amount:</span>
              <span className="ml-2">$3,000.00</span>
            </div>
            <div>
              <span className="text-gray-600">Term:</span>
              <span className="ml-2">6 months</span>
            </div>
            <div>
              <span className="text-gray-600">Risk Score:</span>
              <span className="ml-2">78/100 (Low Risk)</span>
            </div>
            <div>
              <span className="text-gray-600">Interest Rate:</span>
              <span className="ml-2">18% APR</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button className="border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white py-2 px-8 rounded hover:bg-green-700 transition-colors"
          >
            Confirm approval
          </button>
        </div>
      </div>
    </div>
  );
}