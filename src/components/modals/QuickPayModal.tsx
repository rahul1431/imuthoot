import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Receipt, 
  Sparkles,
  Zap,
  Smartphone,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoanAccount, PaymentTransaction } from '../../types';

interface QuickPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: LoanAccount | null;
  allLoans: LoanAccount[];
  initialPaymentType?: 'INTEREST_ONLY' | 'PART_PRINCIPAL' | 'TOP_UP';
  initialCustomAmount?: number;
  onPaymentSuccess: (transaction: PaymentTransaction, updatedLoan: LoanAccount) => void;
}

export const QuickPayModal: React.FC<QuickPayModalProps> = ({
  isOpen,
  onClose,
  loan,
  allLoans,
  initialPaymentType = 'INTEREST_ONLY',
  initialCustomAmount,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  const [selectedLoanId, setSelectedLoanId] = useState<string>(loan?.loanId || allLoans[0]?.loanId || '');
  const [paymentType, setPaymentType] = useState<'INTEREST_ONLY' | 'PART_PRINCIPAL' | 'TOP_UP'>(initialPaymentType);
  const [interestMonthSelection, setInterestMonthSelection] = useState<number>(3); // 1, 2, or 3 months
  const [customAmount, setCustomAmount] = useState<number>(initialCustomAmount || 5000);
  const [paymentMode, setPaymentMode] = useState<'UPI_GPAY' | 'UPI_PHONEPE' | 'UPI_PAYTM' | 'NET_BANKING' | 'DEBIT_CARD'>('UPI_GPAY');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);

  const targetLoan = allLoans.find((l) => l.loanId === selectedLoanId) || loan || allLoans[0];
  const monthlyRate = targetLoan.monthlyInterestAmount || (targetLoan.interestDue > 0 ? Math.round(targetLoan.interestDue / Math.max(1, targetLoan.unpaidMonthsCount || 3)) : 4300);
  const total3Months = targetLoan.total3MonthsDue || targetLoan.interestDue || (monthlyRate * 3);

  // Determine payable amount
  let payableAmount = 0;
  if (paymentType === 'INTEREST_ONLY') {
    if (initialCustomAmount && initialCustomAmount > 0) {
      payableAmount = initialCustomAmount;
    } else if (interestMonthSelection === 1) {
      payableAmount = monthlyRate;
    } else if (interestMonthSelection === 2) {
      payableAmount = monthlyRate * 2;
    } else {
      payableAmount = Math.min(total3Months, monthlyRate * 3);
    }
  } else if (paymentType === 'TOP_UP') {
    payableAmount = targetLoan.maxTopUpEligible;
  } else {
    payableAmount = customAmount;
  }

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const isTopUp = paymentType === 'TOP_UP';
      const randomUtr = `UTR${Math.floor(10000000000 + Math.random() * 90000000000)}`;
      const randomRcpt = `RCPT-${targetLoan.branchCity.slice(0, 3).toUpperCase()}-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      const newTx: PaymentTransaction = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        transactionRef: `MUTHOOT-PG-${Math.floor(1000000 + Math.random() * 9000000)}`,
        loanId: targetLoan.loanId,
        amount: payableAmount,
        paymentType: paymentType,
        paymentMode: paymentMode,
        timestamp: 'Today, Just Now',
        status: 'SUCCESS',
        utrNumber: randomUtr,
        receiptNumber: randomRcpt,
      };

      // Updated loan object with monthly schedule adjustment
      let updatedLoan = { ...targetLoan };
      if (paymentType === 'INTEREST_ONLY') {
        const monthsPaidCount = payableAmount >= total3Months ? 3 : Math.max(1, Math.round(payableAmount / monthlyRate));
        const newInterestDue = Math.max(0, targetLoan.interestDue - payableAmount);
        
        let updatedSchedule = targetLoan.monthlyInterestSchedule ? [...targetLoan.monthlyInterestSchedule] : [];
        let countToMark = monthsPaidCount;
        updatedSchedule = updatedSchedule.map((rec) => {
          if (rec.status !== 'PAID' && countToMark > 0) {
            countToMark--;
            return { ...rec, status: 'PAID' as const, paidOn: 'Today' };
          }
          return rec;
        });

        updatedLoan.interestDue = newInterestDue;
        updatedLoan.total3MonthsDue = newInterestDue;
        updatedLoan.unpaidMonthsCount = Math.max(0, (targetLoan.unpaidMonthsCount || 3) - monthsPaidCount);
        updatedLoan.monthlyInterestSchedule = updatedSchedule;
        updatedLoan.status = newInterestDue === 0 ? 'ACTIVE' : 'DUE_SOON';
        updatedLoan.lastPaymentDate = 'Today';
        updatedLoan.lastPaymentAmount = payableAmount;
      } else if (paymentType === 'PART_PRINCIPAL') {
        updatedLoan.principalOutstanding = Math.max(0, targetLoan.principalOutstanding - payableAmount);
        updatedLoan.lastPaymentDate = 'Today';
        updatedLoan.lastPaymentAmount = payableAmount;
      } else if (paymentType === 'TOP_UP') {
        updatedLoan.principalOutstanding += payableAmount;
        updatedLoan.sanctionedAmount += payableAmount;
        updatedLoan.maxTopUpEligible = 0;
      }

      setCompletedTx(newTx);
      onPaymentSuccess(newTx, updatedLoan);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c4122f', '#f59e0b', '#10b981', '#ffffff'],
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1800);
  };

  const handleClose = () => {
    setCompletedTx(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <CreditCard className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold font-['Outfit']">
                {completedTx ? 'Payment Receipt' : 'Muthoot Quick Pay & Top-Up'}
              </h3>
              <p className="text-[10.5px] text-red-200">Instant RBI-approved payment gateway</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 space-y-4">
          {completedTx ? (
            /* SUCCESS SCREEN */
            <div className="text-center py-2 space-y-3.5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  {completedTx.paymentType === 'TOP_UP' ? 'Top-Up Disbursed Successfully!' : 'Payment Successful!'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Transaction Reference: <strong className="font-mono text-slate-800">{completedTx.transactionRef}</strong>
                </p>
              </div>

              {/* Amount Highlight */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                <div className="text-2xl font-extrabold text-[#b91c1c] font-['Outfit']">
                  ₹{completedTx.amount.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Account: <strong>{targetLoan.accountNumber}</strong>
                </div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">
                  UTR: {completedTx.utrNumber} • Receipt: {completedTx.receiptNumber}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs flex items-center space-x-2 text-left border border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Official Muthoot Finance receipt generated. SMS & WhatsApp confirmation sent.
                </span>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Close & Return
              </button>
            </div>
          ) : isProcessing ? (
            /* PROCESSING SCREEN */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-red-200 border-t-[#b91c1c] animate-spin mx-auto"></div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Connecting to Secure Bank Gateway...
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Authorizing transaction of ₹{payableAmount.toLocaleString('en-IN')} for {targetLoan.accountNumber}
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1.5 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Banking Channel</span>
              </div>
            </div>
          ) : (
            /* PAYMENT FORM */
            <>
              {/* Select Loan Account */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Select Loan Account
                </label>
                <select
                  value={selectedLoanId}
                  onChange={(e) => setSelectedLoanId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {allLoans.filter((l) => l.status !== 'CLOSED').map((l) => (
                    <option key={l.loanId} value={l.loanId}>
                      {l.accountNumber} — Outstanding: ₹{l.principalOutstanding.toLocaleString('en-IN')} (Int Due: ₹{l.interestDue})
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Type */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Payment Option
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentType('INTEREST_ONLY')}
                    className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                      paymentType === 'INTEREST_ONLY'
                        ? 'bg-red-50 text-[#b91c1c] border-[#b91c1c] ring-1 ring-[#b91c1c]'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>Interest Due</div>
                    <div className="text-[10px] text-red-600 font-extrabold mt-0.5">
                      ₹{targetLoan.interestDue}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('PART_PRINCIPAL')}
                    className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                      paymentType === 'PART_PRINCIPAL'
                        ? 'bg-red-50 text-[#b91c1c] border-[#b91c1c] ring-1 ring-[#b91c1c]'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>Part Principal</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Custom ₹
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('TOP_UP')}
                    className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                      paymentType === 'TOP_UP'
                        ? 'bg-amber-50 text-amber-900 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>Instant Top-Up</div>
                    <div className="text-[10px] text-amber-700 font-extrabold mt-0.5">
                      +₹{targetLoan.maxTopUpEligible.toLocaleString('en-IN')}
                    </div>
                  </button>
                </div>
              </div>

              {/* Multi-Month Interest Selection when Interest Only */}
              {paymentType === 'INTEREST_ONLY' && (
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">
                      Choose Interest Duration
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Save ₹1,794/mo (11.1% Early Rebate)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setInterestMonthSelection(1)}
                      className={`p-1.5 rounded-lg text-center border transition-all ${
                        interestMonthSelection === 1
                          ? 'bg-white border-[#b91c1c] shadow-2xs text-[#b91c1c] font-black ring-1 ring-[#b91c1c]'
                          : 'bg-slate-100 border-slate-200 text-slate-600 font-semibold'
                      }`}
                    >
                      <div className="text-[9.5px]">1 Month</div>
                      <div className="text-xs font-extrabold">₹{monthlyRate.toLocaleString('en-IN')}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInterestMonthSelection(2)}
                      className={`p-1.5 rounded-lg text-center border transition-all ${
                        interestMonthSelection === 2
                          ? 'bg-white border-[#b91c1c] shadow-2xs text-[#b91c1c] font-black ring-1 ring-[#b91c1c]'
                          : 'bg-slate-100 border-slate-200 text-slate-600 font-semibold'
                      }`}
                    >
                      <div className="text-[9.5px]">2 Months</div>
                      <div className="text-xs font-extrabold">₹{(monthlyRate * 2).toLocaleString('en-IN')}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInterestMonthSelection(3)}
                      className={`p-1.5 rounded-lg text-center border transition-all ${
                        interestMonthSelection === 3
                          ? 'bg-[#b91c1c] border-[#b91c1c] text-white font-black shadow-xs'
                          : 'bg-slate-100 border-slate-200 text-slate-600 font-semibold'
                      }`}
                    >
                      <div className="text-[9.5px] text-amber-200">All 3 Months</div>
                      <div className="text-xs font-extrabold">₹{Math.min(total3Months, monthlyRate * 3).toLocaleString('en-IN')}</div>
                    </button>
                  </div>

                  <div className="text-[10px] text-slate-500 bg-white p-1.5 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span>Selected: {interestMonthSelection} billing cycle(s)</span>
                    <span className="font-bold text-red-700">₹{payableAmount.toLocaleString('en-IN')} Payable</span>
                  </div>
                </div>
              )}

              {/* Custom Amount input if part principal */}
              {paymentType === 'PART_PRINCIPAL' && (
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Enter Repayment Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Number(e.target.value) || 0)}
                    min="500"
                    max={targetLoan.principalOutstanding}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">
                    Maximum payable: ₹{targetLoan.principalOutstanding.toLocaleString('en-IN')}
                  </div>
                </div>
              )}

              {/* Payment Mode Selector */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  Payment Mode
                </label>
                <div className="space-y-1.5">
                  <label
                    onClick={() => setPaymentMode('UPI_GPAY')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${
                      paymentMode === 'UPI_GPAY'
                        ? 'bg-red-50/60 border-[#b91c1c]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-slate-700" />
                      <span className="text-xs font-bold text-slate-800">Google Pay (UPI)</span>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMode === 'UPI_GPAY'}
                      onChange={() => setPaymentMode('UPI_GPAY')}
                      className="accent-[#b91c1c]"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMode('UPI_PHONEPE')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${
                      paymentMode === 'UPI_PHONEPE'
                        ? 'bg-red-50/60 border-[#b91c1c]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-purple-700" />
                      <span className="text-xs font-bold text-slate-800">PhonePe / Paytm UPI</span>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMode === 'UPI_PHONEPE'}
                      onChange={() => setPaymentMode('UPI_PHONEPE')}
                      className="accent-[#b91c1c]"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMode('NET_BANKING')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${
                      paymentMode === 'NET_BANKING'
                        ? 'bg-red-50/60 border-[#b91c1c]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-700" />
                      <span className="text-xs font-bold text-slate-800">Net Banking (SBI / HDFC / ICICI / Axis)</span>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMode === 'NET_BANKING'}
                      onChange={() => setPaymentMode('NET_BANKING')}
                      className="accent-[#b91c1c]"
                    />
                  </label>
                </div>
              </div>

              {/* Summary Bar & CTA */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Total Transaction</span>
                    <span className="text-xl font-extrabold text-[#b91c1c] font-['Outfit']">
                      ₹{payableAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      Zero Convenience Fee
                    </span>
                    <span className="text-[10px] text-slate-400">Instant PDF Receipt</span>
                  </div>
                </div>

                <button
                  id="btn-confirm-pay"
                  onClick={handlePayNow}
                  className="w-full py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl font-extrabold text-sm shadow-lg shadow-red-900/30 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentType === 'TOP_UP'
                      ? `Disburse ₹${payableAmount.toLocaleString('en-IN')} Now`
                      : `Pay ₹${payableAmount.toLocaleString('en-IN')} Securely`}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
