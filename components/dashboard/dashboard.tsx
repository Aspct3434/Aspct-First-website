'use client';

import { useMemo, useState } from 'react';
import { Bank, Clock, CreditCard, Layers, Repeat, Target, TrendUp } from '@/components/icons';
import { CategoryBars } from '@/components/charts/category-bars';
import { ChartFrame, DataTable } from '@/components/charts/chart-frame';
import { Meter, budgetSeverity } from '@/components/charts/meter';
import { Sparkline } from '@/components/charts/sparkline';
import { TrendChart } from '@/components/charts/trend-chart';
import { InsightsPanel } from '@/components/dashboard/insights-panel';
import { TransactionsPanel } from '@/components/dashboard/transactions-panel';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Segmented } from '@/components/ui/form';
import { Stat } from '@/components/ui/stat';
import {
  accounts,
  asOf,
  budgets,
  cashFlow,
  categories,
  demoUser,
  goals,
  monthToDateSpend,
  netWorth,
  savingsRate,
  spendSparkline,
  subscriptions,
} from '@/lib/data/demo-account';
import { formatCompactCurrency, formatCurrency, formatDateShort } from '@/lib/utils';
import { cn } from '@/lib/utils';

const accountIcons = {
  checking: Bank,
  savings: TrendUp,
  credit: CreditCard,
  investment: Layers,
} as const;

function SectionShell({
  id,
  title,
  description,
  action,
  children,
  className,
}: {
  id: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn('scroll-mt-24', className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h2 id={`${id}-heading`} className="text-xl font-semibold text-text">
            {title}
          </h2>
          {description ? <p className="mt-1 text-[0.9375rem] text-text-2">{description}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl bg-card p-6 ring-1 ring-line', className)}>{children}</div>
  );
}

export function Dashboard() {
  const [window, setWindow] = useState<'6' | '12'>('12');

  const months = window === '6' ? 6 : 12;
  const trend = useMemo(
    () => ({
      labels: cashFlow.labels.slice(-months),
      moneyIn: cashFlow.moneyIn.slice(-months),
      moneyOut: cashFlow.moneyOut.slice(-months),
    }),
    [months],
  );

  const averages = useMemo(() => {
    const inSum = trend.moneyIn.reduce((a, b) => a + b, 0);
    const outSum = trend.moneyOut.reduce((a, b) => a + b, 0);
    return {
      in: inSum / trend.moneyIn.length,
      out: outSum / trend.moneyOut.length,
      kept: (inSum - outSum) / trend.moneyIn.length,
    };
  }, [trend]);

  const projectedSpend = (monthToDateSpend / asOf.daysElapsed) * asOf.daysInMonth;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-10 lg:gap-16">
      {/* --- Overview ---------------------------------------------------- */}
      <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-24">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 id="overview-heading" className="font-display text-display-3 font-normal text-text">
              Good afternoon, {demoUser.name.split(' ')[0]}
            </h1>
            <p className="mt-2 text-[0.9375rem] text-text-2">
              {asOf.label} · {asOf.monthRange} of {asOf.monthLabel}, {asOf.daysInMonth - asOf.daysElapsed}{' '}
              days left in the month
            </p>
          </div>
          <Badge tone="citrine">Interactive demo · sample data</Badge>
        </div>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 xl:grid-cols-4">
          <div className="bg-card p-6">
            <Stat
              label="Net worth"
              value={formatCurrency(netWorth)}
              delta={{ direction: 'up', text: '$2,065', isGood: true }}
              hint="this month"
            />
          </div>
          <div className="bg-card p-6">
            <Stat
              label={`Spent in ${asOf.monthLabel} so far`}
              value={formatCurrency(monthToDateSpend)}
              delta={{ direction: 'down', text: '8%', isGood: true }}
              hint={`on pace for ${formatCompactCurrency(projectedSpend)}`}
              trend={<Sparkline values={spendSparkline} />}
            />
          </div>
          <div className="bg-card p-6">
            <Stat
              label="Money in this month"
              value={formatCurrency(7240, true)}
              hint="Next payday 1 Aug"
            />
          </div>
          <div className="bg-card p-6">
            <Stat
              label={`Savings rate, last ${months} months`}
              value={`${savingsRate.toFixed(1)}%`}
              delta={{ direction: 'up', text: '3.1 pts', isGood: true }}
              hint="vs the year before"
            />
          </div>
        </dl>

        <div className="mt-8">
          <h2 className="text-base font-semibold text-text">Accounts</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {accounts.map((account) => {
              const Glyph = accountIcons[account.kind];
              const isDebt = account.balance < 0;
              return (
                <li key={account.id}>
                  <Panel className="flex h-full flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-paper-2 text-[1.1rem] text-text-2 ring-1 ring-line">
                        <Glyph />
                      </span>
                      <span className="flex items-center gap-1.5 text-[0.75rem] text-text-3">
                        <Clock className="size-3.5" aria-hidden="true" />
                        {account.syncedMinutesAgo}m ago
                      </span>
                    </div>
                    <p className="mt-4 text-[0.875rem] font-medium text-text">{account.name}</p>
                    <p className="text-[0.75rem] text-text-3">
                      {account.institution} ····{account.mask}
                    </p>
                    <p className="mt-3 text-xl font-semibold tracking-[-0.01em] text-text">
                      {isDebt ? '−' : ''}
                      {formatCurrency(Math.abs(account.balance))}
                      {isDebt ? <span className="sr-only"> owed</span> : null}
                    </p>
                    {account.apy ? (
                      <p className="mt-2 text-[0.75rem] font-medium text-positive">
                        {account.apy}% APY
                      </p>
                    ) : null}
                    {account.limit ? (
                      <div className="mt-3">
                        <Meter
                          size="sm"
                          value={Math.abs(account.balance)}
                          max={account.limit}
                          severity="ontrack"
                          label={`${account.name} credit used`}
                          valueText={`${formatCurrency(Math.abs(account.balance))} of ${formatCurrency(
                            account.limit,
                            true,
                          )} limit used`}
                        />
                        <p className="mt-1.5 text-[0.75rem] text-text-3">
                          {Math.round((Math.abs(account.balance) / account.limit) * 100)}% of{' '}
                          {formatCompactCurrency(account.limit)} limit
                        </p>
                      </div>
                    ) : null}
                  </Panel>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* --- Cash flow ---------------------------------------------------- */}
      <SectionShell
        id="cashflow"
        title="Cash flow"
        description="Money in against money out, on one axis and one scale."
        action={
          <Segmented
            name="window"
            legend="Trend window"
            size="sm"
            value={window}
            onChange={setWindow}
            options={[
              { value: '6', label: 'Last 6 months' },
              { value: '12', label: 'Last 12 months' },
            ]}
          />
        }
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_16rem]">
          <Panel>
            <ChartFrame
              title="Money in and money out"
              description={`Complete months only — ${asOf.monthLabel} is still in progress.`}
              legend={[
                { label: 'Money in', color: 'var(--color-brand-500)' },
                { label: 'Money out', color: 'var(--color-clay-500)' },
              ]}
              caption="Demonstration data for a fictional member. Hover, or focus the chart and use the arrow keys, to read any month."
              table={
                <DataTable
                  columns={['Month', 'Money in', 'Money out', 'Kept']}
                  rows={trend.labels.map((label, index) => [
                    label,
                    formatCurrency(trend.moneyIn[index], true),
                    formatCurrency(trend.moneyOut[index], true),
                    formatCurrency(trend.moneyIn[index] - trend.moneyOut[index], true),
                  ])}
                  caption="Money in, money out and the difference, by month."
                />
              }
            >
              <TrendChart
                ariaLabel={`Money in and money out for the last ${months} complete months. Money in averages ${formatCurrency(
                  averages.in,
                  true,
                )}, money out ${formatCurrency(averages.out, true)}.`}
                labels={trend.labels}
                series={[
                  {
                    id: 'in',
                    label: 'Money in',
                    color: 'var(--color-brand-500)',
                    values: trend.moneyIn,
                  },
                  {
                    id: 'out',
                    label: 'Money out',
                    color: 'var(--color-clay-500)',
                    values: trend.moneyOut,
                  },
                ]}
                height={280}
                valueFormat="compact"
              />
            </ChartFrame>
          </Panel>

          <Panel className="flex flex-col justify-center gap-6">
            <Stat
              size="sm"
              label={`Average in, ${months} months`}
              value={formatCurrency(averages.in, true)}
            />
            <div className="rule" aria-hidden="true" />
            <Stat
              size="sm"
              label={`Average out, ${months} months`}
              value={formatCurrency(averages.out, true)}
            />
            <div className="rule" aria-hidden="true" />
            <Stat
              size="sm"
              label="Average kept each month"
              value={formatCurrency(averages.kept, true)}
              hint={`${savingsRate.toFixed(1)}% of income`}
            />
          </Panel>
        </div>
      </SectionShell>

      {/* --- Spending & budgets ------------------------------------------- */}
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-8">
        <SectionShell
          id="spending"
          title="Where it went"
          description={`${asOf.monthLabel} ${asOf.monthRange}, ${formatCurrency(monthToDateSpend)} across nine categories.`}
        >
          <Panel>
            <CategoryBars data={categories} total={monthToDateSpend} />
            <p className="mt-6 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-text-3">
              Percentages are share of month-to-date spending. Changes compare with the same point
              in June.
            </p>
          </Panel>
        </SectionShell>

        <SectionShell
          id="budgets"
          title="Budgets"
          description="Pace through the month, not just the damage at the end of it."
        >
          <Panel>
            <ul className="flex flex-col gap-5">
              {budgets.map((budget) => {
                const severity = budgetSeverity(budget.spent, budget.limit);
                const left = budget.limit - budget.spent;
                return (
                  <li key={budget.categoryId}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[0.9375rem] font-medium text-text">{budget.label}</span>
                      <span className="text-[0.8125rem] text-text-3 tabular">
                        {formatCurrency(budget.spent)} of {formatCurrency(budget.limit, true)}
                      </span>
                    </div>
                    <Meter
                      className="mt-2"
                      value={budget.spent}
                      max={budget.limit}
                      severity={severity}
                      label={`${budget.label} budget`}
                      valueText={`${formatCurrency(budget.spent)} of ${formatCurrency(
                        budget.limit,
                        true,
                      )} spent`}
                    />
                    <p
                      className={cn(
                        'mt-1.5 text-[0.8125rem] font-medium',
                        severity === 'over'
                          ? 'text-negative'
                          : severity === 'watch'
                            ? 'text-caution'
                            : 'text-text-3',
                      )}
                    >
                      {severity === 'over'
                        ? `${formatCurrency(Math.abs(left))} over — borrowed from August`
                        : severity === 'watch'
                          ? `${formatCurrency(left)} left, and 5 days to go`
                          : `${formatCurrency(left)} left · on pace`}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </SectionShell>
      </div>

      {/* --- Goals -------------------------------------------------------- */}
      <SectionShell
        id="goals"
        title="Savings goals"
        description="Dates calculated from what actually arrives, not what you meant to save."
        action={
          <ButtonLink href="/features/#goals" variant="ghost" size="sm">
            How goals work
          </ButtonLink>
        }
      >
        <ul className="grid gap-5 lg:grid-cols-3">
          {goals.map((goal) => {
            const percent = Math.round((goal.saved / goal.target) * 100);
            const statusTone =
              goal.status === 'behind'
                ? 'caution'
                : goal.status === 'ahead'
                  ? 'positive'
                  : 'brand';
            return (
              <li key={goal.id}>
                <Panel className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-iris-100 text-[1.1rem] text-iris-700">
                      <Target />
                    </span>
                    <Badge tone={statusTone}>
                      {goal.status === 'on-track'
                        ? 'On track'
                        : goal.status === 'ahead'
                          ? 'Ahead'
                          : 'Behind'}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-[1.0625rem] font-semibold text-text">{goal.name}</h3>
                  <p className="mt-1 text-[0.8125rem] text-text-3">{goal.note}</p>

                  <p className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-text">
                    {formatCurrency(goal.saved, true)}
                    <span className="ml-1.5 text-[0.9375rem] font-normal text-text-3">
                      of {formatCurrency(goal.target, true)}
                    </span>
                  </p>

                  <Meter
                    className="mt-3"
                    value={goal.saved}
                    max={goal.target}
                    severity="goal"
                    label={`${goal.name} progress`}
                    valueText={`${formatCurrency(goal.saved, true)} of ${formatCurrency(
                      goal.target,
                      true,
                    )} saved, ${percent} percent`}
                  />

                  <div className="mt-auto flex items-baseline justify-between gap-3 pt-4">
                    <span className="text-[0.8125rem] text-text-3">
                      {formatCurrency(goal.monthly, true)} / month
                    </span>
                    <span className="text-[0.8125rem] font-semibold text-text-2 tabular">
                      {percent}%
                    </span>
                  </div>
                  <p className="mt-2 border-t border-line pt-3 text-[0.8125rem] text-text-2">
                    {goal.projection}
                  </p>
                </Panel>
              </li>
            );
          })}
        </ul>
      </SectionShell>

      {/* --- Insights ----------------------------------------------------- */}
      <SectionShell
        id="insights"
        title="What Lumina noticed"
        description="Four things worth two minutes of your attention this week."
      >
        <InsightsPanel />
      </SectionShell>

      {/* --- Transactions -------------------------------------------------- */}
      <SectionShell
        id="transactions"
        title="Transactions"
        description="Search, filter by category or account, and open any row for the detail."
      >
        <TransactionsPanel />
      </SectionShell>

      {/* --- Recurring ----------------------------------------------------- */}
      <SectionShell
        id="recurring"
        title="Recurring charges"
        description="Detected from your history — not from a list you have to keep up to date."
      >
        <Panel>
          <ul className="divide-y divide-line">
            {subscriptions.map((subscription) => (
              <li
                key={subscription.merchant}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-paper-2 text-[1.05rem] text-text-2 ring-1 ring-line">
                    <Repeat />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[0.9375rem] font-medium text-text">
                      {subscription.merchant}
                    </p>
                    <p className="text-[0.8125rem] text-text-3">
                      {subscription.cadence} · next charge {formatDateShort(subscription.nextCharge)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {subscription.flag ? (
                    <Badge tone="caution">{subscription.flag}</Badge>
                  ) : null}
                  <p className="text-[0.9375rem] font-semibold text-text tabular">
                    {formatCurrency(subscription.amount)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </SectionShell>

      <footer className="rounded-xl bg-ink p-6 text-on-ink on-ink sm:p-8">
        <h2 className="font-display text-2xl text-on-ink">Ready to see your own numbers here?</h2>
        <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-on-ink-2">
          Everything on this page is demonstration data for a fictional member. Connect one account
          and this becomes your money — read-only, 30 days free, no card.
        </p>
        <div className="mt-6 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/signup/" variant="onInk" size="md">
            Start your free trial
          </ButtonLink>
          <ButtonLink href="/security/" variant="onInkGhost" size="md">
            How your data is protected
          </ButtonLink>
        </div>
      </footer>
    </div>
  );
}
