'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  CalendarCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
  Sliders,
} from 'lucide-react';

export default function StudentAttendancePage() {
  const { attendanceSummary, attendanceLogs, submitDocumentRequest } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    attendanceSummary[0]?.courseOfferingId || ''
  );
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Selected course details
  const currentCourse = attendanceSummary.find((c) => c.courseOfferingId === selectedCourseId) || attendanceSummary[0];

  // Overall attendance calculations
  const totalHeld = attendanceSummary.reduce((acc, curr) => acc + curr.totalHeld, 0);
  const totalAttended = attendanceSummary.reduce((acc, curr) => acc + curr.attended, 0);
  const overallPercentage = totalHeld > 0 ? Number(((totalAttended / totalHeld) * 100).toFixed(1)) : 87.2;

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;
    submitDocumentRequest(
      'No Objection Certificate (NOC)',
      `Duty/Medical Leave Application: ${leaveReason}`,
      'Standard (3 days)'
    );
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setIsLeaveModalOpen(false);
      setLeaveReason('');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Tracking</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              75% Rule Compliance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time biometric & lecture punch ledger verified by the Dean of Academic Affairs
          </p>
        </div>

        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Apply Duty / Medical Leave</span>
        </button>
      </div>

      {/* Aggregate Dial Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
            University Aggregate
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">{overallPercentage}% Overall Attendance</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            You have attended <strong className="text-white">{totalAttended}</strong> out of <strong className="text-white">{totalHeld}</strong> lectures held across 6 courses this semester. You meet the mandatory 75% examination eligibility bar.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-xs text-slate-300 font-medium">Safe Margin</span>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">+12.2%</div>
            <span className="text-[10px] text-slate-400">Above Debar Limit</span>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-xs text-slate-300 font-medium">Exam Clearance</span>
            <div className="text-2xl font-black text-blue-400 mt-0.5">Approved</div>
            <span className="text-[10px] text-slate-400">Hall Ticket Unlocked</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Subject Table & Attendance Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subject Attendance Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Enrolled Courses Attendance Breakdown</h3>
              <span className="text-xs text-slate-500">Click a course to simulate impact</span>
            </div>

            <div className="divide-y divide-slate-100">
              {attendanceSummary.map((c) => {
                const isSelected = c.courseOfferingId === selectedCourseId;
                return (
                  <div
                    key={c.courseOfferingId}
                    onClick={() => setSelectedCourseId(c.courseOfferingId)}
                    className={`p-4 transition-all cursor-pointer ${
                      isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{c.courseCode}</span>
                          <span className="text-xs text-slate-700 font-semibold">{c.courseName}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {c.credits} Credits
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Faculty: {c.facultyName}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-800">
                            {c.attended} / {c.totalHeld} Lectures
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {c.status === 'Safe' ? (
                              <span className="text-emerald-600 font-semibold">Can miss {c.canMissToStay75} more</span>
                            ) : (
                              <span className="text-rose-600 font-bold">Need {c.needToAttendToReach75} more</span>
                            )}
                          </div>
                        </div>

                        <span
                          className={`text-sm font-black px-2.5 py-1 rounded-xl border ${
                            c.percentage >= 85
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : c.percentage >= 75
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {c.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 w-full h-2 rounded-full bg-slate-200/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          c.percentage >= 85
                            ? 'bg-emerald-500'
                            : c.percentage >= 75
                            ? 'bg-blue-600'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, c.percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Attendance Log Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Recent Attendance Punch History</h3>
              </div>
              <span className="text-xs text-slate-500">Logged via RFID & Faculty Mobile App</span>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {attendanceLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{log.date}</span>
                    <span className="text-slate-400 mx-2">•</span>
                    <span className="text-slate-600 font-mono">{log.timeSlot}</span>
                    {log.notes && (
                      <p className="text-[11px] text-blue-600 italic mt-0.5">{log.notes}</p>
                    )}
                  </div>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      log.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.status === 'OnDuty'
                        ? 'bg-indigo-100 text-indigo-800'
                        : log.status === 'Medical'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: 75% Rule Simulator & Debarment Alert */}
        <div className="space-y-6">
          {/* Simulator Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Attendance Risk Simulator</h3>
                <p className="text-[11px] text-slate-500">Predict future attendance impact</p>
              </div>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div>
                <label className="text-slate-500 font-medium">Selected Course:</label>
                <div className="font-bold text-slate-900 mt-0.5 text-sm">
                  {currentCourse.courseCode} - {currentCourse.courseName}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  Current: {currentCourse.attended}/{currentCourse.totalHeld} ({currentCourse.percentage}%)
                </div>
              </div>

              {/* Simulation Scenarios */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="font-semibold text-slate-700">If you miss next 2 classes:</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-slate-500">
                      {currentCourse.attended}/{currentCourse.totalHeld + 2}
                    </span>
                    <span className="font-bold text-amber-600 font-mono">
                      {((currentCourse.attended / (currentCourse.totalHeld + 2)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="font-semibold text-slate-700">If you attend next 4 classes:</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-slate-500">
                      {currentCourse.attended + 4}/{currentCourse.totalHeld + 4}
                    </span>
                    <span className="font-bold text-emerald-600 font-mono">
                      {(((currentCourse.attended + 4) / (currentCourse.totalHeld + 4)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Dean Regulation 2026:
                </p>
                <p>
                  Minimum 75% attendance is required per subject to generate the End-Term Hall Ticket. Students below 65% are debarred without condonation.
                </p>
              </div>
            </div>
          </div>

          {/* Debarment Criteria Rule Book Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs text-xs space-y-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Debarment Categories
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-slate-800">&gt;= 75%: Regular</strong>
                  <p className="text-slate-500 text-[11px]">Unconditional eligibility for all midterm and end-term exams.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-slate-800">65% - 74%: Condonation Zone</strong>
                  <p className="text-slate-500 text-[11px]">Requires Dean approval with medical certificate or approved duty leave.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-slate-800">&lt; 65%: Critical Debarred</strong>
                  <p className="text-slate-500 text-[11px]">Strictly debarred from sitting in end-term examinations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Apply for Academic / Medical Leave</h3>
            <p className="text-xs text-slate-500">
              Submit your reason and dates for duty or medical leave. Approved requests will be credited towards your attendance.
            </p>

            {leaveSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Leave application submitted successfully for Dean approval!</span>
              </div>
            ) : (
              <form onSubmit={handleApplyLeave} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Reason & Justification:
                  </label>
                  <textarea
                    rows={3}
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="e.g. Hospitalization due to viral fever / Representing university at national robotics competition..."
                    required
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLeaveModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  >
                    Submit to HOD
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
