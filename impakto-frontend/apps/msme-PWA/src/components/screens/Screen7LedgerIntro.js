import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { BookOpen } from 'lucide-react';
export function Screen7LedgerIntro({ onNext }) {
    return (_jsxs(MobileScreen, { children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center overflow-y-auto", children: [_jsx("div", { className: "mb-8 bg-amber-100 rounded-full p-6", children: _jsx(BookOpen, { className: "w-16 h-16 text-amber-600" }) }), _jsx("h2", { className: "text-2xl mb-4 text-gray-900", children: "Add your sales records" }), _jsx("p", { className: "text-gray-600 text-lg", children: "Take a photo of your sales notebook" })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onNext, children: "Scan Ledger" }) })] }));
}
