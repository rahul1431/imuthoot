import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Percent, 
  MapPin, 
  Truck, 
  CreditCard, 
  Calculator as CalcIcon, 
  Coins, 
  Zap, 
  Building2, 
  Send, 
  Umbrella, 
  Lock, 
  ChevronRight,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { GoldRate, LoanAccount, SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface HomeTabProps {
  currentLang: SupportedLanguage;
  goldRates: GoldRate[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  activeLoans: LoanAccount[];
  onOpenQuickPay: (loan?: LoanAccount) => void;
  onOpenDoorstepModal: () => void;
  onOpenApplyModal: () => void;
  onOpenCalculator: () => void;
  onOpenGoldRates: () => void;
  onOpenBranches: () => void;
  onOpenCoins: () => void;
  onOpenAssistant: () => void;
  onSelectLoan: (loan: LoanAccount) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  currentLang,
  goldRates,
  selectedCity,
  setSelectedCity,
  activeLoans,
  onOpenQuickPay,
  onOpenDoorstepModal,
  onOpenApplyModal,
  onOpenCalculator,
  onOpenGoldRates,
  onOpenBranches,
  onOpenCoins,
  onOpenAssistant,
  onSelectLoan,
}) => {
  const t = translations[currentLang];
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  const currentRate = goldRates.find((r) => r.city === selectedCity) || goldRates[0];

  const banners = [
    {
      id: 1,
      tag: 'MUTHOOT @ HOME',
      title: 'Gold Loan at Your Doorstep',
      desc: 'Expert loan appraisal & instant money in 30 mins at your home.',
      bg: 'from-red-800 via-red-700 to-amber-700',
      actionText: 'Book Doorstep Visit',
      action: onOpenDoorstepModal,
      badge: 'FREE VISIT',
    },
    {
      id: 2,
      tag: 'SPECIAL SCHEME',
      title: 'Lowest Interest from 9.9% p.a.',
      desc: 'Get maximum loan per gram with timely payment rebate.',
      bg: 'from-amber-800 via-red-800 to-red-950',
      actionText: 'Calculate Eligibility',
      action: onOpenCalculator,
      badge: 'POPULAR',
    },
    {
      id: 3,
      tag: 'INSTANT PRE-APPROVAL',
      title: 'Pre-Approved Top-Up Available',
      desc: 'Eligible for ₹65,000 top-up on active loan without new paperwork.',
      bg: 'from-red-900 via-slate-900 to-amber-950',
      actionText: 'Top-Up in 1-Click',
      action: () => onOpenQuickPay(activeLoans[0]),
      badge: 'INSTANT',
    },
  ];

  // Auto cycle banners
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const quickServices = [
    {
      id: 'doorstep',
      label: 'Gold Loan @ Home',
      icon: Truck,
      color: 'bg-red-50 text-[#b91c1c] border-red-200',
      onClick: onOpenDoorstepModal,
      highlight: true,
      tag: 'Doorstep',
    },
    {
      id: 'quickpay',
      label: 'Pay Interest',
      icon: CreditCard,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      onClick: () => onOpenQuickPay(activeLoans[0]),
      highlight: true,
      tag: 'Instant',
    },
    {
      id: 'calculator',
      label: 'Loan Calculator',
      icon: CalcIcon,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      onClick: onOpenCalculator,
      highlight: false,
    },
    {
      id: 'goldrate',
      label: 'Live Gold Rate',
      icon: TrendingUp,
      color: 'bg-rose-50 text-rose-800 border-rose-200',
      onClick: onOpenGoldRates,
      highlight: false,
      tag: 'Live',
    },
    {
      id: 'goldcoins',
      label: '24K Gold Coins',
      icon: Coins,
      color: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      onClick: onOpenCoins,
      highlight: false,
    },
    {
      id: 'topup',
      label: 'Instant Top-Up',
      icon: Zap,
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      onClick: () => onOpenQuickPay(activeLoans[0]),
      highlight: false,
      tag: '₹65K',
    },
    {
      id: 'branches',
      label: 'Find Branch',
      icon: Building2,
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      onClick: onOpenBranches,
      highlight: false,
    },
    {
      id: 'applynew',
      label: 'New Loan',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      onClick: onOpenApplyModal,
      highlight: false,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-6 space-y-4 px-3.5 pt-3 scroll-smooth">
      {/* 1. Live Gold Rate Ticker Card */}
      <section
        id="section-gold-rate-ticker"
        className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/90 relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                Live Gold Rate
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Google Live
              </span>
            </div>
          </div>

          {/* City Selector */}
          <select
            id="city-rate-selector"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg px-2 py-1 border border-slate-200 focus:outline-none cursor-pointer"
          >
            {goldRates.map((r) => (
              <option key={r.city} value={r.city}>
                📍 {r.city}
              </option>
            ))}
          </select>
        </div>

        {/* Rate Figures Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* 22K (Standard Jewellery) */}
          <div 
            onClick={onOpenGoldRates}
            className="bg-amber-50/70 hover:bg-amber-100/70 rounded-xl p-2 border border-amber-200/60 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-center space-x-1">
              <span className="text-[10.5px] font-bold text-amber-900">22 Karat</span>
              <span className="text-[9px] px-1 bg-amber-200/70 text-amber-900 font-bold rounded">916</span>
            </div>
            <div className="text-base font-extrabold text-amber-950 mt-0.5 font-['Outfit']">
              ₹{currentRate.rate22k_1g.toLocaleString('en-IN')}
            </div>
            <div className="text-[9px] text-emerald-700 font-bold flex items-center justify-center">
              ▲ +0.44% (1g)
            </div>
          </div>

          {/* 24K (Pure Gold) */}
          <div 
            onClick={onOpenGoldRates}
            className="bg-rose-50/70 hover:bg-rose-100/70 rounded-xl p-2 border border-rose-200/60 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-center space-x-1">
              <span className="text-[10.5px] font-bold text-rose-900">24 Karat</span>
              <span className="text-[9px] px-1 bg-rose-200/70 text-rose-900 font-bold rounded">999</span>
            </div>
            <div className="text-base font-extrabold text-rose-950 mt-0.5 font-['Outfit']">
              ₹{currentRate.rate24k_1g.toLocaleString('en-IN')}
            </div>
            <div className="text-[9px] text-emerald-700 font-bold flex items-center justify-center">
              ▲ +0.48% (1g)
            </div>
          </div>

          {/* Silver 10g */}
          <div 
            onClick={onOpenGoldRates}
            className="bg-slate-100/80 hover:bg-slate-200/80 rounded-xl p-2 border border-slate-200 cursor-pointer transition-colors"
          >
            <div className="text-[10.5px] font-bold text-slate-700">Silver (10g)</div>
            <div className="text-base font-extrabold text-slate-900 mt-0.5 font-['Outfit']">
              ₹{currentRate.silver_10g.toLocaleString('en-IN')}
            </div>
            <div className="text-[9px] text-emerald-600 font-bold flex items-center justify-center">
              ▲ +{currentRate.change24k}%
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {currentRate.updatedTime}
          </span>
          <button
            onClick={onOpenGoldRates}
            className="text-[#b91c1c] font-bold hover:underline flex items-center"
          >
            All Purity & Trends <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </section>

      {/* 2. Interactive Promotional Carousel */}
      <section className="relative overflow-hidden rounded-2xl shadow-md">
        <div
          className={`bg-gradient-to-r ${banners[activeBannerIdx].bg} text-white p-4 transition-all duration-500 rounded-2xl relative`}
        >
          {/* Subtle gold watermark pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
            <Coins className="w-32 h-32" />
          </div>

          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
              {banners[activeBannerIdx].tag}
            </span>
            <span className="px-1.5 py-0.5 bg-white/20 text-white rounded text-[9px] font-bold">
              {banners[activeBannerIdx].badge}
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-white font-['Outfit'] leading-tight mb-1">
            {banners[activeBannerIdx].title}
          </h2>
          <p className="text-xs text-white/80 line-clamp-2 mb-3 max-w-[85%]">
            {banners[activeBannerIdx].desc}
          </p>

          <div className="flex items-center justify-between">
            <button
              id={`banner-cta-${banners[activeBannerIdx].id}`}
              onClick={banners[activeBannerIdx].action}
              className="bg-amber-400 hover:bg-amber-300 text-red-950 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
            >
              <span>{banners[activeBannerIdx].actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Carousel Dots */}
            <div className="flex space-x-1">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBannerIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeBannerIdx === idx
                      ? 'w-5 bg-amber-400'
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Quick Services 8-Grid */}
      <section>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {t.ourServices}
          </h3>
          <span className="text-[11px] font-medium text-slate-400">
            Instant 3-Min Approval
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {quickServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <button
                key={srv.id}
                id={`btn-service-${srv.id}`}
                onClick={srv.onClick}
                className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all active:scale-95 group text-center relative"
              >
                {srv.tag && (
                  <span className="absolute -top-1 -right-1 text-[8px] font-extrabold px-1 bg-[#b91c1c] text-white rounded-full shadow-xs">
                    {srv.tag}
                  </span>
                )}

                <div
                  className={`w-11 h-11 rounded-2xl ${srv.color} border flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 shadow-inner`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 group-hover:text-[#b91c1c] leading-tight line-clamp-2">
                  {srv.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Active Loan Priority Alert & Quick Pay Card */}
      {activeLoans.length > 0 && (
        <section className="bg-gradient-to-br from-amber-50 via-white to-red-50/60 rounded-2xl p-3.5 border border-amber-200/90 shadow-sm relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs font-extrabold text-slate-900">
                Active Loan: {activeLoans[0].accountNumber}
              </span>
            </div>
            <span className="text-[9.5px] px-2 py-0.5 bg-red-100 text-red-800 font-extrabold rounded-full border border-red-200 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {activeLoans[0].unpaidMonthsCount || 3} Months Due
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2.5 bg-white/90 p-2.5 rounded-xl border border-slate-200/80">
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Principal Balance</div>
              <div className="text-base font-bold text-slate-900 font-['Outfit']">
                ₹{activeLoans[0].principalOutstanding.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Pledged: {activeLoans[0].totalWeightGrams}g (22K)
              </div>
            </div>

            <div>
              <div className="text-[10px] text-red-600 font-bold flex items-center">
                <AlertCircle className="w-3 h-3 mr-0.5" />
                Last 3 Mos. Interest Due
              </div>
              <div className="text-base font-black text-red-700 font-['Outfit']">
                ₹{activeLoans[0].interestDue.toLocaleString('en-IN')}
              </div>
              <div className="text-[9.5px] text-emerald-700 font-bold flex items-center gap-0.5">
                <span>(₹{(activeLoans[0].monthlyInterestAmount || 4300).toLocaleString('en-IN')}/mo • 12.9% Rebate)</span>
              </div>
            </div>
          </div>

          {/* Quick 3-Month Cycle Badges */}
          <div className="flex items-center justify-between text-[10px] bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200 mb-3">
            <span className="text-slate-600 font-medium">Overdue Cycles:</span>
            <div className="flex items-center space-x-1 font-bold">
              <span className="text-red-700">Jun (₹{(activeLoans[0].monthlyInterestAmount || 4300).toLocaleString('en-IN')})</span>
              <span className="text-slate-400">•</span>
              <span className="text-red-700">Jul (₹{(activeLoans[0].monthlyInterestAmount || 4300).toLocaleString('en-IN')})</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-800">Aug (₹{(activeLoans[0].monthlyInterestAmount || 4300).toLocaleString('en-IN')})</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-home-pay-interest"
              onClick={() => onOpenQuickPay(activeLoans[0], 'INTEREST_ONLY')}
              className="flex-1 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2 px-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pay 3-Months Interest (₹{activeLoans[0].interestDue})</span>
            </button>

            <button
              id="btn-home-view-loan"
              onClick={() => onSelectLoan(activeLoans[0])}
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 py-2 px-3 rounded-xl font-semibold text-xs transition-colors"
            >
              {t.viewDetails}
            </button>
          </div>
        </section>
      )}

      {/* 5. Muthoot Saathi AI Assistant Banner */}
      <section
        onClick={onOpenAssistant}
        className="bg-gradient-to-r from-slate-900 to-red-950 text-white rounded-2xl p-3.5 border border-red-500/30 shadow-md cursor-pointer hover:border-amber-400/50 transition-all flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-red-950 flex items-center justify-center shadow-md font-bold">
            <Sparkles className="w-5 h-5 animate-spin text-red-950" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-white">Muthoot Saathi AI</span>
              <span className="text-[9px] px-1 bg-amber-400/30 text-amber-300 rounded font-semibold">24x7</span>
            </div>
            <p className="text-[10.5px] text-slate-300">
              Calculate loan eligibility, KYC checklist & RBI norms in seconds
            </p>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-amber-400" />
      </section>

      {/* 6. Why India Trusts Muthoot Finance (Trust Pillars) */}
      <section className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-[#b91c1c]" />
          The Muthoot Trust Guarantee
        </h3>

        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-1.5 mb-1">
              <Lock className="w-3.5 h-3.5 text-red-700" />
              <span className="text-[11px] font-bold text-slate-800">100% Insured Safe</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Bank-grade double-key locker security with ₹100% full value insurance.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-[11px] font-bold text-slate-800">3-Minute Payout</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Instant money credited to your bank account or UPI directly.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-1.5 mb-1">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              <span className="text-[11px] font-bold text-slate-800">5,000+ Branches</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              India's largest gold loan network spanning 29 states & UTs.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
              <span className="text-[11px] font-bold text-slate-800">RBI Regulated</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Systemically Important NBFC with 800+ years of family legacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
