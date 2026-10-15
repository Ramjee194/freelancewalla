import { NextRequest, NextResponse } from 'next/server';
import { cashfreeInstance, LEAD_PLANS } from '@/lib/cashfree';
import connectToDatabase from '@/lib/db';
import AgencyUser from '@/lib/models/AgencyUser';
import { saveLeadOrder } from '@/lib/leadStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      planId,
      uid,
      disclaimerAccepted,
    } = body;

    // Validate required fields
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing Cashfree order ID.' },
        { status: 400 }
      );
    }
    if (!planId || !uid) {
      return NextResponse.json(
        { success: false, error: 'Missing plan or user information.' },
        { status: 400 }
      );
    }

    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
      console.error('[verify-payment] CASHFREE credentials are not configured');
      return NextResponse.json(
        { success: false, error: 'Payment gateway is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Verify payment by fetching order status from Cashfree
    const response = await cashfreeInstance.PGFetchOrder(orderId);
    const orderData = response.data;

    if (!orderData || orderData.order_status !== 'PAID') {
      console.error('[verify-payment] Payment not completed', {
        orderId,
        status: orderData?.order_status,
      });
      return NextResponse.json(
        { success: false, error: `Payment not completed. Current status: ${orderData?.order_status || 'UNKNOWN'}` },
        { status: 400 }
      );
    }

    const plan = LEAD_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Unknown plan selected.' },
        { status: 400 }
      );
    }

    // Use MongoDB directly (consistent with create-order route)
    await connectToDatabase();
    const agency = await AgencyUser.findOne({ firebaseUid: uid });

    if (!agency) {
      return NextResponse.json(
        { success: false, error: 'Agency not found.' },
        { status: 404 }
      );
    }

    // Add credits to agency atomically
    const updatedAgency = await AgencyUser.findOneAndUpdate(
      { firebaseUid: uid },
      {
        $inc: {
          creditsBalance: plan.leadsCount,
          totalCreditsPurchased: plan.leadsCount,
        },
      },
      { new: true }
    );

    // Extract Cashfree payment ID from the order data
    const cfPaymentId = orderData.cf_order_id?.toString() || orderId;

    // Record order
    const orderRecord = await saveLeadOrder({
      agencyId: agency._id.toString(),
      agencyEmail: agency.email,
      agencyCompanyName: agency.companyName,
      planName: plan.name,
      amount: plan.price,
      creditsGiven: plan.leadsCount,
      cashfreeOrderId: orderId,
      cashfreePaymentId: cfPaymentId,
      disclaimerAccepted: !!disclaimerAccepted,
      status: 'SUCCESS',
      allocatedLeadIds: [],
    });

    console.log('[verify-payment] Payment verified successfully:', {
      paymentId: cfPaymentId,
      orderId: orderId,
      plan: plan.id,
      creditsAdded: plan.leadsCount,
      newBalance: updatedAgency?.creditsBalance,
    });

    return NextResponse.json({
      success: true,
      message: `Payment successful! Added ${plan.leadsCount} lead credits to your account.`,
      newCreditsBalance: updatedAgency
        ? updatedAgency.creditsBalance
        : agency.creditsBalance + plan.leadsCount,
      order: orderRecord,
    });
  } catch (error: any) {
    console.error('[verify-payment] Error:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
