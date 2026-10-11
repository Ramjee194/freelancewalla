import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { LEAD_PLANS } from '@/lib/razorpay';
import { getStoredAgencies, updateAgencyCredits, saveLeadOrder } from '@/lib/leadStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      uid,
      disclaimerAccepted,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planId || !uid) {
      return NextResponse.json({ error: 'Missing payment verification details' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || '5PF7s2ER7SUXRKtmWDGs6APK';

    // Verify signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature. Verification failed.' }, { status: 400 });
    }

    const plan = LEAD_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
    }

    const agencies = await getStoredAgencies();
    const agency = agencies.find((a) => a.firebaseUid === uid);

    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }

    // Add credits to agency
    const updatedAgency = await updateAgencyCredits(uid, plan.leadsCount);

    // Record order
    const orderRecord = await saveLeadOrder({
      agencyId: agency._id.toString(),
      agencyEmail: agency.email,
      agencyCompanyName: agency.companyName,
      planName: plan.name,
      amount: plan.price,
      creditsGiven: plan.leadsCount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      disclaimerAccepted: !!disclaimerAccepted,
      status: 'SUCCESS',
      allocatedLeadIds: [],
    });

    return NextResponse.json({
      success: true,
      message: `Payment successful! Added ${plan.leadsCount} lead credits to your account.`,
      newCreditsBalance: updatedAgency ? updatedAgency.creditsBalance : (agency.creditsBalance + plan.leadsCount),
      order: orderRecord,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
