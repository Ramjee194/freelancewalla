import { NextRequest, NextResponse } from 'next/server';
import { getStoredLeadOrders, getStoredAgencies } from '@/lib/leadStore';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');
    const email = searchParams.get('email');

    if (!uid && !email) {
      return NextResponse.json({ error: 'Agency UID or Email is required' }, { status: 400 });
    }

    const agencies = await getStoredAgencies();
    const agency = agencies.find(
      (a) => (uid && a.firebaseUid === uid) || (email && a.email?.toLowerCase() === email.toLowerCase())
    );

    const agencyId = agency?._id?.toString() || uid || '';
    const agencyEmail = agency?.email || email || '';

    let orders = await getStoredLeadOrders(agencyId || agencyEmail);

    // If no orders found directly by ID, also check by email or uid
    if (!orders || orders.length === 0) {
      const allOrders = await getStoredLeadOrders();
      orders = allOrders.filter(
        (o: any) =>
          (agencyId && o.agencyId === agencyId) ||
          (agencyEmail && o.agencyEmail?.toLowerCase() === agencyEmail.toLowerCase()) ||
          (uid && o.agencyId === uid)
      );
    }

    // If demo partner and no orders exist yet, provide realistic sample transaction
    if ((!orders || orders.length === 0) && (uid === 'demo_agency_99' || agencyEmail?.includes('freelancewalla.in'))) {
      orders = [
        {
          _id: 'ord_demo_starter_1',
          agencyId: agencyId || 'demo_agency_99',
          agencyEmail: agencyEmail || 'partner.agency@freelancewalla.in',
          agencyCompanyName: agency?.companyName || 'DevSpark Tech Solutions',
          planName: 'Starter (5 Leads)',
          amount: 2499,
          creditsGiven: 5,
          razorpayOrderId: 'order_FW_2026_demo_982',
          razorpayPaymentId: 'pay_FW_demo_verified_11',
          disclaimerAccepted: true,
          status: 'SUCCESS',
          allocatedLeadIds: ['lead_001'],
          createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        },
      ];
    }

    return NextResponse.json({
      success: true,
      orders: orders || [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch payment history' }, { status: 500 });
  }
}
