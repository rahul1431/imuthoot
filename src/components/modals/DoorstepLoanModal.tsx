import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Coins, 
  Sparkles,
  ArrowRight,
  Phone
} from 'lucide-react';
import { DoorstepBooking } from '../../types';

interface DoorstepLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (booking: DoorstepBooking) => void;
}

export const DoorstepLoanModal: React.FC<DoorstepLoanModalProps> = ({
  isOpen,
  onClose,
  onBookingComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState('Flat 402, Block C, Royal Palm Heights, Connaught Place');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState('110001');
  const [weightGrams, setWeightGrams] = useState(40);
  const [expectedAmount, setExpectedAmount] = useState(150000);
  const [date, setDate] = useState('Tomorrow, 18 Aug 2026');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    const newBooking: DoorstepBooking = {
      id: `DS-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingRef: `MF-HOME-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName: 'Rahul Rathod',
      phone: '+91 98765 43210',
      address,
      city,
      pincode,
      date,
      timeSlot,
      estimatedWeightGrams: weightGrams,
      expectedLoanAmount: expectedAmount,
      executiveName: 'Sunil Kumar (Muthoot Verified Evaluator #412)',
      executivePhone: '+91 98110 55443',
      status: 'EXECUTIVE_ASSIGNED',
    };

    setIsSuccess(true);
    onBookingComplete(newBooking);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-red-950 flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold font-['Outfit']">
                Muthoot Gold Loan @ Home
              </h3>
              <p className="text-[10.5px] text-red-200">Free doorstep evaluation & 30-min payout</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {isSuccess ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  Doorstep Visit Confirmed!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Muthoot Certified Gold Evaluator assigned to your residence.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold text-slate-800">{date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Time Slot:</span>
                  <span className="font-bold text-slate-800">{timeSlot}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Assigned Evaluator:</span>
                  <span className="font-bold text-emerald-700">Sunil Kumar (#412)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  📍 {address}, {city} - {pincode}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 text-left border border-amber-200">
                💡 <strong>Evaluator Kit:</strong> Equipped with precision electronic carat-scale, acid-testing touchstone, and digital tablet for instantaneous bank transfer.
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-[#b91c1c] text-white rounded-xl font-bold text-xs shadow-md"
              >
                Track on Services Tab
              </button>
            </div>
          ) : (
            /* MULTI-STEP BOOKING FORM */
            <div className="space-y-4">
              {/* Step indicator */}
              <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500 border-b border-slate-100 pb-2">
                <span className={step === 1 ? 'text-[#b91c1c]' : ''}>1. Address</span>
                <span>→</span>
                <span className={step === 2 ? 'text-[#b91c1c]' : ''}>2. Gold Info</span>
                <span>→</span>
                <span className={step === 3 ? 'text-[#b91c1c]' : ''}>3. Slot</span>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Residence Address
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">Pincode</label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-2.5 bg-[#b91c1c] text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-1"
                  >
                    <span>Next: Gold Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-800">
                        Approximate Gold Weight
                      </label>
                      <span className="text-xs font-bold text-[#b91c1c]">{weightGrams} grams</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={weightGrams}
                      onChange={(e) => setWeightGrams(Number(e.target.value))}
                      className="w-full accent-[#b91c1c]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Expected Loan Required (₹)
                    </label>
                    <input
                      type="number"
                      value={expectedAmount}
                      onChange={(e) => setExpectedAmount(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <div className="text-[10px] text-slate-500 mt-1">
                      Estimated sanction: up to ₹{Math.round(weightGrams * 6920 * 0.75).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-2/3 py-2.5 bg-[#b91c1c] text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-1"
                    >
                      <span>Next: Time Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Select Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Today (Urgent)', 'Tomorrow, 18 Aug', 'Wednesday, 19 Aug', 'Thursday, 20 Aug'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDate(d)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                            date === d
                              ? 'bg-red-50 text-[#b91c1c] border-[#b91c1c] ring-1 ring-[#b91c1c]'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Select 2-Hour Time Window
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${
                            timeSlot === slot
                              ? 'bg-red-50 text-[#b91c1c] border-[#b91c1c] ring-1 ring-[#b91c1c]'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-1/3 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      id="btn-confirm-doorstep"
                      onClick={handleSubmit}
                      className="w-2/3 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl font-extrabold text-xs shadow-md transition-all active:scale-95"
                    >
                      Confirm Free Home Visit
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
