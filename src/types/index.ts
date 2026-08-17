export interface GoldRate {
  city: string;
  rate22k_1g: number;
  rate24k_1g: number;
  rate18k_1g: number;
  rate20k_1g?: number;
  rate14k_1g?: number;
  rate22k_8g?: number;
  rate24k_8g?: number;
  rate22k_10g?: number;
  rate24k_10g?: number;
  silver_10g: number;
  silver_1kg?: number;
  change24k: number; // positive or negative percentage
  change22k?: number;
  dayHigh24k?: number;
  dayLow24k?: number;
  dayHigh22k?: number;
  dayLow22k?: number;
  updatedTime: string;
  source?: string;
  googleFinanceTicker?: string;
  historical7Days: { date: string; rate22k: number; rate24k: number }[];
  historical30Days?: { date: string; rate22k: number; rate24k: number }[];
}

export interface GoldItem {
  id: string;
  title: string;
  netWeightGrams: number;
  grossWeightGrams: number;
  karat: '18K' | '20K' | '22K' | '24K';
  purityPct: number;
  itemCount: number;
  appraisedValue: number;
}

export interface CustomerProfile {
  customerId: string;
  crmCode?: string;
  name: string;
  displayName: string;
  mobile: string;
  email?: string;
  address?: string;
  kycStatus: 'VERIFIED' | 'PENDING';
  panMasked?: string;
  aadhaarMasked?: string;
  tier: string;
  rewardPoints: number;
  registeredBranch: string;
  memberSince: string;
}

export interface SanctionLetterData {
  rbiLicenseNo: string;
  sanctionDate: string;
  branchName: string;
  branchCode: string;
  branchPhone: string;
  branchGstin: string;
  customerId: string;
  crmCode: string;
  customerName: string;
  address: string;
  mobile: string;
  facility: string;
  selectedScheme: string;
  loanNumber: string;
  sanctionAmount: number;
  periodMonths: number;
  principalDueDate: string;
  paymentMode: string;
  rateOfInterest: string;
  modeOfComputation: string;
  rebateTable: {
    period: string;
    rebatePct: string;
    effectiveRatePct: string;
  }[];
  annualizedRatePct: string;
  serviceCharge: number;
  securityCharge: number;
  smsCharge: number;
  tokenLostCharge: number;
  postageCharge6M: number;
  postageCharge9M: number;
  ornaments: {
    name: string;
    itemsCount: number;
    grossWeight: number;
    stoneDeductions: number;
    netWeight: number;
    ratePerGram: number;
    eligibleAmount: number;
    availedAmount?: number;
  }[];
  totalItems: number;
  totalGrossWeight: number;
  totalDeductions: number;
  totalNetWeight: number;
  eligibleLoanAmount: number;
  availedLoanAmount: number;
  tppNo: string;
  crmLeadId?: string;
}

export interface MonthlyInterestRecord {
  id: string;
  monthLabel: string; // e.g. "Jun 2026", "Jul 2026", "Aug 2026"
  cycleNumber: number; // 1, 2, 3
  dueDate: string; // "21 Jun 2026"
  principalBase: number; // 194000
  ratePct: number; // 12.9
  standardRatePct: number; // 24.0
  accruedInterest: number; // 2086
  penalInterest: number; // 0
  totalMonthlyDue: number; // 2086
  status: 'OVERDUE' | 'DUE_NOW' | 'CURRENT' | 'PAID';
  paidOn?: string;
  rebateAvailed: boolean;
  rebateSavings: number; // e.g. 1794
}

export interface LoanAccount {
  loanId: string;
  accountNumber: string;
  schemeName: string;
  sanctionDate: string;
  dueDate: string;
  sanctionedAmount: number;
  principalOutstanding: number;
  interestDue: number;
  penalInterest: number;
  interestRatePct: number;
  tenureMonths: number;
  status: 'ACTIVE' | 'DUE_SOON' | 'CLOSED';
  branchName: string;
  branchCity: string;
  lockerSafeNumber: string;
  goldItems: GoldItem[];
  totalWeightGrams: number;
  totalAppraisedValue: number;
  lastPaymentDate?: string;
  lastPaymentAmount?: number;
  maxTopUpEligible: number;
  sanctionLetter?: SanctionLetterData;
  // Monthly Interest Accrual & 3-Months Due Schedule
  monthlyInterestSchedule?: MonthlyInterestRecord[];
  unpaidMonthsCount?: number;
  monthlyInterestAmount?: number; // base monthly interest rate
  total3MonthsDue?: number;
  autoInterestAccrualEnabled?: boolean;
}

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  loanId: string;
  amount: number;
  paymentType: 'INTEREST_ONLY' | 'PART_PRINCIPAL' | 'FULL_SETTLEMENT' | 'TOP_UP';
  paymentMode: 'UPI_GPAY' | 'UPI_PHONEPE' | 'UPI_PAYTM' | 'NET_BANKING' | 'DEBIT_CARD';
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  utrNumber: string;
  receiptNumber: string;
}

export interface GoldCoin {
  id: string;
  name: string;
  weightGrams: number;
  karat: '24K (99.9% Pure)';
  hallmarked: boolean;
  price: number;
  originalPrice: number;
  discountPct: number;
  description: string;
  inStock: boolean;
  imageIcon: string;
}

export interface MuthootBranch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  managerName: string;
  distanceKm: number;
  timings: string;
  isOpenToday: boolean;
  servicesAvailable: string[];
  coordinates: { lat: number; lng: number };
}

export interface LoanScheme {
  id: string;
  name: string;
  tagline: string;
  interestRateMinPct: number;
  maxLtvPct: number;
  tenureMinMonths: number;
  tenureMaxMonths: number;
  processingFee: string;
  minAmount: number;
  maxAmount: number;
  features: string[];
  rebateBenefit: string;
  badge?: string;
}

export interface DoorstepBooking {
  id: string;
  bookingRef: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  date: string;
  timeSlot: string;
  estimatedWeightGrams: number;
  expectedLoanAmount: number;
  executiveName?: string;
  executivePhone?: string;
  status: 'SCHEDULED' | 'EXECUTIVE_ASSIGNED' | 'EVALUATING' | 'DISBURSED' | 'COMPLETED';
}

export type SupportedLanguage = 'en' | 'hi' | 'ml' | 'ta' | 'te' | 'kn';
