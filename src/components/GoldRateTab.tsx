import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Bell, 
  ShieldCheck, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  RefreshCw,
  Search,
  Building2,
  Info,
  Layers,
  ArrowUpRight,
  Globe,
  Sliders,
  Scale
} from 'lucide-react';
import { GoldRate, GoldCoin, SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { mockGoldCoins } from '../data/mockData';

interface GoldRateTabProps {
  currentLang: SupportedLanguage;
  goldRates: GoldRate[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onOpenQuickPay: () => void;
}

type GoldWeightUnit = '1g' | '8g' | '10g' | '100g';

export const GoldRateTab: React.FC<GoldRateTabProps> = ({
  currentLang,
  goldRates,
  selectedCity,
  setSelectedCity,
  onOpenQuickPay,
}) => {
  const t = translations[currentLang];
  const [subTab, setSubTab] = useState<'RATES' | 'COINS' | 'CITY_COMPARE'>('RATES');
  const [unit, setUnit] = useState<GoldWeightUnit>('1g');
  const [trendView, setTrendView] = useState<'7D' | '30D'>('7D');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [alertSet, setAlertSet] = useState(false);
  const [purchasedCoin, setPurchasedCoin] = useState<GoldCoin | null>(null);

  const currentRate = goldRates.find((r) => r.city === selectedCity) || goldRates[0];

  // Multiplier based on unit
  const unitMultiplier = unit === '1g' ? 1 : unit === '8g' ? 8 : unit === '10g' ? 10 : 100;
  const unitLabel = unit === '1g' ? 'Per 1 Gram' : unit === '8g' ? 'Per Sovereign (8g)' : unit === '10g' ? 'Per 10 Grams (Tola)' : 'Per 100 Grams';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 700);
  };

  const handleSetAlert = () => {
    setAlertSet(true);
    setTimeout(() => setAlertSet(false), 4000);
  };

  const handleBuyCoin = (coin: GoldCoin) => {
    setPurchasedCoin(coin);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-6 space-y-3 px-3.5 pt-3 scroll-smooth">
      {/* Google Live Rates Header Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#780016] text-white p-3.5 rounded-2xl shadow-sm border border-amber-400/30 relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-2 -translate-y-2">
          <Coins className="w-28 h-28 text-amber-300" />
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {/* Google G-Styled Pill */}
            <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-black tracking-wide bg-gradient-to-r from-blue-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                Google Live Bullion
              </span>
            </div>
            <span className="text-[9px] text-slate-300 font-medium hidden sm:inline">
              MCX Spot & IBJA Benchmark
            </span>
          </div>

          {/* Live Sync Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1 bg-white/15 hover:bg-white/25 active:scale-95 text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20 transition-all"
            title="Refresh Live Gold Rates from Google"
          >
            <RefreshCw className={`w-3 h-3 text-amber-300 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div>
            <div className="text-xs text-amber-200/90 font-medium flex items-center gap-1">
              <span>Market Status:</span>
              <span className="text-emerald-300 font-bold">Open • Spot Realtime</span>
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              Synced: <strong className="text-white">{lastSyncTime}</strong> • Ref: {currentRate.googleFinanceTicker || 'GOOG:GOLD-INR'}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10.5px] text-slate-300 font-medium">Day 24K Range</div>
            <div className="text-xs font-bold text-amber-300 font-['Outfit']">
              ₹{(currentRate.dayLow24k || 7520).toLocaleString('en-IN')} - ₹{(currentRate.dayHigh24k || 7585).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </section>

      {/* Sub Tab Switcher */}
      <div className="bg-slate-200/80 p-1 rounded-xl flex items-center shadow-inner text-xs">
        <button
          id="tab-gold-rates"
          onClick={() => setSubTab('RATES')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            subTab === 'RATES'
              ? 'bg-white text-[#b91c1c] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Live Gold Rates
        </button>

        <button
          id="tab-city-compare"
          onClick={() => setSubTab('CITY_COMPARE')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            subTab === 'CITY_COMPARE'
              ? 'bg-white text-[#b91c1c] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          City Comparison
        </button>

        <button
          id="tab-gold-coins"
          onClick={() => setSubTab('COINS')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            subTab === 'COINS'
              ? 'bg-white text-[#b91c1c] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          24K Coins Store
        </button>
      </div>

      {subTab === 'RATES' && (
        <div className="space-y-3.5">
          {/* Controls: City Selector & Unit Switcher */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                  Select Gold Market City
                </span>
                <span className="text-sm font-extrabold text-slate-900 font-['Outfit']">
                  📍 {currentRate.city}
                </span>
              </div>

              <select
                id="select-gold-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl px-2.5 py-1.5 border border-slate-300 focus:outline-none cursor-pointer"
              >
                {goldRates.map((r) => (
                  <option key={r.city} value={r.city}>
                    {r.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Switcher Pills */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10.5px] font-semibold text-slate-500 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                Weight Unit:
              </span>

              <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                {(['1g', '8g', '10g', '100g'] as GoldWeightUnit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-2 py-0.5 text-[10.5px] font-extrabold rounded-md transition-all ${
                      unit === u
                        ? 'bg-[#b91c1c] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {u === '1g' ? '1 Gram' : u === '8g' ? '8g (Pavan)' : u === '10g' ? '10g (Tola)' : '100g'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Primary 22K & 24K Cards with Dynamic Multipliers */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* 22K (Jewellery standard) */}
            <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/20 rounded-2xl p-3.5 border-2 border-amber-400/90 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-amber-950">
                  22 Karat (916)
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-amber-400 text-red-950 font-bold rounded-full">
                  JEWELLERY
                </span>
              </div>
              <div className="text-2xl font-black text-amber-950 font-['Outfit'] mt-1">
                ₹{(currentRate.rate22k_1g * unitMultiplier).toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-amber-800 font-semibold">
                {unitLabel}
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200/80 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                <span>Google Trend:</span>
                <span>▲ +₹{(35 * unitMultiplier).toLocaleString('en-IN')} (+0.44%)</span>
              </div>
            </div>

            {/* 24K (Pure bullion) */}
            <div className="bg-gradient-to-br from-rose-500/10 via-white to-rose-500/20 rounded-2xl p-3.5 border-2 border-rose-400/90 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-rose-950">
                  24 Karat (999)
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-rose-500 text-white font-bold rounded-full">
                  PURE GOLD
                </span>
              </div>
              <div className="text-2xl font-black text-rose-950 font-['Outfit'] mt-1">
                ₹{(currentRate.rate24k_1g * unitMultiplier).toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-rose-800 font-semibold">
                {unitLabel}
              </div>
              <div className="mt-2 pt-2 border-t border-rose-200/80 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                <span>Google Trend:</span>
                <span>▲ +₹{(40 * unitMultiplier).toLocaleString('en-IN')} (+0.48%)</span>
              </div>
            </div>
          </div>

          {/* All Purity Breakdown Table */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-500" />
                Live Gold Purity Rates ({unitLabel})
              </h3>
              <span className="text-[9.5px] text-slate-400 font-medium">BIS Hallmarked</span>
            </div>

            <div className="space-y-1.5 text-xs">
              {/* 24K Pure */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/50 border border-amber-100">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>24K Fine Gold (99.9%)</span>
                    <span className="text-[9px] px-1 bg-rose-100 text-rose-800 font-bold rounded">999</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">Mint Bars & Investment Coins</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900 font-['Outfit'] text-sm">
                    ₹{(currentRate.rate24k_1g * unitMultiplier).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-emerald-600 font-bold">▲ +0.48%</div>
                </div>
              </div>

              {/* 22K Standard */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/80 border border-amber-200/80">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>22K Standard Gold (91.6%)</span>
                    <span className="text-[9px] px-1 bg-amber-200 text-amber-900 font-bold rounded">916 KDM</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">Indian Bridal Jewellery standard</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-amber-950 font-['Outfit'] text-sm">
                    ₹{(currentRate.rate22k_1g * unitMultiplier).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-emerald-600 font-bold">▲ +0.44%</div>
                </div>
              </div>

              {/* 20K Traditional */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>20K Antique Gold (83.3%)</span>
                    <span className="text-[9px] px-1 bg-slate-200 text-slate-700 font-bold rounded">833</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">Traditional & Temple Ornaments</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900 font-['Outfit'] text-sm">
                    ₹{((currentRate.rate20k_1g || 6300) * unitMultiplier).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-slate-500">Benchmark</div>
                </div>
              </div>

              {/* 18K Diamond Jewelry */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>18K Diamond Base (75.0%)</span>
                    <span className="text-[9px] px-1 bg-blue-100 text-blue-800 font-bold rounded">750</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">Studded Diamond Rings & Watches</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900 font-['Outfit'] text-sm">
                    ₹{(currentRate.rate18k_1g * unitMultiplier).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-slate-500">Benchmark</div>
                </div>
              </div>

              {/* 14K Daily Wear */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>14K Modern Gold (58.5%)</span>
                    <span className="text-[9px] px-1 bg-purple-100 text-purple-800 font-bold rounded">585</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">Lightweight & Daily wear</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900 font-['Outfit'] text-sm">
                    ₹{((currentRate.rate14k_1g || 4410) * unitMultiplier).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-slate-500">Benchmark</div>
                </div>
              </div>

              {/* Fine Silver 999 */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/70 border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Fine Silver (99.9% Pure)</span>
                    <span className="text-[9px] px-1 bg-slate-300 text-slate-800 font-bold rounded">999 Ag</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">10 Grams: ₹{currentRate.silver_10g} • 1 Kg: ₹{(currentRate.silver_1kg || 91500).toLocaleString('en-IN')}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900 font-['Outfit'] text-sm">
                    ₹{(unit === '100g' ? (currentRate.silver_10g * 10) : currentRate.silver_10g).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-emerald-600 font-bold">▲ +0.55%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Trend Visualizer */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Google Historical Movement (22K per gram)
              </h3>
              
              <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px]">
                <button
                  onClick={() => setTrendView('7D')}
                  className={`px-2 py-0.5 font-bold rounded ${trendView === '7D' ? 'bg-[#b91c1c] text-white' : 'text-slate-600'}`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setTrendView('30D')}
                  className={`px-2 py-0.5 font-bold rounded ${trendView === '30D' ? 'bg-[#b91c1c] text-white' : 'text-slate-600'}`}
                >
                  30 Days
                </button>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-28 flex items-end justify-between gap-1.5 pt-4 px-2 bg-slate-50 rounded-xl border border-slate-100">
              {((trendView === '7D' ? currentRate.historical7Days : currentRate.historical30Days) || currentRate.historical7Days).map((item, idx) => {
                const minRate = 6750;
                const maxRate = 6960;
                const heightPct = Math.min(100, Math.max(15, Math.round(((item.rate22k - minRate) / (maxRate - minRate)) * 80) + 20));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[8.5px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{item.rate22k}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[24px] bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 rounded-t-md transition-all group-hover:from-red-600 group-hover:to-amber-400 shadow-2xs"
                    ></div>
                    <span className="text-[9px] font-medium text-slate-500 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-slate-500 px-1">
              <span>30-Day Growth: <strong className="text-emerald-700">+₹140 (+2.06%)</strong></span>
              <span>Bullion Spot Index: <strong className="text-slate-800">MCX-GOLD</strong></span>
            </div>
          </div>

          {/* Tax & Price Composition Details (GST + Hallmarking) */}
          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 text-[11px] text-slate-700 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>How Gold Rates are Formulated in India:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[10.5px]">
              <div className="bg-white p-2 rounded-xl border border-amber-100">
                <span className="text-slate-500 block">Base Price:</span>
                <span className="font-bold text-slate-900">₹{currentRate.rate22k_1g}/g</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-amber-100">
                <span className="text-slate-500 block">Goods & Service Tax:</span>
                <span className="font-bold text-slate-900">3% GST on final bullion</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 pt-0.5">
              * Rates shown are exclusive of 3% GST and jeweller making charges. Muthoot sanctions gold loans up to 75% LTV on the gross 22K rate.
            </p>
          </div>

          {/* Gold Price Alert Simulator */}
          <div className="bg-gradient-to-r from-slate-900 to-red-950 text-white rounded-2xl p-3.5 border border-amber-400/30 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-red-950 flex items-center justify-center font-bold">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Daily Google Gold Alert</div>
                <div className="text-[10.5px] text-slate-300">Receive morning 9 AM rate update for {currentRate.city}</div>
              </div>
            </div>

            <button
              onClick={handleSetAlert}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                alertSet
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-400 hover:bg-amber-300 text-red-950 active:scale-95'
              }`}
            >
              {alertSet ? '✓ Alert Active' : 'Set Alert'}
            </button>
          </div>
        </div>
      )}

      {/* CITY COMPARISON SUBTAB */}
      {subTab === 'CITY_COMPARE' && (
        <div className="space-y-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" />
                City-Wise Live Gold Rates (Google Spot)
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">Per 10 Grams</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider bg-slate-50">
                    <th className="py-2 px-2 font-bold">City</th>
                    <th className="py-2 px-2 font-bold">22K (10g)</th>
                    <th className="py-2 px-2 font-bold">24K (10g)</th>
                    <th className="py-2 px-2 font-bold">Silver (10g)</th>
                    <th className="py-2 px-2 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {goldRates.map((r) => {
                    const isSelected = r.city === selectedCity;
                    return (
                      <tr 
                        key={r.city} 
                        className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-amber-50/60 font-semibold' : ''}`}
                      >
                        <td className="py-2 px-2">
                          <div className="font-bold text-slate-900 flex items-center gap-1">
                            {r.city}
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                          </div>
                          <div className="text-[9px] text-slate-400">{r.source?.split('&')[0] || 'Google'}</div>
                        </td>
                        <td className="py-2 px-2 font-extrabold text-amber-950 font-['Outfit']">
                          ₹{(r.rate22k_1g * 10).toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 px-2 font-extrabold text-rose-950 font-['Outfit']">
                          ₹{(r.rate24k_1g * 10).toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 px-2 text-slate-700 font-bold font-['Outfit']">
                          ₹{r.silver_10g}
                        </td>
                        <td className="py-2 px-2 text-right">
                          <button
                            onClick={() => {
                              setSelectedCity(r.city);
                              setSubTab('RATES');
                            }}
                            className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all ${
                              isSelected
                                ? 'bg-amber-400 text-red-950'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {isSelected ? 'Active' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 24K GOLD COINS STORE */}
      {subTab === 'COINS' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white p-3.5 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Coins className="w-5 h-5 text-amber-200" />
              <h3 className="text-sm font-extrabold font-['Outfit']">
                Muthoot Precious Metals • 24K Hallmarked
              </h3>
            </div>
            <p className="text-[11px] text-amber-100">
              999.9 Purity Swiss Assayed Gold Coins in tamper-proof certicards. Free insured doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {mockGoldCoins.map((coin) => (
              <div
                key={coin.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Coin Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded">
                      BIS 999.9
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600">
                      {coin.discountPct}% OFF
                    </span>
                  </div>

                  {/* Coin Emblem Visual */}
                  <div className="w-16 h-16 mx-auto my-2 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 shadow-md border-2 border-amber-200 flex items-center justify-center p-2 text-center text-amber-950 font-black text-[11px] font-['Outfit']">
                    <div>
                      <div>{coin.weightGrams}g</div>
                      <div className="text-[7px] tracking-tighter">24K 999</div>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 text-center leading-tight mt-1">
                    {coin.name}
                  </h4>
                  <p className="text-[9.5px] text-slate-500 text-center line-clamp-2 mt-0.5">
                    {coin.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <div className="text-sm font-extrabold text-slate-900 font-['Outfit']">
                    ₹{coin.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-slate-400 line-through">
                    ₹{coin.originalPrice.toLocaleString('en-IN')}
                  </div>

                  <button
                    onClick={() => handleBuyCoin(coin)}
                    className="w-full mt-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Purchased Coin Dialog Confirmation */}
      {purchasedCoin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Gold Coin Reserved!
            </h3>
            <p className="text-xs text-slate-600">
              {purchasedCoin.name} has been booked at locked price of <strong>₹{purchasedCoin.price.toLocaleString('en-IN')}</strong>.
            </p>
            <div className="p-2.5 bg-slate-50 rounded-xl text-left text-[11px] text-slate-700 space-y-1">
              <div>• Delivery to: <strong>Pathloth Ranjith Rathod (Sangareddy)</strong></div>
              <div>• Insured Transit by: <strong>Muthoot Secure Vault Logistics</strong></div>
              <div>• ETA: <strong>2 Business Days</strong></div>
            </div>
            <button
              onClick={() => setPurchasedCoin(null)}
              className="w-full py-2 bg-[#b91c1c] text-white rounded-xl font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
