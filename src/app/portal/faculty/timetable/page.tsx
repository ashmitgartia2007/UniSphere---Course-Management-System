'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Printer } from 'lucide-react';

export default function FacultyTimetablePage() {
  const schedule = [
    { day: 'Monday', time: '09:15 - 10:10', course: 'CSE 501 - Design & Analysis of Algorithms', room: 'E3-201', section: 'CSE-5A' },
    { day: 'Monday', time: '11:15 - 12:10', course: 'CSE 503 - Artificial Intelligence & ML', room: 'E3-Auditorium', section: 'CSE-5A' },
    { day: 'Monday', time: '14:15 - 15:10', course: 'CSE 505 - Cloud Computing & DevOps', room: 'E3-Lab 4', section: 'CSE-5A' },
    { day: 'Tuesday', time: '10:15 - 11:10', course: 'CSE 502 - Database Management Systems', room: 'E3-204', section: 'CSE-5A' },
    { day: 'Tuesday', time: '14:15 - 16:10', course: 'CSE 521 - Algorithms & DBMS Lab', room: 'Computing Lab 3', section: 'CSE-5A' },
    { day: 'Wednesday', time: '09:15 - 10:10', course: 'CSE 503 - Artificial Intelligence & ML', room: 'E3-Auditorium', section: 'CSE-5A' },
    { day: 'Wednesday', time: '11:15 - 12:10', course: 'CSE 501 - Design & Analysis of Algorithms', room: 'E3-201', section: 'CSE-5A' },
    { day: 'Thursday', time: '10:15 - 11:10', course: 'CSE 502 - Database Management Systems', room: 'E3-204', section: 'CSE-5A' },
    { day: 'Thursday', time: '14:15 - 15:10', course: 'CSE 503 - Artificial Intelligence & ML', room: 'E3-Auditorium', section: 'CSE-5A' },
    { day: 'Friday', time: '10:15 - 11:10', course: 'CSE 502 - Database Management Systems', room: 'E3-204', section: 'CSE-5A' },
    { day: 'Friday', time: '14:15 - 15:10', course: 'CSE 501 - Design & Analysis of Algorithms', room: 'E3-201', section: 'CSE-5A' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty Teaching Timetable</h1>
          <p className="text-xs text-slate-500 mt-1">
            Prof. (Dr.) Ramesh Verma • Total 18 Teaching Workload Hours / Week
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print Schedule</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Day</th>
                <th className="py-3 px-3">Time Slot</th>
                <th className="py-3 px-3">Course Title</th>
                <th className="py-3 px-3">Section</th>
                <th className="py-3 px-3">Room / Venue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{item.day}</td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-blue-700">{item.time}</td>
                  <td className="py-3.5 px-3 font-medium text-slate-800">{item.course}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{item.section}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.room}
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
