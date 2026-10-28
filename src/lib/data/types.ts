export type UserRole = 'student' | 'faculty' | 'department_admin' | 'super_admin';

export interface Institute {
  id: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  campus: string;
  deanName: string;
  deanEmail: string;
  establishedYear: number;
  departmentsCount: number;
  programsCount: number;
  studentCount: number;
  facultyCount: number;
  colorScheme: string;
}

export interface Department {
  id: string;
  instituteId: string;
  code: string;
  name: string;
  hodName: string;
  email: string;
  phone: string;
}

export interface Program {
  id: string;
  instituteId: string;
  departmentId: string;
  code: string;
  name: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Doctoral' | 'Diploma';
  durationYears: number;
  totalSemesters: number;
  creditsRequired: number;
  specializations: string[];
}

export interface AcademicSession {
  id: string;
  name: string; // e.g., "2025-2026", "2026-2027"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Semester {
  id: string;
  sessionId: string;
  number: number;
  term: 'Odd' | 'Even' | 'Summer';
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  address?: string;
  
  // Student Specific
  enrollmentNumber?: string;
  rollNumber?: string;
  instituteId?: string;
  departmentId?: string;
  programId?: string;
  specialization?: string;
  currentSemester?: number;
  batchYear?: string;
  cgpa?: number;
  sgpaList?: Array<{ semester: number; sgpa: number }>;
  mentorName?: string;
  mentorEmail?: string;
  parentName?: string;
  parentPhone?: string;
  hostelResident?: boolean;
  hostelRoom?: string;

  // Faculty Specific
  employeeId?: string;
  designation?: string;
  qualification?: string;
  cabinNumber?: string;
  researchAreas?: string[];

  // Admin Specific
  adminLevel?: 'Institute' | 'University';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instituteId: string;
  departmentId: string;
  programId: string;
  semesterNumber: number;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab' | 'Project';
  description: string;
  syllabusModules: Array<{
    unit: number;
    title: string;
    description: string;
    hours: number;
  }>;
}

export interface CourseSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
}

export interface CourseOffering {
  id: string;
  courseId: string;
  facultyId: string;
  facultyName: string;
  semesterId: string;
  section: string;
  schedules: CourseSchedule[];
}

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseOfferingId: string;
  courseId: string;
  semesterNumber: number;
  status: 'Enrolled' | 'Dropped' | 'Completed';
  enrolledDate: string;
}

export interface AttendanceRecord {
  id: string;
  courseOfferingId: string;
  studentId: string;
  date: string;
  timeSlot: string;
  status: 'Present' | 'Absent' | 'Medical' | 'OnDuty';
  markedByFacultyId: string;
  notes?: string;
}

export interface CourseAttendanceSummary {
  courseOfferingId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  facultyName: string;
  totalHeld: number;
  attended: number;
  percentage: number;
  status: 'Safe' | 'Warning' | 'Critical'; // Safe >= 75%, Warning 65-74%, Critical < 65%
  canMissToStay75: number;
  needToAttendToReach75: number;
}

export interface Assessment {
  id: string;
  courseOfferingId: string;
  title: string;
  type: 'Assignment' | 'Quiz' | 'ClassTest1' | 'ClassTest2' | 'MidTerm' | 'LabProject';
  description: string;
  maxMarks: number;
  weightagePercentage: number;
  dueDate: string;
  postedDate: string;
  attachments?: Array<{ name: string; url: string; size: string }>;
}

export interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  enrollmentNumber: string;
  submissionDate: string;
  content: string;
  fileName?: string;
  status: 'Submitted' | 'Late' | 'Graded' | 'Pending';
  marksObtained?: number;
  maxMarks: number;
  feedback?: string;
  gradedDate?: string;
}

export interface ExamScheduleItem {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  semesterNumber: number;
  examType: 'Mid Term' | 'End Term' | 'Backlog / Improvement';
  date: string;
  timeSlot: string;
  reportingTime: string;
  roomNumber: string;
  seatNumber: string;
  invigilatorName: string;
}

export interface SemesterResult {
  id: string;
  studentId: string;
  semesterNumber: number;
  academicYear: string;
  sgpa: number;
  cgpaUpToNow: number;
  totalCreditsEarned: number;
  resultStatus: 'Passed' | 'Passed with Distinction' | 'Backlog' | 'Withheld';
  publishedDate: string;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credits: number;
    internalMarks: number;
    externalMarks: number;
    totalMarks: number;
    letterGrade: string;
    gradePoint: number;
    status: 'Pass' | 'Fail';
  }>;
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  enrollmentNumber: string;
  programName: string;
  semesterNumber: number;
  academicSession: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: 'Paid' | 'Partially Paid' | 'Pending' | 'Overdue';
  breakdown: Array<{
    head: string;
    amount: number;
  }>;
  payments: Array<{
    paymentId: string;
    amount: number;
    date: string;
    method: 'Credit Card' | 'Net Banking' | 'UPI' | 'Demand Draft';
    transactionId: string;
    receiptNumber: string;
  }>;
}

export interface UniversityNotice {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Examination' | 'Admissions' | 'Events' | 'Fee' | 'General';
  targetInstituteId?: string | null; // null = all institutes
  priority: 'Urgent' | 'High' | 'Normal';
  publishedDate: string;
  authorName: string;
  authorDesignation: string;
  attachments?: Array<{ name: string; size: string }>;
  pinned?: boolean;
}

export interface DocumentRequest {
  id: string;
  studentId: string;
  studentName: string;
  enrollmentNumber: string;
  type: 'Bonafide Certificate' | 'Official Transcript' | 'No Objection Certificate (NOC)' | 'ID Card Re-issue' | 'Character Certificate';
  purpose: string;
  urgency: 'Standard (3 days)' | 'Urgent (24 hrs)';
  requestDate: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Ready for Download';
  approvedBy?: string;
  approvalDate?: string;
  remarks?: string;
  downloadUrl?: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  instituteId: string;
  instituteName: string;
  programId: string;
  programName: string;
  category: 'General' | 'OBC' | 'SC/ST' | 'NRI';
  qualifyingExam: string;
  qualifyingPercentage: number;
  appliedDate: string;
  status: 'Submitted' | 'Under Evaluation' | 'Interview Scheduled' | 'Admission Offered' | 'Enrolled' | 'Rejected';
  entranceScore?: number;
  remarks?: string;
}

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  category: 'Holiday' | 'Exam' | 'Admissions' | 'Sports/Fest' | 'Lecture Commencement';
  description: string;
}
