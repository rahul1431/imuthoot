import React from 'react';
import { 
  X, 
  Bell, 
  CreditCard, 
  Coins, 
  Gift, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'PAYMENT' | 'OFFER' | 'ALERT' | 'SECURITY';
  isUnread: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickPay: () => void;
  onOpenCoins: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onOpenQuickPay,
  onOpenCoins,
}) => {
  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: 'N1',
      title: 'Interest Payment Due in 8 Days',
      message: 'Monthly interest of ₹3,420 for Loan 0102-GL-884129 is due on 25 Aug 2026. Pay on time for 2% interest rebate.',
      time: '2 hours ago',
      type: 'PAYMENT',
      isUnread: true,
    },
    {
      id: 'N2',
      title: 'Pre-Approved Top-Up Sanctioned',
      message: 'Congratulations! Your gold value has appreciated. You are eligible for ₹65,000 instant top-up without additional gold.',
      time: '1 day ago',
      type: 'OFFER',
      isUnread: true,
    },
    {
      id: 'N3',
      title: 'Gold Rate Morning Update',
      message: '22K Gold opened today at ₹6,920/g (+0.42%). Check live rates and lock coins before price adjustment.',
      time: 'Today, 09:30 AM',
      type: 'ALERT',
      isUnread: false,
    },
    {
      id: 'N4',
      title: 'Vault Security Audit Passed',
      message: 'Your pledged jewellery in Connaught Place Vault #B42 passed quarterly biometric audit. 100% insurance active.',
      time: '3 days ago',
      type: 'SECURITY',
      isUnread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-extrabold font-['Outfit']">
              Notifications & Alerts
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border transition-all ${
                n.isUnread
                  ? 'bg-amber-50/70 border-amber-300/80 shadow-xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-1.5">
                  {n.type === 'PAYMENT' ? (
                    <CreditCard className="w-4 h-4 text-red-600 shrink-0" />
                  ) : n.type === 'OFFER' ? (
                    <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : n.type === 'SECURITY' ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Coins className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                </div>

                <span className="text-[9.5px] text-slate-400 font-medium">{n.time}</span>
              </div>

              <p className="text-[11px] text-slate-600 mt-1 pl-5.5 leading-relaxed">
                {n.message}
              </p>

              {n.type === 'PAYMENT' && (
                <div className="mt-2 pl-5.5">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuickPay();
                    }}
                    className="px-3 py-1 bg-[#b91c1c] text-white rounded-lg text-[10.5px] font-bold shadow-xs"
                  >
                    Pay Interest ₹3,420 Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
