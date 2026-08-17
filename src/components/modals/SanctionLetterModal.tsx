import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  FileText, 
  QrCode, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Coins 
} from 'lucide-react';
import { SanctionLetterData } from '../../types';

interface SanctionLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  sanctionData?: SanctionLetterData;
}

export const SanctionLetterModal: React.FC<SanctionLetterModalProps> = ({
  isOpen,
  onClose,
  sanctionData,
}) => {
  if (!isOpen || !sanctionData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end md:items-center justify-center p-0 md:p-3 overflow-y-auto">
      <div className="bg-white rounded-t-3xl md:rounded-2xl w-full max-w-2xl max-h-[94vh] flex flex-col shadow-2xl border border-slate-300 animate-in slide-in-from-bottom-6 duration-200 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-red-950 text-white p-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-red-950 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold font-['Outfit']">
                Muthoot Gold Loan Sanction Letter
              </h3>
              <p className="text-[10px] text-amber-200 font-medium">Customer Copy • Official RBI Regulated Record</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert(`Official Sanction Letter ${sanctionData.loanNumber}.pdf downloaded.`)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sanction Letter Document Body (Replicating exact uploaded physical document) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-[11px] text-slate-900 bg-[#fafafa] font-sans">
          
          {/* Header Title Section */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-2xs space-y-2">
            <div className="flex items-start justify-between border-b border-slate-200 pb-2">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-[#b91c1c] text-base font-['Outfit']">
                    Muthoot Finance
                  </span>
                </div>
                <div className="text-[9.5px] text-slate-500 font-medium">
                  RBI License-Regn.no.-{sanctionData.rbiLicenseNo}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs font-extrabold tracking-tight uppercase text-slate-900">
                  Muthoot Finance Ltd.
                </div>
                <div className="text-[11px] font-bold text-red-800 underline">
                  Loan Sanction Letter
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] px-2 py-0.5 bg-slate-100 border border-slate-300 rounded font-bold text-slate-700 block">
                  Customer Copy
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">GL-A11</span>
              </div>
            </div>

            {/* Branch & Sanction Date Info */}
            <div className="flex items-center justify-between text-[10px] text-slate-700 font-medium px-1">
              <div>
                <span className="font-bold">Sanction Date:</span> {sanctionData.sanctionDate}
              </div>
              <div className="font-bold text-slate-900 uppercase">
                {sanctionData.branchName} ({sanctionData.branchCode})
              </div>
              <div className="text-right">
                <span>Ph: {sanctionData.branchPhone}</span>
                <div className="text-[9px] text-slate-500 font-mono">GSTIN: {sanctionData.branchGstin}</div>
              </div>
            </div>
          </div>

          {/* Primary Table: Customer & Loan Terms */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
            <table className="w-full border-collapse text-left">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="w-28 p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Customer ID</td>
                  <td className="p-2 font-mono font-bold text-slate-900 border-r border-slate-200">{sanctionData.customerId}</td>
                  <td className="w-28 p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Facility</td>
                  <td className="p-2 font-bold text-slate-900">{sanctionData.facility}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">CRM code</td>
                  <td className="p-2 font-mono font-semibold text-slate-800 border-r border-slate-200">{sanctionData.crmCode}</td>
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Selected Scheme</td>
                  <td className="p-2 font-extrabold text-[#b91c1c]">{sanctionData.selectedScheme}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td rowSpan={4} className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px] align-top">
                    Name & Address
                  </td>
                  <td rowSpan={4} className="p-2 border-r border-slate-200 text-[10.5px] align-top space-y-0.5">
                    <div className="font-extrabold text-slate-900">{sanctionData.customerName}</div>
                    <div className="text-slate-600 leading-tight">{sanctionData.address}</div>
                    <div className="text-[10px] font-bold text-emerald-800 pt-1">
                      Ph:,Mob No.XXXXXX{sanctionData.mobile.slice(-4)}
                    </div>
                  </td>
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Loan Number</td>
                  <td className="p-2 font-mono font-extrabold text-slate-900">{sanctionData.loanNumber}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Amount (Rs)</td>
                  <td className="p-2 text-sm font-black text-[#b91c1c] font-['Outfit']">
                    ₹{sanctionData.sanctionAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Period of Loan</td>
                  <td className="p-2 font-bold text-slate-800">{sanctionData.periodMonths} Months</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Principal due date</td>
                  <td className="p-2 font-mono font-bold text-slate-800">{sanctionData.principalDueDate}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Payment mode</td>
                  <td className="p-2 font-bold text-slate-800 border-r border-slate-200">{sanctionData.paymentMode}</td>
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Rate of interest</td>
                  <td className="p-2 font-bold text-slate-900">{sanctionData.rateOfInterest} (upto 12 months)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-slate-50 border-r border-slate-200 text-[10.5px]">Mode of computation</td>
                  <td colSpan={3} className="p-2 font-semibold text-slate-700">
                    {sanctionData.modeOfComputation} • Effective Annualized Rate (365 days): <span className="font-bold text-slate-900">{sanctionData.annualizedRatePct}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Early Payment Interest Rebate Table */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
            <div className="bg-amber-50/80 px-3 py-1.5 border-b border-amber-200 text-[10.5px] font-bold text-amber-950">
              ★ Rebate for early payment of interest is available as given in the chart below:
            </div>
            <table className="w-full text-[10.5px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-2 font-bold border-r border-slate-200">If paid within</th>
                  <th className="p-2 font-bold border-r border-slate-200 text-center">Rebate*</th>
                  <th className="p-2 font-bold text-right">Effective Rate Of Interest</th>
                </tr>
              </thead>
              <tbody>
                {sanctionData.rebateTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="p-2 font-medium text-slate-800 border-r border-slate-200">{row.period}</td>
                    <td className="p-2 font-bold text-emerald-700 text-center border-r border-slate-200">{row.rebatePct}</td>
                    <td className="p-2 font-bold text-slate-900 text-right">{row.effectiveRatePct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-2 bg-slate-50 text-[9.5px] text-slate-500 border-t border-slate-200">
              *Above rebate is applicable, only if upto date interest is paid on the loan on or before due date.
            </div>
          </div>

          {/* Particulars of Gold Ornaments Table */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-2xs overflow-hidden">
            <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 text-[10.5px] font-bold text-slate-800 flex items-center justify-between">
              <span>Particulars of Gold Ornaments Pledged</span>
              <span className="text-[10px] text-slate-500 font-normal">7 Items Verified by Certified Evaluator</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-1.5 font-bold border-r border-slate-200">Particulars of ornament</th>
                    <th className="p-1.5 font-bold border-r border-slate-200 text-center">No. of Items</th>
                    <th className="p-1.5 font-bold border-r border-slate-200 text-right">Gross Wt (g)</th>
                    <th className="p-1.5 font-bold border-r border-slate-200 text-right">Deductions (g)</th>
                    <th className="p-1.5 font-bold border-r border-slate-200 text-right">Net Wt (g)</th>
                    <th className="p-1.5 font-bold border-r border-slate-200 text-right">Rate/g (₹)</th>
                    <th className="p-1.5 font-bold text-right">Eligible Loan (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {sanctionData.ornaments.map((orn, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-1.5 font-bold text-slate-900 border-r border-slate-200">{orn.name}</td>
                      <td className="p-1.5 text-center font-bold border-r border-slate-200">{orn.itemsCount}</td>
                      <td className="p-1.5 text-right font-mono border-r border-slate-200">{orn.grossWeight.toFixed(3)}</td>
                      <td className="p-1.5 text-right font-mono text-slate-500 border-r border-slate-200">{orn.stoneDeductions.toFixed(3)}</td>
                      <td className="p-1.5 text-right font-mono font-bold text-slate-900 border-r border-slate-200">{orn.netWeight.toFixed(3)}</td>
                      <td className="p-1.5 text-right font-mono border-r border-slate-200">{orn.ratePerGram}</td>
                      <td className="p-1.5 text-right font-mono font-bold text-slate-900">₹{orn.eligibleAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50/60 font-bold border-t-2 border-slate-300">
                    <td className="p-1.5 text-slate-900 border-r border-slate-200">TOTAL ITEMS</td>
                    <td className="p-1.5 text-center text-slate-900 border-r border-slate-200">{sanctionData.totalItems}</td>
                    <td className="p-1.5 text-right font-mono border-r border-slate-200">{sanctionData.totalGrossWeight.toFixed(3)}</td>
                    <td className="p-1.5 text-right font-mono text-slate-500 border-r border-slate-200">{sanctionData.totalDeductions.toFixed(3)}</td>
                    <td className="p-1.5 text-right font-mono text-[#b91c1c] font-black border-r border-slate-200">{sanctionData.totalNetWeight.toFixed(3)}</td>
                    <td className="p-1.5 text-right border-r border-slate-200">—</td>
                    <td className="p-1.5 text-right font-mono text-slate-900 font-extrabold">₹{sanctionData.eligibleLoanAmount.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Schedule of Charges */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-300 text-[10px] space-y-1">
            <div className="font-bold text-slate-800">Schedule of charges (Inclusive of GST@18%):</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <div>• Service Charge: <strong>Rs. {sanctionData.serviceCharge}/-</strong></div>
              <div>• Security Charge: <strong>Rs. {sanctionData.securityCharge}/-</strong></div>
              <div>• SMS Charge: <strong>Rs. {sanctionData.smsCharge}/-</strong></div>
              <div>• Token Lost Charge: <strong>Rs. {sanctionData.tokenLostCharge}/-</strong></div>
            </div>
            <div className="text-[9.5px] text-slate-500">
              Postage Charges: 1st (6 month) Rs. {sanctionData.postageCharge6M}/- • 2nd (9 month) Rs. {sanctionData.postageCharge9M}/-
            </div>
          </div>

          {/* Demand Promissory Note & Signatures */}
          <div className="bg-white p-3 rounded-xl border border-slate-300 space-y-2">
            <div className="text-center font-bold text-[10.5px] uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              Demand Promissory Note
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
              <span>Rate of Interest: 24% P.A.</span>
              <span>Date: 21/03/2022 02:17 PM</span>
              <span className="font-bold text-slate-900">Rs. 194,000</span>
            </div>
            <p className="text-[10px] text-slate-700 leading-relaxed italic">
              "On demand, I promise to pay MUTHOOT FINANCE LTD or order, the sum of Rs. 194,000 (Rupees One Lakh Ninety Four Thousand only) for value received along with interest per annum at the rate mentioned above with monthly rests from this day till the date of repayment in full."
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="space-y-1">
                <div className="w-24 h-7 border border-dashed border-slate-300 rounded flex items-center justify-center text-[9px] text-slate-400 font-mono">
                  [Branch Stamp]
                </div>
                <div className="text-[9.5px] font-bold text-slate-800">Branch Manager</div>
                <div className="text-[8.5px] text-slate-500">Sangareddy (00878)</div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <div className="text-[9px] text-slate-500">
                  <div>Cryptographically signed.</div>
                  <div className="font-mono">TPP: {sanctionData.tppNo}</div>
                  <div className="font-mono">CRM: {sanctionData.crmLeadId}</div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="w-28 h-7 border border-dashed border-emerald-300 bg-emerald-50/50 rounded flex items-center justify-center text-[9px] text-emerald-800 font-bold font-mono">
                  ✓ Digitally Signed
                </div>
                <div className="text-[9.5px] font-bold text-slate-800">Pathloth Ranjith Rathod</div>
                <div className="text-[8.5px] text-slate-500">Borrower Signature</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => alert(`Downloaded official Muthoot Sanction Letter for Loan ${sanctionData.loanNumber}`)}
              className="flex-1 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Sanction PDF</span>
            </button>
            <button
              onClick={() => alert('Sending sanction copy to your registered WhatsApp & Email.')}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center space-x-1"
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
