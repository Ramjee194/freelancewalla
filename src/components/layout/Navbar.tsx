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
  { name: 'Reviews', href: '/reviews' },
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

  return (
    <>
      {/* ── Top Announcement Strip ─────────────────────────────────────── */}
      <div className="bg-[#064E3B] text-[#f8e7c9] text-[11px] py-2 px-4 border-b border-[#f8e7c9]/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 text-[#f8e7c9]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f8e7c9]/15 text-[#f8e7c9] font-semibold border border-[#f8e7c9]/30">
              🇮🇳 India&apos;s #1 BPO & Outsourcing Platform
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
            <Link
              href="/careers/roles"
              className="text-[#f8e7c9] font-bold hover:underline transition-colors hidden sm:inline"
            >
              Now Hiring Remote Execs →
            </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Brand Logo ── */}
            <Logo variant="light" size="md" />

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                if (link.children) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setCareersOpen(true)}
                      onMouseLeave={() => setCareersOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                          active
                            ? 'text-[#064E3B] bg-[#e6f4f0] border-b-2 border-[#064E3B]'
                            : 'text-slate-700 hover:text-[#064E3B] hover:bg-[#e6f4f0]/50'
                        }`}
                        aria-expanded={careersOpen}
                      >
                        {link.name}
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
                              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#e6f4f0] hover:text-[#064E3B] font-medium transition-colors"
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
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
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

            {/* ── CTA Buttons ── */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                href="/apply"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#064E3B] bg-[#f8e7c9] hover:bg-[#edd4a6] border border-[#f8e7c9] transition-all shadow-sm"
              >
                <Briefcase className="w-4 h-4 text-[#064E3B]" />
                Apply for Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-[#f8e7c9] bg-[#064E3B] hover:bg-[#04382a] transition-all shadow-md hover:shadow-lg border border-[#f8e7c9]/30"
              >
                <PhoneCall className="w-4 h-4 text-[#f8e7c9]" />
                Get Started
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 top-[108px] z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="bg-white shadow-2xl border-b border-slate-200 pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Logo */}
              <div className="px-5 pt-4 pb-3 border-b border-slate-100">
                <Logo variant="light" size="sm" />
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
          </div>
        )}
      </header>
    </>
  );
}
