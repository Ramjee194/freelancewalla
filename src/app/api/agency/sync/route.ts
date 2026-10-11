import { NextRequest, NextResponse } from 'next/server';
import { syncStoredAgency } from '@/lib/leadStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email, companyName, contactPerson, phone, portfolioWebsite, categories } = body;

    if (!uid || !email) {
      return NextResponse.json({ error: 'UID and email are required' }, { status: 400 });
    }

    const agency = await syncStoredAgency({
      uid,
      email,
      companyName,
      contactPerson,
      phone,
      portfolioWebsite,
      categories,
    });

    return NextResponse.json({ success: true, agency });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
