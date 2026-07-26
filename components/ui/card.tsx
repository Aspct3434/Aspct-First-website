import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardTone = 'card' | 'inset' | 'paper' | 'ink' | 'brand';

const tones: Record<CardTone, string> = {
  card: 'bg-card ring-1 ring-line shadow-xs',
  inset: 'bg-paper-2 ring-1 ring-line',
  paper: 'bg-paper ring-1 ring-line',
  ink: 'bg-ink-2 ring-1 ring-white/10 text-on-ink on-ink',
  brand: 'bg-brand-50 ring-1 ring-brand-200/70',
};

export function Card({
  children,
  className,
  tone = 'card',
  as: As = 'div',
  interactive = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  tone?: CardTone;
  as?: ElementType;
  interactive?: boolean;
} & Record<string, unknown>) {
  return (
    <As
      className={cn(
        'rounded-xl',
        tones[tone],
        interactive &&
          'transition-[box-shadow,transform,border-color] duration-300 ease-standard ' +
            'hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0',
        className,
      )}
      {...rest}
    >
      {children}
    </As>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6 sm:p-7', className)}>{children}</div>;
}

export function CardHeader({
  title,
  description,
  action,
  className,
  as: As = 'h3',
  id,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        <As id={id} className="text-base font-semibold text-text">
          {title}
        </As>
        {description ? <p className="mt-1 text-sm text-text-3">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Small square holder for an icon, sized to the type it sits beside. */
export function IconTile({
  children,
  className,
  tone = 'brand',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'brand' | 'citrine' | 'ink' | 'neutral';
}) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700 ring-brand-200/60',
    citrine: 'bg-citrine-100 text-citrine-700 ring-citrine-300/60',
    ink: 'bg-white/8 text-citrine-500 ring-white/12',
    neutral: 'bg-paper-2 text-text-2 ring-line',
  };
  return (
    <span
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-lg text-[1.35rem] ring-1',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
