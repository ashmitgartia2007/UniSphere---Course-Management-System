'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BarChart3, TrendingUp, Users, GraduationCap, DollarSign, Download, PieChart } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { institutes } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Executive Campus Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional census, faculty workloads, admission conversion rates, and revenue dashboards
          </p>
        </div>

        <button
          onClick={() => alert('Exporting full institutional data lake report')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics Dossier (CSV/PDF)</span>
        </button>
      </div>

      {/* Institutes Census Progress Chart / Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          Enrollment Distribution by Constituent Institute
        </h3>

        <div className="space-y-4">
          {institutes.map((inst) => {
            const pct = Math.round((inst.studentCount / 12160) * 100);
            return (
              <div key={inst.id} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    {inst.code} - {inst.name}
                  </span>
                  <span className="font-bold text-blue-700">
                    {inst.studentCount.toLocaleString()} Students ({pct}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Average Campus Attendance</span>
          <div className="text-3xl font-black text-slate-900">86.4%</div>
          <p className="text-xs text-emerald-600 font-semibold">91.8% students meet 75% examination eligibility</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Gross Admissions Conversion</span>
          <div className="text-3xl font-black text-slate-900">68.2%</div>
          <p className="text-xs text-purple-600 font-semibold">+4.2% higher offer acceptance vs 2025</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Digital Hall Ticket Issuance</span>
          <div className="text-3xl font-black text-slate-900">11,840 Issued</div>
          <p className="text-xs text-blue-600 font-semibold">Verified with biometric examination security</p>
        </div>
      </div>
    </div>
  );
}
