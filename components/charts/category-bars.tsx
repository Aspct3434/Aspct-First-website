import { DeltaPill } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export type CategoryDatum = {
  label: string;
  amount: number;
  /** Change vs the previous period, as a share (0.08 = 8% more). */
  change: number;
};

/**
 * Category spend as horizontal bars.
 *
 * Nominal categories, so every bar wears the same hue — bar length already
 * encodes magnitude and a value ramp would double-encode it. Every number is
 * direct-labelled, which means there is nothing a tooltip would need to reveal:
 * the amount, the share of total and the month-on-month change are all on the
 * page, for pointer, keyboard and screen-reader users alike.
 */
export function CategoryBars({
  data,
  total,
  className,
}: {
  data: CategoryDatum[];
  total: number;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.amount));

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {data.map((datum) => {
        const share = total > 0 ? (datum.amount / total) * 100 : 0;
        const width = max > 0 ? (datum.amount / max) * 100 : 0;
        const changePercent = Math.abs(Math.round(datum.change * 100));

        return (
          <li key={datum.label} className="group">
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-sm font-medium text-text">{datum.label}</span>
              <span className="flex shrink-0 items-baseline gap-2.5">
                <span className="text-sm font-semibold text-text tabular">
                  {formatCurrency(datum.amount, true)}
                </span>
                <span className="text-[0.75rem] text-text-3 tabular">
                  {share.toFixed(0)}%
                </span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-r-[4px] bg-brand-100/70">
                <div
                  className="h-full rounded-r-[4px] bg-brand-500 transition-[width] duration-500 ease-out-expo"
                  style={{ width: `${Math.max(width, 1.5)}%` }}
                />
              </div>
              {changePercent >= 1 ? (
                <DeltaPill
                  direction={datum.change > 0 ? 'up' : 'down'}
                  isGood={datum.change < 0}
                  className="shrink-0"
                >
                  {changePercent}%
                </DeltaPill>
              ) : (
                <span className="shrink-0 text-[0.75rem] text-text-3">flat</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
