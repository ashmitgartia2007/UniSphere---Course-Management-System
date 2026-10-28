'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  FolderLock,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  X,
  ShieldCheck,
} from 'lucide-react';
import { DocumentRequest } from '@/lib/data/types';

export default function StudentDocumentsPage() {
  const { documentRequests, submitDocumentRequest, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docType, setDocType] = useState<DocumentRequest['type']>('Bonafide Certificate');
  const [purpose, setPurpose] = useState('');
  const [urgency, setUrgency] = useState<DocumentRequest['urgency']>('Standard (3 days)');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) return;
    submitDocumentRequest(docType, purpose, urgency);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      setPurpose('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Digital Locker &amp; Institutional Certificates
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Apply for digitally signed bonafide credentials, official transcripts, and NOCs
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Request New Document</span>
        </button>
      </div>

      {/* Document Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FolderLock className="w-4 h-4 text-blue-600" />
          Submitted Document Requests &amp; Vault
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Document Type</th>
                <th className="py-3 px-3">Purpose &amp; Application Details</th>
                <th className="py-3 px-3">Urgency</th>
                <th className="py-3 px-3">Request Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documentRequests.map((doc) => {
                const isReady = doc.status === 'Ready for Download' || doc.status === 'Approved';
                return (
                  <tr key={doc.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 max-w-xs truncate">
                      {doc.purpose}
                      {doc.remarks && (
                        <p className="text-[10px] text-slate-400 mt-0.5">{doc.remarks}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-600 font-medium">
                      {doc.urgency}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {doc.requestDate}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isReady
                            ? 'bg-emerald-100 text-emerald-800'
                            : doc.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {isReady ? (
                        <button
                          onClick={() =>
                            alert(
                              `Downloading digitally signed ${doc.type} verified by Dean of Academic Affairs.`
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Signed PDF</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Processing</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Request Institutional Certificate
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Application submitted to Dean Office! Track status in vault.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Select Certificate Type:
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Bonafide Certificate">Bonafide Certificate (Passport/Visa/Bank)</option>
                    <option value="Official Transcript">Official Transcript (Complete Semesters)</option>
                    <option value="No Objection Certificate (NOC)">No Objection Certificate (NOC - Internship/Hackathon)</option>
                    <option value="Character Certificate">Character &amp; Conduct Certificate</option>
                    <option value="ID Card Re-issue">Student ID Card Re-issue</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Specific Purpose / Justification:
                  </label>
                  <textarea
                    rows={3}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g. Required for Canadian Study Permit or Smart India Hackathon participation..."
                    required
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Processing Priority:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUrgency('Standard (3 days)')}
                      className={`p-2.5 rounded-xl border text-xs font-bold ${
                        urgency === 'Standard (3 days)'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Standard (3 days)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('Urgent (24 hrs)')}
                      className={`p-2.5 rounded-xl border text-xs font-bold ${
                        urgency === 'Urgent (24 hrs)'
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Urgent (24 hrs)
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
