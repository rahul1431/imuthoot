import { LoanAccount, MonthlyInterestRecord } from '../types';

/**
 * Calculates accurate monthly interest with early rebate deduction.
 * Standard formula: (Principal * Rate / 100) / 12
 */
export function calculateMonthlyInterest(
  principal: number,
  effectiveRatePct: number = 12.9
): number {
  return Math.round((principal * (effectiveRatePct / 100)) / 12);
}

/**
 * Generates 3-month overdue / due interest records for a loan
 */
export function generate3MonthsSchedule(loan: LoanAccount): MonthlyInterestRecord[] {
  const baseMonthly = loan.monthlyInterestAmount || 4300;
  
  return [
    {
      id: `${loan.loanId}-M1`,
      monthLabel: 'June 2026',
      cycleNumber: 1,
      dueDate: '21 Jun 2026',
      principalBase: loan.principalOutstanding,
      ratePct: 12.9,
      standardRatePct: 24.0,
      accruedInterest: baseMonthly,
      penalInterest: 0,
      totalMonthlyDue: baseMonthly,
      status: 'OVERDUE',
      rebateAvailed: true,
      rebateSavings: Math.round(loan.principalOutstanding * (11.1 / 100) / 12),
    },
    {
      id: `${loan.loanId}-M2`,
      monthLabel: 'July 2026',
      cycleNumber: 2,
      dueDate: '21 Jul 2026',
      principalBase: loan.principalOutstanding,
      ratePct: 12.9,
      standardRatePct: 24.0,
      accruedInterest: baseMonthly,
      penalInterest: 0,
      totalMonthlyDue: baseMonthly,
      status: 'OVERDUE',
      rebateAvailed: true,
      rebateSavings: Math.round(loan.principalOutstanding * (11.1 / 100) / 12),
    },
    {
      id: `${loan.loanId}-M3`,
      monthLabel: 'August 2026',
      cycleNumber: 3,
      dueDate: '21 Aug 2026',
      principalBase: loan.principalOutstanding,
      ratePct: 12.9,
      standardRatePct: 24.0,
      accruedInterest: baseMonthly,
      penalInterest: 0,
      totalMonthlyDue: baseMonthly,
      status: 'DUE_NOW',
      rebateAvailed: true,
      rebateSavings: Math.round(loan.principalOutstanding * (11.1 / 100) / 12),
    },
  ];
}

/**
 * Auto-accrues the next month interest into the loan account ledger
 */
export function accrueNextMonth(loan: LoanAccount): LoanAccount {
  const currentSchedule = loan.monthlyInterestSchedule && loan.monthlyInterestSchedule.length > 0
    ? [...loan.monthlyInterestSchedule]
    : generate3MonthsSchedule(loan);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const nextCycleIndex = currentSchedule.length + 1;
  const nextMonthIdx = (7 + currentSchedule.length) % 12; // Start from Aug
  const nextMonthName = `${monthNames[nextMonthIdx]} 2026`;
  const baseMonthly = loan.monthlyInterestAmount || 4300;

  const newRecord: MonthlyInterestRecord = {
    id: `${loan.loanId}-M${nextCycleIndex}-${Date.now()}`,
    monthLabel: nextMonthName,
    cycleNumber: nextCycleIndex,
    dueDate: `21 ${nextMonthName}`,
    principalBase: loan.principalOutstanding,
    ratePct: 12.9,
    standardRatePct: 24.0,
    accruedInterest: baseMonthly,
    penalInterest: 0,
    totalMonthlyDue: baseMonthly,
    status: 'CURRENT',
    rebateAvailed: true,
    rebateSavings: Math.round(loan.principalOutstanding * (11.1 / 100) / 12),
  };

  const updatedSchedule = [...currentSchedule, newRecord];
  const unpaidRecords = updatedSchedule.filter((r) => r.status !== 'PAID');
  const totalInterestDue = unpaidRecords.reduce((sum, r) => sum + r.totalMonthlyDue, 0);

  return {
    ...loan,
    monthlyInterestSchedule: updatedSchedule,
    unpaidMonthsCount: unpaidRecords.length,
    interestDue: totalInterestDue,
    total3MonthsDue: totalInterestDue,
    status: 'DUE_SOON',
  };
}
