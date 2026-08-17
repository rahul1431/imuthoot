import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Send, 
  Home, 
  ShieldCheck, 
  Gift, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  Search, 
  ChevronRight, 
  ExternalLink, 
  Clock, 
  CheckCircle2,
  Lock,
  Building2,
  FileCheck
} from 'lucide-react';
import { MuthootBranch, DoorstepBooking, SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { mockBranches } from '../data/mockData';

interface ServicesTabProps {
  currentLang: SupportedLanguage;
  doorstepBookings: DoorstepBooking[];
  onOpenDoorstepModal: () => void;
  onOpenApplyModal: () => void;
  onOpenRewards: () => void;
  onOpenAssistant: () => void;
  onSelectBranch: (branch: MuthootBranch) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  currentLang,
  doorstepBookings,
  onOpenDoorstepModal,
  onOpenApplyModal,
  onOpenRewards,
  onOpenAssistant,
  onSelectBranch,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'BRANCHES' | 'SERVICES' | 'SUPPORT'>('ALL');

  const filteredBranches = mockBranches.filter((b) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.pincode.includes(searchQuery)
  );

  return (
    <div className="flex-1 overflow-y-auto pb-6 space-y-3.5 px-3.5 pt-3 scroll-smooth">
      {/* Category Pills */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(['ALL', 'BRANCHES', 'SERVICES', 'SUPPORT'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#b91c1c] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat === 'ALL' ? 'All Services' : cat === 'BRANCHES' ? 'Branch Locator' : cat === 'SERVICES' ? 'Ecosystem' : '24x7 Support'}
          </button>
        ))}
      </div>

      {/* 1. Doorstep Ongoing Booking Alert */}
      {(selectedCategory === 'ALL' || selectedCategory === 'SERVICES') && doorstepBookings.length > 0 && (
        <section className="bg-gradient-to-br from-amber-500/15 via-white to-red-50 rounded-2xl p-3.5 border border-amber-300 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#b91c1c]" />
              <span className="text-xs font-bold text-slate-900">
                Scheduled Home Visit
              </span>
            </div>
            <span className="px-2 py-0.5 bg-amber-400 text-red-950 text-[9px] font-extrabold rounded-full">
              {doorstepBookings[0].status.replace('_', ' ')}
            </span>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Slot:</span>
              <span className="font-bold text-slate-800">{doorstepBookings[0].date} ({doorstepBookings[0].timeSlot})</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Executive:</span>
              <span className="font-bold text-emerald-700">{doorstepBookings[0].executiveName}</span>
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              📍 {doorstepBookings[0].address}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert(`Calling Muthoot Doorstep Executive: ${doorstepBookings[0].executivePhone}`)}
              className="flex-1 py-1.5 bg-[#b91c1c] text-white rounded-lg text-xs font-bold shadow-xs active:scale-95"
            >
              Call Executive
            </button>
            <button
              onClick={onOpenDoorstepModal}
              className="py-1.5 px-3 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
            >
              New Slot
            </button>
          </div>
        </section>
      )}

      {/* 2. Branch Locator Module */}
      {(selectedCategory === 'ALL' || selectedCategory === 'BRANCHES') && (
        <section className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#b91c1c]" />
                {t.branchLocator} (5,000+ Nationwide)
              </h3>
              <p className="text-[10.5px] text-slate-500">Find nearest branch with safe lockers & manager</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t.searchBranch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
            />
          </div>

          {/* Branch List */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => onSelectBranch(branch)}
                className="p-2.5 rounded-xl border border-slate-200/90 hover:border-[#b91c1c] bg-slate-50/70 hover:bg-red-50/30 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {branch.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                    {branch.distanceKm} km away
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 line-clamp-1">
                  📍 {branch.address}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/50">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {branch.timings}
                  </span>
                  <span className="text-[#b91c1c] font-bold flex items-center">
                    Book Token <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Muthoot Ecosystem Services Grid */}
      {(selectedCategory === 'ALL' || selectedCategory === 'SERVICES') && (
        <section className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Muthoot Group Financial Services
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Money Transfer */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900">Money Transfer</div>
              <div className="text-[10px] text-slate-500">Indo-Nepal remittance & Western Union instant payout.</div>
            </div>

            {/* Home Loans */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Home className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900">Home Loans</div>
              <div className="text-[10px] text-slate-500">Affordable home finance with minimal documentation.</div>
            </div>

            {/* Insurance */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900">Muthoot Insurance</div>
              <div className="text-[10px] text-slate-500">Comprehensive health, vehicle & family cover.</div>
            </div>

            {/* Rewards */}
            <div
              onClick={onOpenRewards}
              className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 space-y-1 cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center">
                <Gift className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-amber-950">Reward Points (1,480)</div>
              <div className="text-[10px] text-amber-800">Redeem for gold coins or interest cashback.</div>
            </div>
          </div>
        </section>
      )}

      {/* 4. 24x7 Customer Support Channels */}
      {(selectedCategory === 'ALL' || selectedCategory === 'SUPPORT') && (
        <section className="bg-gradient-to-br from-slate-900 to-red-950 text-white rounded-2xl p-4 border border-red-500/30 shadow-md space-y-3">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <div>
              <h4 className="text-xs font-bold text-white">Muthoot 24x7 Customer Support</h4>
              <p className="text-[10px] text-slate-300">Toll-Free Helpline & Regional Assistance</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => alert('Calling Muthoot National Toll-Free: 1800-313-1212')}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/15 text-left space-y-0.5"
            >
              <span className="text-[10px] text-amber-300 block font-semibold">Toll-Free Line</span>
              <span className="font-bold text-white">1800-313-1212</span>
            </button>

            <button
              onClick={onOpenAssistant}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 text-red-950 rounded-xl font-bold flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Muthoot Saathi AI</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
