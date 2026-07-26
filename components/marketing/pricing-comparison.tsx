import { Check, Minus } from '@/components/icons';
import { comparison, plans } from '@/lib/data/pricing';
import { cn } from '@/lib/utils';

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto size-5 text-brand-600" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="mx-auto size-5 text-text-3/60" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[0.875rem] text-text-2">{value}</span>;
}

/**
 * Full feature matrix.
 *
 * Row headers are `<th scope="row">` and section headings are announced through
 * a spanning row header, so a screen reader user hears "Adaptive limits, Plus,
 * included" rather than a naked tick.
 */
export function PricingComparison() {
  return (
    <div className="scroll-x rounded-xl ring-1 ring-line">
      <table className="w-full min-w-[46rem] border-collapse bg-card">
        <caption className="sr-only">
          Feature comparison across the Starter, Plus and Household plans.
        </caption>
        <thead>
          <tr className="border-b border-line-2">
            <th scope="col" className="w-2/5 px-6 py-5 text-left text-[0.8125rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
              Feature
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                scope="col"
                className={cn(
                  'px-5 py-5 text-center',
                  plan.recommended && 'bg-brand-50',
                )}
              >
                <span className="block text-base font-semibold text-text">{plan.name}</span>
                <span className="mt-0.5 block text-[0.8125rem] font-normal text-text-3">
                  {plan.monthly === 0 ? 'Free' : `from $${plan.annual}/mo`}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {comparison.map((group) => (
          <tbody key={group.section}>
            <tr className="bg-paper-2">
              <th
                scope="colgroup"
                colSpan={4}
                className="px-6 py-3 text-left text-[0.8125rem] font-semibold tracking-[0.08em] text-text-2 uppercase"
              >
                {group.section}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-0">
                <th scope="row" className="px-6 py-4 text-left align-top font-normal">
                  <span className="block text-[0.9375rem] font-medium text-text">{row.label}</span>
                  {row.hint ? (
                    <span className="mt-1 block max-w-md text-[0.8125rem] leading-snug text-text-3">
                      {row.hint}
                    </span>
                  ) : null}
                </th>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={cn(
                      'px-5 py-4 text-center align-top',
                      plan.recommended && 'bg-brand-50/60',
                    )}
                  >
                    <Cell value={row.values[plan.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
