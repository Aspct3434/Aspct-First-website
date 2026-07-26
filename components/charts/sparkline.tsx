import { createPlot, linePath, niceScale, xOf, yOf } from '@/lib/chart';
import { cn } from '@/lib/utils';

/**
 * 12-point trend line for a stat tile.
 *
 * Decorative in the strict sense — every value it plots is also in the chart it
 * summarizes — so it is `aria-hidden` and the tile's own label and delta carry
 * the meaning. The run reads in the de-emphasis hue with the current point in
 * the accent, per the stat-tile contract.
 */
export function Sparkline({
  values,
  width = 104,
  height = 30,
  tone = 'brand',
  className,
}: {
  values: number[];
  width?: number;
  height?: number;
  tone?: 'brand' | 'negative';
  className?: string;
}) {
  if (values.length < 2) return null;

  const plot = createPlot(width, height, { top: 4, right: 5, bottom: 4, left: 1 });
  const scale = niceScale(Math.min(...values), Math.max(...values), 2);
  const lastX = xOf(values.length - 1, values.length, plot);
  const lastY = yOf(values[values.length - 1], scale, plot);

  const stroke = tone === 'brand' ? 'var(--color-brand-400)' : 'var(--color-negative)';
  const accent = tone === 'brand' ? 'var(--color-brand-700)' : 'var(--color-negative)';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={cn('block overflow-visible', className)}
    >
      <path
        d={linePath(values, scale, plot)}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.55}
      />
      <circle cx={lastX} cy={lastY} r={3} fill={accent} stroke="var(--color-card)" strokeWidth={2} />
    </svg>
  );
}
