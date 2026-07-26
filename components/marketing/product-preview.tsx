import { Bell, ChartLine, Home, Repeat, Search, Sparkle, Target } from '@/components/icons';
import { Meter, budgetSeverity } from '@/components/charts/meter';
import { TrendChart } from '@/components/charts/trend-chart';
import { LuminaMark } from '@/components/ui/logo';
import { budgets, demoUser, netWorth, netWorthTrend } from '@/lib/data/demo-account';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * The product shot in the hero is the product.
 *
 * Rather than a flat image, this renders the same components the dashboard uses,
 * with the same demonstration data — so it is crisp at every density, readable
 * by screen readers, and can never drift out of date with the real interface.
 */
export function ProductPreview({ className }: { className?: string }) {
  const navItems = [
    { icon: Home, label: 'Overview', active: true },
    { icon: ChartLine, label: 'Spending' },
    { icon: Target, label: 'Goals' },
    { icon: Repeat, label: 'Recurring' },
  ];

  return (
    <div
      className={cn(
        '@container overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-line-2',
        className,
      )}
    >
      {/* App chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-3">
        <LuminaMark className="size-6" />
        <div className="flex h-7 flex-1 items-center gap-2 rounded-full bg-card px-3 text-[0.75rem] text-text-3 ring-1 ring-line">
          <Search className="size-3.5" aria-hidden="true" />
          <span>Ask Lumina — “what did I spend on travel this spring?”</span>
        </div>
        <Bell className="size-4 text-text-3" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="flex size-7 items-center justify-center rounded-full bg-brand-700 text-[0.6875rem] font-semibold text-white"
        >
          {demoUser.initials}
        </span>
      </div>

      <div className="flex">
        {/* Rail */}
        <nav
          aria-hidden="true"
          className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-line bg-paper py-4 @2xl:flex"
        >
          {navItems.map(({ icon: Glyph, label, active }) => (
            <span
              key={label}
              className={cn(
                'flex size-9 items-center justify-center rounded-lg text-[1.15rem]',
                active ? 'bg-brand-50 text-brand-700' : 'text-text-3',
              )}
            >
              <Glyph />
            </span>
          ))}
        </nav>

        <div className="min-w-0 flex-1 p-4 @2xl:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[0.75rem] text-text-3">Net worth</p>
              <p className="text-2xl font-semibold tracking-[-0.02em] text-text @2xl:text-[1.75rem]">
                {formatCurrency(netWorth)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-positive-soft px-2.5 py-1 text-[0.75rem] font-semibold text-positive">
              <span aria-hidden="true">↑</span> $2,065 this month
            </div>
          </div>

          <div className="mt-4 grid gap-5 @3xl:grid-cols-[1.55fr_1fr]">
            <div className="min-w-0">
              <TrendChart
                ariaLabel="Net worth over the last twelve months, rising from $52,100 in August to $68,185 in July."
                labels={netWorthTrend.labels}
                series={[
                  {
                    id: 'net-worth',
                    label: 'Net worth',
                    color: 'var(--color-brand-500)',
                    values: netWorthTrend.values,
                    fill: true,
                  },
                ]}
                height={168}
                valueFormat="compact"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <div>
                <p className="text-[0.8125rem] font-semibold text-text">July budgets</p>
                <ul className="mt-3 space-y-3">
                  {budgets.slice(0, 3).map((budget) => {
                    const severity = budgetSeverity(budget.spent, budget.limit);
                    const left = budget.limit - budget.spent;
                    return (
                      <li key={budget.categoryId}>
                        <div className="flex items-baseline justify-between gap-2 text-[0.75rem]">
                          <span className="truncate text-text-2">{budget.label}</span>
                          <span
                            className={cn(
                              'shrink-0 font-semibold tabular',
                              severity === 'over' ? 'text-negative' : 'text-text-2',
                            )}
                          >
                            {left >= 0
                              ? `${formatCurrency(left, true)} left`
                              : `${formatCurrency(Math.abs(left), true)} over`}
                          </span>
                        </div>
                        <Meter
                          className="mt-1.5"
                          size="sm"
                          value={budget.spent}
                          max={budget.limit}
                          severity={severity}
                          label={`${budget.label} budget`}
                          valueText={`${formatCurrency(budget.spent)} of ${formatCurrency(budget.limit, true)} spent`}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-lg bg-brand-50 p-3.5 ring-1 ring-brand-200/70">
                <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-brand-700 uppercase">
                  <Sparkle className="size-3.5" aria-hidden="true" />
                  Insight
                </p>
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-text-2">
                  $2,682 has sat above your buffer for 90 days. Moving it to savings earns about
                  <span className="font-semibold text-text"> $101 by 31 Dec</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
