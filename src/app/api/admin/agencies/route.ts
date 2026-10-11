import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getStoredAgencies, updateAgencyCredits } from '@/lib/leadStore';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const agencies = await getStoredAgencies();
    return NextResponse.json({ success: true, agencies });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { agencyId, isVerifiedByAdmin, status, addCredits } = body;

    const agencies = await getStoredAgencies();
    const agency = agencies.find((a) => a._id === agencyId || a.firebaseUid === agencyId);

    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }

    if (typeof isVerifiedByAdmin === 'boolean') {
      agency.isVerifiedByAdmin = isVerifiedByAdmin;
      agency.status = isVerifiedByAdmin ? 'Active' : 'Pending Verification';
    }
    if (status) agency.status = status;

    if (addCredits && typeof addCredits === 'number') {
      await updateAgencyCredits(agency.firebaseUid, addCredits);
    }

    return NextResponse.json({ success: true, agency });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
