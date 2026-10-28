'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserCheck, CheckCircle2, XCircle, FileText, Clock, AlertCircle } from 'lucide-react';

export default function DepartmentApprovalsPage() {
  const { documentRequests, updateDocumentStatus } = useApp();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filtered = documentRequests.filter((d) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return d.status === 'Pending' || d.status === 'Under Review';
    if (filter === 'Approved') return d.status === 'Ready for Download' || d.status === 'Approved';
    return d.status === 'Rejected';
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Approvals &amp; Clearance</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review and digitally sign bonafide certificates, transcripts, and duty leaves
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filter === tab
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Student Name &amp; ID</th>
                <th className="py-3 px-3">Request Type</th>
                <th className="py-3 px-3">Purpose &amp; Application</th>
                <th className="py-3 px-3">Urgency</th>
                <th className="py-3 px-3">Request Date</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-3 text-right">Dean Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((req) => {
                const isPending = req.status === 'Pending' || req.status === 'Under Review';
                return (
                  <tr key={req.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900">{req.studentName}</span>
                      <div className="font-mono text-[10px] text-slate-400">{req.enrollmentNumber}</div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-purple-900">{req.type}</td>
                    <td className="py-3.5 px-3 text-slate-700 max-w-xs">
                      {req.purpose}
                      {req.remarks && (
                        <p className="text-[10px] text-slate-400 italic mt-0.5">{req.remarks}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-600 font-medium">
                      {req.urgency}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{req.requestDate}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'Approved' || req.status === 'Ready for Download'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {isPending ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              updateDocumentStatus(
                                req.id,
                                'Ready for Download',
                                'Approved & signed by Prof. (Dr.) Sunita Rao (Dean)'
                              )
                            }
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              updateDocumentStatus(req.id, 'Rejected', 'Insufficient verification details')
                            }
                            className="px-3 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-[11px] transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          Signed: {req.approvedBy?.split(' ')[0]}
                        </span>
                      )}
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
