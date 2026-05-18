import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { DollarSign, Calendar } from 'lucide-react';
import { loansService } from '../../lib/loans';
export function Screen16LoanReview({ eligibility, onNext, onBack }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleApply = async () => {
        if (!eligibility)
            return;
        try {
            setLoading(true);
            setError(null);
            const loan = await loansService.applyForLoan(eligibility.max_amount);
            onNext(loan);
        }
        catch (err) {
            setError(err.message || "Application failed");
        }
        finally {
            setLoading(false);
        }
    };
    if (!eligibility) {
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsx("p", { className: "text-center mt-10", children: "No eligibility data." }), _jsx(PrimaryButton, { onClick: onBack, children: "Go Back" })] }));
    }
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl mb-2 text-gray-900", children: "Review Your Loan" }), _jsx("p", { className: "text-gray-600", children: "Please confirm the details" })] }), _jsxs("div", { className: "flex-1 space-y-4 mb-6 overflow-y-auto", children: [_jsxs("div", { className: "bg-white rounded-xl p-6 border border-gray-200", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "bg-emerald-100 rounded-lg p-2", children: _jsx(DollarSign, { className: "w-5 h-5 text-emerald-600" }) }), _jsx("span", { className: "text-gray-600", children: "Loan Amount" })] }), _jsxs("p", { className: "text-4xl text-gray-900 mb-4", children: ["Kshs ", eligibility.max_amount.toLocaleString()] }), _jsxs("div", { className: "border-t border-gray-200 pt-4 mt-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "bg-blue-100 rounded-lg p-2", children: _jsx(Calendar, { className: "w-5 h-5 text-blue-600" }) }), _jsx("span", { className: "text-gray-600", children: "Repayment Duration" })] }), _jsxs("p", { className: "text-2xl text-gray-900", children: [eligibility.repayment_duration_days, " days"] })] })] }), _jsx("div", { className: "bg-blue-50 rounded-xl p-4 border border-blue-200", children: _jsxs("p", { className: "text-sm text-gray-700", children: ["Your Trust Score qualifies you for this loan at ", eligibility.interest_rate, "% interest rate."] }) }), error && _jsx("p", { className: "text-red-500 text-sm text-center", children: error })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: handleApply, disabled: loading, children: loading ? 'Processing...' : 'Confirm Application' }) })] }));
}
