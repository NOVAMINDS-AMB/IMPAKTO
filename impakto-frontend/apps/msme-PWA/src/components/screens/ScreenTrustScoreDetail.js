import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, Award, CheckCircle2, History, Activity, TrendingUp, LineChart, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scoringService } from '../../lib/scoring';
export function ScreenTrustScoreDetail({ onBack, isNewUser }) {
    const [scoreData, setScoreData] = useState(null);
    const [isLoading, setIsLoading] = useState(!isNewUser); // Only load if not a new user
    const [error, setError] = useState('');
    useEffect(() => {
        if (!isNewUser) {
            fetchScore();
        }
    }, [isNewUser]);
    const fetchScore = async () => {
        try {
            setIsLoading(true);
            const data = await scoringService.getMyScore();
            setScoreData(data);
        }
        catch (err) {
            setError('Failed to load your Trust Score. Please try again later.');
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Helper to determine gradient colors based on score
    const getScoreClasses = (score) => {
        if (score >= 800)
            return 'bg-gradient-to-br from-emerald-500 to-emerald-600';
        if (score >= 600)
            return 'bg-gradient-to-br from-amber-500 to-amber-600';
        return 'bg-gradient-to-br from-red-500 to-red-600';
    };
    // Helper to determine status text
    const getScoreStatus = (score) => {
        if (score >= 800)
            return 'Excellent Standing';
        if (score >= 600)
            return 'Good Standing';
        return 'Needs Improvement';
    };
    // 1. New User Empty State (Kept exactly as you designed it)
    if (isNewUser) {
        return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center overflow-y-auto", children: [_jsx("div", { className: "bg-amber-100 rounded-full p-6 mb-6", children: _jsx(Award, { className: "w-16 h-16 text-amber-600" }) }), _jsx("h2", { className: "text-2xl mb-3 text-gray-900", children: "Build Your Trust Score" }), _jsx("p", { className: "text-gray-600 text-lg mb-8 max-w-xs", children: "Start adding ledger entries to build your trust score and unlock better loan terms" })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onBack, children: "Go Back to Dashboard" }) })] }));
    }
    // 2. Loading State for Returning Users
    if (isLoading) {
        return (_jsx(MobileScreen, { backgroundColor: "bg-gray-50", children: _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center overflow-y-auto", children: [_jsx(Loader2, { className: "w-12 h-12 text-emerald-600 animate-spin mb-4" }), _jsx("p", { className: "text-gray-500 font-medium", children: "Analyzing ledger metrics..." })] }) }));
    }
    // 3. Live Score Dashboard
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Dashboard"] }), _jsx("h2", { className: "text-2xl mb-1 text-gray-900", children: "Trust Score" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Your business credibility rating" }), error ? (_jsx("div", { className: "bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center", children: error })) : scoreData ? (_jsxs("div", { className: "flex-1 overflow-y-auto space-y-4 pb-6", children: [_jsxs("div", { className: `${getScoreClasses(scoreData.total_score)} rounded-xl p-6 text-emerald-600 text-center shadow-md`, children: [_jsx("div", { className: "flex items-center justify-center mb-3", children: _jsx(Award, { className: "w-12 h-12" }) }), _jsx("p", { className: "text-sm opacity-90 mb-2", children: "Your Trust Score" }), _jsx("p", { className: "text-5xl font-bold mb-2", children: scoreData.total_score }), _jsx("p", { className: "font-medium", children: getScoreStatus(scoreData.total_score) })] }), _jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-200 shadow-sm", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Score Breakdown" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "bg-blue-100 rounded-lg p-2 mt-1 flex-shrink-0", children: _jsx(Activity, { className: "w-4 h-4 text-blue-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("p", { className: "font-medium text-gray-900", children: "Activity Consistency" }), _jsxs("span", { className: "text-sm text-blue-600 font-bold", children: ["+", scoreData.activity_consistency, " ", _jsx("span", { className: "text-gray-400 text-xs font-normal", children: "/ 200" })] })] }), _jsx("p", { className: "text-sm text-gray-600", children: "Based on regular ledger entries" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "bg-purple-100 rounded-lg p-2 mt-1 flex-shrink-0", children: _jsx(LineChart, { className: "w-4 h-4 text-purple-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("p", { className: "font-medium text-gray-900", children: "Revenue Stability" }), _jsxs("span", { className: "text-sm text-purple-600 font-bold", children: ["+", scoreData.revenue_stability, " ", _jsx("span", { className: "text-gray-400 text-xs font-normal", children: "/ 250" })] })] }), _jsx("p", { className: "text-sm text-gray-600", children: "Measures the reliability of your income" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "bg-emerald-100 rounded-lg p-2 mt-1 flex-shrink-0", children: _jsx(TrendingUp, { className: "w-4 h-4 text-emerald-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("p", { className: "font-medium text-gray-900", children: "Growth Trends" }), _jsxs("span", { className: "text-sm text-emerald-600 font-bold", children: ["+", scoreData.growth_trend, " ", _jsx("span", { className: "text-gray-400 text-xs font-normal", children: "/ 150" })] })] }), _jsx("p", { className: "text-sm text-gray-600", children: "Period-over-period revenue growth" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "bg-amber-100 rounded-lg p-2 mt-1 flex-shrink-0", children: _jsx(CheckCircle2, { className: "w-4 h-4 text-amber-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("p", { className: "font-medium text-gray-900", children: "Verification Strength" }), _jsxs("span", { className: "text-sm text-amber-600 font-bold", children: ["+", scoreData.verification_strength, " ", _jsx("span", { className: "text-gray-400 text-xs font-normal", children: "/ 100" })] })] }), _jsx("p", { className: "text-sm text-gray-600", children: "Identity and KYC verification" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "bg-indigo-100 rounded-lg p-2 mt-1 flex-shrink-0", children: _jsx(History, { className: "w-4 h-4 text-indigo-600" }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("p", { className: "font-medium text-gray-900", children: "Repayment Behavior" }), _jsxs("span", { className: "text-sm text-indigo-600 font-bold", children: ["+", scoreData.repayment_behavior, " ", _jsx("span", { className: "text-gray-400 text-xs font-normal", children: "/ 300" })] })] }), _jsx("p", { className: "text-sm text-gray-600", children: "Performance on previous loans" })] })] })] })] }), _jsxs("div", { className: "bg-blue-50 rounded-xl p-4 border border-blue-200", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "How to Improve" }), _jsxs("ul", { className: "space-y-2 text-sm text-blue-800", children: [_jsx("li", { children: "\u2022 Continue adding daily ledger entries" }), _jsx("li", { children: "\u2022 Apply for and repay loans on time" }), _jsx("li", { children: "\u2022 Maintain consistent business activity" })] })] })] })) : null, _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onBack, children: "Back to Dashboard" }) })] }));
}
