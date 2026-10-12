import { NextRequest, NextResponse } from 'next/server';
import { razorpayInstance, LEAD_PLANS } from '@/lib/razorpay';
import connectToDatabase from '@/lib/db';
import AgencyUser from '@/lib/models/AgencyUser';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, uid, disclaimerAccepted } = body;

    if (!disclaimerAccepted) {
      return NextResponse.json(
        { error: 'You must accept the terms & disclaimer before proceeding to payment.' },
        { status: 400 }
      );
    }

    const plan = LEAD_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    if (!uid) {
      return NextResponse.json({ error: 'Agency UID is required. Please login first.' }, { status: 401 });
    }

    await connectToDatabase();
    const agency = await AgencyUser.findOne({ firebaseUid: uid });
    if (!agency) {
      return NextResponse.json({ error: 'Agency profile not found' }, { status: 404 });
    }

    // Amount in paise for Razorpay
    const options = {
      amount: plan.price * 100,
      currency: 'INR',
      receipt: `rcpt_${Date.now().toString().slice(-8)}_${plan.id}`,
      notes: {
        agencyId: agency._id.toString(),
        companyName: agency.companyName,
        planId: plan.id,
        leadsCount: plan.leadsCount.toString(),
      },
    };

    const order = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '',
      plan,
      agency: {
        name: agency.companyName,
        email: agency.email,
        phone: agency.phone,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating Razorpay order' }, { status: 500 });
  }
}
