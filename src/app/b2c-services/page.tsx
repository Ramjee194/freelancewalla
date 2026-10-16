import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Headphones,
  MessageSquare,
  Mail,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Smile,
  Zap,
  HelpCircle,
  Users,
} from 'lucide-react';
import { FadeIn, PageMotion } from '@/components/common/MotionWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

export const metadata: Metadata = {
  title: 'B2C Customer Service Solutions | 24/7 Customer Support Outsourcing – FreelanceWalla',
  description:
    'Deliver exceptional consumer care with FreelanceWalla B2C customer service solutions. Dedicated 24/7 customer support outsourcing services, omnichannel helpdesks, live chat, and complaint resolution.',
  keywords: [
    'B2C services',
    'B2C customer service solutions',
    'Customer support',
    'Customer support outsourcing services',
    'Freelancewalla BPO and business services',
    '24/7 Helpdesk Outsourcing India',
    'E-commerce Customer Care Support',
    'Live Chat Support Agents',
    'Omnichannel Customer Experience',
    'Inbound Call Center India',
  ],
  alternates: {
    canonical: `${BASE_URL}/b2c-services`,
  },
  openGraph: {
    title: 'B2C Customer Service Solutions | Customer Support – FreelanceWalla',
    description:
      'Scale your consumer care with round-the-clock customer support outsourcing, live chat, email helpdesks, and WhatsApp support.',
    url: `${BASE_URL}/b2c-services`,
    siteName: 'FreelanceWalla',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2C Customer Service Solutions | FreelanceWalla',
    description:
      'Omnichannel B2C customer service solutions and customer support outsourcing services in India.',
  },
};

export default function B2cServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}/b2c-services#breadcrumb`,
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
            name: 'B2C Customer Service Solutions',
            item: `${BASE_URL}/b2c-services`,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/b2c-services#service`,
        name: 'B2C Customer Service Solutions',
        provider: {
          '@type': 'Organization',
          name: 'FreelanceWalla',
          url: BASE_URL,
        },
        serviceType: 'B2C Customer Service & Support Outsourcing',
        description:
          'Comprehensive B2C customer service solutions and customer support outsourcing services across voice, live chat, email, and social messaging.',
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/b2c-services#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are B2C customer service solutions and why are they critical?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'B2C customer service solutions manage large-scale consumer queries, order issues, product questions, and technical support across voice, live chat, email, and social apps. High first-contact resolution builds brand loyalty, reduces churn, and drives recurring customer lifetime value.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does FreelanceWalla deliver customer support outsourcing services?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We provide dedicated, pre-trained support agents who master your brand tone, knowledge base, and ticketing tools (such as Zendesk, Freshdesk, or Zoho Desk) to deliver 24/7/365 coverage with sub-30-second response times.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can FreelanceWalla handle seasonal spikes like festive sales and product launches?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, our elastic workforce model allows brands to scale up from 5 agents to 100+ agents within days during peak shopping periods, festive seasons, and flash sales without fixed overhead burdens.',
            },
          },
        ],
      },
    ],
  };

  const b2cChannels = [
    {
      icon: Headphones,
      title: 'Inbound Phone Support',
      desc: 'Friendly, empathetic phone representatives who resolve customer inquiries, handle order tracking, and process returns on the first call.',
      metrics: ['< 20s Average Speed of Answer', '94% First Contact Resolution (FCR)'],
    },
    {
      icon: MessageSquare,
      title: 'Live Chat & Instant Messaging',
      desc: 'Real-time website and app chat support to assist buyers at checkout, answer product questions, and prevent cart abandonment.',
      metrics: ['< 30s First Response Time', 'Instant Co-browsing & Troubleshooting'],
    },
    {
      icon: Smartphone,
      title: 'WhatsApp & Social DM Care',
      desc: 'Engage modern digital consumers on their preferred channels like WhatsApp Business, Instagram DM, and Facebook Messenger.',
      metrics: ['Verified WhatsApp Business API Integration', 'Automated Triage + Human Handoff'],
    },
    {
      icon: Mail,
      title: 'Email Helpdesk & Ticket Handling',
      desc: 'Structured email correspondence with rigorous SLAs, contextual knowledge base macros, and meticulous escalation pathways.',
      metrics: ['< 2h SLA Guarantee', '99.5% Quality Assurance Compliance'],
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
              alt="B2C Customer Service Solutions - Customer support outsourcing services"
              className="w-full h-full object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04382a] via-[#04382a]/95 to-[#02241b]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-8">
            <FadeIn className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8e7c9]/15 border border-[#f8e7c9]/30 text-[#f8e7c9] text-xs font-bold uppercase tracking-wider">
                <Smile className="w-3.5 h-3.5 text-[#f8e7c9]" />
                Industry-Leading B2C Customer Service Solutions
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                24/7 B2C Customer Support Outsourcing Services
              </h1>
              <p className="text-lg sm:text-xl text-[#f8e7c9]/90 leading-relaxed font-light">
                Turn support conversations into lasting brand loyalty. FreelanceWalla delivers world-class <strong>B2C customer service solutions</strong> and full-spectrum <strong>customer support outsourcing services</strong> across phone, chat, email, and WhatsApp.
              </p>
            </FadeIn>

            <FadeIn className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact-us?service=B2C+Customer+Support"
                className="px-8 py-4 rounded-xl font-bold text-[#04382a] bg-[#f8e7c9] hover:bg-white transition-all shadow-lg flex items-center gap-2 group"
              >
                Launch Your Support Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/bpo-services"
                className="px-6 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                View BPO Services in Gurgaon
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── CHANNELS GRID ──────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#064E3B]/10">
              Omnichannel Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Complete B2C Customer Support Solutions
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Meet your consumers wherever they are with synchronized history, unified ticketing, and lightning-fast resolution times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {b2cChannels.map((ch, idx) => {
              const Icon = ch.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-slate-200/90 hover:border-[#064E3B]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center border border-[#064E3B]/10">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{ch.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{ch.desc}</p>
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {ch.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={`/contact-us?service=${encodeURIComponent(ch.title)}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#064E3B] hover:text-[#04382a]"
                    >
                      Get Quote for {ch.title} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── B2C FAQ ────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] bg-[#e6f4f0] px-3.5 py-1.5 rounded-full border border-[#064E3B]/10">
              Consumer Support FAQs
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions About B2C Customer Support Outsourcing
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                What are B2C customer service solutions and why are they critical?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                B2C customer service solutions manage large-scale consumer queries, order issues, product questions, and technical support across voice, live chat, email, and social apps. High first-contact resolution builds brand loyalty, reduces churn, and drives recurring customer lifetime value.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                How does FreelanceWalla deliver customer support outsourcing services?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                We provide dedicated, pre-trained support agents who master your brand tone, knowledge base, and ticketing tools (such as Zendesk, Freshdesk, or Zoho Desk) to deliver 24/7/365 coverage with sub-30-second response times.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#064E3B] shrink-0" />
                Can FreelanceWalla handle seasonal spikes like festive sales and product launches?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">
                Yes, our elastic workforce model allows brands to scale up from 5 agents to 100+ agents within days during peak shopping periods, festive seasons, and flash sales without fixed overhead burdens.
              </p>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#04382a] to-[#02241b] text-white p-8 sm:p-14 border border-[#f8e7c9]/25 shadow-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Upgrade Your Brand&apos;s Customer Experience Today
            </h2>
            <p className="text-[#f8e7c9]/90 max-w-2xl mx-auto text-base">
              Deliver round-the-clock satisfaction to your customers with professional support teams starting at accessible monthly plans.
            </p>
            <div className="pt-2">
              <Link
                href="/contact-us"
                className="inline-flex px-8 py-4 rounded-xl font-bold text-[#04382a] bg-[#f8e7c9] hover:bg-white transition-all shadow-md"
              >
                Get Custom B2C Support Quote
              </Link>
            </div>
          </div>
        </section>
      </PageMotion>
    </>
  );
}
