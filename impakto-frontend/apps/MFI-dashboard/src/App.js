import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { BorrowerProfile } from './components/BorrowerProfile';
import { LoanApplicationCreation } from './components/LoanApplicationCreation';
import { ApplicationReview } from './components/ApplicationReview';
import { LoanApplicationOverview } from './components/LoanApplicationOverview';
import { LoanReview } from './components/LoanReview';
import { ApprovalConfirmation } from './components/ApprovalConfirmation';
import { ApprovedLoanStatus } from './components/ApprovedLoanStatus';
import { PortfolioOverview } from './components/PortfolioOverview';
import { PortfolioPerformance } from './components/PortfolioPerformance';
import { PastLoanDetail } from './components/PastLoanDetail';
import { Settings } from './components/Settings';
export default function App() {
    const [currentScreen, setCurrentScreen] = useState('login');
    const [screenHistory, setScreenHistory] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(undefined);
    const navigateTo = (screen) => {
        setScreenHistory([...screenHistory, currentScreen]);
        setCurrentScreen(screen);
    };
    const navigateToLoanDetail = (screen, loan) => {
        setScreenHistory([...screenHistory, currentScreen]);
        setSelectedLoan(loan);
        setCurrentScreen(screen);
    };
    const goBack = () => {
        if (screenHistory.length > 0) {
            const previousScreen = screenHistory[screenHistory.length - 1];
            setScreenHistory(screenHistory.slice(0, -1));
            setCurrentScreen(previousScreen);
        }
    };
    const goHome = () => {
        setScreenHistory([]);
        setSelectedLoan(undefined);
        setCurrentScreen('portfolio-overview');
    };
    const logout = () => {
        setScreenHistory([]);
        setSelectedLoan(undefined);
        setCurrentScreen('login');
    };
    const renderScreen = () => {
        switch (currentScreen) {
            case 'login':
                return _jsx(LoginScreen, { onLogin: () => setCurrentScreen('portfolio-overview') });
            case 'portfolio-overview':
                return (_jsx(PortfolioOverview, { onCreateBorrower: () => navigateTo('borrower-profile'), onViewPerformance: () => navigateTo('portfolio-performance'), onOpenPastLoan: (loan) => navigateToLoanDetail('past-loan-detail', loan), onSettings: () => navigateTo('settings'), onLogout: logout }));
            case 'borrower-profile':
                return (_jsx(BorrowerProfile, { onSave: () => navigateTo('loan-application-creation'), onHome: goHome, onBack: goBack }));
            case 'loan-application-creation':
                return (_jsx(LoanApplicationCreation, { onSubmit: () => navigateTo('application-review'), onHome: goHome, onBack: goBack }));
            case 'application-review':
                return (_jsx(ApplicationReview, { onEdit: () => navigateTo('borrower-profile'), onContinue: () => navigateTo('loan-application-overview'), onHome: goHome, onBack: goBack }));
            case 'loan-application-overview':
                return (_jsx(LoanApplicationOverview, { onOpen: () => navigateTo('loan-review'), onHome: goHome, onBack: goBack }));
            case 'loan-review':
                return (_jsx(LoanReview, { onApprove: () => navigateTo('approval-confirmation'), onHome: goHome, onBack: goBack }));
            case 'approval-confirmation':
                return (_jsx(ApprovalConfirmation, { onConfirm: () => navigateTo('approved-loan-status'), onHome: goHome, onBack: goBack }));
            case 'approved-loan-status':
                return (_jsx(ApprovedLoanStatus, { onReturnToPortfolio: goHome, onHome: goHome }));
            case 'portfolio-performance':
                return (_jsx(PortfolioPerformance, { onOpenPastDecision: () => navigateTo('past-loan-detail'), onHome: goHome, onBack: goBack }));
            case 'past-loan-detail':
                return _jsx(PastLoanDetail, { onHome: goHome, onBack: goBack, loanData: selectedLoan });
            case 'settings':
                return _jsx(Settings, { onHome: goHome, onBack: goBack });
            default:
                return _jsx(LoginScreen, { onLogin: () => setCurrentScreen('portfolio-overview') });
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50", children: renderScreen() }));
}
