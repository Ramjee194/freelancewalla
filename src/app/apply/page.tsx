'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Send, ShieldAlert, ArrowLeft, Briefcase } from 'lucide-react';

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawRole = searchParams.get('role') || '';

  // Decode role or convert slug to title
  const preselectedRole = rawRole ? decodeURIComponent(rawRole) : '';

  const defaultRoleOptions = [
    'Sales Telecalling Executive',
    'Customer Support Executive',
    'Chat Support Executive',
    'Email Support Executive',
    'Data Entry Executive',
    'Lead Generation Specialist',
    'Back Office Support Assistant',
    'Virtual Assistant',
  ];

  // If preselectedRole isn't in default list, add it so option select works
  const roleOptions = preselectedRole && !defaultRoleOptions.includes(preselectedRole)
    ? [preselectedRole, ...defaultRoleOptions]
    : defaultRoleOptions;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityState: '',
    age: '',
    hasDevice: true,
    preferredWorkType: 'Work From Home',
    preferredRole: preselectedRole || 'Sales Telecalling Executive',
    experienceLevel: 'Fresher',
    languages: 'Hindi, English',
    additionalInformation: '',
    agreeTerms: false,
  });

  useEffect(() => {
    if (preselectedRole) {
      setFormData((prev) => ({ ...prev, preferredRole: preselectedRole }));
    }
  }, [preselectedRole]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (parseInt(formData.age, 10) < 18) {
      setErrorMsg('Applicants must meet the minimum age requirement of 18 years or above.');
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg('You must agree to the Terms & Conditions before submitting.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed submitting application.');
      }

      // Redirect to success page
      router.push('/apply/success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      <div className="space-y-3 text-center sm:text-left">
        <Link href="/careers/roles" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Available Roles
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Apply Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Interested in working with FreelanceWalla? Complete the application below and our team will review your details.
        </p>

        {/* Selected Role Highlight Banner */}
        {preselectedRole && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3 text-blue-900 text-sm font-semibold">
            <Briefcase className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <span>Applying for Position: </span>
              <span className="font-extrabold text-blue-950 underline underline-offset-2">{formData.preferredRole}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>Validation Error:</strong>
              <p className="text-xs mt-1 text-rose-800">{errorMsg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Personal Info */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              1. Personal & Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anjali Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. anjali@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700">City / State *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaipur, Rajasthan"
                  value={formData.cityState}
                  onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700">Age * (Min 18)</label>
                <input
                  type="number"
                  min="18"
                  max="70"
                  required
                  placeholder="e.g. 22"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Do you have a smartphone or laptop with internet access? *
              </label>
              <div className="flex gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="hasDevice"
                    checked={formData.hasDevice === true}
                    onChange={() => setFormData({ ...formData, hasDevice: true })}
                    className="text-blue-600 focus:ring-blue-600"
                  />
                  Yes, I have a device & stable internet
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="hasDevice"
                    checked={formData.hasDevice === false}
                    onChange={() => setFormData({ ...formData, hasDevice: false })}
                    className="text-blue-600 focus:ring-blue-600"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Work Preferences */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              2. Work Preferences & Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Preferred Work Type *</label>
                <select
                  value={formData.preferredWorkType}
                  onChange={(e) => setFormData({ ...formData, preferredWorkType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                >
                  <option value="Work From Home">Work From Home</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Full-Time">Full-Time</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Position / Role Applied For *</label>
                <select
                  value={formData.preferredRole}
                  onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-semibold text-blue-900"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Experience Level *</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                >
                  <option value="Fresher">Fresher (No prior experience)</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1–2 years">1–2 years</option>
                  <option value="2+ years">2+ years</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Languages Known *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hindi, English, Marathi"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Additional Information (Optional)</label>
              <textarea
                rows={3}
                placeholder="Mention any past telecalling experience, preferred call shift hours, or typing speed..."
                value={formData.additionalInformation}
                onChange={(e) => setFormData({ ...formData, additionalInformation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-1 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                I agree to the <Link href="/terms" className="text-blue-600 underline">Terms and Conditions</Link> and confirm that all information provided in this application is accurate and true.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Apply Online Now for {formData.preferredRole}
              </>
            )}
          </button>

        </form>

      </div>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-amber-950 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Transparency Notice:</strong> FreelanceWalla never asks for registration fees or payment for job applications. Never share bank PINs or passwords.
        </div>
      </div>

    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-center py-12">Loading application form...</div>}>
        <ApplyFormContent />
      </Suspense>
    </div>
  );
}
