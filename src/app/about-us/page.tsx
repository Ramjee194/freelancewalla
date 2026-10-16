import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Eye, ShieldCheck, HeartHandshake, BookOpen, CheckCircle, MapPin, Building2, Users, Award, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, PageMotion } from '@/components/common/MotionWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

export const metadata: Metadata = {
  title: 'About FreelanceWalla | #1 BPO Company in Gurgaon & Business Services India',
  description:
    'FreelanceWalla is India\'s top BPO and business services platform headquartered at DLF Phase 3, Cyber City, Gurugram. Specializing in BPO services, B2B business services in India, customer support outsourcing, and data entry.',
  keywords: [
    'Freelancewalla BPO and business services',
    'BPO services',
    'BPO company in Gurgaon',
    'Customer support outsourcing services',
    'Data entry services in Gurgaon',
    'B2B business services in India',
    'About FreelanceWalla',
    'DLF Cyber City BPO',
  ],
  alternates: {
    canonical: `${BASE_URL}/about-us`,
  },
  openGraph: {
    title: 'About FreelanceWalla | Top BPO Company in Gurgaon, India',
    description: 'Learn about FreelanceWalla BPO and business services headquartered in Cyber City Gurgaon.',
    url: `${BASE_URL}/about-us`,
    siteName: 'FreelanceWalla',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}/about-us#breadcrumb`,
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
            name: 'About Us',
            item: `${BASE_URL}/about-us`,
          },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'FreelanceWalla',
        url: `${BASE_URL}/about-us`,
        logo: `${BASE_URL}/logo.png`,
        description:
          'FreelanceWalla is India\'s premier BPO company in Gurgaon delivering high-impact B2B business services, customer support outsourcing services, data entry, and telemarketing.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'DLF Phase 3, Cyber City',
          addressLocality: 'Gurugram',
          addressRegion: 'Haryana',
          postalCode: '122002',
          addressCountry: 'IN',
        },
      },
    ],
  };

  const values = [
    { title: 'Operational Transparency', desc: 'Clear SLAs, transparent reporting, and real-time dashboard visibility across every customer support and telecalling campaign.', icon: Eye },
    { title: 'Enterprise Quality', desc: 'Rigorous quality assurance scorecards, audio evaluations, and adherence to international BPO standards.', icon: ShieldCheck },
    { title: 'SLA Reliability', desc: 'Dependable team attendance, 99.8% data entry precision, and sub-30-second customer response times.', icon: CheckCircle },
    { title: 'Ethical Operations', desc: 'Equitable compensation for remote telecallers and ethical business practices for corporate partners.', icon: HeartHandshake },
    { title: 'Continuous Training', desc: 'Ongoing skill upgrades in dialer software, dialect modulation, objection handling, and CRM hygiene.', icon: BookOpen },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageMotion className="space-y-16 py-12">
        {/* HEADER SECTION WITH BACKGROUND */}
        <section className="relative bg-[#04382a] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#f8e7c9]/15 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/bpo_workspace.png"
              alt="Freelancewalla BPO and business services headquarters"
              className="w-full h-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04382a] via-[#04382a]/85 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-6">
            <FadeIn className="max-w-3xl space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#f8e7c9] bg-[#f8e7c9]/15 px-3 py-1 rounded-full border border-[#f8e7c9]/30">
                Official Company Profile
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                About FreelanceWalla BPO and Business Services
              </h1>
              <p className="text-lg text-[#f8e7c9]/90 leading-relaxed">
                Headquartered in <strong>DLF Phase 3, Cyber City, Gurgaon</strong>, FreelanceWalla is India&apos;s leading BPO company empowering organizations with dependable telecalling, 24/7 customer support outsourcing services, data entry, and enterprise B2B sales support.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#064E3B]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To simplify business process outsourcing across India by connecting fast-growing brands with vetted, trained remote and on-premise telecalling teams, driving higher sales conversions and superior customer satisfaction.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#064E3B]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Cyber City Gurgaon Presence</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Operating out of Gurugram (Delhi NCR), we tap into India&apos;s premier corporate and telecom hub to deliver reliable telemarketing, data entry services in Gurgaon, and 24/7 omnichannel customer care.
              </p>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#064E3B]/10">
              Operational Tenets
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              The Principles Behind Our BPO Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#064E3B]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#04382a] text-white p-10 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Looking for a Trusted BPO Partner in Gurgaon?
            </h2>
            <p className="text-[#f8e7c9]/90 max-w-2xl mx-auto text-base">
              Learn how our B2B business services, customer support outsourcing, and telemarketing teams can help you scale.
            </p>
            <div className="pt-2">
              <Link
                href="/contact-us"
                className="inline-flex px-8 py-3.5 rounded-xl font-bold text-[#04382a] bg-[#f8e7c9] hover:bg-white transition-all shadow-md"
              >
                Contact Our Gurgaon Office
              </Link>
            </div>
          </div>
        </section>
      </PageMotion>
    </>
  );
}
