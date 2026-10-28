'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  FileCheck,
  Clock,
  UploadCloud,
  CheckCircle2,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react';
import { Assessment } from '@/lib/data/types';

export default function StudentAssignmentsPage() {
  const { assessments, submissions, submitAssignment, currentUser } = useApp();
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleOpenSubmit = (ass: Assessment) => {
    setSelectedAssessment(ass);
    setSubmissionNotes('');
    setSubmissionSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssessment) return;
    submitAssignment(
      selectedAssessment.id,
      submissionNotes || 'Solution submitted with code and documentation.',
      `${currentUser.name.replace(' ', '_')}_${selectedAssessment.title.slice(0, 10)}.pdf`
    );
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSelectedAssessment(null);
      setSubmissionSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Continuous Assessments &amp; Lab Submissions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Submit coursework, track evaluation status, and view faculty feedback
          </p>
        </div>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 gap-4">
        {assessments.map((ass) => {
          const userSub = submissions.find(
            (s) => s.assessmentId === ass.id && s.studentId === currentUser.id
          );
          const isSubmitted = Boolean(userSub);
          const isGraded = userSub?.status === 'Graded';

          return (
            <div
              key={ass.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs transition-all hover:border-slate-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                      {ass.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-500">
                      Max Marks: <strong className="text-slate-800">{ass.maxMarks}</strong>
                    </span>
                    <span className="text-xs font-semibold text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-500">
                      Weightage: <strong className="text-slate-800">{ass.weightagePercentage}%</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{ass.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{ass.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Due Date: <strong className="text-slate-800">{ass.dueDate.split('T')[0]}</strong>
                    </span>
                    <span>Posted: {ass.postedDate}</span>
                  </div>
                </div>

                {/* Right submission status & action button */}
                <div className="flex flex-col sm:items-end justify-between gap-3 self-stretch md:self-auto min-w-[200px]">
                  <div>
                    {isGraded ? (
                      <div className="sm:text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                          Score: {userSub.marksObtained} / {ass.maxMarks}
                        </span>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                          Graded by Faculty
                        </div>
                      </div>
                    ) : isSubmitted && userSub ? (
                      <div className="sm:text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          Submitted for Review
                        </span>
                        <div className="text-[11px] text-slate-400 mt-1">
                          {userSub.submissionDate.split('T')[0]}
                        </div>
                      </div>
                    ) : (
                      <div className="sm:text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          Submission Pending
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenSubmit(ass)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                      isSubmitted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20'
                    }`}
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{isSubmitted ? 'Resubmit / Edit' : 'Submit Solution'}</span>
                  </button>
                </div>
              </div>

              {/* Faculty Feedback Block if graded */}
              {isGraded && userSub.feedback && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Faculty Feedback:
                  </span>
                  <p className="text-slate-600 italic">{userSub.feedback}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Submit Solution: {selectedAssessment.title}
              </h3>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Assignment submitted successfully! Notified Dr. Ramesh Verma.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center space-y-2 hover:border-blue-500 transition-colors bg-slate-50">
                  <UploadCloud className="w-8 h-8 text-blue-600 mx-auto" />
                  <div className="text-xs font-semibold text-slate-700">
                    Click to select file or drag PDF/ZIP here
                  </div>
                  <p className="text-[10px] text-slate-400">PDF, ZIP, DOCX up to 25MB</p>
                  <input type="file" className="text-xs text-slate-500 mx-auto block" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Submission Comments &amp; Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Enter any algorithmic notes, GitHub repository link, or execution instructions..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAssessment(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  >
                    Confirm Submission
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
