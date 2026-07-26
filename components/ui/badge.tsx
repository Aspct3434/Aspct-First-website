import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'neutral' | 'brand' | 'positive' | 'caution' | 'negative' | 'citrine' | 'onInk';

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-paper-2 text-text-2 ring-line-2',
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  positive: 'bg-positive-soft text-positive ring-positive/20',
  caution: 'bg-caution-soft text-caution ring-caution/20',
  negative: 'bg-negative-soft text-negative ring-negative/20',
  citrine: 'bg-citrine-100 text-citrine-700 ring-citrine-300',
  onInk: 'bg-white/10 text-on-ink ring-white/15',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
  icon,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {icon ? <span className="text-[1em]">{icon}</span> : null}
      {children}
    </span>
  );
}

/**
 * A signed change. Direction is carried by an arrow glyph as well as by colour,
 * so the meaning never depends on colour alone.
 */
export function DeltaPill({
  direction,
  children,
  isGood,
  className,
}: {
  direction: 'up' | 'down' | 'flat';
  children: ReactNode;
  /** Whether this movement is good news — spending down is good, savings up is good. */
  isGood: boolean;
  className?: string;
}) {
  const glyph = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.8125rem] font-semibold ring-1 ring-inset tabular',
        isGood
          ? 'bg-positive-soft text-positive ring-positive/20'
          : 'bg-negative-soft text-negative ring-negative/20',
        className,
      )}
    >
      <span aria-hidden="true">{glyph}</span>
      {children}
    </span>
  );
}
