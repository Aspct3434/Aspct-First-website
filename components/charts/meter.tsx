import { cn } from '@/lib/utils';
import { clamp } from '@/lib/utils';

type Severity = 'ontrack' | 'watch' | 'over' | 'goal';

/**
 * A progress meter for budgets and savings goals.
 *
 * The fill carries severity and the unfilled track is a lighter step of the
 * same ramp, so state reads across the whole bar rather than only where the
 * fill ends. Severity is never colour-alone: the caller always renders a label
 * ("$188 left", "23 days ahead") beside it, and `valueText` carries the same
 * information to assistive technology.
 */
export function Meter({
  value,
  max,
  severity = 'ontrack',
  label,
  valueText,
  size = 'md',
  className,
}: {
  value: number;
  max: number;
  severity?: Severity;
  /** Accessible name. Visually rendered by the caller. */
  label: string;
  valueText: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const percent = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;

  const fills: Record<Severity, string> = {
    ontrack: 'bg-brand-500',
    watch: 'bg-caution',
    over: 'bg-negative',
    goal: 'bg-iris-500',
  };
  const tracks: Record<Severity, string> = {
    ontrack: 'bg-brand-100',
    watch: 'bg-caution-soft',
    over: 'bg-negative-soft',
    goal: 'bg-iris-100',
  };

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuetext={valueText}
      className={cn(
        'w-full overflow-hidden rounded-full',
        size === 'sm' ? 'h-1.5' : 'h-2.5',
        tracks[severity],
        className,
      )}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-700 ease-out-expo', fills[severity])}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

/** Severity from spend-against-budget, shared by the meter and its label. */
export function budgetSeverity(spent: number, budget: number): Severity {
  const ratio = budget > 0 ? spent / budget : 0;
  if (ratio > 1) return 'over';
  if (ratio >= 0.85) return 'watch';
  return 'ontrack';
}
