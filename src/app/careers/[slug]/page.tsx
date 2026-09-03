import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, MapPin, CheckCircle2, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import JobRole from '@/lib/models/JobRole';
import { defaultJobRoles } from '@/lib/constants';

async function getRoleBySlug(slug: string) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbRole = await JobRole.findOne({ slug, isActive: true }).lean();
      if (dbRole) return JSON.parse(JSON.stringify(dbRole));
    }
  } catch (err) {
    console.warn('Error fetching role from DB:', err);
  }
  // Fallback to defaultJobRoles
  const fallback = defaultJobRoles.find((r) => r.slug === slug || r.title.toLowerCase().replace(/\s+/g, '-') === slug);
  return fallback || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) {
    return { title: 'Role Not Found | FreelanceWalla' };
  }
  return {
    title: `${role.title} | Careers at FreelanceWalla`,
    description: role.description,
  };
}

export default async function RoleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);

  if (!role) {
    notFound();
  }

  const jobPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.description,
    identifier: {
      '@type': 'PropertyValue',
      name: 'FreelanceWalla',
      value: role.slug,
    },
    datePosted: '2026-01-01',
    validThrough: '2027-12-31',
    employmentType: Array.isArray(role.workType) ? role.workType.map((t: string) => t.toUpperCase().replace(/\s+/g, '_')) : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'FreelanceWalla',
      sameAs: 'https://freelancewalla.in',
      logo: 'https://freelancewalla.in/images/brand_logo.svg',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'India',
    },
    jobLocationType: 'TELECOMMUTE',
  };

  return (
    <div className="space-y-12 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }}
      />
      
      {/* HEADER BAR */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/careers/roles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Available Roles
          </Link>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-900 text-blue-300 border border-blue-700">
              {role.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">{role.workMode}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {role.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Work Type: {Array.isArray(role.workType) ? role.workType.join(', ') : role.workType}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-400" />
              Location: {role.location}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* MAIN ROLE DETAILS CARD */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-8">
          
          {/* Summary Description */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Role Overview</h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {role.description}
            </p>
            {role.isSalaryVisible && role.salaryText && (
              <div className="mt-2 p-3 bg-blue-50 text-blue-900 rounded-lg text-xs font-semibold">
                Salary / Payout Note: {role.salaryText}
              </div>
            )}
          </div>

          {/* Key Responsibilities */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Key Responsibilities</h2>
            <ul className="space-y-3">
              {role.responsibilities?.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements & Qualifications */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Requirements & Qualifications</h2>
            <ul className="space-y-3">
              {role.requirements?.map((req: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Steps Summary */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">How to Apply for this Role</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click the "Apply for This Role" button below to fill out our online form. Be prepared to provide your contact info, location, device details, and language fluency.
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Application is free. FreelanceWalla never asks for registration fees.
            </div>
            <Link
              href={`/apply?role=${encodeURIComponent(role.title)}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 transition-colors shadow-xs"
            >
              Apply for This Role
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Safety Warning Box */}
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-amber-950 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Applicant Safety Reminder:</strong> Submission of an application does not guarantee employment. Never share passwords, OTPs, or bank PINs with anyone.
          </div>
        </div>

      </div>
    </div>
  );
}
