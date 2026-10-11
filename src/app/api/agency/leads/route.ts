import { NextRequest, NextResponse } from 'next/server';
import { getStoredLeads, getStoredAgencies } from '@/lib/leadStore';

function maskName(name: string): string {
  if (!name) return 'Client';
  const parts = name.trim().split(' ');
  return parts
    .map((p) => (p.length > 1 ? p[0] + '*'.repeat(Math.min(p.length - 1, 4)) : p))
    .join(' ');
}

function maskPhone(phone: string): string {
  if (!phone) return '+91 **********';
  const digits = phone.replace(/\s+/g, '');
  if (digits.length <= 4) return '******';
  return digits.slice(0, 3) + '*****' + digits.slice(-3);
}

function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return 'client***@email.com';
  const [user, domain] = email.split('@');
  const visible = user.slice(0, 2);
  return `${visible}***@${domain}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode') || 'available'; // 'available' | 'my-unlocked'
    const uid = searchParams.get('uid');
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();

    const allLeads = await getStoredLeads();
    const agencies = await getStoredAgencies();

    if (mode === 'my-unlocked') {
      if (!uid) {
        return NextResponse.json({ error: 'UID is required to view your unlocked leads' }, { status: 400 });
      }

      const agency = agencies.find((a) => a.firebaseUid === uid);
      if (!agency) {
        return NextResponse.json({ error: 'Agency profile not found' }, { status: 404 });
      }

      // Leads allocated specifically to this agency
      const agencyIdStr = agency._id?.toString();
      const myLeads = allLeads.filter(
        (l) => l.allocatedToAgencyId === agencyIdStr || l.allocatedToAgencyId === uid
      );

      return NextResponse.json({
        success: true,
        mode: 'my-unlocked',
        leads: myLeads, // FULL client contact details revealed!
      });
    }

    // Default: 'available' mode - only unallocated leads
    let availableLeads = allLeads.filter((l) => !l.isAllocated && l.status === 'Available');

    if (category && category !== 'All') {
      availableLeads = availableLeads.filter((l) => l.category === category);
    }

    if (search) {
      availableLeads = availableLeads.filter(
        (l) =>
          l.title?.toLowerCase().includes(search) ||
          l.projectDescription?.toLowerCase().includes(search) ||
          l.cityLocation?.toLowerCase().includes(search)
      );
    }

    // Mask sensitive contact details for public preview
    const maskedLeads = availableLeads.map((lead: any) => ({
      _id: lead._id,
      title: lead.title,
      category: lead.category,
      budgetRange: lead.budgetRange,
      projectDescription: lead.projectDescription,
      cityLocation: lead.cityLocation,
      createdAt: lead.createdAt,
      isAllocated: lead.isAllocated,
      status: lead.status,

      // Masked placeholders:
      clientName: maskName(lead.clientName),
      clientPhone: maskPhone(lead.clientPhone),
      clientEmail: maskEmail(lead.clientEmail),
      clientFullAddress: 'City verified • Full address revealed upon unlock',
    }));

    return NextResponse.json({
      success: true,
      mode: 'available',
      leads: maskedLeads,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
