'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  GraduationCap,
  Briefcase,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CalendarCheck,
  Award,
  CreditCard,
  FolderLock,
  Cpu,
  Scale,
  Terminal,
  Dna,
  Pill,
  CheckCircle2,
  ChevronRight,
  Database,
} from 'lucide-react';

export default function LandingPage() {
  const { institutes, switchRole } = useApp();

  const getInstituteIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-500" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-emerald-500" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-amber-500" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-cyan-500" />;
      case 'Dna':
        return <Dna className="w-6 h-6 text-purple-500" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-rose-500" />;
      default:
        return <Building2 className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-300 bg-clip-text text-transparent">
                UniSphere
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold text-blue-400 bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded-full">
                UNIVERSITY ERP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-300 hover:text-white transition px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/portal/student"
              onClick={() => switchRole('student')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition"
            >
              <span>Open Student Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Next-Generation University Academic &amp; Administrative Management</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-none text-white">
            The Digital Heart of{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              Campus Life
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            UniSphere unites all faculties, institutes, departments, students, and administrators into one unified, enterprise-grade cloud operating system. From biometric attendance and 75% rule compliance to digital hall tickets, Continuous Assessments, and fee management.
          </p>

          {/* 1-Click Demo Persona Launchers */}
          <div className="pt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              1-Click Demo Exploration Portals:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <Link
                href="/portal/student"
                onClick={() => switchRole('student')}
                className="p-3.5 rounded-2xl border border-blue-500/30 bg-blue-950/40 hover:bg-blue-900/40 hover:border-blue-500 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-white">Student Portal</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Aarav Sharma (B.Tech)</p>
              </Link>

              <Link
                href="/portal/faculty"
                onClick={() => switchRole('faculty')}
                className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/40 hover:border-emerald-500 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-white">Faculty Portal</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Dr. Ramesh Verma</p>
              </Link>

              <Link
                href="/portal/department"
                onClick={() => switchRole('department_admin')}
                className="p-3.5 rounded-2xl border border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/40 hover:border-purple-500 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-white">Dean Portal</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Prof. (Dr.) Sunita Rao</p>
              </Link>

              <Link
                href="/portal/admin"
                onClick={() => switchRole('super_admin')}
                className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-950/40 hover:bg-amber-900/40 hover:border-amber-500 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-white">Super Admin</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Registrar Directorate</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Constituent Institutes Section */}
      <section className="py-16 px-4 sm:px-6 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Multi-Institute Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              6 Core Constituent Institutes &amp; Faculties
            </h2>
            <p className="text-xs text-slate-400">
              Each institute operates its dedicated curriculum, faculty council, degree programs, and departmental boards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutes.map((inst) => (
              <div
                key={inst.id}
                className="p-6 rounded-3xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {getInstituteIcon(inst.iconName)}
                  </div>
                  <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-full bg-slate-900 text-blue-400 border border-slate-800">
                    {inst.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {inst.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {inst.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
                  <span>Dean: <strong className="text-slate-200">{inst.deanName.split('(')[0]}</strong></span>
                  <span className="font-bold text-blue-400">{inst.studentCount.toLocaleString()} Students</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Enterprise Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              End-to-End Academic &amp; University Lifecycle
            </h2>
            <p className="text-xs text-slate-400">
              Built for scale, compliance, and real-time operational transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <CalendarCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">Attendance Tracking &amp; 75% Rule</h3>
              <p className="text-slate-400 leading-relaxed">
                Biometric punch logs, subject-wise attendance ledgers, debarment simulators, and medical leave condonation workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Examinations &amp; Digital Hall Tickets</h3>
              <p className="text-slate-400 leading-relaxed">
                Automated seating plans, verified barcodes, attendance-gated eligibility, and printable official admit cards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <CreditCard className="w-6 h-6 text-blue-400" />
              <h3 className="font-bold text-sm text-white">Online Fee Ledger &amp; Receipts</h3>
              <p className="text-slate-400 leading-relaxed">
                Itemized semester breakdown (Tuition, Hostel, Lab), online checkout simulation, and electronic receipts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <h3 className="font-bold text-sm text-white">SGPA &amp; CGPA Transcript Generation</h3>
              <p className="text-slate-400 leading-relaxed">
                Continuous assessment marks, external exams, credit point calculations, and printable grade cards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <FolderLock className="w-6 h-6 text-cyan-400" />
              <h3 className="font-bold text-sm text-white">Digital Locker &amp; Bonafide Vault</h3>
              <p className="text-slate-400 leading-relaxed">
                Apply for signed bonafide credentials, official transcripts, and NOCs with multi-level Dean approval.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <Database className="w-6 h-6 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">PostgreSQL &amp; Supabase RLS</h3>
              <p className="text-slate-400 leading-relaxed">
                Multi-tenant database migrations, strict row-level security policies, and high-fidelity fallback persistence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-slate-300">UniSphere Enterprise University ERP</span>
            <span>• Inspired by Amizone with original modern branding</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/portal/student" className="hover:text-white transition">
              Student Console
            </Link>
            <Link href="/portal/faculty" className="hover:text-white transition">
              Faculty Console
            </Link>
            <Link href="/portal/admin" className="hover:text-white transition">
              Super Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
