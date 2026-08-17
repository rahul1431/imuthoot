import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface AiSaathiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickPay: () => void;
  onOpenDoorstepModal: () => void;
  onOpenCalculator: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: { label: string; action: () => void }[];
}

export const AiSaathiModal: React.FC<AiSaathiModalProps> = ({
  isOpen,
  onClose,
  onOpenQuickPay,
  onOpenDoorstepModal,
  onOpenCalculator,
}) => {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste Rahul! I am Muthoot Saathi, your 24x7 AI Gold Loan & Financial Assistant. How may I assist you today with your loans, gold rates, or payments?',
      options: [
        { label: '🪙 Today\'s Gold Valuation', action: () => handlePreset('How is gold value calculated today?') },
        { label: '🚚 Doorstep Loan Process', action: () => handlePreset('How does Muthoot @ Home doorstep service work?') },
        { label: '📑 KYC Documents Required', action: () => handlePreset('What documents are required for a gold loan?') },
        { label: '💰 Interest Rebate Benefit', action: () => handlePreset('How does the monthly interest rebate work?') },
      ],
    },
  ]);

  const handlePreset = (query: string) => {
    handleSend(query);
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let replyText = '';
      let replyOptions: { label: string; action: () => void }[] | undefined = undefined;

      const lower = q.toLowerCase();

      if (lower.includes('rate') || lower.includes('value') || lower.includes('gram') || lower.includes('how much')) {
        replyText = `Today's 22 Karat Gold Rate is ₹6,920/gram in Delhi NCR. Under RBI guidelines, you can get up to 75% LTV (Loan-to-Value) which amounts to approximately ₹5,190 per gram sanctioned instantly!`;
        replyOptions = [
          { label: 'Open Loan Calculator', action: () => { onClose(); onOpenCalculator(); } },
          { label: 'Book Doorstep Evaluation', action: () => { onClose(); onOpenDoorstepModal(); } },
        ];
      } else if (lower.includes('doorstep') || lower.includes('home') || lower.includes('visit')) {
        replyText = `With Muthoot @ Home, our certified gold evaluator visits your residence with electronic carat scales and mobile biometric device. Your loan is appraised and the money is transferred to your bank account via UPI in under 30 minutes!`;
        replyOptions = [
          { label: 'Schedule Doorstep Visit Now', action: () => { onClose(); onOpenDoorstepModal(); } },
        ];
      } else if (lower.includes('kyc') || lower.includes('document') || lower.includes('pan') || lower.includes('aadhaar')) {
        replyText = `Muthoot Gold Loans require minimal documentation:\n1. Proof of Identity: Aadhaar Card / Voter ID / Passport / Driving License\n2. Proof of Address: Electricity bill / Gas connection\n3. PAN Card (for loans above ₹50,000)\n\nNo income proof or CIBIL score checks are mandatory!`;
      } else if (lower.includes('rebate') || lower.includes('interest') || lower.includes('save') || lower.includes('discount')) {
        replyText = `Under the Muthoot Super Value scheme, paying your monthly interest on or before the due date earns you an attractive interest rebate of up to 2.0% p.a., bringing your effective borrowing cost down to just 9.9% p.a.!`;
        replyOptions = [
          { label: 'Pay Active Loan Interest', action: () => { onClose(); onOpenQuickPay(); } },
        ];
      } else if (lower.includes('locker') || lower.includes('safe') || lower.includes('security')) {
        replyText = `Your gold ornaments are stored in 100% insured, bank-grade high-security vault safes protected by 24x7 armed surveillance, dual-key electronic locking, and seismic sensors. You receive complete insurance coverage against burglary or loss.`;
      } else {
        replyText = `I understand your query regarding "${q}". Muthoot Finance provides instant gold loans starting from ₹1,500 up to ₹1 Crore with flexible tenures, lowest interest rates from 9.9% p.a., and zero prepayment penalty. Would you like to calculate your eligible amount or pay active loan interest?`;
        replyOptions = [
          { label: 'Calculate My Gold Loan', action: () => { onClose(); onOpenCalculator(); } },
          { label: 'Pay Active Interest', action: () => { onClose(); onOpenQuickPay(); } },
        ];
      }

      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: replyText,
        options: replyOptions,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md h-[85vh] flex flex-col shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#991b1b] via-red-800 to-red-950 text-white p-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-red-950 flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5 text-red-950" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-extrabold font-['Outfit']">
                  Muthoot Saathi AI
                </h3>
                <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full">
                  Online
                </span>
              </div>
              <p className="text-[10px] text-amber-200">24x7 Intelligent Gold Loan Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {msg.sender === 'ai' ? (
                <div className="w-7 h-7 rounded-full bg-[#b91c1c] text-white flex items-center justify-center text-xs shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs shrink-0 shadow-xs font-bold">
                  R
                </div>
              )}

              <div className={`max-w-[80%] space-y-2`}>
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#b91c1c] text-white rounded-tr-xs shadow-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Interactive Action Buttons */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={opt.action}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-white hover:bg-red-50 text-[#b91c1c] border border-red-200 shadow-xs transition-all active:scale-95 text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask anything about Gold Loans, Rates or Payments..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="p-2 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] disabled:bg-slate-300 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
