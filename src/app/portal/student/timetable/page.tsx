'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Calendar, Clock, MapPin, User, Download, Printer } from 'lucide-react';

export default function StudentTimetablePage() {
  const { offerings } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Flatten all schedules with course info
  const allEvents = offerings.flatMap((off) =>
    off.schedules.map((sch) => ({
      ...sch,
      courseId: off.courseId,
      section: off.section,
      facultyName: off.facultyName,
    }))
  );

  const dayEvents = allEvents.filter((ev) => ev.day === selectedDay);

  const getCourseDetails = (courseId: string) => {
    switch (courseId) {
      case 'course-cse501':
        return { code: 'CSE 501', name: 'Design and Analysis of Algorithms', color: 'bg-blue-50 border-blue-200 text-blue-900' };
      case 'course-cse502':
        return { code: 'CSE 502', name: 'Database Management Systems', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' };
      case 'course-cse503':
        return { code: 'CSE 503', name: 'Artificial Intelligence & ML', color: 'bg-purple-50 border-purple-200 text-purple-900' };
      case 'course-cse504':
        return { code: 'CSE 504', name: 'Computer Networks', color: 'bg-amber-50 border-amber-200 text-amber-900' };
      case 'course-cse505':
        return { code: 'CSE 505', name: 'Cloud Computing & DevOps', color: 'bg-cyan-50 border-cyan-200 text-cyan-900' };
      case 'course-cse521':
        return { code: 'CSE 521', name: 'Algorithms & Database Lab', color: 'bg-indigo-50 border-indigo-200 text-indigo-900' };
      default:
        return { code: 'GEN 501', name: 'Elective Course', color: 'bg-slate-50 border-slate-200 text-slate-900' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Weekly Lecture Timetable</h1>
          <p className="text-xs text-slate-500 mt-1">
            Section CSE-5A • Academic Session 2026-2027 (Odd Semester)
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print Weekly Schedule</span>
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Daily Timeline Schedule Cards */}
      <div className="space-y-3">
        {dayEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
            No scheduled lectures on {selectedDay}. Designated for self-study and lab assignments.
          </div>
        ) : (
          dayEvents.map((item, idx) => {
            const course = getCourseDetails(item.courseId);
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${course.color} transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/80 border border-slate-200/60 shadow-xs flex flex-col items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-700 mt-0.5">SLOT {idx + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base">{course.code}</span>
                      <span className="text-xs font-semibold opacity-90">{course.name}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs opacity-80">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="w-3.5 h-3.5" />
                        {item.facultyName}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        Room: {item.room}
                      </span>
                      <span>Section: {item.section}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right self-end md:self-center">
                  <span className="inline-block px-3 py-1 rounded-lg bg-white/90 font-mono text-xs font-bold shadow-2xs">
                    {item.startTime} - {item.endTime}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Full Weekly Grid Preview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          Master Weekly Matrix Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-2.5 px-3">Time Slot</th>
                {days.map((d) => (
                  <th key={d} className="py-2.5 px-3">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-700">09:15 - 10:10</td>
                <td className="py-3 px-3 font-semibold text-blue-700">CSE 501 (E3-201)</td>
                <td className="py-3 px-3 font-semibold text-amber-700">CSE 504 (E2-108)</td>
                <td className="py-3 px-3 font-semibold text-purple-700">CSE 503 (Auditorium)</td>
                <td className="py-3 px-3 text-slate-400">-</td>
                <td className="py-3 px-3 text-slate-400">-</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-700">10:15 - 11:10</td>
                <td className="py-3 px-3 text-slate-400">-</td>
                <td className="py-3 px-3 font-semibold text-emerald-700">CSE 502 (E3-204)</td>
                <td className="py-3 px-3 text-slate-400">-</td>
                <td className="py-3 px-3 font-semibold text-emerald-700">CSE 502 (E3-204)</td>
                <td className="py-3 px-3 font-semibold text-emerald-700">CSE 502 (E3-204)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-700">11:15 - 12:10</td>
                <td className="py-3 px-3 font-semibold text-purple-700">CSE 503 (Auditorium)</td>
                <td className="py-3 px-3 text-slate-400">-</td>
                <td className="py-3 px-3 font-semibold text-blue-700">CSE 501 (E3-201)</td>
                <td className="py-3 px-3 font-semibold text-amber-700">CSE 504 (E2-108)</td>
                <td className="py-3 px-3 text-slate-400">-</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2 px-3 font-mono text-slate-400 font-medium">12:10 - 13:15</td>
                <td colSpan={5} className="py-2 px-3 text-center text-slate-400 font-semibold tracking-wider">
                  LUNCH BREAK &amp; UNIVERSITY ACTIVITY PERIOD
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-700">14:15 - 16:10</td>
                <td className="py-3 px-3 font-semibold text-cyan-700">CSE 505 (Lab 4)</td>
                <td className="py-3 px-3 font-semibold text-indigo-700">CSE 521 Lab (Comp Lab 3)</td>
                <td className="py-3 px-3 font-semibold text-cyan-700">CSE 505 (Lab 4)</td>
                <td className="py-3 px-3 font-semibold text-purple-700">CSE 503 (Auditorium)</td>
                <td className="py-3 px-3 font-semibold text-blue-700">CSE 501 (E3-201)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
