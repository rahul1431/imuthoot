import React, { useState } from 'react';
import { AndroidShell } from './components/AndroidShell';
import { AppHeader } from './components/AppHeader';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { MyLoansTab } from './components/MyLoansTab';
import { CalculatorTab } from './components/CalculatorTab';
import { GoldRateTab } from './components/GoldRateTab';
import { ServicesTab } from './components/ServicesTab';
import { LoginPage } from './components/LoginPage';

// Modals
import { QuickPayModal } from './components/modals/QuickPayModal';
import { DoorstepLoanModal } from './components/modals/DoorstepLoanModal';
import { ApplyLoanModal } from './components/modals/ApplyLoanModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { BranchDetailModal } from './components/modals/BranchDetailModal';
import { AiSaathiModal } from './components/modals/AiSaathiModal';
import { LanguageModal } from './components/modals/LanguageModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { RewardsModal } from './components/modals/RewardsModal';
import { SanctionLetterModal } from './components/modals/SanctionLetterModal';

// Data & Types
import { 
  LoanAccount, 
  PaymentTransaction, 
  DoorstepBooking, 
  MuthootBranch, 
  SupportedLanguage,
  CustomerProfile
} from './types';
import { 
  ranjithRathodCustomer, 
  ranjithLoans, 
  ranjithTransactions, 
  rahulRathodCustomer,
  mockLoanAccounts, 
  initialGoldRates, 
  initialTransactions, 
  initialDoorstepBookings 
} from './data/mockData';
import { accrueNextMonth } from './utils/interestCalculator';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [customer, setCustomer] = useState<CustomerProfile>(ranjithRathodCustomer);

  // App Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'loans' | 'calculator' | 'goldRate' | 'services'>('home');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [selectedCity, setSelectedCity] = useState<string>('Sangareddy');

  // Core Data States
  const [goldRates] = useState(initialGoldRates);
  const [loans, setLoans] = useState<LoanAccount[]>(ranjithLoans);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(ranjithTransactions);
  const [doorstepBookings, setDoorstepBookings] = useState<DoorstepBooking[]>(initialDoorstepBookings);

  // Modal States
  const [isQuickPayOpen, setIsQuickPayOpen] = useState(false);
  const [quickPayLoan, setQuickPayLoan] = useState<LoanAccount | null>(null);
  const [quickPayType, setQuickPayType] = useState<'INTEREST_ONLY' | 'PART_PRINCIPAL' | 'TOP_UP'>('INTEREST_ONLY');
  const [quickPayCustomAmount, setQuickPayCustomAmount] = useState<number | undefined>(undefined);

  const [isDoorstepOpen, setIsDoorstepOpen] = useState(false);
  const [isApplyLoanOpen, setIsApplyLoanOpen] = useState(false);

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<PaymentTransaction | null>(null);

  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<MuthootBranch | null>(null);

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);

  // Sanction Letter Modal
  const [isSanctionLetterOpen, setIsSanctionLetterOpen] = useState(false);
  const [selectedSanctionLoan, setSelectedSanctionLoan] = useState<LoanAccount | null>(loans[0] || null);

  const activeLoansCount = loans.filter((l) => l.status !== 'CLOSED').length;

  // Handle Login
  const handleLoginSuccess = (loggedInUser: CustomerProfile) => {
    setCustomer(loggedInUser);
    if (loggedInUser.mobile.includes('9642629456')) {
      setLoans(ranjithLoans);
      setTransactions(ranjithTransactions);
      setSelectedSanctionLoan(ranjithLoans[0]);
    } else {
      setLoans(mockLoanAccounts);
      setTransactions(initialTransactions);
      setSelectedSanctionLoan(mockLoanAccounts[0] || null);
    }
    setIsLoggedIn(true);
  };

  // Handler: Open Quick Pay modal for a loan
  const handleOpenQuickPay = (
    loan?: LoanAccount, 
    type: 'INTEREST_ONLY' | 'PART_PRINCIPAL' | 'TOP_UP' = 'INTEREST_ONLY',
    customAmount?: number
  ) => {
    setQuickPayLoan(loan || loans.find((l) => l.status !== 'CLOSED') || loans[0]);
    setQuickPayType(type);
    setQuickPayCustomAmount(customAmount);
    setIsQuickPayOpen(true);
  };

  // Handler: Auto-Accrue Next Month Interest
  const handleAccrueNextMonth = (loanId: string) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.loanId === loanId) {
          return accrueNextMonth(l);
        }
        return l;
      })
    );
  };

  // Handler: Payment Complete
  const handlePaymentSuccess = (newTx: PaymentTransaction, updatedLoan: LoanAccount) => {
    setTransactions((prev) => [newTx, ...prev]);
    setLoans((prev) => prev.map((l) => (l.loanId === updatedLoan.loanId ? updatedLoan : l)));
    // Reward points for interest payment
    if (newTx.paymentType === 'INTEREST_ONLY') {
      const earnedPoints = Math.round(newTx.amount / 10);
      setCustomer((prev) => ({ ...prev, rewardPoints: prev.rewardPoints + earnedPoints }));
    }
  };

  // Handler: Doorstep Booking Complete
  const handleDoorstepBooking = (newBooking: DoorstepBooking) => {
    setDoorstepBookings((prev) => [newBooking, ...prev]);
  };

  // Handler: Apply Loan Success
  const handleApplyLoanSuccess = (newLoan: LoanAccount) => {
    setLoans((prev) => [newLoan, ...prev]);
  };

  // Handler: Select a branch to view details
  const handleSelectBranch = (branch: MuthootBranch) => {
    setSelectedBranch(branch);
    setIsBranchModalOpen(true);
  };

  // Handler: Select a transaction to view receipt
  const handleOpenReceipt = (tx: PaymentTransaction) => {
    setSelectedTx(tx);
    setIsReceiptOpen(true);
  };

  // Handler: Open Sanction Letter
  const handleOpenSanctionLetter = (loan: LoanAccount) => {
    setSelectedSanctionLoan(loan);
    setIsSanctionLetterOpen(true);
  };

  return (
    <AndroidShell
      activeTab={activeTab}
      onOpenAssistant={() => setIsAssistantOpen(true)}
      onOpenNotifications={() => setIsNotificationsOpen(true)}
      unreadNotificationsCount={2}
    >
      {/* If Not Logged In, Show Full-Screen Demo Login Page */}
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Brand Header */}
          <AppHeader
            currentLang={currentLang}
            onOpenLangModal={() => setIsLangModalOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenRewards={() => setIsRewardsOpen(true)}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onLogout={() => setIsLoggedIn(false)}
            unreadCount={2}
            customerName={customer.displayName || customer.name}
            customerMobile={customer.mobile}
            customerTier={customer.tier}
            rewardsPoints={customer.rewardPoints}
            registeredBranch={customer.registeredBranch}
          />

          {/* Main Tab Screens */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
            {activeTab === 'home' && (
              <HomeTab
                currentLang={currentLang}
                goldRates={goldRates}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                activeLoans={loans.filter((l) => l.status !== 'CLOSED')}
                onOpenQuickPay={handleOpenQuickPay}
                onOpenDoorstepModal={() => setIsDoorstepOpen(true)}
                onOpenApplyModal={() => setIsApplyLoanOpen(true)}
                onOpenCalculator={() => setActiveTab('calculator')}
                onOpenGoldRates={() => setActiveTab('goldRate')}
                onOpenBranches={() => setActiveTab('services')}
                onOpenCoins={() => setActiveTab('goldRate')}
                onOpenAssistant={() => setIsAssistantOpen(true)}
                onSelectLoan={(loan) => {
                  setActiveTab('loans');
                }}
              />
            )}

            {activeTab === 'loans' && (
              <MyLoansTab
                currentLang={currentLang}
                loans={loans}
                transactions={transactions}
                onOpenQuickPay={handleOpenQuickPay}
                onOpenReceipt={handleOpenReceipt}
                onOpenSanctionLetter={handleOpenSanctionLetter}
                onAutoAddMonth={handleAccrueNextMonth}
              />
            )}

            {activeTab === 'calculator' && (
              <CalculatorTab
                currentLang={currentLang}
                goldRates={goldRates}
                selectedCity={selectedCity}
                onOpenDoorstepModal={() => setIsDoorstepOpen(true)}
                onOpenApplyModal={() => setIsApplyLoanOpen(true)}
              />
            )}

            {activeTab === 'goldRate' && (
              <GoldRateTab
                currentLang={currentLang}
                goldRates={goldRates}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                onOpenQuickPay={() => handleOpenQuickPay()}
              />
            )}

            {activeTab === 'services' && (
              <ServicesTab
                currentLang={currentLang}
                doorstepBookings={doorstepBookings}
                onOpenDoorstepModal={() => setIsDoorstepOpen(true)}
                onOpenApplyModal={() => setIsApplyLoanOpen(true)}
                onOpenRewards={() => setIsRewardsOpen(true)}
                onOpenAssistant={() => setIsAssistantOpen(true)}
                onSelectBranch={handleSelectBranch}
              />
            )}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentLang={currentLang}
            activeLoansCount={activeLoansCount}
          />
        </>
      )}

      {/* Interactive Modals */}
      <QuickPayModal
        isOpen={isQuickPayOpen}
        onClose={() => {
          setIsQuickPayOpen(false);
          setQuickPayCustomAmount(undefined);
        }}
        loan={quickPayLoan}
        allLoans={loans}
        initialPaymentType={quickPayType}
        initialCustomAmount={quickPayCustomAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <DoorstepLoanModal
        isOpen={isDoorstepOpen}
        onClose={() => setIsDoorstepOpen(false)}
        onBookingComplete={handleDoorstepBooking}
      />

      <ApplyLoanModal
        isOpen={isApplyLoanOpen}
        onClose={() => setIsApplyLoanOpen(false)}
        onApplySuccess={handleApplyLoanSuccess}
      />

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        transaction={selectedTx}
        loan={loans.find((l) => l.loanId === selectedTx?.loanId)}
      />

      <BranchDetailModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        branch={selectedBranch}
      />

      <AiSaathiModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onOpenQuickPay={() => handleOpenQuickPay()}
        onOpenDoorstepModal={() => setIsDoorstepOpen(true)}
        onOpenCalculator={() => setActiveTab('calculator')}
      />

      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenQuickPay={() => handleOpenQuickPay()}
        onOpenCoins={() => setActiveTab('goldRate')}
      />

      <RewardsModal
        isOpen={isRewardsOpen}
        onClose={() => setIsRewardsOpen(false)}
        points={customer.rewardPoints}
      />

      <SanctionLetterModal
        isOpen={isSanctionLetterOpen}
        onClose={() => setIsSanctionLetterOpen(false)}
        sanctionData={selectedSanctionLoan?.sanctionLetter}
      />
    </AndroidShell>
  );
}
