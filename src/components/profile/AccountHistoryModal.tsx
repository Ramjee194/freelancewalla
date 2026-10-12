'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  X,
  CreditCard,
  Layers,
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Loader2,
  Receipt,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Briefcase,
  AlertCircle,
  MapPin,
} from 'lucide-react';

interface AccountHistoryModalProps {
  isOpen: boolean;
  initialTab?: 'payments' | 'leads' | 'profile';
  onClose: () => void;
}

export default function AccountHistoryModal({
  isOpen,
  initialTab = 'payments',
  onClose,
}: AccountHistoryModalProps) {
  const { user, agencyProfile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'payments' | 'leads' | 'profile'>(initialTab);

  const [payments, setPayments] = useState<any[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  const [unlockedLeads, setUnlockedLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync tab if initialTab changes on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Fetch Payments
  const fetchPayments = async () => {
    if (!user) return;
    try {
      setPaymentsLoading(true);
      const res = await fetch(`/api/agency/payments?uid=${user.uid}&email=${encodeURIComponent(user.email || '')}`);
      const data = await res.json();
      if (data.success) {
        setPayments(data.orders || []);
      }
    } catch (err) {
      console.error('Failed to load payment history:', err);
    } finally {
      setPaymentsLoading(false);
    }
  };

  // Fetch Unlocked Leads
  const fetchUnlockedLeads = async () => {
    if (!user) return;
    try {
      setLeadsLoading(true);
      const res = await fetch(`/api/agency/leads?mode=my-unlocked&uid=${user.uid}`);
      const data = await res.json();
      if (data.success) {
        setUnlockedLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to load unlocked leads:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      if (activeTab === 'payments') {
        fetchPayments();
      } else if (activeTab === 'leads') {
        fetchUnlockedLeads();
      }
    }
  }, [isOpen, activeTab, user]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  const displayName =
    agencyProfile?.companyName || user?.displayName || user?.email?.split('@')[0] || 'Partner';
  const credits = agencyProfile?.creditsBalance ?? 0;
  const status = agencyProfile?.status || 'Active';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#064E3B] via-[#04382a] to-[#022c22] text-[#f8e7c9] px-5 sm:px-7 py-4.5 flex items-center justify-between border-b border-[#f8e7c9]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f8e7c9]/15 border border-[#f8e7c9]/30 flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5 text-[#f8e7c9]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Agency Account & History
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3" />
                  {status}
                </span>
              </div>
              <p className="text-xs text-[#f8e7c9]/80 truncate max-w-[280px] sm:max-w-md">
                {displayName} · {credits} Leads Available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-2 sm:px-6 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'payments'
                ? 'bg-[#064E3B] text-[#f8e7c9] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Payment History
            {payments.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'payments' ? 'bg-[#f8e7c9]/20 text-[#f8e7c9]' : 'bg-slate-200 text-slate-700'}`}>
                {payments.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-[#064E3B] text-[#f8e7c9] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Lead History (Unlocked)
            {unlockedLeads.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'leads' ? 'bg-[#f8e7c9]/20 text-[#f8e7c9]' : 'bg-slate-200 text-slate-700'}`}>
                {unlockedLeads.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#064E3B] text-[#f8e7c9] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Profile Details
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: PAYMENT HISTORY */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200/70 text-xs">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#064E3B]" />
                  <span className="font-bold text-[#064E3B]">
                    Active Balance: {credits} Lead Credits
                  </span>
                </div>
                <Link
                  href="/agency-network?tab=pricing"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#064E3B] hover:underline"
                >
                  Buy More Lead Packs <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {paymentsLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#064E3B]" />
                  <span className="text-xs font-medium">Loading transaction records...</span>
                </div>
              ) : payments.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">No Payment Transactions Found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You haven’t purchased any lead credit bundles yet. Purchase verified lead credits to unlock exclusive inquiries.
                  </p>
                  <Link
                    href="/agency-network?tab=pricing"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#064E3B] text-[#f8e7c9] shadow-sm"
                  >
                    View Lead Pricing & Packages
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((order, idx) => (
                    <div
                      key={order._id || idx}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#064E3B] flex items-center justify-center shrink-0 mt-0.5">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-sm text-slate-900">{order.planName}</h5>
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <div className="text-base font-black text-[#064E3B]">₹{order.amount?.toLocaleString('en-IN')}</div>
                          <div className="text-[11px] text-emerald-700 font-bold">+{order.creditsGiven} Credits Credited</div>
                        </div>
                      </div>

                      {/* Transaction IDs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {order.razorpayPaymentId && (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-500">Payment ID:</span>
                            <div className="flex items-center gap-1 font-mono text-slate-700 font-semibold truncate">
                              <span className="truncate">{order.razorpayPaymentId}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(order.razorpayPaymentId, `p_${order._id}`)}
                                className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                                title="Copy Payment ID"
                              >
                                {copiedId === `p_${order._id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>
                        )}

                        {order.razorpayOrderId && (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-500">Order ID:</span>
                            <div className="flex items-center gap-1 font-mono text-slate-700 font-semibold truncate">
                              <span className="truncate">{order.razorpayOrderId}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(order.razorpayOrderId, `o_${order._id}`)}
                                className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                                title="Copy Order ID"
                              >
                                {copiedId === `o_${order._id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LEAD HISTORY */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-teal-50/80 p-3.5 rounded-2xl border border-teal-200/70 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-800" />
                  <span className="font-bold text-teal-900">
                    Exclusively Allocated to {displayName}
                  </span>
                </div>
                <Link
                  href="/agency-network"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:underline"
                >
                  Browse Available Leads <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {leadsLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#064E3B]" />
                  <span className="text-xs font-medium">Retrieving unlocked leads...</span>
                </div>
              ) : unlockedLeads.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">No Unlocked Leads Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You haven’t unlocked any client leads. Explore the agency network marketplace to unlock verified direct client inquiries.
                  </p>
                  <Link
                    href="/agency-network"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#064E3B] text-[#f8e7c9] shadow-sm"
                  >
                    Go to Leads Marketplace
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {unlockedLeads.map((lead, idx) => (
                    <div
                      key={lead._id || idx}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#064E3B] text-[#f8e7c9]">
                              {lead.category}
                            </span>
                            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Budget: {lead.budgetRange}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{lead.title}</h4>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{lead.projectDescription}</p>
                        </div>
                      </div>

                      {/* Client Unlocked Credentials Card */}
                      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 p-3.5 rounded-xl border border-emerald-200/80 space-y-2 text-xs">
                        <div className="font-bold text-[11px] text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Unlocked Client Credentials (Confidential)
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-800">
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="font-bold">{lead.clientName}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <a href={`tel:${lead.clientPhone}`} className="font-bold text-[#064E3B] hover:underline">
                              {lead.clientPhone}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <a href={`mailto:${lead.clientEmail}`} className="font-medium text-slate-700 hover:underline truncate">
                              {lead.clientEmail}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="text-slate-600 truncate">{lead.cityLocation}</span>
                          </div>
                        </div>

                        {lead.clientFullAddress && (
                          <div className="pt-1 border-t border-emerald-200/50 text-[11px] text-slate-600 flex items-start gap-1.5">
                            <span className="font-semibold text-slate-700 shrink-0">Address:</span>
                            <span>{lead.clientFullAddress}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{displayName}</h4>
                    <p className="text-slate-500 text-[11px]">{agencyProfile?.email || user?.email}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Partner
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Contact Representative</span>
                    <span className="font-semibold text-slate-900">{agencyProfile?.contactPerson || 'Authorized Representative'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Phone / WhatsApp</span>
                    <span className="font-semibold text-slate-900">{agencyProfile?.phone || 'Not specified'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Website</span>
                    {agencyProfile?.portfolioWebsite ? (
                      <a
                        href={agencyProfile.portfolioWebsite.startsWith('http') ? agencyProfile.portfolioWebsite : `https://${agencyProfile.portfolioWebsite}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-[#064E3B] hover:underline flex items-center gap-1 truncate"
                      >
                        {agencyProfile.portfolioWebsite}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">Not provided</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Account UID</span>
                    <span className="font-mono text-slate-600 truncate block text-[11px]">{user?.uid}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href="/agency-network?tab=profile"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  Edit Full Profile & Categories <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
