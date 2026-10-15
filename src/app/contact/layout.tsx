import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact FreelanceWalla | BPO & Lead Generation Consultation Gurgaon',
  description:
    'Get in touch with FreelanceWalla for custom BPO outsourcing, dedicated telecalling teams, customer support, and exclusive lead generation. Headquartered in DLF Phase 3, Cyber City, Gurugram, India.',
  keywords: [
    'Contact FreelanceWalla',
    'FreelanceWalla Phone Number',
    'FreelanceWalla Gurgaon Office',
    'BPO Consultation India',
    'Hire Telecallers India',
    'FreelanceWalla Email',
  ],
  alternates: {
    canonical: 'https://freelancewalla.in/contact',
  },
  openGraph: {
    title: 'Contact FreelanceWalla | BPO & Lead Generation India',
    description:
      'Connect with FreelanceWalla for BPO outsourcing, sales telecalling, and exclusive client inquiries.',
    url: 'https://freelancewalla.in/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
