import type { Metadata } from 'next';
import { seoDefaults, site } from '@/lib/site';

/**
 * Per-page metadata.
 *
 * Next merges metadata one field at a time, so a page that declares its own
 * `openGraph` replaces the layout's entirely — quietly dropping og:image,
 * og:type and og:site_name. Composing every page through this helper means that
 * cannot happen, and it keeps the canonical URL and the social card in step
 * with the title on every route.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
  noindex = false,
}: {
  /** Page title without the brand suffix; the layout template adds it. */
  title: string;
  description: string;
  /** Canonical path, with trailing slash, e.g. `/pricing/`. */
  path: string;
  socialTitle?: string;
  socialDescription?: string;
  noindex?: boolean;
}): Metadata {
  const social = socialTitle ?? `${title} · ${site.name}`;
  const socialDescriptionText = socialDescription ?? description;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: social,
      description: socialDescriptionText,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: seoDefaults.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: social,
      description: socialDescriptionText,
      images: ['/og.png'],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
