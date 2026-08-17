import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Download, 
  Lock, 
  Coins, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Receipt, 
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';
import { LoanAccount, PaymentTransaction, SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { MonthlyInterestLedger } from './MonthlyInterestLedger';

interface MyLoansTabProps {
  currentLang: SupportedLanguage;
  loans: LoanAccount[];
  transactions: PaymentTransaction[];
  onOpenQuickPay: (loan: LoanAccount, paymentType?: 'INTEREST_ONLY' | 'PART_PRINCIPAL' | 'TOP_UP', customPayAmount?: number) => void;
  onOpenReceipt: (tx: PaymentTransaction) => void;
  onOpenSanctionLetter?: (loan: LoanAccount) => void;
  onAutoAddMonth?: (loanId: string) => void;
}

export const MyLoansTab: React.FC<MyLoansTabProps> = ({
  currentLang,
  loans,
  transactions,
  onOpenQuickPay,
  onOpenReceipt,
  onOpenSanctionLetter,
  onAutoAddMonth,
}) => {
  const t = translations[currentLang];
  const [filterTab, setFilterTab] = useState<'ACTIVE' | 'CLOSED' | 'TRANSACTIONS'>('ACTIVE');
  const [expandedLoanId, setExpandedLoanId] = useState<string | null>(loans[0]?.loanId || null);

  const activeLoans = loans.filter((l) => l.status !== 'CLOSED');
  const closedLoans = loans.filter((l) => l.status === 'CLOSED');

  const toggleExpand = (loanId: string) => {
    setExpandedLoanId(expandedLoanId === loanId ? null : loanId);
  };

  const handleDownloadStatement = (accountNum: string) => {
    alert(`Downloading official Muthoot Finance Loan Statement for Account ${accountNum}...`);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-6 space-y-3 px-3.5 pt-3 scroll-smooth">
      {/* Top Segmented Control */}
      <div className="bg-slate-200/80 p-1 rounded-xl flex items-center shadow-inner">
        <button
          id="tab-filter-active"
          onClick={() => setFilterTab('ACTIVE')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            filterTab === 'ACTIVE'
              ? 'bg-white text-[#b91c1c] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Loans ({activeLoans.length})
        </button>

        <button
          id="tab-filter-closed"
          onClick={() => setFilterTab('CLOSED')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            filterTab === 'CLOSED'
              ? 'bg-white text-[#b91c1c] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Closed ({closedLoans.length})
        </button>

        <button
          id="tab-filter-txns"
          onClick={() => setFilterTab('TRANSACTIONS')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            filterTab === 'TRANSACTIONS'
              ? 'bg-white text-[#b91c1c] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Receipts ({transactions.length})
        </button>
      </div>

      {/* ACTIVE LOANS LIST */}
      {filterTab === 'ACTIVE' && (
        <div className="space-y-3">
          {activeLoans.map((loan) => {
            const isExpanded = expandedLoanId === loan.loanId;

            return (
              <div
                key={loan.loanId}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
              >
                {/* Card Header */}
                <div className="p-3.5 bg-gradient-to-r from-slate-900 to-red-950 text-white flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-amber-300 font-mono">
                        {loan.accountNumber}
                      </span>
                      {loan.status === 'DUE_SOON' && (
                        <span className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-extrabold rounded-full animate-pulse">
                          DUE SOON
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">
                      {loan.schemeName}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Due Date</div>
                    <div className="text-xs font-bold text-amber-200">
                      {loan.dueDate}
                    </div>
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="p-3.5 space-y-3">
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-500 font-medium block">
                        Principal Balance
                      </span>
                      <span className="text-lg font-extrabold text-slate-900 font-['Outfit']">
                        ₹{loan.principalOutstanding.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Interest: {loan.interestRatePct}% p.a.
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-red-600 font-bold block">
                        Monthly Interest Due
                      </span>
                      <span className="text-lg font-extrabold text-red-700 font-['Outfit']">
                        ₹{loan.interestDue.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Sanctioned: ₹{loan.sanctionedAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Locker & Branch Info Bar */}
                  <div className="flex items-center justify-between text-[11px] bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/60 text-amber-950">
                    <div className="flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-800" />
                      <span className="font-semibold">{loan.lockerSafeNumber}</span>
                    </div>
                    <span className="text-[10px] text-amber-800 font-medium">
                      100% Insured
                    </span>
                  </div>

                  {/* Monthly Interest Accrual & 3-Months Due Ledger */}
                  <MonthlyInterestLedger
                    loan={loan}
                    onPayMonth={(amount) => {
                      onOpenQuickPay(loan, 'INTEREST_ONLY', amount);
                    }}
                    onAutoAddMonth={onAutoAddMonth}
                  />

                  {/* Expandable Gold Inventory Section */}
                  <div>
                    <button
                      onClick={() => toggleExpand(loan.loanId)}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Coins className="w-4 h-4 text-amber-600" />
                        <span>Pledged Gold Ornaments ({loan.goldItems.length} items • {loan.totalWeightGrams}g)</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 space-y-2 pl-2 border-l-2 border-amber-300">
                        {loan.goldItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                          >
                            <div>
                              <div className="font-bold text-slate-800">{item.title}</div>
                              <div className="text-[10px] text-slate-500">
                                Purity: {item.karat} ({item.purityPct}%) • Qty: {item.itemCount}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-amber-900">{item.netWeightGrams}g Net</div>
                              <div className="text-[10px] text-slate-500">
                                Val: ₹{item.appraisedValue.toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="text-[10.5px] text-slate-500 flex items-center justify-between px-1">
                          <span>Total Appraised Valuation:</span>
                          <span className="font-bold text-slate-900">
                            ₹{loan.totalAppraisedValue.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sanction Letter & Rebate Banner */}
                  {loan.sanctionLetter && (
                    <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="font-bold text-amber-950 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          Early Rebate: 11.1% (Effective 12.9% p.a.)
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                          REBATE ACTIVE
                        </span>
                      </div>
                      <button
                        id={`btn-view-sanction-${loan.loanId}`}
                        onClick={() => onOpenSanctionLetter && onOpenSanctionLetter(loan)}
                        className="w-full py-1.5 px-2.5 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg text-amber-950 text-xs font-bold flex items-center justify-between transition-colors shadow-2xs"
                      >
                        <div className="flex items-center space-x-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#b91c1c]" />
                          <span>View Official Sanction Letter (Customer Copy)</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#b91c1c]" />
                      </button>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      id={`btn-pay-interest-${loan.loanId}`}
                      onClick={() => onOpenQuickPay(loan, 'INTEREST_ONLY')}
                      className="bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2 px-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Interest (₹{loan.interestDue})</span>
                    </button>

                    <button
                      id={`btn-topup-${loan.loanId}`}
                      onClick={() => onOpenQuickPay(loan, 'TOP_UP')}
                      className="bg-amber-500 hover:bg-amber-400 text-red-950 py-2 px-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
                    >
                      <Zap className="w-3.5 h-3.5 fill-red-950" />
                      <span>Top-Up (+₹{loan.maxTopUpEligible.toLocaleString('en-IN')})</span>
                    </button>
                  </div>

                  {/* Secondary Utilities */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                    <button
                      onClick={() => onOpenQuickPay(loan, 'PART_PRINCIPAL')}
                      className="hover:text-[#b91c1c] font-semibold flex items-center space-x-1"
                    >
                      <span>Part Principal Payment</span>
                    </button>
                    <button
                      onClick={() => handleDownloadStatement(loan.accountNumber)}
                      className="hover:text-[#b91c1c] font-semibold flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Statement</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CLOSED LOANS LIST */}
      {filterTab === 'CLOSED' && (
        <div className="space-y-3">
          {closedLoans.map((loan) => (
            <div
              key={loan.loanId}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm space-y-2.5 opacity-90"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 font-mono">
                    {loan.accountNumber}
                  </div>
                  <div className="text-[11px] text-slate-500">{loan.schemeName}</div>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full border border-slate-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  CLOSED & RELEASED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Sanction Amount</span>
                  <span className="font-bold text-slate-800">
                    ₹{loan.sanctionedAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Gold Released</span>
                  <span className="font-bold text-slate-800">{loan.totalWeightGrams}g</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Downloading No Objection Certificate (NOC) & Gold Return Memo for ${loan.accountNumber}...`)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Gold Release Memo & NOC</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TRANSACTIONS & RECEIPTS */}
      {filterTab === 'TRANSACTIONS' && (
        <div className="space-y-2.5">
          <div className="text-xs text-slate-500 px-1 font-medium">
            Official Tax Invoices & Payment Receipts (Instant PDF)
          </div>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => onOpenReceipt(tx)}
              className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs hover:border-[#b91c1c]/50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {tx.paymentType === 'INTEREST_ONLY' ? 'Monthly Interest Paid' : tx.paymentType} • {tx.paymentMode}
                  </div>
                  <div className="text-[9.5px] text-slate-400 font-mono">
                    {tx.timestamp}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                  PAID
                </span>
                <div className="text-[10px] text-[#b91c1c] font-semibold mt-1 flex items-center justify-end">
                  <span>View Receipt</span>
                  <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
