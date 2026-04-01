import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
export function ScreenLogin2FA({ onNext, onBack, username }) {
    const [code, setCode] = useState('');
    const handleVerify = () => {
        // Dummy verification logic for MVP: Accept any 6 digit code
        if (code.length === 6) {
            // Read the real database status we saved in the previous step
            const hasActiveLoan = localStorage.getItem('has_active_loan') === 'true';
            if (hasActiveLoan) {
                onNext('user2'); // Route to active loan dashboard
            }
            else {
                onNext('user1'); // Route to no loan dashboard
            }
        }
    };
    return (_jsxs(MobileScreen, { children: [_jsxs("button", { onClick: onBack, className: "mb-6 text-gray-600 flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), " Back"] }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "flex items-center gap-3 mb-8", children: [_jsx("div", { className: "bg-white-100 rounded-full p-3", children: _jsx("img", { src: "/Impakto Official Logo.jpeg", alt: "Impakto logo", className: "w-8 h-8 object-contain" }) }), _jsx("h1", { className: "text-2xl text-gray-900", children: _jsx("span", { className: "font-bold", children: "Impakto" }) })] }), _jsx("h2", { className: "text-2xl mb-2 text-gray-900", children: "Verify your identity" }), _jsx("p", { className: "text-gray-600 mb-8", children: "We've sent a verification code to your registered phone number" }), _jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6", children: _jsxs("p", { className: "text-sm text-blue-800", children: [_jsx("span", { className: "font-semibold", children: "Demo Mode:" }), _jsx("br", {}), "Enter any 6-digit code (e.g. 123456) to proceed. Your dashboard will load based on your real database profile."] }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium", children: "Verification Code" }), _jsx("input", { type: "text", value: code, onChange: (e) => setCode(e.target.value), placeholder: "Enter 6-digit code", maxLength: 6, className: "w-full px-4 py-4 text-lg text-center tracking-widest font-mono border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsx("button", { className: "mt-4 text-emerald-600 font-medium", children: "Resend code" })] }), _jsx("div", { className: "mt-auto", children: _jsx(PrimaryButton, { onClick: handleVerify, disabled: code.length !== 6, children: "Verify" }) })] }));
}
