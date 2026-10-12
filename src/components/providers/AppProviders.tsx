'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
    </AuthProvider>
  );
}
