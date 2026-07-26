import Link from 'next/link';
import { ArrowRight, Check } from '@/components/icons';
import {
  AutomationVignette,
  BudgetVignette,
  SubscriptionVignette,
} from '@/components/marketing/vignettes';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';

const rows = [
  {
    id: 'budgets',
    eyebrow: 'Budgets',
    title: 'Limits you have already proved you can live within',
    body: 'Lumina reads twelve months of your own spending and proposes a limit per category, then shows your pace through the month rather than only the damage at the end of it.',
    points: [
      'Seasonal months are recognised, not marked as failures',
      'Rollover, and borrowing from next month when you decide to',
      'Move money between categories in one tap',
    ],
    link: { href: '/features/#budgets', label: 'How adaptive budgets work' },
    vignette: <BudgetVignette />,
  },
  {
    id: 'automation',
    eyebrow: 'Automation',
    title: 'Saving that never overdraws you',
    body: 'Rules run on payday, on round-ups, on a percentage of income, or on whatever is left before the next one. Every rule checks your balance floor first, and reduces itself instead of pushing you into the red.',
    points: [
      'A floor you set that no automation may cross',
      'Reduced and skipped runs explained in plain language',
      'One switch pauses everything',
    ],
    link: { href: '/features/#automation', label: 'See the automation rules' },
    vignette: <AutomationVignette />,
  },
  {
    id: 'radar',
    eyebrow: 'Subscription radar',
    title: 'The charges you forgot you agreed to',
    body: 'Recurring payments are found in your history rather than in a list you have to maintain. Lumina flags price rises the day they happen, trials about to convert, and duplicates across different cards.',
    points: [
      'Price-change alerts with the annual cost of the difference',
      'Trial-to-paid warnings three days ahead',
      'Duplicate detection across accounts and cards',
    ],
    link: { href: '/features/#subscriptions', label: 'More on recurring charges' },
    vignette: <SubscriptionVignette />,
  },
];

export function FeatureShowcase() {
  return (
    <Section id="product" aria-labelledby="product-title" tone="paper2">
      <Container>
        <SectionHeading
          id="product-title"
          eyebrow="Inside the product"
          title="Three places Lumina does the work for you"
          lede="Every screen answers the same question: what should I do about this? Here is what that looks like in practice."
        />

        <div className="mt-16 flex flex-col gap-20 sm:gap-24">
          {rows.map((row, index) => (
            <div
              key={row.id}
              id={row.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <div className="max-w-lg">
                  <Eyebrow>{row.eyebrow}</Eyebrow>
                  <h3 className="mt-5 font-display text-display-3 font-normal text-text">
                    {row.title}
                  </h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-text-2">{row.body}</p>
                  <ul className="mt-6 space-y-3">
                    {row.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-text-2">
                        <Check className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={row.link.href}
                    className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    {row.link.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={80} className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                {row.vignette}
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
