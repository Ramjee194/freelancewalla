import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Headphones,
  PhoneCall,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  ArrowRight,
  Users,
  Award,
  Zap,
  HelpCircle,
  BarChart3,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, PageMotion } from '@/components/common/MotionWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

export const metadata: Metadata = {
  title: 'BPO Company in Gurgaon | BPO Services & Outsourcing – FreelanceWalla',
  description:
    'FreelanceWalla is the leading BPO company in Gurgaon providing top-tier BPO services, customer support outsourcing, verified data entry services in Gurgaon, and telemarketing & sales support.',
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
    'Cyber City Gurgaon BPO',
    'DLF Phase 3 call center',
    'Inbound BPO Gurgaon',
    'Outbound BPO India',
  ],
  alternates: {
    canonical: `${BASE_URL}/bpo-services`,
  },
  openGraph: {
    title: 'Top BPO Company in Gurgaon | BPO Services – FreelanceWalla',
    description:
      'Scale with India\'s leading BPO company headquartered in Cyber City Gurgaon. Customer support, data entry, telemarketing & back office outsourcing.',
    url: `${BASE_URL}/bpo-services`,
    siteName: 'FreelanceWalla',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BPO Company in Gurgaon | BPO Services – FreelanceWalla',
    description:
      'Premier BPO company in Gurgaon offering 24/7 customer support outsourcing, data entry, and sales support.',
  },
};

export default function BpoServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}/bpo-services#breadcrumb`,
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
            name: 'BPO Services in Gurgaon',
            item: `${BASE_URL}/bpo-services`,
          },
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/#bpo-business`,
        name: 'FreelanceWalla - BPO Company in Gurgaon',
        url: `${BASE_URL}/bpo-services`,
        logo: `${BASE_URL}/logo.png`,
        image: `${BASE_URL}/images/hero_bpo_team.png`,
        description:
          'Leading BPO company in Gurgaon offering customer support outsourcing services, data entry services in Gurgaon, telemarketing and sales support services.',
        telephone: '+91-9876543210',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'DLF Phase 3, Cyber City',
          addressLocality: 'Gurugram',
          addressRegion: 'Haryana',
          postalCode: '122002',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '28.4906',
          longitude: '77.0911',
        },
        areaServed: [
          { '@type': 'City', name: 'Gurgaon' },
          { '@type': 'City', name: 'Delhi NCR' },
          { '@type': 'Country', name: 'India' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/bpo-services#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why is FreelanceWalla recognized as a leading BPO company in Gurgaon?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Headquartered in DLF Phase 3, Cyber City Gurugram, FreelanceWalla delivers enterprise-grade BPO services, 24/7 customer support outsourcing, and verified data entry services backed by vetted telecalling teams, strict SLA guarantees, and advanced CRM integrations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What customer support outsourcing services does FreelanceWalla offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our customer support outsourcing solutions include multi-channel support across phone, live chat, email helpdesk, WhatsApp, and ticket management with 24/7 availability, multi-lingual callers, and 99.2% customer satisfaction ratings.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide accurate data entry services in Gurgaon?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, FreelanceWalla provides high-speed, secure data entry services in Gurgaon for e-commerce cataloging, CRM data hygiene, invoice processing, database digitization, and back-office operations with 99.8% guaranteed accuracy.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do your telemarketing and sales support services generate revenue?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our sales support teams specialize in cold calling, lead qualification, prospect follow-ups, appointment scheduling, and CRM pipeline acceleration to help businesses close deals faster with reduced customer acquisition costs.',
            },
          },
        ],
      },
    ],
  };

  const coreServices = [
    {
      icon: Headphones,
      title: 'Customer Support Outsourcing Services',
      tagline: '24/7 Inbound & Omnichannel Care',
      desc: 'Deliver superior customer delight with round-the-clock voice, live chat, email, and WhatsApp helpdesks managed by trained customer support professionals.',
      features: ['24/7/365 Tier 1 & Tier 2 Support', 'Multi-lingual Telecallers (Hindi, English & Regional)', 'CSAT & First Contact Resolution Tracking', 'Zendesk, Freshdesk & Zoho CRM Ready'],
      anchor: 'customer-support',
    },
    {
      icon: PhoneCall,
      title: 'Telemarketing & Sales Support Services',
      tagline: 'High-Conversion Outbound Pipeline',
      desc: 'Accelerate your revenue engine with dedicated telecallers executing targeted outbound calls, B2B/B2C lead qualification, and appointment booking.',
      features: ['Cold Calling & Warm Lead Follow-ups', 'High-Converting Sales Pitch Delivery', 'Real-time Lead Qualification Scoring', 'Call Recordings & Conversion Analytics'],
      anchor: 'sales-support',
    },
    {
      icon: FileSpreadsheet,
      title: 'Data Entry Services in Gurgaon',
      tagline: '99.8% Accuracy & Fast Turnaround',
      desc: 'Streamline your enterprise back-office with secure, rapid data entry, database cleansing, invoice transcription, and e-commerce catalog management.',
      features: ['Database Cleansing & Normalization', 'E-commerce Catalog & SKU Uploads', 'OCR & Document Digitization', 'Strict NDA & Data Security Protocols'],
      anchor: 'data-entry',
    },
    {
      icon: TrendingUp,
      title: 'Lead Generation & Verification',
      tagline: 'Verified Prospects That Convert',
      desc: 'Equip your sales team with phone-verified, intent-driven consumer and corporate prospects ready for immediate business conversion.',
      features: ['Double-opted Phone & Email Leads', 'B2B Decision Maker Targeting', 'Real-Time CRM Sync', 'Disputed Lead Replacement Warranty'],
      anchor: 'lead-generation',
    },
  ];

  const gurgaonAdvantages = [
    {
      icon: Building2,
      title: 'Cyber City, Gurgaon Presence',
      desc: 'Located at DLF Phase 3, Gurugram — the heart of India\'s technology and corporate outsourcing capital.',
    },
    {
      icon: Users,
      title: 'Vetted & Trained Workforce',
      desc: 'Over 2,500+ skilled agents trained in professional phone etiquette, CRM operations, and dialect modulation.',
    },
    {
      icon: Clock,
      title: '24/7/365 Operational Capability',
      desc: 'Uninterrupted shift management to serve domestic Indian markets and international client time zones.',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security & Compliance',
      desc: 'Strict NDAs, ISO-standard quality checks, secure virtual environments, and dedicated compliance supervisors.',
    },
    {
      icon: BarChart3,
      title: 'Transparent Real-Time Reporting',
      desc: 'Live dashboard access with dialer metrics, call recordings, average handle times (AHT), and daily performance logs.',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment (24–48 Hours)',
      desc: 'Launch dedicated telecalling, data entry, or customer care teams within 48 hours of brief approval.',
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
              src="/images/hero_bpo_team.png"
              alt="BPO Services in Gurgaon - FreelanceWalla BPO and business services"
              className="w-full h-full object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04382a] via-[#04382a]/90 to-[#02241b]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-8">
            <FadeIn className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8e7c9]/15 border border-[#f8e7c9]/30 text-[#f8e7c9] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#f8e7c9]" />
                Top-Ranked BPO Company in Gurgaon, India
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                FreelanceWalla BPO and Business Services in Gurgaon
              </h1>
              <p className="text-lg sm:text-xl text-[#f8e7c9]/90 leading-relaxed font-light">
                Outsource high-performance <strong>BPO services</strong>, 24/7 <strong>customer support outsourcing services</strong>, verified <strong>data entry services in Gurgaon</strong>, and high-impact <strong>telemarketing and sales support services</strong> to India&apos;s most reliable operational partner.
              </p>
            </FadeIn>

            <FadeIn className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact-us"
                className="px-8 py-4 rounded-xl font-bold text-[#04382a] bg-[#f8e7c9] hover:bg-white transition-all shadow-lg flex items-center gap-2 group"
              >
                Request Custom BPO Proposal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/b2b-services"
                className="px-6 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2"
              >
                Explore B2B Services
              </Link>
              <Link
                href="/b2c-services"
                className="px-6 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2"
              >
                Explore B2C Services
              </Link>
            </FadeIn>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#f8e7c9]/15">
              <div>
                <p className="text-3xl font-extrabold text-white">2.5M+</p>
                <p className="text-xs text-[#f8e7c9]/80 uppercase font-semibold">Calls Handled Monthly</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#f8e7c9]">99.8%</p>
                <p className="text-xs text-[#f8e7c9]/80 uppercase font-semibold">Data Entry Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">24/7/365</p>
                <p className="text-xs text-[#f8e7c9]/80 uppercase font-semibold">Customer Support Desk</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#f8e7c9]">Cyber City</p>
                <p className="text-xs text-[#f8e7c9]/80 uppercase font-semibold">Gurgaon Headquarters</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE BPO SERVICES GRID ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#064E3B]/10">
              Complete Outsourcing Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              End-to-End BPO Services & Business Support
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Designed for startups, SMEs, and enterprise brands seeking reliable operations, reduced customer acquisition costs, and dedicated workforce management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  id={srv.anchor}
                  className="bg-white rounded-2xl p-8 border border-slate-200/90 hover:border-[#064E3B]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center border border-[#064E3B]/10 group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#f8e7c9]/50 px-3 py-1 rounded-full">
                        {srv.tagline}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#064E3B] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {srv.desc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {srv.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={`/contact-us?service=${encodeURIComponent(srv.title)}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#064E3B] hover:text-[#04382a] group-hover:underline"
                    >
                      Book Team for {srv.title}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── GURGAON ADVANTAGE SECTION ──────────────────────────── */}
        <section className="bg-slate-50 py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-white px-3.5 py-1.5 rounded-full border border-slate-200">
                Strategic NCR Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Why Choose FreelanceWalla as Your BPO Company in Gurgaon?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Gurugram is the undisputed outsourcing capital of North India. Our Cyber City operations provide unmatched telecom infrastructure, fluent talent pools, and enterprise rigor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gurgaonAdvantages.map((adv, idx) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow space-y-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center border border-[#064E3B]/10">
                      <Icon className="w-5 h-5 text-[#064E3B]" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{adv.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{adv.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) ──────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#064E3B]/10">
              Questions & Answers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions About BPO Services in Gurgaon
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                Why is FreelanceWalla recognized as a leading BPO company in Gurgaon?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                Headquartered in DLF Phase 3, Cyber City Gurugram, FreelanceWalla delivers enterprise-grade BPO services, 24/7 customer support outsourcing, and verified data entry services backed by vetted telecalling teams, strict SLA guarantees, and advanced CRM integrations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                What customer support outsourcing services does FreelanceWalla offer?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                Our customer support outsourcing solutions include multi-channel support across phone, live chat, email helpdesk, WhatsApp, and ticket management with 24/7 availability, multi-lingual callers, and 99.2% customer satisfaction ratings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                Do you provide accurate data entry services in Gurgaon?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                Yes, FreelanceWalla provides high-speed, secure data entry services in Gurgaon for e-commerce cataloging, CRM data hygiene, invoice processing, database digitization, and back-office operations with 99.8% guaranteed accuracy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                How do your telemarketing and sales support services generate revenue?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                Our sales support teams specialize in cold calling, lead qualification, prospect follow-ups, appointment scheduling, and CRM pipeline acceleration to help businesses close deals faster with reduced customer acquisition costs.
              </p>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#04382a] to-[#02241b] text-white p-8 sm:p-14 border border-[#f8e7c9]/25 shadow-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Partner with India&apos;s #1 BPO Company in Gurgaon?
            </h2>
            <p className="text-[#f8e7c9]/90 max-w-2xl mx-auto text-base">
              Get an instant quotation tailored to your operational volume, telecalling headcount, or data entry requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/contact-us"
                className="px-8 py-3.5 rounded-xl font-bold text-[#04382a] bg-[#f8e7c9] hover:bg-white transition-all shadow-md"
              >
                Get Free Consultation & Quote
              </Link>
              <Link
                href="/careers"
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all"
              >
                Join as BPO Professional
              </Link>
            </div>
          </div>
        </section>
      </PageMotion>
    </>
  );
}
