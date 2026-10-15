'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  Layers,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Building2,
  ShieldCheck,
  ShieldAlert,
  Coins,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  X,
  ExternalLink,
  Loader2,
} from 'lucide-react';

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'agencies'>('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalLeads: 0, availableLeads: 0, allocatedLeads: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State for New Client Lead
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    budgetRange: '₹50,000 - ₹1,00,000',
    cityLocation: '',
    projectDescription: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientFullAddress: '',
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/leads?category=${selectedCategory}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err: any) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgencies = async () => {
    try {
      const res = await fetch('/api/admin/agencies');
      const data = await res.json();
      if (data.success) {
        setAgencies(data.agencies || []);
      }
    } catch (err) {
      console.error('Failed to load agencies:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    } else {
      fetchAgencies();
    }
  }, [activeTab, selectedCategory, search]);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setNotification({ type: 'success', message: 'Client lead created successfully!' });
        setShowAddModal(false);
        setFormData({
          title: '',
          category: 'Web Development',
          budgetRange: '₹50,000 - ₹1,00,000',
          cityLocation: '',
          projectDescription: '',
          clientName: '',
          clientPhone: '',
          clientEmail: '',
          clientFullAddress: '',
        });
        fetchLeads();
      } else {
        setNotification({ type: 'error', message: data.error || 'Failed to create lead' });
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Error occurred' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this client lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        setStats((prev) => ({ ...prev, totalLeads: prev.totalLeads - 1 }));
      }
    } catch (err) {
      alert('Failed to delete lead');
    }
  };

  const handleToggleAgencyVerify = async (agencyId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/agencies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyId,
          isVerifiedByAdmin: !currentStatus,
          status: !currentStatus ? 'Active' : 'Pending Verification',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAgencies((prev) =>
          prev.map((a) => (a._id === agencyId ? { ...a, isVerifiedByAdmin: !currentStatus, status: !currentStatus ? 'Active' : 'Pending Verification' } : a))
        );
      }
    } catch (err) {
      alert('Failed to update agency status');
    }
  };

  const handleAddCredits = async (agencyId: string, creditsToAdd: number) => {
    try {
      const res = await fetch('/api/admin/agencies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyId,
          addCredits: creditsToAdd,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAgencies((prev) =>
          prev.map((a) =>
            a._id === agencyId
              ? { ...a, creditsBalance: (a.creditsBalance || 0) + creditsToAdd }
              : a
          )
        );
      }
    } catch (err) {
      alert('Failed to add credits');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-slate-50 m-0 p-0">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 xl:p-10 space-y-6 w-full min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#064E3B] flex items-center gap-2">
                <Layers className="w-6 h-6" /> Client Leads & Agency Network
              </h1>
              <p className="text-xs text-slate-500">
                Manage high-ticket client inquiries, exclusivity allocation & agency verification.
              </p>
            </div>

            {activeTab === 'leads' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Client Lead
              </button>
            )}
          </div>

          {notification && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${
                notification.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              <span>{notification.message}</span>
              <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Client Projects</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats.totalLeads}</div>
            </div>
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Available for Agencies
              </span>
              <div className="text-2xl font-extrabold text-emerald-900 mt-1">{stats.availableLeads}</div>
            </div>
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-2xs">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> Exclusively Allocated
              </span>
              <div className="text-2xl font-extrabold text-blue-900 mt-1">{stats.allocatedLeads}</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-4">
            <button
              onClick={() => setActiveTab('leads')}
              className={`pb-3 text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'leads'
                  ? 'text-[#064E3B] border-b-2 border-[#064E3B]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Client Leads Inventory ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('agencies')}
              className={`pb-3 text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'agencies'
                  ? 'text-[#064E3B] border-b-2 border-[#064E3B]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Registered Agencies & Verification
            </button>
          </div>

          {/* TAB 1: CLIENT LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title, client name, phone or city..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#064E3B] focus:outline-none"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="SEO Services">SEO Services</option>
                  <option value="AI & Automation">AI & Automation</option>
                </select>
                <button
                  onClick={fetchLeads}
                  className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 cursor-pointer"
                  title="Refresh Leads"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Leads List */}
              {loading ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-400 font-medium">
                  Loading client leads...
                </div>
              ) : leads.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 space-y-3">
                  <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold">No client leads found.</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="text-xs text-[#064E3B] font-bold underline cursor-pointer"
                  >
                    Click here to add your first client inquiry
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div
                      key={lead._id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#064E3B] text-[10px] font-bold rounded-lg border border-emerald-200">
                              {lead.category}
                            </span>
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-lg border border-amber-200">
                              Budget: {lead.budgetRange}
                            </span>
                            {lead.isAllocated ? (
                              <span className="px-2.5 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-lg border border-blue-200 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Allocated Exclusively to {lead.allocatedToAgencyName || 'Agency'}
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available for Unlock
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mt-2">{lead.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2">{lead.projectDescription}</p>
                        </div>

                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer self-start"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Confidential Client Contact Details (Always visible to Admin) */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Client Name</span>
                            <span className="font-bold">{lead.clientName}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Mobile / WhatsApp</span>
                            <a href={`tel:${lead.clientPhone}`} className="font-bold text-[#064E3B] hover:underline">
                              {lead.clientPhone}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Email</span>
                            <a href={`mailto:${lead.clientEmail}`} className="font-bold text-[#064E3B] hover:underline">
                              {lead.clientEmail}
                            </a>
                          </div>
                        </div>

                        <div className="sm:col-span-3 flex items-start gap-2 text-slate-700 pt-1 border-t border-slate-200/60">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Address / Location</span>
                            <span className="font-medium text-slate-600">{lead.clientFullAddress} ({lead.cityLocation})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AGENCIES */}
          {activeTab === 'agencies' && (
            <div className="space-y-4">
              {agencies.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs font-semibold">
                  No agencies registered yet. As agencies sign up on the portal, they will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {agencies.map((agency) => (
                    <div
                      key={agency._id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{agency.companyName}</h3>
                          {agency.isVerifiedByAdmin ? (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified & Unlocked
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded border border-amber-200 flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3 text-amber-600" /> Pending Admin Verification
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          Contact: {agency.contactPerson} • {agency.email} • {agency.phone || 'No phone'}
                        </p>
                        {agency.portfolioWebsite && (
                          <a
                            href={agency.portfolioWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#064E3B] font-semibold flex items-center gap-1 hover:underline"
                          >
                            {agency.portfolioWebsite} <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-center">
                          <span className="text-[10px] text-emerald-800 font-bold block uppercase">Credits Balance</span>
                          <span className="text-lg font-extrabold text-[#064E3B] flex items-center justify-center gap-1">
                            <Coins className="w-4 h-4 text-amber-500" /> {agency.creditsBalance || 0}
                          </span>
                        </div>

                        {/* Quick action buttons */}
                        <button
                          onClick={() => handleToggleAgencyVerify(agency._id, agency.isVerifiedByAdmin)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            agency.isVerifiedByAdmin
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              : 'bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9]'
                          }`}
                        >
                          {agency.isVerifiedByAdmin ? 'Lock / Revoke' : 'Verify & Unlock Account'}
                        </button>

                        <button
                          onClick={() => handleAddCredits(agency._id, 5)}
                          className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          title="Grant 5 free trial credits"
                        >
                          +5 Credits
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADD CLIENT LEAD MODAL (ANIMATED) */}
          <AnimatePresence>
            {showAddModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAddModal(false)}
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 border border-slate-200 shadow-2xl z-10 max-h-[90vh] overflow-y-auto my-8"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-black text-[#064E3B]">Add Verified Client Project</h2>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flutter Mobile App for Grocery E-commerce"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#064E3B] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Service Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        >
                          <option value="Web Development">Web Development</option>
                          <option value="App Development">App Development</option>
                          <option value="SEO Services">SEO Services</option>
                          <option value="AI & Automation">AI & Automation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Estimated Budget Range *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹80,000 - ₹1,50,000"
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City / Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mumbai, Maharashtra (or Remote)"
                        value={formData.cityLocation}
                        onChange={(e) => setFormData({ ...formData, cityLocation: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Detailed Project Scope & Requirements *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Client needs custom Next.js web application with Cashfree integration, multi-vendor support..."
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="border-t border-slate-100 pt-3 space-y-3">
                      <span className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        🔒 Confidential Client Details (Exclusive to Unlocking Agency)
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Client Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rajesh Mehra"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Client Mobile / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={formData.clientPhone}
                            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Client Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. rajesh@company.com"
                            value={formData.clientEmail}
                            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Full Client Address *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Suite 402, Apex Tower, Andheri East"
                            value={formData.clientFullAddress}
                            onChange={(e) => setFormData({ ...formData, clientFullAddress: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] font-bold shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                      >
                        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {submitting ? 'Saving Lead...' : 'Publish Client Lead'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </main>
    </div>
  );
}

