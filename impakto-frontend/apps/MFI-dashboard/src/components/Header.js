import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, ArrowLeft } from 'lucide-react';
export function Header({ title, onHome, onBack, showNavigation = true }) {
    return (_jsx("header", { className: "bg-white border-b border-gray-200 px-6 py-4", children: _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-4", children: [showNavigation && (_jsxs("div", { className: "flex gap-2", children: [onBack && (_jsx("button", { onClick: onBack, className: "p-2 hover:bg-gray-100 rounded transition-colors", title: "Go back", children: _jsx(ArrowLeft, { className: "w-5 h-5 text-gray-600" }) })), onHome && (_jsx("button", { onClick: onHome, className: "p-2 hover:bg-gray-100 rounded transition-colors", title: "Go to home", children: _jsx(Home, { className: "w-5 h-5 text-gray-600" }) }))] })), _jsx("h1", { children: title })] }) }) }));
}
