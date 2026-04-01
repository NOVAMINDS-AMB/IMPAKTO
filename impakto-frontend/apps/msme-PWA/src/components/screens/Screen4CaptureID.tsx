import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CreditCard, CheckCircle2, Loader2, Camera, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { kycService, KYCData } from '../../lib/kyc';

interface Screen4CaptureIDProps {
  onNext: () => void;
}

export function Screen4CaptureID({ onNext }: Screen4CaptureIDProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<KYCData | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCaptureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setError('');
    setIsScanning(true);
    setExtractedData(null);

    // --- REMOVE THE 3 LINES ---
    // Save the raw File object directly to active memory
    (window as any).impaktoTempIdFile = file;
    // ------------------------------------    

    try {
      // Send to Django + Groq
      const data = await kycService.extractId(file);
      setExtractedData(data);
    } catch (err: any) {
      setError(err.message || 'Could not read ID. Ensure the text is clear and well-lit.');
      setPreviewUrl(null); // Clear preview so they can try again
    } finally {
      setIsScanning(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  const resetCapture = () => {
    setPreviewUrl(null);
    setExtractedData(null);
    setError('');
  };

  return (
    <MobileScreen backgroundColor="bg-gray-900">
      <div className="flex flex-col h-full text-white pt-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Capture National ID</h2>
          <p className="text-gray-400">Position the front of your ID in the frame</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl mx-4 mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          {/* Viewfinder / Preview Box */}
          <div className="w-full max-w-sm aspect-[1.58/1] relative bg-black rounded-xl overflow-hidden border-2 border-gray-700 flex items-center justify-center mb-6 shadow-xl">
            {previewUrl ? (
              <img src={previewUrl} alt="ID preview" className="w-full h-full object-cover opacity-60" />
            ) : (
              <CreditCard className="w-16 h-16 text-gray-600" />
            )}

            {!previewUrl && (
              <div className="absolute inset-4 border-2 border-emerald-500/30 rounded-lg border-dashed"></div>
            )}

            {isScanning && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
                <p className="text-emerald-400 font-medium">Extracting ID data...</p>
              </div>
            )}

            {extractedData && (
              <div className="absolute inset-0 bg-emerald-900/60 flex items-center justify-center backdrop-blur-sm z-10">
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
              </div>
            )}
          </div>

          {/* Extracted Data Display */}
          {extractedData && (
            <div className="w-full bg-gray-800 rounded-xl p-5 border border-gray-700 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-emerald-400 font-semibold mb-3 border-b border-gray-700 pb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> ID Verified
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">First Name</span>
                  <span className="font-medium text-white">{extractedData.first_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Last Name</span>
                  <span className="font-medium text-white">{extractedData.last_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">ID Number</span>
                  <span className="font-medium text-white">{extractedData.id_number}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-6 mt-auto pt-6 flex gap-3">
          {previewUrl ? (
             <button 
              onClick={resetCapture}
              disabled={isScanning}
              className="px-6 py-4 bg-gray-800 text-white rounded-2xl font-semibold disabled:opacity-50 border border-gray-700"
            >
              Retake
            </button>
          ) : (
            <button 
              onClick={() => window.history.back()}
              className="p-4 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          )}
          
          <div className="flex-1 overflow-y-auto">
            {!extractedData ? (
              <PrimaryButton onClick={handleCaptureClick} disabled={isScanning}>
                <Camera className="w-5 h-5 mr-2 inline" /> Take Photo
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={onNext}>
                Continue to Selfie
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}