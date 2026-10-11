import Razorpay from 'razorpay';

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_Tmfk69kUmEz6ej',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '5PF7s2ER7SUXRKtmWDGs6APK',
});

export interface ILeadPlan {
  id: 'starter' | 'growth' | 'pro';
  name: 'Starter (5 Leads)' | 'Growth (10 Leads)' | 'Pro Agency (15 Leads)';
  price: number;
  leadsCount: number;
  pricePerLead: string;
  popular?: boolean;
  features: string[];
}

export const LEAD_PLANS: ILeadPlan[] = [
  {
    id: 'starter',
    name: 'Starter (5 Leads)',
    price: 699,
    leadsCount: 5,
    pricePerLead: '₹140 / lead',
    features: [
      '5 Exclusive Client Inquiries',
      'Direct Mobile, Email & Address',
      'Web, App, SEO or AI Projects',
      '100% Exclusive Allocation (No Agency Sharing)',
      'Lifetime Access in Dashboard',
    ],
  },
  {
    id: 'growth',
    name: 'Growth (10 Leads)',
    price: 899,
    leadsCount: 10,
    pricePerLead: '₹90 / lead',
    popular: true,
    features: [
      '10 Exclusive Client Inquiries',
      'Direct Mobile, Email & Address',
      'High Budget Verified Projects',
      '100% Exclusive Allocation (No Agency Sharing)',
      'Priority Support',
      'Lifetime Access in Dashboard',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Agency (15 Leads)',
    price: 1199,
    leadsCount: 15,
    pricePerLead: '₹80 / lead',
    features: [
      '15 Exclusive Client Inquiries',
      'Direct Mobile, Email & Address',
      'Enterprise & High-Ticket Scope',
      '100% Exclusive Allocation (No Agency Sharing)',
      'Dedicated Account Manager Support',
      'Lifetime Access in Dashboard',
    ],
  },
];
