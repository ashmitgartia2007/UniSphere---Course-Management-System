'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, Plus, Layers, CheckCircle2, X, Award, ChevronRight } from 'lucide-react';
import { Program } from '@/lib/data/types';

export default function DepartmentCurriculumPage() {
  const { programs, addProgram, currentUser, departments } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Program['level']>('Undergraduate');
  const [durationYears, setDurationYears] = useState(4);
  const [creditsRequired, setCreditsRequired] = useState(160);
  const [specializationsText, setSpecializationsText] = useState('Artificial Intelligence & ML, Data Science');

  const instPrograms = programs.filter(
    (p) => p.instituteId === (currentUser.instituteId || 'aset')
  );

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addProgram({
      instituteId: currentUser.instituteId || 'aset',
      departmentId: departments[0]?.id || 'dept-cse',
      code: code || `PROG_${Date.now().toString().slice(-4)}`,
      name,
      level,
      durationYears,
      totalSemesters: durationYears * 2,
      creditsRequired,
      specializations: specializationsText.split(',').map((s) => s.trim()),
    });
    setIsAddModalOpen(false);
    setName('');
    setCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Curriculum &amp; Program Mapping</h1>
          <p className="text-xs text-slate-500 mt-1">
            Degree programs, total semester credits, and approved specializations
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Academic Program</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {prog.code}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {prog.durationYears} Years ({prog.totalSemesters} Semesters)
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">{prog.name}</h3>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Credits Required: <strong className="text-slate-900">{prog.creditsRequired} Credits</strong></span>
            </div>

            {prog.specializations && prog.specializations.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Available Specializations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prog.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Program Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Configure New Academic Program</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProgram} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Program Code:</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. BTECH_DS or MTECH_AI"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Program Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. B.Tech in Data Science & Machine Learning"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Degree Level:</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Doctoral">Doctoral</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration (Years):</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={durationYears}
                    onChange={(e) => setDurationYears(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Credits:</label>
                  <input
                    type="number"
                    min="30"
                    max="260"
                    value={creditsRequired}
                    onChange={(e) => setCreditsRequired(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Specializations (comma separated):
                </label>
                <input
                  type="text"
                  value={specializationsText}
                  onChange={(e) => setSpecializationsText(e.target.value)}
                  placeholder="e.g. Generative AI, Big Data Analytics"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
