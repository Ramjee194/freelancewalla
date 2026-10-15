import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FreelanceWalla Reviews & Ratings | 4.9 Star Verified Client & Employee Feedback',
  description:
    'Read real client reviews, ratings, and employee feedback for FreelanceWalla BPO and Lead Generation services. Over 150+ verified ratings across India.',
  keywords: [
    'FreelanceWalla Reviews',
    'FreelanceWalla Rating',
    'FreelanceWalla Testimonials',
    'Is FreelanceWalla Genuine',
    'FreelanceWalla Employee Feedback',
  ],
  alternates: {
    canonical: 'https://freelancewalla.in/reviews',
  },
  openGraph: {
    title: 'FreelanceWalla Reviews & Ratings | 4.9 Stars Verified',
    description: 'Read authentic client testimonials and employee ratings for FreelanceWalla.',
    url: 'https://freelancewalla.in/reviews',
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
