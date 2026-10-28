'use client';

import React from 'react';
import { SemesterResult, UserProfile } from '@/lib/data/types';
import { Printer, X, Award, CheckCircle } from 'lucide-react';

interface PrintableGradeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  result: SemesterResult;
  student: UserProfile;
}

export function PrintableGradeSheet({ isOpen, onClose, result, student }: PrintableGradeSheetProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8">
        {/* Top actions */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold">Official University Semester Grade Card</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Transcript</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Transcript */}
        <div className="p-8 space-y-6 print-card bg-white text-slate-900">
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h1 className="text-2xl font-black uppercase text-slate-900 tracking-wider">
              UniSphere University
            </h1>
            <p className="text-xs font-semibold text-slate-600">
              Office of the Controller of Examinations • Sector 125, Noida Campus
            </p>
            <div className="mt-2 inline-block bg-slate-100 border border-slate-300 px-4 py-1 rounded text-xs font-bold text-slate-900 tracking-widest uppercase">
              SEMESTER GRADE REPORT • SEMESTER {result.semesterNumber} ({result.academicYear})
            </div>
          </div>

          {/* Student details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500">Student Name:</span>
              <p className="font-bold text-slate-900">{student.name}</p>
            </div>
            <div>
              <span className="text-slate-500">Enrollment No:</span>
              <p className="font-bold text-slate-900 font-mono">{student.enrollmentNumber}</p>
            </div>
            <div>
              <span className="text-slate-500">Roll No:</span>
              <p className="font-bold text-slate-900 font-mono">{student.rollNumber}</p>
            </div>
            <div>
              <span className="text-slate-500">Program:</span>
              <p className="font-bold text-slate-900">B.Tech in Computer Science & Engineering</p>
            </div>
            <div>
              <span className="text-slate-500">Institute:</span>
              <p className="font-bold text-slate-900">Amity School of Engg & Tech</p>
            </div>
            <div>
              <span className="text-slate-500">Result Status:</span>
              <p className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {result.resultStatus}
              </p>
            </div>
          </div>

          {/* Courses & Marks Table */}
          <div className="border border-slate-900 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 border-b border-slate-900 text-slate-900 font-bold">
                <tr>
                  <th className="py-2.5 px-3 text-left">Course Code</th>
                  <th className="py-2.5 px-3 text-left">Course Title</th>
                  <th className="py-2.5 px-2 text-center">Credits</th>
                  <th className="py-2.5 px-2 text-center">Internal (30)</th>
                  <th className="py-2.5 px-2 text-center">External (70)</th>
                  <th className="py-2.5 px-2 text-center">Total (100)</th>
                  <th className="py-2.5 px-2 text-center">Grade</th>
                  <th className="py-2.5 px-2 text-center">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.courses.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 font-bold font-mono text-slate-900">{c.courseCode}</td>
                    <td className="py-2 px-3 text-slate-800">{c.courseName}</td>
                    <td className="py-2 px-2 text-center font-medium">{c.credits}</td>
                    <td className="py-2 px-2 text-center text-slate-600">{c.internalMarks}</td>
                    <td className="py-2 px-2 text-center text-slate-600">{c.externalMarks}</td>
                    <td className="py-2 px-2 text-center font-bold text-slate-900">{c.totalMarks}</td>
                    <td className="py-2 px-2 text-center font-bold text-blue-800">{c.letterGrade}</td>
                    <td className="py-2 px-2 text-center font-bold">{c.gradePoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* GPA Summary Highlights */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border-2 border-slate-900 bg-slate-50">
            <div>
              <p className="text-xs text-slate-600 font-medium">Credits Earned This Semester:</p>
              <p className="text-lg font-black text-slate-900">{result.totalCreditsEarned} Credits</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-slate-600 font-medium">Semester Grade Point Average (SGPA):</p>
              <p className="text-2xl font-black text-blue-700">{result.sgpa.toFixed(2)} / 10.0</p>
            </div>
            <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-300 pt-2 sm:pt-0 sm:pl-6">
              <p className="text-xs text-slate-600 font-medium">Cumulative Grade Point Average (CGPA):</p>
              <p className="text-2xl font-black text-emerald-700">{result.cgpaUpToNow.toFixed(2)} / 10.0</p>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex items-end justify-between pt-6 border-t border-slate-300 text-xs">
            <div>
              <p className="text-slate-500">Date of Declaration:</p>
              <p className="font-semibold">{result.publishedDate}</p>
            </div>
            <div className="text-center space-y-1">
              <div className="font-serif italic font-bold text-slate-800 text-sm">Dr. D.K. Sharma</div>
              <div className="border-t border-slate-400 pt-1 text-[11px] font-bold text-slate-600">
                Controller of Examinations
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
