import Metadata from 'next';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | FreelanceWalla',
  description: 'Terms & Conditions governing the use of FreelanceWalla website and application services.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
        <p className="text-sm text-slate-500">Last updated: September 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the FreelanceWalla website (freelancewalla.in), submitting business enquiries, or applying for freelance work opportunities, you agree to comply with and be bound by these Terms & Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Nature of Services</h2>
          <p>
            FreelanceWalla operates as a business process outsourcing (BPO) and freelance coordination platform. We assist business clients with sales outreach, customer support, telecalling, email/chat management, and back-office services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Applicant Transparency & Selection Disclaimer</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Submission of an online application does not constitute an offer of employment or guarantee selection for any campaign.</li>
            <li>Selection depends strictly on active client project demands, candidate language proficiency, device availability, and screening.</li>
            <li><strong>No Application Fee Policy:</strong> FreelanceWalla does NOT charge candidates any registration fees, security deposits, or placement charges.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. User Responsibilities & Data Accuracy</h2>
          <p>
            Users and applicants warrant that all information submitted via our forms (including full name, phone number, email address, age, and experience) is accurate and truthful. Providing false information may lead to rejection of applications or termination of campaign access.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Security & Confidential Credentials</h2>
          <p>
            FreelanceWalla representatives will never ask you for online banking PINs, passwords, or payment OTPs. You are responsible for keeping your confidential personal credentials secure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">6. Contact Information</h2>
          <p>
            For questions regarding these Terms, please contact us at: <a href="mailto:info@freelancewalla.in" className="text-blue-600 font-semibold underline">info@freelancewalla.in</a>.
          </p>
        </section>
      </div>

    </div>
  );
}
