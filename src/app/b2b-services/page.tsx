import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  TrendingUp,
  Target,
  PhoneCall,
  Users2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  BarChart,
  Layers,
  Building,
  HelpCircle,
  Database,
} from 'lucide-react';
import { FadeIn, PageMotion } from '@/components/common/MotionWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

export const metadata: Metadata = {
  title: 'B2B Business Services in India | Telemarketing & Sales Support – FreelanceWalla',
  description:
    'Accelerate your pipeline with FreelanceWalla B2B business services in India. Dedicated sales support, telemarketing and sales support services, B2B lead generation, and CRM management.',
  keywords: [
    'B2B services',
    'B2B business services in India',
    'Sales support',
    'Telemarketing and sales support services',
    'Freelancewalla BPO and business services',
    'B2B Lead Generation India',
    'Outsourced Inside Sales Team',
    'B2B Cold Calling Services',
    'Enterprise Telecalling Gurgaon',
    'Account Based Marketing Support',
  ],
  alternates: {
    canonical: `${BASE_URL}/b2b-services`,
  },
  openGraph: {
    title: 'B2B Business Services in India | Sales Support – FreelanceWalla',
    description:
      'Scale enterprise revenue with dedicated B2B sales support, telemarketing, and pipeline acceleration across India.',
    url: `${BASE_URL}/b2b-services`,
    siteName: 'FreelanceWalla',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Business Services in India | FreelanceWalla Sales Support',
    description:
      'Custom B2B business services, outbound telemarketing, and dedicated sales support teams in India.',
  },
};

export default function B2bServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}/b2b-services#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'B2B Business Services in India',
            item: `${BASE_URL}/b2b-services`,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/b2b-services#service`,
        name: 'B2B Business Services in India',
        provider: {
          '@type': 'Organization',
          name: 'FreelanceWalla',
          url: BASE_URL,
        },
        serviceType: 'B2B Business Services & Telemarketing Sales Support',
        description:
          'High-performance B2B business services in India including telemarketing and sales support services, B2B lead generation, executive appointment setting, and CRM data management.',
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/b2b-services#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What B2B business services in India does FreelanceWalla offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'FreelanceWalla provides comprehensive B2B business services in India, including dedicated outbound telemarketing, inside sales support teams, B2B decision-maker lead generation, appointment scheduling, pipeline qualification, and CRM database hygiene.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do telemarketing and sales support services accelerate B2B revenue?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our telemarketing and sales support specialists conduct structured outbound outreach to target accounts, qualify prospects using BANT criteria (Budget, Authority, Need, Timeline), and deliver warm sales meetings directly onto your sales team\'s calendar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can FreelanceWalla customize B2B sales campaigns for specific industry niches?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we tailor scripts, caller profiles, and qualification metrics across IT/SaaS, manufacturing, logistics, real estate, financial services, healthcare technology, and corporate consulting industries.',
            },
          },
        ],
      },
    ],
  };

  const b2bPillars = [
    {
      icon: PhoneCall,
      title: 'Telemarketing & Outbound Sales Support',
      desc: 'Trained B2B telecallers who understand complex product value propositions and engage enterprise decision-makers with professionalism and conviction.',
      bullets: ['Cold Outreach & Decision-Maker Calling', 'Lead Nurturing & Follow-up Cadences', 'BANT & MEDDIC Qualification Frameworks', 'Seamless CRM Sync (Salesforce, HubSpot, Zoho)'],
    },
    {
      icon: Target,
      title: 'B2B Lead Generation & Appointment Setting',
      desc: 'Stop wasting sales rep hours on cold prospecting. We fill your calendar with pre-qualified meetings with Directors, VPs, and CXOs.',
      bullets: ['Targeted Account-Based Profiling', 'Phone-Verified Corporate Email & Direct Lines', 'Calendar Invite Booking & Show-Up Reminders', 'Guaranteed Meeting Replacement Policy'],
    },
    {
      icon: Users2,
      title: 'Dedicated Inside Sales Reps (SDRs)',
      desc: 'Full-time or fractional remote SDR teams managed by seasoned operations leads, equipped with premium dialer and CRM stacks.',
      bullets: ['Dedicated Daily Calling Quotas (80–120 Dials)', 'Custom Call Scripts & Objection Handling Guides', 'Bi-weekly Call Coaching & QA Scorecards', 'Transparent Daily Attendance & Activity Logs'],
    },
    {
      icon: Database,
      title: 'B2B Account Data Hygiene & Research',
      desc: 'Clean, enriched, and up-to-date prospect registries ensuring high email deliverability and zero wasted calling minutes.',
      bullets: ['Company Size & Tech-Stack Enrichment', 'LinkedIn & Industry Registry Verification', 'Duplicate Scrubbing & Address Validation', 'Custom Prospect Data Building on Demand'],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageMotion className="space-y-20 py-10">
        {/* ── HERO BANNER ────────────────────────────────────────── */}
        <section className="relative bg-[#04382a] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#f8e7c9]/20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/bpo_workspace.png"
              alt="B2B Business Services in India - Sales support"
              className="w-full h-full object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04382a] via-[#04382a]/95 to-[#02241b]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-8">
            <FadeIn className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8e7c9]/15 border border-[#f8e7c9]/30 text-[#f8e7c9] text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-[#f8e7c9]" />
                Premier B2B Business Services in India
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Enterprise B2B Business Services & Sales Support
              </h1>
              <p className="text-lg sm:text-xl text-[#f8e7c9]/90 leading-relaxed font-light">
                Drive consistent revenue growth with specialized <strong>B2B business services in India</strong>. From high-touch <strong>telemarketing and sales support services</strong> to executive appointment scheduling, FreelanceWalla powers the growth engine of modern businesses.
              </p>
            </FadeIn>

            <FadeIn className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact-us?service=B2B+Sales+Support"
                className="px-8 py-4 rounded-xl font-bold text-[#04382a] bg-[#f8e7c9] hover:bg-white transition-all shadow-lg flex items-center gap-2 group"
              >
                Hire B2B Sales Support Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/bpo-services"
                className="px-6 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                View All BPO Services
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── B2B PILLARS ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#064E3B]/10">
              Corporate Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Comprehensive B2B Business Services Portfolio
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Designed specifically to take high-friction pipeline development off your internal sales reps, so your team can focus 100% on closing deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {b2bPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-slate-200/90 hover:border-[#064E3B]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center border border-[#064E3B]/10">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{pillar.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                    <ul className="space-y-2 pt-2 border-t border-slate-100">
                      {pillar.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={`/contact-us?service=${encodeURIComponent(pillar.title)}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#064E3B] hover:text-[#04382a]"
                    >
                      Deploy Specialists for {pillar.title} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── B2B FAQ ────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#064E3B]/10">
              Clear Answers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions About B2B Business Services
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                What B2B business services in India does FreelanceWalla offer?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                FreelanceWalla provides comprehensive B2B business services in India, including dedicated outbound telemarketing, inside sales support teams, B2B decision-maker lead generation, appointment scheduling, pipeline qualification, and CRM database hygiene.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                How do telemarketing and sales support services accelerate B2B revenue?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                Our telemarketing and sales support specialists conduct structured outbound outreach to target accounts, qualify prospects using BANT criteria (Budget, Authority, Need, Timeline), and deliver warm sales meetings directly onto your sales team&apos;s calendar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                Can FreelanceWalla customize B2B sales campaigns for specific industry niches?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                Yes, we tailor scripts, caller profiles, and qualification metrics across IT/SaaS, manufacturing, logistics, real estate, financial services, healthcare technology, and corporate consulting industries.
              </p>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#04382a] to-[#02241b] text-white p-8 sm:p-14 border border-[#f8e7c9]/25 shadow-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Accelerate Your Enterprise Sales Pipeline?
            </h2>
            <p className="text-[#f8e7c9]/90 max-w-2xl mx-auto text-base">
              Speak with our B2B campaign strategists today and receive a detailed outreach roadmap for your business.
            </p>
            <div className="pt-2">
              <Link
                href="/contact-us"
                className="inline-flex px-8 py-4 rounded-xl font-bold text-[#04382a] bg-[#f8e7c9] hover:bg-white transition-all shadow-md"
              >
                Request Custom B2B Sales Proposal
              </Link>
            </div>
          </div>
        </section>
      </PageMotion>
    </>
  );
}
