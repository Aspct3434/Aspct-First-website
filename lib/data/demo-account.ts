/**
 * Demonstration data for the Lumina dashboard preview.
 *
 * Everything here is invented for the demo — the person, the institutions, the
 * merchants and the balances. The figures are internally consistent (balances
 * roll up to the stated net worth, budgets match the categories they scope,
 * goal projections follow from the monthly contribution) so the interface
 * behaves like the real product rather than like a mockup.
 *
 * "Today" for this dataset is 26 July 2026.
 */

export const demoUser = {
  name: 'Alex Moreau',
  initials: 'AM',
  email: 'alex@moreau.co',
  plan: 'Plus',
  memberSince: 'March 2024',
  timezone: 'America/Chicago',
} as const;

export const asOf = {
  iso: '2026-07-26',
  label: '26 July 2026',
  monthLabel: 'July',
  monthRange: 'Jul 1 – 26',
  daysElapsed: 26,
  daysInMonth: 31,
} as const;

/* --- Accounts ------------------------------------------------------------ */

export type AccountKind = 'checking' | 'savings' | 'credit' | 'investment';

export type Account = {
  id: string;
  name: string;
  institution: string;
  kind: AccountKind;
  mask: string;
  balance: number;
  /** Credit cards only. */
  limit?: number;
  apy?: number;
  changeMonth: number;
  syncedMinutesAgo: number;
};

export const accounts: Account[] = [
  {
    id: 'checking',
    name: 'Everyday Checking',
    institution: 'Meridian Bank',
    kind: 'checking',
    mask: '4417',
    balance: 4182.6,
    changeMonth: 318.4,
    syncedMinutesAgo: 12,
  },
  {
    id: 'savings',
    name: 'High-Yield Savings',
    institution: 'Meridian Bank',
    kind: 'savings',
    mask: '9083',
    balance: 18940.0,
    apy: 4.35,
    changeMonth: 1200.0,
    syncedMinutesAgo: 12,
  },
  {
    id: 'card',
    name: 'Aurora Rewards Card',
    institution: 'Aurora Financial',
    kind: 'credit',
    mask: '2210',
    balance: -1247.85,
    limit: 8000,
    changeMonth: -212.3,
    syncedMinutesAgo: 47,
  },
  {
    id: 'brokerage',
    name: 'Index Portfolio',
    institution: 'Kestrel Invest',
    kind: 'investment',
    mask: '7756',
    balance: 46310.22,
    changeMonth: 1874.55,
    syncedMinutesAgo: 63,
  },
];

export const netWorth = accounts.reduce((total, account) => total + account.balance, 0);

/* --- Trends -------------------------------------------------------------- */

/**
 * The last twelve complete months. July 2026 is still in progress, so it is
 * reported separately as month-to-date rather than plotted as if it were done.
 */
export const cashFlow = {
  labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  moneyIn: [7010, 7010, 7010, 7010, 7010, 8600, 7240, 7240, 7240, 7240, 8410, 7240],
  moneyOut: [5310, 5488, 5122, 5390, 5605, 6480, 5602, 5187, 5934, 5041, 5388, 4874],
};

export const netWorthTrend = {
  labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  values: [
    52100, 53480, 54120, 55980, 57340, 56890, 59210, 61040, 62580, 64330, 66120, 68185,
  ],
};

/** Twelve weeks of spend, for the header stat tile's sparkline. */
export const spendSparkline = [1310, 1188, 1402, 1265, 1190, 1338, 1122, 1240, 1075, 1198, 1044, 986];

/* --- Categories ---------------------------------------------------------- */

export type Category = {
  id: string;
  label: string;
  /** Month-to-date spend. */
  amount: number;
  /** Change against the same point last month, as a share. */
  change: number;
};

export const categories: Category[] = [
  { id: 'housing', label: 'Housing', amount: 2150.0, change: 0 },
  { id: 'groceries', label: 'Groceries', amount: 412.4, change: -0.09 },
  { id: 'dining', label: 'Dining & takeout', amount: 388.15, change: 0.14 },
  { id: 'shopping', label: 'Shopping', amount: 341.2, change: 0.22 },
  { id: 'travel', label: 'Travel', amount: 275.0, change: 1.0 },
  { id: 'transport', label: 'Transport', amount: 214.6, change: 0.04 },
  { id: 'health', label: 'Health & fitness', amount: 189.0, change: 0 },
  { id: 'utilities', label: 'Utilities', amount: 168.9, change: -0.03 },
  { id: 'subscriptions', label: 'Subscriptions', amount: 96.44, change: -0.12 },
];

export const monthToDateSpend = categories.reduce((total, c) => total + c.amount, 0);

/* --- Budgets ------------------------------------------------------------- */

export type Budget = {
  categoryId: string;
  label: string;
  limit: number;
  spent: number;
};

export const budgets: Budget[] = [
  { categoryId: 'groceries', label: 'Groceries', limit: 650, spent: 412.4 },
  { categoryId: 'dining', label: 'Dining & takeout', limit: 400, spent: 388.15 },
  { categoryId: 'shopping', label: 'Shopping', limit: 300, spent: 341.2 },
  { categoryId: 'transport', label: 'Transport', limit: 280, spent: 214.6 },
  { categoryId: 'health', label: 'Health & fitness', limit: 200, spent: 189.0 },
  { categoryId: 'subscriptions', label: 'Subscriptions', limit: 120, spent: 96.44 },
];

/* --- Goals --------------------------------------------------------------- */

export type Goal = {
  id: string;
  name: string;
  saved: number;
  target: number;
  monthly: number;
  /** Human-readable projection, derived from `saved`, `target` and `monthly`. */
  projection: string;
  status: 'on-track' | 'behind' | 'ahead';
  note: string;
};

export const goals: Goal[] = [
  {
    id: 'emergency',
    name: 'Emergency fund',
    saved: 12400,
    target: 18000,
    monthly: 600,
    projection: 'Fully funded by May 2027',
    status: 'on-track',
    note: '3 months of your average outgoings',
  },
  {
    id: 'japan',
    name: 'Japan, April 2027',
    saved: 3150,
    target: 6800,
    monthly: 450,
    projection: 'Short by about $400 on the target date',
    status: 'behind',
    note: 'Raise to $520/mo to arrive funded',
  },
  {
    id: 'laptop',
    name: 'Studio laptop',
    saved: 890,
    target: 2400,
    monthly: 150,
    projection: 'Ready by June 2027 — a month early',
    status: 'ahead',
    note: 'Boosted by May bonus round-ups',
  },
];

/* --- Transactions -------------------------------------------------------- */

export type Transaction = {
  id: string;
  date: string;
  merchant: string;
  categoryId: string;
  accountId: string;
  amount: number;
  pending?: boolean;
  note?: string;
};

export const transactions: Transaction[] = [
  { id: 't-44', date: '2026-07-26', merchant: 'Corner Roastery', categoryId: 'dining', accountId: 'card', amount: -6.4, pending: true },
  { id: 't-43', date: '2026-07-25', merchant: 'Verdant Market', categoryId: 'groceries', accountId: 'card', amount: -86.12 },
  { id: 't-42', date: '2026-07-25', merchant: 'Northline Transit', categoryId: 'transport', accountId: 'card', amount: -32.0, note: 'Monthly pass' },
  { id: 't-41', date: '2026-07-24', merchant: 'Pike & Vine', categoryId: 'dining', accountId: 'card', amount: -74.85 },
  { id: 't-40', date: '2026-07-24', merchant: 'Aurelia Apparel', categoryId: 'shopping', accountId: 'card', amount: -128.0 },
  { id: 't-39', date: '2026-07-23', merchant: 'Meridian Bank — transfer to savings', categoryId: 'savings', accountId: 'checking', amount: -600.0, note: 'Autosave rule: payday sweep' },
  { id: 't-38', date: '2026-07-23', merchant: 'Sunhaus Utilities', categoryId: 'utilities', accountId: 'checking', amount: -168.9 },
  { id: 't-37', date: '2026-07-22', merchant: 'Halcyon Streaming', categoryId: 'subscriptions', accountId: 'card', amount: -17.99, note: 'Price rose from $12.99 in June' },
  { id: 't-36', date: '2026-07-22', merchant: 'Bluebird Pharmacy', categoryId: 'health', accountId: 'card', amount: -34.2 },
  { id: 't-35', date: '2026-07-21', merchant: 'Cobalt Rideshare', categoryId: 'transport', accountId: 'card', amount: -21.4 },
  { id: 't-34', date: '2026-07-20', merchant: 'Verdant Market', categoryId: 'groceries', accountId: 'card', amount: -104.68 },
  { id: 't-33', date: '2026-07-20', merchant: 'Silverline Airways', categoryId: 'travel', accountId: 'card', amount: -275.0, note: 'Tagged to Japan goal' },
  { id: 't-32', date: '2026-07-19', merchant: 'Tenor Coffee', categoryId: 'dining', accountId: 'card', amount: -5.75 },
  { id: 't-31', date: '2026-07-18', merchant: 'Meridian Fitness', categoryId: 'health', accountId: 'checking', amount: -89.0 },
  { id: 't-30', date: '2026-07-17', merchant: 'Kestrel Books', categoryId: 'shopping', accountId: 'card', amount: -41.2 },
  { id: 't-29', date: '2026-07-16', merchant: 'Pike & Vine', categoryId: 'dining', accountId: 'card', amount: -52.3 },
  { id: 't-28', date: '2026-07-15', merchant: 'Northwind Labs', categoryId: 'income', accountId: 'checking', amount: 3620.0, note: 'Salary — second half of July' },
  { id: 't-27', date: '2026-07-15', merchant: 'Ridgeway Property', categoryId: 'housing', accountId: 'checking', amount: -2150.0, note: 'Rent' },
  { id: 't-26', date: '2026-07-14', merchant: 'Nimbus Cloud Storage', categoryId: 'subscriptions', accountId: 'card', amount: -9.99 },
  { id: 't-25', date: '2026-07-14', merchant: 'Verdant Market', categoryId: 'groceries', accountId: 'card', amount: -63.9 },
  { id: 't-24', date: '2026-07-13', merchant: 'Ferro Hardware', categoryId: 'shopping', accountId: 'card', amount: -78.4 },
  { id: 't-23', date: '2026-07-12', merchant: 'Corner Roastery', categoryId: 'dining', accountId: 'card', amount: -12.85 },
  { id: 't-22', date: '2026-07-11', merchant: 'Cobalt Rideshare', categoryId: 'transport', accountId: 'card', amount: -18.6 },
  { id: 't-21', date: '2026-07-10', merchant: 'Wexler Dental', categoryId: 'health', accountId: 'checking', amount: -65.8 },
  { id: 't-20', date: '2026-07-09', merchant: 'Orbit Music', categoryId: 'subscriptions', accountId: 'card', amount: -10.99 },
  { id: 't-19', date: '2026-07-08', merchant: 'Prairie Wines', categoryId: 'dining', accountId: 'card', amount: -46.0 },
  { id: 't-18', date: '2026-07-07', merchant: 'Verdant Market', categoryId: 'groceries', accountId: 'card', amount: -91.3 },
  { id: 't-17', date: '2026-07-06', merchant: 'Aurelia Apparel', categoryId: 'shopping', accountId: 'card', amount: -93.6, note: 'Returned one item — refund pending' },
  { id: 't-16', date: '2026-07-05', merchant: 'Northline Transit', categoryId: 'transport', accountId: 'card', amount: -14.5 },
  { id: 't-15', date: '2026-07-04', merchant: 'Tenor Coffee', categoryId: 'dining', accountId: 'card', amount: -9.4 },
  { id: 't-14', date: '2026-07-03', merchant: 'Sunhaus Utilities — water', categoryId: 'utilities', accountId: 'checking', amount: -42.15 },
  { id: 't-13', date: '2026-07-02', merchant: 'Lantern Coworking', categoryId: 'subscriptions', accountId: 'card', amount: -57.47 },
  { id: 't-12', date: '2026-07-01', merchant: 'Northwind Labs', categoryId: 'income', accountId: 'checking', amount: 3620.0, note: 'Salary — first half of July' },
  { id: 't-11', date: '2026-07-01', merchant: 'Verdant Market', categoryId: 'groceries', accountId: 'card', amount: -66.4 },
  { id: 't-10', date: '2026-06-30', merchant: 'Aurora Financial', categoryId: 'transfer', accountId: 'checking', amount: -1035.15, note: 'Card payment — statement cleared in full' },
  { id: 't-09', date: '2026-06-29', merchant: 'Pike & Vine', categoryId: 'dining', accountId: 'card', amount: -61.2 },
  { id: 't-08', date: '2026-06-29', merchant: 'Atlas Rail', categoryId: 'travel', accountId: 'card', amount: -118.0 },
  { id: 't-07', date: '2026-06-28', merchant: 'Verdant Market', categoryId: 'groceries', accountId: 'card', amount: -74.15 },
  { id: 't-06', date: '2026-06-28', merchant: 'Kestrel Invest', categoryId: 'transfer', accountId: 'checking', amount: -450.0, note: 'Autosave rule: monthly investing' },
  { id: 't-05', date: '2026-06-27', merchant: 'Corner Roastery', categoryId: 'dining', accountId: 'card', amount: -8.15 },
  { id: 't-04', date: '2026-06-27', merchant: 'Sunhaus Utilities', categoryId: 'utilities', accountId: 'checking', amount: -174.2 },
  { id: 't-03', date: '2026-06-26', merchant: 'Meridian Fitness', categoryId: 'health', accountId: 'checking', amount: -89.0 },
  { id: 't-02', date: '2026-06-26', merchant: 'Bluebird Pharmacy', categoryId: 'health', accountId: 'card', amount: -22.6 },
  { id: 't-01', date: '2026-06-25', merchant: 'Halcyon Streaming', categoryId: 'subscriptions', accountId: 'card', amount: -12.99 },
];

export const categoryLabels: Record<string, string> = {
  ...Object.fromEntries(categories.map((c) => [c.id, c.label])),
  income: 'Income',
  savings: 'Savings transfer',
  transfer: 'Transfer',
};

export const accountLabels: Record<string, string> = Object.fromEntries(
  accounts.map((a) => [a.id, a.name]),
);

/* --- Recurring charges --------------------------------------------------- */

export type Subscription = {
  merchant: string;
  amount: number;
  cadence: 'Monthly' | 'Annual';
  nextCharge: string;
  flag?: string;
};

export const subscriptions: Subscription[] = [
  { merchant: 'Halcyon Streaming', amount: 17.99, cadence: 'Monthly', nextCharge: '2026-08-22', flag: 'Up $5.00 since June' },
  { merchant: 'Lantern Coworking', amount: 57.47, cadence: 'Monthly', nextCharge: '2026-08-02' },
  { merchant: 'Orbit Music', amount: 10.99, cadence: 'Monthly', nextCharge: '2026-08-09' },
  { merchant: 'Nimbus Cloud Storage', amount: 9.99, cadence: 'Monthly', nextCharge: '2026-08-14', flag: 'Unused for 4 months' },
  { merchant: 'Cascade Insurance', amount: 742.0, cadence: 'Annual', nextCharge: '2027-03-11' },
];

/* --- Insights ------------------------------------------------------------ */

export type Insight = {
  id: string;
  kind: 'watch' | 'save' | 'plan';
  title: string;
  body: string;
  action: string;
  /** Confirmation copy shown after the action is taken. */
  confirmation: string;
  impact?: string;
};

export const insights: Insight[] = [
  {
    id: 'i-1',
    kind: 'watch',
    title: 'Dining will pass its limit on Sunday',
    body: 'You are at $388.15 of $400 with 5 days left in July. Your last three Julys averaged $61 more in the final week.',
    action: 'Move $75 from Shopping',
    confirmation: 'Moved $75 from Shopping to Dining & takeout for July.',
    impact: 'Keeps July inside budget',
  },
  {
    id: 'i-2',
    kind: 'save',
    title: 'Halcyon Streaming raised its price',
    body: 'It went from $12.99 to $17.99 on 22 June without an email. That is $60 more over a year.',
    action: 'Add a price-change alert',
    confirmation: 'You will be alerted the next time a recurring charge changes.',
    impact: '$60 / year',
  },
  {
    id: 'i-3',
    kind: 'save',
    title: '$2,682 is sitting idle in checking',
    body: 'Your checking has stayed above your $1,500 buffer for 90 days straight. Your savings account pays 4.35% APY.',
    action: 'Sweep to savings',
    confirmation: 'A $2,682 transfer to High-Yield Savings is scheduled for tomorrow.',
    impact: '≈ $101 by 31 Dec',
  },
  {
    id: 'i-4',
    kind: 'plan',
    title: 'Japan is $400 short on the target date',
    body: 'At $450 a month you reach $6,400 of $6,800 by April 2027. Raising it to $520 still clears your buffer in all six of the last six months.',
    action: 'Raise to $520 / month',
    confirmation: 'Your Japan goal now saves $520 a month, starting 1 August.',
    impact: 'Arrives funded',
  },
];

/* --- Derived helpers ----------------------------------------------------- */

export const monthlyAverages = {
  income: cashFlow.moneyIn.reduce((a, b) => a + b, 0) / cashFlow.moneyIn.length,
  spend: cashFlow.moneyOut.reduce((a, b) => a + b, 0) / cashFlow.moneyOut.length,
};

export const savingsRate =
  (1 - monthlyAverages.spend / monthlyAverages.income) * 100;
