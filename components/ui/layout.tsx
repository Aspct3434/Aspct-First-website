import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** 1200px content field with responsive gutters. Used by every section. */
export function Container({
  children,
  className,
  as: As = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <As className={cn('container-page', className)}>{children}</As>;
}

type Tone = 'paper' | 'paper2' | 'card' | 'ink';

const toneClasses: Record<Tone, string> = {
  paper: 'bg-paper text-text',
  paper2: 'bg-paper-2 text-text',
  card: 'bg-card text-text',
  ink: 'bg-ink text-on-ink on-ink',
};

/**
 * Vertical rhythm is owned here rather than by each section, so band spacing
 * stays consistent across every page.
 */
export function Section({
  children,
  className,
  tone = 'paper',
  size = 'md',
  id,
  as: As = 'section',
  'aria-labelledby': labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  as?: ElementType;
  'aria-labelledby'?: string;
}) {
  const padding = {
    sm: 'py-14 sm:py-16',
    md: 'py-18 sm:py-24',
    lg: 'py-22 sm:py-32',
  }[size];

  return (
    <As
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative isolate', toneClasses[tone], padding, className)}
    >
      {children}
    </As>
  );
}

export function Eyebrow({
  children,
  className,
  tone = 'brand',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'brand' | 'onInk' | 'muted';
}) {
  const tones = {
    brand: 'text-brand-700',
    onInk: 'text-citrine-500',
    muted: 'text-text-3',
  };
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] uppercase',
        tones[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-px w-6 shrink-0',
          tone === 'onInk' ? 'bg-citrine-500/60' : 'bg-current opacity-45',
        )}
      />
      {children}
    </p>
  );
}

/**
 * Section heading block. `id` is required whenever the section uses
 * aria-labelledby, which is the default pattern on this site.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'light',
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone === 'dark' ? 'onInk' : 'brand'}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          'font-display text-display-3 font-normal',
          tone === 'dark' ? 'text-on-ink' : 'text-text',
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            'text-lg leading-relaxed',
            tone === 'dark' ? 'text-on-ink-2' : 'text-text-2',
          )}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/** Thin drawn rule used to separate bands without a hard border. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('rule w-full', className)} />;
}
