import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { User, CheckCircle2, Loader2, Camera, X, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { kycService, BiometricData } from '../../lib/kyc';

interface Screen5CaptureSelfieProps {
  onNext: () => void;
}

export function Screen5CaptureSelfie({ onNext }: Screen5CaptureSelfieProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [matchData, setMatchData] = useState<BiometricData | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCaptureClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setError('');
    setIsScanning(true);
    setMatchData(null);

    try {
      // 1. Retrieve the raw File object directly from active memory
      const idFile = (window as any).impaktoTempIdFile;
      if (!idFile) throw new Error("Missing ID card photo. Please go back.");

      // 2. Send both to Django for biometric matching!
      const data = await kycService.matchFaces(idFile, file);
      setMatchData(data);
      
      // Clear memory after successful match
      if (data.is_match) {
        (window as any).impaktoTempIdFile = null;
      }
      
    } catch (err: any) {
      setError(err.message || 'Biometric analysis failed.');
      setPreviewUrl(null);
    } finally {
      setIsScanning(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <MobileScreen backgroundColor="bg-gray-900">
      <div className="flex flex-col h-full text-white pt-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Biometric Verification</h2>
          <p className="text-gray-400">Take a clear selfie to match with your ID</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl mx-4 mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <input 
          type="file" 
          accept="image/*" 
          capture="user" // 'user' explicitly requests the front camera
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden"
        />

        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          <div className="w-64 h-64 relative bg-black rounded-full overflow-hidden border-4 border-gray-700 flex items-center justify-center mb-6 shadow-xl">
            {previewUrl ? (
              <img src={previewUrl} alt="Selfie" className="w-full h-full object-cover opacity-60" />
            ) : (
              <User className="w-24 h-24 text-gray-600" />
            )}

            {isScanning && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
                <p className="text-emerald-400 font-medium text-sm">Matching faces...</p>
              </div>
            )}
          </div>

          {matchData && (
            <div className={`w-full max-w-xs rounded-xl p-5 border animate-in fade-in slide-in-from-bottom-4 ${matchData.is_match ? 'bg-gray-800 border-emerald-500/50' : 'bg-red-900/30 border-red-500/50'}`}>
              <h3 className={`font-semibold mb-3 border-b pb-2 flex items-center gap-2 ${matchData.is_match ? 'text-emerald-400 border-gray-700' : 'text-red-400 border-red-500/30'}`}>
                {matchData.is_match ? <><CheckCircle2 className="w-5 h-5" /> Identity Confirmed</> : <><AlertCircle className="w-5 h-5" /> Match Failed</>}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Confidence Score</span>
                <span className={`font-bold text-lg ${matchData.is_match ? 'text-emerald-400' : 'text-red-400'}`}>
                  {matchData.confidence}%
                </span>
              </div>
              {!matchData.is_match && (
                <p className="text-red-300 text-xs mt-3">Faces do not match. Please ensure good lighting and try again.</p>
              )}
            </div>
          )}
        </div>

        <div className="px-4 pb-6 mt-auto pt-6 flex gap-3">
          {previewUrl ? (
             <button 
                onClick={() => { setPreviewUrl(null); setMatchData(null); setError(''); }} 
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
            {!matchData?.is_match ? (
              <PrimaryButton onClick={handleCaptureClick} disabled={isScanning}>
                <Camera className="w-5 h-5 mr-2 inline" /> Take Selfie
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={onNext}>Complete Verification</PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}