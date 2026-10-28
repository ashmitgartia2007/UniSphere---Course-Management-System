'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import {
  Building,
  GraduationCap,
  Users,
  CreditCard,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminDashboardPage() {
  const { institutes, allUsers, admissions, feeInvoices } = useApp();

  const totalStudents = institutes.reduce((acc, i) => acc + i.studentCount, 0);
  const totalFaculty = institutes.reduce((acc, i) => acc + i.facultyCount, 0);
  const pendingAdmissions = admissions.filter((a) => a.status === 'Submitted' || a.status === 'Under Evaluation');

  return (
    <div className="space-y-6">
      {/* Chancellor / Registrar Secretariat Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-600/30 border border-amber-400/40 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/25 border border-amber-400/30 text-amber-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Central Governance • Senate House Directorate</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                UniSphere University Administration
              </h1>
              <p className="text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Campuses: Noida (Main), Lucknow, Dubai</span>
                <span className="text-slate-500">•</span>
                <span>Active Session: 2026-2027 (Odd Term)</span>
                <span className="text-slate-500">•</span>
                <span>6 Core Constituent Institutes</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/portal/admin/institutes"
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/30 flex items-center gap-2 transition"
            >
              <Building className="w-4 h-4" />
              <span>Manage Institutes &amp; Programs</span>
            </Link>
            <Link
              href="/portal/admin/admissions"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/15 flex items-center gap-1.5 transition"
            >
              <span>Admissions Engine</span>
              <ArrowUpRight className="w-4 h-4 opacity-75" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Constituent Institutes"
          value={`${institutes.length} Institutes`}
          subtitle="ABS, ALS, ASET, AIIT, AIB, AIP"
          icon={Building}
          gradient="from-amber-600 to-orange-700"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Total Student Census"
          value={`${totalStudents.toLocaleString()} Students`}
          subtitle="Enrolled across 24 programs"
          icon={GraduationCap}
          gradient="from-blue-600 to-indigo-700"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend={{ value: '+12.5% YoY', isPositive: true }}
        />
        <StatCard
          title="University Faculty"
          value={`${totalFaculty} Members`}
          subtitle="1:21 Faculty to Student Ratio"
          icon={Users}
          gradient="from-emerald-500 to-teal-600"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Admissions In Pipeline"
          value={`${pendingAdmissions.length} Pending`}
          subtitle="Active application window"
          icon={CreditCard}
          gradient="from-purple-600 to-violet-700"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Institutes Overview Cards Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">University Institutes Directory</h3>
            <p className="text-xs text-slate-500">
              Overview of all 6 faculties, deans, student counts, and active academic programs
            </p>
          </div>
          <Link
            href="/portal/admin/institutes"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Configure Institutes</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {institutes.map((inst) => (
            <div
              key={inst.id}
              className="p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  {inst.code}
                </span>
                <span className="text-xs font-semibold text-slate-500">Est. {inst.establishedYear}</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{inst.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{inst.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Dean:</span>
                  <span className="font-semibold text-slate-900">{inst.deanName.split('(')[0]}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Students:</span>
                  <span className="font-bold text-blue-700">{inst.studentCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Faculty:</span>
                  <span className="font-semibold text-slate-900">{inst.facultyCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
