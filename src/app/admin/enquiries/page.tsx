'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { IContactInquiry } from '@/types';
import { Mail, Phone, Building2 } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<IContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((enq) => (enq._id === id ? { ...enq, status: newStatus as any } : enq))
        );
      }
    } catch (err) {
      alert('Failed updating enquiry status.');
    }
  };

  const statusOptions = ['New', 'Reviewed', 'Contacted', 'Closed'];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-slate-50 m-0 p-0">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 xl:p-10 space-y-6 w-full min-w-0">
          <div>
            <h1 className="text-2xl font-extrabold text-[#064E3B]">Client Enquiries Manager</h1>
            <p className="text-xs text-slate-500">View incoming BPO client proposals and service requests.</p>
          </div>

          {loading ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Loading enquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="font-bold text-slate-800">No client enquiries received yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div key={enq._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#e6f4f0] text-[#064E3B] mr-2">
                        {enq.serviceRequired}
                      </span>
                      {enq.companyName && (
                        <span className="text-xs font-medium text-slate-500 inline-flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" /> {enq.companyName}
                        </span>
                      )}
                    </div>
                    
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq._id!, e.target.value)}
                      className={`px-3 py-1 rounded-lg border text-xs font-bold focus:outline-hidden ${
                        enq.status === 'New'
                          ? 'bg-purple-50 text-purple-900 border-purple-200'
                          : enq.status === 'Contacted' || enq.status === 'Closed'
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">{enq.fullName}</div>
                      <div className="text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`mailto:${enq.email}`} className="text-[#064E3B] font-medium hover:underline">{enq.email}</a>
                      </div>
                      <div className="text-slate-500 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${enq.phone}`} className="text-slate-800 font-semibold hover:underline">{enq.phone}</a>
                      </div>
                    </div>

                    {enq.expectedRequirement && (
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700">
                        <strong>Volume / Requirement:</strong> {enq.expectedRequirement}
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-800 space-y-1">
                    <strong className="block text-slate-600">Client Message:</strong>
                    <p className="whitespace-pre-line leading-relaxed">{enq.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
    </div>
  );
}

