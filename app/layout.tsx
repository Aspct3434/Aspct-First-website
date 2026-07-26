import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { ToastProvider } from '@/components/ui/toast';
import { seoDefaults, site, siteUrl } from '@/lib/site';
import './globals.css';

const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-instrument-serif',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  // Used only for a handful of numeric labels (timeline years, clause numbers),
  // so it is fetched on demand rather than preloaded on every page.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoDefaults.defaultTitle,
    template: seoDefaults.titleTemplate,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    'personal finance app',
    'AI budgeting',
    'automatic savings',
    'spending tracker',
    'cash flow forecast',
    'money management',
  ],
  category: 'finance',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: seoDefaults.defaultTitle,
    description: site.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: seoDefaults.ogImageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoDefaults.defaultTitle,
    description: site.description,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf9f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1512' },
  ],
  colorScheme: 'light',
};

/**
 * Runs before first paint. Two jobs, both about avoiding a visible flash:
 * marking that scripting is available (so entrance animations only apply when
 * they can complete), and hiding a previously dismissed announcement bar
 * without a layout shift.
 */
const bootScript = `document.documentElement.dataset.js='true';try{if(localStorage.getItem('lumina.banner')==='dismissed'){document.documentElement.dataset.banner='off'}}catch(e){}`;

const organizationLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: siteUrl,
      logo: `${siteUrl}/og.png`,
      foundingDate: site.founded,
      email: site.supportEmail,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postal,
        addressCountry: site.address.country,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: site.supportEmail,
          availableLanguage: ['English'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
