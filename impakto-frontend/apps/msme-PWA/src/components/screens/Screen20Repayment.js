import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { loansService } from '../../lib/loans';
export function Screen20Repayment({ loan, onNext, onBack }) {
    const [pin, setPin] = useState('');
    const [amountStr, setAmountStr] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (loan) {
            setAmountStr(Math.min(1000, loan.outstanding_balance).toString());
        }
    }, [loan]);
    const handleRepay = async () => {
        if (!loan || !pin)
            return;
        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        if (amount > loan.outstanding_balance) {
            setError(`Amount cannot exceed outstanding balance of Kshs ${loan.outstanding_balance.toLocaleString()}`);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const updatedLoan = await loansService.repayLoan(loan.id, amount);
            onNext(updatedLoan, amount);
        }
        catch (err) {
            setError(err.message || 'Repayment failed');
        }
        finally {
            setLoading(false);
        }
    };
    if (!loan) {
        return (_jsxs(MobileScreen, { children: [_jsx("p", { className: "text-center mt-10", children: "No active loan." }), _jsx(PrimaryButton, { onClick: onBack, children: "Go Back" })] }));
    }
    return (_jsxs(MobileScreen, { children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl mb-2 text-gray-900", children: "Confirm Repayment" }), _jsx("p", { className: "text-gray-600", children: "Enter payment details" })] }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "bg-gray-50 rounded-xl p-6 mb-6 text-center", children: [_jsx(Smartphone, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 mb-2", children: "Amount to Pay (Kshs)" }), _jsx("input", { type: "number", value: amountStr, onChange: (e) => setAmountStr(e.target.value), className: "w-full bg-transparent text-center focus:outline-none text-4xl text-gray-900 border-b-2 border-emerald-500 pb-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2", children: "Mobile Money PIN" }), _jsx("input", { type: "password", value: pin, onChange: (e) => setPin(e.target.value), placeholder: "Enter your PIN", maxLength: 4, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-center text-2xl tracking-widest" })] }), error && _jsx("p", { className: "text-red-500 mt-4 text-center", children: error })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: handleRepay, disabled: loading || pin.length < 4 || !amountStr, children: loading ? 'Processing...' : 'Confirm Repayment' }) })] }));
}
