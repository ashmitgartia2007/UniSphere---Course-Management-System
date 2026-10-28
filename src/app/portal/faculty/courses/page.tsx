'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, FileText, UploadCloud, Users, Layers, ExternalLink } from 'lucide-react';

export default function FacultyCoursesPage() {
  const { courses } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Assigned Courses &amp; Handouts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Department of Computer Science &amp; Engineering • Academic Session 2026-2027
          </p>
        </div>

        <button
          onClick={() => alert('Handout upload modal opened')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Lecture Notes / Handout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.slice(0, 4).map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {c.code}
              </span>
              <span className="text-xs font-semibold text-slate-500">{c.credits} Credits • {c.type}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{c.description}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Section CSE-5A (60 students)</span>
              <button
                onClick={() => alert(`View handouts for ${c.code}`)}
                className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Syllabus &amp; Material</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
