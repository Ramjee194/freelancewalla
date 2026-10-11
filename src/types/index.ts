export interface IJobRole {
  _id?: string;
  title: string;
  slug: string;
  category: 'Sales & Telecalling' | 'Customer Support' | 'Chat Support' | 'Email Support' | 'Data Entry' | 'Lead Generation' | 'Back Office Support' | 'Virtual Assistance';
  description: string;
  responsibilities: string[];
  requirements: string[];
  workType: ('Full-Time' | 'Part-Time' | 'Flexible')[];
  workMode: 'Work From Home' | 'Remote' | 'On-Site' | 'Hybrid';
  location: string;
  salaryText?: string;
  isSalaryVisible: boolean;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IApplication {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  age: number;
  hasDevice: boolean;
  preferredWorkType: 'Full-Time' | 'Part-Time' | 'Work From Home';
  preferredRole: string;
  experienceLevel: 'Fresher' | 'Less than 1 year' | '1–2 years' | '2+ years';
  languages: string;
  additionalInformation?: string;
  status: 'New' | 'Under Review' | 'Contacted' | 'Shortlisted' | 'Rejected' | 'Onboarding';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IContactInquiry {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceRequired: string;
  expectedRequirement?: string;
  message: string;
  status: 'New' | 'Reviewed' | 'Contacted' | 'Closed';
  createdAt?: string | Date;
}

export interface IReview {
  _id?: string;
  reviewType: 'CLIENT' | 'EMPLOYEE';
  name: string;
  roleOrCompany: string;
  rating: number;
  reviewText: string;
  isSample?: boolean;
  isPublished: boolean;
  createdAt?: string | Date;
}

export interface IService {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  whatWeHandle: string[];
  whoItIsFor: string[];
  features: string[];
  icon: string;
  isActive: boolean;
  createdAt?: string | Date;
}

export type LeadCategory = 'Web Development' | 'App Development' | 'SEO Services' | 'AI & Automation';

export interface IClientLead {
  _id?: string;
  title: string;
  category: LeadCategory;
  budgetRange: string;
  projectDescription: string;
  cityLocation: string;
  // Private / Unlocked fields:
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientFullAddress: string;
  // Exclusivity: each client is assigned to only 1 agency
  isAllocated: boolean;
  allocatedToAgencyId?: string;
  allocatedToAgencyName?: string;
  allocatedAt?: string | Date;
  status: 'Available' | 'Allocated' | 'Archived';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IAgencyUser {
  _id?: string;
  firebaseUid: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  portfolioWebsite?: string;
  categories?: string[];
  isVerifiedByAdmin: boolean;
  creditsBalance: number;
  totalCreditsPurchased: number;
  status: 'Active' | 'Pending Verification' | 'Suspended';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ILeadOrder {
  _id?: string;
  agencyId: string;
  agencyEmail: string;
  agencyCompanyName: string;
  planName: 'Starter (5 Leads)' | 'Growth (10 Leads)' | 'Pro Agency (15 Leads)';
  amount: number;
  creditsGiven: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  disclaimerAccepted: boolean;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  allocatedLeadIds: string[];
  createdAt?: string | Date;
}
