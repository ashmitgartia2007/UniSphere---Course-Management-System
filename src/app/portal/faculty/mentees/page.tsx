'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Users, AlertTriangle, CheckCircle2, MessageSquare, Mail, Phone, Calendar } from 'lucide-react';

interface Mentee {
  id: string;
  name: string;
  rollNumber: string;
  enrollmentNumber: string;
  program: string;
  semester: number;
  cgpa: number;
  attendance: number;
  status: 'Good Standing' | 'Academic Caution' | 'Attendance Risk';
  lastMeetingDate: string;
}

const MENTEES_LIST: Mentee[] = [
  { id: 'user-student-aarav', name: 'Aarav Sharma', rollNumber: '2023CSE0142', enrollmentNumber: 'A2305221042', program: 'B.Tech CSE', semester: 5, cgpa: 8.84, attendance: 90.6, status: 'Good Standing', lastMeetingDate: '2026-10-15' },
  { id: 'm-2', name: 'Aditya Sengupta', rollNumber: '2023CSE0118', enrollmentNumber: 'A2305221018', program: 'B.Tech CSE', semester: 5, cgpa: 6.95, attendance: 68.4, status: 'Attendance Risk', lastMeetingDate: '2026-09-28' },
  { id: 'm-3', name: 'Ananya Deshmukh', rollNumber: '2023CSE0105', enrollmentNumber: 'A2305221005', program: 'B.Tech CSE', semester: 5, cgpa: 8.20, attendance: 88.0, status: 'Good Standing', lastMeetingDate: '2026-10-10' },
  { id: 'm-4', name: 'Kunal Kapoor', rollNumber: '2023CSE0160', enrollmentNumber: 'A2305221060', program: 'B.Tech CSE', semester: 5, cgpa: 7.15, attendance: 73.5, status: 'Academic Caution', lastMeetingDate: '2026-10-02' },
];

export default function FacultyMenteesPage() {
  const [mentees, setMentees] = useState<Mentee[]>(MENTEES_LIST);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [activeMentee, setActiveMentee] = useState<Mentee | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleLogMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMentee) return;
    setSuccessMsg(true);
    setTimeout(() => {
      setActiveMentee(null);
      setSuccessMsg(false);
      setMeetingNotes('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty Student Mentorship</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor academic progress, continuous counseling, and early attendance intervention
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          Assigned Student Mentees ({mentees.length} Students)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Student Name &amp; Roll</th>
                <th className="py-3 px-3">Program &amp; Sem</th>
                <th className="py-3 px-3">CGPA</th>
                <th className="py-3 px-3">Attendance</th>
                <th className="py-3 px-3">Standing Status</th>
                <th className="py-3 px-3">Last Mentored</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentees.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900">{m.name}</span>
                    <div className="font-mono text-[10px] text-slate-400">{m.rollNumber} • {m.enrollmentNumber}</div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">
                    {m.program} (Sem {m.semester})
                  </td>
                  <td className="py-3.5 px-3 font-black text-slate-900">
                    {m.cgpa.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`font-black px-2 py-0.5 rounded text-[11px] ${
                        m.attendance >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {m.attendance}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'Good Standing'
                          ? 'bg-blue-100 text-blue-800'
                          : m.status === 'Academic Caution'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                    {m.lastMeetingDate}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setActiveMentee(m)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs inline-flex items-center gap-1 transition cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Log Session</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Session Modal */}
      {activeMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Log Mentorship Session: {activeMentee.name}
            </h3>

            {successMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Mentorship session logged in student record and shared with HOD!</span>
              </div>
            ) : (
              <form onSubmit={handleLogMeeting} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Discussion Summary &amp; Action Plan:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={meetingNotes}
                    onChange={(e) => setMeetingNotes(e.target.value)}
                    placeholder="Discussed internal exam performance, advised on attendance condonation procedures, reviewed career internship goals..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveMentee(null)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  >
                    Save Mentoring Log
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
