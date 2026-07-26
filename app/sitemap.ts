import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Metadata routes must be explicitly static under `output: 'export'`.
export const dynamic = 'force-static';

/**
 * Routes are listed explicitly rather than crawled from the filesystem, so a
 * page cannot silently enter the sitemap without a priority and a stated
 * update cadence. `/signin/` is deliberately absent — it is `noindex`.
 */
const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] =
  [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/features/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/security/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/app/', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/signup/', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/legal/privacy/', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/terms/', priority: 0.3, changeFrequency: 'yearly' },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-07-26');
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
