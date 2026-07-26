import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Metadata routes must be explicitly static under `output: 'export'`.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The sign-in screen has nothing to index and would only compete with
        // /signup/ in results.
        disallow: ['/signin/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
