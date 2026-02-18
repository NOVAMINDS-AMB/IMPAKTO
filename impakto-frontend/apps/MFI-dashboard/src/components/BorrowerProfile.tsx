import { Header } from './Header';

interface BorrowerProfileProps {
  borrowerName?: string | null;
  onSave: () => void;
  onHome: () => void;
  onBack: () => void;
}

export function BorrowerProfile({ borrowerName, onSave, onHome, onBack }: BorrowerProfileProps) {
  const isNewBorrower = !borrowerName;

  return (
    <div className="min-h-screen">
      <Header 
        title={isNewBorrower ? 'Create Borrower Profile' : 'Borrower Profile'} 
        onHome={onHome} 
        onBack={onBack} 
      />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Borrower Identity</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={borrowerName || "Enter full name"}
                defaultValue={borrowerName || ""}
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">ID Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123-456-789"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Date of Birth</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1985-03-15"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 234 567 8900"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block mb-1 text-sm text-gray-700">Address</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Main Street, City, Country"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Documents</h2>
          
          <div className="space-y-2 mb-4">
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm">ID_Document.pdf</span>
                <span className="text-xs text-gray-500">2.3 MB</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm">Proof_of_Address.pdf</span>
                <span className="text-xs text-gray-500">1.8 MB</span>
              </div>
            </div>
          </div>
          
          <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors">
            Upload document
          </button>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onSave}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
          >
            Save borrower profile
          </button>
        </div>
      </div>
    </div>
  );
}