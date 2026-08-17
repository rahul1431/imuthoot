import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Coins, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Lock 
} from 'lucide-react';
import { LoanAccount } from '../../types';

interface ApplyLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySuccess: (newLoan: LoanAccount) => void;
}

export const ApplyLoanModal: React.FC<ApplyLoanModalProps> = ({
  isOpen,
  onClose,
  onApplySuccess,
}) => {
  if (!isOpen) return null;

  const [ornamentType, setOrnamentType] = useState('22K Gold Bangles & Chains');
  const [estimatedGrams, setEstimatedGrams] = useState(30);
  const [branchPreference, setBranchPreference] = useState('Delhi - Connaught Place (Br: 0102)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculatedSanction = Math.round(estimatedGrams * 6920 * 0.75);

  const handleSubmit = () => {
    const newAccNum = `0102-GL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newLoan: LoanAccount = {
      loanId: `MF-GL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      accountNumber: newAccNum,
      schemeName: 'Muthoot Super Value Gold Loan (MSV)',
      sanctionDate: 'Today, 17 Aug 2026',
      dueDate: '17 Aug 2027',
      sanctionedAmount: calculatedSanction,
      principalOutstanding: calculatedSanction,
      interestDue: Math.round(calculatedSanction * 0.099 / 12),
      penalInterest: 0,
      interestRatePct: 9.9,
      tenureMonths: 12,
      status: 'ACTIVE',
      branchName: branchPreference,
      branchCity: 'Delhi NCR',
      lockerSafeNumber: `SAFE-LOCKER #${Math.floor(100 + Math.random() * 900)}`,
      totalWeightGrams: estimatedGrams,
      totalAppraisedValue: Math.round(estimatedGrams * 6920),
      maxTopUpEligible: 25000,
      goldItems: [
        {
          id: `ITM-${Date.now()}`,
          title: ornamentType,
          netWeightGrams: estimatedGrams,
          grossWeightGrams: estimatedGrams + 1.2,
          karat: '22K',
          purityPct: 91.6,
          itemCount: 2,
          appraisedValue: Math.round(estimatedGrams * 6920),
        },
      ],
    };

    setIsSubmitted(true);
    onApplySuccess(newLoan);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-extrabold font-['Outfit']">
              Apply for Gold Loan
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  In-Principle Sanction Approved!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Pre-sanctioned credit of <strong>₹{calculatedSanction.toLocaleString('en-IN')}</strong> generated.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-left text-xs space-y-1.5 border border-slate-200">
                <div>• Customer: <strong>Rahul Rathod (KYC Verified)</strong></div>
                <div>• Pledged Weight: <strong>{estimatedGrams}g 22K Gold</strong></div>
                <div>• Selected Branch: <strong>{branchPreference}</strong></div>
                <div>• Interest Rate: <strong>9.9% p.a. (Muthoot Super Value)</strong></div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-[#b91c1c] text-white rounded-xl font-bold text-xs shadow-md"
              >
                View in My Loans Tab
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Gold Ornaments to Pledge
                </label>
                <input
                  type="text"
                  value={ornamentType}
                  onChange={(e) => setOrnamentType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800">
                    Net Weight (Grams)
                  </label>
                  <span className="text-xs font-bold text-[#b91c1c]">{estimatedGrams}g</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={estimatedGrams}
                  onChange={(e) => setEstimatedGrams(Number(e.target.value))}
                  className="w-full accent-[#b91c1c]"
                />
              </div>

              {/* Instant pre-sanction quote */}
              <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-center">
                <span className="text-[10px] text-amber-800 font-bold uppercase block">
                  Eligible Instant Sanction (75% LTV)
                </span>
                <div className="text-2xl font-black text-amber-950 font-['Outfit'] mt-0.5">
                  ₹{calculatedSanction.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-amber-800 mt-1">
                  Monthly interest: approx. ₹{Math.round(calculatedSanction * 0.099 / 12)}/mo
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Preferred Muthoot Branch
                </label>
                <select
                  value={branchPreference}
                  onChange={(e) => setBranchPreference(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option>Delhi - Connaught Place (Br: 0102)</option>
                  <option>Delhi - Karol Bagh Gold Hub (Br: 0188)</option>
                  <option>Bengaluru - Indiranagar 100ft Rd (Br: 0245)</option>
                  <option>Mumbai - Fort Heritage Branch (Br: 0310)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  id="btn-submit-apply-loan"
                  onClick={handleSubmit}
                  className="w-full py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Get Instant In-Principle Approval</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
