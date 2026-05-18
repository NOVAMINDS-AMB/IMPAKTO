import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { User, CheckCircle2, Loader2, Camera, X, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { kycService } from '../../lib/kyc';
export function Screen5CaptureSelfie({ onNext }) {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [matchData, setMatchData] = useState(null);
    const fileInputRef = useRef(null);
    const handleCaptureClick = () => fileInputRef.current?.click();
    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setError('');
        setIsScanning(true);
        setMatchData(null);
        try {
            // 1. Retrieve the raw File object directly from active memory
            const idFile = window.impaktoTempIdFile;
            if (!idFile)
                throw new Error("Missing ID card photo. Please go back.");
            // 2. Send both to Django for biometric matching!
            const data = await kycService.matchFaces(idFile, file);
            setMatchData(data);
            // Clear memory after successful match
            if (data.is_match) {
                window.impaktoTempIdFile = null;
            }
        }
        catch (err) {
            setError(err.message || 'Biometric analysis failed.');
            setPreviewUrl(null);
        }
        finally {
            setIsScanning(false);
            URL.revokeObjectURL(objectUrl);
        }
    };
    return (_jsx(MobileScreen, { backgroundColor: "bg-gray-900", children: _jsxs("div", { className: "flex flex-col h-full text-white pt-8", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Biometric Verification" }), _jsx("p", { className: "text-gray-400", children: "Take a clear selfie to match with your ID" })] }), error && (_jsx("div", { className: "bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl mx-4 mb-4 text-center text-sm", children: error })), _jsx("input", { type: "file", accept: "image/*", capture: "user" // 'user' explicitly requests the front camera
                    , ref: fileInputRef, onChange: handleFileChange, className: "hidden" }), _jsxs("div", { className: "flex-1 flex flex-col items-center overflow-y-auto", children: [_jsxs("div", { className: "w-64 h-64 relative bg-black rounded-full overflow-hidden border-4 border-gray-700 flex items-center justify-center mb-6 shadow-xl", children: [previewUrl ? (_jsx("img", { src: previewUrl, alt: "Selfie", className: "w-full h-full object-cover opacity-60" })) : (_jsx(User, { className: "w-24 h-24 text-gray-600" })), isScanning && (_jsxs("div", { className: "absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10", children: [_jsx(Loader2, { className: "w-10 h-10 text-emerald-500 animate-spin mb-3" }), _jsx("p", { className: "text-emerald-400 font-medium text-sm", children: "Matching faces..." })] }))] }), matchData && (_jsxs("div", { className: `w-full max-w-xs rounded-xl p-5 border animate-in fade-in slide-in-from-bottom-4 ${matchData.is_match ? 'bg-gray-800 border-emerald-500/50' : 'bg-red-900/30 border-red-500/50'}`, children: [_jsx("h3", { className: `font-semibold mb-3 border-b pb-2 flex items-center gap-2 ${matchData.is_match ? 'text-emerald-400 border-gray-700' : 'text-red-400 border-red-500/30'}`, children: matchData.is_match ? _jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-5 h-5" }), " Identity Confirmed"] }) : _jsxs(_Fragment, { children: [_jsx(AlertCircle, { className: "w-5 h-5" }), " Match Failed"] }) }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-400 text-sm", children: "Confidence Score" }), _jsxs("span", { className: `font-bold text-lg ${matchData.is_match ? 'text-emerald-400' : 'text-red-400'}`, children: [matchData.confidence, "%"] })] }), !matchData.is_match && (_jsx("p", { className: "text-red-300 text-xs mt-3", children: "Faces do not match. Please ensure good lighting and try again." }))] }))] }), _jsxs("div", { className: "px-4 pb-6 mt-auto pt-6 flex gap-3", children: [previewUrl ? (_jsx("button", { onClick: () => { setPreviewUrl(null); setMatchData(null); setError(''); }, disabled: isScanning, className: "px-6 py-4 bg-gray-800 text-white rounded-2xl font-semibold disabled:opacity-50 border border-gray-700", children: "Retake" })) : (_jsx("button", { onClick: () => window.history.back(), className: "p-4 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700", children: _jsx(X, { className: "w-6 h-6 text-gray-400" }) })), _jsx("div", { className: "flex-1 overflow-y-auto", children: !matchData?.is_match ? (_jsxs(PrimaryButton, { onClick: handleCaptureClick, disabled: isScanning, children: [_jsx(Camera, { className: "w-5 h-5 mr-2 inline" }), " Take Selfie"] })) : (_jsx(PrimaryButton, { onClick: onNext, children: "Complete Verification" })) })] })] }) }));
}
