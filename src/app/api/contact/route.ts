import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ContactInquiry from '@/lib/models/ContactInquiry';
import { sendContactInquiryEmails } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, serviceRequired, expectedRequirement, message } = body;

    // Validation
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }
    if (!phone || phone.trim().length < 10) {
      return NextResponse.json({ error: 'Valid phone number is required (minimum 10 digits).' }, { status: 400 });
    }
    if (!serviceRequired || !serviceRequired.trim()) {
      return NextResponse.json({ error: 'Service selection is required.' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required.' }, { status: 400 });
    }

    const conn = await connectToDatabase();
    let inquiryId = 'inq_' + Date.now();

    if (conn) {
      const newInquiry = await ContactInquiry.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        companyName: companyName ? companyName.trim() : '',
        serviceRequired: serviceRequired.trim(),
        expectedRequirement: expectedRequirement ? expectedRequirement.trim() : '',
        message: message.trim(),
        status: 'New',
      });
      inquiryId = newInquiry._id.toString();
    } else {
      console.warn('MongoDB unavailable. Contact inquiry received in fallback mode for:', fullName.trim());
    }

    // Await dual notification emails so serverless production runtimes do not terminate early
    try {
      await sendContactInquiryEmails({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        companyName: companyName ? companyName.trim() : '',
        serviceRequired: serviceRequired.trim(),
        expectedRequirement: expectedRequirement ? expectedRequirement.trim() : '',
        message: message.trim(),
        status: 'New',
      });
    } catch (mailErr) {
      console.error('Production Email Sending Error (Contact Route):', mailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you. Your enquiry has been received. Our team will review your request and contact you within 24 hours.',
        inquiryId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Contact Error:', error);
    return NextResponse.json({ error: error.message || 'Server error submitting inquiry.' }, { status: 500 });
  }
}
