import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, TrendingUp, TrendingDown, Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ledgerService } from '../../lib/ledger';
export function ScreenUpdatedLedger({ onBack }) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchUpdatedLedger();
    }, []);
    const fetchUpdatedLedger = async () => {
        try {
            setIsLoading(true);
            const data = await ledgerService.getTransactions();
            // Since the backend orders by date descending, the newest is first
            setTransactions(data);
        }
        catch (err) {
            setError('Failed to load updated ledger.');
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    const formatCurrency = (amount) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(num).replace('KES', 'Kshs');
    };
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        catch {
            return dateString;
        }
    };
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl mb-1 text-gray-900", children: "Updated Ledger" }), _jsx("p", { className: "text-gray-600", children: "Your latest business transactions" })] }), isLoading ? (_jsxs("div", { className: "flex-1 flex flex-col items-center justify-center mt-10 overflow-y-auto", children: [_jsx(Loader2, { className: "w-10 h-10 text-emerald-600 animate-spin mb-4" }), _jsx("p", { className: "text-gray-500", children: "Retrieving updated records..." })] })) : error ? (_jsx("div", { className: "bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center", children: error })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 mb-4 text-white shadow-md", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Sparkles, { className: "w-5 h-5" }), _jsx("h3", { className: "font-semibold", children: "1 New Entry Added" })] }), _jsx("p", { className: "text-sm text-emerald-100", children: "Your ledger has been updated with the latest transaction" })] }), _jsx("div", { className: "flex-1 overflow-y-auto space-y-3 pb-6", children: transactions.map((entry, index) => {
                            // Highlight the very first item as the newly added one
                            const isNew = index === 0;
                            return (_jsxs("div", { className: `bg-white rounded-xl p-4 border-2 transition-all ${isNew
                                    ? 'border-emerald-400 shadow-lg shadow-emerald-100'
                                    : 'border-gray-200 shadow-sm'}`, children: [isNew && (_jsxs("div", { className: "flex items-center gap-1 mb-2", children: [_jsx(Sparkles, { className: "w-4 h-4 text-emerald-600" }), _jsx("span", { className: "text-xs font-semibold text-emerald-600 uppercase", children: "New" })] })), _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [entry.transaction_type === 'INCOME' ? (_jsx("div", { className: "bg-emerald-100 rounded-lg p-1.5", children: _jsx(TrendingUp, { className: "w-4 h-4 text-emerald-600" }) })) : (_jsx("div", { className: "bg-red-100 rounded-lg p-1.5", children: _jsx(TrendingDown, { className: "w-4 h-4 text-red-600" }) })), _jsx("span", { className: "text-xs text-gray-500", children: formatDate(entry.transaction_date) })] }), _jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: entry.description || entry.category }), _jsx("p", { className: "text-xs text-gray-500 capitalize", children: entry.transaction_type.toLowerCase() })] }), _jsx("div", { className: "text-right mt-1", children: _jsxs("p", { className: `text-lg font-bold ${entry.transaction_type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'}`, children: [entry.transaction_type === 'INCOME' ? '+' : '-', formatCurrency(entry.amount)] }) })] })] }, entry.id));
                        }) })] })), _jsx("div", { className: "mt-auto pt-4", children: _jsx(PrimaryButton, { onClick: onBack, children: "Back to Dashboard" }) })] }));
}
