/**
 * Pure chart geometry. No React, no DOM — so the same maths drives the
 * server-rendered marketing charts and the interactive dashboard ones.
 */

export type Scale = { min: number; max: number; ticks: number[] };

/** Round a domain outwards to human numbers (0 / 2,000 / 4,000 …). */
export function niceScale(rawMin: number, rawMax: number, tickCount = 4): Scale {
  if (rawMin === rawMax) {
    const pad = Math.abs(rawMin) * 0.1 || 1;
    rawMin -= pad;
    rawMax += pad;
  }
  const span = rawMax - rawMin;
  const rawStep = span / Math.max(1, tickCount);
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;
  const step =
    (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10) *
    magnitude;

  const min = Math.floor(rawMin / step) * step;
  const max = Math.ceil(rawMax / step) * step;

  const ticks: number[] = [];
  // Guard against floating point drift accumulating across additions.
  for (let i = 0; min + i * step <= max + step * 1e-9; i += 1) {
    ticks.push(Number((min + i * step).toFixed(6)));
  }
  return { min, max, ticks };
}

export type Plot = {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  innerWidth: number;
  innerHeight: number;
};

export function createPlot(
  width: number,
  height: number,
  padding: Partial<Plot['padding']> = {},
): Plot {
  const p = { top: 16, right: 16, bottom: 28, left: 48, ...padding };
  return {
    width,
    height,
    padding: p,
    innerWidth: Math.max(0, width - p.left - p.right),
    innerHeight: Math.max(0, height - p.top - p.bottom),
  };
}

/** Maps a value onto the vertical axis (top-down SVG coordinates). */
export function yOf(value: number, scale: Scale, plot: Plot): number {
  const t = (value - scale.min) / (scale.max - scale.min || 1);
  return plot.padding.top + plot.innerHeight - t * plot.innerHeight;
}

/** Evenly spaces `count` points across the plot, inset by half a step. */
export function xOf(index: number, count: number, plot: Plot, inset = false): number {
  if (count <= 1) return plot.padding.left + plot.innerWidth / 2;
  if (inset) {
    const step = plot.innerWidth / count;
    return plot.padding.left + step * index + step / 2;
  }
  return plot.padding.left + (plot.innerWidth / (count - 1)) * index;
}

export function linePath(values: number[], scale: Scale, plot: Plot, inset = false): string {
  return values
    .map((value, index) => {
      const x = xOf(index, values.length, plot, inset);
      const y = yOf(value, scale, plot);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export function areaPath(values: number[], scale: Scale, plot: Plot, inset = false): string {
  if (!values.length) return '';
  const baseline = plot.padding.top + plot.innerHeight;
  const first = xOf(0, values.length, plot, inset);
  const last = xOf(values.length - 1, values.length, plot, inset);
  return `${linePath(values, scale, plot, inset)} L${last.toFixed(2)} ${baseline.toFixed(
    2,
  )} L${first.toFixed(2)} ${baseline.toFixed(2)} Z`;
}

/**
 * A bar with its data-end rounded and its baseline-end square, per the mark
 * spec. `orientation` says which end is the data end.
 */
export function barPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
): string {
  const r =
    orientation === 'horizontal'
      ? Math.max(0, Math.min(radius, width, height / 2))
      : Math.max(0, Math.min(radius, height, width / 2));

  if (orientation === 'horizontal') {
    // Baseline on the left, data-end (rounded) on the right.
    return [
      `M${x} ${y}`,
      `H${x + width - r}`,
      `A${r} ${r} 0 0 1 ${x + width} ${y + r}`,
      `V${y + height - r}`,
      `A${r} ${r} 0 0 1 ${x + width - r} ${y + height}`,
      `H${x}`,
      'Z',
    ].join(' ');
  }
  // Baseline at the bottom, data-end (rounded) on top.
  return [
    `M${x} ${y + height}`,
    `V${y + r}`,
    `A${r} ${r} 0 0 1 ${x + r} ${y}`,
    `H${x + width - r}`,
    `A${r} ${r} 0 0 1 ${x + width} ${y + r}`,
    `V${y + height}`,
    'Z',
  ].join(' ');
}

/** Index of the data point nearest a pointer position. */
export function nearestIndex(pointerX: number, count: number, plot: Plot, inset = false): number {
  if (count <= 1) return 0;
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < count; i += 1) {
    const distance = Math.abs(xOf(i, count, plot, inset) - pointerX);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  }
  return best;
}

/** The chart series palette — validated for CVD separation on the paper surface. */
export const seriesColors = {
  primary: 'var(--color-brand-500)',
  secondary: 'var(--color-clay-500)',
  tertiary: 'var(--color-iris-500)',
} as const;

export const chartInk = {
  grid: 'var(--color-line)',
  axis: 'var(--color-line-2)',
  label: 'var(--color-text-3)',
  surface: 'var(--color-card)',
} as const;
