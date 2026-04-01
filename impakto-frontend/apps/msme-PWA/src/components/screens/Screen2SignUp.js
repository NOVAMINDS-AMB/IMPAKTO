import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { useState } from 'react';
export function Screen2SignUp({ onNext }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // New state for handling API requests
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSignup = async () => {
        // Basic frontend validation
        if (!name || !email || !phone || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Automatically log the user in by storing the tokens
                localStorage.setItem('impakto_msme_token', data.token);
                localStorage.setItem('has_active_loan', 'false'); // New users don't have loans yet
                onNext(); // Proceed to the next screen
            }
            else {
                setError(data.detail || 'Signup failed.');
            }
        }
        catch (err) {
            setError('Failed to connect to the backend server.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(MobileScreen, { children: [_jsx("h2", { className: "text-2xl mb-2 text-gray-900", children: "Create your account" }), _jsx("p", { className: "text-gray-600 mb-6", children: "We'll need a few details to get you started" }), error && _jsx("p", { className: "text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg", children: error }), _jsxs("div", { className: "flex-1 space-y-4 overflow-y-auto", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium", children: "Full Name" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Enter your full name", disabled: isLoading, className: "w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email", disabled: isLoading, className: "w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium", children: "Phone Number" }), _jsx("input", { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "Enter your phone number", disabled: isLoading, className: "w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Create a password", disabled: isLoading, className: "w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium", children: "Confirm Password" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Confirm your password", disabled: isLoading, className: "w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] })] }), _jsx("div", { className: "mt-auto pt-4", children: _jsx(PrimaryButton, { onClick: handleSignup, disabled: isLoading, children: isLoading ? 'Creating Account...' : 'Continue' }) })] }));
}
