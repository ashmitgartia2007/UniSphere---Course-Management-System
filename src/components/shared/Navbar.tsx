'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  Sparkles,
  ChevronDown,
  Database,
  Building2,
  Menu,
} from 'lucide-react';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import { NotificationsModal } from './NotificationsModal';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { currentUser, isSupabaseConnected, notificationsCount } = useApp();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  const getRoleBadgeStyle = () => {
    switch (currentUser.role) {
      case 'student':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'faculty':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'department_admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'super_admin':
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Left section: Hamburger + Branding */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-700 bg-clip-text text-transparent">
                  UniSphere
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
                  ENTERPRISE ERP
                </span>
              </div>
            </Link>

            {/* Campus & Session indicator */}
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs text-slate-500 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Noida Campus</span>
              <span className="text-slate-300">•</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold text-[11px]">
                Session 2026-27 (Fall)
              </span>
            </div>
          </div>

          {/* Right section: DB status, Quick Switcher, Notifications, User */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Supabase status badge */}
            <div
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                isSupabaseConnected
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
              title={
                isSupabaseConnected
                  ? 'Connected to live Supabase Cloud database'
                  : 'Operating in High-Fidelity Local Persistence mode with full mock state & seed data'
              }
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isSupabaseConnected ? 'Supabase Live' : 'Local Engine'}</span>
            </div>

            {/* Persona Switcher Trigger Button */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
              <span className="hidden sm:inline">Role:</span>
              <span className="capitalize font-bold">{currentUser.role.replace('_', ' ')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifModalOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Current User Avatar & Details */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200 text-left hover:opacity-90 transition-opacity"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-600/20"
              />
              <div className="hidden lg:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wide ${getRoleBadgeStyle()}`}
                  >
                    {currentUser.role.replace('_', ' ')}
                  </span>
                  {currentUser.enrollmentNumber && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {currentUser.enrollmentNumber}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <RoleSwitcherModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      <NotificationsModal isOpen={isNotifModalOpen} onClose={() => setIsNotifModalOpen(false)} />
    </>
  );
}
