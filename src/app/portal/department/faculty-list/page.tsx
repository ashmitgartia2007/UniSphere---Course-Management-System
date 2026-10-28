'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Users, Mail, Phone, MapPin, Award, BookOpen } from 'lucide-react';

export default function DepartmentFacultyListPage() {
  const { allUsers, currentUser } = useApp();

  const facultyMembers = allUsers.filter(
    (u) => u.role === 'faculty' || u.role === 'department_admin'
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty Directory &amp; Workload</h1>
          <p className="text-xs text-slate-500 mt-1">
            Department of Computer Science &amp; Engineering Faculty Members &amp; Academic Profiles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facultyMembers.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={fac.avatar}
                alt={fac.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-600/20 shadow-xs flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-800">
                  {fac.employeeId || 'FAC-CSE-01'}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 truncate">{fac.name}</h3>
                <p className="text-xs text-slate-500">{fac.designation}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{fac.qualification}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-[11px]">{fac.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{fac.cabinNumber || 'Academic Block E3'}</span>
              </div>
            </div>

            {fac.researchAreas && fac.researchAreas.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Research Specializations:
                </span>
                <div className="flex flex-wrap gap-1">
                  {fac.researchAreas.map((area, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
