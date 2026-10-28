'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import {
  Users,
  CalendarCheck,
  BookOpen,
  FileCheck,
  Clock,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  Award,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

export default function FacultyDashboardPage() {
  const { currentUser, offerings, assessments, submissions } = useApp();

  const pendingSubmissions = submissions.filter((s) => s.status === 'Submitted');

  return (
    <div className="space-y-6">
      {/* Faculty Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg flex-shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Faculty Academic Portal • {currentUser.designation || 'Professor & HOD'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Employee ID: <strong className="text-white font-mono">{currentUser.employeeId || 'EMP-ASET-041'}</strong></span>
                <span className="text-slate-500">•</span>
                <span>Cabin: {currentUser.cabinNumber || 'E3-304, Academic Block 3'}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/portal/faculty/attendance"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Mark Lecture Attendance</span>
            </Link>
            <Link
              href="/portal/faculty/marks"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/15 flex items-center gap-1.5 transition"
            >
              <span>Enter Internal Marks</span>
              <ArrowUpRight className="w-4 h-4 opacity-75" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Courses"
          value="4 Courses"
          subtitle="Section CSE-5A & 5B"
          icon={BookOpen}
          gradient="from-blue-600 to-indigo-700"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Students Taught"
          value="182 Students"
          subtitle="Across B.Tech CSE"
          icon={Users}
          gradient="from-emerald-500 to-teal-600"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Today's Lectures"
          value="3 Lectures"
          subtitle="Next: 14:15 in Lab 3"
          icon={Clock}
          gradient="from-purple-600 to-violet-700"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Pending Submissions"
          value={`${pendingSubmissions.length} Submissions`}
          subtitle="Awaiting evaluation"
          icon={FileCheck}
          gradient="from-amber-500 to-orange-600"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Today's Teaching Schedule & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Today&apos;s Teaching Roster</h3>
              </div>
              <Link
                href="/portal/faculty/timetable"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Full Teaching Schedule &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg">
                    09:15 - 10:10
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Design and Analysis of Algorithms (CSE 501)
                    </h4>
                    <p className="text-[11px] text-slate-500">Room E3-201 • Section 5A (62 Students)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attendance Taken
                  </span>
                </div>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg">
                    11:15 - 12:10
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Database Management Systems (CSE 502)
                    </h4>
                    <p className="text-[11px] text-slate-500">Room E3-204 • Section 5A (58 Students)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attendance Taken
                  </span>
                </div>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg">
                    14:15 - 16:10
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Algorithms &amp; Database Lab (CSE 521)
                    </h4>
                    <p className="text-[11px] text-slate-500">Computing Lab 3 • Section 5A (32 Students)</p>
                  </div>
                </div>
                <Link
                  href="/portal/faculty/attendance"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Mark Attendance</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Pending Assignment Submissions awaiting review */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-600" />
                Student Submissions Awaiting Evaluation
              </h3>
              <Link
                href="/portal/faculty/assignments"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Grade All &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {pendingSubmissions.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">All student assignments are currently graded!</p>
              ) : (
                pendingSubmissions.map((sub) => (
                  <div key={sub.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{sub.studentName}</span>
                      <span className="text-slate-500 font-mono ml-2">({sub.enrollmentNumber})</span>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5">{sub.content}</p>
                    </div>
                    <Link
                      href="/portal/faculty/assignments"
                      className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-100 transition"
                    >
                      Grade Now
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Mentee Alert & Quick Links */}
        <div className="space-y-6">
          {/* Mentees at Attendance Risk (<75%) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Mentees at Attendance Risk
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Students assigned to your mentorship falling below the 75% examination threshold
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Aditya Sengupta</span>
                  <span className="text-rose-600 font-black">68.4%</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">B.Tech CSE Sem 5 • Roll: 2023CSE0118</p>
                <div className="mt-2 flex gap-2">
                  <Link
                    href="/portal/faculty/mentees"
                    className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded hover:bg-rose-200"
                  >
                    Schedule Mentor Call
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Faculty Administrative Shortcuts
            </h3>
            <Link
              href="/portal/faculty/attendance"
              className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-xs font-bold text-slate-800 flex items-center justify-between transition"
            >
              <span>Mark Today&apos;s Attendance</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/portal/faculty/marks"
              className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-xs font-bold text-slate-800 flex items-center justify-between transition"
            >
              <span>Enter Class Test &amp; Quiz Marks</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/portal/faculty/assignments"
              className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-xs font-bold text-slate-800 flex items-center justify-between transition"
            >
              <span>Create New Assignment</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
