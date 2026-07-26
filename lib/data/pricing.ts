/**
 * Plans, prices and the comparison matrix.
 *
 * Prices are illustrative for this demonstration build. Annual billing is
 * priced at a 25% discount on the monthly rate, and the numbers below are the
 * per-month figures a customer actually pays in each cycle.
 */

export type PlanId = 'starter' | 'plus' | 'household';

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: number;
  /** Per-month price when billed annually. */
  annual: number;
  /** What the yearly invoice comes to. */
  annualTotal: number;
  audience: string;
  cta: { label: string; href: string };
  highlights: string[];
  /** Stated plainly rather than buried — the honest version converts better. */
  limits: string[];
  recommended?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'See where the money actually goes.',
    monthly: 0,
    annual: 0,
    annualTotal: 0,
    audience: 'One person, a couple of accounts, no automation.',
    cta: { label: 'Create a free account', href: '/signup/' },
    highlights: [
      'Up to 3 connected accounts',
      'Automatic categorization with manual overrides',
      'One monthly budget across all spending',
      '12 months of transaction history',
      'Weekly email digest',
    ],
    limits: [
      'No autosave rules — transfers stay manual',
      'No cash-flow forecast or subscription radar',
      'One person per account',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    tagline: 'The plan that runs itself.',
    monthly: 12,
    annual: 9,
    annualTotal: 108,
    audience: 'Anyone who wants budgeting and saving to happen without them.',
    cta: { label: 'Start 30-day free trial', href: '/signup/?plan=plus' },
    highlights: [
      'Unlimited accounts, cards, loans and investments',
      'Adaptive budgets built from your last 12 months',
      'Unlimited autosave rules with a balance floor you set',
      '90-day cash-flow forecast',
      'Subscription radar: price rises, forgotten trials, duplicates',
      'Unlimited goals with funded-by dates',
      'Ask Lumina — plain-English questions about your money',
      'Full history, CSV and PDF export',
    ],
    limits: ['One person per account — add people on Household'],
    recommended: true,
  },
  {
    id: 'household',
    name: 'Household',
    tagline: 'Two people, one set of numbers.',
    monthly: 20,
    annual: 16,
    annualTotal: 192,
    audience: 'Partners, families and anyone sharing money with someone else.',
    cta: { label: 'Start 30-day free trial', href: '/signup/?plan=household' },
    highlights: [
      'Everything in Plus, for up to 5 people',
      'Shared and private accounts side by side',
      'Joint budgets and shared goals',
      'Per-person roles and visibility controls',
      'Tax-ready annual summary and category exports',
      'Priority support — same business day',
    ],
    limits: ['Beyond 5 people, talk to us about a family office plan'],
  },
];

export const trial = {
  days: 30,
  cardRequired: false,
  planOnTrial: 'Plus',
  note: 'Trials start on Plus. No card, no cancellation email, no auto-charge at the end — the account simply drops to Starter unless you choose a plan.',
} as const;

export const annualDiscountPercent = 25;

/* --- Comparison matrix ---------------------------------------------------- */

export type ComparisonValue = string | boolean;

export type ComparisonRow = {
  label: string;
  hint?: string;
  values: Record<PlanId, ComparisonValue>;
};

export const comparison: { section: string; rows: ComparisonRow[] }[] = [
  {
    section: 'Accounts & data',
    rows: [
      {
        label: 'Connected accounts',
        hint: 'Banks, cards, loans, investments and pensions.',
        values: { starter: '3', plus: 'Unlimited', household: 'Unlimited' },
      },
      {
        label: 'Transaction history',
        values: { starter: '12 months', plus: 'Everything your bank returns', household: 'Everything your bank returns' },
      },
      {
        label: 'Manual accounts and cash',
        values: { starter: true, plus: true, household: true },
      },
      {
        label: 'People on the account',
        values: { starter: '1', plus: '1', household: 'Up to 5' },
      },
      {
        label: 'Data export (CSV, PDF)',
        values: { starter: 'CSV only', plus: true, household: true },
      },
    ],
  },
  {
    section: 'Budgeting',
    rows: [
      {
        label: 'Monthly budget',
        values: { starter: 'One overall limit', plus: 'Per category', household: 'Per category, per person' },
      },
      {
        label: 'Adaptive limits',
        hint: 'Lumina proposes limits from your own last 12 months, then adjusts for irregular months.',
        values: { starter: false, plus: true, household: true },
      },
      {
        label: 'Rollover and borrow-from-next-month',
        values: { starter: false, plus: true, household: true },
      },
      {
        label: 'Shared and private categories',
        values: { starter: false, plus: false, household: true },
      },
    ],
  },
  {
    section: 'Automation',
    rows: [
      {
        label: 'Autosave rules',
        hint: 'Payday sweeps, round-ups, percentage-of-income and surplus rules.',
        values: { starter: false, plus: 'Unlimited', household: 'Unlimited' },
      },
      {
        label: 'Balance floor protection',
        hint: 'No automated transfer ever takes you below the buffer you set.',
        values: { starter: false, plus: true, household: true },
      },
      {
        label: 'Savings goals with funded-by dates',
        values: { starter: '1 goal', plus: 'Unlimited', household: 'Unlimited, shared' },
      },
      {
        label: 'Bill and subscription detection',
        values: { starter: 'Detection only', plus: 'Detection + price-change alerts', household: 'Detection + price-change alerts' },
      },
    ],
  },
  {
    section: 'Insight & reporting',
    rows: [
      {
        label: '90-day cash-flow forecast',
        values: { starter: false, plus: true, household: true },
      },
      {
        label: 'Ask Lumina',
        hint: 'Plain-English questions answered with a number and the transactions behind it.',
        values: { starter: '5 questions / month', plus: 'Unlimited', household: 'Unlimited' },
      },
      {
        label: 'Weekly digest',
        values: { starter: true, plus: true, household: 'Per person' },
      },
      {
        label: 'Tax-ready annual summary',
        values: { starter: false, plus: false, household: true },
      },
    ],
  },
  {
    section: 'Security & support',
    rows: [
      {
        label: 'Read-only bank connections',
        values: { starter: true, plus: true, household: true },
      },
      {
        label: 'Passkeys and two-factor authentication',
        values: { starter: true, plus: true, household: true },
      },
      {
        label: 'Delete your data on demand',
        values: { starter: true, plus: true, household: true },
      },
      {
        label: 'Support',
        values: { starter: 'Email, 2 business days', plus: 'Email, 1 business day', household: 'Priority, same business day' },
      },
    ],
  },
];
