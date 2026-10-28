# UniSphere — Next-Generation University Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel)](https://vercel.com)

**UniSphere** is a complete, production-grade university academic and management system inspired by systems like Amizone, designed from scratch with original branding, modern glassmorphic aesthetics, and comprehensive role-based access control (RBAC).

---

## 🏛️ Constituent Institutes & Programs

UniSphere features a fully dynamic multi-institute architecture with 6 foundational faculties:

1. **Amity School of Engineering and Technology (ASET)**
   - **Programs:** B.Tech in Computer Science & Engineering, Electronics & Communication, Civil Engineering, Mechanical Engineering.
   - **Specializations:** Artificial Intelligence & ML, Cloud & Cyber Security, Data Science, Full Stack Development.
2. **Amity Business School (ABS)**
   - **Programs:** Master of Business Administration (MBA), Bachelor of Business Administration (BBA), B.Com (Honours).
   - **Specializations:** Marketing & Sales, Corporate Finance, Human Resources, International Business.
3. **Amity Law School (ALS)**
   - **Programs:** BBA LL.B. (Honours), BA LL.B. (Honours), Master of Laws (LL.M.).
   - **Specializations:** Corporate Law, Intellectual Property Rights, Constitutional Jurisprudence.
4. **Amity Institute of Information Technology (AIIT)**
   - **Programs:** Bachelor of Computer Applications (BCA), Master of Computer Applications (MCA), B.Sc. IT.
   - **Specializations:** Cloud Computing, Enterprise AI, Web & Mobile Architectures.
5. **Amity Institute of Biotechnology (AIB)**
   - **Programs:** B.Tech in Biotechnology, B.Sc. in Biotechnology (Honours).
   - **Specializations:** Genetic Engineering, Bioprocess Technology, Molecular Biology.
6. **Amity Institute of Pharmacy (AIP)**
   - **Programs:** Bachelor of Pharmacy (B.Pharm), Master of Pharmacy (M.Pharm).
   - **Specializations:** Pharmaceutics, Pharmacology, Drug Regulatory Affairs.

---

## 🎯 Role-Based Portals & Key Features

### 1. 🎓 Student Portal (`/portal/student`)
- **Academic Dashboard**: Live CGPA (8.84), aggregate attendance percentage (87.2%), enrolled credits counter, today's schedule.
- **Attendance Tracking & 75% Rule Compliance (`/portal/student/attendance`)**: Subject-wise lectures held vs attended, biometric punch logs, debarment predictor simulator, and digital duty/medical leave application.
- **Weekly Timetable (`/portal/student/timetable`)**: Day-by-day lecture timeline with venue/room allocations and printable master matrix.
- **Course Enrollment & Curriculum (`/portal/student/courses`)**: Enrolled courses, syllabus units breakdown (Units 1-4 with hours), and learning outcomes.
- **Continuous Assessment & Assignments (`/portal/student/assignments`)**: Active coursework, solution file upload submission modal, and faculty feedback review.
- **Examinations & Digital Hall Ticket (`/portal/student/examinations`)**: Exam schedule, hall seat allocations, and verified printable Admit Card with barcode.
- **Academic Results & Transcripts (`/portal/student/results`)**: Semester-wise SGPA and CGPA progression, internal/external mark breakdown, and printable official grade cards.
- **Fee Management & Receipts (`/portal/student/fees`)**: Itemized breakdown (Tuition, Lab, Exam, Hostel), simulated online payment gateway, and printable payment receipts.
- **Digital Locker (`/portal/student/documents`)**: Request and download official signed certificates (Bonafide, Transcripts, NOCs).
- **Notice Board (`/portal/student/notices`)**: Searchable university circulars with category filters and attachment downloads.

### 2. 👨‍🏫 Faculty Portal (`/portal/faculty`)
- **Faculty Dashboard**: Assigned sections, today's teaching schedule, and pending grading queue.
- **Interactive Attendance Marker (`/portal/faculty/attendance`)**: Select course, date, toggle Present / Absent / Medical / On Duty, bulk mark actions, and commit to database.
- **Continuous Assessment Marks Entry (`/portal/faculty/marks`)**: Class Test 1, Class Test 2, Assignments, and Viva marks entry with automated normalization to 30 marks.
- **Assignments Manager (`/portal/faculty/assignments`)**: Create new assignments with deadlines and rubrics; evaluate submissions with marks and comments.
- **Course Handouts (`/portal/faculty/courses`)**: Manage course syllabus and upload lecture handouts.
- **Teaching Timetable (`/portal/faculty/timetable`)**: Weekly teaching commitments with room numbers.
- **Student Mentorship (`/portal/faculty/mentees`)**: Mentee roster with low attendance warnings (<75%) and counseling session logger.

### 3. 🏢 Department / Dean Portal (`/portal/department`)
- **Dean Overview**: Institute KPIs, constituent department rosters, faculty counts, and pass rates.
- **Curriculum & Program Mapping (`/portal/department/curriculum`)**: Create degree programs, configure credits, and define specializations.
- **Faculty Directory (`/portal/department/faculty-list`)**: Institute faculty profiles, qualifications, and cabins.
- **Institutional Approvals Workflow (`/portal/department/approvals`)**: Review and digitally approve student bonafides, transcripts, and leave applications.
- **Department Reports (`/portal/department/reports`)**: Pass percentages, placement statistics, and accreditation reports.

### 4. ⚡ Super Admin Dashboard (`/portal/admin`)
- **Central Governance Overview**: Campus-wide census (12,160 students, 575 faculty, 6 institutes).
- **Multi-Institute Architecture (`/portal/admin/institutes`)**: Add, edit, and configure institutes, campuses, and leadership.
- **User Directory & RBAC (`/portal/admin/users`)**: User provisioning, role switching, and identity management.
- **Academic Sessions (`/portal/admin/sessions`)**: Academic years and active semester configurations.
- **Admissions Engine (`/portal/admin/admissions`)**: Application pipeline with 1-click candidate admission and automated enrollment generation.
- **Fee Structures (`/portal/admin/fees`)**: Campus fee reconciliation and batch demand generation.
- **Broadcast Circulars (`/portal/admin/notices`)**: Campus-wide notice publication with priority and pinning.
- **Executive Analytics (`/portal/admin/analytics`)**: Census distribution graphs and performance dashboards.

---

## ⚡ 1-Click Demo Persona Switcher

UniSphere includes a built-in Quick Persona Switcher in the top navigation bar and landing page, enabling instant evaluation without requiring manual sign-in:

| Persona | Name | Role | Email |
|---|---|---|---|
| **Student** | Aarav Sharma | B.Tech CSE (Sem 5), ASET | `aarav.sharma@s.amity.edu` |
| **Student** | Ishita Roy | MBA (Sem 3), ABS | `ishita.roy@s.amity.edu` |
| **Faculty** | Dr. Ramesh Verma | Professor & HOD, CSE | `rverma@amity.edu` |
| **Dean** | Prof. (Dr.) Sunita Rao | Dean of Engineering, ASET | `srao@amity.edu` |
| **Super Admin** | Senate Secretariat | Chief University Registrar | `admin@amity.edu` |

---

## 🗄️ Relational Database & Supabase Migrations

Complete SQL migrations are provided in the [`supabase/migrations/`](file:///Users/ashmitgartia/Downloads/UniSphere%20-%20Course%20Management%20System/supabase/migrations/) directory:

- **`01_initial_schema.sql`**: Full PostgreSQL schema for institutes, departments, programs, sessions, semesters, user profiles, courses, offerings, enrollments, attendance, assessments, exam schedules, fee invoices, payments, notices, and admissions.
- **`02_rls_policies.sql`**: Comprehensive Row Level Security (RLS) policies enforcing multi-role segregation (students see only their records; faculty manage assigned courses; deans supervise their institute; super admins have full university oversight).
- **`03_functions_and_triggers.sql`**: Stored functions for aggregate attendance calculations, SGPA/CGPA computation, and automated update timestamps.
- **`04_seed_data.sql`**: Production seed data populating all 6 constituent institutes, departments, programs, and sample academic sessions.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or yarn

### 1. Installation
```bash
git clone <repository-url>
cd "UniSphere - Course Management System"
npm install
```

### 2. Environment Variables (Optional for Live Supabase)
UniSphere includes a high-fidelity local state engine that operates seamlessly out-of-the-box with persistent local storage. To connect to a live Supabase project, create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project into your **Vercel** dashboard.
3. (Optional) Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables.
4. Deploy! Next.js 16 will automatically build and optimize all 35 static routes.

---

## 📄 License
MIT License. Created with original design and branding for academic excellence.
