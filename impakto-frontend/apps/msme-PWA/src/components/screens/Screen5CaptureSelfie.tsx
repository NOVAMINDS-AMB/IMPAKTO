import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { User, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Screen5CaptureSelfieProps {
  onNext: () => void;
}

export function Screen5CaptureSelfie({ onNext }: Screen5CaptureSelfieProps) {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleTakeSelfie = () => {
    setPhotoTaken(true);
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  return (
    <MobileScreen backgroundColor="bg-gray-900">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-64 h-64 border-4 border-white rounded-full flex items-center justify-center mb-6 bg-gray-800">
          {!photoTaken ? (
            <User className="w-24 h-24 text-white opacity-50" />
          ) : isScanning ? (
            <Loader2 className="w-24 h-24 text-white animate-spin" />
          ) : (
            <CheckCircle2 className="w-24 h-24 text-emerald-400" />
          )}
        </div>
        
        {!photoTaken && (
          <p className="text-white text-center mb-8">
            Make sure your face is clearly visible
          </p>
        )}
        
        {photoTaken && isScanning && (
          <p className="text-white text-center mb-8">
            Scanning your selfie...
          </p>
        )}
        
        {photoTaken && !isScanning && (
          <p className="text-emerald-400 text-center mb-8 font-semibold">
            Scan successful!
          </p>
        )}
      </div>
      
      <div className="mt-auto space-y-3">
        {!photoTaken ? (
          <PrimaryButton onClick={handleTakeSelfie}>
            Take Selfie
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={onNext} disabled={isScanning}>
            Submit Selfie
          </PrimaryButton>
        )}
      </div>
    </MobileScreen>
  );
}