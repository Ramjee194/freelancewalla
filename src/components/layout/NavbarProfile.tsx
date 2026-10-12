'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AccountHistoryModal from '@/components/profile/AccountHistoryModal';
import {
  User,
  Building2,
  ChevronDown,
  LogOut,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Sparkles,
  Layers,
  ArrowRight,
  PlusCircle,
  Briefcase,
  IdCard,
  Receipt,
  CreditCard,
} from 'lucide-react';

interface NavbarProfileProps {
  isMobileDrawer?: boolean;
}

export default function NavbarProfile({
  isMobileDrawer = false,
}: NavbarProfileProps) {
  const { user, agencyProfile, logout, openAuthModal } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [historyModalTab, setHistoryModalTab] = useState<'payments' | 'leads' | 'profile'>('payments');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const openHistory = (tab: 'payments' | 'leads' | 'profile') => {
    setHistoryModalTab(tab);
    setHistoryModalOpen(true);
    setDropdownOpen(false);
  };

  const displayName =
    agencyProfile?.companyName ||
    agencyProfile?.contactPerson ||
    user?.displayName ||
    user?.email?.split('@')[0] ||
    'Partner';

  const contactPerson =
    agencyProfile?.contactPerson || user?.displayName || 'Authorized Representative';

  const email = agencyProfile?.email || user?.email || '';
  const phone = agencyProfile?.phone || '';
  const website = agencyProfile?.portfolioWebsite || '';
  const credits = agencyProfile?.creditsBalance ?? 0;
  const isVerified = agencyProfile?.isVerifiedByAdmin ?? true;
  const status = agencyProfile?.status || 'Active';

  const getInitials = (text: string) => {
    const parts = text.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return text.slice(0, 2).toUpperCase() || 'FW';
  };

  const initials = getInitials(displayName);

  // If user is NOT logged in:
  if (!user) {
    if (isMobileDrawer) {
      return (
        <button
          type="button"
          onClick={() => openAuthModal('login')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-[#064E3B] bg-[#f8e7c9] hover:bg-[#edd4a6] border border-[#f8e7c9] transition-all shadow-sm"
        >
          <Building2 className="w-4 h-4 text-[#064E3B]" />
          Agency / User Sign In
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => openAuthModal('login')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold text-[#064E3B] bg-[#f8e7c9] hover:bg-[#edd4a6] border border-[#f8e7c9] transition-all shadow-xs hover:shadow-sm"
        aria-label="Partner Sign In"
      >
        <Building2 className="w-3.5 h-3.5 text-[#064E3B]" />
        Sign In
      </button>
    );
  }

  // ─── 1. MOBILE DRAWER CARD ──────────────────────────────────────────────────
  if (isMobileDrawer) {
    return (
      <>
        <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/70 rounded-2xl p-4 border border-emerald-200/80 space-y-3.5 shadow-xs">
          {/* Top Profile Strip */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-11 h-11 rounded-2xl object-cover border-2 border-[#064E3B] shadow-xs"
                />
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#064E3B] to-[#04382a] text-[#f8e7c9] flex items-center justify-center font-black text-sm shadow-xs border border-[#f8e7c9]/40">
                  {initials}
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-[#064E3B] truncate">{displayName}</h4>
                {isVerified && (
                  <span title="Verified Partner">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 truncate">{email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#064E3B] text-[#f8e7c9]">
                  <Coins className="w-2.5 h-2.5" />
                  {credits} Credits
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Details */}
          <div className="space-y-1 text-xs text-slate-700 bg-white/90 p-2.5 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-700" /> Contact
              </span>
              <span className="font-semibold text-slate-800 truncate max-w-[150px]">{contactPerson}</span>
            </div>
            {phone && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" /> Phone
                </span>
                <span className="font-semibold text-slate-800">{phone}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-700" /> Website
                </span>
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#064E3B] hover:underline flex items-center gap-1 truncate max-w-[150px]"
                >
                  {website.replace(/^https?:\/\//, '')}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* History & Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => openHistory('payments')}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-[#064E3B] border border-emerald-200/90 shadow-2xs"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
              Payment History
            </button>

            <button
              type="button"
              onClick={() => openHistory('leads')}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-[#064E3B] border border-emerald-200/90 shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              Lead History
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/agency-network"
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold bg-[#064E3B] text-[#f8e7c9] shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Marketplace
            </Link>

            <Link
              href="/agency-network?tab=profile"
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200"
            >
              <IdCard className="w-3.5 h-3.5" />
              Settings
            </Link>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200/70 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out of Account
          </button>
        </div>

        <AccountHistoryModal
          isOpen={historyModalOpen}
          initialTab={historyModalTab}
          onClose={() => setHistoryModalOpen(false)}
        />
      </>
    );
  }

  const firstLetter = displayName.trim().charAt(0).toUpperCase() || 'U';

  // ─── 3. DESKTOP NAVBAR VIEW ─────────────────────────────────────────────────
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop Trigger: Only 1st letter avatar, all details show on click */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#064E3B]/20 transition-all focus:outline-hidden shrink-0 group"
        aria-expanded={dropdownOpen}
        aria-label="Account Profile"
        title={displayName}
      >
        <div className="relative shrink-0">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className="w-9 h-9 rounded-full object-cover border-2 border-[#064E3B] shadow-xs group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#064E3B] to-[#04382a] text-[#f8e7c9] flex items-center justify-center font-black text-sm shadow-xs border-2 border-[#f8e7c9]/40 group-hover:scale-105 transition-transform">
              {firstLetter}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
      </button>

      {/* Desktop Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-[#064E3B] via-[#04382a] to-[#022c22] text-[#f8e7c9] p-4.5 sm:p-5 border-b border-[#f8e7c9]/15">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-[#f8e7c9]/40 shadow-md"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-[#f8e7c9]/20 border border-[#f8e7c9]/40 text-[#f8e7c9] flex items-center justify-center font-black text-base shadow-md">
                    {initials}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#064E3B] rounded-full" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-sm font-black text-white truncate max-w-[190px]">
                    {displayName}
                  </h4>
                  {isVerified && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-300" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#f8e7c9]/80 truncate mt-0.5">{email}</p>
                <div className="text-[11px] text-[#f8e7c9]/70 flex items-center gap-1 mt-1">
                  <User className="w-3 h-3 text-[#f8e7c9]/80" />
                  <span className="truncate">{contactPerson}</span>
                </div>
              </div>
            </div>

            {/* Wallet / Credits Bar */}
            <div className="mt-3.5 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#f8e7c9]/80 font-medium">Available Balance</div>
                <div className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-[#f8e7c9]" />
                  <span>{credits} Lead Credits</span>
                </div>
              </div>
              <Link
                href="/agency-network?tab=pricing"
                onClick={() => setDropdownOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-[#f8e7c9] hover:bg-[#edd4a6] text-[#064E3B] text-xs font-bold transition-all shadow-sm flex items-center gap-1"
              >
                + Top Up
              </Link>
            </div>
          </div>

          {/* Quick History Shortcuts */}
          <div className="p-3 bg-slate-50/90 border-b border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => openHistory('payments')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/90 text-[#064E3B] shadow-2xs transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
              <span>Payment History</span>
            </button>

            <button
              type="button"
              onClick={() => openHistory('leads')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/90 text-[#064E3B] shadow-2xs transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Lead History</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            <Link
              href="/agency-network"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#e6f4f0] hover:text-[#064E3B] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#064E3B]" />
                <span>Explore Client Leads Marketplace</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/agency-network?tab=my-leads"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#e6f4f0] hover:text-[#064E3B] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#064E3B]" />
                <span>My Unlocked Leads</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              type="button"
              onClick={() => openHistory('profile')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#e6f4f0] hover:text-[#064E3B] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <IdCard className="w-4 h-4 text-[#064E3B]" />
                <span>View Full Profile & Verification</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <div className="border-t border-slate-100 my-1" />

            {/* Logout */}
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Sign Out of Account</span>
            </button>
          </div>
        </div>
      )}

      {/* Account History Modal */}
      <AccountHistoryModal
        isOpen={historyModalOpen}
        initialTab={historyModalTab}
        onClose={() => setHistoryModalOpen(false)}
      />
    </div>
  );
}
