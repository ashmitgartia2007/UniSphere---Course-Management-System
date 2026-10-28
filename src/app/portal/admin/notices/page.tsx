'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  AlertTriangle,
  Pin,
  Calendar,
} from 'lucide-react';
import { UniversityNotice } from '@/lib/data/types';

export default function AdminNoticesPage() {
  const { notices, publishNotice, deleteNotice, institutes, currentUser } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<UniversityNotice['category']>('Academic');
  const [priority, setPriority] = useState<UniversityNotice['priority']>('Normal');
  const [targetInstituteId, setTargetInstituteId] = useState<string>('all');
  const [isPinned, setIsPinned] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    publishNotice({
      title,
      content,
      category,
      priority,
      targetInstituteId: targetInstituteId === 'all' ? null : targetInstituteId,
      authorName: currentUser.name || 'Registrar Directorate',
      authorDesignation: 'Office of the Registrar',
      pinned: isPinned,
    });

    setIsAddModalOpen(false);
    setTitle('');
    setContent('');
    setIsPinned(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Broadcast Notices &amp; Circulars</h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish official announcements across campus institutes, faculties, and student consoles
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Publish University Circular</span>
        </button>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-600" />
          Active Published Circulars ({notices.length} Notices)
        </h3>

        <div className="space-y-3">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {n.pinned && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      <Pin className="w-3 h-3 text-blue-600" /> Pinned
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      n.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {n.priority} • {n.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                    {n.targetInstituteId ? n.targetInstituteId.toUpperCase() : 'ALL CAMPUS INSTITUTES'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">{n.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{n.content}</p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Published: {n.publishedDate}</span>
                  <span>Author: {n.authorName}</span>
                </div>
              </div>

              <button
                onClick={() => deleteNotice(n.id)}
                className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition self-end md:self-center cursor-pointer"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Publish Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Publish Official University Notice</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Notice Title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule for Even Semester Elective Course Registration 2027"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Events">Events</option>
                    <option value="Fee">Fee Notice</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority:</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Institute:</label>
                  <select
                    value={targetInstituteId}
                    onChange={(e) => setTargetInstituteId(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="all">All Institutes</option>
                    {institutes.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Notice Content:</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Detail official instructions, circular mandate, deadlines, and authority..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinNotice"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <label htmlFor="pinNotice" className="text-slate-700 font-semibold cursor-pointer">
                  Pin to top of all Student &amp; Faculty dashboards
                </label>
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
                  className="px-5 py-2 font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
