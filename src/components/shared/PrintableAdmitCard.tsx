'use client';

import React from 'react';
import { UserProfile, ExamScheduleItem } from '@/lib/data/types';
import { Printer, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PrintableAdmitCardProps {
  isOpen: boolean;
  onClose: () => void;
  student: UserProfile;
  examSchedule: ExamScheduleItem[];
  instituteName?: string;
}

export function PrintableAdmitCard({
  isOpen,
  onClose,
  student,
  examSchedule,
  instituteName = 'Amity School of Engineering and Technology',
}: PrintableAdmitCardProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8">
        {/* Actions bar (not printed) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">Digitally Verified Examination Admit Card</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 space-y-6 print-card bg-white text-slate-900">
          {/* Institution Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5">
            <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">
              UniSphere University
            </h1>
            <p className="text-sm font-semibold text-slate-700 tracking-wide mt-0.5">
              {instituteName} • Noida Campus (Sector 125)
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-900 mt-2 bg-blue-50 inline-block px-3 py-1 rounded border border-blue-200">
              HALL TICKET / DIGITAL ADMIT CARD • FALL SEMESTER 2026
            </p>
          </div>

          {/* Student Profile Info Grid */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 rounded-xl border border-slate-300 bg-slate-50/50">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs flex-1">
              <div>
                <span className="text-slate-500 font-medium">Candidate Name:</span>
                <p className="font-bold text-slate-900 text-sm">{student.name}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Enrollment Number:</span>
                <p className="font-bold text-slate-900 font-mono text-sm">{student.enrollmentNumber || 'A2305221042'}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Roll Number:</span>
                <p className="font-bold text-slate-900 font-mono">{student.rollNumber || '2023CSE0142'}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Program / Semester:</span>
                <p className="font-bold text-slate-900">B.Tech (CSE) • Semester {student.currentSemester || 5}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Exam Centre:</span>
                <p className="font-bold text-slate-900">Academic Concourse Block E3, Noida</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Attendance Eligibility:</span>
                <p className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Eligible (&gt; 75% Verified)
                </p>
              </div>
            </div>

            {/* Candidate Photograph */}
            <div className="flex flex-col items-center">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-28 object-cover rounded border-2 border-slate-900 shadow-xs"
              />
              <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">Verified Photo</span>
            </div>
          </div>

          {/* Schedule Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Approved Examination Schedule
            </h3>
            <div className="border border-slate-900 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 border-b border-slate-900 text-slate-900 font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Course Code & Title</th>
                    <th className="py-2.5 px-3">Timings</th>
                    <th className="py-2.5 px-3">Room</th>
                    <th className="py-2.5 px-3">Seat</th>
                    <th className="py-2.5 px-3 text-center">Invigilator Sign</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {examSchedule.map((exam) => (
                    <tr key={exam.id}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                        {exam.date}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-blue-900">{exam.courseCode}</span>
                        <div className="text-slate-700">{exam.courseName}</div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap font-medium text-slate-700">
                        {exam.timeSlot}
                      </td>
                      <td className="py-2.5 px-3 font-semibold">{exam.roomNumber}</td>
                      <td className="py-2.5 px-3 font-bold font-mono text-blue-800">{exam.seatNumber}</td>
                      <td className="py-2.5 px-3 text-center text-slate-300 italic border-l border-slate-200">
                        ____________
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Instructions and Signatures */}
          <div className="pt-4 border-t border-slate-300 space-y-4">
            <div className="text-[10px] text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 uppercase">Candidate Instructions:</p>
              <p>1. Candidates must arrive at the examination hall at least 30 minutes before the scheduled reporting time.</p>
              <p>2. Possession of mobile phones, smartwatches, or any unauthorized electronic items inside the hall is strictly prohibited and constitutes an unfair means (UFM) offense.</p>
              <p>3. This digital admit card is cryptographically generated and valid with university student identity card.</p>
            </div>

            <div className="flex items-end justify-between pt-6 text-center text-xs">
              <div>
                <p className="font-mono text-[10px] text-slate-400">UNI-AUTH-VERIFIED-2026</p>
                <div className="w-32 h-8 bg-slate-100 border border-dashed border-slate-400 mt-1 flex items-center justify-center text-[10px] text-slate-500">
                  ||| | |||| | ||||||
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-serif italic font-bold text-slate-800 text-sm">
                  Dr. D.K. Sharma
                </div>
                <div className="border-t border-slate-800 pt-1 text-[11px] font-bold text-slate-700">
                  Controller of Examinations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
