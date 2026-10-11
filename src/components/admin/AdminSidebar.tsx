'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, Mail, Star, LogOut, ArrowLeft, Layers } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'B2B Client Leads', href: '/admin/leads', icon: Layers },
    { name: 'Applications', href: '/admin/applications', icon: Users },
    { name: 'Job Vacancies', href: '/admin/roles', icon: Briefcase },
    { name: 'Client Enquiries', href: '/admin/enquiries', icon: Mail },
    { name: 'Reviews Manager', href: '/admin/reviews', icon: Star },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <aside className="w-full lg:w-64 bg-[#064E3B] text-white p-6 rounded-2xl space-y-8 shrink-0 border border-[#04382a] shadow-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f8e7c9] flex items-center justify-center font-bold text-[#064E3B] text-sm shadow-xs">
            FW
          </div>
          <span className="font-extrabold text-lg text-white">Admin Portal</span>
        </div>
        <p className="text-[11px] text-[#f8e7c9]/80">FreelanceWalla Management</p>
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#f8e7c9] text-[#064E3B] font-bold shadow-xs'
                  : 'text-emerald-100/80 hover:text-white hover:bg-[#04382a]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-[#04382a] space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-[#f8e7c9]/90 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Public Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-colors pt-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout Admin Session
        </button>
      </div>
    </aside>
  );
}
