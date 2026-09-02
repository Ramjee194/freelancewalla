import Link from 'next/link';
import { Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">
                FW
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Freelance<span className="text-blue-400">Walla</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Business Support. Flexible Work. One Platform.
            </p>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              FreelanceWalla connects businesses with reliable sales, customer support, telecalling, chat, email, and data-entry operations.
            </p>
            <div className="pt-2 flex items-center gap-2 text-sm text-slate-300">
              <Mail className="w-4 h-4 text-blue-400" />
              <a href="mailto:info@freelancewalla.in" className="hover:text-white transition-colors underline decoration-slate-700 underline-offset-4">
                info@freelancewalla.in
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Client & Employee Reviews</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services#sales-telecalling" className="hover:text-white transition-colors">Sales & Telecalling</Link></li>
              <li><Link href="/services#customer-support" className="hover:text-white transition-colors">Customer Support</Link></li>
              <li><Link href="/services#chat-support" className="hover:text-white transition-colors">Chat Support</Link></li>
              <li><Link href="/services#email-support" className="hover:text-white transition-colors">Email Support</Link></li>
              <li><Link href="/services#data-entry" className="hover:text-white transition-colors">Data Entry</Link></li>
              <li><Link href="/services#lead-generation" className="hover:text-white transition-colors">Lead Generation</Link></li>
            </ul>
          </div>

          {/* Column 3: For Applicants & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">For Applicants</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/careers/roles" className="hover:text-white transition-colors">Available Roles</Link></li>
              <li><Link href="/apply" className="hover:text-white transition-colors">Apply Online</Link></li>
              <li><Link href="/careers#application-process" className="hover:text-white transition-colors">Application Process</Link></li>
              <li><Link href="/careers#faq" className="hover:text-white transition-colors">Applicant FAQ</Link></li>
            </ul>
            <div className="pt-4 space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Legal & Transparency</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 FreelanceWalla. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Verified Operations & Transparency
            </span>
            <Link href="/admin/login" className="hover:text-slate-200 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
