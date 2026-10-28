'use client';

import React from 'react';
import { BarChart3, TrendingUp, Award, Users, Download } from 'lucide-react';

export default function DepartmentReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Department Academic Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional Performance Analytics, Accreditation Metrics &amp; NAAC / NBA Dossier
          </p>
        </div>

        <button
          onClick={() => alert('Generating full departmental accreditation summary report')}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Dossier (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Average Faculty Rating</span>
          <div className="text-3xl font-black text-slate-900">4.72 / 5.0</div>
          <p className="text-xs text-emerald-600 font-semibold">+0.15 improvement vs previous year</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Campus Placement Rate</span>
          <div className="text-3xl font-black text-slate-900">91.4%</div>
          <p className="text-xs text-emerald-600 font-semibold">Average Package: INR 12.8 LPA</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Scopus Indexed Publications</span>
          <div className="text-3xl font-black text-slate-900">142 Papers</div>
          <p className="text-xs text-purple-600 font-semibold">24 Patents Published in 2026</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-purple-600" />
          Semester Pass Percentage Distribution across Programs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Academic Program</th>
                <th className="py-3 px-3">Total Appeared</th>
                <th className="py-3 px-3">Passed with Distinction</th>
                <th className="py-3 px-3">Overall Pass %</th>
                <th className="py-3 px-3">Backlog Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">B.Tech in Computer Science &amp; Engineering</td>
                <td className="py-3 px-3">740 Students</td>
                <td className="py-3 px-3 font-semibold text-emerald-700">312 Students (42.1%)</td>
                <td className="py-3 px-3 font-black text-blue-700">96.2%</td>
                <td className="py-3 px-3 text-slate-500">3.8%</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">B.Tech in Electronics &amp; Communication</td>
                <td className="py-3 px-3">380 Students</td>
                <td className="py-3 px-3 font-semibold text-emerald-700">128 Students (33.7%)</td>
                <td className="py-3 px-3 font-black text-blue-700">93.4%</td>
                <td className="py-3 px-3 text-slate-500">6.6%</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">B.Tech in Mechanical Engineering</td>
                <td className="py-3 px-3">290 Students</td>
                <td className="py-3 px-3 font-semibold text-emerald-700">84 Students (29.0%)</td>
                <td className="py-3 px-3 font-black text-blue-700">91.8%</td>
                <td className="py-3 px-3 text-slate-500">8.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
