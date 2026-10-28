'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import { PrintableAdmitCard } from '@/components/shared/PrintableAdmitCard';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  Clock,
  ArrowUpRight,
  AlertCircle,
  FileText,
  User,
  Sparkles,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function StudentDashboardPage() {
  const { currentUser, attendanceSummary, examSchedule, feeInvoices, notices } = useApp();
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);

  // Compute overall attendance
  const totalHeld = attendanceSummary.reduce((acc, curr) => acc + curr.totalHeld, 0);
  const totalAttended = attendanceSummary.reduce((acc, curr) => acc + curr.attended, 0);
  const overallPercentage = totalHeld > 0 ? Number(((totalAttended / totalHeld) * 100).toFixed(1)) : 87.2;

  // Dues
  const pendingInvoices = feeInvoices.filter((inv) => inv.status === 'Pending' || inv.status === 'Partially Paid');
  const totalPendingDues = pendingInvoices.reduce((acc, curr) => acc + curr.balanceAmount, 0);

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Abstract background decorative shapes */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-60 h-60 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg flex-shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>Student Academic Console • Semester {currentUser.currentSemester || 5}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Enrollment: <strong className="text-white font-mono">{currentUser.enrollmentNumber}</strong></span>
                <span className="text-slate-500">•</span>
                <span>Roll: <strong className="text-white font-mono">{currentUser.rollNumber}</strong></span>
                <span className="text-slate-500">•</span>
                <span>Batch: {currentUser.batchYear || '2023 - 2027'}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAdmitCardOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition"
            >
              <Award className="w-4 h-4" />
              <span>Digital Hall Ticket / Admit Card</span>
            </button>
            <Link
              href="/portal/student/attendance"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/15 flex items-center gap-1.5 transition"
            >
              <span>Attendance Dial</span>
              <ArrowUpRight className="w-4 h-4 opacity-75" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Cumulative CGPA"
          value={currentUser.cgpa ? `${currentUser.cgpa.toFixed(2)}` : '8.84'}
          subtitle="Top 5% of B.Tech CSE Class"
          icon={Award}
          gradient="from-amber-500 to-orange-600"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          trend={{ value: '+0.21', isPositive: true }}
        />
        <StatCard
          title="Aggregate Attendance"
          value={`${overallPercentage}%`}
          subtitle="Safe zone threshold >= 75%"
          icon={CalendarCheck}
          gradient={overallPercentage >= 75 ? 'from-emerald-500 to-teal-600' : 'from-rose-500 to-red-600'}
          iconBg={overallPercentage >= 75 ? 'bg-emerald-50' : 'bg-rose-50'}
          iconColor={overallPercentage >= 75 ? 'text-emerald-600' : 'text-rose-600'}
          trend={{ value: overallPercentage >= 75 ? 'Eligible for Exams' : 'Attendance Risk', isPositive: overallPercentage >= 75 }}
        />
        <StatCard
          title="Enrolled Credits"
          value="24 Credits"
          subtitle="6 Core & Elective Courses"
          icon={BookOpen}
          gradient="from-blue-600 to-indigo-700"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Semester Fee Dues"
          value={totalPendingDues > 0 ? formatCurrency(totalPendingDues) : 'Nil'}
          subtitle={totalPendingDues > 0 ? 'Upcoming Due: Dec 15' : 'All clear for Fall 2026'}
          icon={CreditCard}
          gradient="from-purple-600 to-violet-700"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Main Grid: Schedule & Attendance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Schedule & Attendance Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Lectures Schedule */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Today&apos;s Lecture Schedule</h3>
                  <p className="text-xs text-slate-500">Live room allocations and faculty roster</p>
                </div>
              </div>
              <Link
                href="/portal/student/timetable"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-mono text-xs font-bold whitespace-nowrap">
                    09:15 - 10:10
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Design and Analysis of Algorithms (CSE 501)</h4>
                    <p className="text-[11px] text-slate-500">Dr. Ramesh Verma • Room E3-201</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Attended
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold whitespace-nowrap">
                    11:15 - 12:10
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Database Management Systems (CSE 502)</h4>
                    <p className="text-[11px] text-slate-500">Dr. Ramesh Verma • Room E3-204</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Attended
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-mono text-xs font-bold whitespace-nowrap">
                    14:15 - 16:10
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Algorithms & Database Systems Lab (CSE 521)</h4>
                    <p className="text-[11px] text-slate-500">Dr. Ramesh Verma • Computing Lab 3</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 animate-pulse">
                  Upcoming
                </span>
              </div>
            </div>
          </div>

          {/* Course-wise Attendance Progress Bars */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Attendance Compliance (75% Minimum Criteria)</h3>
                  <p className="text-xs text-slate-500">Subject-wise lecture count and debarment buffer</p>
                </div>
              </div>
              <Link
                href="/portal/student/attendance"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Detailed Ledger &rarr;
              </Link>
            </div>

            <div className="space-y-4 mt-4">
              {attendanceSummary.map((sub) => (
                <div key={sub.courseOfferingId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{sub.courseCode}</span>
                      <span className="text-slate-600 ml-1.5 truncate hidden sm:inline">{sub.courseName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{sub.attended}/{sub.totalHeld} held</span>
                      <span
                        className={`font-black px-2 py-0.5 rounded text-[11px] ${
                          sub.percentage >= 85
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.percentage >= 75
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {sub.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sub.percentage >= 85
                          ? 'bg-emerald-500'
                          : sub.percentage >= 75
                          ? 'bg-blue-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, sub.percentage)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Faculty: {sub.facultyName}</span>
                    <span>
                      {sub.percentage >= 75 ? (
                        <span className="text-emerald-600 font-medium">Can miss {sub.canMissToStay75} more classes</span>
                      ) : (
                        <span className="text-rose-600 font-bold">Must attend next {sub.needToAttendToReach75} classes</span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Mentor Contact, Upcoming Exams, Notices */}
        <div className="space-y-6">
          {/* Assigned Faculty Mentor Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              Faculty Academic Mentor
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                RV
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{currentUser.mentorName || 'Dr. Ramesh Verma'}</h4>
                <p className="text-xs text-slate-500">Professor & Head of Department, CSE</p>
                <p className="text-xs text-blue-600 font-medium mt-1">{currentUser.mentorEmail || 'rverma@amity.edu'}</p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`mailto:${currentUser.mentorEmail || 'rverma@amity.edu'}`}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition"
                  >
                    Email Mentor
                  </a>
                  <Link
                    href="/portal/student/documents"
                    className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition"
                  >
                    Apply Leave
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Examinations Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Upcoming Mid-Term Exams
              </h3>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded">
                Starts Nov 18
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {examSchedule.slice(0, 3).map((exam) => (
                <div key={exam.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{exam.courseCode}</span>
                    <span className="text-blue-700 font-semibold">{exam.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">{exam.courseName}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                    <span>{exam.timeSlot}</span>
                    <span className="font-mono bg-white px-1.5 py-0.2 rounded border border-slate-200 font-bold">
                      Seat: {exam.seatNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsAdmitCardOpen(true)}
              className="w-full mt-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Digital Hall Ticket</span>
            </button>
          </div>

          {/* Recent Circulars Mini Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              Recent Circulars
            </h3>
            <div className="space-y-2.5 text-xs">
              {notices.slice(0, 3).map((n) => (
                <div key={n.id} className="pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className="text-[10px] text-slate-400 font-medium">{n.publishedDate}</span>
                  <h4 className="font-semibold text-slate-900 line-clamp-1 hover:text-blue-600 transition">
                    <Link href="/portal/student/notices">{n.title}</Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Digital Admit Card Modal */}
      <PrintableAdmitCard
        isOpen={isAdmitCardOpen}
        onClose={() => setIsAdmitCardOpen(false)}
        student={currentUser}
        examSchedule={examSchedule}
      />
    </div>
  );
}
