'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, AlertTriangle, Calendar, FileText, CheckCheck, X } from 'lucide-react';
import Link from 'next/link';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const { notices, clearNotifications } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] mt-14 sm:mr-6 animate-in slide-in-from-top-4">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notifications & Alerts</h3>
              <p className="text-[11px] text-slate-500">Official university circulars & academic notices</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearNotifications}
              title="Mark all as read"
              className="p-1.5 rounded-md hover:bg-slate-200/70 text-slate-500 text-xs flex items-center gap-1"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-slate-200/70 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notices list */}
        <div className="p-3 overflow-y-auto divide-y divide-slate-100 space-y-1">
          {notices.map((n) => (
            <div key={n.id} className="py-3 px-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    n.priority === 'Urgent'
                      ? 'bg-rose-100 text-rose-600'
                      : n.priority === 'High'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {n.priority === 'Urgent' ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : n.category === 'Examination' ? (
                    <Calendar className="w-3.5 h-3.5" />
                  ) : (
                    <FileText className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                        n.priority === 'Urgent'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {n.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{n.publishedDate}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 leading-snug line-clamp-2">
                    {n.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {n.content}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                    Issued by: {n.authorName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <Link
            href="/portal/student/notices"
            onClick={onClose}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View All Circulars & Archives &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
