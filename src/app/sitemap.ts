import { MetadataRoute } from 'next';
import { defaultJobRoles, defaultServices } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

  const staticRoutes = [
    '',
    '/services',
    '/agency-network',
    '/about',
    '/contact',
    '/reviews',
    '/careers',
    '/careers/roles',
    '/apply',
    '/privacy',
    '/terms',
  ].map((route) => {
    let priority = 0.8;
    let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';

    if (route === '') {
      priority = 1.0;
      changeFrequency = 'daily';
    } else if (route === '/services' || route === '/agency-network') {
      priority = 0.95;
      changeFrequency = 'daily';
    } else if (route === '/contact' || route === '/about' || route === '/reviews') {
      priority = 0.9;
    } else if (route === '/careers' || route === '/careers/roles' || route === '/apply') {
      priority = 0.85;
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
    };
  });

  const roleRoutes = defaultJobRoles.map((role) => ({
    url: `${baseUrl}/careers/${role.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...roleRoutes];
}
