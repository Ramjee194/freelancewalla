'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Briefcase,
  ArrowRight,
  PhoneCall,
  Mail,
  ChevronDown,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import NavbarProfile from '@/components/layout/NavbarProfile';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Agency Network', href: '/agency-network' },
  { name: 'About', href: '/about' },
  {
    name: 'Careers',
    href: '/careers',
    children: [
      { name: 'Overview', href: '/careers' },
      { name: 'Available Roles', href: '/careers/roles' },
      { name: 'Apply Online', href: '/apply' },
    ],
  },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {/* ── Top Announcement Strip ─────────────────────────────────────── */}
      <div className="bg-[#064E3B] text-[#f8e7c9] text-[11px] py-2 px-4 border-b border-[#f8e7c9]/15">
        <div className={`mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 ${isAdmin ? 'w-full px-2' : 'max-w-7xl'}`}>
          <div className="flex items-center gap-2 text-[#f8e7c9]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f8e7c9]/15 text-[#f8e7c9] font-semibold border border-[#f8e7c9]/30">
              {isAdmin ? '🛡️ FreelanceWalla Admin Portal' : "🇮🇳 India's #1 BPO & Outsourcing Platform"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#f8e7c9]/90">
            <a
              href="mailto:info@freelancewalla.in"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-[#f8e7c9]" />
              info@freelancewalla.in
            </a>
            <span className="text-[#f8e7c9]/30 hidden sm:inline">|</span>
            {isAdmin ? (
              <Link
                href="/"
                className="text-[#f8e7c9] font-bold hover:underline transition-colors hidden sm:inline"
              >
                ← View Public Website
              </Link>
            ) : (
              <Link
                href="/careers/roles"
                className="text-[#f8e7c9] font-bold hover:underline transition-colors hidden sm:inline"
              >
                Now Hiring Remote Execs →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Navbar ───────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-lg border-b border-[#064E3B]/10'
            : 'bg-white border-b border-slate-100 shadow-sm'
        }`}
      >
        <div className={isAdmin ? 'w-full px-4 sm:px-6 lg:px-8' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Brand Logo ── */}
            <div className="flex items-center gap-3">
              <Logo variant="light" size="md" />
              {isAdmin && (
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#064E3B] text-[#f8e7c9] border border-[#f8e7c9]/20 shadow-xs">
                  Admin Panel
                </span>
              )}
            </div>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                if (link.children) {
                  return (
                    <div
                      key={link.name}
                      className="relative shrink-0"
                      onMouseEnter={() => setCareersOpen(true)}
                      onMouseLeave={() => setCareersOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                          active
                            ? 'text-[#064E3B] bg-[#e6f4f0] border-b-2 border-[#064E3B]'
                            : 'text-slate-700 hover:text-[#064E3B] hover:bg-[#e6f4f0]/50'
                        }`}
                        aria-expanded={careersOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            careersOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {/* Dropdown */}
                      {careersOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-[#064E3B]/10 py-1.5 z-50">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#e6f4f0] hover:text-[#064E3B] font-medium transition-colors whitespace-nowrap"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-2.5 xl:px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                      active
                        ? 'text-[#064E3B] bg-[#e6f4f0] border-b-2 border-[#064E3B]'
                        : 'text-slate-700 hover:text-[#064E3B] hover:bg-[#e6f4f0]/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA Buttons & Profile ── */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
              <Link
                href="/apply"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#064E3B] bg-[#f8e7c9] hover:bg-[#edd4a6] border border-[#f8e7c9] transition-all shadow-sm whitespace-nowrap shrink-0"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                <span>Apply for Work</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#f8e7c9] bg-[#064E3B] hover:bg-[#04382a] transition-all shadow-sm hover:shadow-md border border-[#f8e7c9]/30 whitespace-nowrap shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#f8e7c9] shrink-0" />
                <span>Get Started</span>
              </Link>

              {/* User / Agency Profile or Login */}
              <div className="shrink-0">
                <NavbarProfile />
              </div>
            </div>

            {/* ── Mobile Hamburger Toggle ── */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu Dropdown (Flush to Header) ── */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="lg:hidden fixed inset-0 top-[60px] z-40 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sliding Dropdown (No duplicate logo) */}
            <div
              className="lg:hidden absolute top-full left-0 right-0 w-full bg-white shadow-2xl border-b border-slate-200 z-50 max-h-[calc(100vh-75px)] overflow-y-auto pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Card / Sign In (No duplicate logo above it) */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <NavbarProfile isMobileDrawer={true} />
              </div>

              <div className="px-4 pt-3 space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  if (link.children) {
                    return (
                      <div key={link.name}>
                        <div
                          className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                            active ? 'text-[#064E3B] bg-[#e6f4f0]' : 'text-slate-700'
                          }`}
                        >
                          {link.name}
                        </div>
                        <div className="ml-4 mt-1 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-[#e6f4f0] hover:text-[#064E3B]"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                        active
                          ? 'text-[#064E3B] bg-[#e6f4f0] border-l-4 border-[#064E3B]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="px-4 pt-4 flex flex-col gap-3">
                <Link
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-[#064E3B] bg-[#f8e7c9] border border-[#f8e7c9]"
                >
                  <Briefcase className="w-4 h-4" />
                  Apply for Work
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-[#f8e7c9] bg-[#064E3B] shadow-md"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
