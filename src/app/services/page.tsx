import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PhoneCall,
  Headphones,
  MessageSquare,
  Mail,
  FileSpreadsheet,
  Users,
  Briefcase,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import connectToDatabase from '@/lib/db';
import Service from '@/lib/models/Service';
import { seedDatabase } from '@/lib/seed';
import { defaultServices } from '@/lib/constants';
import { FadeIn, PageMotion } from '@/components/common/MotionWrapper';

export const metadata: Metadata = {
  title: 'BPO & Freelance Services | Sales, Telecalling & Customer Support',
  description:
    'Explore FreelanceWalla operational services including sales telecalling, 24/7 customer support, live chat management, email support, data entry, lead generation, and back-office operations in India.',
  alternates: {
    canonical: 'https://freelancewalla.in/services',
  },
  openGraph: {
    title: 'BPO & Freelance Services | FreelanceWalla India',
    description: 'Outsource sales telecalling, customer support, live chat, email management, data entry, and lead generation to trained remote teams.',
    url: 'https://freelancewalla.in/services',
  },
};

async function getServices() {
  try {
    const conn = await connectToDatabase();
    if (!conn) return defaultServices;
    await seedDatabase();
    const services = await Service.find({ isActive: true }).lean();
    return services.length > 0 ? JSON.parse(JSON.stringify(services)) : defaultServices;
  } catch (error) {
    return defaultServices;
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall': return PhoneCall;
      case 'Headphones': return Headphones;
      case 'MessageSquare': return MessageSquare;
      case 'Mail': return Mail;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'Users': return Users;
      case 'Briefcase': return Briefcase;
      case 'UserCheck': return UserCheck;
      default: return Headphones;
    }
  };

  return (
    <PageMotion className="space-y-16 py-12">
      
      {/* HEADER SECTION WITH BACKGROUND IMAGE & OVERLAY */}
      <section className="relative bg-[#04382a] text-white py-20 border-b border-[#f8e7c9]/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bpo_support_call.png"
            alt="FreelanceWalla BPO Services"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04382a] via-[#04382a]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#f8e7c9] bg-[#f8e7c9]/15 px-3 py-1 rounded-full border border-[#f8e7c9]/30">
              Services & Operational Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Business Services That Support Your Growth
            </h1>
            <p className="text-lg text-[#f8e7c9]/90 leading-relaxed">
              We provide structured support teams for sales telecalling, customer support, chat, email management, data entry, lead generation, and administrative back-office work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* QUICK NAV PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap gap-2">
          {services.map((s: any) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#e6f4f0] text-[#064E3B] hover:bg-[#064E3B] hover:text-[#f8e7c9] transition-colors border border-[#064E3B]/10"
            >
              {s.title}
            </a>
          ))}
        </FadeIn>
      </section>

      {/* DETAILED SERVICES LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {services.map((service: any, index: number) => {
          const IconComponent = getIcon(service.icon);
          return (
            <FadeIn
              key={service.slug}
              id={service.slug}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden scroll-mt-24"
            >
              <div className="p-6 sm:p-10 space-y-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#064E3B] text-[#f8e7c9] flex items-center justify-center shrink-0 shadow-sm border border-[#f8e7c9]/30">
                      <IconComponent className="w-6 h-6 text-[#f8e7c9]" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{service.title}</h2>
                      <p className="text-sm text-slate-500">{service.shortDescription}</p>
                    </div>
                  </div>
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#064E3B] text-[#f8e7c9] text-sm font-semibold hover:bg-[#04382a] transition-colors shrink-0 border border-[#f8e7c9]/30 shadow-sm"
                  >
                    Discuss Your Requirement
                    <ArrowRight className="w-4 h-4 text-[#f8e7c9]" />
                  </Link>
                </div>

                {/* Description */}
                <p className="text-slate-700 text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Problem vs Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[#92400e] font-bold text-sm">
                      <AlertCircle className="w-4 h-4 text-[#b45309]" />
                      The Challenge You Face
                    </div>
                    <p className="text-xs sm:text-sm text-[#78350f] leading-relaxed">{service.problem}</p>
                  </div>

                  <div className="bg-[#e6f4f0] border border-[#064E3B]/20 rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[#064E3B] font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#064E3B]" />
                      Our Operational Solution
                    </div>
                    <p className="text-xs sm:text-sm text-[#04382a] leading-relaxed">{service.solution}</p>
                  </div>
                </div>

                {/* What We Handle & Who It Is For */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">What We Handle</h3>
                    <ul className="space-y-2">
                      {service.whatWeHandle?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Who It Is Ideal For</h3>
                    <ul className="space-y-2">
                      {service.whoItIsFor?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-[#064E3B] shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA bar */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {service.features?.map((feat: string) => (
                      <span key={feat} className="px-2.5 py-1 rounded-md bg-[#f8e7c9] text-[#064E3B] text-xs font-semibold border border-[#f8e7c9]">
                        {feat}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-xs font-bold text-[#064E3B] hover:text-[#04382a] underline underline-offset-4"
                  >
                    Get Quote for {service.title} →
                  </Link>
                </div>

              </div>
            </FadeIn>
          );
        })}
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-[#04382a] rounded-2xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl border border-[#f8e7c9]/20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Need a Custom Operational Setup?</h2>
          <p className="text-[#f8e7c9]/90 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us about your team size, expected call/ticket volume, and process requirements. We will organize a practical quote for your business.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#f8e7c9] text-[#064E3B] font-bold hover:bg-[#edd4a6] transition-colors shadow-md border border-[#f8e7c9]"
            >
              Submit Your Requirement
              <ArrowRight className="w-4 h-4 text-[#064E3B]" />
            </Link>
          </div>
        </FadeIn>
      </section>

    </PageMotion>
  );
}
