'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Briefcase, ArrowRight, PhoneCall, Mail, Sparkles } from 'lucide-react';
import Logo from '@/components/common/Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Available Roles', href: '/careers/roles' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-300 font-semibold text-[11px]">
              <Sparkles className="w-3 h-3 text-blue-400" /> BPO & Freelance Operations
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden sm:inline">Connecting businesses with sales, telecalling & customer support teams.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <a href="mailto:info@freelancewalla.in" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-blue-400" /> info@freelancewalla.in
            </a>
            <span className="text-slate-700">|</span>
            <Link href="/careers/roles" className="text-blue-400 font-semibold hover:underline">
              Now Hiring Remote Execs →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Official Brand Logo */}
            <Logo variant="light" size="md" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? 'text-blue-950 bg-blue-50/80 font-bold border-b-2 border-blue-900'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/apply"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
              >
                <Briefcase className="w-4 h-4 text-slate-500" />
                Apply for Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition-all shadow-xs hover:shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                Get a Quote
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-28 bg-slate-950/50 z-40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)}>
            <div 
              className="bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                        active
                          ? 'text-blue-900 bg-blue-50 font-bold border-l-4 border-blue-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <Link
                  href="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Apply for Work
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 rounded-lg text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 flex items-center justify-center gap-2 shadow-xs"
                >
                  Get a Free Quote
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
