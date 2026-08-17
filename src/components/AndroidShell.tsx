import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  RotateCw,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface AndroidShellProps {
  children: React.ReactNode;
  activeTab: string;
  onOpenAssistant: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const AndroidShell: React.FC<AndroidShellProps> = ({
  children,
  activeTab,
  onOpenAssistant,
  onOpenNotifications,
  unreadNotificationsCount,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFrameMode, setIsFrameMode] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-950 flex flex-col items-center justify-center p-0 md:p-4 text-slate-100 font-sans">
      {/* Desktop Top Control Bar */}
      <header className="w-full max-w-5xl mx-auto mb-3 hidden md:flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-md shadow-red-900/40 border border-red-500/30">
            <span className="font-extrabold text-amber-300 text-lg">M</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white tracking-wide text-sm">iMuthoot Android Showcase</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">v6.4.2 Official</span>
            </div>
            <p className="text-xs text-slate-400">Muthoot Finance Gold Loans • Bharat Ka Bharosa</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick AI Assistant Trigger */}
          <button
            id="btn-desktop-saathi"
            onClick={onOpenAssistant}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-semibold transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Muthoot Saathi AI</span>
          </button>

          {/* Device Frame Mode Toggle */}
          <button
            id="btn-toggle-frame"
            onClick={() => setIsFrameMode(!isFrameMode)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700/60"
            title="Toggle Android Device Frame"
          >
            {isFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Mobile View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-red-400" />
                <span>Android Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container: Android Phone Shell or Full Mobile App */}
      <main
        className={`w-full transition-all duration-300 flex flex-col ${
          isFrameMode
            ? 'max-w-[420px] h-[840px] max-h-[94vh] rounded-[44px] ring-12 ring-slate-800/90 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-4 border-slate-700/80 my-0 md:my-2 overflow-hidden bg-slate-950'
            : 'max-w-md md:max-w-xl h-[95vh] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden bg-slate-950'
        }`}
      >
        {/* Android Device Status Bar */}
        <div className="bg-[#b91c1c] text-white px-5 pt-3 pb-2 flex items-center justify-between select-none relative z-50 shrink-0">
          {/* Time */}
          <div className="text-xs font-bold tracking-tight text-white/95">
            {currentTime || '11:45'}
          </div>

          {/* Camera Notch / Hole Punch (in frame mode) */}
          {isFrameMode && (
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-3.5 h-3.5 bg-black rounded-full border border-slate-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-blue-900/60 rounded-full"></div>
            </div>
          )}

          {/* Android Status Icons */}
          <div className="flex items-center space-x-2 text-white/90">
            <span className="text-[10px] font-bold tracking-wider px-1 bg-black/20 rounded">5G</span>
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center space-x-1">
              <span className="text-[10px] font-semibold">94%</span>
              <Battery className="w-4 h-4 fill-white/80" />
            </div>
          </div>
        </div>

        {/* Dynamic App Content */}
        <div className="flex-1 min-h-0 flex flex-col relative overflow-hidden bg-slate-900">
          {children}
        </div>

        {/* Android Navigation Pill / Home Indicator */}
        <div className="bg-slate-950 text-slate-500 py-2 flex items-center justify-center select-none shrink-0 border-t border-slate-900">
          <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </main>

      {/* Desktop Footer Info */}
      <footer className="w-full max-w-5xl mx-auto mt-3 hidden md:flex items-center justify-between text-xs text-slate-400 px-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Muthoot Core Banking & RBI Gold Price API: Connected</span>
          </span>
          <span>•</span>
          <span>5,000+ Branches Nationwide</span>
          <span>•</span>
          <span>100% Insured Bank-Grade Locker Safes</span>
        </div>
        <div className="text-slate-400 font-medium">
          Official iMuthoot Mobile Experience
        </div>
      </footer>
    </div>
  );
};
