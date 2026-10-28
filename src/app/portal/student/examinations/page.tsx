'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PrintableAdmitCard } from '@/components/shared/PrintableAdmitCard';
import { Award, Clock, MapPin, Printer, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentExaminationsPage() {
  const { examSchedule, currentUser } = useApp();
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Examinations &amp; Hall Tickets</h1>
          <p className="text-xs text-slate-500 mt-1">
            Mid-Term Examination Schedule • Academic Session Fall 2026
          </p>
        </div>

        <button
          onClick={() => setIsAdmitCardOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>View &amp; Print Digital Admit Card</span>
        </button>
      </div>

      {/* Verification status card */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Attendance &amp; Fee Clearance Verified</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Examination Eligibility: Cleared</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Candidate <strong className="text-white">{currentUser.name}</strong> ({currentUser.enrollmentNumber}) has satisfied the 75% attendance quota and semester fee criteria. Your digital hall ticket is active.
          </p>
        </div>

        <button
          onClick={() => setIsAdmitCardOpen(true)}
          className="px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-lg transition flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Download Verified Hall Ticket</span>
        </button>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Approved Mid-Term Examination Dates &amp; Seating Plan
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Course Code &amp; Title</th>
                <th className="py-3 px-3">Reporting Time</th>
                <th className="py-3 px-3">Exam Timings</th>
                <th className="py-3 px-3">Centre &amp; Room</th>
                <th className="py-3 px-3">Seat Number</th>
                <th className="py-3 px-3">Invigilator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {examSchedule.map((exam) => (
                <tr key={exam.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {exam.date}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-extrabold text-blue-700">{exam.courseCode}</span>
                    <div className="font-medium text-slate-700">{exam.courseName}</div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-rose-600 whitespace-nowrap">
                    {exam.reportingTime}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap font-mono text-slate-600">
                    {exam.timeSlot}
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-800">
                    {exam.roomNumber}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-800 font-mono font-bold text-xs">
                      {exam.seatNumber}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    {exam.invigilatorName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules Notice */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200/80 p-5 text-amber-900 text-xs space-y-2">
        <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          Mandatory Examination Hall Conduct Rules:
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-amber-800">
          <li>Candidates must carry both their physical Student Identity Card and this printed Hall Ticket.</li>
          <li>Entry into the examination block will close strictly 15 minutes before exam commencement.</li>
          <li>No programmable calculators, digital smartwatches, or cellular phones permitted inside the hall.</li>
        </ul>
      </div>

      {/* Admit Card Modal */}
      <PrintableAdmitCard
        isOpen={isAdmitCardOpen}
        onClose={() => setIsAdmitCardOpen(false)}
        student={currentUser}
        examSchedule={examSchedule}
      />
    </div>
  );
}
