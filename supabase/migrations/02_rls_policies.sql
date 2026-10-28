-- UniSphere University Management System - Row Level Security (RLS) Policies
-- Migration: 02_rls_policies.sql

-- Enable RLS on all sensitive tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's profile role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS user_role_enum AS $$
  SELECT role FROM profiles WHERE auth_user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function to check if current user is Super Admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE auth_user_id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function to check if current user is Department Admin / Dean
CREATE OR REPLACE FUNCTION is_department_admin(target_institute_id TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE auth_user_id = auth.uid() 
      AND (role = 'super_admin' OR (role = 'department_admin' AND institute_id = target_institute_id))
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. Institutes & Courses: Public read access, admin write access
CREATE POLICY "Institutes are readable by all authenticated users"
ON institutes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Institutes modifiable only by super admins"
ON institutes FOR ALL TO authenticated USING (is_super_admin());

CREATE POLICY "Courses are readable by all authenticated users"
ON courses FOR SELECT TO authenticated USING (true);

CREATE POLICY "Courses modifiable by department admins and super admins"
ON courses FOR ALL TO authenticated USING (
  is_super_admin() OR 
  EXISTS (SELECT 1 FROM profiles WHERE auth_user_id = auth.uid() AND role = 'department_admin' AND institute_id = courses.institute_id)
);

-- 2. Profiles Policies
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT TO authenticated
USING (auth_user_id = auth.uid() OR is_super_admin() OR role = 'faculty');

CREATE POLICY "Users can update limited own profile details"
ON profiles FOR UPDATE TO authenticated
USING (auth_user_id = auth.uid())
WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "Admins have full access to profiles"
ON profiles FOR ALL TO authenticated
USING (is_super_admin());

-- 3. Attendance Records Policies
CREATE POLICY "Students can view their own attendance records"
ON attendance_records FOR SELECT TO authenticated
USING (
  student_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()) OR
  marked_by_faculty_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()) OR
  is_super_admin()
);

CREATE POLICY "Faculty can mark and update attendance"
ON attendance_records FOR ALL TO authenticated
USING (
  marked_by_faculty_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()) OR
  is_super_admin()
);

-- 4. Assessments and Submissions Policies
CREATE POLICY "Submissions visible to student owner and grading faculty"
ON assessment_submissions FOR SELECT TO authenticated
USING (
  student_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()) OR
  EXISTS (
    SELECT 1 FROM assessments a 
    JOIN course_offerings co ON a.course_offering_id = co.id
    WHERE a.id = assessment_submissions.assessment_id 
      AND co.faculty_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
  ) OR
  is_super_admin()
);

CREATE POLICY "Students can submit their own assessments"
ON assessment_submissions FOR INSERT TO authenticated
WITH CHECK (
  student_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
);

CREATE POLICY "Faculty can grade assessment submissions"
ON assessment_submissions FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM assessments a 
    JOIN course_offerings co ON a.course_offering_id = co.id
    WHERE a.id = assessment_submissions.assessment_id 
      AND co.faculty_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
  ) OR
  is_super_admin()
);

-- 5. Fee Invoices & Payments Policies
CREATE POLICY "Students can view their own fee invoices"
ON fee_invoices FOR SELECT TO authenticated
USING (
  student_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()) OR
  is_super_admin()
);

CREATE POLICY "Students can view their own fee payments"
ON fee_payments FOR SELECT TO authenticated
USING (
  student_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()) OR
  is_super_admin()
);

-- 6. Document Requests Policies
CREATE POLICY "Students can view and create document requests"
ON document_requests FOR SELECT TO authenticated
USING (
  student_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid()) OR
  is_super_admin() OR
  EXISTS (SELECT 1 FROM profiles WHERE auth_user_id = auth.uid() AND role = 'department_admin')
);

CREATE POLICY "Students can submit document requests"
ON document_requests FOR INSERT TO authenticated
WITH CHECK (
  student_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())
);

CREATE POLICY "Department admins and super admins can approve documents"
ON document_requests FOR UPDATE TO authenticated
USING (
  is_super_admin() OR
  EXISTS (SELECT 1 FROM profiles WHERE auth_user_id = auth.uid() AND role = 'department_admin')
);

-- 7. Notices: Publicly visible, manageable by admins and faculty
CREATE POLICY "Notices are readable by all authenticated users"
ON notices FOR SELECT TO authenticated USING (true);

CREATE POLICY "Notices can be published by faculty and admins"
ON notices FOR ALL TO authenticated
USING (
  is_super_admin() OR
  EXISTS (SELECT 1 FROM profiles WHERE auth_user_id = auth.uid() AND role IN ('faculty', 'department_admin'))
);
