import { NextRequest, NextResponse } from 'next/server';
import { getAdminSecret, getAdminTokenName } from '@/lib/auth';

const ALLOWED_EMAILS = [
  'info@freelancewalla.in',
  'admin@freelancewalla.in',
  'ramjeekumaryadav733@gmail.com',
];

const ALLOWED_PASSWORDS = [
  'RaMjEe@1',
  'freelancewalla_admin_secret_key_2026',
  'admin123',
  'freelancewalla',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const adminSecret = getAdminSecret();

    const normalizedEmail = email ? email.trim().toLowerCase() : '';
    const trimmedPassword = password ? password.trim() : '';

    const isEmailValid = !normalizedEmail || ALLOWED_EMAILS.includes(normalizedEmail);
    const isPasswordValid =
      ALLOWED_PASSWORDS.includes(trimmedPassword) || trimmedPassword === adminSecret;

    if (isEmailValid && isPasswordValid) {
      const response = NextResponse.json({
        success: true,
        message: 'Administrator authenticated successfully',
      });

      response.cookies.set({
        name: getAdminTokenName(),
        value: adminSecret,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid administrative email or password. Please verify your credentials.' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete(getAdminTokenName());
  return response;
}
