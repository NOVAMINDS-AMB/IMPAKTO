import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
export const mockLoans = [
    {
        id: 'LA-2024-00158',
        borrower: 'Lucy Wachira',
        amount: 'Kshs 3,000.00',
        status: 'Approved',
        date: 'Feb 4, 2026',
        statusColor: 'bg-green-100 text-green-800',
        term: '6 months',
        approvedDate: 'Feb 4, 2026',
        approvedBy: 'Jean-Paul',
        finalStatus: 'Recently Approved',
    },
    {
        id: 'LA-2024-00145',
        borrower: 'Carlos Wafula',
        amount: 'Kshs 2,500.00',
        status: 'Active',
        date: 'Jan 28, 2026',
        statusColor: 'bg-blue-100 text-blue-800',
        term: '4 months',
        approvedDate: 'Jan 28, 2026',
        approvedBy: 'Jean-Paul',
        finalStatus: 'In Progress - 2 payments made',
    },
    {
        id: 'LA-2024-00132',
        borrower: 'Ana Bett',
        amount: 'Kshs 4,200.00',
        status: 'Active',
        date: 'Jan 15, 2026',
        statusColor: 'bg-blue-100 text-blue-800',
        term: '8 months',
        approvedDate: 'Jan 15, 2026',
        approvedBy: 'Jean-Paul',
        finalStatus: 'In Progress - 3 payments made',
    },
    {
        id: 'LA-2023-00891',
        borrower: 'Luis Fernandez',
        amount: 'Kshs 1,800.00',
        status: 'Completed',
        date: 'Dec 20, 2025',
        statusColor: 'bg-gray-100 text-gray-800',
        term: '6 months',
        approvedDate: 'July 15, 2025',
        completionDate: 'December 20, 2025',
        approvedBy: 'Jean-Paul',
        finalStatus: 'Paid in Full',
    },
    {
        id: 'LA-2023-00876',
        borrower: 'Sofia Garcia',
        amount: 'Kshs 3,500.00',
        status: 'Completed',
        date: 'Dec 10, 2025',
        statusColor: 'bg-gray-100 text-gray-800',
        term: '6 months',
        approvedDate: 'June 10, 2025',
        completionDate: 'December 10, 2025',
        approvedBy: 'Jean-Paul',
        finalStatus: 'Paid in Full',
    },
];
export function PortfolioOverview({ onCreateBorrower, onViewPerformance, onOpenPastLoan, onSettings, onLogout }) {
    const [showDropdown, setShowDropdown] = useState(false);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx("header", { className: "bg-white border-b border-gray-200 px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { children: "Portfolio Overview" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowDropdown(!showDropdown), className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors", children: [_jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white", children: _jsx(User, { className: "w-5 h-5" }) }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "text-sm", children: "Jean-Paul" }), _jsx("div", { className: "text-xs text-gray-500", children: "Loan Officer" })] }), _jsx(ChevronDown, { className: "w-4 h-4 text-gray-500" })] }), showDropdown && (_jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10", children: [_jsx("button", { onClick: () => {
                                                setShowDropdown(false);
                                                onSettings();
                                            }, className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors", children: "Settings" }), _jsx("button", { onClick: () => {
                                                setShowDropdown(false);
                                                onLogout();
                                            }, className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors border-t border-gray-200 text-red-600", children: "Logout" })] }))] })] }) }), _jsxs("div", { className: "max-w-6xl mx-auto p-6", children: [_jsxs("div", { className: "grid grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "bg-white border border-gray-200 rounded p-4", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Total Loans" }), _jsx("div", { className: "text-2xl", children: "23" })] }), _jsxs("div", { className: "bg-white border border-gray-200 rounded p-4", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Active Loans" }), _jsx("div", { className: "text-2xl", children: "12" })] }), _jsxs("div", { className: "bg-white border border-gray-200 rounded p-4", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Total Value" }), _jsx("div", { className: "text-2xl", children: "Kshs 68,400" })] }), _jsxs("div", { className: "bg-white border border-gray-200 rounded p-4", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Approval Rate" }), _jsx("div", { className: "text-2xl", children: "87%" })] })] }), _jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { children: "Recent Loans" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: onCreateBorrower, className: "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors", children: "Create borrower" }), _jsx("button", { onClick: onViewPerformance, className: "border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors", children: "View portfolio performance" })] })] }), _jsxs("div", { className: "bg-white border border-gray-200 rounded", children: [_jsxs("div", { className: "grid grid-cols-5 gap-4 p-4 border-b border-gray-200 text-sm text-gray-600", children: [_jsx("div", { children: "Loan ID" }), _jsx("div", { children: "Borrower" }), _jsx("div", { children: "Amount" }), _jsx("div", { children: "Status" }), _jsx("div", { children: "Date" })] }), mockLoans.map((loan) => (_jsxs("div", { onClick: () => onOpenPastLoan(loan), className: "grid grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors", children: [_jsx("div", { className: "text-sm", children: loan.id }), _jsx("div", { className: "text-sm", children: loan.borrower }), _jsx("div", { className: "text-sm", children: loan.amount }), _jsx("div", { children: _jsx("span", { className: `px-2 py-1 rounded text-xs ${loan.statusColor}`, children: loan.status }) }), _jsx("div", { className: "text-sm text-gray-600", children: loan.date })] }, loan.id)))] })] })] }));
}
