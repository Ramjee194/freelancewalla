import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

export const metadata: Metadata = {
  // ─── Title Strategy ────────────────────────────────────────────────────────
  title: {
    default:
      'FreelanceWalla – #1 BPO, Telecalling, Data Entry & Customer Support Outsourcing India',
    template: '%s | FreelanceWalla',
  },
  // ─── Primary Meta ──────────────────────────────────────────────────────────
  description:
    'FreelanceWalla is India\'s trusted BPO outsourcing platform — dedicated sales telecalling, 24/7 customer support, live chat, email management, data entry & lead generation teams. Hire trained remote teams or apply for work-from-home jobs online.',
  keywords: [
    'FreelanceWalla',
    'freelancewalla.in',
    'BPO Services India',
    'BPO Company in Gurgaon',
    'BPO in Cyber City Gurgaon',
    'Telecalling Company Gurgaon Haryana',
    'DLF Phase 3 Cyber City BPO',
    'Call Center Outsourcing Gurugram',
    'BPO Outsourcing Company Gurugram',
    'Telecalling Services India',
    'Outsource Customer Support India',
    'Live Chat Support Agency India',
    'Email Support Outsourcing',
    'Data Entry Services India',
    'Data Entry Services Gurgaon',
    'Lead Generation Company India',
    'Back Office Support India',
    'Remote Work India',
    'Work From Home Telecalling Jobs India',
    'Freelance BPO Jobs India',
    'Hire Telecallers India',
    'Virtual Assistant Services India',
    'BPO Outsourcing Company',
    'Customer Service Outsourcing',
    'Sales Support Services',
    'Inbound Customer Support',
    'Outbound Telecalling',
    'Remote Support Team India',
  ],
  // ─── Canonical & Base ──────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  // ─── Favicon / Icons ───────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // ─── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    title:
      'FreelanceWalla – #1 BPO, Telecalling & Customer Support Outsourcing India',
    description:
      'Connect your business with reliable remote teams for sales telecalling, customer support, live chat, email handling, and data entry. India\'s #1 BPO outsourcing platform.',
    url: BASE_URL,
    siteName: 'FreelanceWalla',
    images: [
      {
        url: `${BASE_URL}/images/hero_bpo_team.png`,
        width: 1200,
        height: 630,
        alt: 'FreelanceWalla – BPO & Support Services India',
      },
      {
        url: `${BASE_URL}/images/logo.png`,
        width: 1024,
        height: 1024,
        alt: 'FreelanceWalla Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  // ─── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'FreelanceWalla – #1 BPO & Remote Support Platform India',
    description:
      'Outsource telecalling, customer support, live chat, email, and data entry to trained remote teams in India.',
    images: [`${BASE_URL}/images/hero_bpo_team.png`],
    site: '@FreelanceWalla',
    creator: '@FreelanceWalla',
  },
  // ─── Robots ────────────────────────────────────────────────────────────────
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
  // ─── Verification ──────────────────────────────────────────────────────────
  // Add your Google Search Console verification code below when available
  // verification: { google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN' },

  // ─── App Info ──────────────────────────────────────────────────────────────
  applicationName: 'FreelanceWalla',
  authors: [{ name: 'FreelanceWalla', url: BASE_URL }],
  generator: 'Next.js',
  creator: 'FreelanceWalla',
  publisher: 'FreelanceWalla',
  category: 'business',
  classification: 'BPO & Outsourcing Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ─── Schema.org: Organization ──────────────────────────────────────────────
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#organization`,
    name: 'FreelanceWalla',
    alternateName: 'FreelanceWalla BPO',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 1024,
      height: 1024,
    },
    image: `${BASE_URL}/images/hero_bpo_team.png`,
    description:
      'FreelanceWalla is India\'s trusted BPO outsourcing platform providing sales telecalling, customer support, live chat, email management, data entry, lead generation and back-office operations from Cyber City Gurugram.',
    email: 'info@freelancewalla.in',
    telephone: '+91-9876543210',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DLF Phase 3, Cyber City',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122002',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.4906',
      longitude: '77.0911',
    },
    hasMap: 'https://maps.google.com/?q=DLF+Phase+3+Cyber+City+Gurgaon+Haryana+122002',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '124',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [BASE_URL],
    priceRange: '₹₹',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: [
      'BPO Services',
      'Telecalling Services',
      'Customer Support',
      'Data Entry',
      'Lead Generation',
      'Email Support',
      'Live Chat Support',
      'Back Office Support',
      'Virtual Assistance',
    ],
    knowsAbout: [
      'Business Process Outsourcing',
      'Sales Telecalling',
      'Customer Support',
      'Data Entry',
      'Lead Generation',
    ],
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 500,
    },
  };

  // ─── Schema.org: WebSite with SearchAction ─────────────────────────────────
  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'FreelanceWalla',
    description:
      'BPO, Telecalling, Customer Support & Data Entry Services India',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/careers/roles?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // ─── Schema.org: BreadcrumbList ────────────────────────────────────────────
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${BASE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Careers',
        item: `${BASE_URL}/careers`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: `${BASE_URL}/contact`,
      },
    ],
  };

  // ─── Schema.org: FAQPage (boosts rich results) ─────────────────────────────
  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What BPO services does FreelanceWalla offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FreelanceWalla offers sales telecalling, inbound customer support, live chat support, email management, data entry, lead generation, back-office support, and virtual assistance services across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I hire a telecalling team from FreelanceWalla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! FreelanceWalla provides dedicated sales and telecalling teams for outbound calls, lead follow-ups, appointment scheduling, and lead qualification for businesses across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does FreelanceWalla offer work-from-home jobs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. FreelanceWalla offers flexible remote work opportunities in telecalling, customer support, chat support, email support, and data entry roles for candidates across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I apply for a job at FreelanceWalla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can apply directly through the FreelanceWalla website at freelancewalla.in/apply. Browse available roles and submit your application online with no registration charges.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is FreelanceWalla a registered BPO company in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FreelanceWalla is a professional BPO outsourcing platform based in India, connecting businesses with skilled remote support teams for various operational requirements.',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Primary Favicon – matches FreelanceWalla brand */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="mask-icon" href="/icon.svg" color="#1A2A5E" />
        <meta name="theme-color" content="#1A2A5E" />
        <meta name="msapplication-TileColor" content="#1A2A5E" />

        {/* JSON-LD Structured Data – all schemas injected together */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLdOrganization,
              jsonLdWebSite,
              jsonLdBreadcrumb,
              jsonLdFAQ,
            ]),
          }}
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
