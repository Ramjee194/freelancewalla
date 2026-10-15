import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exclusive Client Leads & Agency Partner Network | FreelanceWalla',
  description:
    'Access 100% exclusive, verified client leads across BPO, Telecalling, Web Development, Mobile Apps, and SEO Growth. Each lead is allocated strictly to 1 company—zero lead sharing guaranteed.',
  keywords: [
    'FreelanceWalla Agency Network',
    'Exclusive Client Leads India',
    'B2B Client Leads',
    'Verified Project Requirements',
    'BPO Client Inquiries',
    'FreelanceWalla Partner',
  ],
  alternates: {
    canonical: 'https://freelancewalla.in/agency-network',
  },
  openGraph: {
    title: 'Exclusive Client Leads & Agency Network | FreelanceWalla',
    description:
      'Verified, high-intent client requirements with 100% exclusivity guarantee on FreelanceWalla.',
    url: 'https://freelancewalla.in/agency-network',
  },
};

export default function AgencyNetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
