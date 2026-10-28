'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, TrendingUp, DollarSign, Download, Plus } from 'lucide-react';

export default function AdminFeesPage() {
  const { feeInvoices, institutes } = useApp();

  const totalDemanded = feeInvoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalCollected = feeInvoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOutstanding = feeInvoices.reduce((acc, i) => acc + i.balanceAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">University Fee Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Tuition fee schedules, batch demands, and campus-wide fee reconciliation
          </p>
        </div>

        <button
          onClick={() => alert('New Fee Structure creation dialog')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Configure Fee Schedule</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Fee Demanded</span>
          <div className="text-2xl font-black text-slate-900">{formatCurrency(totalDemanded * 85)}</div>
          <p className="text-[11px] text-slate-400">Current Academic Session 2026-27</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Collected</span>
          <div className="text-2xl font-black text-emerald-600">{formatCurrency(totalCollected * 85)}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">92.4% collection clearance</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase">Outstanding Dues</span>
          <div className="text-2xl font-black text-rose-600">{formatCurrency(totalOutstanding * 85)}</div>
          <p className="text-[11px] text-rose-600 font-semibold">Due cutoff date: Dec 15</p>
        </div>
      </div>

      {/* Fee Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Recent Student Fee Invoices &amp; Receipts</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Invoice Number</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Program / Sem</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Paid Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">{inv.studentName}</td>
                  <td className="py-3.5 px-3 text-slate-600">{inv.programName} (Sem {inv.semesterNumber})</td>
                  <td className="py-3.5 px-3 font-bold">{formatCurrency(inv.totalAmount)}</td>
                  <td className="py-3.5 px-3 font-bold text-emerald-700">{formatCurrency(inv.paidAmount)}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{inv.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
