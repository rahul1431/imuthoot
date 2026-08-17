import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Receipt as ReceiptIcon,
  QrCode
} from 'lucide-react';
import { PaymentTransaction, LoanAccount } from '../../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: PaymentTransaction | null;
  loan?: LoanAccount | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  transaction,
  loan,
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#991b1b] to-red-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <ReceiptIcon className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-extrabold font-['Outfit']">
              Muthoot Tax Invoice & Receipt
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-4 space-y-4 text-slate-800" id="printable-muthoot-receipt">
          {/* Company Brand Watermark Header */}
          <div className="text-center border-b border-slate-200 pb-3">
            <div className="text-sm font-extrabold text-[#b91c1c] tracking-wide font-['Outfit']">
              MUTHOOT FINANCE LIMITED
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              CIN: L65910KL1997PLC011300 • RBI Reg. No: 16.00167
            </div>
            <div className="text-[10px] text-slate-500">
              Registered Office: Muthoot Chambers, Opposite Saritha Theatre, Banerji Road, Kochi - 682018
            </div>
            <div className="mt-2 inline-block px-3 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-extrabold">
              ✓ E-RECEIPT / PAYMENT ACKNOWLEDGMENT
            </div>
          </div>

          {/* Receipt Identification Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 block">Receipt Number</span>
              <span className="font-mono font-bold text-slate-900">{transaction.receiptNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Transaction Date</span>
              <span className="font-bold text-slate-800">{transaction.timestamp}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Customer Name</span>
              <span className="font-bold text-slate-900">Rahul Rathod</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Customer ID</span>
              <span className="font-mono font-bold text-slate-800">MF-89240182</span>
            </div>
          </div>

          {/* Loan Details */}
          <div className="border border-slate-200 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Loan Account No:</span>
              <span className="font-mono font-bold text-[#b91c1c]">{transaction.loanId}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Payment Category:</span>
              <span className="font-bold text-slate-800">{transaction.paymentType.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Payment Channel:</span>
              <span className="font-bold text-slate-800">{transaction.paymentMode}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Bank UTR / Ref No:</span>
              <span className="font-mono text-slate-700">{transaction.utrNumber}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-extrabold pt-1">
              <span className="text-slate-900">Total Amount Received:</span>
              <span className="text-[#b91c1c] font-['Outfit']">₹{transaction.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Verification Barcode & Stamp */}
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-800" />
              </div>
              <div className="text-[9.5px] text-slate-500">
                <div>Digitally signed and cryptographically verified.</div>
                <div className="font-bold text-emerald-700">Valid for Income Tax Sec 80C/Interest Rebate.</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-700">Authorized Signatory</div>
              <div className="text-[8px] text-slate-400">Muthoot Core Finacle Engine</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={() => alert(`Downloaded receipt ${transaction.receiptNumber}.pdf to your device.`)}
              className="flex-1 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => alert('Sending receipt copy to your registered WhatsApp & Email.')}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center space-x-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
