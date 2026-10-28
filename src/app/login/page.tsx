'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  GraduationCap,
  Briefcase,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '@/lib/data/types';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole, allUsers } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('aarav.sharma@s.amity.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    switch (role) {
      case 'student':
        setEmail('aarav.sharma@s.amity.edu');
        break;
      case 'faculty':
        setEmail('rverma@amity.edu');
        break;
      case 'department_admin':
        setEmail('srao@amity.edu');
        break;
      case 'super_admin':
        setEmail('admin@amity.edu');
        break;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    switchRole(selectedRole);

    setTimeout(() => {
      setIsLoading(false);
      switch (selectedRole) {
        case 'student':
          router.push('/portal/student');
          break;
        case 'faculty':
          router.push('/portal/faculty');
          break;
        case 'department_admin':
          router.push('/portal/department');
          break;
        case 'super_admin':
          router.push('/portal/admin');
          break;
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white">UniSphere</span>
        </Link>
        <h2 className="text-2xl font-black text-white">Sign In to University Portal</h2>
        <p className="text-xs text-slate-400">
          Enter your institutional credentials or select a 1-click demo persona
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Quick Persona Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Select Stakeholder Persona:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  selectedRole === 'student'
                    ? 'border-blue-500 bg-blue-950/60 text-blue-300 ring-1 ring-blue-500'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('faculty')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  selectedRole === 'faculty'
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 ring-1 ring-emerald-500'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Faculty</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('department_admin')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  selectedRole === 'department_admin'
                    ? 'border-purple-500 bg-purple-950/60 text-purple-300 ring-1 ring-purple-500'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Dean / HOD</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('super_admin')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  selectedRole === 'super_admin'
                    ? 'border-amber-500 bg-amber-950/60 text-amber-300 ring-1 ring-amber-500'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Super Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Institutional Email / Roll No:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating Session...' : 'Authenticate & Enter Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Demo Credentials Pre-Loaded:
            </span>
            <p>
              Clicking any stakeholder role automatically sets up authentic demo credentials and launches the respective console with full CRUD privileges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
