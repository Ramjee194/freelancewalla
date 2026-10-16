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
  ArrowRight,
  Clock,
  MessageCircle,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import connectToDatabase, { isDbConnected } from '@/lib/db';
import JobRole from '@/lib/models/JobRole';
import Review from '@/lib/models/Review';
import { seedDatabase } from '@/lib/seed';
import { defaultJobRoles, defaultReviews } from '@/lib/constants';
import HeroBackgroundSlider from '@/components/home/HeroBackgroundSlider';
import FeedbackSlider from '@/components/home/FeedbackSlider';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';

export const metadata: Metadata = {
  title: 'FreelanceWalla – #1 BPO Company in Gurgaon & Business Services India',
  description:
    'FreelanceWalla BPO and business services: Leading BPO company in Gurgaon providing 24/7 customer support outsourcing services, data entry services in Gurgaon, B2B business services in India, B2C customer service solutions, and telemarketing sales support.',
  keywords: [
    'Freelancewalla BPO and business services',
    'BPO services',
    'BPO company in Gurgaon',
    'Customer support',
    'Customer support outsourcing services',
    'Data entry',
    'Data entry services in Gurgaon',
    'B2B services',
    'B2B business services in India',
    'B2C services',
    'B2C customer service solutions',
    'Sales support',
    'Telemarketing and sales support services',
    'FreelanceWalla',
    'freelancewalla.in',
  ],
  alternates: {
    canonical: 'https://freelancewalla.in',
  },
  openGraph: {
    title: 'FreelanceWalla – BPO & Business Services in Gurgaon, India',
    description:
      'Scale your business with dedicated BPO teams, customer support outsourcing, data entry in Gurgaon, and enterprise B2B sales support.',
    url: 'https://freelancewalla.in',
    siteName: 'FreelanceWalla',
  },
};

export const revalidate = 0; // Fresh dynamic data on every request

async function getHomeData() {
  try {
    const conn = await connectToDatabase();
    if (!conn || !isDbConnected()) {
      return {
        roles: JSON.parse(JSON.stringify(defaultJobRoles)),
        reviews: JSON.parse(JSON.stringify(defaultReviews)),
      };
    }

    await seedDatabase();

    const [dbRoles, dbReviews] = await Promise.all([
      JobRole.find({ isActive: true }).limit(6).lean(),
      Review.find({ isPublished: true }).lean(),
    ]);

    const roles = dbRoles && dbRoles.length > 0 ? dbRoles : defaultJobRoles;
    const reviews = dbReviews && dbReviews.length > 0 ? dbReviews : defaultReviews;

    return {
      roles: JSON.parse(JSON.stringify(roles)),
      reviews: JSON.parse(JSON.stringify(reviews)),
    };
  } catch (error) {
    return {
      roles: JSON.parse(JSON.stringify(defaultJobRoles)),
      reviews: JSON.parse(JSON.stringify(defaultReviews)),
    };
  }
}

export default async function HomePage() {
  const { roles, reviews } = await getHomeData();

  const servicesList = [
    {
      title: 'BPO Services in Gurgaon',
      desc: 'Top-tier BPO company operations in Cyber City Gurgaon with vetted telecallers, 24/7 coverage, and SLA guarantees.',
      icon: PhoneCall,
      href: '/bpo-services',
      tag: 'Gurgaon HQ',
    },
    {
      title: 'B2B Business Services & Sales',
      desc: 'Dedicated outbound telemarketing and sales support services, pipeline acceleration, and corporate appointment setting.',
      icon: Briefcase,
      href: '/b2b-services',
      tag: 'B2B Sales Support',
    },
    {
      title: 'B2C Customer Service Solutions',
      desc: 'Round-the-clock customer support outsourcing services across voice, live chat, WhatsApp, and email ticketing.',
      icon: Headphones,
      href: '/b2c-services',
      tag: '24/7 CSAT Care',
    },
    {
      title: 'Data Entry Services in Gurgaon',
      desc: 'High-speed, 99.8% accurate spreadsheet entry, database cleanup, CRM record updates, and digitizing paper files.',
      icon: FileSpreadsheet,
      href: '/bpo-services#data-entry',
      tag: 'High Accuracy',
    },
    {
      title: 'Back Office Support',
      desc: 'Administrative tasks, document formatting, order processing audits, and process coordination.',
      icon: Briefcase,
      href: '/services#back-office-support',
      tag: 'Process Audits',
    },
    {
      title: 'Virtual Assistance',
      desc: 'Calendar scheduling, executive email sorting, travel arrangements, and routine admin support.',
      icon: UserCheck,
      href: '/services#virtual-assistance',
      tag: 'Executive Support',
    },
  ];

  const steps = [
    { number: '01', title: 'Tell Us What You Need', desc: 'Share your service requirement, scope, expected workload, and communication guidelines.' },
    { number: '02', title: 'We Understand Your Process', desc: 'We review scripts, workflow guidelines, and response criteria required for your business.' },
    { number: '03', title: 'Team & Workflow Setup', desc: 'Assigned support executives receive process orientation before live execution begins.' },
    { number: '04', title: 'Work Begins', desc: 'Operations start according to agreed schedules, communication channels, and guidelines.' },
    { number: '05', title: 'Monitor & Improve', desc: 'Regular feedback checks and workflow adjustments maintain service consistency.' },
  ];

  const benefits = [
    { title: 'Flexible Support', desc: 'Scale your support according to your workload and business requirements.' },
    { title: 'Trained Teams', desc: 'Workflows and communication guidelines are explained before operations begin.' },
    { title: 'Cost-Conscious Solutions', desc: 'Choose a service model that fits your operational requirements.' },
    { title: 'Clear Communication', desc: 'Stay connected with the team and receive regular updates.' },
    { title: 'Quality Focus', desc: 'Processes can include monitoring, reviews and performance checks.' },
    { title: 'Flexible Workflows', desc: 'Adapt scripts, processes and working instructions to your business.' },
  ];

  const employeeCards = [
    { title: 'Flexible Work', desc: 'Options for part-time, full-time, and work-from-home arrangements.' },
    { title: 'Clear Requirements', desc: 'Understand job responsibilities before taking up assignments.' },
    { title: 'Online Application', desc: 'Simple digital application form with no registration charges.' },
    { title: 'Role-Based Training', desc: 'Process guidelines and call scripts provided before campaign start.' },
    { title: 'Professional Communication', desc: 'Build practical experience in customer service and telecalling.' },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">

      {/* FULLSCREEN BACKGROUND IMAGE SLIDER HERO */}
      <HeroBackgroundSlider />

      {/* B2B AGENCY PARTNER & CLIENT LEAD EXCHANGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#04382a] to-[#022118] text-white p-8 sm:p-12 border border-[#f8e7c9]/20 shadow-2xl">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8e7c9]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8e7c9]/15 border border-[#f8e7c9]/30 text-[#f8e7c9] text-xs font-bold uppercase tracking-wider">
                <span>🚀 FreelanceWalla Partner Network</span>
                <span className="text-white/40">•</span>
                <span>BPO & Lead Generation</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Grow Your Business with <span className="text-[#f8e7c9]">BPO Operations & Verified Leads</span>
              </h2>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Connect directly with verified client requirements across <strong>BPO Telecalling</strong>, <strong>24/7 Customer Support</strong>, <strong>B2B & B2C Lead Generation</strong>, and <strong>Back-Office Workflows</strong>. Every client lead is <strong>100% exclusive</strong>—once claimed, it is assigned only to your company.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <span className="text-[10px] text-[#f8e7c9] font-bold uppercase block">BPO Calling</span>
                  <span className="text-xs font-semibold text-white">Inbound & Outbound</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <span className="text-[10px] text-[#f8e7c9] font-bold uppercase block">Customer Support</span>
                  <span className="text-xs font-semibold text-white">24/7 Desk & Chat</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <span className="text-[10px] text-[#f8e7c9] font-bold uppercase block">Lead Generation</span>
                  <span className="text-xs font-semibold text-white">Verified B2B & B2C</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <span className="text-[10px] text-[#f8e7c9] font-bold uppercase block">Back Office</span>
                  <span className="text-xs font-semibold text-white">Data & Admin Ops</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/agency-network"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#f8e7c9] hover:bg-[#edd4a6] text-[#064E3B] font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer text-center"
              >
                <span>Browse Available Projects</span>
                <ArrowRight className="w-4 h-4 text-[#064E3B]" />
              </Link>
              <Link
                href="/agency-network"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all duration-200 text-center"
              >
                <span>Agency Plans (From ₹4)</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* SERVICE OVERVIEW WITH FRAMER MOTION STAGGER */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#e6f4f0] border border-[#064E3B]/10 px-3 py-1 rounded-full">
            Core Operational Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Business Services That Keep You Moving
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Outsource routine customer inquiries, telecalling outreach, and administrative back-office work to dependable team members.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => {
            const IconComponent = service.icon;
            return (
              <StaggerItem key={service.title}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#064E3B]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 group-hover:bg-[#064E3B] transition-colors" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-[#f8e7c9] transition-colors shadow-2xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f8e7c9] text-[#064E3B] border border-[#f8e7c9]">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#064E3B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064E3B] hover:text-[#04382a]"
                    >
                      Explore Service
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#064E3B]" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>


      {/* HOW IT WORKS */}
      <section className="bg-slate-100 py-16 border-y border-slate-200 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#e6f4f0] border border-[#064E3B]/10 px-3 py-1 rounded-full">
              Operational Onboarding
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple Process. Clear Communication.
            </h2>
            <p className="text-slate-600 text-sm">
              How we set up and run operations for client teams step by step.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative flex flex-col justify-between group hover:border-[#064E3B]/40 transition-colors h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-[#064E3B] text-[#f8e7c9] font-extrabold text-sm flex items-center justify-center shadow-xs">
                        {step.number}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f8e7c9] border border-[#064E3B]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Businesses Choose FreelanceWalla
          </h2>
          <p className="text-slate-600 text-sm">
            Practical operational benefits without long complex commitments.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 h-full">
                <div className="w-8 h-8 rounded-full bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center font-bold text-sm border border-[#064E3B]/20">
                  ✓
                </div>
                <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>


      {/* CLIENT EXPERIENCE */}
      <section className="bg-[#04382a] text-white py-16 border-y border-[#f8e7c9]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Our Clients Can Expect
            </h2>
            <p className="text-[#f8e7c9] text-sm">
              Focusing on measurable everyday operational improvements.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-[#064E3B]/90 p-8 rounded-2xl border border-[#f8e7c9]/20 space-y-4 h-full shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#f8e7c9]/20 text-[#f8e7c9] flex items-center justify-center border border-[#f8e7c9]/30">
                  <Clock className="w-6 h-6 text-[#f8e7c9]" />
                </div>
                <h3 className="text-xl font-bold text-white">Faster Response</h3>
                <p className="text-sm text-[#f8e7c9]/90 leading-relaxed">
                  Dedicated support channels reduce lead response times and resolve customer email tickets faster.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-[#064E3B]/90 p-8 rounded-2xl border border-[#f8e7c9]/20 space-y-4 h-full shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#f8e7c9]/20 text-[#f8e7c9] flex items-center justify-center border border-[#f8e7c9]/30">
                  <MessageCircle className="w-6 h-6 text-[#f8e7c9]" />
                </div>
                <h3 className="text-xl font-bold text-white">Consistent Customer Communication</h3>
                <p className="text-sm text-[#f8e7c9]/90 leading-relaxed">
                  Adherence to pre-defined script guidelines ensures professional tone across calls, chats, and messages.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-[#064E3B]/90 p-8 rounded-2xl border border-[#f8e7c9]/20 space-y-4 h-full shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#f8e7c9]/20 text-[#f8e7c9] flex items-center justify-center border border-[#f8e7c9]/30">
                  <TrendingUp className="w-6 h-6 text-[#f8e7c9]" />
                </div>
                <h3 className="text-xl font-bold text-white">Reduced Operational Workload</h3>
                <p className="text-sm text-[#f8e7c9]/90 leading-relaxed">
                  Offload routine telecalling, data entry, and inbox organization so leadership stays focused on business growth.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>


      {/* AUTOMATIC CAROUSEL FEEDBACK SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeedbackSlider reviews={reviews} />
      </section>


      {/* EMPLOYEE EXPERIENCE WITH WORKSPACE PHOTO */}
      <section className="bg-[#04382a] text-white py-16 border-t border-[#f8e7c9]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <FadeIn className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-bold tracking-wider text-[#f8e7c9] bg-[#f8e7c9]/15 px-3 py-1 rounded-full border border-[#f8e7c9]/30">
                Work With Us
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built With People in Mind
              </h2>
              <p className="text-[#f8e7c9]/90 text-base leading-relaxed">
                FreelanceWalla also provides flexible work opportunities for people looking to build experience in sales, customer support, telecalling, chat support, email support and data-entry operations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {employeeCards.map((card, idx) => (
                  <div key={idx} className="bg-[#064E3B]/90 p-4 rounded-xl border border-[#f8e7c9]/20 space-y-1">
                    <h3 className="font-bold text-[#f8e7c9] text-sm">{card.title}</h3>
                    <p className="text-xs text-[#f8e7c9]/80 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/careers/roles"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#064E3B] bg-[#f8e7c9] hover:bg-[#edd4a6] transition-colors shadow-md border border-[#f8e7c9]"
                >
                  Explore Available Roles
                  <ArrowRight className="w-4 h-4 text-[#064E3B]" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#f8e7c9]/30">
                <img
                  src="/images/bpo_workspace.png"
                  alt="FreelanceWalla Customer Support Operations Workspace"
                  className="w-full h-80 object-cover"
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>


      {/* CURRENT WORK OPPORTUNITIES - POPULATED WITH JOB OPENINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Current Work Opportunities
            </h2>
            <p className="text-slate-600 text-sm">
              Explore open positions for telecalling, customer support, chat, email, and data entry.
            </p>
          </div>
          <Link href="/careers/roles" className="text-xs font-bold text-[#064E3B] hover:text-[#04382a] flex items-center gap-1">
            View All Vacancies <ArrowRight className="w-4 h-4 text-[#064E3B]" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role: any, index: number) => (
            <StaggerItem key={role._id || index}>
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#064E3B]/40 hover:shadow-md transition-all space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#e6f4f0] text-[#064E3B] border border-[#064E3B]/10">
                      {role.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{role.workMode}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{role.description}</p>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-1">
                    {role.workType?.map((wt: string) => (
                      <span key={wt} className="px-2 py-0.5 bg-[#f8e7c9] rounded-md text-[#064E3B] font-medium text-[11px]">
                        {wt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/careers/${role.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-[#064E3B]"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/apply?role=${encodeURIComponent(role.title)}`}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#f8e7c9] bg-[#064E3B] hover:bg-[#04382a] transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

    </div>
  );
}
