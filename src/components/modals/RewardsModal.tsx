import React, { useState } from 'react';
import { 
  X, 
  Gift, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Percent, 
  ArrowRight 
} from 'lucide-react';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  points,
}) => {
  if (!isOpen) return null;

  const [redeemed, setRedeemed] = useState<string | null>(null);

  const rewards = [
    {
      id: 'R1',
      title: '₹500 Interest Rebate Voucher',
      pointsCost: 1000,
      category: 'Loan Discount',
      desc: 'Deduct ₹500 from your upcoming monthly interest payment.',
    },
    {
      id: 'R2',
      title: '0.5g 24K Gold Coin Discount (₹2,500 off)',
      pointsCost: 1200,
      category: 'Gold Coin',
      desc: 'Special discount coupon applicable on any Muthoot 24K pure gold coin order.',
    },
    {
      id: 'R3',
      title: 'Zero Processing Fee Waiver Coupon',
      pointsCost: 500,
      category: 'Fee Waiver',
      desc: '100% waiver on documentation & appraiser fees on your next new gold loan.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-red-950 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-red-900" />
            <div>
              <h3 className="text-sm font-black font-['Outfit']">
                Muthoot Rewards Club
              </h3>
              <p className="text-[10.5px] text-red-900/80 font-semibold">Tier: Muthoot Gold Elite</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-red-950 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3.5 rounded-2xl border border-amber-300 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider block">
                Available Reward Balance
              </span>
              <span className="text-2xl font-black text-red-950 font-['Outfit']">
                {points} Points
              </span>
            </div>
            <div className="text-right text-[10px] text-amber-800 font-medium">
              Earn 10 points on every<br />₹100 interest paid
            </div>
          </div>

          {/* Catalog */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Redeemable Offers & Vouchers
            </span>

            {rewards.map((r) => (
              <div
                key={r.id}
                className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full">
                    {r.category}
                  </span>
                  <span className="text-xs font-extrabold text-[#b91c1c]">
                    {r.pointsCost} Pts
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{r.title}</h4>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">{r.desc}</p>
                </div>

                <button
                  onClick={() => setRedeemed(r.title)}
                  disabled={points < r.pointsCost}
                  className="w-full py-1.5 bg-[#b91c1c] hover:bg-[#991b1b] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  {redeemed === r.title ? '✓ Voucher Activated!' : `Redeem for ${r.pointsCost} Pts`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
