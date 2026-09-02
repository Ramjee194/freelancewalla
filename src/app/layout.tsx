import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'FreelanceWalla | BPO, Telecalling, Customer Support & Freelance Services',
    template: '%s | FreelanceWalla',
  },
  description:
    'FreelanceWalla provides reliable sales telecalling, customer support, live chat, email management, data entry, lead generation and back-office outsourcing services in India.',
  keywords: [
    'FreelanceWalla',
    'freelancewalla.in',
    'BPO Services India',
    'Telecalling Services India',
    'Customer Support Outsourcing',
    'Live Chat Support Agency',
    'Email Support Team',
    'Data Entry Outsourcing',
    'Remote Work India',
    'Work From Home Telecalling Jobs',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in'),
  alternates: {
    canonical: 'https://freelancewalla.in',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/images/brand_logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'FreelanceWalla | BPO, Telecalling & Customer Support Services',
    description:
      'Connect your business with reliable support teams for sales, telecalling, customer service, chat, email, data entry and back-office operations.',
    url: 'https://freelancewalla.in',
    siteName: 'FreelanceWalla',
    images: [
      {
        url: '/images/hero_bpo_team.png',
        width: 1200,
        height: 630,
        alt: 'FreelanceWalla BPO & Support Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreelanceWalla | BPO & Support Services Platform',
    description: 'Outsource telecalling, customer support, chat, email, and data entry to trained remote teams.',
    images: ['/images/hero_bpo_team.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD Structured Data for Google Rich Search Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'FreelanceWalla',
    url: 'https://freelancewalla.in',
    logo: 'https://freelancewalla.in/images/brand_logo.svg',
    image: 'https://freelancewalla.in/images/hero_bpo_team.png',
    description:
      'FreelanceWalla provides sales telecalling, customer support, live chat, email management, data entry, lead generation and back-office outsourcing services in India.',
    email: 'info@freelancewalla.in',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: ['https://freelancewalla.in'],
    priceRange: '₹₹',
    areaServed: 'India',
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
