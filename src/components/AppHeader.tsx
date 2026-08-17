import React from 'react';
import { 
  Bell, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  QrCode,
  ChevronDown,
  Gift,
  LogOut,
  UserCheck
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface AppHeaderProps {
  currentLang: SupportedLanguage;
  onOpenLangModal: () => void;
  onOpenNotifications: () => void;
  onOpenRewards: () => void;
  onOpenAssistant: () => void;
  onLogout?: () => void;
  unreadCount: number;
  customerName: string;
  customerMobile?: string;
  customerTier: string;
  rewardsPoints: number;
  registeredBranch?: string;
}

const langLabels: Record<SupportedLanguage, string> = {
  en: 'EN',
  hi: 'हिंदी',
  ml: 'മല',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentLang,
  onOpenLangModal,
  onOpenNotifications,
  onOpenRewards,
  onOpenAssistant,
  onLogout,
  unreadCount,
  customerName,
  customerMobile,
  customerTier,
  rewardsPoints,
  registeredBranch,
}) => {
  const t = translations[currentLang];

  return (
    <header className="bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#c4122f] text-white pt-2 pb-3.5 px-4 shadow-lg border-b border-red-950/20">
      {/* Top Row: Brand & Utilities */}
      <div className="flex items-center justify-between mb-2.5">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-2.5">
          {/* Muthoot Gold Crest Icon with Elephants Logo */}
          <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center p-1 border border-amber-300">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#b91c1c]" fill="currentColor">
              {/* Emblem with Muthoot Elephants and Umbrella / Crest */}
              <circle cx="50" cy="50" r="46" fill="#b91c1c" />
              <circle cx="50" cy="50" r="41" fill="#fff" />
              <path d="M50 15 L50 45 M35 25 Q50 15 65 25 Q50 35 35 25" fill="#c4122f" />
              <circle cx="50" cy="52" r="16" fill="#f59e0b" />
              <text x="50" y="58" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#b91c1c" fontFamily="sans-serif">M</text>
              <path d="M26 62 Q20 75 30 78 Q40 78 38 68 Z" fill="#b91c1c" />
              <path d="M74 62 Q80 75 70 78 Q60 78 62 68 Z" fill="#b91c1c" />
              <rect x="25" y="80" width="50" height="4" rx="2" fill="#f59e0b" />
            </svg>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-extrabold tracking-tight text-white drop-shadow-sm font-['Outfit']">
                Muthoot Finance
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-red-950 font-black tracking-tighter">
                iMuthoot
              </span>
            </div>
            <p className="text-[10.5px] text-amber-200/90 font-medium tracking-wide">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-1.5">
          {/* Muthoot Saathi AI Chat Icon */}
          <button
            id="btn-header-saathi"
            onClick={onOpenAssistant}
            className="w-8 h-8 rounded-full bg-red-950/40 hover:bg-red-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300 relative transition-all active:scale-95"
            title="Muthoot Saathi AI Help"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-red-900"></span>
          </button>

          {/* Language Switcher */}
          <button
            id="btn-header-lang"
            onClick={onOpenLangModal}
            className="flex items-center space-x-1 px-2 py-1 rounded-full bg-red-950/40 hover:bg-red-950/60 border border-white/20 text-xs font-semibold transition-all active:scale-95"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] text-white">{langLabels[currentLang]}</span>
            <ChevronDown className="w-3 h-3 text-white/70" />
          </button>

          {/* Notification Bell */}
          <button
            id="btn-header-notifications"
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full bg-red-950/40 hover:bg-red-950/60 border border-white/20 flex items-center justify-center text-white relative transition-all active:scale-95"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-400 text-red-950 rounded-full text-[9px] font-extrabold flex items-center justify-center border-2 border-red-800 shadow-sm animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Logout / Switch User Button */}
          {onLogout && (
            <button
              id="btn-header-logout"
              onClick={onLogout}
              className="w-8 h-8 rounded-full bg-red-950/50 hover:bg-red-950/80 border border-amber-400/40 flex items-center justify-center text-amber-200 transition-all active:scale-95"
              title="Logout / Switch Demo User"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Customer Status Bar */}
      <div className="flex items-center justify-between bg-black/25 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-red-950 flex items-center justify-center font-bold text-xs shadow-inner shrink-0">
            {customerName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 truncate">
              <span className="text-xs font-bold text-white leading-none truncate">
                {customerName}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <div className="flex items-center space-x-2 mt-0.5 text-[10px]">
              <span className="text-amber-200 font-semibold truncate">
                ★ {customerTier}
              </span>
              {customerMobile && (
                <>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80 font-mono">{customerMobile}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Muthoot Reward Points Badge */}
        <button
          id="btn-header-rewards"
          onClick={onOpenRewards}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950 px-2.5 py-1 rounded-lg text-xs font-bold shadow-md active:scale-95 transition-all shrink-0 ml-2"
        >
          <Gift className="w-3.5 h-3.5 text-red-900" />
          <span className="text-[11px]">{rewardsPoints} Pts</span>
        </button>
      </div>
    </header>
  );
};

