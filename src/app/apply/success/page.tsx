import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldAlert, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Application Submitted | FreelanceWalla',
  description: 'Thank you for applying to FreelanceWalla. Your application has been received.',
};

export default function ApplicationSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
        <CheckCircle2 className="w-10 h-10" />
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
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Your application will be reviewed by our recruitment team against current project requirements.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>We'll contact you via phone or email if your qualifications match active campaign needs.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Our team may arrange a brief role discussion to review call scripts, shift hours, and orientation.</span>
          </li>
        </ul>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-amber-950 text-xs text-left flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Please Note:</strong> Submission of an application does not guarantee employment or selection. Selection depends on role criteria, language requirements, and active client openings.
        </div>
      </div>

      <div className="pt-4 flex justify-center gap-4">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 transition-colors shadow-xs"
        >
          <Briefcase className="w-4 h-4" />
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
