/**
 * Marketing copy that appears in more than one place, or that reads better as
 * data than as JSX. Written for this demonstration build — the company, the
 * customers and the figures are invented.
 */

/* --- Social proof --------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
  plan: string;
  since: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'I had tried three budgeting apps and quit all of them by week two. Lumina was different because it never asked me to build anything. It showed me my own last twelve months and proposed the budget. I changed two numbers and that was setup.',
    name: 'Priya Raghunathan',
    role: 'Senior product manager',
    location: 'Seattle',
    initials: 'PR',
    plan: 'Plus, annual',
    since: 'Member since 2024',
  },
  {
    quote:
      'The subscription radar paid for the year in the first week. It found a duplicate cloud plan I had been billed for twice since 2023 and a price rise nobody emailed me about.',
    name: 'Tomás Herrera',
    role: 'Structural engineer',
    location: 'Austin',
    initials: 'TH',
    plan: 'Plus, monthly',
    since: 'Member since 2025',
  },
  {
    quote:
      'We share a mortgage and almost nothing else, which broke every app we tried. Household mode let us keep our accounts separate and still look at one honest number together on a Sunday.',
    name: 'Nina Kowalczyk',
    role: 'Clinical researcher',
    location: 'Manchester',
    initials: 'NK',
    plan: 'Household, annual',
    since: 'Member since 2024',
  },
  {
    quote:
      'My income swings by sixty percent month to month. The forecast is the first tool that has coped with that. It tells me what I can safely move to savings this week, not what an average month is supposed to look like.',
    name: 'Daniel Osei',
    role: 'Freelance motion designer',
    location: 'Toronto',
    initials: 'DO',
    plan: 'Plus, annual',
    since: 'Member since 2023',
  },
];

export type Stat = { value: string; label: string; footnote?: string };

export const outcomeStats: Stat[] = [
  {
    value: '$317',
    label: 'Median increase in money kept each month, 90 days after joining',
    footnote: 'Measured against each member’s own prior six-month average.',
  },
  {
    value: '4 min',
    label: 'Median time from sign-up to a first connected account',
  },
  {
    value: '98.6%',
    label: 'Transactions categorized correctly after 30 days of use',
    footnote: 'Accuracy improves as you correct the few it gets wrong.',
  },
  {
    value: '61%',
    label: 'Members running at least one automated savings rule by week two',
  },
];

/* --- Product ------------------------------------------------------------- */

export type Benefit = {
  icon: 'layers' | 'chart' | 'bolt' | 'sparkle';
  title: string;
  body: string;
  proof: string;
};

export const benefits: Benefit[] = [
  {
    icon: 'layers',
    title: 'Every account on one page',
    body: 'Current accounts, credit cards, loans, pensions and brokerages, refreshed automatically. The number at the top is the one you would have worked out by hand on a Sunday evening.',
    proof: 'Connections refresh several times a day',
  },
  {
    icon: 'chart',
    title: 'A budget built from your real life',
    body: 'Lumina reads your last twelve months and proposes limits you have actually lived within, then adapts when a month is unusual. No 50/30/20 rule invented by someone who has never seen your rent.',
    proof: 'Set up in about four minutes',
  },
  {
    icon: 'bolt',
    title: 'Saving that survives a bad week',
    body: 'Rules move money on payday, on round-ups, or on whatever is left over — and never take you below the balance floor you set. Willpower stops being part of the plan.',
    proof: 'Every rule respects your buffer',
  },
  {
    icon: 'sparkle',
    title: 'Answers, not more dashboards',
    body: 'Ask “how much did I spend on travel last spring?” and get the number plus the transactions behind it. Every insight names the amount, the evidence and what to do next.',
    proof: 'Sources shown with every answer',
  },
];

export type Step = { title: string; body: string; detail: string; duration: string };

export const howItWorks: Step[] = [
  {
    title: 'Connect your accounts',
    body: 'Choose your bank and sign in through their own secure page. Lumina receives a read-only token — it never sees or stores your banking password, and it cannot move money in or out of an institution.',
    detail: 'Over 11,000 institutions across the US, UK, Canada and the EU.',
    duration: 'About 2 minutes',
  },
  {
    title: 'Lumina reads your history',
    body: 'Up to twenty-four months of transactions are categorized, deduplicated and matched into recurring charges. You will see a first pass immediately and a settled picture within a day.',
    detail: 'Correct anything it gets wrong once, and it learns the rule.',
    duration: 'Under 24 hours',
  },
  {
    title: 'You approve the plan',
    body: 'Lumina proposes budgets, a savings rule and a set of goals with realistic dates. Nothing runs until you say so, and every automation can be paused from one screen.',
    detail: 'You can change or stop any rule at any time.',
    duration: 'About 2 minutes',
  },
];

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  useCase: { scenario: string; outcome: string };
  bullets: string[];
  icon: 'layers' | 'chart' | 'bolt' | 'sparkle' | 'repeat' | 'target' | 'shield' | 'clock';
};

export const features: Feature[] = [
  {
    id: 'accounts',
    eyebrow: 'One view',
    title: 'Every account, continuously reconciled',
    body: 'Lumina keeps a single ledger across every institution you use, deduplicating transfers so a £500 move between your own accounts never shows up as £500 of spending.',
    useCase: {
      scenario: 'Two current accounts, three cards, a joint mortgage and an old pension nobody has logged into since 2019.',
      outcome: 'One net-worth figure that is right, without a spreadsheet.',
    },
    bullets: [
      'Automatic transfer matching across institutions',
      'Manual accounts for cash, property and anything unlinked',
      'Balance history retained even if a connection lapses',
      'Duplicate and pending-charge handling',
    ],
    icon: 'layers',
  },
  {
    id: 'categorization',
    eyebrow: 'Understanding',
    title: 'Categorization that learns your life, not the average one',
    body: 'A merchant model plus your own corrections. “Verdant Market” is groceries for you and stock for the person who runs a café — Lumina holds both without you writing rules.',
    useCase: {
      scenario: 'A weekly shop that is half groceries and half a birthday present.',
      outcome: 'Split the transaction once; the pattern is remembered.',
    },
    bullets: [
      'Split transactions across categories',
      'Rules from a single correction — no rule builder',
      'Custom categories and tags for projects or reimbursements',
      '98.6% accuracy after thirty days of use',
    ],
    icon: 'sparkle',
  },
  {
    id: 'budgets',
    eyebrow: 'Planning',
    title: 'Budgets proposed from your own twelve months',
    body: 'Instead of asking what you intend to spend, Lumina shows what you have spent, flags the categories with real movement in them, and proposes limits you have already proved you can live within.',
    useCase: {
      scenario: 'December, when everything is 40% higher and every budget app declares failure.',
      outcome: 'Seasonal months are recognized, not punished. Limits flex and rollover carries.',
    },
    bullets: [
      'Adaptive limits with seasonal awareness',
      'Rollover, and borrowing from next month when you choose to',
      'Pace indicator: on track, tight, or over — before the month ends',
      'One-tap moves between categories',
    ],
    icon: 'chart',
  },
  {
    id: 'automation',
    eyebrow: 'Automation',
    title: 'Savings rules with a floor you set',
    body: 'Payday sweeps, round-ups, a percentage of every deposit, or whatever is left three days before payday. Every rule checks your balance floor first and skips rather than overdraws.',
    useCase: {
      scenario: 'An irregular freelance month where the usual $600 transfer would have caused an overdraft.',
      outcome: 'Lumina moves $180 instead, tells you why, and catches up next month.',
    },
    bullets: [
      'Balance floor honoured by every automation',
      'Skip, reduce and catch-up behavior explained in plain language',
      'Pause everything from one switch',
      'A full log of every automated move',
    ],
    icon: 'bolt',
  },
  {
    id: 'subscriptions',
    eyebrow: 'Recovery',
    title: 'Subscription radar',
    body: 'Recurring charges are detected from your history, not from a list you maintain. Lumina flags price rises, trials about to convert, duplicates across accounts, and services you have stopped using.',
    useCase: {
      scenario: 'A streaming service that quietly went from $12.99 to $17.99.',
      outcome: 'Flagged the day it changed, with the annual cost of the difference.',
    },
    bullets: [
      'Price-change alerts on the day of the charge',
      'Trial-to-paid warnings three days ahead',
      'Duplicate detection across cards and accounts',
      'Cancellation links and the exact renewal date',
    ],
    icon: 'repeat',
  },
  {
    id: 'forecast',
    eyebrow: 'Foresight',
    title: 'A 90-day forecast that copes with irregular income',
    body: 'Known bills, detected recurring charges and your own income pattern, projected forward with a confidence range rather than a single confident-looking line.',
    useCase: {
      scenario: 'Deciding in July whether a September holiday is actually affordable.',
      outcome: 'A projected low point of $2,140 on 4 September, and what would have to change.',
    },
    bullets: [
      'Projected lowest balance, with the date it happens',
      'Confidence range instead of false precision',
      '“What if” — test a purchase before you commit',
      'Alerts when the forecast dips below your floor',
    ],
    icon: 'clock',
  },
  {
    id: 'goals',
    eyebrow: 'Progress',
    title: 'Goals with honest dates',
    body: 'Set the amount and the date; Lumina calculates the monthly contribution and tells you plainly when the two do not agree. Progress updates as the money actually arrives.',
    useCase: {
      scenario: 'A $6,800 trip in April with $450 a month going in.',
      outcome: '“Short by about $400 on the target date. $520 a month clears it.”',
    },
    bullets: [
      'Funded-by dates derived from real contributions',
      'Round-ups and windfall rules per goal',
      'Shared goals on Household plans',
      'Money stays in your own accounts throughout',
    ],
    icon: 'target',
  },
  {
    id: 'ask',
    eyebrow: 'Answers',
    title: 'Ask Lumina',
    body: 'A question box that returns a number and the transactions behind it. Answers are computed from your ledger, never estimated, and every one can be expanded into its evidence.',
    useCase: {
      scenario: '“How much did we spend on the kitchen last year, including the card I closed?”',
      outcome: '$8,412 across 63 transactions and two accounts, listed and exportable.',
    },
    bullets: [
      'Every answer shows its source transactions',
      'Follow-up questions keep the context',
      'Export any answer to CSV',
      'Your data is never used to train shared models',
    ],
    icon: 'sparkle',
  },
];

/* --- Trust --------------------------------------------------------------- */

export type SecurityItem = { title: string; body: string; icon: 'shield' | 'lock' | 'key' | 'globe' | 'eye' | 'users' };

export const securityItems: SecurityItem[] = [
  {
    icon: 'lock',
    title: 'Read-only by design',
    body: 'Connections are read-only. Lumina can see transactions and balances; it cannot move money at your bank, change your details, or open anything in your name.',
  },
  {
    icon: 'key',
    title: 'We never hold your bank password',
    body: 'You sign in on your bank’s own page. Lumina receives a revocable token. There is no credential in our systems to steal, and you can revoke access from either side.',
  },
  {
    icon: 'shield',
    title: 'Encrypted in transit and at rest',
    body: 'TLS 1.3 on every connection, AES-256 at rest, and field-level encryption for account identifiers with keys held in a hardware security module.',
  },
  {
    icon: 'eye',
    title: 'We do not sell your data',
    body: 'Not to advertisers, not to data brokers, not in aggregate. Lumina is funded by subscriptions, which is the whole reason the free plan has limits instead of ads.',
  },
  {
    icon: 'users',
    title: 'Access is minimal and logged',
    body: 'Engineers cannot browse customer data. Support access requires your explicit approval, is time-boxed, and appears in your own account log.',
  },
  {
    icon: 'globe',
    title: 'Your data leaves when you do',
    body: 'Export everything as CSV or PDF at any time. Delete your account and connected data is destroyed within 30 days, backups included.',
  },
];

export const certifications = [
  { name: 'SOC 2 Type II', detail: 'Audited annually by an independent firm' },
  { name: 'ISO 27001', detail: 'Information security management certified' },
  { name: 'GDPR & CCPA', detail: 'Data subject rights honoured in-product' },
  { name: 'PSD2 / Open Banking', detail: 'Regulated aggregation partners only' },
  { name: 'Penetration tested', detail: 'Twice yearly, summary available on request' },
  { name: 'Bug bounty', detail: 'Open program with published response times' },
];

/* --- FAQ ----------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: 'Is it safe to connect my bank?',
    answer:
      'Connections are read-only and made through regulated aggregation partners. You sign in on your bank’s own page, so Lumina never receives your banking password — only a token you can revoke at any time, from your bank or from us. Lumina cannot move money at your institution.',
  },
  {
    question: 'What happens when the free trial ends?',
    answer:
      'Nothing is charged. We do not ask for a card to start a trial, so there is nothing to auto-renew. On day 31 the account simply moves to the free Starter plan and your data stays where it is until you choose a plan or delete it.',
  },
  {
    question: 'Do I have to build a budget before I see anything useful?',
    answer:
      'No. Lumina reads your history first and shows you a categorized picture of the last twelve months before asking you for a single number. Most people spend about four minutes on setup, mostly waiting for their bank.',
  },
  {
    question: 'Will Lumina move my money without asking?',
    answer:
      'Only through rules you create and approve, and only between your own accounts. Every rule respects a balance floor you set, and a single switch pauses all automation. Every automated transfer appears in a log with the reason it ran.',
  },
  {
    question: 'What if my income is irregular?',
    answer:
      'That case shaped the product. Budgets adapt to unusual months instead of declaring failure, forecasts show a confidence range rather than one confident line, and savings rules reduce or skip themselves rather than overdrawing you.',
  },
  {
    question: 'Which countries and institutions are supported?',
    answer:
      'Over 11,000 institutions across the United States, United Kingdom, Canada and the European Union, including the major high-street banks, most credit unions, and the large brokerage and pension providers. Anything unsupported can be tracked as a manual account.',
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: 'Do I need a credit card to start the trial?',
    answer:
      'No. Trials run for 30 days on the Plus plan with no card and no auto-conversion. If you do nothing at the end, the account drops to Starter and keeps working.',
  },
  {
    question: 'What is the difference between monthly and annual?',
    answer:
      'Annual billing is 25% cheaper. Plus is $12 a month, or $108 for the year, which works out at $9 a month. Household is $20 a month, or $192 for the year, which is $16 a month. You can switch cycles at any renewal.',
  },
  {
    question: 'Can I change or cancel my plan?',
    answer:
      'Any time, from Settings, in two clicks and with no retention call. Downgrades take effect at the end of the paid period. Upgrades are prorated to the day.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes. If you cancel an annual plan within 30 days of being billed, we refund it in full. After that we refund the unused whole months on request.',
  },
  {
    question: 'Is the free plan permanently free?',
    answer:
      'Yes, and it is not a countdown. Starter is limited by capability — three accounts, one overall budget, no automation — rather than by time. It is genuinely useful on its own.',
  },
  {
    question: 'How does Household billing work?',
    answer:
      'One subscription covers up to five people. Each person gets their own sign-in, their own private accounts, and control over what they share. There is no per-seat charge inside that limit.',
  },
  {
    question: 'Are taxes included in the price?',
    answer:
      'Prices are shown before sales tax or VAT, which is calculated at checkout from your billing address. UK and EU invoices are VAT-compliant and downloadable from Settings.',
  },
  {
    question: 'Do you have a student or hardship rate?',
    answer:
      'Yes. Full-time students get Plus at 50% with a valid institutional email, and we approve hardship requests without means-testing — write to us and we will sort it out quietly.',
  },
  {
    question: 'What happens to my data if I stop paying?',
    answer:
      'It stays. You move to Starter, keep three connected accounts and full export rights, and nothing is deleted unless you ask. If you come back later, your history is still there.',
  },
];

/* --- Company ------------------------------------------------------------- */

export const principles = [
  {
    title: 'Show the number, then the reason',
    body: 'Every insight names an amount and the transactions behind it. If we cannot show our working, we do not ship the feature.',
  },
  {
    title: 'The default is doing nothing',
    body: 'Automation only runs after you approve it, and one switch stops all of it. A finance product that surprises you has failed, however clever the surprise.',
  },
  {
    title: 'Subscriptions, never surveillance',
    body: 'We are paid by the people whose data we hold. That is the only business model that keeps our interests and yours pointing the same way.',
  },
  {
    title: 'Plain language beats financial vocabulary',
    body: '“You will be about $400 short in April” is more useful than a projected shortfall variance. We write the sentence a good friend would say.',
  },
];

export type TeamMember = { name: string; role: string; initials: string; bio: string };

export const team: TeamMember[] = [
  {
    name: 'Mara Delgado',
    role: 'Co-founder & CEO',
    initials: 'MD',
    bio: 'Ten years building payments infrastructure. Started Lumina after watching a well-paid friend miss a rent payment for the third time in a year.',
  },
  {
    name: 'Ezra Feld',
    role: 'Co-founder & CTO',
    initials: 'EF',
    bio: 'Previously led ledger engineering at a core banking provider. Believes a finance product that cannot show its arithmetic should not exist.',
  },
  {
    name: 'Sofia Andrade',
    role: 'Head of Design',
    initials: 'SA',
    bio: 'Came from clinical software, where a confusing screen has consequences. Runs the research program that reviews every release.',
  },
  {
    name: 'Kwame Boateng',
    role: 'Head of Security',
    initials: 'KB',
    bio: 'Former financial-sector penetration tester. Owns our SOC 2 program and the bug bounty, and reads every report personally.',
  },
  {
    name: 'Yuki Tanabe',
    role: 'Head of Data Science',
    initials: 'YT',
    bio: 'Works on categorization and forecasting. Publishes our accuracy numbers, including the months they go down.',
  },
  {
    name: 'Ruth Ellery',
    role: 'Head of Member Support',
    initials: 'RE',
    bio: 'Built a support team with no scripts and no retention targets. Answers around forty conversations a week herself.',
  },
];

export const milestones = [
  { year: '2021', title: 'Lumina starts as a spreadsheet', body: 'Mara and Ezra rebuild the household budget spreadsheet they had each maintained for years, and realize the hard part was never the arithmetic — it was keeping it current.' },
  { year: '2022', title: 'First 500 members', body: 'A private beta with read-only connections to four banks. Categorization accuracy starts at 71%. Members correct it 14,000 times, and it starts to learn.' },
  { year: '2023', title: 'Automation, with a floor', body: 'Autosave rules ship after nine months of work on the one behavior that mattered: never overdrawing someone to hit a savings target.' },
  { year: '2024', title: 'SOC 2 Type II and Household', body: 'The security program is independently audited. Household mode arrives after two years of requests from couples with separate accounts and shared bills.' },
  { year: '2025', title: 'Forecasting for irregular income', body: 'Confidence ranges replace single-line projections, built with 300 freelance and commission-paid members.' },
  { year: '2026', title: '38,000 members, still subscription-funded', body: 'No advertising, no data sales, no acquisition by a bank. The pledge is written into our terms.' },
];

export const openRoles = [
  { title: 'Senior Backend Engineer, Ledger', location: 'Remote (US / EU)', team: 'Engineering' },
  { title: 'Product Designer, Automation', location: 'San Francisco or remote', team: 'Design' },
  { title: 'Data Scientist, Categorization', location: 'Remote (EU)', team: 'Data' },
  { title: 'Member Support Specialist', location: 'Remote (US)', team: 'Support' },
];

/* --- Coverage ------------------------------------------------------------ */

export const institutionCoverage = [
  { region: 'United States', count: '7,200+', detail: 'Major banks, regional banks, credit unions, brokerages and 401(k) providers' },
  { region: 'United Kingdom', count: '1,600+', detail: 'Open Banking connections to high-street banks, challengers and building societies' },
  { region: 'Canada', count: '900+', detail: 'The big six, credit unions and major card issuers' },
  { region: 'European Union', count: '1,700+', detail: 'PSD2 connections across 14 member states' },
];

export const comparisonRows = [
  {
    approach: 'A spreadsheet',
    strength: 'Total control, no subscription',
    cost: 'Roughly 3 hours a month of maintenance, and it is only accurate on the day you update it.',
  },
  {
    approach: 'Your banking app',
    strength: 'Already installed, accurate for that bank',
    cost: 'Sees one institution. No cross-account view, no goals, and the categories are the bank’s, not yours.',
  },
  {
    approach: 'Classic budgeting apps',
    strength: 'Rich features for people who enjoy budgeting',
    cost: 'Demand that you build and maintain the system. Most people stop in week two.',
  },
  {
    approach: 'Lumina',
    strength: 'Proposes the plan, then runs it',
    cost: 'You review a weekly digest and approve changes. Roughly ten minutes a month.',
  },
];
