import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageSquare,
  Smartphone,
  FileText,
  UserCheck,
  GraduationCap,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import connectToDatabase from '@/lib/db';
import JobRole from '@/lib/models/JobRole';
import { seedDatabase } from '@/lib/seed';
import { FadeIn, StaggerContainer, StaggerItem, PageMotion } from '@/components/common/MotionWrapper';

export const metadata: Metadata = {
  title: 'BPO Careers & Remote Jobs | FreelanceWalla Telecalling & Support',
  description:
    'Join FreelanceWalla BPO and business services for rewarding remote and Gurgaon-based careers in telemarketing and sales support services, customer support, and data entry services.',
  keywords: [
    'Freelancewalla BPO and business services',
    'BPO services',
    'BPO company in Gurgaon',
    'Customer support',
    'Customer support outsourcing services',
    'Data entry',
    'Data entry services in Gurgaon',
    'Sales support',
    'Telemarketing and sales support services',
    'Work From Home Telecalling Jobs',
    'Remote BPO Jobs India',
    'Apply FreelanceWalla',
  ],
  alternates: {
    canonical: 'https://freelancewalla.in/careers',
  },
  openGraph: {
    title: 'BPO Careers & Work Opportunities | FreelanceWalla India',
    description: 'Apply online for remote telecalling, customer support outsourcing, and data entry jobs across India. Zero registration charges.',
    url: 'https://freelancewalla.in/careers',
  },
};

async function getFeaturedRoles() {
  try {
    await connectToDatabase();
    await seedDatabase();
    const roles = await JobRole.find({ isActive: true }).limit(4).lean();
    return JSON.parse(JSON.stringify(roles));
  } catch (error) {
    return [];
  }
}

export default async function CareersPage() {
  const roles = await getFeaturedRoles();

  const requirementCards = [
    {
      title: 'Good Communication Skills',
      desc: 'Ability to speak clearly and communicate effectively with customers.',
      icon: MessageSquare,
    },
    {
      title: 'Smartphone or Laptop with Internet',
      desc: 'Basic device with a stable internet connection for online work.',
      icon: Smartphone,
    },
    {
      title: 'Ability to Follow Call Scripts',
      desc: 'Willingness to learn and follow provided guidelines for professional calls.',
      icon: FileText,
    },
    {
      title: 'Age 18 or Above',
      desc: 'Applicants must meet the minimum age requirement for the applicable role.',
      icon: UserCheck,
    },
    {
      title: 'Willingness to Learn',
      desc: 'Open to learning new skills and following instructions for quality work.',
      icon: GraduationCap,
    },
  ];

  const appSteps = [
    { step: 'Step 1', title: 'Submit Application', desc: 'Fill out our online application form with accurate personal details, device info, and work preferences.' },
    { step: 'Step 2', title: 'Application Review', desc: 'Our recruitment team reviews your submission against current client project requirements.' },
    { step: 'Step 3', title: 'Our Team Contacts You', desc: 'If your profile matches active campaign needs, a representative contacts you via phone or email.' },
    { step: 'Step 4', title: 'Role Discussion / Screening', desc: 'A quick discussion to confirm call scripts, shift hours, language proficiency, and payout terms.' },
    { step: 'Step 5', title: 'Training or Onboarding', desc: 'Receive project guidelines, caller script briefs, and operational instructions before starting.' },
  ];

  const faqs = [
    {
      q: 'Are there any registration charges or application fees?',
      a: 'No. FreelanceWalla never asks applicants for registration fees, deposit charges, or payments. Application is 100% free.',
    },
    {
      q: 'Does submitting an application guarantee selection?',
      a: 'No. Application submission does not guarantee selection or employment. Candidate selection depends on project availability, language requirements, and screening results.',
    },
    {
      q: 'Can freshers apply for telecalling or data entry roles?',
      a: 'Yes. Freshers with clear spoken communication and basic computer/smartphone usage are welcome to apply for entry-level roles.',
    },
    {
      q: 'What equipment do I need for work-from-home roles?',
      a: 'Depending on the role, you need a smartphone or laptop with an active internet connection and a quiet environment for calls.',
    },
  ];

  return (
    <PageMotion className="space-y-16 py-12">
      
      {/* HEADER SECTION WITH FULLSCREEN BACKGROUND IMAGE OVERLAY */}
      <section className="relative bg-[#04382a] text-white py-20 border-b border-[#f8e7c9]/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bpo_data_office.png"
            alt="FreelanceWalla Careers"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04382a] via-[#04382a]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#f8e7c9] bg-[#f8e7c9]/15 px-3 py-1 rounded-full border border-[#f8e7c9]/30">
              Careers & Remote Work
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Find Flexible Work Opportunities With FreelanceWalla
            </h1>
            <p className="text-lg text-[#f8e7c9]/90 leading-relaxed">
              Looking for part-time, full-time or work-from-home opportunities? Explore available roles and apply online. Requirements vary by role.
            </p>
            <div className="pt-2">
              <Link
                href="/careers/roles"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f8e7c9] hover:bg-[#edd4a6] text-[#064E3B] font-bold transition-colors shadow-lg border border-[#f8e7c9]"
              >
                View Available Roles
                <ArrowRight className="w-4 h-4 text-[#064E3B]" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURED ROLES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Openings</h2>
            <p className="text-sm text-slate-600">Current active roles open for application.</p>
          </div>
          <Link href="/careers/roles" className="text-xs font-bold text-[#064E3B] hover:text-[#04382a]">
            View All Openings →
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role: any) => (
            <StaggerItem key={role._id}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-full flex flex-col justify-between hover:border-[#064E3B]/40 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#e6f4f0] text-[#064E3B] border border-[#064E3B]/10">{role.category}</span>
                    <span className="text-xs text-slate-500">{role.workMode}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{role.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link href={`/careers/${role.slug}`} className="text-xs font-semibold text-slate-700 hover:text-[#064E3B]">
                    Read Responsibilities & Requirements
                  </Link>
                  <Link href={`/apply?role=${encodeURIComponent(role.title)}`} className="px-3.5 py-1.5 bg-[#064E3B] text-[#f8e7c9] rounded-lg text-xs font-semibold hover:bg-[#04382a] border border-[#f8e7c9]/20">
                    Apply Online
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* REQUIREMENTS SECTION */}
      <section className="bg-slate-100 py-16 border-y border-slate-200 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">What You May Need</h2>
            <p className="text-slate-600 text-sm">General requirements to apply for freelance and support roles.</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {requirementCards.map((req) => {
              const IconComp = req.icon;
              return (
                <StaggerItem key={req.title}>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#e6f4f0] text-[#064E3B] mx-auto flex items-center justify-center border border-[#064E3B]/10">
                      <IconComp className="w-6 h-6 text-[#064E3B]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{req.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{req.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section id="application-process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <FadeIn className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How the Application Works</h2>
          <p className="text-slate-600 text-sm">5 simple steps from online form to role orientation.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {appSteps.map((s) => (
            <StaggerItem key={s.step}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 h-full">
                <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">{s.step}</span>
                <h3 className="font-bold text-slate-900 text-base">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* TRUST & SAFETY DISCLAIMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-[#92400e]">
            <ShieldAlert className="w-6 h-6 text-[#b45309] shrink-0" />
            <h3 className="text-lg font-bold">Important Information for Applicants</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#78350f]">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#b45309]">•</span>
              <span><strong>No Employment Guarantee:</strong> FreelanceWalla does not guarantee employment simply because an application is submitted. Selection depends on role requirements and the screening process.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#b45309]">•</span>
              <span><strong>Credential Safety:</strong> Never share passwords, OTPs, bank PINs or other confidential credentials during the application process.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#b45309]">•</span>
              <span><strong>Confirm Terms:</strong> Any role-specific compensation, working hours and responsibilities should be confirmed before accepting an opportunity.</span>
            </li>
          </ul>
        </FadeIn>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-6">
        <FadeIn className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-600">Common queries regarding role applications.</p>
        </FadeIn>

        <StaggerContainer className="space-y-4">
          {faqs.map((faq, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#064E3B] shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">{faq.a}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

    </PageMotion>
  );
}
