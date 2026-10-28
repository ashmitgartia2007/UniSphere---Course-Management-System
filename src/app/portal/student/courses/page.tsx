'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, Sparkles, Layers, FileText } from 'lucide-react';

export default function StudentCoursesPage() {
  const { courses } = useApp();
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(courses[0]?.id || null);

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);

  const toggleExpand = (id: string) => {
    setExpandedCourseId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Course Curriculum & Syllabus</h1>
          <p className="text-xs text-slate-500 mt-1">
            B.Tech Computer Science & Engineering • Semester 5 • Specialization: AI & ML
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Total Enrolled Credits: {totalCredits} / 24</span>
          </div>
        </div>
      </div>

      {/* Courses Accordion List */}
      <div className="space-y-4">
        {courses.map((course) => {
          const isExpanded = expandedCourseId === course.id;
          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
            >
              {/* Header Card */}
              <div
                onClick={() => toggleExpand(course.id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {course.code}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-800 text-sm sm:text-base">
                        {course.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          course.type === 'Core'
                            ? 'bg-blue-100 text-blue-800'
                            : course.type === 'Lab'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {course.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{course.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="hidden sm:inline-block font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
                    {course.credits} Credits
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Syllabus Breakdown */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-in fade-in">
                  <div className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/80">
                    <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Course Objective &amp; Learning Outcomes:
                    </h4>
                    {course.description}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Syllabus Units & Lecture Hours
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.syllabusModules.map((unit) => (
                        <div
                          key={unit.unit}
                          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-700">Unit {unit.unit}: {unit.title}</span>
                            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {unit.hours} Hours
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-normal">{unit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Approved by Board of Studies, ASET</span>
                    <button
                      onClick={() => alert(`Full ${course.code} syllabus downloaded as PDF`)}
                      className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Download Syllabus PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
