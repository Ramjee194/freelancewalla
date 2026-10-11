import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import AgencyUser from '@/lib/models/AgencyUser';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'UID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const agency = await AgencyUser.findOne({ firebaseUid: uid }).lean();

    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, agency });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
