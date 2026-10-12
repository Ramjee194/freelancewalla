import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import AgencyUser from '@/lib/models/AgencyUser';
import { getStoredAgencies } from '@/lib/leadStore';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'UID is required' }, { status: 400 });
    }

    // Try MongoDB
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const agency = await AgencyUser.findOne({ firebaseUid: uid }).lean();
        if (agency) {
          return NextResponse.json({ success: true, agency });
        }
      }
    } catch (dbErr) {
      // Fallback
    }

    // Fallback store
    const fallbackAgencies = await getStoredAgencies();
    const fallbackAgency = fallbackAgencies.find((a: any) => a.firebaseUid === uid);

    if (fallbackAgency) {
      return NextResponse.json({ success: true, agency: fallbackAgency });
    }

    return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
