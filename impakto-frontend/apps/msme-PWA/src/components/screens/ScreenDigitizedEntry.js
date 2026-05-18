import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle2, TrendingUp, TrendingDown, Calendar, DollarSign, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ledgerService } from '../../lib/ledger';
export function ScreenDigitizedEntry({ onNext }) {
    const [draftData, setDraftData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    // 1. Load the AI's extracted data from memory when the screen opens
    useEffect(() => {
        const savedDraft = localStorage.getItem('impakto_draft_transaction');
        if (savedDraft) {
            try {
                setDraftData(JSON.parse(savedDraft));
            }
            catch (e) {
                setError('Failed to load extracted data.');
            }
        }
        else {
            setError('No extracted data found. Please go back and retake the photo.');
        }
    }, []);
    // 2. The function to officially save it to the database
    const handleConfirmAndSave = async () => {
        if (!draftData || draftData.length === 0)
            return;
        setIsSaving(true);
        setError('');
        try {
            // Send the approved data to Django!
            await Promise.all(draftData.map(data => ledgerService.createTransaction(data)));
            // Clear the temporary draft from memory
            localStorage.removeItem('impakto_draft_transaction');
            // Move to the next screen
            onNext();
        }
        catch (err) {
            setError(err.message || 'Failed to save to database. Please try again.');
            setIsSaving(false);
        }
    };
    // Formatters
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount).replace('KES', 'Kshs');
    };
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        catch {
            return dateString; // Fallback to raw string if date is weird
        }
    };
    if (error) {
        return (_jsx(MobileScreen, { backgroundColor: "bg-gray-50", children: _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center overflow-y-auto", children: [_jsx(AlertCircle, { className: "w-16 h-16 text-red-500 mb-4" }), _jsx("h2", { className: "text-xl font-bold text-gray-900 mb-2", children: "Oops!" }), _jsx("p", { className: "text-gray-600 mb-8", children: error }), _jsx(PrimaryButton, { onClick: () => window.history.back(), children: "Go Back" })] }) }));
    }
    if (!draftData) {
        return (_jsx(MobileScreen, { backgroundColor: "bg-gray-50", children: _jsx("div", { className: "flex-1 flex items-center justify-center overflow-y-auto", children: _jsx(Loader2, { className: "w-8 h-8 text-emerald-600 animate-spin" }) }) }));
    }
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("div", { className: "flex-1 overflow-y-auto pb-6", children: [_jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3", children: [_jsx(CheckCircle2, { className: "w-8 h-8 text-emerald-600 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-emerald-900", children: "AI Extraction Complete!" }), _jsx("p", { className: "text-sm text-emerald-700", children: "Please review the details below" })] })] }), _jsx("h2", { className: "text-2xl mb-1 text-gray-900", children: "Review Entries" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Confirm Impakto AI read your handwriting correctly." }), _jsx("div", { className: "space-y-4", children: draftData.map((data, index) => (_jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-200 space-y-4 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-3 pb-4 border-b border-gray-100", children: [_jsx("div", { className: `rounded-lg p-3 ${data.transaction_type === 'INCOME' ? 'bg-emerald-100' : 'bg-red-100'}`, children: data.transaction_type === 'INCOME' ? (_jsx(TrendingUp, { className: "w-6 h-6 text-emerald-600" })) : (_jsx(TrendingDown, { className: "w-6 h-6 text-red-600" })) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Transaction Type" }), _jsx("p", { className: "font-semibold text-gray-900", children: data.transaction_type === 'INCOME' ? 'Income / Sale' : 'Expense' })] })] }), _jsxs("div", { className: "flex items-center gap-3 pb-4 border-b border-gray-100", children: [_jsx("div", { className: "bg-blue-100 rounded-lg p-3", children: _jsx(Calendar, { className: "w-6 h-6 text-blue-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Date" }), _jsx("p", { className: "font-semibold text-gray-900", children: formatDate(data.transaction_date) })] })] }), _jsxs("div", { className: "flex items-center gap-3 pb-4 border-b border-gray-100", children: [_jsx("div", { className: "bg-amber-100 rounded-lg p-3", children: _jsx(DollarSign, { className: "w-6 h-6 text-amber-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Amount" }), _jsx("p", { className: "font-semibold text-gray-900 text-xl", children: formatCurrency(data.amount) })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-purple-100 rounded-lg p-3", children: _jsx(FileText, { className: "w-6 h-6 text-purple-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Description" }), _jsx("p", { className: "font-semibold text-gray-900", children: data.description || data.category || 'N/A' }), _jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider mt-1", children: data.category })] })] })] }, index))) }), _jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6", children: _jsx("p", { className: "text-sm text-blue-800", children: "Saving these entries will update your ledger and immediately recalculate your Trust Score." }) })] }), _jsxs("div", { className: "mt-auto pt-4 flex gap-3", children: [_jsx("button", { onClick: () => window.history.back(), disabled: isSaving, className: "px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold disabled:opacity-50", children: "Retake" }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsx(PrimaryButton, { onClick: handleConfirmAndSave, disabled: isSaving, children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin mr-2 inline" }), " Saving..."] })) : ('Confirm & Save') }) })] })] }));
}
