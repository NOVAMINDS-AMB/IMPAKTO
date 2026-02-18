import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Screen4CaptureIDProps {
  onNext: () => void;
}

export function Screen4CaptureID({ onNext }: Screen4CaptureIDProps) {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleTakePhoto = () => {
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
        <div className="w-full aspect-[3/2] border-4 border-white rounded-xl flex items-center justify-center mb-6 bg-gray-800">
          {!photoTaken ? (
            <CreditCard className="w-20 h-20 text-white opacity-50" />
          ) : isScanning ? (
            <Loader2 className="w-20 h-20 text-white animate-spin" />
          ) : (
            <CheckCircle2 className="w-20 h-20 text-emerald-400" />
          )}
        </div>
        
        {!photoTaken && (
          <p className="text-white text-center mb-8">
            Place your ID inside the frame
          </p>
        )}
        
        {photoTaken && isScanning && (
          <p className="text-white text-center mb-8">
            Scanning the ID photo...
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
          <PrimaryButton onClick={handleTakePhoto}>
            Take Photo
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={onNext} disabled={isScanning}>
            Submit Photo
          </PrimaryButton>
        )}
      </div>
    </MobileScreen>
  );
}