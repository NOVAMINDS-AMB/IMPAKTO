import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CreditCard, CheckCircle2, Loader2, Camera, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { kycService } from '../../lib/kyc';
export function Screen4CaptureID({ onNext }) {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const fileInputRef = useRef(null);
    const handleCaptureClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        // Show preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setError('');
        setIsScanning(true);
        setExtractedData(null);
        // --- REMOVE THE 3 LINES ---
        // Save the raw File object directly to active memory
        window.impaktoTempIdFile = file;
        // ------------------------------------    
        try {
            // Send to Django + Groq
            const data = await kycService.extractId(file);
            setExtractedData(data);
        }
        catch (err) {
            setError(err.message || 'Could not read ID. Ensure the text is clear and well-lit.');
            setPreviewUrl(null); // Clear preview so they can try again
        }
        finally {
            setIsScanning(false);
            URL.revokeObjectURL(objectUrl);
        }
    };
    const resetCapture = () => {
        setPreviewUrl(null);
        setExtractedData(null);
        setError('');
    };
    return (_jsx(MobileScreen, { backgroundColor: "bg-gray-900", children: _jsxs("div", { className: "flex flex-col h-full text-white pt-8", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Capture National ID" }), _jsx("p", { className: "text-gray-400", children: "Position the front of your ID in the frame" })] }), error && (_jsx("div", { className: "bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl mx-4 mb-4 text-center text-sm", children: error })), _jsx("input", { type: "file", accept: "image/*", capture: "environment", ref: fileInputRef, onChange: handleFileChange, className: "hidden" }), _jsxs("div", { className: "flex-1 flex flex-col items-center overflow-y-auto", children: [_jsxs("div", { className: "w-full max-w-sm aspect-[1.58/1] relative bg-black rounded-xl overflow-hidden border-2 border-gray-700 flex items-center justify-center mb-6 shadow-xl", children: [previewUrl ? (_jsx("img", { src: previewUrl, alt: "ID preview", className: "w-full h-full object-cover opacity-60" })) : (_jsx(CreditCard, { className: "w-16 h-16 text-gray-600" })), !previewUrl && (_jsx("div", { className: "absolute inset-4 border-2 border-emerald-500/30 rounded-lg border-dashed" })), isScanning && (_jsxs("div", { className: "absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10", children: [_jsx(Loader2, { className: "w-10 h-10 text-emerald-500 animate-spin mb-3" }), _jsx("p", { className: "text-emerald-400 font-medium", children: "Extracting ID data..." })] })), extractedData && (_jsx("div", { className: "absolute inset-0 bg-emerald-900/60 flex items-center justify-center backdrop-blur-sm z-10", children: _jsx(CheckCircle2, { className: "w-16 h-16 text-emerald-400" }) }))] }), extractedData && (_jsxs("div", { className: "w-full bg-gray-800 rounded-xl p-5 border border-gray-700 animate-in fade-in slide-in-from-bottom-4", children: [_jsxs("h3", { className: "text-emerald-400 font-semibold mb-3 border-b border-gray-700 pb-2 flex items-center gap-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4" }), " ID Verified"] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400 text-sm", children: "First Name" }), _jsx("span", { className: "font-medium text-white", children: extractedData.first_name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400 text-sm", children: "Last Name" }), _jsx("span", { className: "font-medium text-white", children: extractedData.last_name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400 text-sm", children: "ID Number" }), _jsx("span", { className: "font-medium text-white", children: extractedData.id_number })] })] })] }))] }), _jsxs("div", { className: "px-4 pb-6 mt-auto pt-6 flex gap-3", children: [previewUrl ? (_jsx("button", { onClick: resetCapture, disabled: isScanning, className: "px-6 py-4 bg-gray-800 text-white rounded-2xl font-semibold disabled:opacity-50 border border-gray-700", children: "Retake" })) : (_jsx("button", { onClick: () => window.history.back(), className: "p-4 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700", children: _jsx(X, { className: "w-6 h-6 text-gray-400" }) })), _jsx("div", { className: "flex-1 overflow-y-auto", children: !extractedData ? (_jsxs(PrimaryButton, { onClick: handleCaptureClick, disabled: isScanning, children: [_jsx(Camera, { className: "w-5 h-5 mr-2 inline" }), " Take Photo"] })) : (_jsx(PrimaryButton, { onClick: onNext, children: "Continue to Selfie" })) })] })] }) }));
}
