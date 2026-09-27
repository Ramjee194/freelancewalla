'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, PhoneCall, CheckCircle2, AlertCircle, Send, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { PageMotion } from '@/components/common/MotionWrapper';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceRequired: preselectedService || 'Sales & Telecalling',
    expectedRequirement: '',
    message: '',
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceRequired: preselectedService }));
    }
  }, [preselectedService]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'Sales & Telecalling',
    'Customer Support',
    'Chat Support',
    'Email Support',
    'Lead Generation',
    'Data Entry',
    'Back Office Support',
    'Virtual Assistance',
    'Custom BPO Solution',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send enquiry.');
      }

      setSuccessMsg(data.message || 'Thank you. Your enquiry has been received. Our team will review your request and contact you.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceRequired: 'Sales & Telecalling',
        expectedRequirement: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageMotion className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#064E3B] bg-[#e6f4f0] border border-[#064E3B]/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's Discuss Your Requirement
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Tell us what you need help with and our team will get back to you with custom options.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center shrink-0 border border-[#064E3B]/10">
              <MapPin className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Corporate Office</h3>
              <p className="text-sm font-medium text-slate-800 leading-snug mt-0.5">
                DLF Phase 3, Cyber City
              </p>
              <p className="text-xs text-slate-500">
                Gurugram (Gurgaon), Haryana – 122002, India
              </p>
              <a
                href="https://maps.google.com/?q=DLF+Phase+3+Cyber+City+Gurgaon+Haryana+122002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#064E3B] font-bold hover:underline mt-1.5"
              >
                View on Google Maps →
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center shrink-0 border border-[#064E3B]/10">
              <Mail className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Direct Email</h3>
              <a href="mailto:info@freelancewalla.in" className="text-[#064E3B] font-semibold text-sm hover:underline">
                info@freelancewalla.in
              </a>
              <p className="text-xs text-slate-500 mt-0.5">Send us detailed scope requirements anytime.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center shrink-0 border border-[#064E3B]/10">
              <Clock className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Response Time</h3>
              <p className="text-sm font-semibold text-slate-700">Within 24 Business Hours</p>
              <p className="text-xs text-slate-500 mt-0.5">Our operations team reviews all incoming enquiries promptness.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center shrink-0 border border-[#064E3B]/10">
              <ShieldCheck className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Privacy Assured</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                Your business contact information is strictly used for quote evaluation and communication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-1 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Send an Enquiry</h2>
            <p className="text-xs text-slate-500">Fill in the fields marked with (*) to receive a free quote.</p>
          </div>

          {successMsg && (
            <div className="p-4 bg-[#e6f4f0] border border-[#064E3B]/30 rounded-xl text-[#04382a] text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#064E3B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#064E3B]">Enquiry Received!</strong>
                <p className="text-xs mt-1 text-[#04382a]">{successMsg}</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Submission Error:</strong>
                <p className="text-xs mt-1 text-rose-800">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rajesh@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. TechSolutions Pvt Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Service Required *</label>
                <select
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                >
                  {servicesList.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Expected Volume / Team Size</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Telecallers / 50 calls daily"
                  value={formData.expectedRequirement}
                  onChange={(e) => setFormData({ ...formData, expectedRequirement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Message / Process Requirements *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your process, preferred calling timings, language requirements, or any specific questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-[#f8e7c9] bg-[#064E3B] hover:bg-[#04382a] transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 border border-[#f8e7c9]/30"
            >
              {loading ? (
                <span>Submitting Enquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#f8e7c9]" />
                  Send Enquiry
                </>
              )}
            </button>

          </form>
        </div>
      </div>

    </PageMotion>
  );
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-center py-12">Loading contact form...</div>}>
        <ContactFormContent />
      </Suspense>
    </div>
  );
}
