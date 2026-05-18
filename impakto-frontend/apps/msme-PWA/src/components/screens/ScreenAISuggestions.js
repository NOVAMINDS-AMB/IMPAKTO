import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, Lightbulb, TrendingUp, AlertCircle, DollarSign, Loader2, RefreshCw, } from 'lucide-react';
import { insightsService } from '../../lib/insights';
// ─── Icon & colour helpers ────────────────────────────────────────────────────
const CARD_STYLES = {
    loan: { bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600', iconBg: 'bg-white/20', iconColor: 'text-white' },
    best_seller: { bg: 'bg-white border border-gray-200', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
    restock: { bg: 'bg-white border border-gray-200', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
    profit: { bg: 'bg-white border border-gray-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
};
const CARD_ICONS = {
    loan: (p) => _jsx(DollarSign, { ...p }),
    best_seller: (p) => _jsx(TrendingUp, { ...p }),
    restock: (p) => _jsx(AlertCircle, { ...p }),
    profit: (p) => _jsx(Lightbulb, { ...p }),
};
// ─── Sub-components ───────────────────────────────────────────────────────────
function InsightCard({ insight, onGetStockCapital, }) {
    const style = CARD_STYLES[insight.type];
    const Icon = CARD_ICONS[insight.type];
    const isLoan = insight.type === 'loan';
    return (_jsxs("div", { className: `rounded-xl p-4 ${style.bg}`, children: [_jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: `rounded-lg p-2 flex-shrink-0 ${style.iconBg}`, children: _jsx(Icon, { className: `w-5 h-5 ${style.iconColor}` }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: `font-semibold mb-1 ${isLoan ? 'text-white' : 'text-gray-900'}`, children: insight.title }), _jsx("p", { className: `text-sm ${isLoan ? 'text-emerald-50' : 'text-gray-600'}`, children: insight.body })] })] }), isLoan && insight.cta && (_jsx("button", { onClick: onGetStockCapital, className: "w-full bg-white text-emerald-600 font-semibold py-3 rounded-lg hover:bg-emerald-50 transition-colors", children: insight.cta }))] }));
}
export function ScreenAISuggestions({ onBack, onGetStockCapital, isNewUser }) {
    const [insights, setInsights] = useState([]);
    const [hasEnoughData, setHasEnoughData] = useState(null); // null = not fetched yet
    const [transactionCount, setTransactionCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchInsights = async () => {
        try {
            setIsLoading(true);
            setError('');
            const result = await insightsService.getInsights();
            setInsights(result.insights);
            setHasEnoughData(result.hasEnoughData);
            setTransactionCount(result.transactionCount);
        }
        catch (err) {
            console.error(err);
            setError('Unable to load insights. Please check your connection and try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchInsights();
    }, []);
    // ── Shared header ──
    const Header = () => (_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2 hover:text-gray-900 transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }));
    // ── Loading state ──
    if (isLoading) {
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsx(Header, {}), _jsx("h2", { className: "text-2xl mb-1 text-gray-900", children: "AI Suggestions" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Analyzing your business data\u2026" }), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-4", children: [_jsx("div", { className: "bg-cyan-100 rounded-full p-6", children: _jsx(Loader2, { className: "w-16 h-16 text-cyan-600 animate-spin" }) }), _jsx("p", { className: "text-gray-500 text-sm", children: "Crunching your numbers\u2026" })] })] }));
    }
    // ── Error state ──
    if (error) {
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsx(Header, {}), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center gap-4", children: [_jsx("div", { className: "bg-red-100 rounded-full p-6", children: _jsx(AlertCircle, { className: "w-16 h-16 text-red-500" }) }), _jsx("h2", { className: "text-xl text-gray-900", children: "Something went wrong" }), _jsx("p", { className: "text-gray-500 text-sm max-w-xs", children: error }), _jsxs("button", { onClick: fetchInsights, className: "flex items-center gap-2 text-emerald-600 font-semibold mt-2 hover:text-emerald-700 transition-colors", children: [_jsx(RefreshCw, { className: "w-4 h-4" }), "Retry"] })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onBack, children: "Back to Dashboard" }) })] }));
    }
    // ── Empty state: new user or fewer than 3 transactions ──
    if (!hasEnoughData) {
        const remaining = Math.max(0, 3 - transactionCount);
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsx(Header, {}), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center overflow-y-auto", children: [_jsx("div", { className: "bg-cyan-100 rounded-full p-6 mb-6", children: _jsx(Lightbulb, { className: "w-16 h-16 text-cyan-600" }) }), _jsx("h2", { className: "text-2xl mb-3 text-gray-900", children: "AI Suggestions" }), _jsx("p", { className: "text-gray-600 text-lg mb-3 max-w-xs", children: transactionCount === 0
                                ? 'Scan your first ledger to unlock personalized business insights.'
                                : `Add ${remaining} more ledger entr${remaining === 1 ? 'y' : 'ies'} to unlock personalized insights.` }), transactionCount > 0 && (_jsx("div", { className: "flex gap-1 mt-2", children: [...Array(3)].map((_, i) => (_jsx("div", { className: `h-2 w-8 rounded-full ${i < transactionCount ? 'bg-cyan-500' : 'bg-gray-200'}` }, i))) }))] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onBack, children: "Go Back to Dashboard" }) })] }));
    }
    // ── Rich state: real insights ──
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsx(Header, {}), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-2xl text-gray-900", children: "AI Suggestions" }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Based on your ", transactionCount, " ledger entr", transactionCount === 1 ? 'y' : 'ies'] })] }), _jsx("div", { className: "flex-1 overflow-y-auto space-y-3 mb-4", children: insights.map((insight) => (_jsx(InsightCard, { insight: insight, onGetStockCapital: onGetStockCapital }, insight.type))) }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onBack, children: "Back to Dashboard" }) })] }));
}
