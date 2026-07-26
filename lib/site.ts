/**
 * Single source of truth for brand strings, navigation and canonical URLs.
 * Anything that appears in more than one place lives here.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lumina.finance'
).replace(/\/$/, '');

export const site = {
  name: 'Lumina',
  legalName: 'Lumina Financial Technologies, Inc.',
  tagline: 'Clarity for every dollar you earn.',
  description:
    'Lumina connects your accounts, shows you where your money actually goes, and automates the saving you keep meaning to do. Free for 30 days, no card required.',
  url: siteUrl,
  locale: 'en_US',
  founded: '2021',
  supportEmail: 'support@lumina.finance',
  pressEmail: 'press@lumina.finance',
  securityEmail: 'security@lumina.finance',
  phone: '+1 (415) 555-0148',
  address: {
    street: '1 Ferry Building, Suite 210',
    city: 'San Francisco',
    region: 'CA',
    postal: '94111',
    country: 'US',
  },
} as const;

export type NavLink = {
  href: string;
  label: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { href: '/features/', label: 'Features', description: 'Everything Lumina does for you' },
  { href: '/pricing/', label: 'Pricing', description: 'Plans from free to household' },
  { href: '/security/', label: 'Security', description: 'How your data is protected' },
  { href: '/about/', label: 'About', description: 'Who builds Lumina, and why' },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/features/', label: 'Features' },
      { href: '/pricing/', label: 'Pricing' },
      { href: '/app/', label: 'Live dashboard demo' },
      { href: '/features/#integrations', label: 'Supported institutions' },
      { href: '/features/#comparison', label: 'How Lumina compares' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about/', label: 'About us' },
      { href: '/about/#team', label: 'Team' },
      { href: '/about/#careers', label: 'Careers' },
      { href: '/contact/', label: 'Contact & demo' },
      { href: '/about/#story', label: 'Our story' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { href: '/security/', label: 'Security overview' },
      { href: '/security/#certifications', label: 'Certifications' },
      { href: '/security/#disclosure', label: 'Report a vulnerability' },
      { href: '/legal/privacy/', label: 'Privacy policy' },
      { href: '/legal/terms/', label: 'Terms of service' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { href: '/signup/', label: 'Create an account' },
      { href: '/signin/', label: 'Sign in' },
      { href: '/pricing/#faq', label: 'Billing questions' },
      { href: '/contact/', label: 'Talk to us' },
    ],
  },
];

/** Used by every page's <title> template and by JSON-LD. */
export const seoDefaults = {
  titleTemplate: `%s · ${site.name}`,
  defaultTitle: `${site.name} — ${site.tagline}`,
  ogImageAlt:
    'Lumina — an AI-powered personal finance platform. A dashboard showing balances, a spending trend and budget progress.',
} as const;
