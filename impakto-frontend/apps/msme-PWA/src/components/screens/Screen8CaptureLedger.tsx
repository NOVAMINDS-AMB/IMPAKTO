import { MobileScreen } from '../MobileScreen';
import { PrimaryButton } from '../PrimaryButton';
import { BookOpen, CheckCircle2, Loader2, Camera } from 'lucide-react';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveActivity } from '../../lib/db'; // Import your DB logic

interface Screen8CaptureLedgerProps {
  onNext: () => void;
}

export function Screen8CaptureLedger({ onNext }: Screen8CaptureLedgerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Trigger the native camera input
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // 2. Handle the file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setCapturedImage(file);
      setPhotoTaken(true);
      setIsScanning(true);
      
      // Simulate scanning delay
      setTimeout(() => {
        setIsScanning(false);
      }, 2000);
    }
  };

  // 3. Save to Offline DB and Proceed
  const handleSubmit = async () => {
    if (!capturedImage) return;

    try {
      setIsScanning(true); // Show loading state while saving
      
      const activityRecord = {
        id: uuidv4(),
        type: 'SALE' as const,
        amount: 0,
        timestamp: new Date().toISOString(),
        synced: 0 as const, // Critical: Marks as "Pending Sync"
      };

      await saveActivity(activityRecord);
      
      alert("✅ Saved to Device! Will sync when online."); // Temporary feedback
      onNext(); // Navigate to next screen
      
    } catch (error) {
      console.error("Save failed", error);
      alert("❌ Failed to save record");
      setIsScanning(false);
    }
  };

  return (
    <MobileScreen backgroundColor="bg-gray-900">
      {/* Hidden Input for Camera Access */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // Forces rear camera on mobile
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full aspect-[3/4] border-4 border-white rounded-xl flex items-center justify-center mb-6 bg-gray-800 overflow-hidden relative">
          
          {/* Show Preview if taken */}
          {capturedImage &&!isScanning? (
             <img 
               src={URL.createObjectURL(capturedImage)} 
               className="absolute inset-0 w-full h-full object-cover opacity-50" 
             />
          ) : null}

          {!photoTaken? (
            <BookOpen className="w-20 h-20 text-white opacity-50" />
          ) : isScanning? (
            <Loader2 className="w-20 h-20 text-white animate-spin z-10" />
          ) : (
            <CheckCircle2 className="w-20 h-20 text-emerald-400 z-10" />
          )}
        </div>
        
        {/*... (Keep your existing text logic here)... */}
         {!photoTaken && (
          <p className="text-white text-center mb-8">
            Make sure the page is fully visible
          </p>
        )}
      </div>
      
      <div className="mt-auto space-y-3">
        {!photoTaken? (
          <PrimaryButton onClick={handleCameraClick}>
            <Camera className="mr-2 h-5 w-5 inline" /> Take Photo
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleSubmit} disabled={isScanning}>
            {isScanning? 'Saving...' : 'Submit Ledger'}
          </PrimaryButton>
        )}
      </div>
    </MobileScreen>
  );
}