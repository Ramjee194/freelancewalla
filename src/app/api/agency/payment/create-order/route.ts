import { NextRequest, NextResponse } from 'next/server';
import { cashfreeInstance, LEAD_PLANS } from '@/lib/cashfree';
import connectToDatabase from '@/lib/db';
import AgencyUser from '@/lib/models/AgencyUser';

export async function POST(req: NextRequest) {
  try {
    // Validate Cashfree credentials are configured
    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
      console.error('[create-order] Missing CASHFREE_APP_ID or CASHFREE_SECRET_KEY env variables');
      return NextResponse.json(
        { success: false, error: 'Payment gateway is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { planId, uid, disclaimerAccepted } = body;

    if (!disclaimerAccepted) {
      return NextResponse.json(
        { success: false, error: 'You must accept the terms & disclaimer before proceeding to payment.' },
        { status: 400 }
      );
    }

    const plan = LEAD_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ success: false, error: 'Invalid plan selected' }, { status: 400 });
    }

    if (!uid) {
      return NextResponse.json({ success: false, error: 'Agency UID is required. Please login first.' }, { status: 401 });
    }

    await connectToDatabase();
    const agency = await AgencyUser.findOne({ firebaseUid: uid });
    if (!agency) {
      return NextResponse.json({ success: false, error: 'Agency profile not found' }, { status: 404 });
    }

    // Generate a unique order ID for Cashfree
    const orderId = `order_${Date.now().toString().slice(-10)}_${plan.id}`;

    // Sanitize phone to 10 digits for Cashfree validation
    const cleanPhone = (agency.phone || '').replace(/\D/g, '').slice(-10) || '9999999999';
    const cleanName = (agency.companyName || 'Agency Partner').replace(/[^a-zA-Z0-9\s]/g, '').trim() || 'Agency Partner';

    // Cashfree Production API strictly requires an HTTPS return_url
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';
    if (!baseUrl.startsWith('https://')) {
      baseUrl = 'https://freelancewalla.in';
    }
    const returnUrl = `${baseUrl}/agency-network?order_id=${orderId}`;

    const orderRequest = {
      order_amount: plan.price,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: agency._id.toString(),
        customer_phone: cleanPhone.length === 10 ? cleanPhone : '9999999999',
        customer_email: agency.email || 'customer@freelancewalla.in',
        customer_name: cleanName,
      },
      order_meta: {
        return_url: returnUrl,
      },
      order_note: `${plan.name} - ${plan.leadsCount} Exclusive Client Leads`,
    };

    console.log('[create-order] Creating Cashfree order with request:', JSON.stringify(orderRequest));
    const response = await cashfreeInstance.PGCreateOrder(orderRequest);
    console.log('[create-order] Cashfree order created successfully:', response.data?.order_id);

    return NextResponse.json({
      success: true,
      orderId: response.data?.order_id,
      paymentSessionId: response.data?.payment_session_id,
      orderAmount: plan.price,
      orderCurrency: 'INR',
      plan,
      agency: {
        name: agency.companyName,
        email: agency.email,
        phone: agency.phone,
      },
    });
  } catch (error: any) {
    console.error('[create-order] Error creating Cashfree order:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
    return NextResponse.json(
      { success: false, error: error.response?.data?.message || error.message || 'Error creating Cashfree order' },
      { status: 500 }
    );
  }
}
