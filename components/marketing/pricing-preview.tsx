import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import { PricingPlans } from '@/components/marketing/pricing-plans';
import { Container, Section, SectionHeading } from '@/components/ui/layout';

export function PricingPreview() {
  return (
    <Section id="pricing" aria-labelledby="pricing-title" tone="paper">
      <Container>
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          align="center"
          title="One price. Every feature on your plan. No upsells inside the product."
          lede="Start free, stay free if that is enough. Nothing about your money is held behind a higher tier you did not know existed."
        />

        <div className="mt-12">
          <PricingPlans compact />
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/pricing/"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            Compare every feature side by side
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
