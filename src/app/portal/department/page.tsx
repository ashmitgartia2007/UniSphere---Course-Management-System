'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  BarChart3,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

export default function DepartmentDashboardPage() {
  const { currentUser, institutes, departments, programs, documentRequests, updateDocumentStatus } = useApp();

  const currentInst = institutes.find((i) => i.id === currentUser.instituteId) || institutes[0];
  const pendingRequests = documentRequests.filter((d) => d.status === 'Pending' || d.status === 'Under Review');

  return (
    <div className="space-y-6">
      {/* Dean Institute Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/25 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>Dean Directorate Console • {currentInst.code}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {currentInst.name}
              </h1>
              <p className="text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Dean: <strong className="text-white">{currentInst.deanName}</strong></span>
                <span className="text-slate-500">•</span>
                <span>Campus: {currentInst.campus}</span>
                <span className="text-slate-500">•</span>
                <span>Est: {currentInst.establishedYear}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/portal/department/approvals"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30 flex items-center gap-2 transition"
            >
              <UserCheck className="w-4 h-4" />
              <span>Pending Approvals ({pendingRequests.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Student Enrollment"
          value={`${currentInst.studentCount.toLocaleString()}`}
          subtitle="Active undergraduates &amp; postgrads"
          icon={GraduationCap}
          gradient="from-blue-600 to-indigo-700"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend={{ value: '+8.4%', isPositive: true }}
        />
        <StatCard
          title="Full-Time Faculty"
          value={`${currentInst.facultyCount}`}
          subtitle="Professors, Assoc &amp; Asst Profs"
          icon={Users}
          gradient="from-emerald-500 to-teal-600"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Academic Programs"
          value={`${currentInst.programsCount} Programs`}
          subtitle="B.Tech, M.Tech &amp; Ph.D."
          icon={BookOpen}
          gradient="from-purple-600 to-violet-700"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Semester Pass Percentage"
          value="94.2%"
          subtitle="Examination clearance rate"
          icon={BarChart3}
          gradient="from-amber-500 to-orange-600"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          trend={{ value: '+1.6%', isPositive: true }}
        />
      </div>

      {/* Departments & Approvals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Departments Roster */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Constituent Departments of {currentInst.code}
              </h3>
              <Link
                href="/portal/department/curriculum"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Curriculum Mapping &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {departments
                .filter((d) => d.instituteId === currentInst.id)
                .map((dept) => (
                  <div key={dept.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                          {dept.code}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{dept.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        HOD: <strong>{dept.hodName}</strong> • Email: {dept.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/portal/department/curriculum"
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                      >
                        Programs
                      </Link>
                      <Link
                        href="/portal/department/faculty-list"
                        className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition"
                      >
                        Faculty
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Urgent Approvals Drawer */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-purple-600" />
                Pending Student Requests
              </h3>
              <span className="text-[10px] font-bold bg-purple-50 text-purple-800 px-2 py-0.5 rounded">
                {pendingRequests.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div key={req.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{req.studentName}</span>
                    <span className="text-[10px] text-blue-700 font-semibold">{req.urgency}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">{req.type}</p>
                  <p className="text-[10px] text-slate-500 truncate">{req.purpose}</p>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateDocumentStatus(
                          req.id,
                          'Ready for Download',
                          'Approved by Dean of Academic Affairs'
                        )
                      }
                      className="flex-1 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition cursor-pointer"
                    >
                      Approve &amp; Sign
                    </button>
                    <button
                      onClick={() =>
                        updateDocumentStatus(req.id, 'Rejected', 'Insufficient documentation')
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[11px] transition cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/portal/department/approvals"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
            >
              <span>View All Approvals Archive</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
