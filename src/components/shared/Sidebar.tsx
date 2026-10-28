'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Calendar,
  BookOpen,
  FileCheck,
  Award,
  CreditCard,
  FolderLock,
  Bell,
  Users,
  Building,
  GraduationCap,
  Layers,
  Settings,
  ShieldCheck,
  CheckSquare,
  BarChart3,
  UserCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface SidebarLinkItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  badge?: string;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { currentUser, switchRole } = useApp();

  const studentLinks: SidebarLinkItem[] = [
    { label: 'Dashboard', href: '/portal/student', icon: LayoutDashboard },
    { label: 'Attendance Tracking', href: '/portal/student/attendance', icon: CalendarCheck, badge: '75% Rule' },
    { label: 'Weekly Timetable', href: '/portal/student/timetable', icon: Calendar },
    { label: 'Course Enrollment', href: '/portal/student/courses', icon: BookOpen },
    { label: 'Assignments & Projects', href: '/portal/student/assignments', icon: FileCheck },
    { label: 'Exams & Admit Card', href: '/portal/student/examinations', icon: Award, highlight: true },
    { label: 'Results & CGPA', href: '/portal/student/results', icon: BarChart3 },
    { label: 'Fees & Receipts', href: '/portal/student/fees', icon: CreditCard },
    { label: 'Digital Locker', href: '/portal/student/documents', icon: FolderLock },
    { label: 'Notice Board', href: '/portal/student/notices', icon: Bell },
  ];

  const facultyLinks: SidebarLinkItem[] = [
    { label: 'Faculty Dashboard', href: '/portal/faculty', icon: LayoutDashboard },
    { label: 'Mark Attendance', href: '/portal/faculty/attendance', icon: CalendarCheck, highlight: true },
    { label: 'Internal Marks Entry', href: '/portal/faculty/marks', icon: CheckSquare },
    { label: 'Courses & Syllabus', href: '/portal/faculty/courses', icon: BookOpen },
    { label: 'Assignments & Grading', href: '/portal/faculty/assignments', icon: FileCheck },
    { label: 'Lecture Schedule', href: '/portal/faculty/timetable', icon: Clock },
    { label: 'Mentee Students', href: '/portal/faculty/mentees', icon: Users },
  ];

  const departmentLinks: SidebarLinkItem[] = [
    { label: 'Institute Overview', href: '/portal/department', icon: Building },
    { label: 'Curriculum & Programs', href: '/portal/department/curriculum', icon: BookOpen },
    { label: 'Faculty Directory', href: '/portal/department/faculty-list', icon: Users },
    { label: 'Approvals & Requests', href: '/portal/department/approvals', icon: UserCheck, badge: '2 Pending' },
    { label: 'Department Reports', href: '/portal/department/reports', icon: BarChart3 },
  ];

  const adminLinks: SidebarLinkItem[] = [
    { label: 'Campus Dashboard', href: '/portal/admin', icon: LayoutDashboard },
    { label: 'Institutes & Programs', href: '/portal/admin/institutes', icon: Building, highlight: true },
    { label: 'User Directory & RBAC', href: '/portal/admin/users', icon: ShieldCheck },
    { label: 'Academic Sessions', href: '/portal/admin/sessions', icon: Layers },
    { label: 'Admissions Pipeline', href: '/portal/admin/admissions', icon: GraduationCap, badge: 'New' },
    { label: 'Fee Management', href: '/portal/admin/fees', icon: CreditCard },
    { label: 'Broadcast Notices', href: '/portal/admin/notices', icon: Bell },
    { label: 'Campus Analytics', href: '/portal/admin/analytics', icon: BarChart3 },
  ];

  const getActiveLinks = () => {
    switch (currentUser.role) {
      case 'student':
        return studentLinks;
      case 'faculty':
        return facultyLinks;
      case 'department_admin':
        return departmentLinks;
      case 'super_admin':
        return adminLinks;
    }
  };

  const activeLinks = getActiveLinks();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Role Portal Header Banner */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70">
          <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Active Portal
          </div>
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <span className="capitalize">{currentUser.role.replace('_', ' ')} Portal</span>
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {activeLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : item.highlight ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Switcher Card for Quick Demonstration */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80">
          <div className="rounded-xl border border-blue-200/60 bg-blue-50/40 p-2.5 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" /> Quick Portal Switch:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => switchRole('student')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition ${
                  currentUser.role === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => switchRole('faculty')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition ${
                  currentUser.role === 'faculty'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => switchRole('department_admin')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition ${
                  currentUser.role === 'department_admin'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                Dean / HOD
              </button>
              <button
                onClick={() => switchRole('super_admin')}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition ${
                  currentUser.role === 'super_admin'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                Super Admin
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
