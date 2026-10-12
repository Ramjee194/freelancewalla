import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Application from '@/lib/models/Application';
import JobRole from '@/lib/models/JobRole';
import ContactInquiry from '@/lib/models/ContactInquiry';
import Review from '@/lib/models/Review';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Users, Briefcase, Mail, Star, FileText, ArrowRight } from 'lucide-react';

export const revalidate = 0; // Dynamic server component

export default async function AdminDashboardPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  await connectToDatabase();

  const [
    newAppsCount,
    underReviewAppsCount,
    activeRolesCount,
    newEnquiriesCount,
    publishedReviewsCount,
  ] = await Promise.all([
    Application.countDocuments({ status: 'New' }),
    Application.countDocuments({ status: 'Under Review' }),
    JobRole.countDocuments({ isActive: true }),
    ContactInquiry.countDocuments({ status: 'New' }),
    Review.countDocuments({ isPublished: true }),
  ]);

  const stats = [
    { name: 'New Applications', count: newAppsCount, href: '/admin/applications?status=New', color: 'bg-[#e6f4f0] text-[#064E3B] border-emerald-200', icon: Users },
    { name: 'Applications Under Review', count: underReviewAppsCount, href: '/admin/applications?status=Under Review', color: 'bg-amber-50 text-amber-900 border-amber-200', icon: FileText },
    { name: 'Active Job Roles', count: activeRolesCount, href: '/admin/roles', color: 'bg-emerald-50 text-emerald-900 border-emerald-200', icon: Briefcase },
    { name: 'New Client Enquiries', count: newEnquiriesCount, href: '/admin/enquiries', color: 'bg-purple-50 text-purple-900 border-purple-200', icon: Mail },
    { name: 'Published Reviews', count: publishedReviewsCount, href: '/admin/reviews', color: 'bg-slate-100 text-slate-900 border-slate-200', icon: Star },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-slate-50 m-0 p-0">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 xl:p-10 space-y-8 w-full min-w-0">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-[#064E3B]">Dashboard Overview</h1>
            <p className="text-xs text-slate-500">Live operational stats for applications, roles, and client inquiries.</p>
          </div>

          {/* STAT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((st) => {
              const Icon = st.icon;
              return (
                <Link
                  key={st.name}
                  href={st.href}
                  className={`p-6 rounded-2xl border ${st.color} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">{st.name}</span>
                    <Icon className="w-5 h-5 opacity-80" />
                  </div>
                  <div className="text-3xl font-extrabold">{st.count}</div>
                  <div className="text-xs font-semibold flex items-center gap-1 opacity-80">
                    Manage Items <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* QUICK MANAGEMENT SHORTCUTS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Quick Administrative Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <Link
                href="/admin/applications"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-800"
              >
                <span>View & Screen Candidate Applications</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/admin/roles"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-800"
              >
                <span>Post / Edit Job Opening Vacancies</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/admin/enquiries"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-800"
              >
                <span>Review Business Client Enquiries</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/admin/reviews"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-800"
              >
                <span>Manage Client & Employee Testimonials</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

        </main>
    </div>
  );
}

