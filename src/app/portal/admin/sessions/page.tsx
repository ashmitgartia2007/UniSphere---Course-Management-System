'use client';

import React, { useState } from 'react';
import { Layers, Calendar, Plus, CheckCircle2, Clock } from 'lucide-react';

interface AcademicSessionItem {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  semesters: Array<{
    term: string;
    number: number;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  }>;
}

const INITIAL_SESSIONS: AcademicSessionItem[] = [
  {
    id: 's-1',
    name: '2026 - 2027',
    startDate: '2026-07-15',
    endDate: '2027-06-30',
    isCurrent: true,
    semesters: [
      { term: 'Odd Semester (Fall 2026)', number: 5, startDate: '2026-07-20', endDate: '2026-12-15', isCurrent: true },
      { term: 'Even Semester (Spring 2027)', number: 6, startDate: '2027-01-08', endDate: '2027-05-30', isCurrent: false },
    ],
  },
  {
    id: 's-2',
    name: '2025 - 2026',
    startDate: '2025-07-15',
    endDate: '2026-06-30',
    isCurrent: false,
    semesters: [
      { term: 'Odd Semester', number: 3, startDate: '2025-07-20', endDate: '2025-12-15', isCurrent: false },
      { term: 'Even Semester', number: 4, startDate: '2026-01-08', endDate: '2026-05-30', isCurrent: false },
    ],
  },
];

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Academic Sessions &amp; Semesters</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure dynamic university terms, registration cutoffs, and active semesters
          </p>
        </div>

        <button
          onClick={() => alert('New session creation modal')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Academic Session</span>
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs space-y-4 ${
              sess.isCurrent ? 'border-blue-400 ring-1 ring-blue-300/60' : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Academic Session {sess.name}</h3>
                  <p className="text-xs text-slate-500">{sess.startDate} through {sess.endDate}</p>
                </div>
              </div>

              {sess.isCurrent && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Session
                </span>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Semesters Breakdown:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sess.semesters.map((sem, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{sem.term}</span>
                      <span className="text-slate-500 text-[11px]">{sem.startDate} to {sem.endDate}</span>
                    </div>
                    {sem.isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        Current Term
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
