import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  ArrowRight,
  Bank,
  Bolt,
  ChartLine,
  Check,
  Clock,
  Layers,
  Repeat,
  Shield,
  Sparkle,
  Target,
} from '@/components/icons';
import { FinalCta } from '@/components/marketing/final-cta';
import { PageHero } from '@/components/marketing/page-hero';
import {
  AskVignette,
  AutomationVignette,
  BudgetVignette,
  ForecastVignette,
  SubscriptionVignette,
} from '@/components/marketing/vignettes';
import { ButtonLink } from '@/components/ui/button';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { comparisonRows, features, institutionCoverage } from '@/lib/data/content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  title: 'Features',
  description:
    'Adaptive budgets, automated savings with a balance floor, subscription price-rise alerts, and a 90-day forecast built for irregular income. See how Lumina works, feature by feature.',
  path: '/features/',
  socialDescription:
    'Adaptive budgets, automated savings with a balance floor, subscription price-rise alerts and a 90-day cash-flow forecast.',
});

const icons = {
  layers: Layers,
  chart: ChartLine,
  bolt: Bolt,
  sparkle: Sparkle,
  repeat: Repeat,
  target: Target,
  shield: Shield,
  clock: Clock,
} as const;

const byId = Object.fromEntries(features.map((feature) => [feature.id, feature]));

const majorFeatures = [
  { id: 'budgets', vignette: <BudgetVignette /> },
  { id: 'automation', vignette: <AutomationVignette /> },
  { id: 'subscriptions', vignette: <SubscriptionVignette /> },
  { id: 'forecast', vignette: <ForecastVignette /> },
] as const;

const secondaryIds = ['accounts', 'categorization', 'goals', 'ask'] as const;

const jumpLinks = [
  { href: '#budgets', label: 'Budgets' },
  { href: '#automation', label: 'Automation' },
  { href: '#subscriptions', label: 'Subscriptions' },
  { href: '#forecast', label: 'Forecast' },
  { href: '#everything-else', label: 'Everything else' },
  { href: '#integrations', label: 'Coverage' },
  { href: '#comparison', label: 'Alternatives' },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="The product, in detail"
        title="Everything Lumina does, and what it refuses to do"
        lede="Eight capabilities, each built around one rule: show the number, then show the reason. Nothing here needs you to become a person who enjoys budgeting."
        actions={
          <>
            <ButtonLink href="/signup/" size="lg" trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}>
              Start your free trial
            </ButtonLink>
            <ButtonLink href="/app/" variant="secondary" size="lg">
              Open the live demo
            </ButtonLink>
          </>
        }
        aside={<AskVignette />}
      />

      <nav
        aria-label="Jump to a feature"
        className="sticky top-18 z-30 border-y border-line bg-paper/90 backdrop-blur-md"
      >
        <Container>
          <ul className="scroll-x flex items-center gap-1 py-2.5">
            {jumpLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-text-2 transition-colors hover:bg-paper-2 hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Section tone="paper" size="md">
        <Container>
          <div className="flex flex-col gap-20 sm:gap-28">
            {majorFeatures.map(({ id, vignette }, index) => {
              const feature = byId[id];
              const Glyph = icons[feature.icon];
              return (
                <article
                  key={id}
                  id={id}
                  aria-labelledby={`${id}-title`}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <Reveal className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                    <div className="max-w-lg">
                      <Eyebrow>{feature.eyebrow}</Eyebrow>
                      <h2
                        id={`${id}-title`}
                        className="mt-5 flex items-start gap-4 font-display text-display-3 font-normal text-text"
                      >
                        <span className="mt-1.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[1.25rem] text-brand-700 ring-1 ring-brand-200/60">
                          <Glyph />
                        </span>
                        {feature.title}
                      </h2>
                      <p className="mt-5 text-[1.0625rem] leading-relaxed text-text-2">
                        {feature.body}
                      </p>

                      <div className="mt-6 rounded-lg border-l-2 border-brand-600 bg-brand-50/60 py-4 pr-4 pl-5">
                        <p className="text-[0.75rem] font-semibold tracking-[0.1em] text-brand-700 uppercase">
                          In practice
                        </p>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-2">
                          {feature.useCase.scenario}
                        </p>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed font-medium text-text">
                          → {feature.useCase.outcome}
                        </p>
                      </div>

                      <ul className="mt-6 space-y-3">
                        {feature.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-[0.9375rem] text-text-2">
                            <Check className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  <Reveal delay={80} className={cn('min-w-0', index % 2 === 1 && 'lg:order-1')}>
                    {vignette}
                  </Reveal>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="everything-else" aria-labelledby="everything-else-title" tone="paper2">
        <Container>
          <SectionHeading
            id="everything-else-title"
            eyebrow="And the rest"
            title="The four capabilities everything else rests on"
            lede="Less visible, more load-bearing. If these are wrong, nothing above can be right."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {secondaryIds.map((id, index) => {
              const feature = byId[id];
              const Glyph = icons[feature.icon];
              return (
                <Reveal key={id} delay={index * 60} className="min-w-0">
                  <article
                    id={id}
                    aria-labelledby={`${id}-heading`}
                    className="flex h-full flex-col rounded-xl bg-card p-7 shadow-xs ring-1 ring-line sm:p-8"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg bg-brand-50 text-[1.35rem] text-brand-700 ring-1 ring-brand-200/60">
                      <Glyph />
                    </span>
                    <h3 id={`${id}-heading`} className="mt-5 text-xl font-semibold text-text">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-2">
                      {feature.body}
                    </p>
                    <dl className="mt-5 space-y-2 border-t border-line pt-5 text-[0.875rem]">
                      <div className="flex gap-2">
                        <dt className="shrink-0 font-semibold text-text-3">Case</dt>
                        <dd className="text-text-2">{feature.useCase.scenario}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="shrink-0 font-semibold text-text-3">Result</dt>
                        <dd className="font-medium text-text">{feature.useCase.outcome}</dd>
                      </div>
                    </dl>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {feature.bullets.slice(0, 3).map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-full bg-paper-2 px-2.5 py-1 text-[0.8125rem] text-text-2 ring-1 ring-line"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="integrations" aria-labelledby="integrations-title" tone="ink" className="grid-veil">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              id="integrations-title"
              eyebrow="Coverage"
              tone="dark"
              title="Over 11,000 institutions, and a manual account for the rest"
              lede="Connections run through regulated aggregation partners. If your bank is not supported, you can still track it by hand and everything else keeps working."
            />

            <dl className="grid gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2">
              {institutionCoverage.map((region, index) => (
                <Reveal key={region.region} delay={index * 50} className="bg-ink-2">
                  <div className="flex h-full flex-col gap-2 p-6">
                    <Bank className="size-5 text-citrine-500" aria-hidden="true" />
                    <dt className="mt-1 text-[0.9375rem] font-semibold text-on-ink">
                      {region.region}
                    </dt>
                    <dd>
                      <p className="text-3xl font-semibold tracking-[-0.02em] text-on-ink">
                        {region.count}
                      </p>
                      <p className="mt-2 text-sm leading-snug text-on-ink-2">{region.detail}</p>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section id="comparison" aria-labelledby="comparison-title" tone="paper">
        <Container>
          <SectionHeading
            id="comparison-title"
            eyebrow="Honestly, though"
            title="How Lumina compares to what you are doing now"
            lede="Three of these four options are genuinely fine. The question is what each one costs you in attention."
          />

          <div className="scroll-x mt-12 rounded-xl ring-1 ring-line">
            <table className="w-full min-w-[44rem] border-collapse bg-card text-left">
              <caption className="sr-only">
                Comparison of budgeting approaches: what each is good at, and what it costs in
                ongoing effort.
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-1/5 px-6 py-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
                    Approach
                  </th>
                  <th scope="col" className="w-2/5 px-6 py-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
                    What it is good at
                  </th>
                  <th scope="col" className="w-2/5 px-6 py-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
                    What it costs you
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => {
                  const isLumina = row.approach === 'Lumina';
                  return (
                    <tr
                      key={row.approach}
                      className={cn('border-b border-line last:border-0', isLumina && 'bg-brand-50')}
                    >
                      <th
                        scope="row"
                        className={cn(
                          'px-6 py-5 align-top text-[0.9375rem] font-semibold',
                          isLumina ? 'text-brand-700' : 'text-text',
                        )}
                      >
                        {row.approach}
                      </th>
                      <td className="px-6 py-5 align-top text-[0.9375rem] text-text-2">
                        {row.strength}
                      </td>
                      <td className="px-6 py-5 align-top text-[0.9375rem] text-text-2">{row.cost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-3">
            If a spreadsheet is working for you, keep it. Lumina is for the months when it stops
            being updated.
          </p>
        </Container>
      </Section>

      <FinalCta
        title="Try it against your own numbers."
        body="Features read the same on every website. Connect one account and see whether the first insight tells you something you did not know."
      />
    </>
  );
}
