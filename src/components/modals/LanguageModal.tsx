import React from 'react';
import { X, CheckCircle2, Globe } from 'lucide-react';
import { SupportedLanguage } from '../../types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

const languages: { id: SupportedLanguage; name: string; nativeName: string }[] = [
  { id: 'en', name: 'English', nativeName: 'English' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-extrabold font-['Outfit']">
              Choose Language / भाषा चुनें
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Options */}
        <div className="p-4 space-y-2">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onSelectLang(l.id);
                onClose();
              }}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                currentLang === l.id
                  ? 'bg-red-50/80 border-[#b91c1c] text-[#b91c1c] font-bold shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div>
                <div className="text-sm font-bold">{l.nativeName}</div>
                <div className="text-[11px] text-slate-500 font-normal">{l.name}</div>
              </div>

              {currentLang === l.id && (
                <CheckCircle2 className="w-5 h-5 text-[#b91c1c]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
