import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getStoredLeads, saveStoredLead } from '@/lib/leadStore';

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    let allLeads = await getStoredLeads();

    if (category && category !== 'All') {
      allLeads = allLeads.filter((l) => l.category === category);
    }
    if (status && status !== 'All') {
      allLeads = allLeads.filter((l) => l.status === status);
    }
    if (search) {
      allLeads = allLeads.filter(
        (l) =>
          l.title?.toLowerCase().includes(search) ||
          l.clientName?.toLowerCase().includes(search) ||
          l.clientPhone?.toLowerCase().includes(search) ||
          l.cityLocation?.toLowerCase().includes(search)
      );
    }

    const totalLeads = allLeads.length;
    const availableLeads = allLeads.filter((l) => !l.isAllocated).length;
    const allocatedLeads = allLeads.filter((l) => l.isAllocated).length;

    return NextResponse.json({
      success: true,
      leads: allLeads,
      stats: { totalLeads, availableLeads, allocatedLeads },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      category,
      budgetRange,
      projectDescription,
      cityLocation,
      clientName,
      clientPhone,
      clientEmail,
      clientFullAddress,
    } = body;

    if (
      !title ||
      !category ||
      !budgetRange ||
      !projectDescription ||
      !cityLocation ||
      !clientName ||
      !clientPhone ||
      !clientEmail ||
      !clientFullAddress
    ) {
      return NextResponse.json(
        { error: 'All client fields are required.' },
        { status: 400 }
      );
    }

    const newLead = await saveStoredLead({
      title,
      category,
      budgetRange,
      projectDescription,
      cityLocation,
      clientName,
      clientPhone,
      clientEmail,
      clientFullAddress,
      isAllocated: false,
      status: 'Available',
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
