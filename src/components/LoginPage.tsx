import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  RefreshCw, 
  PhoneCall,
  Coins,
  Clock,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { CustomerProfile } from '../types';
import { ranjithRathodCustomer, rahulRathodCustomer } from '../data/mockData';

interface LoginPageProps {
  onLoginSuccess: (user: CustomerProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState('9642629456');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [selectedUser, setSelectedUser] = useState<CustomerProfile>(ranjithRathodCustomer);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit registered mobile number');
      return;
    }
    setErrorMsg('');

    // Check if phone matches Ranjith or Rahul
    if (mobileNumber === '9642629456' || mobileNumber.endsWith('9456')) {
      setSelectedUser(ranjithRathodCustomer);
    } else if (mobileNumber === '9876543210' || mobileNumber.endsWith('3210')) {
      setSelectedUser(rahulRathodCustomer);
    } else {
      // Dynamic profile with this number
      setSelectedUser({
        ...ranjithRathodCustomer,
        mobile: mobileNumber,
        displayName: 'Demo Customer',
        name: 'MUTHOOT CUSTOMER',
      });
    }

    setOtp(['', '', '', '']);
    setStep('OTP');
    setTimer(30);
  };

  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanVal;
    setOtp(newOtp);

    if (errorMsg) setErrorMsg('');

    // Auto-focus next input when digit is typed
    if (cleanVal && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredCode = otp.join('').trim();
    if (enteredCode.length < 4 || !/^\d{4}$/.test(enteredCode)) {
      setErrorMsg('Please enter any 4-digit OTP to continue');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(selectedUser);
    }, 450);
  };

  return (
    <div className="h-full flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-y-auto">
      {/* 1. Top Brand Header */}
      <div className="bg-gradient-to-b from-[#7f1d1d] via-[#991b1b] to-[#b91c1c] text-white pt-6 pb-6 px-5 rounded-b-[28px] shadow-2xl relative overflow-hidden shrink-0">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo Crest */}
            <div className="w-12 h-12 rounded-xl bg-white shadow-xl flex items-center justify-center p-1.5 border border-amber-300">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#b91c1c]" fill="currentColor">
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
                <h1 className="text-lg font-black tracking-tight font-['Outfit']">
                  Muthoot Finance
                </h1>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400 text-red-950 font-black tracking-wider uppercase">
                  iMuthoot
                </span>
              </div>
              <p className="text-[11px] text-amber-200/90 font-medium">
                India's No. 1 Most Trusted Gold Loan
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end text-[10px] text-amber-100/90 space-y-0.5">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>RBI Regulated</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-300/80">
              <Lock className="w-3 h-3" />
              <span>256-Bit SSL</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Middle Visual / Promotional Color Space */}
      <div className="flex-1 px-4 py-4 flex flex-col justify-center max-w-md mx-auto w-full space-y-3">
        {/* Rich Muthoot Gold Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/80 via-amber-950/40 to-slate-900 border border-amber-500/30 p-4 shadow-xl">
          {/* Ambient Glows */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Instant Digital Gold Loan Portal
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live 24x7
              </span>
            </div>

            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight leading-snug">
                Manage, Repay & Renew <br />
                <span className="text-amber-400">Your Gold Loans Online</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Access your pledged gold inventory, sanction letters, and early payment interest rebates with zero branch waiting time.
              </p>
            </div>

            {/* Quick Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-black/30 border border-white/5 rounded-xl p-2 flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">Instant Rebates</div>
                  <div className="text-[9.5px] text-amber-200/80 mt-0.5">Pay early & save on ROI</div>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-2 flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">1-Tap Quick Pay</div>
                  <div className="text-[9.5px] text-emerald-200/80 mt-0.5">UPI, Cards & NetBanking</div>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-2 flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-300 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">Sanction Letters</div>
                  <div className="text-[9.5px] text-slate-400 mt-0.5">Download & view receipts</div>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-2 flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">Doorstep Service</div>
                  <div className="text-[9.5px] text-blue-200/80 mt-0.5">Gold loans at home</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Card: Enter Registered Mobile Number / OTP */}
      <div className="px-4 pb-4 max-w-md mx-auto w-full shrink-0">
        <div className="bg-slate-800/95 backdrop-blur-md rounded-2xl p-4 border border-slate-700/80 shadow-2xl space-y-3">
          {step === 'PHONE' ? (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="input-mobile-number" className="text-xs font-bold text-white">
                    Enter Registered Mobile Number
                  </label>
                  <span className="text-[10px] text-amber-400 font-medium">OTP Verification</span>
                </div>
                
                <div className="flex rounded-xl overflow-hidden border border-slate-600 focus-within:border-amber-400 transition-colors bg-slate-900 shadow-inner">
                  <span className="px-3.5 py-3 bg-slate-800 text-slate-200 font-bold text-xs flex items-center border-r border-slate-700">
                    🇮🇳 +91
                  </span>
                  <input
                    id="input-mobile-number"
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-3.5 py-3 bg-transparent text-white font-mono text-base focus:outline-hidden placeholder-slate-500 tracking-wider font-semibold"
                  />
                </div>
                {errorMsg && (
                  <p className="text-[11px] text-red-400 mt-1 font-medium">{errorMsg}</p>
                )}
              </div>

              <div className="space-y-2">
                <button
                  id="btn-send-otp"
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#b91c1c] via-[#c4122f] to-amber-600 hover:from-[#991b1b] hover:to-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>Get OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10.5px] text-slate-400">
                  By continuing, you agree to Muthoot Finance Terms & Privacy Policy
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Enter 4-Digit OTP</div>
                  <div className="text-[11px] text-slate-400">
                    Sent to <span className="text-amber-300 font-mono font-bold">+91 {mobileNumber}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setStep('PHONE');
                    setErrorMsg('');
                  }}
                  className="text-[11px] text-amber-400 hover:underline font-bold"
                >
                  Change Number
                </button>
              </div>

              {/* 4 OTP Digit Inputs */}
              <div className="flex justify-center space-x-3 py-1">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    placeholder="•"
                    autoFocus={idx === 0}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-xl font-black bg-slate-900 border-2 border-slate-600 focus:border-amber-400 rounded-xl text-white focus:outline-hidden transition-all shadow-inner font-mono placeholder:text-slate-600"
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-[11px] text-red-400 text-center font-medium">{errorMsg}</p>
              )}

              {/* Verify Button */}
              <button
                id="btn-verify-otp"
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="w-full py-3.5 bg-gradient-to-r from-[#b91c1c] via-[#c4122f] to-amber-600 hover:from-[#991b1b] hover:to-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-98 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer uppercase tracking-wider"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Login to iMuthoot</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Didn't receive SMS?</span>
                {timer > 0 ? (
                  <span className="text-slate-500 font-mono">Resend in {timer}s</span>
                ) : (
                  <button
                    onClick={() => {
                      setTimer(30);
                      setErrorMsg('');
                    }}
                    className="text-amber-400 font-bold hover:underline flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Footer Support */}
      <div className="p-3 text-center text-[11px] text-slate-500 border-t border-slate-800/80 shrink-0">
        <div className="flex items-center justify-center space-x-3 text-slate-400">
          <button onClick={() => alert('Muthoot 24x7 Customer Toll-Free: 1800 313 1212')} className="hover:text-amber-400 flex items-center space-x-1">
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>1800 313 1212</span>
          </button>
          <span>•</span>
          <span>5000+ Branches</span>
          <span>•</span>
          <span>CIN: L65910KL1997PLC011300</span>
        </div>
      </div>
    </div>
  );
};
