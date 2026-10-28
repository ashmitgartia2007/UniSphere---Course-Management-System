'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, User, GraduationCap, Briefcase, ShieldCheck, X } from 'lucide-react';
import { UserProfile, UserRole } from '@/lib/data/types';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleSwitcherModal({ isOpen, onClose }: RoleSwitcherModalProps) {
  const { allUsers, currentUser, switchUser } = useApp();

  if (!isOpen) return null;

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'student':
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'faculty':
        return <Briefcase className="w-5 h-5 text-emerald-600" />;
      case 'department_admin':
        return <User className="w-5 h-5 text-purple-600" />;
      case 'super_admin':
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'faculty':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'department_admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'super_admin':
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const handleSelect = (user: UserProfile) => {
    switchUser(user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Switch Demo Persona / Role</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly preview UniSphere through the lens of any university stakeholder
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200/60 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Options List */}
        <div className="p-4 overflow-y-auto space-y-2.5">
          {allUsers.map((u) => {
            const isSelected = u.id === currentUser.id;
            return (
              <button
                key={u.id}
                onClick={() => handleSelect(u)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 text-sm truncate">{u.name}</span>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full border uppercase tracking-wider ${getRoleBadge(
                        u.role
                      )}`}
                    >
                      {u.role.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 truncate mt-0.5">
                    {u.designation ||
                      (u.role === 'student'
                        ? `${u.enrollmentNumber} • Sem ${u.currentSemester} • ${u.instituteId?.toUpperCase()}`
                        : u.email)}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      {getRoleIcon(u.role)}
                      {u.email}
                    </span>
                    {u.cgpa && (
                      <span className="ml-auto font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.2 rounded">
                        CGPA: {u.cgpa}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Switching roles preserves your live session and updates permissions dynamically.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
