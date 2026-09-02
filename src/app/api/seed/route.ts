import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';
import connectToDatabase from '@/lib/db';
import JobRole from '@/lib/models/JobRole';
import Review from '@/lib/models/Review';
import Service from '@/lib/models/Service';

export async function GET() {
  try {
    await connectToDatabase();
    await seedDatabase();

    const [services, roles, reviews] = await Promise.all([
      Service.find({}).lean(),
      JobRole.find({}).lean(),
      Review.find({}).lean(),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Database seeded and populated successfully!',
      counts: {
        services: services.length,
        roles: roles.length,
        reviews: reviews.length,
      },
      roles,
      reviews,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
