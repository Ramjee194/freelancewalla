import { Cashfree, CFEnvironment } from 'cashfree-pg';
export * from './leadPlans';

// Initialize Cashfree instance for server-side usage
export const cashfreeInstance = new Cashfree(
  CFEnvironment.PRODUCTION,
  process.env.CASHFREE_APP_ID || '',
  process.env.CASHFREE_SECRET_KEY || ''
);
