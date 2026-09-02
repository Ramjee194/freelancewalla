import Metadata from 'next';
import Link from 'next/link';
import { Target, Eye, ShieldCheck, HeartHandshake, BookOpen, CheckCircle } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, PageMotion } from '@/components/common/MotionWrapper';

export const metadata = {
  title: 'About Us | FreelanceWalla BPO & Freelance Platform',
  description: 'Learn about FreelanceWalla mission to connect businesses with reliable operational support while creating flexible work opportunities in India.',
};

export default function AboutPage() {
  const values = [
    { title: 'Transparency', desc: 'Clear process expectations for client campaigns and transparent requirements for role applicants.', icon: Eye },
    { title: 'Professionalism', desc: 'Communication standards, caller etiquette guidelines, and adherence to operational SLAs.', icon: ShieldCheck },
    { title: 'Reliability', desc: 'Dependable execution, consistent attendance tracking, and regular task logging.', icon: CheckCircle },
    { title: 'Respect', desc: 'Fair interaction policies for client teams and work applicants alike.', icon: HeartHandshake },
    { title: 'Continuous Learning', desc: 'Regular feedback loop to improve telecalling scripts, support accuracy, and data entry precision.', icon: BookOpen },
  ];

  return (
    <PageMotion className="space-y-16 py-12">
      
      {/* HEADER SECTION WITH BACKGROUND IMAGE & OVERLAY TEXT */}
      <section className="relative bg-slate-950 text-white py-20 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bpo_workspace.png"
            alt="FreelanceWalla About Background"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">About Our Company</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              About FreelanceWalla
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              FreelanceWalla is a growing freelance and business process outsourcing platform focused on connecting businesses with practical operational support and creating flexible work opportunities.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Make business support more accessible while creating structured opportunities for people looking for flexible work.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Build a trusted platform where businesses can access dependable support and workers can discover legitimate opportunities.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl space-y-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Operational Approach</h2>
            <p className="text-slate-600 leading-relaxed">
              We bridge the gap between businesses seeking flexible operational assistance and candidates looking for genuine, skill-building remote work.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 h-full">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">1</span>
                <h3 className="text-lg font-bold text-slate-900">Structured Requirements</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Client requirements are documented into clear caller guidelines, chat handling steps, and data entry rules before execution starts.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 h-full">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">2</span>
                <h3 className="text-lg font-bold text-slate-900">Screened Candidate Match</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Applicants undergo role discussion to evaluate communication skills, device setup, and availability for the task.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 h-full">
                <span className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">3</span>
                <h3 className="text-lg font-bold text-slate-900">Continuous Support & Feedback</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We monitor daily campaign performance, share feedback reports with client teams, and provide guidance to team members.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Core Values</h2>
          <p className="text-slate-600 text-sm">The principles that guide our client and applicant relationships.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <StaggerItem key={v.title}>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 h-full">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 mx-auto flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-blue-950 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left relative z-10">
            <h3 className="text-2xl font-bold text-white">Ready to Discuss Your Operational Needs?</h3>
            <p className="text-blue-200 text-sm">
              Connect with our team today for custom telecalling, customer service, or back-office solutions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 relative z-10">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-md"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/careers/roles"
              className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors border border-slate-700"
            >
              Explore Vacancies
            </Link>
          </div>
        </FadeIn>
      </section>

    </PageMotion>
  );
}
