import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ShieldAlert, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Application Submitted | FreelanceWalla',
  description: 'Thank you for applying to FreelanceWalla. Your application has been received.',
  alternates: {
    canonical: 'https://freelancewalla.in/apply/success',
  },
};

export default function ApplicationSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      
      <div className="w-16 h-16 rounded-full bg-[#e6f4f0] text-[#064E3B] mx-auto flex items-center justify-center shadow-xs border border-[#064E3B]/20">
        <CheckCircle2 className="w-10 h-10 text-[#064E3B]" />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Application Submitted
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Thank you for applying to FreelanceWalla. Your application details have been safely received and stored.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs text-left space-y-4">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">What Happens Next?</h2>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
            <span>Your application will be reviewed by our recruitment team against current project requirements.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
            <span>We'll contact you via phone or email if your qualifications match active campaign needs.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
            <span>Our team may arrange a brief role discussion to review call scripts, shift hours, and orientation.</span>
          </li>
        </ul>
      </div>

      <div className="bg-[#fffbeb] border border-[#fde68a] p-5 rounded-xl text-[#78350f] text-xs text-left flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div>
          <strong>Please Note:</strong> Submission of an application does not guarantee employment or selection. Selection depends on role criteria, language requirements, and active client openings.
        </div>
      </div>

      <div className="pt-4 flex justify-center gap-4">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#f8e7c9] bg-[#064E3B] hover:bg-[#04382a] transition-colors shadow-xs border border-[#f8e7c9]/20"
        >
          <Briefcase className="w-4 h-4 text-[#f8e7c9]" />
          Back to Careers
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
        >
          Go to Home
        </Link>
      </div>

    </div>
  );
}
