import { NextRequest, NextResponse } from 'next/server';
import { unlockLeadExclusive } from '@/lib/leadStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { leadId, uid } = body;

    if (!leadId || !uid) {
      return NextResponse.json({ error: 'leadId and uid are required' }, { status: 400 });
    }

    const result = await unlockLeadExclusive(leadId, uid);

    if (!result.success) {
      const isCredits = result.error?.toLowerCase().includes('insufficient');
      return NextResponse.json(
        { error: result.error, needsCredits: isCredits },
        { status: isCredits ? 402 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Client unlocked successfully! Contact details are now revealed exclusively to your agency.',
      lead: result.lead,
      remainingCredits: result.remainingCredits,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
