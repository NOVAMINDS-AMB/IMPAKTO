import { Header } from './Header';

interface ApplicationReviewProps {
  onEdit: () => void;
  onContinue: () => void;
  onHome: () => void;
  onBack: () => void;
}

export function ApplicationReview({ onEdit, onContinue, onHome, onBack }: ApplicationReviewProps) {
  return (
    <div className="min-h-screen">
      <Header title="Application Review" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-300 rounded p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
              !
            </div>
            <div className="flex-1">
              <h2 className="text-red-900 mb-2">Application Contains Errors</h2>
              <p className="text-red-800 mb-4">
                The following issues were detected and must be corrected before proceeding:
              </p>
              
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Missing required document: Income Verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Loan amount exceeds maximum for selected product (Max: kshs 3,000)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Borrower address verification incomplete</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Application Summary</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Borrower:</span>
              <span>Maria Santos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Product:</span>
              <span>Microenterprise Loan - 6 months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Requested Amount:</span>
              <span>kshs 5,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-red-600">Requires Correction</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={onEdit}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
          >
            Edit application
          </button>
          
          <button
            onClick={onContinue}
            className="border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-50 transition-colors"
          >
            Continue anyway (for demo)
          </button>
        </div>
      </div>
    </div>
  );
}