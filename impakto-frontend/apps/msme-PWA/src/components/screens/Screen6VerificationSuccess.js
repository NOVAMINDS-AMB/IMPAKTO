import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CheckCircle } from 'lucide-react';
export function Screen6VerificationSuccess({ onNext }) {
    return (_jsxs(MobileScreen, { children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center overflow-y-auto", children: [_jsx("div", { className: "mb-8", children: _jsx(CheckCircle, { className: "w-24 h-24 text-emerald-600 mx-auto" }) }), _jsx("h2", { className: "text-2xl mb-4 text-gray-900", children: "Your identity is verified" }), _jsx("p", { className: "text-gray-600 text-lg", children: "You're all set to continue" })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onNext, children: "Continue" }) })] }));
}
