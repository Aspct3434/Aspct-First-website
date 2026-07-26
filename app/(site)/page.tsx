import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Benefits } from '@/components/marketing/benefits';
import { FaqJsonLd, FaqSection } from '@/components/marketing/faq-section';
import { FeatureShowcase } from '@/components/marketing/feature-showcase';
import { FinalCta } from '@/components/marketing/final-cta';
import { Hero } from '@/components/marketing/hero';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { PricingPreview } from '@/components/marketing/pricing-preview';
import { Results } from '@/components/marketing/results';
import { SecuritySection } from '@/components/marketing/security-section';
import { Testimonials } from '@/components/marketing/testimonials';
import { TrustStrip } from '@/components/marketing/trust-strip';
import { homeFaqs } from '@/lib/data/content';
import { plans } from '@/lib/data/pricing';
import { seoDefaults, site, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  ...pageMetadata({
    title: seoDefaults.defaultTitle,
    description: site.description,
    path: '/',
    socialTitle: seoDefaults.defaultTitle,
  }),
  // The home page owns the site title outright rather than wearing the
  // "· Lumina" suffix twice.
  title: { absolute: seoDefaults.defaultTitle },
};

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: site.name,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web, iOS, Android',
  description: site.description,
  url: siteUrl,
  publisher: { '@id': `${siteUrl}/#organization` },
  offers: plans.map((plan) => ({
    '@type': 'Offer',
    name: `${site.name} ${plan.name}`,
    price: plan.monthly.toFixed(2),
    priceCurrency: 'USD',
    category: plan.monthly === 0 ? 'Free' : 'Subscription',
    url: `${siteUrl}/pricing/`,
  })),
  featureList: [
    'Automatic account aggregation',
    'AI transaction categorisation',
    'Adaptive budgets',
    'Automated savings rules',
    'Subscription and price-rise detection',
    '90-day cash-flow forecasting',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <FaqJsonLd faqs={homeFaqs} />

      <Hero />
      <TrustStrip />
      <Benefits />
      <HowItWorks />
      <FeatureShowcase />
      <Results />
      <Testimonials />
      <SecuritySection />
      <PricingPreview />
      <FaqSection faqs={homeFaqs} name="home-faq" tone="paper2" />
      <FinalCta />
    </>
  );
}
