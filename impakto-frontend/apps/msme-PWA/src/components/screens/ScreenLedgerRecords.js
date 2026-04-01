import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Loader2, Receipt } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ledgerService } from '../../lib/ledger';
export function ScreenLedgerRecords({ onBack, onScanNew, onViewEntry }) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    // Fetch the data as soon as the screen loads
    useEffect(() => {
        fetchHistory();
    }, []);
    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const data = await ledgerService.getTransactions();
            // Reverse the data so the newest transactions show at the top
            setTransactions(data.reverse());
        }
        catch (err) {
            setError('Failed to load ledger records. Check your connection.');
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Helper function to format money nicely (e.g., Kshs 1,500)
    const formatCurrency = (amount) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(num).replace('KES', 'Kshs');
    };
    // Helper to safely format the date (e.g., Feb 10, 2026)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }), _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl mb-1 text-gray-900", children: "Ledger Entries" }), _jsx("p", { className: "text-gray-600", children: "Your business transactions" })] }), _jsx("button", { onClick: onScanNew, className: "bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors shadow-sm", children: _jsx(Plus, { className: "w-6 h-6" }) })] }), error && (_jsx("div", { className: "bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100", children: error })), isLoading ? (_jsxs("div", { className: "flex-1 flex flex-col items-center justify-center mt-20 overflow-y-auto", children: [_jsx(Loader2, { className: "w-10 h-10 text-emerald-600 animate-spin mb-4" }), _jsx("p", { className: "text-gray-500", children: "Syncing with secure vault..." })] })) : transactions.length === 0 ? (_jsxs("div", { className: "text-center mt-20 p-8 bg-white rounded-xl border border-gray-200", children: [_jsx(Receipt, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), _jsx("p", { className: "text-gray-700 font-medium", children: "No records found" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Tap the + button above to add your first sale or expense." })] })) : (_jsx("div", { className: "flex-1 overflow-y-auto space-y-3 pb-6", children: transactions.map((tx) => (_jsx("button", { onClick: () => onViewEntry?.(tx.id), className: "w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors shadow-sm", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [tx.transaction_type === 'INCOME' ? (_jsx("div", { className: "bg-emerald-100 rounded-lg p-1.5", children: _jsx(TrendingUp, { className: "w-4 h-4 text-emerald-600" }) })) : (_jsx("div", { className: "bg-red-100 rounded-lg p-1.5", children: _jsx(TrendingDown, { className: "w-4 h-4 text-red-600" }) })), _jsx("span", { className: "text-xs text-gray-500", children: formatDate(tx.transaction_date) })] }), _jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: tx.description || tx.category }), _jsx("p", { className: "text-xs text-gray-500 capitalize", children: tx.transaction_type.toLowerCase() })] }), _jsx("div", { className: "text-right mt-1", children: _jsxs("p", { className: `text-lg font-bold ${tx.transaction_type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'}`, children: [tx.transaction_type === 'INCOME' ? '+' : '-', formatCurrency(tx.amount)] }) })] }) }, tx.id))) }))] }));
}
