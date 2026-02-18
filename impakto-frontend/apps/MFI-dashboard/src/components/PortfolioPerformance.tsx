import { Header } from './Header';

interface PortfolioPerformanceProps {
  onOpenPastDecision: () => void;
  onHome: () => void;
  onBack: () => void;
}

export function PortfolioPerformance({ onOpenPastDecision, onHome, onBack }: PortfolioPerformanceProps) {
  return (
    <div className="min-h-screen">
      <Header title="Portfolio Performance" onHome={onHome} onBack={onBack} />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Performance Metrics</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Repayment Rate</div>
              <div className="text-3xl mb-1">94%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600 mb-2">Default Rate</div>
              <div className="text-3xl mb-1">3.2%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '3.2%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600 mb-2">Portfolio at Risk (30 days)</div>
              <div className="text-3xl mb-1">2.8%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '2.8%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="mb-4 pb-2 border-b border-gray-200">Loan Distribution by Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">12</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '39%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">9</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Overdue</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">2</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="mb-4 pb-2 border-b border-gray-200">Average Loan Metrics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Loan Amount</span>
                <span>$2,974</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Term</span>
                <span>8.2 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Risk Score</span>
                <span>76/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time to Decision</span>
                <span>2.3 days</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded p-6">
          <h2 className="mb-4 pb-2 border-b border-gray-200">Monthly Disbursement Trend</h2>
          <div className="flex items-end justify-between h-48 gap-2">
            <div className="flex-1 bg-blue-200 rounded-t" style={{ height: '60%' }}>
              <div className="text-xs text-center mt-2">Aug</div>
            </div>
            <div className="flex-1 bg-blue-200 rounded-t" style={{ height: '75%' }}>
              <div className="text-xs text-center mt-2">Sep</div>
            </div>
            <div className="flex-1 bg-blue-200 rounded-t" style={{ height: '55%' }}>
              <div className="text-xs text-center mt-2">Oct</div>
            </div>
            <div className="flex-1 bg-blue-200 rounded-t" style={{ height: '80%' }}>
              <div className="text-xs text-center mt-2">Nov</div>
            </div>
            <div className="flex-1 bg-blue-200 rounded-t" style={{ height: '90%' }}>
              <div className="text-xs text-center mt-2">Dec</div>
            </div>
            <div className="flex-1 bg-blue-500 rounded-t" style={{ height: '95%' }}>
              <div className="text-xs text-center mt-2 text-white">Jan</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onOpenPastDecision}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
          >
            Open past decision
          </button>
        </div>
      </div>
    </div>
  );
}