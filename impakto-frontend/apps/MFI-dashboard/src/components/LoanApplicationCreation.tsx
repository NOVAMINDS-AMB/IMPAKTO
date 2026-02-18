import { Header } from './Header';

interface LoanApplicationCreationProps {
  onSubmit: () => void;
  onHome: () => void;
  onBack: () => void;
}

export function LoanApplicationCreation({ onSubmit, onHome, onBack }: LoanApplicationCreationProps) {
  return (
    <div className="min-h-screen">
      <Header title="Loan Application Creation" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Borrower Summary</h2>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2">Maria Santos</span>
            </div>
            <div>
              <span className="text-gray-600">ID:</span>
              <span className="ml-2">123-456-789</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2">+1 234 567 8900</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className="ml-2">Verified</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Loan Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700">Loan Product</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select loan product...</option>
                <option>Microenterprise Loan - 6 months</option>
                <option>Microenterprise Loan - 12 months</option>
                <option>Agricultural Loan - 12 months</option>
                <option>Education Loan - 24 months</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Loan Amount</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5000.00"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Purpose</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe the purpose of the loan..."
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
          >
            Submit application
          </button>
        </div>
      </div>
    </div>
  );
}