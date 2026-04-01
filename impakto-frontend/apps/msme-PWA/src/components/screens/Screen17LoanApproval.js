import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle } from 'lucide-react';
export function Screen17LoanApproval({ onNext }) {
    return (_jsxs(MobileScreen, { children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center overflow-y-auto", children: [_jsx("div", { className: "mb-8", children: _jsx(CheckCircle, { className: "w-24 h-24 text-emerald-600 mx-auto" }) }), _jsx("h2", { className: "text-3xl mb-4 text-gray-900", children: "Your loan is approved" }), _jsx("p", { className: "text-gray-600 text-lg", children: "Funds will be sent to your mobile money account" })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onNext, children: "Continue" }) })] }));
}
