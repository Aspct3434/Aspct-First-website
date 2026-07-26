import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * The Lumina mark: three arcs radiating from a single point.
 *
 * It reads two ways on purpose — light leaving a source, and a growth curve —
 * which is exactly the product's promise: clarity that compounds. Built from
 * circles on a 32px grid so it stays crisp from 20px up.
 */
export function LuminaMark({
  className,
  tone = 'dark',
}: {
  className?: string;
  /** `dark` = evergreen tile (for light backgrounds). `light` = for ink backgrounds. */
  tone?: 'dark' | 'light';
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('size-8 shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="32"
        height="32"
        rx="9.5"
        fill={tone === 'dark' ? 'var(--color-brand-800)' : 'var(--color-citrine-500)'}
      />
      <g
        fill="none"
        strokeLinecap="round"
        strokeWidth="2.5"
        stroke={tone === 'dark' ? 'var(--color-citrine-500)' : 'var(--color-brand-800)'}
      >
        <path d="M7.5 17.5A7.5 7.5 0 0 1 15 25" />
        <path
          d="M7.5 11.5A13.5 13.5 0 0 1 21 25"
          stroke={tone === 'dark' ? 'var(--color-brand-300)' : 'var(--color-brand-700)'}
        />
        <path
          d="M7.5 5.5A19.5 19.5 0 0 1 27 25"
          stroke={tone === 'dark' ? 'var(--color-brand-400)' : 'var(--color-brand-600)'}
          opacity="0.85"
        />
      </g>
      <circle cx="7.5" cy="25" r="1.9" fill={tone === 'dark' ? '#fff' : 'var(--color-brand-900)'} />
    </svg>
  );
}

export function Logo({
  className,
  tone = 'dark',
  href = '/',
  showWordmark = true,
  label = 'Lumina — home',
}: {
  className?: string;
  tone?: 'dark' | 'light';
  href?: string;
  showWordmark?: boolean;
  label?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-85',
        className,
      )}
    >
      <LuminaMark tone={tone} className="size-8" />
      {showWordmark ? (
        <span
          className={cn(
            'font-display text-[1.45rem] leading-none tracking-[0.005em]',
            tone === 'dark' ? 'text-text' : 'text-on-ink',
          )}
        >
          Lumina
        </span>
      ) : null}
    </Link>
  );
}
