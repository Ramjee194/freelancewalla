'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  X,
  Lock,
  Mail,
  Building2,
  User,
  Phone,
  Globe,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    loginWithDemo,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolioWebsite, setPortfolioWebsite] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (authModalMode === 'signup') {
        if (!email || !password || !companyName) {
          throw new Error('Please fill in company name, email, and password.');
        }
        await signupWithEmail(email, password, {
          companyName,
          contactPerson: contactPerson || companyName,
          phone,
          portfolioWebsite,
        });
      } else {
        if (!email || !password) {
          throw new Error('Please provide both email and password.');
        }
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      console.error('Auth submit error:', err);
      if (err.code === 'auth/configuration-not-found' || err.message?.includes('identitytoolkit')) {
        setErrorMsg('Firebase Authentication is initializing. You can use the 1-Click Instant Demo Partner Login below to test instantly.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMsg('Invalid email or password. Please verify credentials or register.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('An account with this email already exists. Please sign in instead.');
      } else {
        setErrorMsg(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Google auth error:', err);
      if (err.code === 'auth/configuration-not-found' || err.message?.includes('identitytoolkit')) {
        setErrorMsg('Firebase Google Auth requires configuration. You can use 1-Click Instant Demo Login below.');
      } else {
        setErrorMsg(err.message || 'Failed to authenticate with Google.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAuth = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await loginWithDemo();
    } catch (err: any) {
      setErrorMsg(err.message || 'Demo login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#064E3B] to-[#04382a] text-[#f8e7c9] px-6 py-5 flex items-center justify-between border-b border-[#f8e7c9]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f8e7c9]/15 border border-[#f8e7c9]/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#f8e7c9]" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">
                {authModalMode === 'signup' ? 'Agency Partner Registration' : 'Partner & User Portal'}
              </h3>
              <p className="text-xs text-[#f8e7c9]/80 font-medium">
                {authModalMode === 'signup'
                  ? 'Join India’s premier verified BPO & outsourcing network'
                  : 'Access exclusive verified client leads & dashboard'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                openAuthModal('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'login'
                  ? 'bg-white text-[#064E3B] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Partner / User Login
            </button>
            <button
              type="button"
              onClick={() => {
                openAuthModal('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'signup'
                  ? 'bg-white text-[#064E3B] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register New Agency
            </button>
          </div>

          {/* Quick Instant Demo Option */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 rounded-2xl border border-emerald-200/80 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#064E3B] text-[#f8e7c9] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#f8e7c9]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#064E3B]">Quick Demo Login</div>
                <div className="text-[11px] text-slate-600">DevSpark Tech Solutions (Verified Agency Partner)</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoAuth}
              disabled={isSubmitting}
              className="px-3.5 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] text-xs font-bold shadow-sm transition-all flex items-center gap-1 shrink-0"
            >
              1-Click Demo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-all shadow-xs"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google Workspace
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
              or use email
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalMode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Agency / Business Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Nexus Digital Solutions"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Person
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Managing Partner"
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Website / Portfolio URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="url"
                      value={portfolioWebsite}
                      onChange={(e) => setPortfolioWebsite(e.target.value)}
                      placeholder="https://youragency.com"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@agency.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : authModalMode === 'signup' ? (
                <>
                  Complete Registration & Unlock Leads
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Sign In to Partner Portal
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
