import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  CreditCard, 
  Sparkles, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  Zap,
  TrendingDown
} from 'lucide-react';
import { LoanAccount, MonthlyInterestRecord } from '../types';

interface MonthlyInterestLedgerProps {
  loan: LoanAccount;
  onPayMonth: (amount: number, monthCount: number) => void;
  onAutoAddMonth?: (loanId: string) => void;
}

export const MonthlyInterestLedger: React.FC<MonthlyInterestLedgerProps> = ({
  loan,
  onPayMonth,
  onAutoAddMonth,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const schedule: MonthlyInterestRecord[] = loan.monthlyInterestSchedule && loan.monthlyInterestSchedule.length > 0
    ? loan.monthlyInterestSchedule
    : [
        {
          id: `${loan.loanId}-M1`,
          monthLabel: 'June 2026',
          cycleNumber: 1,
          dueDate: '21 Jun 2026',
          principalBase: loan.principalOutstanding,
          ratePct: 12.9,
          standardRatePct: 24.0,
          accruedInterest: loan.monthlyInterestAmount || 4300,
          penalInterest: 0,
          totalMonthlyDue: loan.monthlyInterestAmount || 4300,
          status: 'OVERDUE',
          rebateAvailed: true,
          rebateSavings: 1794,
        },
        {
          id: `${loan.loanId}-M2`,
          monthLabel: 'July 2026',
          cycleNumber: 2,
          dueDate: '21 Jul 2026',
          principalBase: loan.principalOutstanding,
          ratePct: 12.9,
          standardRatePct: 24.0,
          accruedInterest: loan.monthlyInterestAmount || 4300,
          penalInterest: 0,
          totalMonthlyDue: loan.monthlyInterestAmount || 4300,
          status: 'OVERDUE',
          rebateAvailed: true,
          rebateSavings: 1794,
        },
        {
          id: `${loan.loanId}-M3`,
          monthLabel: 'August 2026',
          cycleNumber: 3,
          dueDate: '21 Aug 2026',
          principalBase: loan.principalOutstanding,
          ratePct: 12.9,
          standardRatePct: 24.0,
          accruedInterest: loan.monthlyInterestAmount || 4300,
          penalInterest: 0,
          totalMonthlyDue: loan.monthlyInterestAmount || 4300,
          status: 'DUE_NOW',
          rebateAvailed: true,
          rebateSavings: 1794,
        },
      ];

  const unpaidItems = schedule.filter((item) => item.status !== 'PAID');
  const monthlyRate = loan.monthlyInterestAmount || (unpaidItems[0]?.totalMonthlyDue || 4300);
  const totalDueAmount = unpaidItems.reduce((acc, curr) => acc + curr.totalMonthlyDue, 0);

  return (
    <div className="bg-gradient-to-br from-red-50/80 via-white to-amber-50/60 rounded-2xl border border-red-200/80 p-3.5 shadow-2xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-[#b91c1c] text-white flex items-center justify-center shadow-xs">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs font-extrabold text-slate-900 font-['Outfit']">
                Monthly Interest & Payment Due
              </h4>
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-extrabold rounded-full">
                {unpaidItems.length} Months Due
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              Auto-compounding monthly rest • Effective 12.9% p.a.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
          title="Toggle Breakdown"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Summary Highlight Box */}
      <div className="bg-white rounded-xl p-2.5 border border-red-100/80 flex items-center justify-between shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 block">
            Accumulated 3-Months Interest
          </span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-xl font-black text-[#b91c1c] font-['Outfit']">
              ₹{totalDueAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              (₹{monthlyRate.toLocaleString('en-IN')} / mo)
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end space-x-1 text-emerald-600 text-[10px] font-bold">
            <TrendingDown className="w-3 h-3" />
            <span>Rebate: Saved ₹{(unpaidItems.length * 1794).toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[9.5px] text-slate-400">
            Next Cycle: 21 Sep 2026
          </span>
        </div>
      </div>

      {/* Breakdown List */}
      {isExpanded && (
        <div className="space-y-2 pt-1">
          <div className="text-[10.5px] font-bold text-slate-700 flex items-center justify-between px-0.5">
            <span>Last 3 Months Billing Schedule</span>
            <span className="text-[9.5px] text-slate-400 font-normal">Monthly Rest Calculation</span>
          </div>

          <div className="space-y-1.5">
            {schedule.map((item, idx) => {
              const isPaid = item.status === 'PAID';
              const isOverdue = item.status === 'OVERDUE';

              return (
                <div
                  key={item.id}
                  className={`p-2 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    isPaid
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-600 opacity-75'
                      : isOverdue
                      ? 'bg-red-50/70 border-red-200/90 text-slate-900 shadow-2xs'
                      : 'bg-white border-amber-200 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isPaid
                          ? 'bg-emerald-200 text-emerald-800'
                          : isOverdue
                          ? 'bg-red-200 text-red-800'
                          : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      M{item.cycleNumber || idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-[11.5px]">{item.monthLabel}</span>
                        {isOverdue && (
                          <span className="px-1 py-0.2 bg-red-600 text-white text-[8.5px] font-extrabold rounded">
                            OVERDUE
                          </span>
                        )}
                        {item.status === 'DUE_NOW' && (
                          <span className="px-1 py-0.2 bg-amber-500 text-slate-950 text-[8.5px] font-extrabold rounded">
                            CURRENT DUE
                          </span>
                        )}
                        {isPaid && (
                          <span className="px-1 py-0.2 bg-emerald-600 text-white text-[8.5px] font-extrabold rounded">
                            PAID
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                        <span>Due: {item.dueDate}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">12.9% p.a. (11.1% Rebate)</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-slate-900 text-xs font-['Outfit']">
                      ₹{item.totalMonthlyDue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[9px] text-emerald-600">
                      Save ₹{item.rebateSavings}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Pay Options (1 Month, 2 Months, 3 Months) */}
          <div className="pt-2 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wide px-0.5">
              Select Payment Option
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {/* 1 Month */}
              <button
                onClick={() => onPayMonth(monthlyRate, 1)}
                className="py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-center transition-all active:scale-95 shadow-2xs"
              >
                <div className="text-[9.5px] font-semibold text-slate-500">1 Month</div>
                <div className="text-xs font-extrabold text-[#b91c1c]">
                  ₹{monthlyRate.toLocaleString('en-IN')}
                </div>
              </button>

              {/* 2 Months */}
              <button
                onClick={() => onPayMonth(monthlyRate * 2, 2)}
                className="py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-center transition-all active:scale-95 shadow-2xs"
              >
                <div className="text-[9.5px] font-semibold text-slate-500">2 Months</div>
                <div className="text-xs font-extrabold text-[#b91c1c]">
                  ₹{(monthlyRate * 2).toLocaleString('en-IN')}
                </div>
              </button>

              {/* All 3 Months */}
              <button
                onClick={() => onPayMonth(totalDueAmount, unpaidItems.length)}
                className="py-1.5 px-2 bg-gradient-to-r from-[#b91c1c] to-red-800 text-white rounded-xl text-center transition-all active:scale-95 shadow-xs border border-red-700"
              >
                <div className="text-[9.5px] font-semibold text-amber-200">All 3 Months</div>
                <div className="text-xs font-extrabold text-white">
                  ₹{totalDueAmount.toLocaleString('en-IN')}
                </div>
              </button>
            </div>
          </div>

          {/* Auto-Add Interest Simulation Button */}
          {onAutoAddMonth && (
            <div className="pt-1.5">
              <button
                id={`btn-auto-accrue-${loan.loanId}`}
                onClick={() => onAutoAddMonth(loan.loanId)}
                className="w-full py-1.5 px-2.5 bg-amber-100/90 hover:bg-amber-200/90 border border-amber-300 rounded-xl text-amber-950 text-[11px] font-bold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-800" />
                <span>Auto-Accrue Next Month Interest (+₹{monthlyRate.toLocaleString('en-IN')})</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
