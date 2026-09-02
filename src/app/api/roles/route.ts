import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import JobRole from '@/lib/models/JobRole';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Seed initial default roles & services if DB is empty
    await seedDatabase();

    const roles = await JobRole.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, roles });
  } catch (error: any) {
    console.error('API Fetch Roles Error:', error);
    return NextResponse.json({ error: error.message || 'Failed fetching active roles.' }, { status: 500 });
  }
}
