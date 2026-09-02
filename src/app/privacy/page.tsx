import Metadata from 'next';

export const metadata = {
  title: 'Privacy Policy | FreelanceWalla',
  description: 'Privacy Policy outlining data protection practices for applicants and business clients at FreelanceWalla.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: September 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you interact with FreelanceWalla via our website (freelancewalla.in), we collect personal details provided voluntarily through forms:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Client Business Enquiries:</strong> Full name, company name, email address, phone number, and service requirements.</li>
            <li><strong>Job Applications:</strong> Full name, email address, phone number, location, age, work preferences, device availability, and experience details.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Data</h2>
          <p>
            Collected data is utilized strictly for business and recruitment operational purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>To review client service enquiries and send requested quotation proposals.</li>
            <li>To evaluate candidate suitability for telecalling, customer service, chat, email, and data entry roles.</li>
            <li>To contact candidates via email or telephone regarding campaign screening and onboarding.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Data Protection & Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information to third-party marketers. Data is stored securely in our database and accessed only by authorized recruitment and operations managers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Contact Us</h2>
          <p>
            If you have questions about your personal data or wish to request data updates, please contact us at: <a href="mailto:info@freelancewalla.in" className="text-blue-600 font-semibold underline">info@freelancewalla.in</a>.
          </p>
        </section>
      </div>

    </div>
  );
}
