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

    await connectToDatabase();

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

    // Fire dual notification emails asynchronously
    sendContactInquiryEmails({
      fullName: newInquiry.fullName,
      email: newInquiry.email,
      phone: newInquiry.phone,
      companyName: newInquiry.companyName,
      serviceRequired: newInquiry.serviceRequired,
      expectedRequirement: newInquiry.expectedRequirement,
      message: newInquiry.message,
      status: newInquiry.status,
    }).catch((err) => console.error('Failed sending background contact emails:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you. Your enquiry has been received. Our team will review your request and contact you within 24 hours.',
        inquiryId: newInquiry._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Contact Error:', error);
    return NextResponse.json({ error: error.message || 'Server error submitting inquiry.' }, { status: 500 });
  }
}
