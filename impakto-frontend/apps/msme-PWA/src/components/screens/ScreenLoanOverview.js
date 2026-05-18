import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, DollarSign, Clock, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { loansService } from '../../lib/loans';
export function ScreenLoanOverview({ onBack, onApplyNewLoan, onViewRepayment }) {
    const [loading, setLoading] = useState(true);
    const [activeLoan, setActiveLoan] = useState(null);
    const [eligibility, setEligibility] = useState(null);
    const [error, setError] = useState(null);
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
            }
            catch (err) {
                setError(err.message || "Failed to load loan data");
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return (_jsx(MobileScreen, { backgroundColor: "bg-gray-50", children: _jsx("div", { className: "flex-1 flex items-center justify-center overflow-y-auto", children: _jsx("p", { className: "text-gray-500", children: "Loading loan details..." }) }) }));
    }
    if (error) {
        return (_jsx(MobileScreen, { backgroundColor: "bg-gray-50", children: _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mb-4" }), _jsx("p", { className: "text-gray-800 mb-4 text-center", children: error }), _jsx(PrimaryButton, { onClick: onBack, children: "Back to Dashboard" })] }) }));
    }
    // Not eligible for a loan
    if (!activeLoan && (!eligibility || !eligibility.is_eligible)) {
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center px-4 overflow-y-auto", children: [_jsx("div", { className: "bg-amber-100 rounded-full p-6 mb-6", children: _jsx(Lock, { className: "w-16 h-16 text-amber-600" }) }), _jsx("h2", { className: "text-2xl mb-3 text-gray-900", children: "Build Your Trust Score First" }), _jsx("p", { className: "text-gray-600 mb-8", children: eligibility?.reason || "Keep adding ledger entries to build your trust score and unlock loan services" }), _jsxs("div", { className: "bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-left w-full", children: [_jsx("h3", { className: "font-semibold text-emerald-900 mb-3", children: "Why Get a Loan?" }), _jsxs("ul", { className: "space-y-2 text-sm text-emerald-800", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Increase your inventory and boost sales" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Flexible repayment terms that fit your business" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Build trust score through successful repayments" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Fast approval based on your ledger history" })] })] })] })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onBack, children: "Back to Dashboard" }) })] }));
    }
    // Eligible to apply
    if (!activeLoan && eligibility?.is_eligible) {
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }), _jsx("h2", { className: "text-2xl mb-1 text-gray-900", children: "Loan Services" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Access capital for your business" }), _jsxs("div", { className: "flex-1 overflow-y-auto space-y-4", children: [_jsxs("div", { className: "bg-emerald-50 rounded-xl p-4 border border-emerald-200", children: [_jsx("h3", { className: "font-semibold text-emerald-900 mb-3", children: "You are Approved!" }), _jsx("p", { className: "text-sm text-emerald-800 mb-3", children: "Your excellent Trust Score has unlocked access to capital." })] }), _jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-200", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Your Pre-approved Limit" }), _jsx("div", { className: "space-y-3", children: _jsxs("div", { className: "flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100", children: [_jsx("span", { className: "text-gray-700", children: "Maximum Amount" }), _jsxs("span", { className: "font-semibold text-emerald-700", children: ["Kshs ", eligibility.max_amount.toLocaleString()] })] }) })] }), _jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-200", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Loan Information" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Interest Rate" }), _jsxs("span", { className: "font-medium text-gray-900", children: [eligibility.interest_rate, "%"] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Repayment Period" }), _jsxs("span", { className: "font-medium text-gray-900", children: [eligibility.repayment_duration_days, " days"] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Application Status" }), _jsx("span", { className: "font-medium text-emerald-600", children: "Ready to Apply" })] })] })] })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: () => onApplyNewLoan(eligibility), children: "Apply for Loan" }) })] }));
    }
    // User has active loan
    if (activeLoan) {
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }), _jsx("h2", { className: "text-2xl mb-1 text-gray-900", children: "Active Loan" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Your current loan details" }), _jsxs("div", { className: "flex-1 overflow-y-auto space-y-4", children: [_jsxs("div", { className: "bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(DollarSign, { className: "w-6 h-6" }), _jsx("h3", { className: "font-semibold text-lg", children: "Loan Amount" })] }), _jsxs("p", { className: "text-4xl font-bold mb-1", children: ["Kshs ", activeLoan.principal_amount.toLocaleString()] }), _jsxs("p", { className: "text-emerald-100", children: ["Approved on ", activeLoan.disbursed_at ? new Date(activeLoan.disbursed_at).toLocaleDateString() : 'N/A'] })] }), _jsx("div", { className: "bg-white rounded-xl p-4 border border-gray-200", children: _jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: "bg-amber-100 rounded-lg p-2", children: _jsx(AlertCircle, { className: "w-5 h-5 text-amber-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Outstanding Balance" }), _jsxs("p", { className: "text-2xl font-semibold text-gray-900", children: ["Kshs ", activeLoan.outstanding_balance.toLocaleString()] })] })] }) }), _jsx("div", { className: "bg-white rounded-xl p-4 border border-gray-200", children: _jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: "bg-blue-100 rounded-lg p-2", children: _jsx(Clock, { className: "w-5 h-5 text-blue-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Next Payment Due" }), _jsx("p", { className: "text-xl font-semibold text-gray-900", children: activeLoan.due_date ? new Date(activeLoan.due_date).toLocaleDateString() : 'N/A' })] })] }) }), _jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-200", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Loan Details" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Interest Rate" }), _jsxs("span", { className: "font-medium text-gray-900", children: [activeLoan.interest_rate, "%"] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Repayment Period" }), _jsxs("span", { className: "font-medium text-gray-900", children: [activeLoan.repayment_duration_days, " days"] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Status" }), _jsx("span", { className: "font-medium text-emerald-600", children: activeLoan.status })] })] })] })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: () => onViewRepayment(activeLoan), children: "Make Payment" }) })] }));
    }
    return null;
}
