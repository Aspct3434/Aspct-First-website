import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '@/components/icons';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'primary' // the trial CTA — one per viewport, wherever possible
  | 'secondary' // the "show me first" path
  | 'ghost'
  | 'ink' // solid dark, for light sections that already have a green accent
  | 'onInk' // primary action sitting on a dark surface
  | 'onInkGhost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
  'whitespace-nowrap transition-[background-color,color,box-shadow,transform,border-color] ' +
  'duration-200 ease-standard select-none ' +
  'disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55 ' +
  'active:translate-y-px';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-brand focus-visible:outline-brand-700',
  secondary:
    'bg-card text-text ring-1 ring-line-2 ring-inset hover:bg-paper-2 hover:ring-control shadow-xs',
  ghost: 'text-text-2 hover:bg-paper-2 hover:text-text',
  ink: 'bg-ink text-on-ink shadow-sm hover:bg-ink-3 hover:shadow-md',
  onInk: 'bg-citrine-500 text-ink shadow-sm hover:bg-citrine-300',
  onInkGhost:
    'text-on-ink ring-1 ring-inset ring-white/22 hover:bg-white/10 hover:ring-white/40',
  danger: 'bg-negative text-white hover:brightness-110',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
};

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  full = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], full && 'w-full', className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  /** Trailing icon, e.g. an arrow on a CTA. */
  trailing?: ReactNode;
  leading?: ReactNode;
};

export function Button({
  variant,
  size,
  full,
  trailing,
  leading,
  loading = false,
  loadingLabel = 'Working…',
  children,
  className,
  type = 'button',
  ...props
}: CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; loadingLabel?: string }) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, full, className })}
      aria-busy={loading || undefined}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="size-[1.15em] animate-spin motion-reduce:animate-none" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          {leading}
          {children}
          {trailing}
        </>
      )}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  full,
  trailing,
  leading,
  href,
  children,
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isExternal = /^https?:|^mailto:|^tel:/.test(href);
  const classes = buttonStyles({ variant, size, full, className });

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {leading}
        {children}
        {trailing}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {leading}
      {children}
      {trailing}
    </Link>
  );
}

/** Text link with the underline behavior used across long-form copy. */
export function TextLink({
  href,
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isExternal = /^https?:|^mailto:|^tel:/.test(href);
  const classes = cn(
    'font-medium text-brand-700 underline decoration-brand-300 decoration-1 underline-offset-[3px]',
    'transition-colors hover:text-brand-800 hover:decoration-brand-600',
    className,
  );
  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
