'use client';

import { useCallback, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  areaPath,
  chartInk,
  createPlot,
  linePath,
  nearestIndex,
  niceScale,
  xOf,
  yOf,
} from '@/lib/chart';
import { formatCompactCurrency, formatCurrency } from '@/lib/utils';
import { useMeasure } from '@/lib/use-measure';
import { cn } from '@/lib/utils';

export type TrendSeries = {
  id: string;
  label: string;
  color: string;
  values: number[];
  /** A 10% wash under the line. Use for a single-series chart only. */
  fill?: boolean;
};

/**
 * Multi-series line chart with a snapping crosshair.
 *
 * One y-axis, always — two measures of different scale get two charts, never a
 * second axis. The pointer only has to be near an x position, not on a line:
 * the crosshair snaps to the nearest index and the readout lists every series
 * there. Arrow keys do exactly the same thing, and the values are also in the
 * frame's table view.
 */
export function TrendChart({
  labels,
  series,
  height = 260,
  valueFormat = 'currency',
  className,
  ariaLabel,
}: {
  labels: string[];
  series: TrendSeries[];
  height?: number;
  valueFormat?: 'currency' | 'compact';
  className?: string;
  ariaLabel: string;
}) {
  const { ref, width } = useMeasure<HTMLDivElement>(700);
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const format = useMemo(
    () =>
      valueFormat === 'compact'
        ? formatCompactCurrency
        : (value: number) => formatCurrency(value, true),
    [valueFormat],
  );

  const compact = width < 520;
  const plot = useMemo(
    () =>
      createPlot(width, height, {
        left: compact ? 44 : 56,
        right: 16,
        top: 18,
        bottom: 30,
      }),
    [width, height, compact],
  );

  const scale = useMemo(() => {
    const all = series.flatMap((s) => s.values);
    const max = Math.max(...all);
    const min = Math.min(0, ...all);
    return niceScale(min, max, 4);
  }, [series]);

  const count = labels.length;

  const setFromPointer = useCallback(
    (event: ReactPointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = event.clientX - rect.left;
      setActive(nearestIndex(x, count, plot));
    },
    [count, plot],
  );

  const announce = useCallback(
    (index: number) => {
      const parts = series.map((s) => `${s.label} ${format(s.values[index] ?? 0)}`);
      setAnnouncement(`${labels[index]}: ${parts.join(', ')}`);
    },
    [labels, series, format],
  );

  const activeX = active === null ? 0 : xOf(active, count, plot);
  const tooltipOnLeft = activeX > plot.padding.left + plot.innerWidth * 0.62;

  // Show every other x label when the chart is narrow, so text never collides.
  const labelStep = compact && count > 6 ? 2 : 1;

  return (
    <div ref={ref} className={cn('relative w-full min-w-0', className)}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block w-full touch-pan-y select-none"
        role="img"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerMove={setFromPointer}
        onPointerDown={setFromPointer}
        onPointerLeave={() => setActive(null)}
        onBlur={() => {
          setActive(null);
          setAnnouncement('');
        }}
        onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape'].includes(event.key)) return;
          event.preventDefault();
          if (event.key === 'Escape') {
            setActive(null);
            setAnnouncement('');
            return;
          }
          const current = active ?? 0;
          const next =
            event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? count - 1
                : event.key === 'ArrowLeft'
                  ? Math.max(0, current - 1)
                  : Math.min(count - 1, active === null ? 0 : current + 1);
          setActive(next);
          announce(next);
        }}
      >
        {/* Gridlines: solid hairlines, one step off the surface, recessive. */}
        <g>
          {scale.ticks.map((tick) => {
            const y = yOf(tick, scale, plot);
            return (
              <g key={tick}>
                <line
                  x1={plot.padding.left}
                  x2={plot.padding.left + plot.innerWidth}
                  y1={y}
                  y2={y}
                  stroke={tick === 0 ? chartInk.axis : chartInk.grid}
                  strokeWidth={1}
                  shapeRendering="crispEdges"
                />
                <text
                  x={plot.padding.left - 10}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-text-3 text-[11px] tabular"
                >
                  {formatCompactCurrency(tick)}
                </text>
              </g>
            );
          })}
        </g>

        {/* X labels */}
        <g>
          {labels.map((label, index) =>
            index % labelStep === 0 ? (
              <text
                key={label}
                x={xOf(index, count, plot)}
                y={height - 9}
                textAnchor="middle"
                className="fill-text-3 text-[11px]"
              >
                {label}
              </text>
            ) : null,
          )}
        </g>

        {/* Area washes sit under every line. */}
        {series.map((s) =>
          s.fill ? (
            <path key={`${s.id}-fill`} d={areaPath(s.values, scale, plot)} fill={s.color} opacity={0.1} />
          ) : null,
        )}

        {/* Crosshair, drawn beneath the lines so it never obscures data. */}
        {active !== null ? (
          <line
            x1={activeX}
            x2={activeX}
            y1={plot.padding.top}
            y2={plot.padding.top + plot.innerHeight}
            stroke={chartInk.axis}
            strokeWidth={1}
          />
        ) : null}

        {series.map((s) => (
          <path
            key={s.id}
            d={linePath(s.values, scale, plot)}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Active markers carry a 2px surface ring so they stay legible on the line. */}
        {active !== null
          ? series.map((s) => (
              <circle
                key={`${s.id}-dot`}
                cx={activeX}
                cy={yOf(s.values[active] ?? 0, scale, plot)}
                r={4.5}
                fill={s.color}
                stroke={chartInk.surface}
                strokeWidth={2}
              />
            ))
          : null}
      </svg>

      {/* Readout. Values lead; series names follow. */}
      {active !== null ? (
        <div
          className={cn(
            'pointer-events-none absolute top-2 z-10 min-w-[9.5rem] rounded-lg bg-ink px-3 py-2.5 shadow-lg ring-1 ring-white/10',
          )}
          style={
            tooltipOnLeft
              ? { right: Math.max(8, width - activeX + 12) }
              : { left: Math.min(width - 160, activeX + 12) }
          }
        >
          <p className="text-[0.6875rem] font-semibold tracking-wide text-on-ink-3 uppercase">
            {labels[active]}
          </p>
          <ul className="mt-1.5 space-y-1">
            {series.map((s) => (
              <li key={s.id} className="flex items-baseline gap-2">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-3.5 shrink-0 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-sm font-semibold text-on-ink tabular">
                  {format(s.values[active] ?? 0)}
                </span>
                <span className="text-[0.75rem] text-on-ink-3">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <p className="sr-only">
        Use the left and right arrow keys to move through data points once this chart has focus, or
        switch to the table view for all values.
      </p>
    </div>
  );
}
