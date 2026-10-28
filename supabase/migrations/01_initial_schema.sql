-- UniSphere University Management System - Initial PostgreSQL Schema
-- Migration: 01_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Role Enums
CREATE TYPE user_role_enum AS ENUM ('student', 'faculty', 'department_admin', 'super_admin');
CREATE TYPE attendance_status_enum AS ENUM ('Present', 'Absent', 'Medical', 'OnDuty');
CREATE TYPE assessment_type_enum AS ENUM ('Assignment', 'Quiz', 'ClassTest1', 'ClassTest2', 'MidTerm', 'LabProject');
CREATE TYPE submission_status_enum AS ENUM ('Submitted', 'Late', 'Graded', 'Pending');
CREATE TYPE fee_status_enum AS ENUM ('Paid', 'Partially Paid', 'Pending', 'Overdue');
CREATE TYPE notice_priority_enum AS ENUM ('Urgent', 'High', 'Normal');
CREATE TYPE notice_category_enum AS ENUM ('Academic', 'Examination', 'Admissions', 'Events', 'Fee', 'General');
CREATE TYPE document_status_enum AS ENUM ('Pending', 'Under Review', 'Approved', 'Rejected', 'Ready for Download');
CREATE TYPE admission_status_enum AS ENUM ('Submitted', 'Under Evaluation', 'Interview Scheduled', 'Admission Offered', 'Enrolled', 'Rejected');

-- 1. Institutes Table
CREATE TABLE IF NOT EXISTS institutes (
    id TEXT PRIMARY KEY,
    code VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50) DEFAULT 'Building',
    campus VARCHAR(255) DEFAULT 'Sector 125, Noida Campus',
    dean_name VARCHAR(255),
    dean_email VARCHAR(255),
    established_year INT DEFAULT 2000,
    departments_count INT DEFAULT 0,
    programs_count INT DEFAULT 0,
    student_count INT DEFAULT 0,
    faculty_count INT DEFAULT 0,
    color_scheme VARCHAR(100) DEFAULT 'from-blue-600 to-indigo-700',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    institute_id TEXT NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
    code VARCHAR(30) NOT NULL,
    name VARCHAR(255) NOT NULL,
    hod_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Programs Table
CREATE TABLE IF NOT EXISTS programs (
    id TEXT PRIMARY KEY,
    institute_id TEXT NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
    department_id TEXT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    level VARCHAR(50) DEFAULT 'Undergraduate',
    duration_years INT NOT NULL,
    total_semesters INT NOT NULL,
    credits_required INT NOT NULL,
    specializations TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Academic Sessions Table
CREATE TABLE IF NOT EXISTS academic_sessions (
    id TEXT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Semesters Table
CREATE TABLE IF NOT EXISTS semesters (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES academic_sessions(id) ON DELETE CASCADE,
    number INT NOT NULL,
    term VARCHAR(20) DEFAULT 'Odd',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. User Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role_enum NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    phone VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    address TEXT,
    
    -- Student Attributes
    enrollment_number VARCHAR(50) UNIQUE,
    roll_number VARCHAR(50),
    institute_id TEXT REFERENCES institutes(id) ON DELETE SET NULL,
    department_id TEXT REFERENCES departments(id) ON DELETE SET NULL,
    program_id TEXT REFERENCES programs(id) ON DELETE SET NULL,
    specialization VARCHAR(150),
    current_semester INT,
    batch_year VARCHAR(50),
    cgpa NUMERIC(4, 2) DEFAULT 0.00,
    mentor_name VARCHAR(255),
    mentor_email VARCHAR(255),
    parent_name VARCHAR(255),
    parent_phone VARCHAR(50),
    hostel_resident BOOLEAN DEFAULT FALSE,
    hostel_room VARCHAR(50),

    -- Faculty Attributes
    employee_id VARCHAR(50) UNIQUE,
    designation VARCHAR(150),
    qualification TEXT,
    cabin_number VARCHAR(100),
    research_areas TEXT[] DEFAULT '{}',

    -- Admin Attributes
    admin_level VARCHAR(50),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    institute_id TEXT NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
    department_id TEXT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    semester_number INT NOT NULL,
    credits INT NOT NULL DEFAULT 4,
    type VARCHAR(30) DEFAULT 'Core',
    description TEXT,
    syllabus_modules JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Course Offerings Table
CREATE TABLE IF NOT EXISTS course_offerings (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    faculty_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    semester_id TEXT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    section VARCHAR(20) DEFAULT 'A',
    schedules JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Student Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    course_offering_id TEXT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester_number INT NOT NULL,
    status VARCHAR(30) DEFAULT 'Enrolled',
    enrolled_date TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_offering_id)
);

-- 10. Attendance Records Table
CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_offering_id TEXT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status attendance_status_enum NOT NULL DEFAULT 'Present',
    marked_by_faculty_id TEXT NOT NULL REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_offering_id, student_id, date, time_slot)
);

-- 11. Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    course_offering_id TEXT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type assessment_type_enum NOT NULL,
    description TEXT,
    max_marks NUMERIC(5, 2) NOT NULL,
    weightage_percentage NUMERIC(5, 2) NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    posted_date DATE DEFAULT CURRENT_DATE,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Assessment Submissions Table
CREATE TABLE IF NOT EXISTS assessment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    submission_date TIMESTAMPTZ DEFAULT NOW(),
    content TEXT,
    file_name VARCHAR(255),
    file_url TEXT,
    status submission_status_enum DEFAULT 'Submitted',
    marks_obtained NUMERIC(5, 2),
    feedback TEXT,
    graded_date TIMESTAMPTZ,
    UNIQUE(assessment_id, student_id)
);

-- 13. Exam Schedules Table
CREATE TABLE IF NOT EXISTS exam_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester_id TEXT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    exam_type VARCHAR(50) NOT NULL DEFAULT 'Mid Term',
    date DATE NOT NULL,
    time_slot VARCHAR(100) NOT NULL,
    reporting_time VARCHAR(50) NOT NULL,
    room_number VARCHAR(100) NOT NULL,
    invigilator_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Fee Invoices Table
CREATE TABLE IF NOT EXISTS fee_invoices (
    id TEXT PRIMARY KEY,
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    student_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    semester_number INT NOT NULL,
    academic_session VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    paid_amount NUMERIC(10, 2) DEFAULT 0.00,
    balance_amount NUMERIC(10, 2) NOT NULL,
    status fee_status_enum DEFAULT 'Pending',
    breakdown JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Fee Payments Table
CREATE TABLE IF NOT EXISTS fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id TEXT NOT NULL REFERENCES fee_invoices(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) NOT NULL,
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    paid_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category notice_category_enum DEFAULT 'General',
    target_institute_id TEXT REFERENCES institutes(id) ON DELETE CASCADE,
    priority notice_priority_enum DEFAULT 'Normal',
    published_date DATE DEFAULT CURRENT_DATE,
    author_name VARCHAR(255) NOT NULL,
    author_designation VARCHAR(255),
    attachments JSONB DEFAULT '[]'::jsonb,
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Document Requests Table
CREATE TABLE IF NOT EXISTS document_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    purpose TEXT NOT NULL,
    urgency VARCHAR(50) DEFAULT 'Standard (3 days)',
    request_date DATE DEFAULT CURRENT_DATE,
    status document_status_enum DEFAULT 'Pending',
    approved_by VARCHAR(255),
    approval_date DATE,
    remarks TEXT,
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Admissions Table
CREATE TABLE IF NOT EXISTS admissions (
    id TEXT PRIMARY KEY,
    application_number VARCHAR(100) UNIQUE NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    institute_id TEXT NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
    program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    category VARCHAR(50) DEFAULT 'General',
    qualifying_exam VARCHAR(150),
    qualifying_percentage NUMERIC(5, 2),
    applied_date DATE DEFAULT CURRENT_DATE,
    status admission_status_enum DEFAULT 'Submitted',
    entrance_score NUMERIC(6, 2),
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for high-performance querying
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_institute ON profiles(institute_id);
CREATE INDEX IF NOT EXISTS idx_courses_program ON courses(program_id, semester_number);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_lookup ON attendance_records(course_offering_id, date);
CREATE INDEX IF NOT EXISTS idx_assessments_offering ON assessments(course_offering_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assessment ON assessment_submissions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_invoices_student ON fee_invoices(student_id);
