import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'FreelanceWalla | BPO, Telecalling, Customer Support & Freelance Services',
  description:
    'FreelanceWalla provides sales, telecalling, customer support, chat, email, data entry, lead generation and back-office outsourcing services, along with flexible work opportunities.',
  keywords: [
    'FreelanceWalla',
    'BPO Services India',
    'Telecalling Services',
    'Customer Support Outsourcing',
    'Chat Support',
    'Email Support',
    'Data Entry Services',
    'Remote Work India',
    'Work From Home Jobs',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in'),
  openGraph: {
    title: 'FreelanceWalla | BPO & Freelance Support Services',
    description:
      'Connect your business with reliable support for sales, telecalling, customer service, chat, email, data entry and back-office operations.',
    url: 'https://freelancewalla.in',
    siteName: 'FreelanceWalla',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
