import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { Camera, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { ledgerService } from '../../lib/ledger';

interface Screen8CaptureLedgerProps {
  onNext: () => void;
}

export function Screen8CaptureLedger({ onNext }: Screen8CaptureLedgerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger the hidden file input when the user taps the camera box
  const handleCaptureClick = () => {
    fileInputRef.current?.click();
  };

  // Handle the file once the user takes a photo or selects an image
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
    } catch (err: any) {
      setError(err.message || 'Failed to extract data. Please ensure the image is clear and well-lit.');
      setPreviewUrl(null); // Clear the preview on error so they can try again
    } finally {
      setIsAnalyzing(false);
      // Clean up the memory used by the preview image
      URL.revokeObjectURL(objectUrl); 
    }
  };

  return (
    <MobileScreen backgroundColor="bg-gray-900">
      <div className="flex flex-col h-full text-white pt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Capture Ledger</h2>
          <p className="text-gray-400">Ensure all handwritten text is clearly visible and well-lit.</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl mx-4 mb-4 text-center text-sm">
            {error}
          </div>
        )}

        {/* Hidden File Input (capture="environment" tries to open the rear camera on mobile) */}
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Camera Viewfinder Area */}
        <div className="flex-1 relative bg-black mx-4 rounded-3xl overflow-hidden border-2 border-gray-700 flex items-center justify-center mb-8 overflow-y-auto">
          
          {previewUrl ? (
            <img src={previewUrl} alt="Ledger preview" className="w-full h-full object-cover opacity-50" />
          ) : (
            <div className="text-center p-6">
              <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">Tap below to open camera</p>
            </div>
          )}

          {/* Target Box Overlay */}
          {!previewUrl && (
            <div className="absolute inset-0 border-2 border-emerald-500/30 m-8 rounded-xl border-dashed"></div>
          )}

          {/* Loading Overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
              <p className="text-emerald-400 font-medium text-lg">Impakto AI Analyzing...</p>
              <p className="text-gray-400 text-sm mt-2">Extracting amounts and dates</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-6 flex gap-4">
          <button 
            onClick={() => window.history.back()}
            disabled={isAnalyzing}
            className="p-4 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700 disabled:opacity-50"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
          
          <div className="flex-1 overflow-y-auto">
            <PrimaryButton 
              onClick={handleCaptureClick} 
              disabled={isAnalyzing}
            >
              <Camera className="w-5 h-5 mr-2 inline" /> 
              {isAnalyzing ? 'Processing...' : 'Take Photo'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}