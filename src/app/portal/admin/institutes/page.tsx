'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Building,
  Plus,
  Edit2,
  Users,
  BookOpen,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { Institute } from '@/lib/data/types';

export default function AdminInstitutesPage() {
  const { institutes, addInstitute, updateInstitute, departments, programs } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute | null>(null);

  // Form states
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [deanName, setDeanName] = useState('');
  const [deanEmail, setDeanEmail] = useState('');
  const [establishedYear, setEstablishedYear] = useState(2005);
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addInstitute({
      code: code.toUpperCase() || 'NEW_INST',
      name,
      shortName: shortName || name,
      deanName: deanName || 'Prof. In-Charge',
      deanEmail: deanEmail || 'dean@amity.edu',
      establishedYear,
      description,
      iconName: 'Building',
      campus: 'Sector 125, Noida Campus',
      departmentsCount: 2,
      programsCount: 3,
      studentCount: 500,
      facultyCount: 30,
      colorScheme: 'from-blue-600 to-indigo-700',
    });
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstitute) return;
    updateInstitute(editingInstitute.id, {
      code,
      name,
      shortName,
      deanName,
      deanEmail,
      description,
    });
    setEditingInstitute(null);
    resetForm();
  };

  const resetForm = () => {
    setCode('');
    setName('');
    setShortName('');
    setDeanName('');
    setDeanEmail('');
    setDescription('');
  };

  const openEditModal = (inst: Institute) => {
    setEditingInstitute(inst);
    setCode(inst.code);
    setName(inst.name);
    setShortName(inst.shortName);
    setDeanName(inst.deanName);
    setDeanEmail(inst.deanEmail);
    setDescription(inst.description);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Multi-Institute Architecture Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure dynamic university institutes, faculty councils, and academic degree structures
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New University Institute</span>
        </button>
      </div>

      {/* Institutes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {institutes.map((inst) => {
          const instDepts = departments.filter((d) => d.instituteId === inst.id);
          const instProgs = programs.filter((p) => p.instituteId === inst.id);

          return (
            <div
              key={inst.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-black text-sm">
                    {inst.code}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{inst.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{inst.campus}</p>
                  </div>
                </div>

                <button
                  onClick={() => openEditModal(inst)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition cursor-pointer"
                  title="Edit Institute"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{inst.description}</p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Students</span>
                  <p className="font-extrabold text-blue-700">{inst.studentCount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Faculty</span>
                  <p className="font-extrabold text-slate-900">{inst.facultyCount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Programs</span>
                  <p className="font-extrabold text-purple-700">{instProgs.length}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <div>
                  Dean: <strong>{inst.deanName}</strong> ({inst.deanEmail})
                </div>
                <div className="text-[11px] text-slate-400">
                  Constituent Depts: {instDepts.map((d) => d.code).join(', ') || 'General Faculty'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Institute Modal */}
      {(isAddModalOpen || editingInstitute) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingInstitute ? 'Edit Institute Details' : 'Configure New Constituent Institute'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingInstitute(null);
                }}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingInstitute ? handleUpdate : handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Institute Code:</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. ASET or ABS"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Short Name:</label>
                  <input
                    type="text"
                    required
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    placeholder="e.g. Engineering & Tech"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Institute Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amity School of Engineering and Technology"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dean / Director Name:</label>
                  <input
                    type="text"
                    required
                    value={deanName}
                    onChange={(e) => setDeanName(e.target.value)}
                    placeholder="e.g. Prof. (Dr.) Sunita Rao"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dean Email:</label>
                  <input
                    type="email"
                    required
                    value={deanEmail}
                    onChange={(e) => setDeanEmail(e.target.value)}
                    placeholder="e.g. srao@amity.edu"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description &amp; Focus Areas:</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe academic credentials, laboratory focus, and research specializations..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingInstitute(null);
                  }}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition"
                >
                  {editingInstitute ? 'Update Institute' : 'Create Institute'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
