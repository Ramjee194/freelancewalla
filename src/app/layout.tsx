import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppProviders from '@/components/providers/AppProviders';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

export const metadata: Metadata = {
  // ─── Title Strategy: Brand First for Exact Match Authority ──────────────────
  title: {
    default:
      'FreelanceWalla – #1 BPO & Lead Generation Company in India | Official Site',
    template: '%s | FreelanceWalla - BPO & Lead Generation',
  },
  // ─── Primary Meta ──────────────────────────────────────────────────────────
  description:
    'FreelanceWalla (freelancewalla.in) is India\'s #1 BPO outsourcing and verified lead generation company. Specializing in sales telecalling, 24/7 customer support desk, exclusive B2B & B2C client leads, data entry, and back-office operations from Cyber City Gurugram, India.',
  keywords: [
    'FreelanceWalla',
    'freelancewalla.in',
    'Freelance Walla',
    'freelancewala',
    'freelance wala',
    'freelancewalla bpo',
    'freelancewalla lead generation',
    'freelancewalla official website',
    'freelancewalla company',
    'freelancewalla careers',
    'freelancewalla reviews',
    'freelancewalla login',
    'freelancewalla contact',
    'BPO Services India',
    'BPO and Lead Generation Company India',
    'Lead Generation Company India',
    'Exclusive Lead Generation India',
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
    'B2B Client Leads India',
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
    alternateName: [
      'FreelanceWalla.in',
      'Freelance Walla',
      'FreelanceWalla BPO',
      'FreelanceWalla BPO & Lead Generation',
      'FreelanceWalla Agency Network',
    ],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 1024,
      height: 1024,
    },
    image: `${BASE_URL}/images/hero_bpo_team.png`,
    description:
      'FreelanceWalla is India\'s #1 BPO outsourcing and verified lead generation platform providing sales telecalling, customer support, live chat, email management, data entry, lead generation and back-office operations from Cyber City Gurugram, India.',
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
      reviewCount: '158',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      BASE_URL,
      'https://www.linkedin.com/company/freelancewalla',
      'https://twitter.com/FreelanceWalla',
    ],
    priceRange: '₹₹',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: [
      'BPO Services',
      'Lead Generation',
      'Telecalling Services',
      'Inbound & Outbound Calling',
      'Customer Support Outsourcing',
      'Live Chat Support',
      'Email Support Management',
      'Data Entry & Database Cleanup',
      'Back Office Support',
      'Virtual Assistance',
    ],
    knowsAbout: [
      'Business Process Outsourcing (BPO)',
      'Exclusive Lead Generation',
      'Sales Telecalling & Telemarketing',
      '24/7 Customer Support',
      'Data Entry & Operations',
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
    alternateName: 'FreelanceWalla.in',
    description:
      '#1 BPO Services, Exclusive Lead Generation, Telecalling & Customer Support in India',
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
        name: 'BPO Services',
        item: `${BASE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Exclusive Lead Network',
        item: `${BASE_URL}/agency-network`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Careers & Jobs',
        item: `${BASE_URL}/careers`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact Us',
        item: `${BASE_URL}/contact`,
      },
    ],
  };

  // ─── Schema.org: FAQPage (boosts rich Google SERP results) ────────────────
  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is FreelanceWalla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FreelanceWalla (freelancewalla.in) is India\'s premier BPO outsourcing and verified lead generation platform headquartered at DLF Phase 3, Cyber City, Gurugram. It connects businesses with dedicated telecalling teams, customer support executives, and 100% exclusive sales leads.',
        },
      },
      {
        '@type': 'Question',
        name: 'What BPO and Lead Generation services does FreelanceWalla offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FreelanceWalla offers outbound sales telecalling, inbound customer service, 24/7 live chat, email ticket management, verified B2B/B2C lead generation, data entry, back-office operations, and virtual assistance across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does FreelanceWalla provide 100% exclusive client leads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every client lead on FreelanceWalla is verified by our procurement team and allocated strictly to ONE agency or partner. We guarantee zero lead sharing, giving your company 100% exclusive access to the prospect.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I hire a dedicated telecalling team from FreelanceWalla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! FreelanceWalla provides trained, dedicated sales telecalling teams for outbound outreach, appointment scheduling, cold calling, and lead qualification trained on your business scripts and SLAs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does FreelanceWalla offer remote work-from-home jobs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. FreelanceWalla offers flexible remote work opportunities in telecalling, customer support, chat support, email support, and data entry roles for candidates across India with no registration fees.',
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
        <link rel="mask-icon" href="/icon.svg" color="#064E3B" />
        <meta name="theme-color" content="#064E3B" />
        <meta name="msapplication-TileColor" content="#064E3B" />

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
        <AppProviders>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
