import fs from 'fs';
import path from 'path';
import connectToDatabase from '@/lib/db';
import ClientLead from '@/lib/models/ClientLead';
import AgencyUser from '@/lib/models/AgencyUser';
import LeadOrder from '@/lib/models/LeadOrder';

const dataDir = path.join(process.cwd(), 'data');
const leadsFilePath = path.join(dataDir, 'leads_store.json');
const agenciesFilePath = path.join(dataDir, 'agencies_store.json');
const ordersFilePath = path.join(dataDir, 'orders_store.json');

const INITIAL_SEED_LEADS = [
  {
    _id: 'lead_001',
    title: 'Cross-Platform Grocery & Essentials Delivery Mobile App',
    category: 'App Development',
    budgetRange: '₹90,000 - ₹1,40,000',
    projectDescription: 'Need a Flutter or React Native app with real-time delivery boy tracking, Razorpay payment gateway integration, customer order history, and push notifications.',
    cityLocation: 'Pune, Maharashtra',
    clientName: 'Sanjay Deshmukh',
    clientPhone: '+91 98231 45780',
    clientEmail: 'sanjay@freshdailygrocers.in',
    clientFullAddress: 'Shop No 14, Baner Main Road, Aundh, Pune, MH - 411007',
    isAllocated: false,
    allocatedToAgencyId: null,
    allocatedToAgencyName: null,
    allocatedAt: null,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'lead_002',
    title: 'Custom Next.js & Tailwind Multi-Vendor Marketplace Web Portal',
    category: 'Web Development',
    budgetRange: '₹75,000 - ₹1,20,000',
    projectDescription: 'Seeking an experienced web development company to build an ultra-fast Next.js e-commerce platform with seller dashboard, automated invoicing, and inventory tracking.',
    cityLocation: 'Bengaluru, Karnataka (Remote)',
    clientName: 'Nisha Sundaram',
    clientPhone: '+91 97412 88419',
    clientEmail: 'nisha@indiecrafts.co',
    clientFullAddress: '4th Floor, HSR Layout Sector 3, Bengaluru, KA - 560102',
    isAllocated: false,
    allocatedToAgencyId: null,
    allocatedToAgencyName: null,
    allocatedAt: null,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'lead_003',
    title: 'Complete Technical SEO & Local GMB Ranking for Dental Clinic Chain',
    category: 'SEO Services',
    budgetRange: '₹35,000 - ₹50,000 / month',
    projectDescription: 'Looking for a verified digital marketing agency for complete on-page audit, schema markup, Google My Business 3-pack ranking, and high authority local backlink building across 4 clinic locations.',
    cityLocation: 'Delhi NCR',
    clientName: 'Dr. Alok Verma',
    clientPhone: '+91 99104 33215',
    clientEmail: 'dralok@smiledentalcare.org',
    clientFullAddress: 'B-12, Main Ring Road, Lajpat Nagar II, New Delhi - 110024',
    isAllocated: false,
    allocatedToAgencyId: null,
    allocatedToAgencyName: null,
    allocatedAt: null,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'lead_004',
    title: 'WhatsApp AI Customer Support Chatbot & Lead Automation (n8n/LLM)',
    category: 'AI & Automation',
    budgetRange: '₹60,000 - ₹95,000',
    projectDescription: 'We require an AI agency to set up an intelligent WhatsApp bot connected to OpenAI/Claude API and our Zoho CRM via n8n/Make to qualify real estate buyer inquiries 24/7.',
    cityLocation: 'Gurugram, Haryana',
    clientName: 'Vikram Sethi',
    clientPhone: '+91 98110 99420',
    clientEmail: 'vikram@primerealtyhub.com',
    clientFullAddress: 'DLF Cyber City, Building 10-C, DLF Phase 2, Gurugram, HR - 122002',
    isAllocated: false,
    allocatedToAgencyId: null,
    allocatedToAgencyName: null,
    allocatedAt: null,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'lead_005',
    title: 'On-Demand Doctor Consultation & Video Appointment Android App',
    category: 'App Development',
    budgetRange: '₹1,20,000 - ₹1,80,000',
    projectDescription: 'Telehealth startup looking for a development partner to build video call integration (Agora/Twilio), digital prescription generator, doctor appointment booking calendar, and secure medical records vault.',
    cityLocation: 'Hyderabad, Telangana',
    clientName: 'Kavitha Reddy',
    clientPhone: '+91 98490 62113',
    clientEmail: 'kavitha@medilinktelehealth.com',
    clientFullAddress: 'Plot 88, Road No. 36, Jubilee Hills, Hyderabad, TS - 500033',
    isAllocated: false,
    allocatedToAgencyId: null,
    allocatedToAgencyName: null,
    allocatedAt: null,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'lead_006',
    title: 'E-commerce Automation, Abandoned Cart & CRM Workflows',
    category: 'AI & Automation',
    budgetRange: '₹45,000 - ₹75,000',
    projectDescription: 'Direct-to-consumer lifestyle brand needs end-to-end automation connecting Shopify, WhatsApp API, and Meta Ads for retargeting high-intent buyers.',
    cityLocation: 'Mumbai, Maharashtra',
    clientName: 'Rohan Mehta',
    clientPhone: '+91 98200 44192',
    clientEmail: 'rohan@velvetcouture.in',
    clientFullAddress: 'B-Block, Bandra Kurla Complex, Bandra East, Mumbai - 400051',
    isAllocated: false,
    allocatedToAgencyId: null,
    allocatedToAgencyName: null,
    allocatedAt: null,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
];

function ensureDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// ----------------- LEADS STORE -----------------
export async function getStoredLeads(): Promise<any[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbLeads = await ClientLead.find({}).sort({ createdAt: -1 }).lean();
      if (dbLeads && dbLeads.length > 0) return dbLeads;
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  if (!fs.existsSync(leadsFilePath)) {
    fs.writeFileSync(leadsFilePath, JSON.stringify(INITIAL_SEED_LEADS, null, 2), 'utf-8');
    return INITIAL_SEED_LEADS;
  }
  try {
    const content = fs.readFileSync(leadsFilePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return INITIAL_SEED_LEADS;
  }
}

export async function saveStoredLead(leadData: any): Promise<any> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      return await ClientLead.create(leadData);
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  const leads = await getStoredLeads();
  const newLead = {
    ...leadData,
    _id: `lead_${Date.now()}`,
    isAllocated: false,
    allocatedToAgencyId: null,
    allocatedToAgencyName: null,
    allocatedAt: null,
    status: 'Available',
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
}

export async function deleteStoredLead(leadId: string): Promise<boolean> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const res = await ClientLead.findByIdAndDelete(leadId);
      if (res) return true;
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  const leads = await getStoredLeads();
  const filtered = leads.filter((l) => l._id !== leadId);
  fs.writeFileSync(leadsFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}

// ----------------- AGENCIES STORE -----------------
export async function getStoredAgencies(): Promise<any[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbAgencies = await AgencyUser.find({}).sort({ createdAt: -1 }).lean();
      if (dbAgencies && dbAgencies.length > 0) return dbAgencies;
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  if (!fs.existsSync(agenciesFilePath)) {
    fs.writeFileSync(agenciesFilePath, JSON.stringify([], null, 2), 'utf-8');
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(agenciesFilePath, 'utf-8'));
  } catch {
    return [];
  }
}

export async function syncStoredAgency(agencyData: any): Promise<any> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      let agency = await AgencyUser.findOne({ firebaseUid: agencyData.uid });
      if (!agency) {
        agency = await AgencyUser.create({
          firebaseUid: agencyData.uid,
          email: agencyData.email,
          companyName: agencyData.companyName || agencyData.email.split('@')[0],
          contactPerson: agencyData.contactPerson || 'Authorized Representative',
          phone: agencyData.phone || '',
          portfolioWebsite: agencyData.portfolioWebsite || '',
          isVerifiedByAdmin: true,
          creditsBalance: 0,
          totalCreditsPurchased: 0,
          status: 'Active',
        });
      } else {
        if (agencyData.companyName) agency.companyName = agencyData.companyName;
        if (agencyData.contactPerson) agency.contactPerson = agencyData.contactPerson;
        if (agencyData.phone) agency.phone = agencyData.phone;
        await agency.save();
      }
      return agency;
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  const agencies = await getStoredAgencies();
  let existing = agencies.find((a) => a.firebaseUid === agencyData.uid);
  if (!existing) {
    existing = {
      _id: `agency_${Date.now()}`,
      firebaseUid: agencyData.uid,
      email: agencyData.email,
      companyName: agencyData.companyName || agencyData.email.split('@')[0],
      contactPerson: agencyData.contactPerson || 'Authorized Representative',
      phone: agencyData.phone || '',
      portfolioWebsite: agencyData.portfolioWebsite || '',
      isVerifiedByAdmin: true,
      creditsBalance: 0,
      totalCreditsPurchased: 0,
      status: 'Active',
      createdAt: new Date().toISOString(),
    };
    agencies.unshift(existing);
  } else {
    if (agencyData.companyName) existing.companyName = agencyData.companyName;
    if (agencyData.contactPerson) existing.contactPerson = agencyData.contactPerson;
    if (agencyData.phone) existing.phone = agencyData.phone;
  }
  fs.writeFileSync(agenciesFilePath, JSON.stringify(agencies, null, 2), 'utf-8');
  return existing;
}

export async function updateAgencyCredits(uid: string, addCredits: number): Promise<any> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const updated = await AgencyUser.findOneAndUpdate(
        { firebaseUid: uid },
        {
          $inc: { creditsBalance: addCredits, totalCreditsPurchased: addCredits > 0 ? addCredits : 0 },
        },
        { new: true }
      );
      if (updated) return updated;
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  const agencies = await getStoredAgencies();
  const target = agencies.find((a) => a.firebaseUid === uid);
  if (target) {
    target.creditsBalance = (target.creditsBalance || 0) + addCredits;
    target.totalCreditsPurchased = (target.totalCreditsPurchased || 0) + (addCredits > 0 ? addCredits : 0);
    fs.writeFileSync(agenciesFilePath, JSON.stringify(agencies, null, 2), 'utf-8');
  }
  return target;
}

export async function unlockLeadExclusive(leadId: string, uid: string): Promise<{ success: boolean; lead?: any; error?: string; remainingCredits?: number }> {
  const agencies = await getStoredAgencies();
  const agency = agencies.find((a) => a.firebaseUid === uid);

  if (!agency) {
    return { success: false, error: 'Agency profile not found' };
  }
  if ((agency.creditsBalance || 0) < 1) {
    return { success: false, error: 'Insufficient credits. Please purchase a package to unlock.' };
  }

  // Try DB first
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const allocatedLead = await ClientLead.findOneAndUpdate(
        { _id: leadId, isAllocated: false },
        {
          $set: {
            isAllocated: true,
            allocatedToAgencyId: agency._id.toString(),
            allocatedToAgencyName: agency.companyName,
            allocatedAt: new Date(),
            status: 'Allocated',
          },
        },
        { new: true }
      );

      if (allocatedLead) {
        await updateAgencyCredits(uid, -1);
        const updatedAgency = await AgencyUser.findOne({ firebaseUid: uid });
        return {
          success: true,
          lead: allocatedLead,
          remainingCredits: updatedAgency ? updatedAgency.creditsBalance : (agency.creditsBalance - 1),
        };
      }
    }
  } catch (err) {
    // Mongo fallback
  }

  // Disk Fallback
  ensureDir();
  const leads = await getStoredLeads();
  const lead = leads.find((l) => l._id === leadId);

  if (!lead || lead.isAllocated) {
    return { success: false, error: 'This lead has already been claimed or is unavailable.' };
  }

  lead.isAllocated = true;
  lead.allocatedToAgencyId = agency._id.toString();
  lead.allocatedToAgencyName = agency.companyName;
  lead.allocatedAt = new Date().toISOString();
  lead.status = 'Allocated';

  agency.creditsBalance = Math.max(0, (agency.creditsBalance || 0) - 1);

  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');
  fs.writeFileSync(agenciesFilePath, JSON.stringify(agencies, null, 2), 'utf-8');

  return { success: true, lead, remainingCredits: agency.creditsBalance };
}

// ----------------- ORDERS STORE -----------------
export async function saveLeadOrder(orderData: any) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      return await LeadOrder.create(orderData);
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  let orders: any[] = [];
  if (fs.existsSync(ordersFilePath)) {
    try {
      orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
    } catch {
      orders = [];
    }
  }
  const newOrder = {
    ...orderData,
    _id: `ord_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
  return newOrder;
}

export async function getStoredLeadOrders(agencyIdOrEmail?: string): Promise<any[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const query = agencyIdOrEmail
        ? {
            $or: [
              { agencyId: agencyIdOrEmail },
              { agencyEmail: agencyIdOrEmail.toLowerCase() },
            ],
          }
        : {};
      const dbOrders = await LeadOrder.find(query).sort({ createdAt: -1 }).lean();
      if (dbOrders && dbOrders.length > 0) return dbOrders;
    }
  } catch (err) {
    // Mongo fallback
  }

  ensureDir();
  if (!fs.existsSync(ordersFilePath)) {
    return [];
  }
  try {
    const all = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
    if (!agencyIdOrEmail) return all;
    return all.filter(
      (o: any) =>
        o.agencyId === agencyIdOrEmail ||
        o.agencyEmail?.toLowerCase() === agencyIdOrEmail.toLowerCase()
    );
  } catch {
    return [];
  }
}
