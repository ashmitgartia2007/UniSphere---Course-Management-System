'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Institute,
  Department,
  Program,
  Course,
  CourseOffering,
  CourseAttendanceSummary,
  AttendanceRecord,
  Assessment,
  AssessmentSubmission,
  ExamScheduleItem,
  SemesterResult,
  FeeInvoice,
  UniversityNotice,
  DocumentRequest,
  AdmissionApplication,
  AcademicCalendarEvent,
} from '@/lib/data/types';
import {
  INITIAL_INSTITUTES,
  INITIAL_DEPARTMENTS,
  INITIAL_PROGRAMS,
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_OFFERINGS,
  INITIAL_STUDENT_ATTENDANCE_SUMMARY,
  INITIAL_ATTENDANCE_LOGS,
  INITIAL_ASSESSMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_EXAM_SCHEDULE,
  INITIAL_SEMESTER_RESULTS,
  INITIAL_FEE_INVOICES,
  INITIAL_NOTICES,
  INITIAL_DOCUMENT_REQUESTS,
  INITIAL_ADMISSIONS,
  INITIAL_CALENDAR_EVENTS,
} from '@/lib/data/initialData';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

interface AppContextType {
  // Authentication & Current Profile
  currentUser: UserProfile;
  allUsers: UserProfile[];
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  isSupabaseConnected: boolean;

  // Institutes, Departments & Programs
  institutes: Institute[];
  addInstitute: (inst: Omit<Institute, 'id'>) => void;
  updateInstitute: (id: string, inst: Partial<Institute>) => void;
  departments: Department[];
  addDepartment: (dept: Omit<Department, 'id'>) => void;
  programs: Program[];
  addProgram: (prog: Omit<Program, 'id'>) => void;

  // Courses & Offerings
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  offerings: CourseOffering[];

  // Attendance
  attendanceSummary: CourseAttendanceSummary[];
  attendanceLogs: AttendanceRecord[];
  markAttendance: (
    courseOfferingId: string,
    studentId: string,
    status: 'Present' | 'Absent' | 'Medical' | 'OnDuty',
    date?: string
  ) => void;
  bulkMarkAttendance: (
    courseOfferingId: string,
    records: Array<{ studentId: string; status: 'Present' | 'Absent' | 'Medical' | 'OnDuty' }>,
    date: string
  ) => void;

  // Assessments & Submissions
  assessments: Assessment[];
  createAssessment: (assessment: Omit<Assessment, 'id' | 'postedDate'>) => void;
  submissions: AssessmentSubmission[];
  submitAssignment: (assessmentId: string, content: string, fileName?: string) => void;
  gradeSubmission: (submissionId: string, marks: number, feedback: string) => void;

  // Examinations & Results
  examSchedule: ExamScheduleItem[];
  semesterResults: SemesterResult[];

  // Fees
  feeInvoices: FeeInvoice[];
  payFeeInvoice: (
    invoiceId: string,
    amount: number,
    paymentMethod: 'Credit Card' | 'Net Banking' | 'UPI' | 'Demand Draft'
  ) => { success: boolean; receiptNumber: string };

  // Notices
  notices: UniversityNotice[];
  publishNotice: (notice: Omit<UniversityNotice, 'id' | 'publishedDate'>) => void;
  deleteNotice: (noticeId: string) => void;

  // Documents
  documentRequests: DocumentRequest[];
  submitDocumentRequest: (type: DocumentRequest['type'], purpose: string, urgency: DocumentRequest['urgency']) => void;
  updateDocumentStatus: (
    id: string,
    status: DocumentRequest['status'],
    remarks?: string,
    downloadUrl?: string
  ) => void;

  // Admissions
  admissions: AdmissionApplication[];
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], remarks?: string) => void;
  enrollApplicant: (id: string) => void;

  // Calendar
  calendarEvents: AcademicCalendarEvent[];

  // Toast / System Notifications
  notificationsCount: number;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'unisphere_state_v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[0]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [institutes, setInstitutes] = useState<Institute[]>(INITIAL_INSTITUTES);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [offerings, setOfferings] = useState<CourseOffering[]>(INITIAL_OFFERINGS);
  const [attendanceSummary, setAttendanceSummary] = useState<CourseAttendanceSummary[]>(INITIAL_STUDENT_ATTENDANCE_SUMMARY);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_LOGS);
  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(INITIAL_SUBMISSIONS);
  const [examSchedule, setExamSchedule] = useState<ExamScheduleItem[]>(INITIAL_EXAM_SCHEDULE);
  const [semesterResults, setSemesterResults] = useState<SemesterResult[]>(INITIAL_SEMESTER_RESULTS);
  const [feeInvoices, setFeeInvoices] = useState<FeeInvoice[]>(INITIAL_FEE_INVOICES);
  const [notices, setNotices] = useState<UniversityNotice[]>(INITIAL_NOTICES);
  const [documentRequests, setDocumentRequests] = useState<DocumentRequest[]>(INITIAL_DOCUMENT_REQUESTS);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(INITIAL_ADMISSIONS);
  const [calendarEvents] = useState<AcademicCalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [notificationsCount, setNotificationsCount] = useState<number>(3);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted state from localStorage on browser mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.allUsers) setAllUsers(parsed.allUsers);
        if (parsed.institutes) setInstitutes(parsed.institutes);
        if (parsed.departments) setDepartments(parsed.departments);
        if (parsed.programs) setPrograms(parsed.programs);
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.attendanceSummary) setAttendanceSummary(parsed.attendanceSummary);
        if (parsed.attendanceLogs) setAttendanceLogs(parsed.attendanceLogs);
        if (parsed.assessments) setAssessments(parsed.assessments);
        if (parsed.submissions) setSubmissions(parsed.submissions);
        if (parsed.feeInvoices) setFeeInvoices(parsed.feeInvoices);
        if (parsed.notices) setNotices(parsed.notices);
        if (parsed.documentRequests) setDocumentRequests(parsed.documentRequests);
        if (parsed.admissions) setAdmissions(parsed.admissions);
      }
    } catch {
      // ignore JSON parse error in SSR or invalid storage
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentUser,
          allUsers,
          institutes,
          departments,
          programs,
          courses,
          attendanceSummary,
          attendanceLogs,
          assessments,
          submissions,
          feeInvoices,
          notices,
          documentRequests,
          admissions,
        })
      );
    } catch {
      // storage quota or error
    }
  }, [
    isLoaded,
    currentUser,
    allUsers,
    institutes,
    departments,
    programs,
    courses,
    attendanceSummary,
    attendanceLogs,
    assessments,
    submissions,
    feeInvoices,
    notices,
    documentRequests,
    admissions,
  ]);

  // Switch Active User
  const switchUser = (userId: string) => {
    const found = allUsers.find((u) => u.id === userId);
    if (found) setCurrentUser(found);
  };

  // Switch Role
  const switchRole = (role: UserRole) => {
    const found = allUsers.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
    }
  };

  // Institutes Management
  const addInstitute = (inst: Omit<Institute, 'id'>) => {
    const newId = `inst-${Date.now().toString(36)}`;
    const newInst: Institute = { ...inst, id: newId };
    setInstitutes((prev) => [newInst, ...prev]);
  };

  const updateInstitute = (id: string, updated: Partial<Institute>) => {
    setInstitutes((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, ...updated } : inst))
    );
  };

  // Departments Management
  const addDepartment = (dept: Omit<Department, 'id'>) => {
    const newId = `dept-${Date.now().toString(36)}`;
    const newDept: Department = { ...dept, id: newId };
    setDepartments((prev) => [...prev, newDept]);
  };

  // Programs Management
  const addProgram = (prog: Omit<Program, 'id'>) => {
    const newId = `prog-${Date.now().toString(36)}`;
    const newProg: Program = { ...prog, id: newId };
    setPrograms((prev) => [...prev, newProg]);
  };

  // Courses Management
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newId = `course-${Date.now().toString(36)}`;
    const newCourse: Course = { ...course, id: newId };
    setCourses((prev) => [newCourse, ...prev]);
  };

  // Attendance Management
  const markAttendance = (
    courseOfferingId: string,
    studentId: string,
    status: 'Present' | 'Absent' | 'Medical' | 'OnDuty',
    date: string = new Date().toISOString().split('T')[0]
  ) => {
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      courseOfferingId,
      studentId,
      date,
      timeSlot: '09:15 - 10:10',
      status,
      markedByFacultyId: currentUser.id,
    };

    setAttendanceLogs((prev) => [newRecord, ...prev]);

    // Recalculate summary if student is currentUser
    if (studentId === currentUser.id) {
      setAttendanceSummary((prev) =>
        prev.map((item) => {
          if (item.courseOfferingId === courseOfferingId) {
            const isAttended = status === 'Present' || status === 'OnDuty';
            const newTotal = item.totalHeld + 1;
            const newAttended = item.attended + (isAttended ? 1 : 0);
            const newPct = Number(((newAttended / newTotal) * 100).toFixed(1));
            const newStatus = newPct >= 75 ? 'Safe' : newPct >= 65 ? 'Warning' : 'Critical';
            const canMiss = Math.max(0, Math.floor(newAttended / 0.75 - newTotal));
            const needAttend = Math.max(0, Math.ceil((0.75 * newTotal - newAttended) / 0.25));

            return {
              ...item,
              totalHeld: newTotal,
              attended: newAttended,
              percentage: newPct,
              status: newStatus,
              canMissToStay75: canMiss,
              needToAttendToReach75: needAttend,
            };
          }
          return item;
        })
      );
    }
  };

  const bulkMarkAttendance = (
    courseOfferingId: string,
    records: Array<{ studentId: string; status: 'Present' | 'Absent' | 'Medical' | 'OnDuty' }>,
    date: string
  ) => {
    const createdRecords: AttendanceRecord[] = records.map((r, i) => ({
      id: `att-bulk-${Date.now()}-${i}`,
      courseOfferingId,
      studentId: r.studentId,
      date,
      timeSlot: '10:15 - 11:10',
      status: r.status,
      markedByFacultyId: currentUser.id,
    }));
    setAttendanceLogs((prev) => [...createdRecords, ...prev]);
  };

  // Assessment & Submissions
  const createAssessment = (assessment: Omit<Assessment, 'id' | 'postedDate'>) => {
    const newAss: Assessment = {
      ...assessment,
      id: `ass-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setAssessments((prev) => [newAss, ...prev]);
  };

  const submitAssignment = (assessmentId: string, content: string, fileName?: string) => {
    const existing = submissions.find(
      (s) => s.assessmentId === assessmentId && s.studentId === currentUser.id
    );
    const ass = assessments.find((a) => a.id === assessmentId);
    const maxMarks = ass ? ass.maxMarks : 25;

    if (existing) {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === existing.id
            ? {
                ...s,
                content,
                fileName: fileName || s.fileName,
                submissionDate: new Date().toISOString(),
                status: 'Submitted',
              }
            : s
        )
      );
    } else {
      const newSub: AssessmentSubmission = {
        id: `sub-${Date.now()}`,
        assessmentId,
        studentId: currentUser.id,
        studentName: currentUser.name,
        enrollmentNumber: currentUser.enrollmentNumber || 'A2305221042',
        submissionDate: new Date().toISOString(),
        content,
        fileName: fileName || 'assignment_submission.pdf',
        status: 'Submitted',
        maxMarks,
      };
      setSubmissions((prev) => [newSub, ...prev]);
    }
  };

  const gradeSubmission = (submissionId: string, marks: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              marksObtained: marks,
              feedback,
              status: 'Graded',
              gradedDate: new Date().toISOString().split('T')[0],
            }
          : s
      )
    );
  };

  // Fees
  const payFeeInvoice = (
    invoiceId: string,
    amount: number,
    paymentMethod: 'Credit Card' | 'Net Banking' | 'UPI' | 'Demand Draft'
  ) => {
    const receiptNum = `RCPT/${new Date().getFullYear()}/${currentUser.instituteId?.toUpperCase() || 'UNI'}/${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    const txId = `TXN${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 900 + 100)}`;

    setFeeInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const newPaid = inv.paidAmount + amount;
          const newBalance = Math.max(0, inv.totalAmount - newPaid);
          const newStatus = newBalance === 0 ? 'Paid' : 'Partially Paid';
          const newPayment = {
            paymentId: `pay-${Date.now()}`,
            amount,
            date: new Date().toISOString().split('T')[0],
            method: paymentMethod,
            transactionId: txId,
            receiptNumber: receiptNum,
          };
          return {
            ...inv,
            paidAmount: newPaid,
            balanceAmount: newBalance,
            status: newStatus,
            payments: [...inv.payments, newPayment],
          };
        }
        return inv;
      })
    );

    return { success: true, receiptNumber: receiptNum };
  };

  // Notices
  const publishNotice = (notice: Omit<UniversityNotice, 'id' | 'publishedDate'>) => {
    const newNotice: UniversityNotice = {
      ...notice,
      id: `not-${Date.now()}`,
      publishedDate: new Date().toISOString().split('T')[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  const deleteNotice = (noticeId: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== noticeId));
  };

  // Document Requests
  const submitDocumentRequest = (
    type: DocumentRequest['type'],
    purpose: string,
    urgency: DocumentRequest['urgency']
  ) => {
    const newDoc: DocumentRequest = {
      id: `doc-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      enrollmentNumber: currentUser.enrollmentNumber || 'A2305221042',
      type,
      purpose,
      urgency,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setDocumentRequests((prev) => [newDoc, ...prev]);
  };

  const updateDocumentStatus = (
    id: string,
    status: DocumentRequest['status'],
    remarks?: string,
    downloadUrl?: string
  ) => {
    setDocumentRequests((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status,
              remarks: remarks || doc.remarks,
              approvedBy: currentUser.name,
              approvalDate: new Date().toISOString().split('T')[0],
              downloadUrl: downloadUrl || '#',
            }
          : doc
      )
    );
  };

  // Admissions
  const updateAdmissionStatus = (
    id: string,
    status: AdmissionApplication['status'],
    remarks?: string
  ) => {
    setAdmissions((prev) =>
      prev.map((adm) =>
        adm.id === id
          ? {
              ...adm,
              status,
              remarks: remarks || adm.remarks,
            }
          : adm
      )
    );
  };

  const enrollApplicant = (id: string) => {
    const app = admissions.find((a) => a.id === id);
    if (!app) return;

    // Create a new enrolled student in allUsers
    const enrollNum = `A260${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newStudentUser: UserProfile = {
      id: `user-student-${app.id}`,
      role: 'student',
      name: app.applicantName,
      email: app.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: app.phone,
      enrollmentNumber: enrollNum,
      rollNumber: `2026${app.programName.slice(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`,
      instituteId: app.instituteId,
      programId: app.programId,
      currentSemester: 1,
      batchYear: '2026 - 2030',
      cgpa: 0.0,
      sgpaList: [],
    };

    setAllUsers((prev) => [newStudentUser, ...prev]);
    updateAdmissionStatus(id, 'Enrolled', `Enrolled as Student. Enrollment No: ${enrollNum}`);
  };

  const clearNotifications = () => {
    setNotificationsCount(0);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        switchUser,
        switchRole,
        isSupabaseConnected: isSupabaseConfigured,
        institutes,
        addInstitute,
        updateInstitute,
        departments,
        addDepartment,
        programs,
        addProgram,
        courses,
        addCourse,
        offerings,
        attendanceSummary,
        attendanceLogs,
        markAttendance,
        bulkMarkAttendance,
        assessments,
        createAssessment,
        submissions,
        submitAssignment,
        gradeSubmission,
        examSchedule,
        semesterResults,
        feeInvoices,
        payFeeInvoice,
        notices,
        publishNotice,
        deleteNotice,
        documentRequests,
        submitDocumentRequest,
        updateDocumentStatus,
        admissions,
        updateAdmissionStatus,
        enrollApplicant,
        calendarEvents,
        notificationsCount,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
