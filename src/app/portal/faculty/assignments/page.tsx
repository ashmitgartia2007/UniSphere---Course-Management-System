'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  FileCheck,
  Plus,
  Clock,
  CheckCircle2,
  X,
  Send,
  User,
  MessageSquare,
} from 'lucide-react';
import { Assessment, AssessmentSubmission } from '@/lib/data/types';

export default function FacultyAssignmentsManagerPage() {
  const { assessments, createAssessment, submissions, gradeSubmission, offerings } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Assessment['type']>('Assignment');
  const [description, setDescription] = useState('');
  const [maxMarks, setMaxMarks] = useState<number>(25);
  const [dueDate, setDueDate] = useState('2026-11-20T23:59:59');

  // Grading states
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [givenMarks, setGivenMarks] = useState<number>(20);
  const [givenFeedback, setGivenFeedback] = useState('');
  const [gradedSuccess, setGradedSuccess] = useState(false);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createAssessment({
      courseOfferingId: offerings[0]?.id || 'offering-cse501',
      title,
      type,
      description,
      maxMarks,
      weightagePercentage: 10,
      dueDate,
    });
    setIsCreateModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleOpenGrade = (sub: AssessmentSubmission) => {
    setGradingSubId(sub.id);
    setGivenMarks(sub.marksObtained || 20);
    setGivenFeedback(sub.feedback || 'Good algorithmic design. Verified test cases.');
    setGradedSuccess(false);
  };

  const handleCommitGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubId) return;
    gradeSubmission(gradingSubId, givenMarks, givenFeedback);
    setGradedSuccess(true);
    setTimeout(() => {
      setGradingSubId(null);
      setGradedSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Assignments &amp; Grading Manager</h1>
          <p className="text-xs text-slate-500 mt-1">
            Create lab tasks, review student file submissions, and publish verified scores
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {/* Active Assignments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assessments.map((ass) => (
          <div key={ass.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                {ass.type}
              </span>
              <span className="text-xs font-mono text-slate-500">Max: {ass.maxMarks} pts</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{ass.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{ass.description}</p>
            <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
              <span>Due: {ass.dueDate.split('T')[0]}</span>
              <span>Weight: {ass.weightagePercentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submissions Evaluation List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          Student Submissions Roster
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-3">Student Name &amp; Enrollment</th>
                <th className="py-3 px-3">Submission Details</th>
                <th className="py-3 px-3">Submitted On</th>
                <th className="py-3 px-3">Evaluation Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((sub) => {
                const isGraded = sub.status === 'Graded';
                return (
                  <tr key={sub.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900">{sub.studentName}</span>
                      <div className="font-mono text-[10px] text-slate-400">{sub.enrollmentNumber}</div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 max-w-sm truncate">
                      {sub.content}
                      {sub.fileName && (
                        <span className="block font-mono text-[10px] text-blue-600 mt-0.5">
                          Attachment: {sub.fileName}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {sub.submissionDate.split('T')[0]}
                    </td>
                    <td className="py-3.5 px-3">
                      {isGraded ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Score: {sub.marksObtained}/{sub.maxMarks}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Pending Review
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => handleOpenGrade(sub)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs inline-flex items-center gap-1 transition cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{isGraded ? 'Edit Grade' : 'Evaluate'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Course Assignment</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Assignment Title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dynamic Programming & Network Flow Problem Set"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Type:</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="LabProject">Lab Project</option>
                    <option value="Quiz">Online Quiz</option>
                    <option value="ClassTest1">Class Test 1</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Max Marks:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Submission Due Date:</label>
                <input
                  type="datetime-local"
                  value={dueDate.slice(0, 16)}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description &amp; Rubrics:</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail problem specs, submission requirements, and code standards..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  Post Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {gradingSubId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Grade Student Submission</h3>
              <button
                onClick={() => setGradingSubId(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {gradedSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Grade and remarks published to student gradebook!</span>
              </div>
            ) : (
              <form onSubmit={handleCommitGrade} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Marks Awarded (out of 25):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    required
                    value={givenMarks}
                    onChange={(e) => setGivenMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Faculty Feedback &amp; Remarks:
                  </label>
                  <textarea
                    rows={3}
                    value={givenFeedback}
                    onChange={(e) => setGivenFeedback(e.target.value)}
                    placeholder="Provide constructive feedback on algorithmic correctness, complexity, and coding style..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setGradingSubId(null)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
                  >
                    Commit &amp; Publish Score
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
