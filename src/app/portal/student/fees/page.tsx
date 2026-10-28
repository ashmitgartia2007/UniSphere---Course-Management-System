'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PrintableReceipt } from '@/components/shared/PrintableReceipt';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';
import { FeeInvoice } from '@/lib/data/types';

export default function StudentFeesPage() {
  const { feeInvoices, payFeeInvoice } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [receiptToPrint, setReceiptToPrint] = useState<FeeInvoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Net Banking' | 'UPI' | 'Credit Card'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{ receiptNumber: string } | null>(null);

  const handleOpenPay = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setPaymentSuccessData(null);
  };

  const handleConfirmPayment = () => {
    if (!selectedInvoice) return;
    setIsProcessing(true);
    setTimeout(() => {
      const res = payFeeInvoice(selectedInvoice.id, selectedInvoice.balanceAmount, paymentMethod);
      setIsProcessing(false);
      setPaymentSuccessData({ receiptNumber: res.receiptNumber });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">University Fee Ledger &amp; Payments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Online tuition payment gateway, semester demands, and verified electronic receipts
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {feeInvoices.map((inv) => {
          const isPaid = inv.status === 'Paid';
          return (
            <div
              key={inv.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{inv.invoiceNumber}</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Semester {inv.semesterNumber} Tuition &amp; Academic Charges ({inv.academicSession})
                  </h3>
                  <p className="text-xs text-slate-500">Due Date: {formatDate(inv.dueDate)}</p>
                </div>

                <div className="flex flex-col sm:items-end justify-between gap-2">
                  <div className="sm:text-right">
                    <span className="text-xs text-slate-500">Demanded Amount:</span>
                    <div className="text-xl font-black text-slate-900">{formatCurrency(inv.totalAmount)}</div>
                    {inv.balanceAmount > 0 && (
                      <span className="text-xs font-bold text-rose-600">
                        Balance Due: {formatCurrency(inv.balanceAmount)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    {isPaid ? (
                      <button
                        onClick={() => setReceiptToPrint(inv)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>View Official Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenPay(inv)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Pay Online Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Fee Component Breakdown Accordion */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Itemized Fee Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {inv.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <span className="text-slate-600">{item.head}</span>
                      <span className="font-bold text-slate-900">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Online Payment Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                UniSphere Secure Payment
              </h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccessData ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Payment Completed!</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Your semester fee of {formatCurrency(selectedInvoice.balanceAmount)} has been credited.
                  </p>
                  <p className="text-xs font-mono font-bold text-blue-700 mt-2 bg-blue-50 py-1 rounded">
                    Receipt: {paymentSuccessData.receiptNumber}
                  </p>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      const updatedInv = feeInvoices.find((i) => i.id === selectedInvoice.id);
                      setSelectedInvoice(null);
                      if (updatedInv) setReceiptToPrint(updatedInv);
                    }}
                    className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Print Receipt
                  </button>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-xs text-slate-500">Payable Balance:</span>
                  <div className="text-2xl font-black text-slate-900">
                    {formatCurrency(selectedInvoice.balanceAmount)}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {selectedInvoice.programName} • Semester {selectedInvoice.semesterNumber}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">Select Payment Method:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['UPI', 'Net Banking', 'Credit Card'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                          paymentMethod === method
                            ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>256-Bit SSL Encrypted University Payment Gateway</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInvoice(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleConfirmPayment}
                    className="px-5 py-2.5 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing Transaction...' : 'Authorize Payment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {receiptToPrint && (
        <PrintableReceipt
          isOpen={Boolean(receiptToPrint)}
          onClose={() => setReceiptToPrint(null)}
          invoice={receiptToPrint}
        />
      )}
    </div>
  );
}
