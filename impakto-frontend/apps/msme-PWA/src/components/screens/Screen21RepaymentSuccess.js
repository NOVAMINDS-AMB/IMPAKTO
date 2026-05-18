import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle2, TrendingUp } from 'lucide-react';
export function Screen21RepaymentSuccess({ loan, amountPaid, onReset, onGoToDashboard }) {
    const formatDate = (dateString) => {
        if (!dateString)
            return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        catch {
            return 'N/A';
        }
    };
    return (_jsxs(MobileScreen, { children: [_jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center px-4 overflow-y-auto", children: [_jsx("div", { className: "bg-emerald-100 rounded-full p-6 mb-6", children: _jsx(CheckCircle2, { className: "w-20 h-20 text-emerald-600" }) }), _jsx("h2", { className: "text-2xl mb-3 text-gray-900", children: "Payment Successful!" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Your payment has been received and recorded" }), _jsx("div", { className: "bg-white rounded-xl p-5 border border-gray-200 w-full mb-6", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Amount Paid" }), _jsxs("span", { className: "font-semibold text-gray-900 text-lg", children: ["Kshs ", amountPaid.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Remaining Balance" }), _jsxs("span", { className: "font-semibold text-gray-900 text-lg", children: ["Kshs ", loan?.outstanding_balance?.toLocaleString() || '0'] })] }), (loan?.outstanding_balance ?? 0) > 0 ? (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Next Payment Due" }), _jsx("span", { className: "font-semibold text-gray-900", children: formatDate(loan?.due_date) })] })) : (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Status" }), _jsx("span", { className: "font-semibold text-emerald-600 text-lg", children: "Fully Paid" })] }))] }) }), _jsxs("div", { className: "bg-emerald-50 rounded-xl p-4 border border-emerald-200 w-full", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-emerald-600" }), _jsx("h3", { className: "font-semibold text-emerald-900", children: "Trust Score Updated" })] }), _jsx("p", { className: "text-sm text-emerald-800", children: "Great job! Your trust score has improved with this on-time payment" })] })] }), _jsxs("div", { className: "mt-auto space-y-3", children: [_jsx(PrimaryButton, { onClick: onGoToDashboard, children: "Done" }), _jsx("button", { onClick: onReset, className: "w-full py-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors", children: "Start Demo Over" })] })] }));
}
