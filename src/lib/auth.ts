import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'freelancewalla_admin_secret_key_2026';
const ADMIN_COOKIE_NAME = 'fw_admin_token';

/**
 * Validates whether the incoming request has a valid admin session cookie
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;
    return token === ADMIN_SECRET;
  } catch (error) {
    return false;
  }
}

export function getAdminTokenName(): string {
  return ADMIN_COOKIE_NAME;
}

export function getAdminSecret(): string {
  return ADMIN_SECRET;
}
