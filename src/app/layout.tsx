import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'FreelanceWalla | #1 BPO, Telecalling, Data Entry & Customer Support Outsourcing India',
    template: '%s | FreelanceWalla',
  },
  description:
    'Outsource BPO services in India with FreelanceWalla. Dedicated sales telecalling, 24/7 customer support, live chat, email management, data entry & lead generation teams. Apply online for remote work from home jobs.',
  keywords: [
    'FreelanceWalla',
    'freelancewalla.in',
    'BPO Services India',
    'Telecalling Services India',
    'Customer Support Outsourcing',
    'Live Chat Support Agency',
    'Email Support Team',
    'Data Entry Outsourcing',
    'Lead Generation Services India',
    'Back Office Outsourcing',
    'Remote Work India',
    'Work From Home Telecalling Jobs',
    'Freelance BPO Jobs India',
    'Hire Telecallers India',
    'Virtual Assistant Services',
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
    title: 'FreelanceWalla | #1 BPO, Telecalling & Customer Support Outsourcing',
    description:
      'Connect your business with reliable remote teams for sales telecalling, customer support, live chat, email handling, and data entry operations across India.',
    url: 'https://freelancewalla.in',
    siteName: 'FreelanceWalla',
    images: [
      {
        url: '/images/hero_bpo_team.png',
        width: 1200,
        height: 630,
        alt: 'FreelanceWalla BPO & Support Services India',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreelanceWalla | #1 BPO & Remote Support Platform',
    description: 'Outsource telecalling, customer support, live chat, email, and data entry to trained remote teams.',
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
  // Schema.org JSON-LD Structured Data for Google Rich Search Snippets & 5-Star Ratings
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://freelancewalla.in/#organization',
    name: 'FreelanceWalla',
    url: 'https://freelancewalla.in',
    logo: 'https://freelancewalla.in/images/brand_logo.svg',
    image: 'https://freelancewalla.in/images/hero_bpo_team.png',
    description:
      'FreelanceWalla provides sales telecalling, customer support, live chat, email management, data entry, lead generation and back-office outsourcing services in India.',
    email: 'info@freelancewalla.in',
    telePhone: '+91-9876543210',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '124',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: ['https://freelancewalla.in'],
    priceRange: '₹₹',
    areaServed: 'India',
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://freelancewalla.in/#website',
    url: 'https://freelancewalla.in',
    name: 'FreelanceWalla',
    description: 'BPO, Telecalling, Customer Support & Data Entry Services India',
    publisher: {
      '@id': 'https://freelancewalla.in/#organization',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLdOrganization, jsonLdWebSite]) }}
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
