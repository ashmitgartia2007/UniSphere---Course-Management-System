-- UniSphere University Management System - Production Seed Data
-- Migration: 04_seed_data.sql

-- 1. Insert Institutes
INSERT INTO institutes (id, code, name, short_name, description, icon_name, campus, dean_name, dean_email, established_year, departments_count, programs_count, student_count, faculty_count, color_scheme)
VALUES
('aset', 'ASET', 'Amity School of Engineering and Technology', 'Engineering & Tech', 'Premier institution fostering innovative engineering, AI research, and applied technological advancements.', 'Cpu', 'Sector 125, Noida Campus', 'Prof. (Dr.) Sunita Rao', 'srao@amity.edu', 2003, 4, 6, 3840, 168, 'from-blue-600 to-indigo-700'),
('abs', 'ABS', 'Amity Business School', 'Business School', 'Leading global business school shaping future corporate executives, entrepreneurs, and finance leaders.', 'Briefcase', 'Sector 125, Noida Campus', 'Prof. (Dr.) Sanjeev Bansal', 'sbansal@amity.edu', 1999, 3, 5, 2950, 124, 'from-emerald-600 to-teal-700'),
('als', 'ALS', 'Amity Law School', 'Law School', 'Premier faculty of legal studies, constitutional jurisprudence, human rights, and corporate law.', 'Scale', 'Sector 125, Noida Campus', 'Prof. (Dr.) D.K. Bandyopadhyay', 'dkbandyopadhyay@amity.edu', 2004, 2, 4, 2120, 92, 'from-amber-600 to-orange-700'),
('aiit', 'AIIT', 'Amity Institute of Information Technology', 'Information Technology', 'Center of excellence for computer applications, cloud computing, and advanced software systems.', 'Terminal', 'Sector 125, Noida Campus', 'Prof. (Dr.) Ajay Rana', 'arana@amity.edu', 2001, 2, 4, 1850, 78, 'from-cyan-600 to-blue-700'),
('aib', 'AIB', 'Amity Institute of Biotechnology', 'Biotechnology', 'Advanced genomics, molecular biology, bioprocess engineering, and bioinformatics research center.', 'Dna', 'Sector 125, Noida Campus', 'Prof. (Dr.) Chanderdeep Tandon', 'ctandon@amity.edu', 2002, 2, 3, 1420, 65, 'from-purple-600 to-violet-700'),
('aip', 'AIP', 'Amity Institute of Pharmacy', 'Pharmacy', 'PCI-approved pharmaceutical sciences, drug discovery, clinical trials, and pharmacology studies.', 'Pill', 'Sector 125, Noida Campus', 'Prof. (Dr.) Raman Dang', 'rdang@amity.edu', 2007, 2, 3, 980, 48, 'from-rose-600 to-pink-700')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Departments
INSERT INTO departments (id, institute_id, code, name, hod_name, email, phone)
VALUES
('dept-cse', 'aset', 'CSE', 'Computer Science and Engineering', 'Dr. Ramesh Verma', 'hod.cse@amity.edu', '+91 120 4392001'),
('dept-ece', 'aset', 'ECE', 'Electronics and Communication Engineering', 'Dr. Neeraj Kumar', 'hod.ece@amity.edu', '+91 120 4392002'),
('dept-ce', 'aset', 'CE', 'Civil Engineering', 'Dr. Harish Joshi', 'hod.ce@amity.edu', '+91 120 4392003'),
('dept-me', 'aset', 'ME', 'Mechanical Engineering', 'Dr. Alok Mittal', 'hod.me@amity.edu', '+91 120 4392004'),
('dept-mgmt', 'abs', 'MGMT', 'General Management & Strategy', 'Dr. Shalini Mukherjee', 'hod.mgmt@amity.edu', '+91 120 4392101'),
('dept-fin', 'abs', 'FIN', 'Finance and Commerce', 'Dr. Rajiv Anand', 'hod.fin@amity.edu', '+91 120 4392102'),
('dept-law', 'als', 'LAW', 'School of Law & Jurisprudence', 'Dr. Vikramaditya Rao', 'hod.law@amity.edu', '+91 120 4392201'),
('dept-it', 'aiit', 'IT', 'Information Technology & Applications', 'Dr. Preeti Sinha', 'hod.it@amity.edu', '+91 120 4392301'),
('dept-bio', 'aib', 'BIO', 'Biotechnology & Bioinformatics', 'Dr. Rajesh Bannerjee', 'hod.bio@amity.edu', '+91 120 4392401'),
('dept-pharm', 'aip', 'PHARM', 'Pharmaceutical Sciences', 'Dr. Sunita Kulkarni', 'hod.pharm@amity.edu', '+91 120 4392501')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Programs
INSERT INTO programs (id, institute_id, department_id, code, name, level, duration_years, total_semesters, credits_required, specializations)
VALUES
('prog-btech-cse', 'aset', 'dept-cse', 'BTECH_CSE', 'B.Tech in Computer Science & Engineering', 'Undergraduate', 4, 8, 160, ARRAY['Artificial Intelligence & ML', 'Cloud & Cyber Security', 'Data Science', 'Full Stack Development']),
('prog-btech-ece', 'aset', 'dept-ece', 'BTECH_ECE', 'B.Tech in Electronics & Communication', 'Undergraduate', 4, 8, 160, ARRAY['VLSI Design', 'Embedded Systems & IoT']),
('prog-btech-ce', 'aset', 'dept-ce', 'BTECH_CE', 'B.Tech in Civil Engineering', 'Undergraduate', 4, 8, 160, ARRAY['Structural Engineering', 'Environmental Engineering']),
('prog-btech-me', 'aset', 'dept-me', 'BTECH_ME', 'B.Tech in Mechanical Engineering', 'Undergraduate', 4, 8, 160, ARRAY['Robotics & Automation', 'Automotive Engineering']),
('prog-mba', 'abs', 'dept-mgmt', 'MBA', 'Master of Business Administration (MBA)', 'Postgraduate', 2, 4, 104, ARRAY['Marketing & Sales', 'Corporate Finance', 'Human Resources', 'International Business']),
('prog-bba', 'abs', 'dept-mgmt', 'BBA', 'Bachelor of Business Administration (BBA)', 'Undergraduate', 3, 6, 120, ARRAY['Finance', 'Marketing', 'Digital Business']),
('prog-bcom', 'abs', 'dept-fin', 'BCOM', 'B.Com (Honours)', 'Undergraduate', 3, 6, 120, ARRAY['Accounting & Auditing', 'FinTech']),
('prog-bba-llb', 'als', 'dept-law', 'BBA_LLB', 'BBA LL.B. (Honours)', 'Undergraduate', 5, 10, 220, ARRAY['Corporate Law', 'Intellectual Property Rights']),
('prog-ba-llb', 'als', 'dept-law', 'BA_LLB', 'BA LL.B. (Honours)', 'Undergraduate', 5, 10, 220, ARRAY['Constitutional Law', 'Criminal Jurisprudence']),
('prog-llm', 'als', 'dept-law', 'LLM', 'Master of Laws (LL.M.)', 'Postgraduate', 1, 2, 36, ARRAY['Corporate & Commercial Law', 'Cyber Law']),
('prog-bca', 'aiit', 'dept-it', 'BCA', 'Bachelor of Computer Applications (BCA)', 'Undergraduate', 3, 6, 120, ARRAY['Web Technologies', 'Mobile App Development']),
('prog-mca', 'aiit', 'dept-it', 'MCA', 'Master of Computer Applications (MCA)', 'Postgraduate', 2, 4, 88, ARRAY['Cloud Computing', 'Enterprise AI']),
('prog-bsc-it', 'aiit', 'dept-it', 'BSC_IT', 'B.Sc. in Information Technology', 'Undergraduate', 3, 6, 120, ARRAY['Data Analytics', 'Network Security']),
('prog-btech-bio', 'aib', 'dept-bio', 'BTECH_BIO', 'B.Tech in Biotechnology', 'Undergraduate', 4, 8, 160, ARRAY['Genetic Engineering', 'Bioprocess Technology']),
('prog-bsc-bio', 'aib', 'dept-bio', 'BSC_BIO', 'B.Sc. in Biotechnology (Honours)', 'Undergraduate', 3, 6, 120, ARRAY['Molecular Biology', 'Immunology']),
('prog-bpharm', 'aip', 'dept-pharm', 'BPHARM', 'Bachelor of Pharmacy (B.Pharm)', 'Undergraduate', 4, 8, 160, ARRAY['Pharmaceutics', 'Pharmacology']),
('prog-mpharm', 'aip', 'dept-pharm', 'MPHARM', 'Master of Pharmacy (M.Pharm)', 'Postgraduate', 2, 4, 84, ARRAY['Clinical Pharmacy', 'Drug Regulatory Affairs'])
ON CONFLICT (id) DO NOTHING;

-- 4. Academic Sessions and Semesters
INSERT INTO academic_sessions (id, name, start_date, end_date, is_current)
VALUES ('sess-2026-2027', '2026 - 2027', '2026-07-15', '2027-06-30', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO semesters (id, session_id, number, term, start_date, end_date, is_current)
VALUES 
('sem-2026-odd', 'sess-2026-2027', 5, 'Odd', '2026-07-20', '2026-12-15', TRUE),
('sem-2026-even', 'sess-2026-2027', 6, 'Even', '2027-01-08', '2027-05-30', FALSE)
ON CONFLICT (id) DO NOTHING;
