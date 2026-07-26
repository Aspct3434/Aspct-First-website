import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CheckCircle, Lock, Repeat, Users } from '@/components/icons';
import { FaqJsonLd, FaqSection } from '@/components/marketing/faq-section';
import { FinalCta } from '@/components/marketing/final-cta';
import { PageHero } from '@/components/marketing/page-hero';
import { PricingComparison } from '@/components/marketing/pricing-comparison';
import { PricingPlans } from '@/components/marketing/pricing-plans';
import { Quote } from '@/components/icons';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { pricingFaqs } from '@/lib/data/content';
import { plans } from '@/lib/data/pricing';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Free forever on Starter. Plus from $9 a month billed annually, Household from $16. Every plan includes read-only connections, full export and a 30-day trial with no card required.',
  path: '/pricing/',
  socialDescription:
    'Free forever on Starter. Plus from $9/month, Household from $16/month. 30-day trial, no card required.',
});

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Lumina',
  description:
    'AI-powered personal finance platform for tracking spending, budgeting and automating savings.',
  brand: { '@type': 'Brand', name: 'Lumina' },
  offers: plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.name,
    description: plan.tagline,
    price: plan.annual.toFixed(2),
    priceCurrency: 'USD',
    url: `${siteUrl}/pricing/`,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: plan.annual.toFixed(2),
      priceCurrency: 'USD',
      unitCode: 'MON',
      billingIncrement: 1,
    },
  })),
};

const guarantees = [
  {
    icon: CheckCircle,
    title: '30 days, no card',
    body: 'Trials do not convert to paid. There is no card on file to charge, so nothing happens on day 31 except a downgrade to Starter.',
  },
  {
    icon: Repeat,
    title: 'Full annual refund',
    body: 'Cancel an annual plan within 30 days of billing and we refund all of it. After that, unused whole months on request.',
  },
  {
    icon: Lock,
    title: 'Downgrade keeps your data',
    body: 'Moving to Starter keeps three connections and full export. We never delete history to pressure you into paying.',
  },
  {
    icon: Users,
    title: 'Cancel in two clicks',
    body: 'From Settings, without an email, a phone call, or a retention offer you have to decline three times.',
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <FaqJsonLd faqs={pricingFaqs} />

      <PageHero
        align="center"
        eyebrow="Pricing"
        title="Priced so the free plan is genuinely useful"
        lede="Lumina is paid for by subscriptions, never by selling data. That is why Starter is limited by capability rather than by a countdown, and why there are no ads anywhere in the product."
      />

      <Section tone="paper" size="sm" className="pt-0" aria-labelledby="plans-title">
        <Container>
          {/* The page hero already introduces the plans visually; this heading
              keeps the document outline unbroken for screen readers. */}
          <h2 id="plans-title" className="sr-only">
            Choose a plan
          </h2>
          <PricingPlans />
        </Container>
      </Section>

      <Section aria-labelledby="guarantees-title" tone="paper2" size="sm">
        <Container>
          <h2 id="guarantees-title" className="sr-only">
            Billing guarantees
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map(({ icon: Glyph, title, body }, index) => (
              <Reveal as="li" key={title} delay={index * 50}>
                <div className="flex h-full flex-col gap-3 rounded-xl bg-card p-6 shadow-xs ring-1 ring-line">
                  <Glyph className="size-5 text-brand-600" aria-hidden="true" />
                  <h3 className="text-[0.9375rem] font-semibold text-text">{title}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-text-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="compare" aria-labelledby="compare-title" tone="paper">
        <Container>
          <SectionHeading
            id="compare-title"
            eyebrow="Side by side"
            title="Every difference between the three plans"
            lede="Including the ones that are easy to leave off a pricing page."
          />
          <div className="mt-12">
            <PricingComparison />
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="pricing-quote-title" tone="ink" size="sm" className="grid-veil">
        <Container>
          <h2 id="pricing-quote-title" className="sr-only">
            A note from a member
          </h2>
          <figure className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto size-8 text-citrine-500" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-2xl leading-snug text-on-ink sm:text-[2rem]">
              “I moved to annual after the trial. The forecast alone replaced a spreadsheet I had
              kept for six years, and I stopped opening it on Sunday nights.”
            </blockquote>
            <figcaption className="mt-6 text-sm text-on-ink-2">
              Rachel Lindqvist · Data analyst, Chicago ·{' '}
              <span className="text-on-ink-3">Illustrative testimonial</span>
            </figcaption>
          </figure>
        </Container>
      </Section>

      <FaqSection
        id="faq"
        eyebrow="Billing questions"
        title="What people ask before they enter a card"
        lede="If your question is not here, we answer email in one business day."
        faqs={pricingFaqs}
        name="pricing-faq"
        tone="paper"
      />

      <FinalCta
        title="Start on Plus. Decide in thirty days."
        body="No card, no auto-charge, and a free plan waiting if Lumina turns out not to be for you."
      />
    </>
  );
}
