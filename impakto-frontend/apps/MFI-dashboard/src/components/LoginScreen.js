import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function LoginScreen({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('https://impakto.systems/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Our Django schema expects 'username' and 'password'
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                if (data.role === 'mfi_officer') {
                    // Store the JWT token securely in localStorage
                    localStorage.setItem('impakto_token', data.token);
                    // Optional: Store the employee ID for the dashboard
                    if (data.employee_id)
                        localStorage.setItem('employee_id', data.employee_id);
                    onLogin(); // Proceed to the dashboard
                }
                else {
                    setError('Access denied. This portal is for MFI Officers only.');
                }
            }
            else {
                setError(data.detail || 'Invalid credentials.');
            }
        }
        catch (err) {
            setError('Failed to connect to the backend server.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-gray-900", children: "Impakto MFI Portal" }), error && _jsx("p", { className: "text-red-500 text-sm mb-4", children: error }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1 text-sm text-gray-700", children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500", placeholder: "admin", disabled: isLoading })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 text-sm text-gray-700", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500", placeholder: "impaktoadmin", disabled: isLoading })] }), _jsx("button", { onClick: handleLogin, disabled: isLoading, className: "w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50", children: isLoading ? 'Authenticating...' : 'Log in' })] })] }) }));
}
