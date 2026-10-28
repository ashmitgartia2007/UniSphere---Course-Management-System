'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Save,
  Users,
} from 'lucide-react';

interface StudentRosterItem {
  id: string;
  name: string;
  rollNumber: string;
  enrollmentNumber: string;
  status: 'Present' | 'Absent' | 'Medical' | 'OnDuty';
  currentPercentage: number;
}

const INITIAL_ROSTER: StudentRosterItem[] = [
  { id: 'user-student-aarav', name: 'Aarav Sharma', rollNumber: '2023CSE0142', enrollmentNumber: 'A2305221042', status: 'Present', currentPercentage: 90.6 },
  { id: 'roster-2', name: 'Aditya Sengupta', rollNumber: '2023CSE0118', enrollmentNumber: 'A2305221018', status: 'Absent', currentPercentage: 68.4 },
  { id: 'roster-3', name: 'Ananya Deshmukh', rollNumber: '2023CSE0105', enrollmentNumber: 'A2305221005', status: 'Present', currentPercentage: 88.0 },
  { id: 'roster-4', name: 'Deepak Mehrotra', rollNumber: '2023CSE0155', enrollmentNumber: 'A2305221055', status: 'Present', currentPercentage: 82.5 },
  { id: 'roster-5', name: 'Kavita Chawla', rollNumber: '2023CSE0178', enrollmentNumber: 'A2305221078', status: 'OnDuty', currentPercentage: 84.0 },
  { id: 'roster-6', name: 'Rahul Singhania', rollNumber: '2023CSE0192', enrollmentNumber: 'A2305221092', status: 'Present', currentPercentage: 76.2 },
  { id: 'roster-7', name: 'Sanya Mirza', rollNumber: '2023CSE0204', enrollmentNumber: 'A2305221104', status: 'Present', currentPercentage: 94.0 },
];

export default function FacultyAttendanceMarkerPage() {
  const { bulkMarkAttendance } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('offering-cse501');
  const [attendanceDate, setAttendanceDate] = useState('2026-10-28');
  const [roster, setRoster] = useState<StudentRosterItem[]>(INITIAL_ROSTER);
  const [isSaved, setIsSaved] = useState(false);

  const setStudentStatus = (id: string, status: 'Present' | 'Absent' | 'Medical' | 'OnDuty') => {
    setRoster((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const markAll = (status: 'Present' | 'Absent') => {
    setRoster((prev) => prev.map((s) => ({ ...s, status })));
  };

  const handleSaveAttendance = () => {
    bulkMarkAttendance(
      selectedCourse,
      roster.map((s) => ({ studentId: s.id, status: s.status })),
      attendanceDate
    );
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const presentCount = roster.filter((s) => s.status === 'Present' || s.status === 'OnDuty').length;
  const absentCount = roster.filter((s) => s.status === 'Absent').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Mark Class Attendance</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official Biometric &amp; Lecture Attendance Registry • Board of Examinations
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save &amp; Lock Attendance</span>
        </button>
      </div>

      {/* Course & Slot Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Select Course Offering:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
          >
            <option value="offering-cse501">CSE 501 - Design &amp; Analysis of Algorithms (Sec 5A)</option>
            <option value="offering-cse502">CSE 502 - Database Management Systems (Sec 5A)</option>
            <option value="offering-cse521">CSE 521 - Algorithms &amp; DBMS Lab (Sec 5A)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Lecture Date:</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
          >
          </input>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Quick Bulk Actions:</label>
          <div className="flex gap-2">
            <button
              onClick={() => markAll('Present')}
              className="flex-1 py-2 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition cursor-pointer"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAll('Absent')}
              className="flex-1 py-2 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-xl hover:bg-rose-100 transition cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Success alert */}
      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold">
              Attendance records for {roster.length} students committed and synchronized to student portals!
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700">Audit Stamp Logged</span>
        </div>
      )}

      {/* Attendance Stats summary */}
      <div className="flex items-center gap-4 text-xs font-semibold">
        <span className="text-slate-600">Total Students: {roster.length}</span>
        <span className="text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
          Present / OD: {presentCount}
        </span>
        <span className="text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-full">
          Absent: {absentCount}
        </span>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Roll &amp; Enrollment No</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Overall Attendance</th>
                <th className="py-3 px-3 text-center">Status Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roster.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-slate-900">{student.rollNumber}</span>
                    <div className="text-[10px] text-slate-400 font-mono">{student.enrollmentNumber}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900">{student.name}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-black px-2 py-0.5 rounded text-[11px] ${
                        student.currentPercentage >= 75
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {student.currentPercentage}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                      <button
                        onClick={() => setStudentStatus(student.id, 'Present')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          student.status === 'Present'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => setStudentStatus(student.id, 'Absent')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          student.status === 'Absent'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => setStudentStatus(student.id, 'Medical')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          student.status === 'Medical'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Med
                      </button>
                      <button
                        onClick={() => setStudentStatus(student.id, 'OnDuty')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          student.status === 'OnDuty'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        OD
                      </button>
                    </div>
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
