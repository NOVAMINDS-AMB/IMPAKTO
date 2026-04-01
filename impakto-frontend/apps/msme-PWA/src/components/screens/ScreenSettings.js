import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { ArrowLeft, User, Mail, Phone, Lock, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
export function ScreenSettings({ onBack, userType }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [hasActiveLoan, setHasActiveLoan] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    // Fetch real user data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('impakto_msme_token');
                const response = await fetch('https://impakto.systems/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setUsername(data.username);
                    setHasActiveLoan(data.has_active_loan);
                }
                else {
                    setError('Failed to load profile data.');
                }
            }
            catch (err) {
                setError('Network error connecting to the server.');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);
    const handleSave = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        setIsSaving(true);
        setError('');
        try {
            const token = localStorage.getItem('impakto_msme_token');
            const response = await fetch('https://impakto.systems/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    username,
                    current_password: currentPassword || null,
                    new_password: newPassword || null
                })
            });
            const data = await response.json();
            if (response.ok) {
                setShowSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => setShowSuccess(false), 3000);
            }
            else {
                setError(data.detail || 'Failed to update profile.');
            }
        }
        catch (err) {
            setError('Network error while saving.');
        }
        finally {
            setIsSaving(false);
        }
    };
    if (isLoading) {
        return (_jsx(MobileScreen, { backgroundColor: "bg-gray-50", children: _jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("p", { className: "text-gray-500", children: "Loading profile data..." }) }) }));
    }
    return (_jsxs(MobileScreen, { backgroundColor: "bg-gray-50", children: [_jsxs("button", { onClick: onBack, className: "mb-4 text-gray-600 flex items-center gap-2 flex-shrink-0", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), " Back to Dashboard"] }), _jsx("h2", { className: "text-2xl mb-1 text-gray-900 flex-shrink-0", children: "Settings" }), _jsx("p", { className: "text-gray-600 mb-6 flex-shrink-0", children: "Manage your account information" }), error && (_jsx("div", { className: "bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex-shrink-0", children: _jsx("p", { className: "text-sm text-red-600", children: error }) })), showSuccess && (_jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 flex items-center gap-3 flex-shrink-0", children: [_jsx(Save, { className: "w-5 h-5 text-emerald-600 flex-shrink-0" }), _jsx("p", { className: "text-sm text-emerald-800 font-medium", children: "Your settings have been saved successfully!" })] })), _jsxs("div", { className: "flex-1 overflow-y-auto space-y-6 pb-2", children: [_jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-200", children: [_jsxs("h3", { className: "font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [_jsx(User, { className: "w-5 h-5 text-gray-600" }), " Personal Information"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium text-sm", children: "Full Name" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), className: "w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium text-sm", children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-gray-700 mb-2 font-medium text-sm flex items-center gap-2", children: [_jsx(Mail, { className: "w-4 h-4" }), " Email"] }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-gray-700 mb-2 font-medium text-sm flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4" }), " Phone Number"] }), _jsx("input", { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), className: "w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] })] })] }), _jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-200", children: [_jsxs("h3", { className: "font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [_jsx(Lock, { className: "w-5 h-5 text-gray-600" }), " Change Password"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium text-sm", children: "Current Password" }), _jsx("input", { type: "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), placeholder: "Leave blank if not changing", className: "w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium text-sm", children: "New Password" }), _jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-2 font-medium text-sm", children: "Confirm New Password" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" })] })] })] }), _jsx("div", { className: "bg-blue-50 rounded-xl p-4 border border-blue-200", children: _jsxs("p", { className: "text-sm text-blue-800", children: [_jsx("span", { className: "font-semibold", children: "Account Status:" }), " ", hasActiveLoan ? 'Active User (With Loan)' : 'Active User (No Loan)'] }) })] }), _jsx("div", { className: "mt-auto pt-4 pb-6 flex-shrink-0 bg-gray-50 border-t border-gray-200", children: _jsx(PrimaryButton, { onClick: handleSave, disabled: isSaving, children: isSaving ? 'Saving...' : 'Save Changes' }) })] }));
}
