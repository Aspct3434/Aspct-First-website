import type { ReactNode } from 'react';
import { DeltaPill } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Stat tile: label · value · optional delta · optional trend.
 *
 * The value uses proportional figures — `tabular-nums` gives every digit the
 * width of a zero, which makes a display-size number look loose. Tabular
 * figures are reserved for columns that must align.
 */
export function Stat({
  label,
  value,
  delta,
  trend,
  hint,
  className,
  tone = 'light',
  size = 'md',
}: {
  label: string;
  value: string;
  delta?: { direction: 'up' | 'down' | 'flat'; text: string; isGood: boolean };
  trend?: ReactNode;
  hint?: string;
  className?: string;
  tone?: 'light' | 'ink';
  size?: 'sm' | 'md' | 'lg';
}) {
  const valueSize = {
    sm: 'text-2xl',
    md: 'text-[1.75rem]',
    lg: 'text-4xl',
  }[size];

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <p
        className={cn(
          'text-[0.8125rem] font-medium',
          tone === 'ink' ? 'text-on-ink-3' : 'text-text-3',
        )}
      >
        {label}
      </p>
      <div className="flex items-end justify-between gap-3">
        <p
          className={cn(
            'font-semibold tracking-[-0.02em]',
            valueSize,
            tone === 'ink' ? 'text-on-ink' : 'text-text',
          )}
        >
          {value}
        </p>
        {trend ? <div className="pb-1">{trend}</div> : null}
      </div>
      {delta || hint ? (
        <div className="flex flex-wrap items-center gap-2">
          {delta ? (
            <DeltaPill direction={delta.direction} isGood={delta.isGood}>
              {delta.text}
            </DeltaPill>
          ) : null}
          {hint ? (
            <span
              className={cn(
                'text-[0.75rem]',
                tone === 'ink' ? 'text-on-ink-3' : 'text-text-3',
              )}
            >
              {hint}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
