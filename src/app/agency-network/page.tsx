'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import {
  auth,
  googleProvider,
} from '@/lib/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { LEAD_PLANS, ILeadPlan } from '@/lib/leadPlans';
import {
  CheckCircle2,
  Lock,
  Unlock,
  Coins,
  ShieldCheck,
  AlertTriangle,
  Phone,
  PhoneCall,
  Headphones,
  Users,
  Mail,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Search,
  Filter,
  Check,
  X,
  LogOut,
  UserCheck,
  Briefcase,
  Building2,
  Globe,
  Loader2,
  Edit3,
  Layers,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Calendar,
  Copy,
  Receipt,
} from 'lucide-react';

declare global {
  interface Window {
    Cashfree: any;
  }
}

export default function AgencyNetworkPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [agencyProfile, setAgencyProfile] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Tabs: 'marketplace' | 'my-leads' | 'pricing' | 'profile'
  const [activeTab, setActiveTab] = useState<'marketplace' | 'my-leads' | 'pricing' | 'profile'>('marketplace');

  // Leads state
  const [availableLeads, setAvailableLeads] = useState<any[]>([]);
  const [myUnlockedLeads, setMyUnlockedLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals with smooth loading
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authCompanyName, setAuthCompanyName] = useState('');
  const [authContactPerson, setAuthContactPerson] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authWebsite, setAuthWebsite] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    portfolioWebsite: '',
  });

  // Profile Sub-tab & Payment History
  const [profileSubTab, setProfileSubTab] = useState<'details' | 'leads' | 'payments'>('details');
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [copiedTxnId, setCopiedTxnId] = useState<string | null>(null);

  // Payment & Disclaimer Modal State
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<ILeadPlan | null>(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Unlock Confirmation State
  const [leadToUnlock, setLeadToUnlock] = useState<any | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  // Toast notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Track Firebase & Demo Auth State
  useEffect(() => {
    const checkDemoAndSync = async () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('fw_demo_agency_user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setCurrentUser(parsed);
            await syncAndFetchAgency(parsed);
            setAuthLoading(false);
            return;
          } catch (e) {}
        }
      }
    };

    checkDemoAndSync();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('fw_demo_agency_user');
        }
        setCurrentUser(user);
        await syncAndFetchAgency(user);
      } else {
        const storedDemo = typeof window !== 'undefined' ? localStorage.getItem('fw_demo_agency_user') : null;
        if (!storedDemo) {
          setCurrentUser(null);
          setAgencyProfile(null);
        }
      }
      setAuthLoading(false);
    });

    const handleAuthChange = () => {
      checkDemoAndSync();
    };

    window.addEventListener('fw_auth_change', handleAuthChange);

    return () => {
      unsubscribe();
      window.removeEventListener('fw_auth_change', handleAuthChange);
    };
  }, []);

  const syncAndFetchAgency = async (user: User) => {
    try {
      const res = await fetch('/api/agency/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          companyName: user.displayName || user.email?.split('@')[0],
          contactPerson: user.displayName || 'Authorized Representative',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAgencyProfile(data.agency);
        setProfileForm({
          companyName: data.agency.companyName || '',
          contactPerson: data.agency.contactPerson || '',
          phone: data.agency.phone || '',
          portfolioWebsite: data.agency.portfolioWebsite || '',
        });
      }
    } catch (err) {
      console.error('Agency synchronization error:', err);
    }
  };

  const fetchAvailableLeads = async () => {
    try {
      setLeadsLoading(true);
      const res = await fetch(
        `/api/agency/leads?mode=available&category=${selectedCategory}&search=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      if (data.success) {
        setAvailableLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to retrieve available leads:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  const fetchMyUnlockedLeads = async (uid: string) => {
    try {
      setLeadsLoading(true);
      const res = await fetch(`/api/agency/leads?mode=my-unlocked&uid=${uid}`);
      const data = await res.json();
      if (data.success) {
        setMyUnlockedLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to retrieve unlocked leads:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  const fetchMyPayments = async (uid: string) => {
    try {
      setPaymentsLoading(true);
      const res = await fetch(`/api/agency/payments?uid=${uid}`);
      const data = await res.json();
      if (data.success) {
        setPaymentsList(data.orders || []);
      }
    } catch (err) {
      console.error('Failed to retrieve payments:', err);
    } finally {
      setPaymentsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'marketplace') {
      fetchAvailableLeads();
    } else if (activeTab === 'my-leads' && currentUser) {
      fetchMyUnlockedLeads(currentUser.uid);
    } else if (activeTab === 'profile' && currentUser) {
      fetchMyUnlockedLeads(currentUser.uid);
      fetchMyPayments(currentUser.uid);
    }
  }, [activeTab, selectedCategory, searchQuery, currentUser]);

  // Auth Handlers
  const handleGoogleSignIn = async () => {
    try {
      setAuthSubmitting(true);
      setAuthError('');
      const result = await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
      await syncAndFetchAgency(result.user);
      setNotification({ type: 'success', message: 'Signed in successfully with Google Workspace!' });
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      if (err.code === 'auth/configuration-not-found' || err.message?.includes('identitytoolkit')) {
        setAuthError(
          'Firebase Authentication requires setup in Firebase Console > Authentication > Get Started. Alternatively, use the Instant Demo Login below.'
        );
      } else {
        setAuthError(err.message || 'Google authentication encountered an error.');
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSubmitting(true);
    setAuthError('');

    try {
      if (authMode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        await fetch('/api/agency/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: cred.user.uid,
            email: cred.user.email,
            companyName: authCompanyName || authEmail.split('@')[0],
            contactPerson: authContactPerson || 'Managing Director',
            phone: authPhone,
            portfolioWebsite: authWebsite,
          }),
        });
        await syncAndFetchAgency(cred.user);
        setNotification({ type: 'success', message: 'Agency account registered successfully!' });
      } else {
        const cred = await signInWithEmailAndPassword(auth, authEmail, authPassword);
        await syncAndFetchAgency(cred.user);
        setNotification({ type: 'success', message: 'Logged in successfully!' });
      }
      setShowAuthModal(false);
    } catch (err: any) {
      console.error('Email Authentication error:', err);
      if (err.code === 'auth/configuration-not-found' || err.message?.includes('identitytoolkit')) {
        setAuthError(
          'Firebase Authentication is pending activation in your Firebase Console. You can use 1-Click Instant Demo Login below to test right away.'
        );
      } else {
        setAuthError(err.message || 'Authentication error occurred.');
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleInstantDemoLogin = async () => {
    const demoUid = 'demo_agency_99';
    const demoEmail = 'partner.agency@freelancewalla.in';
    const demoUser = {
      uid: demoUid,
      email: demoEmail,
      displayName: 'DevSpark Tech Solutions',
    } as any;

    if (typeof window !== 'undefined') {
      localStorage.setItem('fw_demo_agency_user', JSON.stringify(demoUser));
      window.dispatchEvent(new Event('fw_auth_change'));
    }

    setCurrentUser(demoUser);
    await fetch('/api/agency/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: demoUid,
        email: demoEmail,
        companyName: 'DevSpark Tech Solutions',
        contactPerson: 'Vikram Joshi (Co-Founder)',
        phone: '+91 98200 81290',
        portfolioWebsite: 'https://devspark-tech.com',
      }),
    });
    const res = await fetch(`/api/agency/me?uid=${demoUid}`);
    const data = await res.json();
    if (data.success) {
      setAgencyProfile(data.agency);
      setProfileForm({
        companyName: data.agency.companyName,
        contactPerson: data.agency.contactPerson,
        phone: data.agency.phone,
        portfolioWebsite: data.agency.portfolioWebsite,
      });
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('fw_auth_change'));
    }
    setShowAuthModal(false);
    setNotification({ type: 'success', message: 'Logged in as Certified Agency Partner! Ready to explore leads.' });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setProfileSaving(true);
    try {
      const res = await fetch('/api/agency/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          ...profileForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAgencyProfile(data.agency);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('fw_auth_change'));
        }
        setIsEditingProfile(false);
        setNotification({ type: 'success', message: 'Agency profile updated successfully!' });
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to update agency profile' });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fw_demo_agency_user');
      window.dispatchEvent(new Event('fw_auth_change'));
    }
    await signOut(auth);
    setAgencyProfile(null);
    setCurrentUser(null);
    setActiveTab('marketplace');
    setNotification({ type: 'success', message: 'You have been logged out securely.' });
  };

  // Payment Handlers (Cashfree)
  const handleInitiatePlanPurchase = (plan: ILeadPlan) => {
    if (!currentUser) {
      setSelectedPlanForPurchase(plan);
      setShowAuthModal(true);
      return;
    }
    setSelectedPlanForPurchase(plan);
    setDisclaimerAccepted(false);
  };

  const handleProceedToCashfree = async () => {
    if (!selectedPlanForPurchase || !currentUser || !disclaimerAccepted) return;

    try {
      setPaymentProcessing(true);

      const res = await fetch('/api/agency/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlanForPurchase.id,
          uid: currentUser.uid,
          disclaimerAccepted: true,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // Initialize Cashfree checkout
      const cashfree = window.Cashfree({
        mode: 'production',
      });

      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: '_modal' as const,
      };

      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) {
        // Payment was cancelled or errored
        setPaymentProcessing(false);
        console.error('[Cashfree] Payment error:', result.error);
        setNotification({
          type: 'error',
          message: result.error.message || 'Payment was cancelled. No amount has been charged.',
        });
        return;
      }

      if (result.redirect) {
        // Payment is being redirected — handled via return_url
        console.log('[Cashfree] Payment redirect triggered');
        return;
      }

      // Payment completed — verify on server
      try {
        const verifyRes = await fetch('/api/agency/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.orderId,
            planId: selectedPlanForPurchase.id,
            uid: currentUser.uid,
            disclaimerAccepted: true,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setAgencyProfile((prev: any) => ({
            ...prev,
            creditsBalance: verifyData.newCreditsBalance,
          }));
          setSelectedPlanForPurchase(null);
          setNotification({
            type: 'success',
            message: `Payment Successful! ${selectedPlanForPurchase.leadsCount} Exclusive Lead Credits have been added to your balance.`,
          });
          setActiveTab('marketplace');
        } else {
          setNotification({ type: 'error', message: verifyData.error || 'Payment verification failed.' });
        }
      } catch (err: any) {
        setNotification({ type: 'error', message: err.message || 'Payment verification failed.' });
      } finally {
        setPaymentProcessing(false);
      }
    } catch (err: any) {
      setPaymentProcessing(false);
      setNotification({ type: 'error', message: err.message || 'Payment initialization failed.' });
    }
  };

  // Lead Unlock Handler
  const handleUnlockLead = async () => {
    if (!leadToUnlock || !currentUser) return;

    try {
      setUnlocking(true);
      const res = await fetch('/api/agency/leads/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: leadToUnlock._id,
          uid: currentUser.uid,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAgencyProfile((prev: any) => ({
          ...prev,
          creditsBalance: data.remainingCredits,
        }));
        setAvailableLeads((prev) => prev.filter((l) => l._id !== leadToUnlock._id));
        setLeadToUnlock(null);
        setNotification({
          type: 'success',
          message: 'Client contact details unlocked exclusively! View full credentials in "My Unlocked Leads".',
        });
        setActiveTab('my-leads');
      } else {
        if (data.needsCredits) {
          setLeadToUnlock(null);
          setActiveTab('pricing');
          setNotification({ type: 'error', message: data.error });
        } else {
          setNotification({ type: 'error', message: data.error || 'Could not unlock lead.' });
        }
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Unlock process failed.' });
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <>
      <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="afterInteractive" />

      <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
        {/* HERO SECTION - BPO & LEAD GENERATION */}
        <div className="bg-[#064E3B] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#04382a] relative overflow-hidden text-center">
          {/* Subtle background glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
            {/* Centered Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8e7c9]/15 border border-[#f8e7c9]/30 text-[#f8e7c9] text-xs font-bold uppercase tracking-wider shadow-sm mx-auto">
              <Sparkles className="w-3.5 h-3.5" /> India's Premier BPO & Exclusive Lead Generation Network
            </div>

            {/* Centered Main Heading */}
            <div className="max-w-3xl space-y-4 text-center mx-auto">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white text-center">
                Scalable BPO Services & <span className="text-[#f8e7c9]">Verified Lead Generation</span> for Growing Businesses
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto text-center">
                Accelerate your growth with professional <strong>Inbound & Outbound Telecalling</strong>, <strong>24/7 Customer Support</strong>, and <strong>100% verified, exclusive client leads</strong>. Every lead is allocated strictly to one partner—guaranteed zero lead sharing.
              </p>
            </div>

            {/* Centered Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-emerald-100 flex items-center gap-1.5 shadow-xs">
                <PhoneCall className="w-3.5 h-3.5 text-[#f8e7c9]" /> Inbound & Outbound Calling
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-emerald-100 flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f8e7c9]" /> 100% Verified Exclusive Leads
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-emerald-100 flex items-center gap-1.5 shadow-xs">
                <Headphones className="w-3.5 h-3.5 text-[#f8e7c9]" /> 24/7 Customer & Live Chat Support
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-emerald-100 flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f8e7c9]" /> Zero Lead-Sharing Guarantee
              </div>
            </div>

            {/* Centered Action Trigger (Profile & Purchase details removed; already in tabs/profile section) */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => setActiveTab('marketplace')}
                    className="bg-[#f8e7c9] hover:bg-[#edd4a6] text-[#064E3B] px-6 py-3.5 rounded-2xl font-black text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" /> Browse Available Client Requirements
                  </button>
                  <button
                    onClick={() => setActiveTab('pricing')}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Coins className="w-4 h-4 text-[#f8e7c9]" /> View Lead Plans & Pricing
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-[#f8e7c9] hover:bg-[#edd4a6] text-[#064E3B] px-6 py-3.5 rounded-2xl font-black text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" /> Register Partner Account
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-bold text-xs border border-white/20 transition-all cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('marketplace')}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Browse Available Leads</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f8e7c9]" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* NOTIFICATION BANNER */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-7xl mx-auto px-4 mt-6"
            >
              <div
                className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-md ${
                  notification.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-50 text-rose-900 border border-rose-300'
                }`}
              >
                <span>{notification.message}</span>
                <button
                  onClick={() => setNotification(null)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-6">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`pb-3 text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'marketplace'
                    ? 'text-[#064E3B] border-b-2 border-[#064E3B]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Available Projects ({availableLeads.length})
              </button>

              <button
                onClick={() => {
                  if (!currentUser) {
                    setShowAuthModal(true);
                  } else {
                    setActiveTab('my-leads');
                  }
                }}
                className={`pb-3 text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'my-leads'
                    ? 'text-[#064E3B] border-b-2 border-[#064E3B]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Unlock className="w-4 h-4" /> My Unlocked Clients ({myUnlockedLeads.length})
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`pb-3 text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'pricing'
                    ? 'text-[#064E3B] border-b-2 border-[#064E3B]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Coins className="w-4 h-4 text-amber-500" /> Lead Packages (Pricing)
              </button>

              {currentUser && (
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-3 text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'profile'
                      ? 'text-[#064E3B] border-b-2 border-[#064E3B]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#064E3B]" /> Agency Profile
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Exclusivity Guaranteed: 1 Client = 1 Agency Allocation</span>
            </div>
          </div>

          {/* TAB 1: AVAILABLE PROJECTS MARKETPLACE */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search requirements, tech stack (Next.js, Flutter, SEO, Chatbot), or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#064E3B] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Disciplines</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="SEO Services">SEO Services</option>
                    <option value="AI & Automation">AI & Automation</option>
                  </select>
                </div>
              </div>

              {/* Grid of Leads */}
              {leadsLoading ? (
                <div className="bg-white p-20 text-center rounded-3xl border border-slate-200 text-xs text-slate-500 font-medium flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-[#064E3B] animate-spin" />
                  <span>Loading genuine client requirements...</span>
                </div>
              ) : availableLeads.length === 0 ? (
                <div className="bg-white p-20 text-center rounded-3xl border border-slate-200 space-y-4">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">No open projects match this criteria</h3>
                    <p className="text-xs text-slate-500">
                      Our procurement team posts verified corporate inquiries daily. Please check back shortly or reset your filters.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableLeads.map((lead) => (
                    <div
                      key={lead._id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-2xs hover:shadow-xl hover:border-[#064E3B]/30 transition-all duration-300 flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 bg-emerald-50 text-[#064E3B] text-[11px] font-black rounded-lg border border-emerald-200">
                            {lead.category}
                          </span>
                          <span className="px-3 py-1 bg-amber-50 text-amber-900 text-[11px] font-black rounded-lg border border-amber-200">
                            Budget: {lead.budgetRange}
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 leading-snug">{lead.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{lead.projectDescription}</p>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lead.cityLocation}</span>
                        </div>
                      </div>

                      {/* Masked Preview Area */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client Contact</span>
                          <span className="text-[10px] text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Direct Contact Locked
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Point of Contact</span>
                            <span className="font-bold text-slate-700 blur-[2px] select-none">{lead.clientName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Phone / WhatsApp</span>
                            <span className="font-bold text-slate-700 blur-[3px] select-none">{lead.clientPhone}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (!currentUser) {
                              setShowAuthModal(true);
                              return;
                            }
                            if ((agencyProfile?.creditsBalance || 0) < 1) {
                              setActiveTab('pricing');
                              setNotification({
                                type: 'error',
                                message: 'Zero credits remaining. Select a package below to unlock direct client details.',
                              });
                              return;
                            }
                            setLeadToUnlock(lead);
                          }}
                          className="w-full bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] py-3 rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                        >
                          <Unlock className="w-4 h-4" /> Unlock Direct Client Credentials (-1 Credit)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY UNLOCKED LEADS */}
          {activeTab === 'my-leads' && (
            <div className="space-y-6">
              {!currentUser ? (
                <div className="bg-white p-16 text-center rounded-3xl border border-slate-200 space-y-4">
                  <Lock className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">Please Sign In to Access Your Unlocked Clients</h3>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-[#064E3B] text-[#f8e7c9] px-6 py-3 rounded-2xl font-bold text-xs cursor-pointer shadow-md"
                  >
                    Sign In or Register
                  </button>
                </div>
              ) : myUnlockedLeads.length === 0 ? (
                <div className="bg-white p-20 text-center rounded-3xl border border-slate-200 space-y-4">
                  <Unlock className="w-12 h-12 text-slate-300 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">No Unlocked Clients Yet</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Explore available corporate projects and click &quot;Unlock Direct Client Credentials&quot; to reveal phone numbers, emails, and exact locations.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('marketplace')}
                    className="bg-[#064E3B] text-[#f8e7c9] px-6 py-3 rounded-2xl font-bold text-xs cursor-pointer shadow-md"
                  >
                    Browse Available Projects
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {myUnlockedLeads.map((lead) => (
                    <div
                      key={lead._id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 bg-emerald-50 text-[#064E3B] text-[10px] font-black rounded-lg border border-emerald-200">
                              {lead.category}
                            </span>
                            <span className="px-3 py-1 bg-amber-50 text-amber-900 text-[10px] font-black rounded-lg border border-amber-200">
                              Budget: {lead.budgetRange}
                            </span>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-lg border border-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Exclusive to Your Agency
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 mt-2">{lead.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">{lead.projectDescription}</p>
                        </div>
                      </div>

                      {/* REVEALED CONTACT CREDENTIALS CARD */}
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                        <div className="space-y-1">
                          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Authorized Contact</span>
                          <span className="text-sm font-black text-slate-900">{lead.clientName}</span>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Direct Phone & WhatsApp</span>
                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`tel:${lead.clientPhone}`}
                              className="inline-flex items-center gap-1.5 bg-[#064E3B] text-[#f8e7c9] px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:bg-[#04382a] transition-all"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call: {lead.clientPhone}
                            </a>
                            <a
                              href={`https://wa.me/${lead.clientPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                lead.clientName
                              )},%20we%20received%20your%20requirement%20regarding%20${encodeURIComponent(
                                lead.title
                              )}%20via%20FreelanceWalla.`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:bg-emerald-700 transition-all"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Official Email</span>
                          <a
                            href={`mailto:${lead.clientEmail}`}
                            className="font-black text-[#064E3B] hover:underline flex items-center gap-1 text-sm"
                          >
                            <Mail className="w-4 h-4" /> {lead.clientEmail}
                          </a>
                        </div>

                        <div className="sm:col-span-3 pt-3 border-t border-emerald-200/80 flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">Registered Corporate Address</span>
                            <span className="font-semibold text-slate-800">{lead.clientFullAddress} ({lead.cityLocation})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRICING PACKAGES */}
          {activeTab === 'pricing' && (
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#e6f4f0] border border-[#064E3B]/10 px-3 py-1 rounded-full">
                  Guaranteed Exclusive Allocation
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#064E3B] tracking-tight">
                  Lead Packages for Software Agencies
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Zero commission on client project value. Purchase bulk unlocking credits and pick qualified prospects in your core engineering discipline.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LEAD_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 relative border transition-all duration-300 ${
                      plan.popular
                        ? 'border-[#064E3B] shadow-2xl ring-2 ring-[#064E3B]/20'
                        : 'border-slate-200 shadow-2xs hover:shadow-xl'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#064E3B] text-[#f8e7c9] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                        Most Popular Package
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">{plan.pricePerLead}</p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-[#064E3B]">₹{plan.price}</span>
                        <span className="text-xs text-slate-400 font-semibold">/ one-time investment</span>
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-2.5">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleInitiatePlanPurchase(plan)}
                      className={`w-full py-4 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <Coins className="w-4 h-4 text-[#f8e7c9]" /> Unlock {plan.leadsCount} Exclusive Leads (₹{plan.price})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AGENCY PROFILE SECTION */}
          {activeTab === 'profile' && currentUser && agencyProfile && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header Profile Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#04382a] text-[#f8e7c9] flex items-center justify-center text-xl font-black shadow-md shrink-0">
                    {agencyProfile.companyName?.slice(0, 2).toUpperCase() || 'AG'}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl font-black text-slate-900">{agencyProfile.companyName}</h2>
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Agency
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Representative: {agencyProfile.contactPerson} • {agencyProfile.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  {isEditingProfile ? 'Cancel Editing' : 'Edit Profile Details'}
                </button>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Lead Credits</span>
                  <div className="text-3xl font-black text-[#064E3B] flex items-center gap-2">
                    <Coins className="w-6 h-6 text-amber-500" /> {agencyProfile.creditsBalance || 0}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Credits Acquired</span>
                  <div className="text-3xl font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-600" /> {agencyProfile.totalCreditsPurchased || 0}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Unlocked Clients</span>
                  <div className="text-3xl font-black text-blue-600 flex items-center gap-2">
                    <Unlock className="w-6 h-6 text-blue-500" /> {myUnlockedLeads.length}
                  </div>
                </div>
              </div>

              {/* Sub-tab Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setProfileSubTab('details')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    profileSubTab === 'details'
                      ? 'bg-[#064E3B] text-[#f8e7c9] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Agency Credentials
                </button>

                <button
                  type="button"
                  onClick={() => setProfileSubTab('leads')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    profileSubTab === 'leads'
                      ? 'bg-[#064E3B] text-[#f8e7c9] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Unlocked Lead History ({myUnlockedLeads.length})
                </button>

                <button
                  type="button"
                  onClick={() => setProfileSubTab('payments')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    profileSubTab === 'payments'
                      ? 'bg-[#064E3B] text-[#f8e7c9] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Payment History ({paymentsList.length})
                </button>
              </div>

              {/* VIEW 1: AGENCY CREDENTIALS */}
              {profileSubTab === 'details' && (
                <>
                  {isEditingProfile ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-5">
                      <h3 className="text-base font-black text-[#064E3B]">Update Agency Credentials</h3>
                      <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Company / Agency Name</label>
                            <input
                              type="text"
                              required
                              value={profileForm.companyName}
                              onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Primary Contact Person</label>
                            <input
                              type="text"
                              required
                              value={profileForm.contactPerson}
                              onChange={(e) => setProfileForm({ ...profileForm, contactPerson: e.target.value })}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Official Mobile / WhatsApp</label>
                            <input
                              type="tel"
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Portfolio / Website Link</label>
                            <input
                              type="url"
                              value={profileForm.portfolioWebsite}
                              onChange={(e) => setProfileForm({ ...profileForm, portfolioWebsite: e.target.value })}
                              placeholder="https://youragency.com"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-3">
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={profileSaving}
                            className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-[#f8e7c9] font-bold shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                          >
                            {profileSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-6">
                      <h3 className="text-base font-black text-slate-900">Agency Information & Specialties</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Email</span>
                          <span className="text-sm font-bold text-slate-800">{agencyProfile.email}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Phone</span>
                          <span className="text-sm font-bold text-slate-800">{agencyProfile.phone || 'Not specified'}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Portfolio</span>
                          {agencyProfile.portfolioWebsite ? (
                            <a
                              href={agencyProfile.portfolioWebsite.startsWith('http') ? agencyProfile.portfolioWebsite : `https://${agencyProfile.portfolioWebsite}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-bold text-[#064E3B] hover:underline flex items-center gap-1.5"
                            >
                              <Globe className="w-3.5 h-3.5" /> {agencyProfile.portfolioWebsite}
                            </a>
                          ) : (
                            <span className="text-sm text-slate-400">None provided</span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Approved Engineering Categories</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#064E3B] rounded-lg font-bold text-[10px]">Web Development</span>
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#064E3B] rounded-lg font-bold text-[10px]">App Development</span>
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#064E3B] rounded-lg font-bold text-[10px]">SEO Services</span>
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#064E3B] rounded-lg font-bold text-[10px]">AI & Automation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* VIEW 2: UNLOCKED LEAD HISTORY */}
              {profileSubTab === 'leads' && (
                <div className="space-y-4">
                  {leadsLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#064E3B]" />
                      <span className="text-xs">Loading unlocked leads...</span>
                    </div>
                  ) : myUnlockedLeads.length === 0 ? (
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
                      <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                      <h4 className="font-bold text-sm text-slate-800">No Unlocked Leads in History</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        You have not unlocked any client contacts yet. Head over to the Marketplace tab to unlock exclusive leads.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('marketplace')}
                        className="px-4 py-2 rounded-xl bg-[#064E3B] text-[#f8e7c9] text-xs font-bold cursor-pointer"
                      >
                        Explore Marketplace
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myUnlockedLeads.map((lead) => (
                        <div key={lead._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#064E3B] text-[#f8e7c9]">
                                {lead.category}
                              </span>
                              <h4 className="text-base font-bold text-slate-900 mt-1">{lead.title}</h4>
                            </div>
                            <div className="sm:text-right">
                              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                                Scope: {lead.budgetRange}
                              </span>
                            </div>
                          </div>

                          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                            <span className="font-black text-emerald-900 uppercase text-[10px] block">
                              Client Contact Credentials
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 font-medium">
                              <div><strong>Name:</strong> {lead.clientName}</div>
                              <div>
                                <strong>Phone:</strong>{' '}
                                <a href={`tel:${lead.clientPhone}`} className="text-[#064E3B] font-bold hover:underline">
                                  {lead.clientPhone}
                                </a>
                              </div>
                              <div>
                                <strong>Email:</strong>{' '}
                                <a href={`mailto:${lead.clientEmail}`} className="text-[#064E3B] hover:underline">
                                  {lead.clientEmail}
                                </a>
                              </div>
                              <div><strong>City:</strong> {lead.cityLocation}</div>
                            </div>
                            {lead.clientFullAddress && (
                              <div className="pt-1 text-slate-600 border-t border-emerald-200/60">
                                <strong>Address:</strong> {lead.clientFullAddress}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 3: PAYMENT HISTORY */}
              {profileSubTab === 'payments' && (
                <div className="space-y-4">
                  {paymentsLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#064E3B]" />
                      <span className="text-xs">Loading payment transactions...</span>
                    </div>
                  ) : paymentsList.length === 0 ? (
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
                      <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
                      <h4 className="font-bold text-sm text-slate-800">No Payment Records Found</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Purchase lead packages to unlock direct leads. Every verified transaction is listed here.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('pricing')}
                        className="px-4 py-2 rounded-xl bg-[#064E3B] text-[#f8e7c9] text-xs font-bold cursor-pointer"
                      >
                        View Pricing Plans
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paymentsList.map((order, idx) => (
                        <div
                          key={order._id || idx}
                          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#064E3B] flex items-center justify-center shrink-0">
                                <CreditCard className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-bold text-sm text-slate-900">{order.planName}</h5>
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
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
                              <span className="text-lg font-black text-[#064E3B]">₹{order.amount?.toLocaleString('en-IN')}</span>
                              <span className="block text-[11px] text-emerald-700 font-bold">+{order.creditsGiven} Credits</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            {order.cashfreePaymentId && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Payment ID:</span>
                                <div className="flex items-center gap-1 font-mono font-semibold text-slate-700 truncate">
                                  <span className="truncate">{order.cashfreePaymentId}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(order.cashfreePaymentId);
                                      setCopiedTxnId(`p_${order._id}`);
                                      setTimeout(() => setCopiedTxnId(null), 2000);
                                    }}
                                    className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                                  >
                                    {copiedTxnId === `p_${order._id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                  </button>
                                </div>
                              </div>
                            )}

                            {order.cashfreeOrderId && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-500">Order ID:</span>
                                <div className="flex items-center gap-1 font-mono font-semibold text-slate-700 truncate">
                                  <span className="truncate">{order.cashfreeOrderId}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(order.cashfreeOrderId);
                                      setCopiedTxnId(`o_${order._id}`);
                                      setTimeout(() => setCopiedTxnId(null), 2000);
                                    }}
                                    className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                                  >
                                    {copiedTxnId === `o_${order._id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
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
            </div>
          )}
        </div>

        {/* PRE-PAYMENT TERMS & NOTICE MODAL (ANIMATED) */}
        <AnimatePresence>
          {selectedPlanForPurchase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPlanForPurchase(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-black text-slate-900">Pre-Purchase Terms & Disclaimer</h3>
                  </div>
                  <button
                    onClick={() => setSelectedPlanForPurchase(null)}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase">Selected Package</span>
                    <span className="font-black text-sm text-[#064E3B]">{selectedPlanForPurchase.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase">Investment</span>
                    <span className="font-black text-lg text-[#064E3B]">₹{selectedPlanForPurchase.price}</span>
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 space-y-3 text-xs text-amber-950">
                  <p className="font-black text-amber-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" /> Important Guidelines Before Payment:
                  </p>
                  <ul className="space-y-2 list-disc pl-4 text-slate-700 leading-relaxed font-medium">
                    <li>
                      <strong>Verified Client Inquiries:</strong> FreelanceWalla furnishes direct, validated client credentials (Phone, WhatsApp, Email, Location & Technical Requirement).
                    </li>
                    <li>
                      <strong>No Conversion Guarantee:</strong> FreelanceWalla does not guarantee that the prospect will accept your commercial quotation. Conversion and negotiation remain entirely under your agency&apos;s communication and pitching capability.
                    </li>
                    <li>
                      <strong>100% Exclusive Allocation:</strong> The lead allocated to your company will never be distributed to any other agency.
                    </li>
                    <li>
                      <strong>Strict Non-Refundable Policy:</strong> Due to immediate disclosure of private client contact credentials, all credit pack purchases are non-refundable.
                    </li>
                  </ul>
                </div>

                <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <input
                    type="checkbox"
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                    className="w-4 h-4 text-[#064E3B] rounded focus:ring-[#064E3B] mt-0.5"
                  />
                  <span className="font-bold leading-snug">
                    I have read and agree to the Terms & Notice. I acknowledge that pitching and closing client deals is the sole responsibility of my agency.
                  </span>
                </label>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanForPurchase(null)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!disclaimerAccepted || paymentProcessing}
                    onClick={handleProceedToCashfree}
                    className="px-7 py-3 rounded-2xl bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] font-black text-xs shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {paymentProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Launching Cashfree Gateway...
                      </>
                    ) : (
                      <>Pay ₹{selectedPlanForPurchase.price} Securely</>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* UNLOCK LEAD CONFIRMATION MODAL (ANIMATED) */}
        <AnimatePresence>
          {leadToUnlock && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLeadToUnlock(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 border border-slate-200 shadow-2xl z-10"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-[#064E3B]">Confirm Exclusive Lead Unlock</h3>
                  <button onClick={() => setLeadToUnlock(null)} className="text-slate-400 hover:text-slate-700 p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <p className="font-black text-slate-900 text-sm">{leadToUnlock.title}</p>
                  <p>Category: <strong className="text-slate-800">{leadToUnlock.category}</strong></p>
                  <p>Budget Scope: <strong className="text-slate-800">{leadToUnlock.budgetRange}</strong></p>
                  <p>Client City: <strong className="text-slate-800">{leadToUnlock.cityLocation}</strong></p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 leading-relaxed font-medium">
                  Unlocking this client will deduct <strong>1 Lead Credit</strong> from your balance. This client will be exclusively assigned to your agency and will immediately vanish from other companies&apos; feeds.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setLeadToUnlock(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={unlocking}
                    onClick={handleUnlockLead}
                    className="px-6 py-2.5 rounded-2xl bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] text-xs font-black shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {unlocking ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Unlocking Client...
                      </>
                    ) : (
                      'Confirm Unlock (-1 Credit)'
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* AUTH MODAL (FIREBASE AUTH - ANIMATED & RESPONSIVE) */}
        <AnimatePresence>
          {showAuthModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAuthModal(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-xl font-black text-[#064E3B]">
                      {authMode === 'signup' ? 'Agency Partner Registration' : 'Agency Portal Login'}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Access corporate verified client inquiries</p>
                  </div>
                  <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {authError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-900 p-3.5 rounded-xl text-xs font-medium leading-relaxed">
                    {authError}
                  </div>
                )}

                {/* Google 1-Click Sign-in */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={authSubmitting}
                  className="w-full py-3.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-2xl text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center gap-2.5 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="font-bold text-[10px] tracking-wider">OR EMAIL ACCESS</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-3.5 text-xs">
                  {authMode === 'signup' && (
                    <>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Company / Agency Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Technologies Inc."
                          value={authCompanyName}
                          onChange={(e) => setAuthCompanyName(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Authorized Contact Person *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Malhotra"
                          value={authContactPerson}
                          onChange={(e) => setAuthContactPerson(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Contact Phone / WhatsApp</label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Agency Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="contact@youragency.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authSubmitting}
                    className="w-full py-3.5 bg-[#064E3B] hover:bg-[#04382a] text-[#f8e7c9] font-black rounded-xl shadow-md cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                  >
                    {authSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing Credentials...
                      </>
                    ) : authMode === 'signup' ? (
                      'Register Agency Account'
                    ) : (
                      'Access Partner Portal'
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'signup' ? 'login' : 'signup');
                      setAuthError('');
                    }}
                    className="text-xs text-[#064E3B] font-bold hover:underline cursor-pointer block mx-auto"
                  >
                    {authMode === 'signup'
                      ? 'Already have an agency account? Sign In'
                      : "Don't have an agency account yet? Register Here"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
