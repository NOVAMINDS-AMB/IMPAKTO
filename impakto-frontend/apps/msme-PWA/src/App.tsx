import { useState, useEffect } from 'react';
import { syncData } from './lib/sync';
import { Screen1Landing } from './components/screens/Screen1Landing';
import { ScreenLogin } from './components/screens/ScreenLogin';
import { ScreenLogin2FA } from './components/screens/ScreenLogin2FA';
import { Screen2SignUp } from './components/screens/Screen2SignUp';
import { Screen3VerificationPrompt } from './components/screens/Screen3VerificationPrompt';
import { Screen4CaptureID } from './components/screens/Screen4CaptureID';
import { Screen5CaptureSelfie } from './components/screens/Screen5CaptureSelfie';
import { Screen6VerificationSuccess } from './components/screens/Screen6VerificationSuccess';
import { Screen7LedgerIntro } from './components/screens/Screen7LedgerIntro';
import { Screen8CaptureLedger } from './components/screens/Screen8CaptureLedger';
import { Screen9LedgerPreview } from './components/screens/Screen9LedgerPreview';
import { Screen10Dashboard } from './components/screens/Screen10Dashboard';
import { Screen11AddMore } from './components/screens/Screen11AddMore';
import { Screen12TrustNotification } from './components/screens/Screen12TrustNotification';
import { Screen13TrustScore } from './components/screens/Screen13TrustScore';
import { Screen14InsightNotification } from './components/screens/Screen14InsightNotification';
import { Screen15RestockSuggestion } from './components/screens/Screen15RestockSuggestion';
import { Screen16LoanReview } from './components/screens/Screen16LoanReview';
import { Screen17LoanApproval } from './components/screens/Screen17LoanApproval';
import { Screen18FundsReceived } from './components/screens/Screen18FundsReceived';
import { Screen19OutstandingLoan } from './components/screens/Screen19OutstandingLoan';
import { Screen20Repayment } from './components/screens/Screen20Repayment';
import { Screen21RepaymentSuccess } from './components/screens/Screen21RepaymentSuccess';
import { ScreenMainDashboard } from './components/screens/ScreenMainDashboard';
import { ScreenSettings } from './components/screens/ScreenSettings';
import { ScreenLedgerRecords } from './components/screens/ScreenLedgerRecords';
import { ScreenDigitizedEntry } from './components/screens/ScreenDigitizedEntry';
import { ScreenUpdatedLedger } from './components/screens/ScreenUpdatedLedger';
import { ScreenAISuggestions } from './components/screens/ScreenAISuggestions';
import { ScreenTrustScoreDetail } from './components/screens/ScreenTrustScoreDetail';
import { ScreenLoanOverview } from './components/screens/ScreenLoanOverview';

type AppScreen = 
  | 'landing' 
  | 'login' 
  | 'login-2fa'
  | 'signup'
  | 'verification-prompt'
  | 'capture-id'
  | 'capture-selfie'
  | 'verification-success'
  | 'main-dashboard'
  | 'settings'
  | 'ledger-intro'
  | 'ledger-records'
  | 'capture-ledger'
  | 'ledger-preview'
  | 'digitized-entry'
  | 'updated-ledger'
  | 'old-dashboard'
  | 'add-more'
  | 'trust-notification'
  | 'trust-score-old'
  | 'trust-score-detail'
  | 'insight-notification'
  | 'restock-suggestion'
  | 'ai-suggestions'
  | 'loan-overview'
  | 'loan-review'
  | 'loan-approval'
  | 'funds-received'
  | 'outstanding-loan'
  | 'repayment'
  | 'repayment-success';

type UserType = 'new' | 'user1' | 'user2';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [userType, setUserType] = useState<UserType>('new');
  const [loginUsername, setLoginUsername] = useState('');
  const [isAddingNewEntry, setIsAddingNewEntry] = useState(false);

  // The "Auto-Sync" Logic
  useEffect(() => {
    // 1. Try to sync immediately on load
    syncData();

    // 2. Listen for network recovery
    const handleOnline = () => {
      console.log("🌐 Back Online! Triggering sync...");
      syncData();
    };

    window.addEventListener('online', handleOnline);
    
    // Cleanup the event listener on unmount
    return () => window.removeEventListener('online', handleOnline);
  }, []); // <-- Added the empty dependency array here to prevent infinite rendering triggers!

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    navigateTo('login');
  };

  const handleLoginNext = () => {
    navigateTo('login-2fa');
  };

  const handle2FAComplete = (selectedUserType: 'user1' | 'user2') => {
    setUserType(selectedUserType);
    navigateTo('main-dashboard');
  };

  const handleGetStarted = () => {
    setUserType('new');
    navigateTo('signup');
  };

  const handleLogout = () => {
    setCurrentScreen('landing');
    setUserType('new');
    setLoginUsername('');
    setIsAddingNewEntry(false);
  };

  const resetFlow = () => {
    setCurrentScreen('landing');
    setUserType('new');
    setLoginUsername('');
    setIsAddingNewEntry(false);
  };

  // Handle scanning new entry from ledger records
  const handleScanNewEntry = () => {
    setIsAddingNewEntry(true);
    navigateTo('capture-ledger');
  };

  // Determine if user is new
  const isNewUser = userType === 'new';
  // Determine if user has active loan (user2)
  const hasActiveLoan = userType === 'user2';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden" style={{ minHeight: '667px', maxHeight: '844px' }}>
        {/* Landing & Auth Screens */}
        {currentScreen === 'landing' && (
          <Screen1Landing onNext={handleGetStarted} onLogin={handleLogin} />
        )}
        {currentScreen === 'login' && (
          <ScreenLogin onNext={handleLoginNext} onBack={() => navigateTo('landing')} />
        )}
        {currentScreen === 'login-2fa' && (
          <ScreenLogin2FA 
            onNext={handle2FAComplete} 
            onBack={() => navigateTo('login')}
            username={loginUsername}
          />
        )}

        {/* New User Onboarding Flow */}
        {currentScreen === 'signup' && (
          <Screen2SignUp onNext={() => navigateTo('verification-prompt')} />
        )}
        {currentScreen === 'verification-prompt' && (
          <Screen3VerificationPrompt onNext={() => navigateTo('capture-id')} />
        )}
        {currentScreen === 'capture-id' && (
          <Screen4CaptureID onNext={() => navigateTo('capture-selfie')} />
        )}
        {currentScreen === 'capture-selfie' && (
          <Screen5CaptureSelfie onNext={() => navigateTo('verification-success')} />
        )}
        {currentScreen === 'verification-success' && (
          <Screen6VerificationSuccess onNext={() => navigateTo('main-dashboard')} />
        )}

        {/* Main Dashboard */}
        {currentScreen === 'main-dashboard' && (
          <ScreenMainDashboard
            isNewUser={isNewUser}
            hasActiveLoan={hasActiveLoan}
            onScanLedger={() => {
              setIsAddingNewEntry(false);
              navigateTo('ledger-intro');
            }}
            onViewLedger={() => navigateTo('ledger-records')}
            onViewTrustScore={() => navigateTo('trust-score-detail')}
            onViewAISuggestions={() => navigateTo('ai-suggestions')}
            onLoanApplication={() => navigateTo('loan-overview')}
            onLogout={handleLogout}
            onSettings={() => navigateTo('settings')}
          />
        )}

        {/* Ledger Flow for New Users */}
        {currentScreen === 'ledger-intro' && (
          <Screen7LedgerIntro onNext={() => navigateTo('capture-ledger')} />
        )}
        {currentScreen === 'capture-ledger' && (
          <Screen8CaptureLedger onNext={() => {
            if (isAddingNewEntry) {
              navigateTo('digitized-entry');
            } else {
              navigateTo('ledger-preview');
            }
          }} />
        )}
        {currentScreen === 'ledger-preview' && (
          <Screen9LedgerPreview onNext={() => {
            // After viewing records, direct to ledger entries (for new users)
            if (isNewUser) {
              navigateTo('ledger-records');
            } else {
              navigateTo('old-dashboard');
            }
          }} />
        )}

        {/* Digitized Entry Flow */}
        {currentScreen === 'digitized-entry' && (
          <ScreenDigitizedEntry onNext={() => navigateTo('updated-ledger')} />
        )}

        {currentScreen === 'updated-ledger' && (
          <ScreenUpdatedLedger onBack={() => {
            setIsAddingNewEntry(false);
            navigateTo('main-dashboard');
          }} />
        )}

        {/* Ledger Records for Returning Users */}
        {currentScreen === 'ledger-records' && (
          <ScreenLedgerRecords 
            onBack={() => navigateTo('main-dashboard')} 
            onScanNew={handleScanNewEntry}
          />
        )}

        {/* Trust Score Detail */}
        {currentScreen === 'trust-score-detail' && (
          <ScreenTrustScoreDetail 
            onBack={() => navigateTo('main-dashboard')}
            isNewUser={isNewUser}
          />
        )}

        {/* AI Suggestions */}
        {currentScreen === 'ai-suggestions' && (
          <ScreenAISuggestions 
            onBack={() => navigateTo('main-dashboard')}
            onGetStockCapital={() => navigateTo('loan-overview')}
            isNewUser={isNewUser}
          />
        )}

        {/* Loan Overview */}
        {currentScreen === 'loan-overview' && (
          <ScreenLoanOverview
            onBack={() => navigateTo('main-dashboard')}
            onApplyNewLoan={() => navigateTo('loan-review')}
            onViewRepayment={() => navigateTo('repayment')}
            hasActiveLoan={hasActiveLoan}
            isNewUser={isNewUser}
          />
        )}

        {/* Original Dashboard Flow (keeping for demo continuity) */}
        {currentScreen === 'old-dashboard' && (
          <Screen10Dashboard onNext={() => navigateTo('add-more')} />
        )}
        {currentScreen === 'add-more' && (
          <Screen11AddMore onNext={() => navigateTo('trust-notification')} />
        )}
        {currentScreen === 'trust-notification' && (
          <Screen12TrustNotification onNext={() => navigateTo('trust-score-old')} />
        )}
        {currentScreen === 'trust-score-old' && (
          <Screen13TrustScore onNext={() => navigateTo('insight-notification')} />
        )}
        {currentScreen === 'insight-notification' && (
          <Screen14InsightNotification onNext={() => navigateTo('restock-suggestion')} />
        )}
        {currentScreen === 'restock-suggestion' && (
          <Screen15RestockSuggestion onNext={() => navigateTo('loan-review')} />
        )}

        {/* Loan Process */}
        {currentScreen === 'loan-review' && (
          <Screen16LoanReview onNext={() => navigateTo('loan-approval')} />
        )}
        {currentScreen === 'loan-approval' && (
          <Screen17LoanApproval onNext={() => navigateTo('funds-received')} />
        )}
        {currentScreen === 'funds-received' && (
          <Screen18FundsReceived onNext={() => {
            setUserType('user2'); // After getting loan, user becomes user2
            navigateTo('outstanding-loan');
          }} />
        )}
        {currentScreen === 'outstanding-loan' && (
          <Screen19OutstandingLoan 
            onNext={() => navigateTo('repayment')}
            onGoToDashboard={() => navigateTo('main-dashboard')}
          />
        )}
        {currentScreen === 'repayment' && (
          <Screen20Repayment onNext={() => navigateTo('repayment-success')} />
        )}
        {currentScreen === 'repayment-success' && (
          <Screen21RepaymentSuccess 
            onReset={resetFlow}
            onGoToDashboard={() => navigateTo('main-dashboard')}
          />
        )}

        {/* Settings */}
        {currentScreen === 'settings' && (
          <ScreenSettings 
            onBack={() => navigateTo('main-dashboard')} 
            userType={userType}
          />
        )}
      </div>
      
      {/* Screen indicator */}
      <div className="fixed bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-full text-sm">
        {currentScreen} | {userType}
      </div>
    </div>
  );
}