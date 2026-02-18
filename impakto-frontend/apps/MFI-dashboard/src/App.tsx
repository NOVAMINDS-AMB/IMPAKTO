import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { BorrowerProfile } from './components/BorrowerProfile';
import { LoanApplicationCreation } from './components/LoanApplicationCreation';
import { ApplicationReview } from './components/ApplicationReview';
import { LoanApplicationOverview } from './components/LoanApplicationOverview';
import { LoanReview } from './components/LoanReview';
import { ApprovalConfirmation } from './components/ApprovalConfirmation';
import { ApprovedLoanStatus } from './components/ApprovedLoanStatus';
import { PortfolioOverview, LoanData } from './components/PortfolioOverview';
import { PortfolioPerformance } from './components/PortfolioPerformance';
import { PastLoanDetail } from './components/PastLoanDetail';
import { Settings } from './components/Settings';

export type Screen =
  | 'login'
  | 'portfolio-overview'
  | 'borrower-profile'
  | 'loan-application-creation'
  | 'application-review'
  | 'loan-application-overview'
  | 'loan-review'
  | 'approval-confirmation'
  | 'approved-loan-status'
  | 'portfolio-performance'
  | 'past-loan-detail'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<LoanData | undefined>(undefined);

  const navigateTo = (screen: Screen) => {
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen(screen);
  };

  const navigateToLoanDetail = (screen: Screen, loan: LoanData) => {
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
        return <LoginScreen onLogin={() => setCurrentScreen('portfolio-overview')} />;
      case 'portfolio-overview':
        return (
          <PortfolioOverview
            onCreateBorrower={() => navigateTo('borrower-profile')}
            onViewPerformance={() => navigateTo('portfolio-performance')}
            onOpenPastLoan={(loan) => navigateToLoanDetail('past-loan-detail', loan)}
            onSettings={() => navigateTo('settings')}
            onLogout={logout}
          />
        );
      case 'borrower-profile':
        return (
          <BorrowerProfile
            onSave={() => navigateTo('loan-application-creation')}
            onHome={goHome}
            onBack={goBack}
          />
        );
      case 'loan-application-creation':
        return (
          <LoanApplicationCreation
            onSubmit={() => navigateTo('application-review')}
            onHome={goHome}
            onBack={goBack}
          />
        );
      case 'application-review':
        return (
          <ApplicationReview
            onEdit={() => navigateTo('borrower-profile')}
            onContinue={() => navigateTo('loan-application-overview')}
            onHome={goHome}
            onBack={goBack}
          />
        );
      case 'loan-application-overview':
        return (
          <LoanApplicationOverview
            onOpen={() => navigateTo('loan-review')}
            onHome={goHome}
            onBack={goBack}
          />
        );
      case 'loan-review':
        return (
          <LoanReview
            onApprove={() => navigateTo('approval-confirmation')}
            onHome={goHome}
            onBack={goBack}
          />
        );
      case 'approval-confirmation':
        return (
          <ApprovalConfirmation
            onConfirm={() => navigateTo('approved-loan-status')}
            onHome={goHome}
            onBack={goBack}
          />
        );
      case 'approved-loan-status':
        return (
          <ApprovedLoanStatus
            onReturnToPortfolio={goHome}
            onHome={goHome}
          />
        );
      case 'portfolio-performance':
        return (
          <PortfolioPerformance
            onOpenPastDecision={() => navigateTo('past-loan-detail')}
            onHome={goHome}
            onBack={goBack}
          />
        );
      case 'past-loan-detail':
        return <PastLoanDetail onHome={goHome} onBack={goBack} loanData={selectedLoan} />;
      case 'settings':
        return <Settings onHome={goHome} onBack={goBack} />;
      default:
        return <LoginScreen onLogin={() => setCurrentScreen('portfolio-overview')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  );
}