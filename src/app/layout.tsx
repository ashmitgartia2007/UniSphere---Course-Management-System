import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UniSphere | Next-Gen University Management System',
  description:
    'Comprehensive university management portal for Students, Faculty, Department Deans, and Super Admins. Features academic management, attendance tracking, SGPA/CGPA, exam hall tickets, fees, assignments, and admissions.',
  keywords: ['University Management', 'Amizone', 'Student Portal', 'Academic ERP', 'Course Management'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
