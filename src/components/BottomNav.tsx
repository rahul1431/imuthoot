import React from 'react';
import { 
  Home, 
  Wallet, 
  Calculator, 
  Coins, 
  Grid 
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface BottomNavProps {
  activeTab: 'home' | 'loans' | 'calculator' | 'goldRate' | 'services';
  setActiveTab: (tab: 'home' | 'loans' | 'calculator' | 'goldRate' | 'services') => void;
  currentLang: SupportedLanguage;
  activeLoansCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  currentLang,
  activeLoansCount,
}) => {
  const t = translations[currentLang];

  const navItems = [
    {
      id: 'home' as const,
      label: t.home,
      icon: Home,
      badge: null,
    },
    {
      id: 'loans' as const,
      label: t.loans,
      icon: Wallet,
      badge: activeLoansCount > 0 ? activeLoansCount : null,
    },
    {
      id: 'calculator' as const,
      label: t.calculator,
      icon: Calculator,
      badge: null,
    },
    {
      id: 'goldRate' as const,
      label: t.goldRate,
      icon: Coins,
      badge: 'LIVE',
    },
    {
      id: 'services' as const,
      label: t.more,
      icon: Grid,
      badge: null,
    },
  ];

  return (
    <nav className="bg-white border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-40 relative">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-[#b91c1c] font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              {/* Active Indicator Pill */}
              {isActive && (
                <span className="absolute -top-1.5 w-7 h-1 bg-[#b91c1c] rounded-full"></span>
              )}

              {/* Icon Container with Badge */}
              <div className="relative">
                <div
                  className={`p-1 rounded-lg transition-transform ${
                    isActive ? 'scale-110 bg-red-50 text-[#b91c1c]' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-2 text-[9px] font-extrabold px-1 rounded-full ${
                      item.badge === 'LIVE'
                        ? 'bg-amber-500 text-red-950 animate-pulse'
                        : 'bg-[#b91c1c] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
