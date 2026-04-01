import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Shield } from 'lucide-react';
export function Screen3VerificationPrompt({ onNext }) {
    return (_jsxs(MobileScreen, { children: [_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center overflow-y-auto", children: [_jsx("div", { className: "mb-8 bg-blue-100 rounded-full p-6", children: _jsx(Shield, { className: "w-16 h-16 text-blue-600" }) }), _jsx("h2", { className: "text-2xl mb-4 text-gray-900", children: "Verify your identity to continue" }), _jsx("p", { className: "text-gray-600 text-lg", children: "This helps us keep your account safe" })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: onNext, children: "Start Verification" }) })] }));
}
