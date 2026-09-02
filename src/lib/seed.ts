import connectToDatabase from './db';
import Service from './models/Service';
import JobRole from './models/JobRole';
import Review from './models/Review';
import { defaultServices, defaultJobRoles, defaultReviews } from './constants';

export { defaultServices, defaultJobRoles, defaultReviews };

export async function seedDatabase() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      console.warn('Skipping DB seed because MongoDB connection is unavailable.');
      return;
    }

    // Upsert default Services
    for (const s of defaultServices) {
      await Service.updateOne({ slug: s.slug }, { $set: s }, { upsert: true });
    }

    // Upsert default JobRoles
    for (const r of defaultJobRoles) {
      await JobRole.updateOne({ slug: r.slug }, { $set: r }, { upsert: true });
    }

    // Upsert default Reviews
    for (const rev of defaultReviews) {
      await Review.updateOne(
        { name: rev.name, roleOrCompany: rev.roleOrCompany },
        { $set: rev },
        { upsert: true }
      );
    }

    console.log('Database seeded / upserted successfully.');
  } catch (err: any) {
    console.warn('Database seed warning (handled):', err?.message || err);
  }
}
