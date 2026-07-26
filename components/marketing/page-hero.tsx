import type { ReactNode } from 'react';
import { Container, Eyebrow } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

/**
 * The opening band on every interior page. One H1, one sentence of context,
 * and — where the page has a job to do — the action that does it.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  aside,
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-paper pt-14 pb-16 sm:pt-20 sm:pb-20', className)}>
      <div aria-hidden="true" className="grid-veil-light absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute top-[-20rem] right-[-14rem] -z-10 size-[38rem] rounded-full bg-brand-200/30 blur-[110px]"
      />
      <Container>
        <div
          className={cn(
            aside ? 'grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center' : '',
          )}
        >
          <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl')}>
            <Reveal>
              <Eyebrow className={align === 'center' ? 'justify-center' : undefined}>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={50}>
              <h1 className="mt-6 font-display text-display-2 font-normal text-text">{title}</h1>
            </Reveal>
            <Reveal delay={100}>
              <p className={cn('mt-5 text-lg leading-relaxed text-text-2', align === 'left' && 'max-w-xl')}>
                {lede}
              </p>
            </Reveal>
            {actions ? (
              <Reveal delay={150}>
                <div
                  className={cn(
                    'mt-8 flex flex-col gap-3 xs:flex-row',
                    align === 'center' && 'justify-center',
                  )}
                >
                  {actions}
                </div>
              </Reveal>
            ) : null}
          </div>
          {aside ? (
            <Reveal delay={120} className="min-w-0">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
