import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Coins, 
  ArrowRight, 
  Percent, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Info,
  Sliders,
  Award
} from 'lucide-react';
import { GoldRate, LoanScheme, SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { mockLoanSchemes } from '../data/mockData';

interface CalculatorTabProps {
  currentLang: SupportedLanguage;
  goldRates: GoldRate[];
  selectedCity: string;
  onOpenDoorstepModal: () => void;
  onOpenApplyModal: () => void;
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  currentLang,
  goldRates,
  selectedCity,
  onOpenDoorstepModal,
  onOpenApplyModal,
}) => {
  const t = translations[currentLang];
  const [weightGrams, setWeightGrams] = useState<number>(35);
  const [karat, setKarat] = useState<'18K' | '20K' | '22K' | '24K'>('22K');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('SCH-01');
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  const currentRate = goldRates.find((r) => r.city === selectedCity) || goldRates[0];

  const selectedScheme = mockLoanSchemes.find((s) => s.id === selectedSchemeId) || mockLoanSchemes[0];

  // Calculate purity factor
  const purityMultiplier = useMemo(() => {
    switch (karat) {
      case '24K': return 1.0;
      case '22K': return 0.916;
      case '20K': return 0.833;
      case '18K': return 0.750;
    }
  }, [karat]);

  // Base 24k rate
  const base24kPrice = currentRate.rate24k_1g;
  const itemValuation = Math.round(weightGrams * base24kPrice * purityMultiplier);

  // Maximum RBI permissible LTV (up to 75%)
  const maxLtv = selectedScheme.maxLtvPct / 100;
  const maxLoanEligible = Math.round(itemValuation * maxLtv);

  // Interest per month
  const monthlyInterestRate = selectedScheme.interestRateMinPct / 12 / 100;
  const monthlyInterestAmount = Math.round(maxLoanEligible * monthlyInterestRate);
  const totalInterestTenure = Math.round(monthlyInterestAmount * tenureMonths);
  const totalRepayment = maxLoanEligible + totalInterestTenure;
  const perGramSanction = Math.round(maxLoanEligible / weightGrams);

  const presetWeights = [10, 25, 50, 100, 150];

  return (
    <div className="flex-1 overflow-y-auto pb-6 space-y-3.5 px-3.5 pt-3 scroll-smooth">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-3.5 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2 mb-1">
          <Calculator className="w-5 h-5 text-amber-300" />
          <h2 className="text-sm font-extrabold font-['Outfit']">
            Muthoot Gold Loan Calculator
          </h2>
        </div>
        <p className="text-[11px] text-red-100">
          Instant calculation based on live gold rate for {currentRate.city} (₹{currentRate.rate22k_1g}/g for 22K).
        </p>
      </div>

      {/* Input Parameters Box */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
        {/* 1. Gold Weight Slider & Quick Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-500" />
              {t.enterWeight}
            </label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="1"
                max="500"
                value={weightGrams}
                onChange={(e) => setWeightGrams(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
                className="w-16 text-center text-sm font-bold text-[#b91c1c] bg-red-50 border border-red-200 rounded-lg py-1 px-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-xs font-bold text-slate-600">grams</span>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="250"
            step="1"
            value={weightGrams}
            onChange={(e) => setWeightGrams(Number(e.target.value))}
            className="w-full accent-[#b91c1c] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />

          {/* Quick presets */}
          <div className="flex items-center justify-between mt-2">
            {presetWeights.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWeightGrams(w)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                  weightGrams === w
                    ? 'bg-[#b91c1c] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {w}g
              </button>
            ))}
          </div>
        </div>

        {/* 2. Karat / Purity Selector */}
        <div>
          <label className="text-xs font-bold text-slate-800 block mb-1.5">
            {t.selectKarat}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['18K', '20K', '22K', '24K'] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKarat(k)}
                className={`py-2 px-1 rounded-xl text-center text-xs font-extrabold transition-all border ${
                  karat === k
                    ? 'bg-amber-500 text-red-950 border-amber-600 shadow-sm ring-2 ring-amber-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div>{k}</div>
                <div className="text-[9px] font-normal opacity-80">
                  {k === '24K' ? '99.9%' : k === '22K' ? '91.6%' : k === '20K' ? '83.3%' : '75.0%'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Scheme Selector */}
        <div>
          <label className="text-xs font-bold text-slate-800 block mb-1.5">
            Select Muthoot Scheme
          </label>
          <div className="space-y-2">
            {mockLoanSchemes.map((scheme) => (
              <label
                key={scheme.id}
                onClick={() => setSelectedSchemeId(scheme.id)}
                className={`flex items-start p-2.5 rounded-xl border cursor-pointer transition-all ${
                  selectedSchemeId === scheme.id
                    ? 'bg-red-50/70 border-[#b91c1c] ring-1 ring-[#b91c1c]'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="loanScheme"
                  checked={selectedSchemeId === scheme.id}
                  onChange={() => setSelectedSchemeId(scheme.id)}
                  className="mt-0.5 accent-[#b91c1c]"
                />
                <div className="ml-2.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {scheme.name}
                    </span>
                    <span className="text-xs font-extrabold text-[#b91c1c]">
                      {scheme.interestRateMinPct}% p.a.
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {scheme.tagline}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Loan Tenure Selector */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800">
              {t.selectTenure}
            </label>
            <span className="text-xs font-bold text-[#b91c1c]">{tenureMonths} Months</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[3, 6, 9, 12, 24].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTenureMonths(m)}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tenureMonths === m
                    ? 'bg-[#b91c1c] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {m}M
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Calculation Result Sheet */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/60 rounded-2xl p-4 border-2 border-amber-300 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-700" />
            Maximum Eligible Loan
          </span>
          <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full border border-emerald-300">
            75% RBI LTV Approved
          </span>
        </div>

        <div className="text-center py-2 bg-white/90 rounded-xl border border-amber-200 shadow-inner">
          <div className="text-2xl font-black text-red-950 font-['Outfit']">
            ₹{maxLoanEligible.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
            (Approx. ₹{perGramSanction.toLocaleString('en-IN')}/gram sanctioned)
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-white/80 p-2.5 rounded-xl border border-amber-200/80">
          <div>
            <span className="text-[10px] text-slate-500 block">Total Gold Valuation</span>
            <span className="font-bold text-slate-900">₹{itemValuation.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Interest Rate</span>
            <span className="font-bold text-[#b91c1c]">{selectedScheme.interestRateMinPct}% p.a.</span>
          </div>
          <div className="pt-1.5 border-t border-slate-100">
            <span className="text-[10px] text-slate-500 block">Monthly Interest</span>
            <span className="font-bold text-red-700">₹{monthlyInterestAmount.toLocaleString('en-IN')}/mo</span>
          </div>
          <div className="pt-1.5 border-t border-slate-100">
            <span className="text-[10px] text-slate-500 block">Total Repay ({tenureMonths}m)</span>
            <span className="font-bold text-slate-900">₹{totalRepayment.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Special Rebate Notice */}
        <div className="text-[10.5px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-start space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Muthoot Rebate Advantage:</strong> Pay interest every month to save up to ₹{Math.round(totalInterestTenure * 0.2).toLocaleString('en-IN')} in total interest!
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            id="btn-calc-doorstep"
            onClick={onOpenDoorstepModal}
            className="bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2.5 px-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Get Loan @ Home</span>
          </button>

          <button
            id="btn-calc-apply"
            onClick={onOpenApplyModal}
            className="bg-amber-500 hover:bg-amber-400 text-red-950 py-2.5 px-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
          >
            <span>Apply Online</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
