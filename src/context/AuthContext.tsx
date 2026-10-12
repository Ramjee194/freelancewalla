'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
import { IAgencyUser } from '@/types';

interface AuthContextType {
  user: User | { uid: string; email: string | null; displayName?: string | null; photoURL?: string | null } | null;
  agencyProfile: IAgencyUser | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, agencyInfo: any) => Promise<void>;
  loginWithDemo: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateAgencyProfile: (data: Partial<IAgencyUser>) => Promise<IAgencyUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = 'fw_demo_agency_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [agencyProfile, setAgencyProfile] = useState<IAgencyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const syncAndFetchAgency = async (currentUser: any) => {
    if (!currentUser?.uid) return;
    try {
      const res = await fetch('/api/agency/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email || '',
          companyName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Agency Partner',
          contactPerson: currentUser.displayName || 'Authorized Representative',
        }),
      });
      const data = await res.json();
      if (data.success && data.agency) {
        setAgencyProfile(data.agency);
        return data.agency;
      }
    } catch (err) {
      console.error('Error syncing agency profile:', err);
    }

    // Secondary fetch attempt
    try {
      const getRes = await fetch(`/api/agency/me?uid=${currentUser.uid}`);
      const getData = await getRes.json();
      if (getData.success && getData.agency) {
        setAgencyProfile(getData.agency);
        return getData.agency;
      }
    } catch (err) {
      console.error('Error fetching agency:', err);
    }
    return null;
  };

  useEffect(() => {
    // 1. Check for persisted demo user first if Firebase auth doesn't emit immediately
    let demoLoaded = false;
    if (typeof window !== 'undefined') {
      try {
        const storedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
        if (storedDemo) {
          const parsed = JSON.parse(storedDemo);
          setUser(parsed);
          syncAndFetchAgency(parsed);
          demoLoaded = true;
          setIsLoading(false);
        }
      } catch (e) {
        // ignore
      }
    }

    // 2. Subscribe to Firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(DEMO_STORAGE_KEY);
        }
        setUser(firebaseUser);
        await syncAndFetchAgency(firebaseUser);
      } else if (!demoLoaded) {
        // If not demo user, clear state
        if (typeof window !== 'undefined' && !localStorage.getItem(DEMO_STORAGE_KEY)) {
          setUser(null);
          setAgencyProfile(null);
        }
      }
      setIsLoading(false);
    });

    // 3. Listen for cross-component auth changes
    const handleAuthChange = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(DEMO_STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            syncAndFetchAgency(parsed);
          } catch (e) {}
        } else if (!auth.currentUser) {
          setUser(null);
          setAgencyProfile(null);
        }
      }
    };

    window.addEventListener('fw_auth_change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      unsubscribe();
      window.removeEventListener('fw_auth_change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    }
    setUser(result.user);
    await syncAndFetchAgency(result.user);
    closeAuthModal();
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    }
    setUser(result.user);
    await syncAndFetchAgency(result.user);
    closeAuthModal();
  };

  const signupWithEmail = async (email: string, pass: string, agencyInfo: any) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    }
    setUser(result.user);

    // Initial sync with custom details
    const syncRes = await fetch('/api/agency/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: result.user.uid,
        email: result.user.email,
        companyName: agencyInfo.companyName || email.split('@')[0],
        contactPerson: agencyInfo.contactPerson || 'Authorized Representative',
        phone: agencyInfo.phone || '',
        portfolioWebsite: agencyInfo.portfolioWebsite || '',
        categories: agencyInfo.categories || ['BPO & Telecalling', 'Web Development'],
      }),
    });
    const syncData = await syncRes.json();
    if (syncData.success) {
      setAgencyProfile(syncData.agency);
    }
    closeAuthModal();
  };

  const loginWithDemo = async () => {
    const demoUid = 'demo_agency_99';
    const demoEmail = 'partner.agency@freelancewalla.in';
    const demoUser = {
      uid: demoUid,
      email: demoEmail,
      displayName: 'DevSpark Tech Solutions',
      photoURL: null,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
    }
    setUser(demoUser);

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
        categories: ['Web Development', 'App Development', 'AI & Automation'],
      }),
    });

    const res = await fetch(`/api/agency/me?uid=${demoUid}`);
    const data = await res.json();
    if (data.success && data.agency) {
      setAgencyProfile(data.agency);
    } else {
      setAgencyProfile({
        firebaseUid: demoUid,
        companyName: 'DevSpark Tech Solutions',
        contactPerson: 'Vikram Joshi (Co-Founder)',
        email: demoEmail,
        phone: '+91 98200 81290',
        portfolioWebsite: 'https://devspark-tech.com',
        isVerifiedByAdmin: true,
        creditsBalance: 5,
        totalCreditsPurchased: 5,
        status: 'Active',
      } as IAgencyUser);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('fw_auth_change'));
    }

    closeAuthModal();
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_STORAGE_KEY);
      window.dispatchEvent(new Event('fw_auth_change'));
    }
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setUser(null);
    setAgencyProfile(null);
  };

  const refreshProfile = async () => {
    if (user?.uid) {
      try {
        const res = await fetch(`/api/agency/me?uid=${user.uid}`);
        const data = await res.json();
        if (data.success && data.agency) {
          setAgencyProfile(data.agency);
        }
      } catch (err) {
        console.error('Failed to refresh profile:', err);
      }
    }
  };

  const updateAgencyProfile = async (data: Partial<IAgencyUser>) => {
    if (!user?.uid) return null;
    try {
      const res = await fetch('/api/agency/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          ...data,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        setAgencyProfile(resData.agency);
        return resData.agency;
      }
    } catch (err) {
      console.error('Failed to update agency profile:', err);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        agencyProfile,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        loginWithDemo,
        logout,
        refreshProfile,
        updateAgencyProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
