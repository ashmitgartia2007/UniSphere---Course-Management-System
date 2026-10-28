'use client';

import React from 'react';
import { FeeInvoice } from '@/lib/data/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Printer, X, CheckCircle2 } from 'lucide-react';

interface PrintableReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: FeeInvoice;
}

export function PrintableReceipt({ isOpen, onClose, invoice }: PrintableReceiptProps) {
  if (!isOpen) return null;

  const payment = invoice.payments[invoice.payments.length - 1];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8">
        {/* Actions bar */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">Official Fee Payment Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher */}
        <div className="p-8 space-y-6 print-card bg-white text-slate-900">
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h1 className="text-2xl font-black uppercase text-slate-900">UniSphere University</h1>
            <p className="text-xs font-semibold text-slate-600">
              Finance & Accounts Directorate • Sector 125, Noida, Uttar Pradesh - 201313
            </p>
            <div className="mt-2 inline-block bg-slate-100 border border-slate-300 px-3 py-1 rounded text-xs font-bold text-slate-800 uppercase tracking-widest">
              OFFICIAL PAYMENT RECEIPT (STUDENT COPY)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
            <div>
              <p className="text-slate-500">Receipt Number:</p>
              <p className="font-bold text-slate-900 font-mono text-sm">
                {payment?.receiptNumber || 'RCPT/2026/ASET/5831'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Payment Date:</p>
              <p className="font-bold text-slate-900">{formatDate(payment?.date || invoice.issueDate)}</p>
            </div>
            <div>
              <p className="text-slate-500">Student Name:</p>
              <p className="font-bold text-slate-900">{invoice.studentName}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Enrollment / Roll No:</p>
              <p className="font-bold text-slate-900 font-mono">{invoice.enrollmentNumber}</p>
            </div>
            <div>
              <p className="text-slate-500">Program / Semester:</p>
              <p className="font-bold text-slate-900">{invoice.programName} (Sem {invoice.semesterNumber})</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Transaction ID:</p>
              <p className="font-bold text-slate-900 font-mono">{payment?.transactionId || 'HDFC89123847291'}</p>
            </div>
          </div>

          {/* Breakdown table */}
          <div>
            <table className="w-full text-xs">
              <thead className="bg-slate-100 border-y border-slate-300 font-bold text-slate-800">
                <tr>
                  <th className="py-2 text-left">Fee Component Head</th>
                  <th className="py-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.breakdown.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 text-slate-700">{item.head}</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-slate-800 font-bold">
                <tr>
                  <td className="py-2 text-slate-900">Total Demanded Amount:</td>
                  <td className="py-2 text-right text-slate-900">{formatCurrency(invoice.totalAmount)}</td>
                </tr>
                <tr className="text-emerald-700">
                  <td className="py-1">Amount Paid:</td>
                  <td className="py-1 text-right">{formatCurrency(invoice.paidAmount)}</td>
                </tr>
                <tr className="text-slate-500 text-[11px]">
                  <td className="py-1">Balance Remaining:</td>
                  <td className="py-1 text-right">{formatCurrency(invoice.balanceAmount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Stamp & Verification */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <div className="border-2 border-emerald-600 rounded-lg p-2 text-center text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
              <div>UniSphere Accounts</div>
              <div className="text-xs">PAID & VERIFIED</div>
              <div>ELECTRONICALLY VALID</div>
            </div>

            <div className="text-right text-xs">
              <div className="font-serif italic font-bold text-slate-800">Finance Officer</div>
              <div className="border-t border-slate-400 pt-1 text-[11px] text-slate-500">
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
