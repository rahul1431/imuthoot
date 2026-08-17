import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar,
  Share2
} from 'lucide-react';
import { MuthootBranch } from '../../types';

interface BranchDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: MuthootBranch | null;
}

export const BranchDetailModal: React.FC<BranchDetailModalProps> = ({
  isOpen,
  onClose,
  branch,
}) => {
  if (!isOpen || !branch) return null;

  const [tokenBooked, setTokenBooked] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('');

  const handleBookToken = () => {
    const token = `MF-TOKEN-${Math.floor(100 + Math.random() * 900)}`;
    setTokenNumber(token);
    setTokenBooked(true);
  };

  const handleClose = () => {
    setTokenBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-extrabold font-['Outfit'] truncate max-w-[240px]">
              {branch.name}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 text-slate-800">
          {tokenBooked ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  Priority Branch Token Confirmed!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your electronic token has been registered in the branch queue.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300">
                <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                  Electronic Priority Token
                </div>
                <div className="text-2xl font-black text-red-950 font-mono mt-1">
                  {tokenNumber}
                </div>
                <div className="text-xs font-bold text-amber-900 mt-1">
                  Present this token at Counter 1 for immediate assistance
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-left">
                <div>• Branch: <strong>{branch.name}</strong></div>
                <div>• Manager: <strong>{branch.managerName}</strong></div>
                <div>• Address: <strong>{branch.address}</strong></div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-[#b91c1c] text-white rounded-xl font-bold text-xs shadow-md"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {/* Branch Snapshot */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Branch Code: {branch.code}</span>
                  <span className="text-emerald-700 font-bold px-2 py-0.5 bg-emerald-100 rounded-full text-[10px]">
                    ● Open Today ({branch.distanceKm} km away)
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-start space-x-1.5">
                  <MapPin className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  <span>{branch.address}, {branch.city}, {branch.state} - {branch.pincode}</span>
                </div>

                <div className="text-xs text-slate-600 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{branch.timings}</span>
                </div>

                <div className="text-xs text-slate-600 flex items-center space-x-1.5">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-900">{branch.phone}</span>
                </div>
              </div>

              {/* Manager info */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
                <span className="text-[10px] text-amber-800 font-bold uppercase block">
                  Branch In-Charge & Safe Officer
                </span>
                <div className="font-bold text-slate-900 text-sm">{branch.managerName}</div>
                <div className="text-[10px] text-amber-900">Available for gold evaluation & locker verification</div>
              </div>

              {/* Services available */}
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1.5">
                  Services Available at this Branch
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {branch.servicesAvailable.map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold border border-slate-200"
                    >
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  id="btn-book-branch-token"
                  onClick={handleBookToken}
                  className="w-full py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Electronic Priority Token (Skip Queue)</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => alert(`Opening Google Maps directions to ${branch.name}...`)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs text-center transition-colors"
                  >
                    Get GPS Directions
                  </button>
                  <button
                    onClick={() => alert(`Calling branch manager: ${branch.phone}`)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs text-center transition-colors"
                  >
                    Call Branch
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
