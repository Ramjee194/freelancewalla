'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { IApplication } from '@/types';
import { Trash2, Phone, Mail, CheckCircle } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const url = selectedStatus === 'ALL' ? '/api/admin/applications' : `/api/admin/applications?status=${encodeURIComponent(selectedStatus)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus as any } : app))
        );
      }
    } catch (err) {
      alert('Failed updating application status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this candidate application record?')) return;
    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
      }
    } catch (err) {
      alert('Failed deleting application.');
    }
  };

  const statusOptions = ['New', 'Under Review', 'Contacted', 'Shortlisted', 'Rejected', 'Onboarding'];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-slate-50 m-0 p-0">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 xl:p-10 space-y-6 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#064E3B]">Applications Manager</h1>
              <p className="text-xs text-slate-500">Review candidate details and update selection status.</p>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700">Status Filter:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden"
              >
                <option value="ALL">All Statuses ({applications.length})</option>
                {statusOptions.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-sm text-slate-500">
              Loading candidates data...
            </div>
          ) : applications.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="font-bold text-slate-800">No applications match current status filter.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Role & Work Type</th>
                    <th className="p-4">Details</th>
                    <th className="p-4">Status Workflow</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Candidate Name & Contact */}
                      <td className="p-4 space-y-1">
                        <div className="font-bold text-slate-900 text-sm">{app.fullName}</div>
                        <div className="text-slate-500 flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                        </div>
                        <div className="text-slate-500 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>
                        </div>
                      </td>

                      {/* Role & Work Type */}
                      <td className="p-4 space-y-1">
                        <div className="font-bold text-[#064E3B]">{app.preferredRole}</div>
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                          {app.preferredWorkType}
                        </span>
                      </td>

                      {/* Details: Age, Device, Languages */}
                      <td className="p-4 space-y-1 text-slate-600">
                        <div>Location: <span className="font-medium text-slate-900">{app.cityState}</span></div>
                        <div>Age: {app.age} yrs | Device: {app.hasDevice ? 'Yes' : 'No'}</div>
                        <div>Exp: {app.experienceLevel}</div>
                        <div>Langs: {app.languages}</div>
                      </td>

                      {/* Status Selector */}
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app._id!, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold focus:outline-hidden ${
                            app.status === 'New'
                              ? 'bg-[#e6f4f0] text-[#064E3B] border-emerald-200'
                              : app.status === 'Under Review'
                              ? 'bg-amber-50 text-amber-900 border-amber-200'
                              : app.status === 'Shortlisted' || app.status === 'Onboarding'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                              : app.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-900 border-rose-200'
                              : 'bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          {statusOptions.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(app._id!)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
    </div>
  );
}

