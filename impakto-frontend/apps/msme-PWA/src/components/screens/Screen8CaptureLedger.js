import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Camera, Loader2, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { ledgerService } from '../../lib/ledger';
export function Screen8CaptureLedger({ onNext }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    // Trigger the hidden file input when the user taps the camera box
    const handleCaptureClick = () => {
        fileInputRef.current?.click();
    };
    // Handle the file once the user takes a photo or selects an image
    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        // Show a quick preview of the image they took
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setError('');
        setIsAnalyzing(true);
        try {
            // 1. Send the image to Groq
            const extractedData = await ledgerService.digitizeImage(file);
            // 2. Temporarily save the AI's extracted data so the next screen can read it
            localStorage.setItem('impakto_draft_transaction', JSON.stringify(extractedData));
            // 3. Move to the review screen
            onNext();
        }
        catch (err) {
            setError(err.message || 'Failed to extract data. Please ensure the image is clear and well-lit.');
            setPreviewUrl(null); // Clear the preview on error so they can try again
        }
        finally {
            setIsAnalyzing(false);
            // Clean up the memory used by the preview image
            URL.revokeObjectURL(objectUrl);
        }
    };
    return (_jsx(MobileScreen, { backgroundColor: "bg-gray-900", children: _jsxs("div", { className: "flex flex-col h-full text-white pt-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Capture Ledger" }), _jsx("p", { className: "text-gray-400", children: "Ensure all handwritten text is clearly visible and well-lit." })] }), error && (_jsx("div", { className: "bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl mx-4 mb-4 text-center text-sm", children: error })), _jsx("input", { type: "file", accept: "image/*", capture: "environment", ref: fileInputRef, onChange: handleFileChange, className: "hidden" }), _jsxs("div", { className: "flex-1 relative bg-black mx-4 rounded-3xl overflow-hidden border-2 border-gray-700 flex items-center justify-center mb-8 overflow-y-auto", children: [previewUrl ? (_jsx("img", { src: previewUrl, alt: "Ledger preview", className: "w-full h-full object-cover opacity-50" })) : (_jsxs("div", { className: "text-center p-6", children: [_jsx(Camera, { className: "w-16 h-16 text-gray-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: "Tap below to open camera" })] })), !previewUrl && (_jsx("div", { className: "absolute inset-0 border-2 border-emerald-500/30 m-8 rounded-xl border-dashed" })), isAnalyzing && (_jsxs("div", { className: "absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10", children: [_jsx(Loader2, { className: "w-12 h-12 text-emerald-500 animate-spin mb-4" }), _jsx("p", { className: "text-emerald-400 font-medium text-lg", children: "Impakto AI Analyzing..." }), _jsx("p", { className: "text-gray-400 text-sm mt-2", children: "Extracting amounts and dates" })] }))] }), _jsxs("div", { className: "px-4 pb-6 flex gap-4", children: [_jsx("button", { onClick: () => window.history.back(), disabled: isAnalyzing, className: "p-4 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700 disabled:opacity-50", children: _jsx(X, { className: "w-6 h-6 text-gray-400" }) }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsxs(PrimaryButton, { onClick: handleCaptureClick, disabled: isAnalyzing, children: [_jsx(Camera, { className: "w-5 h-5 mr-2 inline" }), isAnalyzing ? 'Processing...' : 'Take Photo'] }) })] })] }) }));
}
