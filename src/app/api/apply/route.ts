import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Application from '@/lib/models/Application';
import { saveFallbackApplication } from '@/lib/fallbackStore';
import { sendApplicationEmails } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      cityState,
      age,
      hasDevice,
      preferredWorkType,
      preferredRole,
      experienceLevel,
      languages,
      additionalInformation,
      agreeTerms,
    } = body;

    // Strict Validation
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!phone || phone.trim().length < 10) {
      return NextResponse.json({ error: 'A valid 10-digit phone number is required.' }, { status: 400 });
    }
    if (!cityState || !cityState.trim()) {
      return NextResponse.json({ error: 'City / State location is required.' }, { status: 400 });
    }
    const numAge = parseInt(age, 10);
    if (isNaN(numAge) || numAge < 18) {
      return NextResponse.json({ error: 'Applicants must meet the minimum age requirement of 18 years or above.' }, { status: 400 });
    }
    if (typeof hasDevice !== 'boolean') {
      return NextResponse.json({ error: 'Please specify if you have a smartphone or laptop with internet.' }, { status: 400 });
    }
    if (!preferredWorkType) {
      return NextResponse.json({ error: 'Preferred work type is required.' }, { status: 400 });
    }
    if (!preferredRole) {
      return NextResponse.json({ error: 'Preferred role selection is required.' }, { status: 400 });
    }
    if (!experienceLevel) {
      return NextResponse.json({ error: 'Experience level selection is required.' }, { status: 400 });
    }
    if (!languages || !languages.trim()) {
      return NextResponse.json({ error: 'Languages known field is required.' }, { status: 400 });
    }
    if (!agreeTerms) {
      return NextResponse.json({ error: 'You must agree to the Terms & Conditions before submitting.' }, { status: 400 });
    }

    const conn = await connectToDatabase();
    let applicationId = 'app_' + Date.now();

    if (conn) {
      const newApplication = await Application.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        cityState: cityState.trim(),
        age: numAge,
        hasDevice,
        preferredWorkType,
        preferredRole,
        experienceLevel,
        languages: languages.trim(),
        additionalInformation: additionalInformation ? additionalInformation.trim() : '',
        status: 'New',
      });
      applicationId = newApplication._id.toString();
    } else {
      console.warn('MongoDB unavailable (bad auth/offline). Saving application to local disk fallback storage for:', fullName.trim());
      saveFallbackApplication({
        id: applicationId,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        cityState: cityState.trim(),
        age: numAge,
        hasDevice,
        preferredWorkType,
        preferredRole,
        experienceLevel,
        languages: languages.trim(),
        additionalInformation: additionalInformation ? additionalInformation.trim() : '',
        status: 'New',
      });
    }

    // Fire dual notification emails asynchronously (Candidate + Admin)
    sendApplicationEmails({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      cityState: cityState.trim(),
      age: numAge,
      hasDevice,
      preferredWorkType,
      preferredRole,
      experienceLevel,
      languages: languages.trim(),
      additionalInformation: additionalInformation ? additionalInformation.trim() : '',
      status: 'New',
    }).catch((err) => console.error('Failed sending application emails:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Application Submitted Successfully.',
        applicationId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Application Error:', error);
    return NextResponse.json({ error: error.message || 'Server error submitting application.' }, { status: 500 });
  }
}
