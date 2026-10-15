import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply Online for Remote BPO & Telecalling Jobs | FreelanceWalla Careers',
  description:
    'Apply for genuine work-from-home telecalling, customer support, live chat, email handling, and data entry jobs at FreelanceWalla. 100% free digital registration with no fees.',
  keywords: [
    'FreelanceWalla Job Application',
    'Apply FreelanceWalla',
    'Work From Home BPO Jobs India',
    'Remote Telecalling Jobs',
    'Online Customer Support Jobs',
  ],
  alternates: {
    canonical: 'https://freelancewalla.in/apply',
  },
  openGraph: {
    title: 'Apply Online for Remote BPO Jobs | FreelanceWalla',
    description: 'Free digital application for telecalling and customer support jobs at FreelanceWalla.',
    url: 'https://freelancewalla.in/apply',
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
