import { AlertTriangle, ArrowRight, Bolt, Check, Repeat, Sparkle } from '@/components/icons';
import { Meter, budgetSeverity } from '@/components/charts/meter';
import { budgets, subscriptions } from '@/lib/data/demo-account';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Interface vignettes.
 *
 * Each one is a slice of the real dashboard rather than an illustration, so the
 * feature story is told with the product itself. They are static by design —
 * the interactive versions live at /app — but they use the same components,
 * tokens and demonstration data.
 */

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl bg-card p-5 shadow-md ring-1 ring-line sm:p-6', className)}>
      {children}
    </div>
  );
}

export function BudgetVignette() {
  return (
    <Frame>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-text">July budgets</p>
        <p className="text-[0.8125rem] text-text-3">5 days left</p>
      </div>

      <ul className="mt-5 space-y-4">
        {budgets.slice(0, 4).map((budget) => {
          const severity = budgetSeverity(budget.spent, budget.limit);
          const left = budget.limit - budget.spent;
          return (
            <li key={budget.categoryId}>
              <div className="flex items-baseline justify-between gap-3 text-[0.8125rem]">
                <span className="truncate font-medium text-text">{budget.label}</span>
                <span className="shrink-0 text-text-3 tabular">
                  {formatCurrency(budget.spent)} of {formatCurrency(budget.limit, true)}
                </span>
              </div>
              <Meter
                className="mt-2"
                value={budget.spent}
                max={budget.limit}
                severity={severity}
                label={`${budget.label} budget`}
                valueText={`${formatCurrency(budget.spent)} of ${formatCurrency(budget.limit, true)} spent`}
              />
              <p
                className={cn(
                  'mt-1.5 text-[0.75rem] font-medium',
                  severity === 'over' ? 'text-negative' : severity === 'watch' ? 'text-caution' : 'text-text-3',
                )}
              >
                {left >= 0
                  ? `${formatCurrency(left, true)} left · on pace`
                  : `${formatCurrency(Math.abs(left), true)} over · borrowed from August`}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center gap-3 rounded-lg bg-brand-50 px-4 py-3 ring-1 ring-brand-200/70">
        <Sparkle className="size-4 shrink-0 text-brand-700" aria-hidden="true" />
        <p className="text-[0.8125rem] leading-snug text-text-2">
          Shopping is $41 over. Move it from Travel, which is $180 under?
        </p>
      </div>
    </Frame>
  );
}

export function AutomationVignette() {
  return (
    <Frame>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text">Payday sweep</p>
          <p className="mt-0.5 text-[0.8125rem] text-text-3">
            Everyday Checking → High-Yield Savings
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-positive-soft px-2.5 py-1 text-[0.75rem] font-semibold text-positive ring-1 ring-positive/20">
          <Bolt className="size-3.5" aria-hidden="true" />
          Active
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-4">
        <div>
          <dt className="text-[0.75rem] text-text-3">Amount</dt>
          <dd className="mt-1 text-lg font-semibold text-text">$600</dd>
        </div>
        <div>
          <dt className="text-[0.75rem] text-text-3">Balance floor</dt>
          <dd className="mt-1 text-lg font-semibold text-text">$1,500</dd>
        </div>
      </dl>

      <p className="mt-4 text-[0.75rem] font-semibold tracking-[0.1em] text-text-3 uppercase">
        Recent runs
      </p>
      <ul className="mt-3 space-y-3">
        <li className="flex items-start gap-3">
          <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden="true" />
          <p className="text-[0.8125rem] leading-snug text-text-2">
            <span className="font-semibold text-text">23 Jul · $600 moved.</span> Balance stayed
            $2,014 above your floor.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-caution" aria-hidden="true" />
          <p className="text-[0.8125rem] leading-snug text-text-2">
            <span className="font-semibold text-text">23 Jun · $180 moved instead.</span> The full
            $600 would have taken you $420 below your floor, so Lumina reduced it and told you why.
          </p>
        </li>
      </ul>
    </Frame>
  );
}

export function SubscriptionVignette() {
  return (
    <Frame>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-text">Recurring charges</p>
        <p className="text-[0.8125rem] text-text-3">$96.44 / month</p>
      </div>

      <ul className="mt-4 divide-y divide-line">
        {subscriptions.slice(0, 4).map((subscription) => (
          <li key={subscription.merchant} className="flex items-start justify-between gap-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[0.9375rem] font-medium text-text">
                {subscription.merchant}
              </p>
              <p className="mt-0.5 text-[0.75rem] text-text-3">
                {subscription.cadence} · next {formatDateShort(subscription.nextCharge)}
              </p>
              {subscription.flag ? (
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-caution-soft px-2 py-0.5 text-[0.75rem] font-semibold text-caution">
                  <Repeat className="size-3" aria-hidden="true" />
                  {subscription.flag}
                </p>
              ) : null}
            </div>
            <p className="shrink-0 text-[0.9375rem] font-semibold text-text tabular">
              {formatCurrency(subscription.amount)}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-4 flex items-center gap-2 text-[0.8125rem] font-semibold text-brand-700">
        Two items need attention
        <ArrowRight className="size-4" aria-hidden="true" />
      </p>
    </Frame>
  );
}

export function ForecastVignette() {
  return (
    <Frame>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-text">90-day forecast</p>
        <p className="text-[0.8125rem] text-text-3">Everyday Checking</p>
      </div>

      <div className="mt-4 rounded-lg bg-caution-soft px-4 py-3 ring-1 ring-caution/20">
        <p className="text-[0.75rem] font-semibold tracking-[0.1em] text-caution uppercase">
          Projected low point
        </p>
        <p className="mt-1 text-2xl font-semibold text-text">$2,140</p>
        <p className="mt-0.5 text-[0.8125rem] text-text-2">
          On 4 September, $640 above your floor. Confidence range $1,780 – $2,510.
        </p>
      </div>

      <ul className="mt-5 space-y-3">
        {[
          { label: 'Rent · Ridgeway Property', detail: '1st of each month', amount: '$2,150' },
          { label: 'Salary · Northwind Labs', detail: '1st and 15th', amount: '+$3,620' },
          { label: 'Detected recurring charges', detail: '9 charges', amount: '$96.44' },
        ].map((item) => (
          <li key={item.label} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-[0.875rem] font-medium text-text">{item.label}</p>
              <p className="text-[0.75rem] text-text-3">{item.detail}</p>
            </div>
            <p className="shrink-0 text-[0.875rem] font-semibold text-text tabular">{item.amount}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-snug text-text-3">
        A $1,400 purchase in August would take the low point to $740 — below your floor on 2
        September.
      </p>
    </Frame>
  );
}

export function AskVignette() {
  return (
    <Frame>
      <div className="flex items-center gap-2.5 rounded-full bg-paper-2 px-4 py-2.5 ring-1 ring-line">
        <Sparkle className="size-4 shrink-0 text-brand-700" aria-hidden="true" />
        <p className="truncate text-[0.875rem] text-text-2">
          How much did I spend on travel last spring?
        </p>
      </div>

      <div className="mt-5">
        <p className="text-3xl font-semibold tracking-[-0.02em] text-text">$2,481.60</p>
        <p className="mt-1.5 text-[0.875rem] text-text-2">
          Across 14 transactions between 1 March and 31 May 2026, in two accounts.
        </p>
      </div>

      <p className="mt-5 text-[0.75rem] font-semibold tracking-[0.1em] text-text-3 uppercase">
        Where this comes from
      </p>
      <ul className="mt-3 divide-y divide-line">
        {[
          { merchant: 'Silverline Airways', date: '12 Apr', amount: '$742.00' },
          { merchant: 'Atlas Rail', date: '3 Apr', amount: '$118.00' },
          { merchant: 'Harbour Lodge', date: '2 Apr', amount: '$586.40' },
        ].map((row) => (
          <li key={row.merchant} className="flex items-center justify-between gap-4 py-2.5">
            <span className="truncate text-[0.875rem] text-text">{row.merchant}</span>
            <span className="shrink-0 text-[0.75rem] text-text-3">{row.date}</span>
            <span className="shrink-0 text-[0.875rem] font-semibold text-text tabular">
              {row.amount}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.8125rem] text-text-3">+ 11 more · export to CSV</p>
    </Frame>
  );
}
