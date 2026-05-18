import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { Camera, TrendingUp, TrendingDown, Wallet, Award, Lightbulb, DollarSign, ChevronRight, User, Settings, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ledgerService } from '../../lib/ledger';
export function ScreenMainDashboard({ isNewUser, onScanLedger, onViewLedger, onViewTrustScore, onViewAISuggestions, onLoanApplication, onLogout, onSettings }) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                const data = await ledgerService.getTransactions();
                setTransactions(data.reverse());
            }
            catch (err) {
                setError('Failed to load ledger records.');
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);
    const totalSales = transactions
        .filter(t => t.transaction_type === 'INCOME')
        .reduce((sum, t) => sum + (typeof t.amount === 'string' ? parseFloat(t.amount) : t.amount), 0);
    const totalExpenses = transactions
        .filter(t => t.transaction_type === 'EXPENSE')
        .reduce((sum, t) => sum + (typeof t.amount === 'string' ? parseFloat(t.amount) : t.amount), 0);
    const currentBalance = totalSales - totalExpenses;
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(amount).replace('KES', 'Kshs');
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
        .slice(0, 3);
    const hasRecords = transactions.length > 0;
    // A user is functionally "new" if they have the new userType and 0 records.
    // If they have records, they should see the populated dashboard tools.
    const showEmptyState = isNewUser && !hasRecords;
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between relative", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("img", { src: "/Impakto Official Logo.jpeg", alt: "Impakto logo", className: "w-8 h-8 object-contain" }), _jsx("h1", { className: "text-xl text-gray-900 font-bold", children: "Impakto" })] }), _jsx("p", { className: "text-gray-600", children: "Your Business Dashboard" })] }), _jsx("button", { onClick: () => setShowUserMenu(!showUserMenu), className: "bg-emerald-100 rounded-full p-2 hover:bg-emerald-200 transition-colors", children: _jsx(User, { className: "w-6 h-6 text-emerald-600" }) }), showUserMenu && (_jsxs("div", { className: "absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 min-w-[180px]", children: [_jsxs("button", { onClick: () => {
                                    setShowUserMenu(false);
                                    onSettings();
                                }, className: "w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700", children: [_jsx(Settings, { className: "w-5 h-5" }), _jsx("span", { children: "Settings" })] }), _jsxs("button", { onClick: () => {
                                    setShowUserMenu(false);
                                    onLogout();
                                }, className: "w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600", children: [_jsx(LogOut, { className: "w-5 h-5" }), _jsx("span", { children: "Log Out" })] })] }))] }), _jsxs("div", { className: "flex-1 overflow-y-auto space-y-4", children: [_jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-200", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Business Overview" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-emerald-100 rounded-lg p-2", children: _jsx(TrendingUp, { className: "w-4 h-4 text-emerald-600" }) }), _jsx("span", { className: "text-gray-600 text-sm", children: "Total Sales" })] }), _jsx("p", { className: "text-xl font-semibold text-gray-900", children: formatCurrency(totalSales) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-red-100 rounded-lg p-2", children: _jsx(TrendingDown, { className: "w-4 h-4 text-red-600" }) }), _jsx("span", { className: "text-gray-600 text-sm", children: "Total Expenses" })] }), _jsx("p", { className: "text-xl font-semibold text-gray-900", children: formatCurrency(totalExpenses) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-blue-100 rounded-lg p-2", children: _jsx(Wallet, { className: "w-4 h-4 text-blue-600" }) }), _jsx("span", { className: "text-gray-600 text-sm", children: "Current Balance" })] }), _jsx("p", { className: "text-xl font-semibold text-gray-900", children: formatCurrency(currentBalance) })] })] })] }), recentTransactions.length > 0 && (_jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-200", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Recent Transactions" }), _jsx("button", { onClick: onViewLedger, className: "text-sm text-emerald-600 hover:text-emerald-700 font-medium", children: "View all" })] }), _jsx("div", { className: "space-y-3", children: recentTransactions.map((tx) => (_jsxs("div", { className: "flex items-center justify-between py-2 border-b border-gray-100 last:border-0 last:pb-0", children: [_jsxs("div", { className: "flex items-center gap-3", children: [tx.transaction_type === 'INCOME' ? (_jsx("div", { className: "bg-emerald-100 p-2 rounded-lg", children: _jsx(TrendingUp, { className: "w-4 h-4 text-emerald-600" }) })) : (_jsx("div", { className: "bg-red-100 p-2 rounded-lg", children: _jsx(TrendingDown, { className: "w-4 h-4 text-red-600" }) })), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-900", children: tx.description || tx.category }), _jsx("p", { className: "text-xs text-gray-500", children: formatDate(tx.transaction_date) })] })] }), _jsxs("span", { className: `text-sm font-semibold ${tx.transaction_type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'}`, children: [tx.transaction_type === 'INCOME' ? '+' : '-', formatCurrency(tx.amount)] })] }, tx.id))) })] })), _jsx("button", { onClick: showEmptyState ? onScanLedger : onViewLedger, className: "w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-purple-100 rounded-lg p-3", children: _jsx(Camera, { className: "w-6 h-6 text-purple-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Ledger Records" }), _jsx("p", { className: "text-sm text-gray-600", children: showEmptyState
                                                        ? 'Scan your first ledger to get started'
                                                        : 'View records or add new entries' })] })] }), _jsx(ChevronRight, { className: "w-5 h-5 text-gray-400" })] }) }), _jsx("button", { onClick: onViewTrustScore, className: "w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-amber-100 rounded-lg p-3", children: _jsx(Award, { className: "w-6 h-6 text-amber-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Trust Score" }), _jsx("p", { className: "text-sm text-gray-600", children: showEmptyState
                                                        ? 'Build your score with ledger entries'
                                                        : 'View your current trust score' })] })] }), _jsx(ChevronRight, { className: "w-5 h-5 text-gray-400" })] }) }), _jsx("button", { onClick: onViewAISuggestions, className: "w-full bg-white rounded-xl p-4 border border-gray-200 text-left hover:bg-gray-50 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-cyan-100 rounded-lg p-3", children: _jsx(Lightbulb, { className: "w-6 h-6 text-cyan-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "AI Suggestions" }), _jsx("p", { className: "text-sm text-gray-600", children: showEmptyState
                                                        ? 'Available after a few ledger entries'
                                                        : 'Get personalized business insights' })] })] }), _jsx(ChevronRight, { className: "w-5 h-5 text-gray-400" })] }) }), _jsx("button", { onClick: onLoanApplication, className: "w-full bg-emerald-600 rounded-xl p-4 text-left hover:bg-emerald-700 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-white/20 rounded-lg p-3", children: _jsx(DollarSign, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: "Loan Services" }), _jsx("p", { className: "text-sm text-emerald-100", children: showEmptyState
                                                        ? 'Access capital for your business'
                                                        : 'View status or apply for new loan' })] })] }), _jsx(ChevronRight, { className: "w-5 h-5 text-white" })] }) })] })] }));
}
