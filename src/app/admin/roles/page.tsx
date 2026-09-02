'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { IJobRole } from '@/types';
import { Plus, Edit2, Trash2, CheckCircle, X, Briefcase } from 'lucide-react';

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<IJobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<IJobRole | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Sales & Telecalling',
    description: '',
    responsibilitiesText: '',
    requirementsText: '',
    workType: ['Part-Time', 'Full-Time'],
    workMode: 'Work From Home',
    location: 'Remote (India)',
    salaryText: '',
    isSalaryVisible: false,
    isActive: true,
  });

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/roles');
      const data = await res.json();
      if (data.success) {
        setRoles(data.roles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOpenAddModal = () => {
    setEditingRole(null);
    setFormData({
      title: '',
      category: 'Sales & Telecalling',
      description: '',
      responsibilitiesText: '',
      requirementsText: '',
      workType: ['Part-Time', 'Full-Time'],
      workMode: 'Work From Home',
      location: 'Remote (India)',
      salaryText: '',
      isSalaryVisible: false,
      isActive: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (role: IJobRole) => {
    setEditingRole(role);
    setFormData({
      title: role.title,
      category: role.category,
      description: role.description,
      responsibilitiesText: role.responsibilities ? role.responsibilities.join('\n') : '',
      requirementsText: role.requirements ? role.requirements.join('\n') : '',
      workType: role.workType || ['Part-Time', 'Full-Time'],
      workMode: role.workMode || 'Work From Home',
      location: role.location || 'Remote (India)',
      salaryText: role.salaryText || '',
      isSalaryVisible: role.isSalaryVisible || false,
      isActive: role.isActive,
    });
    setShowModal(true);
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        responsibilities: formData.responsibilitiesText.split('\n').filter(Boolean),
        requirements: formData.requirementsText.split('\n').filter(Boolean),
        workType: formData.workType,
        workMode: formData.workMode,
        location: formData.location,
        salaryText: formData.salaryText,
        isSalaryVisible: formData.isSalaryVisible,
        isActive: formData.isActive,
      };

      const method = editingRole ? 'PUT' : 'POST';
      const bodyData = editingRole ? { _id: editingRole._id, ...payload } : payload;

      const res = await fetch('/api/admin/roles', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed saving role.');

      setShowModal(false);
      fetchRoles();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job vacancy role?')) return;
    try {
      const res = await fetch(`/api/admin/roles?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setRoles((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const categoriesList = [
    'Sales & Telecalling',
    'Customer Support',
    'Chat Support',
    'Email Support',
    'Data Entry',
    'Lead Generation',
    'Back Office Support',
    'Virtual Assistance',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Job Vacancies Manager</h1>
              <p className="text-xs text-slate-500">Create, edit, or toggle active job role vacancies.</p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold hover:bg-blue-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add New Role
            </button>
          </div>

          {loading ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Loading job roles...
            </div>
          ) : roles.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="font-bold text-slate-800">No job roles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <div key={role._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-900">{role.category}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${role.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {role.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{role.description}</p>
                    <div className="text-[11px] text-slate-500">
                      Mode: {role.workMode} | Types: {role.workType?.join(', ')}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditModal(role)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role._id!)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADD / EDIT MODAL */}
          {showModal && (
            <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingRole ? 'Edit Job Role' : 'Create New Job Role'}
                  </h2>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveRole} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Role Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-600"
                      >
                        {categoriesList.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Work Mode *</label>
                      <select
                        value={formData.workMode}
                        onChange={(e) => setFormData({ ...formData, workMode: e.target.value as any })}
                        className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Work From Home">Work From Home</option>
                        <option value="Remote">Remote</option>
                        <option value="On-Site">On-Site</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Role Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Responsibilities (One per line)</label>
                    <textarea
                      rows={3}
                      placeholder="Make outbound calls...&#10;Follow call scripts..."
                      value={formData.responsibilitiesText}
                      onChange={(e) => setFormData({ ...formData, responsibilitiesText: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Requirements (One per line)</label>
                    <textarea
                      rows={3}
                      placeholder="Good communication...&#10;Active smartphone..."
                      value={formData.requirementsText}
                      onChange={(e) => setFormData({ ...formData, requirementsText: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="rounded text-blue-600"
                      />
                      Active & Visible on Careers Page
                    </label>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded-lg bg-slate-100 font-semibold text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-blue-900 font-semibold text-white hover:bg-blue-800"
                    >
                      Save Role
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
