import { MetadataRoute } from 'next';
import { defaultJobRoles, defaultServices } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://freelancewalla.in';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/careers',
    '/careers/roles',
    '/reviews',
    '/contact',
    '/apply',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : route === '/services' || route === '/careers' ? 0.9 : 0.8,
  }));

  const roleRoutes = defaultJobRoles.map((role) => ({
    url: `${baseUrl}/careers/${role.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...roleRoutes];
}
