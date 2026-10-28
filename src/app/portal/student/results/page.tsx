'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PrintableGradeSheet } from '@/components/shared/PrintableGradeSheet';
import { Award, FileText, CheckCircle2, TrendingUp, Printer } from 'lucide-react';
import { SemesterResult } from '@/lib/data/types';

export default function StudentResultsPage() {
  const { semesterResults, currentUser } = useApp();
  const [selectedSemesterResult, setSelectedSemesterResult] = useState<SemesterResult>(
    semesterResults[0]
  );
  const [isGradeSheetOpen, setIsGradeSheetOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Academic Results &amp; Transcripts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official Semester Grade Point Average (SGPA) and Cumulative Performance (CGPA)
          </p>
        </div>

        <button
          onClick={() => setIsGradeSheetOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Grade Sheet</span>
        </button>
      </div>

      {/* Cumulative GPA Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Graduation Standing • First Division with Distinction
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {currentUser.cgpa?.toFixed(2) || '8.84'} Cumulative CGPA
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Total 96 credits earned across 4 completed semesters. Ranked among the top 5 percent of the 2023-2027 B.Tech Computer Science cohort.
          </p>
        </div>

        {/* SGPA Progression Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {currentUser.sgpaList?.map((item) => (
            <div
              key={item.semester}
              className="text-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 min-w-[85px]"
            >
              <span className="text-[10px] text-slate-400 font-bold uppercase">Sem {item.semester}</span>
              <div className="text-lg font-black text-amber-400 mt-0.5">{item.sgpa.toFixed(2)}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">Passed</span>
            </div>
          ))}
        </div>
      </div>

      {/* Semester Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {semesterResults.map((res) => {
          const isSelected = selectedSemesterResult.id === res.id;
          return (
            <button
              key={res.id}
              onClick={() => setSelectedSemesterResult(res)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              Semester {res.semesterNumber} Grade Sheet
            </button>
          );
        })}
      </div>

      {/* Selected Semester Result Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Semester {selectedSemesterResult.semesterNumber} Examination Result Statement
            </h3>
            <p className="text-xs text-slate-500">
              Session: {selectedSemesterResult.academicYear} • Declared on: {selectedSemesterResult.publishedDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              SGPA: {selectedSemesterResult.sgpa.toFixed(2)} / 10.0
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Course Code</th>
                <th className="py-3 px-3">Course Name</th>
                <th className="py-3 px-2 text-center">Credits</th>
                <th className="py-3 px-2 text-center">Internal (30)</th>
                <th className="py-3 px-2 text-center">External (70)</th>
                <th className="py-3 px-2 text-center">Total (100)</th>
                <th className="py-3 px-2 text-center">Grade</th>
                <th className="py-3 px-2 text-center">Grade Point</th>
                <th className="py-3 px-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedSemesterResult.courses.map((course, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3 font-bold font-mono text-slate-900">{course.courseCode}</td>
                  <td className="py-3 px-3 font-medium text-slate-800">{course.courseName}</td>
                  <td className="py-3 px-2 text-center font-bold text-slate-700">{course.credits}</td>
                  <td className="py-3 px-2 text-center text-slate-600">{course.internalMarks}</td>
                  <td className="py-3 px-2 text-center text-slate-600">{course.externalMarks}</td>
                  <td className="py-3 px-2 text-center font-black text-slate-900">{course.totalMarks}</td>
                  <td className="py-3 px-2 text-center font-black text-blue-700">{course.letterGrade}</td>
                  <td className="py-3 px-2 text-center font-bold">{course.gradePoint}</td>
                  <td className="py-3 px-2 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Transcript Modal */}
      <PrintableGradeSheet
        isOpen={isGradeSheetOpen}
        onClose={() => setIsGradeSheetOpen(false)}
        result={selectedSemesterResult}
        student={currentUser}
      />
    </div>
  );
}
