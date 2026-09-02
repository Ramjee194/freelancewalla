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
