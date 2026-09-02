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
      title: 'Sales & Telecalling',
      desc: 'Outbound telecalling, lead follow-ups, appointment scheduling, and lead qualification for sales teams.',
      icon: PhoneCall,
      href: '/services#sales-telecalling',
      tag: 'High Demand',
    },
    {
      title: 'Customer Support',
      desc: 'Inbound customer inquiry handling, complaint resolution, order tracking, and helpdesk support.',
      icon: Headphones,
      href: '/services#customer-support',
      tag: '24/7 Ready',
    },
    {
      title: 'Chat Support',
      desc: 'Real-time live website chat assistance, pre-purchase inquiries, and instant lead engagement.',
      icon: MessageSquare,
      href: '/services#chat-support',
      tag: 'Instant Web Chat',
    },
    {
      title: 'Email Support',
      desc: 'Structured email management, timely ticket resolution, complaint tracking, and SLA management.',
      icon: Mail,
      href: '/services#email-support',
      tag: 'Ticket SLA',
    },
    {
      title: 'Lead Generation',
      desc: 'Targeted B2B database building, prospect research, contact verification, and lead lists.',
      icon: Users,
      href: '/services#lead-generation',
      tag: 'B2B Lists',
    },
    {
      title: 'Data Entry',
      desc: 'Accurate spreadsheet entry, database cleanup, CRM record updates, and digitizing paper files.',
      icon: FileSpreadsheet,
      href: '/services#data-entry',
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

      {/* SERVICE OVERVIEW WITH FRAMER MOTION STAGGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
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
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 group-hover:bg-blue-600 transition-colors" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors shadow-2xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700"
                    >
                      Explore Service
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Operational Onboarding</span>
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
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative flex flex-col justify-between group hover:border-blue-300 transition-colors h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-blue-900 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                        {step.number}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
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
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-sm">
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
      <section className="bg-slate-950 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Our Clients Can Expect
            </h2>
            <p className="text-blue-200 text-sm">
              Focusing on measurable everyday operational improvements.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Faster Response</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Dedicated support channels reduce lead response times and resolve customer email tickets faster.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Consistent Customer Communication</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Adherence to pre-defined script guidelines ensures professional tone across calls, chats, and messages.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Reduced Operational Workload</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
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
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <FadeIn className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">Work With Us</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built With People in Mind
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                FreelanceWalla also provides flexible work opportunities for people looking to build experience in sales, customer support, telecalling, chat support, email support and data-entry operations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {employeeCards.map((card, idx) => (
                  <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                    <h3 className="font-bold text-white text-sm">{card.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/careers/roles"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
                >
                  Explore Available Roles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700">
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
          <Link href="/careers/roles" className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1">
            View All Vacancies <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role: any, index: number) => (
            <StaggerItem key={role._id || index}>
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-900">
                      {role.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{role.workMode}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{role.description}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-1">
                    {role.workType?.map((wt: string) => (
                      <span key={wt} className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-700 text-[11px]">
                        {wt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/careers/${role.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-blue-900"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/apply?role=${encodeURIComponent(role.title)}`}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 transition-colors"
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
