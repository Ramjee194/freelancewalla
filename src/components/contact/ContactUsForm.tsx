'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, PhoneCall, Send, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageMotion } from '@/components/common/MotionWrapper';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceRequired: preselectedService || 'BPO Services in Gurgaon',
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
    'BPO Services in Gurgaon',
    'Customer Support Outsourcing Services',
    'B2B Business Services in India',
    'B2C Customer Service Solutions',
    'Data Entry Services in Gurgaon',
    'Telemarketing and Sales Support Services',
    'Live Chat & Helpdesk Support',
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
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSuccessMsg(data.message || 'Thank you! Your enquiry has been received. Our team will contact you shortly.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceRequired: 'BPO Services in Gurgaon',
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
            Official BPO Headquarters
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact FreelanceWalla BPO & Business Services
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Connect with our Gurgaon operational leadership for dedicated telemarketing, customer support outsourcing, or data entry services.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center shrink-0 border border-[#064E3B]/10">
              <MapPin className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Corporate Office (Gurgaon)</h3>
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
              <h3 className="font-bold text-slate-900 text-sm">Official Email</h3>
              <a href="mailto:info@freelancewalla.in" className="text-[#064E3B] font-semibold text-sm hover:underline">
                info@freelancewalla.in
              </a>
              <p className="text-xs text-slate-500 mt-0.5">Direct response within 24 business hours.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-[#e6f4f0] text-[#064E3B] flex items-center justify-center shrink-0 border border-[#064E3B]/10">
              <Clock className="w-5 h-5 text-[#064E3B]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Hours of Operation</h3>
              <p className="text-sm font-semibold text-slate-700">24/7 BPO Operations Support</p>
              <p className="text-xs text-slate-500">Corporate Desk: Mon–Sat, 9:00 AM – 7:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Request Quotation & Consultation</h2>
            <p className="text-xs text-slate-500">
              Fill in your campaign details and we will prepare a customized cost and headcount proposal.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>{successMsg}</div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Business Email *</label>
                <input
                  required
                  type="email"
                  placeholder="e.g. rahul@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Technologies"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Service Required</label>
                <select
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden bg-white"
                >
                  {servicesList.map((srv, idx) => (
                    <option key={idx} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Expected Headcount / Daily Volume</label>
                <input
                  type="text"
                  placeholder="e.g. 5 telecallers / 500 records daily"
                  value={formData.expectedRequirement}
                  onChange={(e) => setFormData({ ...formData, expectedRequirement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Scope of Work & Campaign Details *</label>
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
              {loading ? <span>Submitting Enquiry...</span> : <><Send className="w-4 h-4 text-[#f8e7c9]" /> Send Enquiry</>}
            </button>
          </form>
        </div>
      </div>
    </PageMotion>
  );
}

export default function ContactUsForm() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading contact form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
