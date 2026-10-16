import type { Metadata } from 'next';
import ContactUsForm from '@/components/contact/ContactUsForm';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

export const metadata: Metadata = {
  title: 'Contact Us | BPO Company in Gurgaon – FreelanceWalla',
  description:
    'Contact FreelanceWalla BPO and business services in Gurgaon. DLF Phase 3, Cyber City. Request custom quotes for BPO services, customer support outsourcing, and data entry services in Gurgaon.',
  keywords: [
    'Freelancewalla BPO and business services',
    'BPO services',
    'BPO company in Gurgaon',
    'Customer support',
    'Customer support outsourcing services',
    'Data entry',
    'Data entry services in Gurgaon',
    'B2B services',
    'B2B business services in India',
    'B2C services',
    'B2C customer service solutions',
    'Sales support',
    'Telemarketing and sales support services',
    'Contact FreelanceWalla',
    'Cyber City Gurgaon BPO phone number',
  ],
  alternates: {
    canonical: `${BASE_URL}/contact-us`,
  },
  openGraph: {
    title: 'Contact FreelanceWalla – #1 BPO Company in Gurgaon',
    description:
      'Get in touch with FreelanceWalla for customer support outsourcing, B2B sales support, telemarketing, and data entry services.',
    url: `${BASE_URL}/contact-us`,
    siteName: 'FreelanceWalla',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ContactUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}/contact-us#breadcrumb`,
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
            name: 'Contact Us',
            item: `${BASE_URL}/contact-us`,
          },
        ],
      },
      {
        '@type': 'ContactPage',
        '@id': `${BASE_URL}/contact-us#webpage`,
        name: 'Contact FreelanceWalla BPO and Business Services',
        url: `${BASE_URL}/contact-us`,
        description:
          'Contact FreelanceWalla BPO company in DLF Phase 3 Cyber City Gurgaon for telemarketing, customer support outsourcing, and data entry services.',
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/#localbusiness`,
        name: 'FreelanceWalla BPO and Business Services',
        url: BASE_URL,
        telephone: '+91-9876543210',
        email: 'info@freelancewalla.in',
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
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContactUsForm />
      </div>
    </>
  );
}
