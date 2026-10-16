'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'BPO Services Gurgaon', href: '/bpo-services' },
    { label: 'Careers', href: '/careers' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  services: [
    { label: 'BPO Services in Gurgaon', href: '/bpo-services' },
    { label: 'B2B Business Services', href: '/b2b-services' },
    { label: 'B2C Customer Solutions', href: '/b2c-services' },
    { label: 'Customer Support Outsourcing', href: '/bpo-services#customer-support' },
    { label: 'Data Entry Services', href: '/bpo-services#data-entry' },
    { label: 'Telemarketing & Sales Support', href: '/b2b-services' },
  ],
  applicants: [
    { label: 'Available Roles', href: '/careers/roles' },
    { label: 'Apply Online', href: '/apply' },
    { label: 'Application Process', href: '/careers#application-process' },
    { label: 'Applicant FAQ', href: '/careers#faq' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-[#04382a] text-[#f8e7c9]/90">
      {/* ── CTA Banner ─────────────────────────────────────────────────── */}
      <div
        className="py-12 px-4 border-b border-[#f8e7c9]/15"
        style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #04382a 60%, #02241b 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f8e7c9] mb-2">
              Ready to Scale Your Operations?
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Connect with India&apos;s #1 BPO Platform
            </h2>
            <p className="text-[#f8e7c9]/80 text-sm mt-1">
              Outsource telecalling, support & data entry — or find remote work.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[#064E3B] bg-[#f8e7c9] hover:bg-[#edd4a6] transition-all shadow-lg border border-[#f8e7c9]"
            >
              Hire a Team
              <ArrowRight className="w-4 h-4 text-[#064E3B]" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[#f8e7c9] bg-[#f8e7c9]/10 hover:bg-[#f8e7c9]/20 border border-[#f8e7c9]/30 transition-all"
            >
              Find Work
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="dark" size="md" />

            <p className="text-[#f8e7c9]/70 text-sm leading-relaxed max-w-xs">
              FreelanceWalla is India&apos;s trusted BPO platform — connecting businesses
              with skilled remote teams for telecalling, support, data entry &amp;
              back-office operations.
            </p>

            {/* Contact Pills */}
            <div className="space-y-2.5">
              <a
                href="mailto:info@freelancewalla.in"
                className="flex items-center gap-2.5 text-sm text-[#f8e7c9]/90 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-[#f8e7c9]/10 border border-[#f8e7c9]/20 flex items-center justify-center group-hover:bg-[#f8e7c9]/30 transition-colors">
                  <Mail className="w-4 h-4 text-[#f8e7c9]" />
                </span>
                info@freelancewalla.in
              </a>
              <div className="flex items-start gap-2.5 text-sm text-[#f8e7c9]/90">
                <span className="w-8 h-8 rounded-lg bg-[#f8e7c9]/10 border border-[#f8e7c9]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#f8e7c9]" />
                </span>
                <span className="leading-snug text-xs text-[#f8e7c9]/80">
                  DLF Phase 3, Cyber City, Gurugram (Gurgaon), Haryana – 122002
                </span>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 bg-[#f8e7c9]/10 border border-[#f8e7c9]/20 rounded-xl px-3 py-2.5 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#f8e7c9] shrink-0" />
              <span className="text-xs font-semibold text-[#f8e7c9]">
                Verified Operations & Transparency
              </span>
            </div>
          </div>

          {/* ── Company ── */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#f8e7c9]">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#f8e7c9]/70 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#f8e7c9]/40 group-hover:bg-[#f8e7c9] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#f8e7c9]">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#f8e7c9]/70 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#f8e7c9]/40 group-hover:bg-[#f8e7c9] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── For Applicants + Legal ── */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#f8e7c9]">
                For Applicants
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.applicants.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#f8e7c9]/70 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#f8e7c9]/40 group-hover:bg-[#f8e7c9] transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#f8e7c9]">
                Legal
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#f8e7c9]/70 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#f8e7c9]/40 group-hover:bg-[#f8e7c9] transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────────────────────────── */}
      <div className="border-t border-[#f8e7c9]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#f8e7c9]/60">
          <div className="flex items-center gap-1.5">
            <div className="relative w-4 h-4">
              <Image
                src="/logo.png"
                alt=""
                fill
                sizes="16px"
                className="object-contain brightness-0 invert opacity-50"
              />
            </div>
            <span>© {new Date().getFullYear()} FreelanceWalla. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#f8e7c9]/50">freelancewalla.in</span>
            <Link
              href="/admin/login"
              className="hover:text-white transition-colors border border-[#f8e7c9]/30 rounded px-2 py-0.5 hover:border-[#f8e7c9]"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
