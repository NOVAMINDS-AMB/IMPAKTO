import { ledgerService } from './ledger';
import { scoringService } from './scoring';
// ─── Constants ────────────────────────────────────────────────────────────────
const MIN_TRANSACTIONS = 3;
const LOAN_GROWTH_THRESHOLD = 50; // growth_trend score (out of 150) that triggers the loan card
// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseAmount(amount) {
    return typeof amount === 'string' ? parseFloat(amount) : amount;
}
/** Group INCOME transactions by category and return name + total of the top one. */
function getBestSellerInsight(txns) {
    const incomes = txns.filter(t => t.transaction_type === 'INCOME');
    if (incomes.length === 0) {
        return {
            type: 'best_seller',
            title: 'Best Sellers',
            body: 'Record a few sales to discover your top-performing products.',
        };
    }
    const totals = {};
    for (const t of incomes) {
        // Prefer description (specific product) over category (generalizing "SALES")
        let productName = t.description?.trim() || t.category || 'General';
        // Capitalize the first letter for display consistency
        productName = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();
        totals[productName] = (totals[productName] ?? 0) + parseAmount(t.amount);
    }
    const [topProduct, topAmount] = Object.entries(totals).sort(([, a], [, b]) => b - a)[0];
    const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);
    const pct = grandTotal > 0 ? Math.round((topAmount / grandTotal) * 100) : 0;
    return {
        type: 'best_seller',
        title: 'Best Sellers',
        body: `"${topProduct}" is your top-selling product, making up ${pct}% of your total sales. Consider keeping it well-stocked.`,
    };
}
/**
 * Estimate daily burn rate from incomes and project how many days until
 * revenue slows below a 30-day rolling average.
 */
function getRestockInsight(txns) {
    const incomes = txns.filter(t => t.transaction_type === 'INCOME');
    if (incomes.length < 2) {
        return {
            type: 'restock',
            title: 'Restock Reminder',
            body: 'Add more ledger entries to get personalised restock reminders.',
        };
    }
    // Build a map of date → total income
    const dailyMap = {};
    for (const t of incomes) {
        dailyMap[t.transaction_date] = (dailyMap[t.transaction_date] ?? 0) + parseAmount(t.amount);
    }
    const days = Object.keys(dailyMap).sort();
    const avgDaily = Object.values(dailyMap).reduce((s, v) => s + v, 0) / days.length;
    // Compare last 7 days vs previous 7 days to detect a slowdown
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(today.getDate() - 14);
    const last7 = Object.entries(dailyMap)
        .filter(([d]) => new Date(d) >= sevenDaysAgo)
        .reduce((s, [, v]) => s + v, 0);
    const prev7 = Object.entries(dailyMap)
        .filter(([d]) => new Date(d) >= fourteenDaysAgo && new Date(d) < sevenDaysAgo)
        .reduce((s, [, v]) => s + v, 0);
    let body;
    if (prev7 > 0 && last7 < prev7 * 0.8) {
        // Sales dropped more than 20% — likely to run low sooner
        const daysUntilLow = Math.max(1, Math.round((last7 / avgDaily) * 0.5));
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysUntilLow);
        const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
        body = `Sales have slowed by ${Math.round((1 - last7 / prev7) * 100)}% this week. At the current pace, you may need to restock by ${dayName}.`;
    }
    else if (avgDaily > 0) {
        const daysUntilLow = Math.round(avgDaily / (avgDaily * 0.1) + 4);
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysUntilLow);
        const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
        body = `Based on your daily sales average of Kshs ${Math.round(avgDaily).toLocaleString()}, consider restocking before ${dayName}.`;
    }
    else {
        body = 'Keep logging daily sales to get accurate restock timing.';
    }
    return { type: 'restock', title: 'Restock Reminder', body };
}
/** Compare profit margin across two time windows. */
function getProfitInsight(txns) {
    if (txns.length < MIN_TRANSACTIONS) {
        return {
            type: 'profit',
            title: 'Profit Tip',
            body: 'Log both sales and expenses regularly to receive personalized profit improvement tips.',
        };
    }
    const income = txns
        .filter(t => t.transaction_type === 'INCOME')
        .reduce((s, t) => s + parseAmount(t.amount), 0);
    const expenses = txns
        .filter(t => t.transaction_type === 'EXPENSE')
        .reduce((s, t) => s + parseAmount(t.amount), 0);
    if (income === 0) {
        return {
            type: 'profit',
            title: 'Profit Tip',
            body: 'Record your income entries to start tracking profit margins.',
        };
    }
    const marginPct = Math.round(((income - expenses) / income) * 100);
    // Identify the biggest expense category for a targeted tip
    const expenseTotals = {};
    for (const t of txns.filter(t => t.transaction_type === 'EXPENSE')) {
        const cat = t.category || 'General';
        expenseTotals[cat] = (expenseTotals[cat] ?? 0) + parseAmount(t.amount);
    }
    const topExpenseEntry = Object.entries(expenseTotals).sort(([, a], [, b]) => b - a)[0];
    let body;
    if (marginPct >= 50) {
        body = `Excellent! Your profit margin is ${marginPct}%. Keep controlling costs to maintain this healthy lead.`;
    }
    else if (marginPct >= 20) {
        body = topExpenseEntry
            ? `Your margin is ${marginPct}%. "${topExpenseEntry[0]}" is your largest expense — reducing it could push margins even higher.`
            : `Your margin is ${marginPct}%. Look for opportunities to reduce your top cost categories.`;
    }
    else if (marginPct >= 0) {
        body = topExpenseEntry
            ? `Margin is tight at ${marginPct}%. Bulk purchasing in "${topExpenseEntry[0]}" could free up Kshs ${Math.round(parseAmount(topExpenseEntry[1]) * 0.15).toLocaleString()} per month.`
            : `Margin is tight at ${marginPct}%. Cutting your biggest cost category by 15% could noticeably improve profitability.`;
    }
    else {
        body = `You are currently spending more than you earn (margin: ${marginPct}%). Focus on increasing sales volume or cutting the top expense first.`;
    }
    return { type: 'profit', title: 'Profit Tip', body };
}
/** Show the loan card only when growth_trend signals real momentum. */
function getLoanInsight(score, income) {
    if (score.growth_trend < LOAN_GROWTH_THRESHOLD)
        return null;
    const growthPct = Math.round(((score.growth_trend - 50) / 100) * 100 // engine maps growth to 50–150 pts
    );
    const suggestedAmount = income > 0 ? Math.round((income * 0.5) / 1000) * 1000 : 10000;
    return {
        type: 'loan',
        title: 'Get Stock Capital',
        body: `Your revenue has grown ~${growthPct}% recently. You may qualify for up to Kshs ${suggestedAmount.toLocaleString()} to expand your inventory.`,
        cta: 'Apply for Loan',
    };
}
// ─── Public API ───────────────────────────────────────────────────────────────
export const insightsService = {
    async getInsights() {
        // Fetch both sources in parallel
        const [txns, score] = await Promise.all([
            ledgerService.getTransactions(),
            scoringService.getMyScore(),
        ]);
        const transactionCount = txns.length;
        const hasEnoughData = transactionCount >= MIN_TRANSACTIONS;
        if (!hasEnoughData) {
            return { insights: [], hasEnoughData: false, transactionCount };
        }
        const totalIncome = txns
            .filter(t => t.transaction_type === 'INCOME')
            .reduce((s, t) => s + parseAmount(t.amount), 0);
        const insights = [];
        // 1. Loan card (only when growth_trend is strong)
        const loanCard = getLoanInsight(score, totalIncome);
        if (loanCard)
            insights.push(loanCard);
        // 2. Best seller
        insights.push(getBestSellerInsight(txns));
        // 3. Restock reminder
        insights.push(getRestockInsight(txns));
        // 4. Profit tip
        insights.push(getProfitInsight(txns));
        return { insights, hasEnoughData: true, transactionCount };
    },
};
