'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Send, ShieldAlert, ArrowLeft, Briefcase, Smartphone, Laptop, Tablet, Wifi } from 'lucide-react';

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
    devicesAvailable: ['Mobile (Smartphone)', 'Laptop / PC', 'Wi-Fi / Broadband'],
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
      const equipmentSummary = `Available Equipment: ${
        formData.devicesAvailable.length > 0 ? formData.devicesAvailable.join(', ') : 'None'
      }. `;

      const payload = {
        ...formData,
        hasDevice: formData.devicesAvailable.length > 0,
        additionalInformation: equipmentSummary + (formData.additionalInformation || '').trim(),
      };

      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
          <div className="bg-[#e6f4f0] border border-[#064E3B]/20 rounded-xl p-4 flex items-center gap-3 text-[#064E3B] text-sm font-semibold">
            <Briefcase className="w-5 h-5 text-[#064E3B] shrink-0" />
            <div>
              <span>Applying for Position: </span>
              <span className="font-extrabold text-[#04382a] underline underline-offset-2">{formData.preferredRole}</span>
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Do you have Mobile (Smartphone), Laptop/PC, Tablet or Wi-Fi Connection? *
              </label>
              <p className="text-[11px] text-slate-500">
                Select all equipment and connectivity options available for your daily work:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'mobile', label: 'Mobile (Smartphone)', icon: Smartphone },
                  { id: 'laptop', label: 'Laptop / PC', icon: Laptop },
                  { id: 'tablet', label: 'Tablet / iPad', icon: Tablet },
                  { id: 'wifi', label: 'Wi-Fi / Broadband', icon: Wifi },
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = formData.devicesAvailable.includes(item.label);
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#064E3B] bg-[#e6f4f0] text-[#064E3B] shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...formData.devicesAvailable, item.label]
                            : formData.devicesAvailable.filter((d) => d !== item.label);
                          setFormData({
                            ...formData,
                            devicesAvailable: updated,
                            hasDevice: updated.length > 0,
                          });
                        }}
                        className="rounded text-[#064E3B] focus:ring-[#064E3B]"
                      />
                      <Icon className="w-4 h-4 shrink-0 text-[#064E3B]" />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>

              {formData.devicesAvailable.length === 0 && (
                <p className="text-xs text-rose-600 font-semibold pt-1">
                  * Please select at least one device or internet option to proceed.
                </p>
              )}
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden font-semibold text-[#064E3B]"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#064E3B] focus:border-[#064E3B] focus:outline-hidden"
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
                className="mt-1 text-[#064E3B] rounded focus:ring-[#064E3B]"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                I agree to the <Link href="/terms" className="text-[#064E3B] underline font-medium">Terms and Conditions</Link> and confirm that all information provided in this application is accurate and true.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-[#f8e7c9] bg-[#064E3B] hover:bg-[#04382a] transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 border border-[#f8e7c9]/20"
          >
            {loading ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#f8e7c9]" />
                Apply Online Now for {formData.preferredRole}
              </>
            )}
          </button>

        </form>

      </div>

      <div className="bg-[#fffbeb] border border-[#fde68a] p-5 rounded-xl text-[#78350f] text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
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
