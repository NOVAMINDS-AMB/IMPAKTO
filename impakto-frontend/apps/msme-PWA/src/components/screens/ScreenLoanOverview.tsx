import { useState, useEffect } from 'react';
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, DollarSign, Clock, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { loansService, Loan, LoanEligibility } from '../../lib/loans';

interface ScreenLoanOverviewProps {
  onBack: () => void;
  onApplyNewLoan: (eligibility: LoanEligibility) => void;
  onViewRepayment: (loan: Loan) => void;
}

export function ScreenLoanOverview({ 
  onBack, 
  onApplyNewLoan, 
  onViewRepayment
}: ScreenLoanOverviewProps) {
  const [loading, setLoading] = useState(true);
  const [activeLoan, setActiveLoan] = useState<Loan | null>(null);
  const [eligibility, setEligibility] = useState<LoanEligibility | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Check for active loan first
        const loan = await loansService.getActiveLoan();
        setActiveLoan(loan);
        
        // If no active loan, check eligibility
        if (!loan) {
          const elig = await loansService.checkLoanEligibility();
          setEligibility(elig);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load loan data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <p className="text-gray-500">Loading loan details...</p>
        </div>
      </MobileScreen>
    );
  }

  if (error) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-gray-800 mb-4 text-center">{error}</p>
          <PrimaryButton onClick={onBack}>Back to Dashboard</PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  // Not eligible for a loan
  if (!activeLoan && (!eligibility || !eligibility.is_eligible)) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <button 
          onClick={onBack}
          className="mb-4 text-gray-600 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 overflow-y-auto">
          <div className="bg-amber-100 rounded-full p-6 mb-6">
            <Lock className="w-16 h-16 text-amber-600" />
          </div>
          <h2 className="text-2xl mb-3 text-gray-900">Build Your Trust Score First</h2>
          <p className="text-gray-600 mb-8">
            {eligibility?.reason || "Keep adding ledger entries to build your trust score and unlock loan services"}
          </p>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-left w-full">
            <h3 className="font-semibold text-emerald-900 mb-3">Why Get a Loan?</h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Increase your inventory and boost sales</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Flexible repayment terms that fit your business</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Build trust score through successful repayments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Fast approval based on your ledger history</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={onBack}>
            Back to Dashboard
          </PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  // Eligible to apply
  if (!activeLoan && eligibility?.is_eligible) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <button 
          onClick={onBack}
          className="mb-4 text-gray-600 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <h2 className="text-2xl mb-1 text-gray-900">Loan Services</h2>
        <p className="text-gray-600 mb-6">Access capital for your business</p>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Loan Benefits */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h3 className="font-semibold text-emerald-900 mb-3">You are Approved!</h3>
            <p className="text-sm text-emerald-800 mb-3">
              Your excellent Trust Score has unlocked access to capital.
            </p>
          </div>

          {/* Loan Options */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Your Pre-approved Limit</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-gray-700">Maximum Amount</span>
                <span className="font-semibold text-emerald-700">Kshs {eligibility.max_amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Loan Terms Info */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Loan Information</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium text-gray-900">{eligibility.interest_rate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Repayment Period</span>
                <span className="font-medium text-gray-900">{eligibility.repayment_duration_days} days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Application Status</span>
                <span className="font-medium text-emerald-600">Ready to Apply</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={() => onApplyNewLoan(eligibility)}>
            Apply for Loan
          </PrimaryButton>
        </div>
      </MobileScreen>
    );
  }

  // User has active loan
  if (activeLoan) {
    return (
      <MobileScreen backgroundColor="bg-gray-50">
        <button 
          onClick={onBack}
          className="mb-4 text-gray-600 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <h2 className="text-2xl mb-1 text-gray-900">Active Loan</h2>
        <p className="text-gray-600 mb-6">Your current loan details</p>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Loan Summary */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Loan Amount</h3>
            </div>
            <p className="text-4xl font-bold mb-1">Kshs {activeLoan.principal_amount.toLocaleString()}</p>
            <p className="text-emerald-100">
              Approved on {activeLoan.disbursed_at ? new Date(activeLoan.disbursed_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          {/* Outstanding Amount */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-amber-100 rounded-lg p-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm text-gray-600 mb-1">Outstanding Balance</p>
                <p className="text-2xl font-semibold text-gray-900">Kshs {activeLoan.outstanding_balance.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Repayment Schedule */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm text-gray-600 mb-1">Next Payment Due</p>
                <p className="text-xl font-semibold text-gray-900">
                  {activeLoan.due_date ? new Date(activeLoan.due_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Loan Status */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Loan Details</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium text-gray-900">{activeLoan.interest_rate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Repayment Period</span>
                <span className="font-medium text-gray-900">{activeLoan.repayment_duration_days} days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-emerald-600">{activeLoan.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={() => onViewRepayment(activeLoan)}>
            Make Payment
          </PrimaryButton>
        </div>
      </MobileScreen>
    );
  }
  
  return null;
}