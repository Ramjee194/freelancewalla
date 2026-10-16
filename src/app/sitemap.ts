import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';
  const now = new Date().toISOString();

  // Optimized specifically for Google #1 Ranking with target keyword routes
  const targetRoutes: {
    route: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }[] = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/bpo-services', priority: 0.95, changeFrequency: 'daily' },
    { route: '/b2b-services', priority: 0.95, changeFrequency: 'daily' },
    { route: '/b2c-services', priority: 0.95, changeFrequency: 'daily' },
    { route: '/careers', priority: 0.90, changeFrequency: 'daily' },
    { route: '/about-us', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/contact-us', priority: 0.85, changeFrequency: 'weekly' },
  ];

  return targetRoutes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
