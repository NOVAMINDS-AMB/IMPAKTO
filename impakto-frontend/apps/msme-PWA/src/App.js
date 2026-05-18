import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
export default function App() {
    const [currentScreen, setCurrentScreen] = useState('landing');
    const [userType, setUserType] = useState('new');
    const [loginUsername, setLoginUsername] = useState('');
    const [isAddingNewEntry, setIsAddingNewEntry] = useState(false);
    const [selectedEligibility, setSelectedEligibility] = useState(null);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [lastAmountPaid, setLastAmountPaid] = useState(0);
    const navigateTo = (screen) => {
        setCurrentScreen(screen);
    };
    const handleLogin = () => {
        navigateTo('login');
    };
    const handleLoginNext = () => {
        navigateTo('login-2fa');
    };
    const handle2FAComplete = (selectedUserType) => {
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
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: [_jsxs("div", { className: "w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col", style: { height: '100vh', minHeight: '667px', maxHeight: '844px' }, children: [currentScreen === 'landing' && (_jsx(Screen1Landing, { onNext: handleGetStarted, onLogin: handleLogin })), currentScreen === 'login' && (_jsx(ScreenLogin, { onNext: handleLoginNext, onBack: () => navigateTo('landing') })), currentScreen === 'login-2fa' && (_jsx(ScreenLogin2FA, { onNext: handle2FAComplete, onBack: () => navigateTo('login'), username: loginUsername })), currentScreen === 'signup' && (_jsx(Screen2SignUp, { onNext: () => navigateTo('verification-prompt') })), currentScreen === 'verification-prompt' && (_jsx(Screen3VerificationPrompt, { onNext: () => navigateTo('capture-id') })), currentScreen === 'capture-id' && (_jsx(Screen4CaptureID, { onNext: () => navigateTo('capture-selfie') })), currentScreen === 'capture-selfie' && (_jsx(Screen5CaptureSelfie, { onNext: () => navigateTo('verification-success') })), currentScreen === 'verification-success' && (_jsx(Screen6VerificationSuccess, { onNext: () => navigateTo('main-dashboard') })), currentScreen === 'main-dashboard' && (_jsx(ScreenMainDashboard, { isNewUser: isNewUser, onScanLedger: () => {
                            setIsAddingNewEntry(false);
                            navigateTo('ledger-intro');
                        }, onViewLedger: () => navigateTo('ledger-records'), onViewTrustScore: () => navigateTo('trust-score-detail'), onViewAISuggestions: () => navigateTo('ai-suggestions'), onLoanApplication: () => navigateTo('loan-overview'), onLogout: handleLogout, onSettings: () => navigateTo('settings') })), currentScreen === 'ledger-intro' && (_jsx(Screen7LedgerIntro, { onNext: () => navigateTo('capture-ledger') })), currentScreen === 'capture-ledger' && (_jsx(Screen8CaptureLedger, { onNext: () => navigateTo('digitized-entry') })), currentScreen === 'digitized-entry' && (_jsx(ScreenDigitizedEntry, { onNext: () => {
                            if (isAddingNewEntry) {
                                navigateTo('updated-ledger');
                            }
                            else if (isNewUser) {
                                navigateTo('ledger-records');
                            }
                            else {
                                navigateTo('old-dashboard');
                            }
                        } })), currentScreen === 'updated-ledger' && (_jsx(ScreenUpdatedLedger, { onBack: () => {
                            setIsAddingNewEntry(false);
                            navigateTo('main-dashboard');
                        } })), currentScreen === 'ledger-records' && (_jsx(ScreenLedgerRecords, { onBack: () => navigateTo('main-dashboard'), onScanNew: handleScanNewEntry })), currentScreen === 'trust-score-detail' && (_jsx(ScreenTrustScoreDetail, { onBack: () => navigateTo('main-dashboard'), isNewUser: isNewUser })), currentScreen === 'ai-suggestions' && (_jsx(ScreenAISuggestions, { onBack: () => navigateTo('main-dashboard'), onGetStockCapital: () => navigateTo('loan-overview'), isNewUser: isNewUser })), currentScreen === 'loan-overview' && (_jsx(ScreenLoanOverview, { onBack: () => navigateTo('main-dashboard'), onApplyNewLoan: (eligibility) => {
                            setSelectedEligibility(eligibility);
                            navigateTo('loan-review');
                        }, onViewRepayment: (loan) => {
                            setSelectedLoan(loan);
                            navigateTo('repayment');
                        } })), currentScreen === 'old-dashboard' && (_jsx(Screen10Dashboard, { onNext: () => navigateTo('add-more') })), currentScreen === 'add-more' && (_jsx(Screen11AddMore, { onNext: () => navigateTo('trust-notification') })), currentScreen === 'trust-notification' && (_jsx(Screen12TrustNotification, { onNext: () => navigateTo('trust-score-old') })), currentScreen === 'trust-score-old' && (_jsx(Screen13TrustScore, { onNext: () => navigateTo('insight-notification') })), currentScreen === 'insight-notification' && (_jsx(Screen14InsightNotification, { onNext: () => navigateTo('restock-suggestion') })), currentScreen === 'restock-suggestion' && (_jsx(Screen15RestockSuggestion, { onNext: () => navigateTo('loan-review') })), currentScreen === 'loan-review' && (_jsx(Screen16LoanReview, { eligibility: selectedEligibility, onNext: (loan) => {
                            setSelectedLoan(loan);
                            navigateTo('loan-approval');
                        }, onBack: () => navigateTo('loan-overview') })), currentScreen === 'loan-approval' && (_jsx(Screen17LoanApproval, { onNext: () => navigateTo('funds-received') })), currentScreen === 'funds-received' && (_jsx(Screen18FundsReceived, { onNext: () => {
                            setUserType('user2'); // After getting loan, user becomes user2
                            navigateTo('outstanding-loan');
                        } })), currentScreen === 'outstanding-loan' && (_jsx(Screen19OutstandingLoan, { onNext: () => navigateTo('repayment'), onGoToDashboard: () => navigateTo('main-dashboard') })), currentScreen === 'repayment' && (_jsx(Screen20Repayment, { loan: selectedLoan, onNext: (updatedLoan, amountPaid) => {
                            setSelectedLoan(updatedLoan);
                            setLastAmountPaid(amountPaid);
                            navigateTo('repayment-success');
                        }, onBack: () => navigateTo('outstanding-loan') })), currentScreen === 'repayment-success' && (_jsx(Screen21RepaymentSuccess, { loan: selectedLoan, amountPaid: lastAmountPaid, onReset: resetFlow, onGoToDashboard: () => navigateTo('main-dashboard') })), currentScreen === 'settings' && (_jsx(ScreenSettings, { onBack: () => navigateTo('main-dashboard'), userType: userType }))] }), _jsxs("div", { className: "fixed bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-full text-sm", children: [currentScreen, " | ", userType] })] }));
}
