'use client';

import { useState } from 'react';
import { Check, Info, Minus } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Segmented } from '@/components/ui/form';
import { annualDiscountPercent, plans, trial } from '@/lib/data/pricing';
import { cn } from '@/lib/utils';

export type BillingCycle = 'monthly' | 'annual';

/**
 * Plan cards with a billing toggle.
 *
 * The toggle is a real radio group, so it is keyboard-operable and announced
 * correctly. Prices are stated per month in both cycles with the yearly invoice
 * spelled out underneath — a "$9/mo" that is silently billed as $108 is the
 * kind of thing that erodes trust in a finance brand.
 */
export function PricingPlans({ compact = false }: { compact?: boolean }) {
  const [cycle, setCycle] = useState<BillingCycle>('annual');

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <Segmented
          name="billing"
          legend="Billing cycle"
          value={cycle}
          onChange={setCycle}
          options={[
            { value: 'monthly', label: 'Monthly' },
            {
              value: 'annual',
              label: 'Annual',
              suffix: (
                <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[0.6875rem] font-semibold text-white">
                  −{annualDiscountPercent}%
                </span>
              ),
            },
          ]}
        />
        <p aria-live="polite" className="text-[0.8125rem] text-text-3">
          {cycle === 'annual'
            ? `Annual billing saves ${annualDiscountPercent}%. Prices shown per month.`
            : 'Monthly billing. Switch to annual at any renewal.'}
        </p>
      </div>

      <div
        className={cn(
          'mt-10 grid items-start gap-6 lg:grid-cols-3',
          compact ? 'lg:gap-6' : 'lg:gap-7',
        )}
      >
        {plans.map((plan) => {
          const price = cycle === 'annual' ? plan.annual : plan.monthly;
          const isFree = plan.monthly === 0;

          return (
            <div
              key={plan.id}
              className={cn(
                'relative flex h-full flex-col rounded-xl p-7 sm:p-8',
                plan.recommended
                  ? 'bg-card shadow-lg ring-2 ring-brand-600 lg:-my-3 lg:py-11'
                  : 'bg-card shadow-xs ring-1 ring-line',
              )}
            >
              {plan.recommended ? (
                <span className="absolute -top-3 left-7 rounded-full bg-brand-600 px-3 py-1 text-[0.75rem] font-semibold text-white shadow-sm">
                  Most popular
                </span>
              ) : null}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-text">{plan.name}</h3>
                {plan.id === 'starter' ? <Badge tone="neutral">Free forever</Badge> : null}
              </div>
              <p className="mt-2 text-[0.9375rem] text-text-2">{plan.tagline}</p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="text-5xl font-semibold tracking-[-0.03em] text-text">
                  ${price}
                </span>
                <span className="pb-2 text-[0.9375rem] text-text-3">/ month</span>
              </div>
              <p className="mt-2 min-h-5 text-[0.8125rem] text-text-3">
                {isFree
                  ? 'No card, no expiry'
                  : cycle === 'annual'
                    ? `$${plan.annualTotal} billed once a year`
                    : `$${plan.monthly} billed monthly`}
              </p>

              <ButtonLink
                href={plan.cta.href}
                variant={plan.recommended ? 'primary' : 'secondary'}
                size="lg"
                full
                className="mt-6"
              >
                {plan.cta.label}
              </ButtonLink>

              <p className="mt-4 text-[0.8125rem] leading-snug text-text-3">{plan.audience}</p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {(compact ? plan.highlights.slice(0, 5) : plan.highlights).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-[0.9375rem] text-text-2">
                    <Check className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg bg-paper-2 p-4">
                <p className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
                  <Info className="size-3.5" aria-hidden="true" />
                  What it does not do
                </p>
                <ul className="mt-2.5 space-y-2">
                  {plan.limits.map((limit) => (
                    <li key={limit} className="flex items-start gap-2 text-[0.8125rem] text-text-3">
                      <Minus className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      <span>{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-text-3">
        {trial.days}-day free trial on {trial.planOnTrial}. No card required. Prices exclude sales
        tax and VAT.
      </p>
    </div>
  );
}
