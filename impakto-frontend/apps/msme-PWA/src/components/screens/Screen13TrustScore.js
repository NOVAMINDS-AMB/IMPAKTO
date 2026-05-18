import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Star } from 'lucide-react';
export function Screen13TrustScore({ onNext }) {
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gradient-to-b from-purple-50 to-white", children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center overflow-y-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx(Star, { className: "w-12 h-12 text-purple-600 mx-auto mb-4" }), _jsx("div", { className: "text-7xl text-purple-600 mb-4", children: "750" }), _jsx("div", { className: "text-gray-500 text-sm uppercase tracking-wide mb-6", children: "Trust Score" })] }), _jsx("div", { className: "bg-white rounded-xl p-6 border border-gray-200 max-w-xs", children: _jsx("p", { className: "text-gray-700", children: "This score helps you access capital" }) })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onNext, children: "Continue" }) })] }));
}
