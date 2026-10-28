'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Award,
  Search,
  Filter,
  UserPlus,
  Sparkles,
} from 'lucide-react';

export default function AdminAdmissionsPage() {
  const { admissions, updateAdmissionStatus, enrollApplicant } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = admissions.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.programName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || app.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">University Admissions Engine</h1>
          <p className="text-xs text-slate-500 mt-1">
            Application pipeline, entrance verification, scholarship allocation, and automated enrollment
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by applicant name, application number, or program..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['all', 'Submitted', 'Under Evaluation', 'Interview Scheduled', 'Admission Offered', 'Enrolled'] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Applications Roster */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Applicant &amp; App No</th>
                <th className="py-3 px-3">Target Institute &amp; Program</th>
                <th className="py-3 px-3">Qualifying Score</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Applied Date</th>
                <th className="py-3 px-3">Application Status</th>
                <th className="py-3 px-3 text-right">Admissions Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block">{app.applicantName}</span>
                    <span className="font-mono text-[10px] text-slate-400">{app.applicationNumber}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-900 block">{app.programName}</span>
                    <span className="text-[11px] text-slate-500">{app.instituteName}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-blue-700">
                    {app.qualifyingPercentage}% ({app.qualifyingExam})
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-600">{app.category}</td>
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{app.appliedDate}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'Enrolled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Admission Offered'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    {app.status === 'Admission Offered' ? (
                      <button
                        onClick={() => enrollApplicant(app.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Admit &amp; Enroll</span>
                      </button>
                    ) : app.status === 'Enrolled' ? (
                      <span className="text-emerald-700 font-bold text-xs flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={() => updateAdmissionStatus(app.id, 'Admission Offered', 'Merit offer issued')}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition cursor-pointer"
                      >
                        Issue Offer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
