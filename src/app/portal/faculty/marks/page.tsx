'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CheckSquare, Save, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface StudentMarksRow {
  studentId: string;
  name: string;
  rollNumber: string;
  ct1: number; // Max 30
  ct2: number; // Max 30
  assignment: number; // Max 20
  vivaAttendance: number; // Max 20
}

const INITIAL_MARKS: StudentMarksRow[] = [
  { studentId: 'user-student-aarav', name: 'Aarav Sharma', rollNumber: '2023CSE0142', ct1: 28, ct2: 29, assignment: 19, vivaAttendance: 19 },
  { studentId: 'stu-2', name: 'Aditya Sengupta', rollNumber: '2023CSE0118', ct1: 21, ct2: 22, assignment: 15, vivaAttendance: 14 },
  { studentId: 'stu-3', name: 'Ananya Deshmukh', rollNumber: '2023CSE0105', ct1: 27, ct2: 28, assignment: 18, vivaAttendance: 19 },
  { studentId: 'stu-4', name: 'Deepak Mehrotra', rollNumber: '2023CSE0155', ct1: 25, ct2: 26, assignment: 16, vivaAttendance: 17 },
  { studentId: 'stu-5', name: 'Kavita Chawla', rollNumber: '2023CSE0178', ct1: 26, ct2: 27, assignment: 18, vivaAttendance: 18 },
];

export default function FacultyInternalMarksPage() {
  const [selectedCourse, setSelectedCourse] = useState('CSE 501');
  const [marksData, setMarksData] = useState<StudentMarksRow[]>(INITIAL_MARKS);
  const [isSaved, setIsSaved] = useState(false);

  const handleScoreChange = (
    studentId: string,
    field: 'ct1' | 'ct2' | 'assignment' | 'vivaAttendance',
    val: string
  ) => {
    const num = Math.max(0, Number(val) || 0);
    setMarksData((prev) =>
      prev.map((row) => (row.studentId === studentId ? { ...row, [field]: num } : row))
    );
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Continuous Assessment &amp; Internal Marks</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter marks for Class Tests, Assignments, and Viva (Total weightage: 30 marks towards semester result)
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save &amp; Submit Internal Marks</span>
        </button>
      </div>

      {/* Course Filter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="max-w-md w-full">
          <label className="text-xs font-bold text-slate-700 block mb-1">Select Course Subject:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
          >
            <option value="CSE 501">CSE 501 - Design &amp; Analysis of Algorithms</option>
            <option value="CSE 502">CSE 502 - Database Management Systems</option>
            <option value="CSE 503">CSE 503 - Artificial Intelligence &amp; ML</option>
          </select>
        </div>

        <div className="text-xs text-slate-500">
          <span className="font-bold text-slate-700">Scheme:</span> CT1 (30) + CT2 (30) + Assignment (20) + Viva (20) = Normalized to 30.
        </div>
      </div>

      {/* Success banner */}
      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="font-bold">
            Internal marks successfully logged and forwarded to Examination Controller!
          </span>
        </div>
      )}

      {/* Marks Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Roll Number</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-2 text-center">Class Test 1 (30)</th>
                <th className="py-3 px-2 text-center">Class Test 2 (30)</th>
                <th className="py-3 px-2 text-center">Assignments (20)</th>
                <th className="py-3 px-2 text-center">Viva / Attd (20)</th>
                <th className="py-3 px-3 text-center">Calculated Internal (30)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {marksData.map((row) => {
                const rawTotal = row.ct1 + row.ct2 + row.assignment + row.vivaAttendance; // out of 100
                const normalized = Math.round((rawTotal / 100) * 30); // out of 30

                return (
                  <tr key={row.studentId} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{row.rollNumber}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{row.name}</td>
                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={row.ct1}
                        onChange={(e) => handleScoreChange(row.studentId, 'ct1', e.target.value)}
                        className="w-16 p-1.5 rounded-lg border border-slate-200 text-center font-bold text-xs"
                      />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={row.ct2}
                        onChange={(e) => handleScoreChange(row.studentId, 'ct2', e.target.value)}
                        className="w-16 p-1.5 rounded-lg border border-slate-200 text-center font-bold text-xs"
                      />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={row.assignment}
                        onChange={(e) => handleScoreChange(row.studentId, 'assignment', e.target.value)}
                        className="w-16 p-1.5 rounded-lg border border-slate-200 text-center font-bold text-xs"
                      />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={row.vivaAttendance}
                        onChange={(e) => handleScoreChange(row.studentId, 'vivaAttendance', e.target.value)}
                        className="w-16 p-1.5 rounded-lg border border-slate-200 text-center font-bold text-xs"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-mono font-black text-sm text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        {normalized} / 30
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
