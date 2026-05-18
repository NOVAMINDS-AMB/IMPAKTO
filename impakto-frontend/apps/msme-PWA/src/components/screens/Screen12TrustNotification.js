import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Star } from 'lucide-react';
export function Screen12TrustNotification({ onNext }) {
    return (_jsxs(MobileScreen, { children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center overflow-y-auto", children: [_jsx("div", { className: "mb-8 bg-purple-100 rounded-full p-6", children: _jsx(Star, { className: "w-16 h-16 text-purple-600" }) }), _jsx("h2", { className: "text-2xl mb-4 text-gray-900", children: "Your Trust Score is ready" }), _jsx("p", { className: "text-gray-600 text-lg", children: "See how you're doing" })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onNext, children: "View Trust Score" }) })] }));
}
