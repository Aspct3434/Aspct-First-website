type ClassValue = string | number | bigint | boolean | null | undefined | ClassValue[];

/** Minimal class-name composer. Kept in-repo so the app ships no utility dependency. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input && input !== 0) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(' ');
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const currencyWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** $1,284.50 — or $1,285 when `whole`. Negative values keep the minus sign. */
export function formatCurrency(value: number, whole = false): string {
  return (whole ? currencyWhole : currency).format(value);
}

/** Compact money for axis ticks and tiles: $4.2k, $1.1M. */
export function formatCompactCurrency(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}k`;
  return `${sign}$${Math.round(abs)}`;
}

/** Signed money for deltas — always shows direction. */
export function formatSigned(value: number, whole = true): string {
  const formatted = formatCurrency(Math.abs(value), whole);
  return `${value < 0 ? '−' : '+'}${formatted}`;
}

export function formatPercent(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

const dateShort = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const dateLong = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function formatDateShort(iso: string): string {
  return dateShort.format(new Date(`${iso}T12:00:00`));
}

export function formatDateLong(iso: string): string {
  return dateLong.format(new Date(`${iso}T12:00:00`));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Stable id generator for label/description wiring in components. */
let seq = 0;
export function nextId(prefix: string): string {
  seq += 1;
  return `${prefix}-${seq}`;
}
