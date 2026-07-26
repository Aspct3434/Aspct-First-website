import type { ReactNode } from 'react';
import { Plus } from '@/components/icons';
import { cn } from '@/lib/utils';

export type FaqItem = { question: string; answer: ReactNode };

/**
 * FAQ disclosure list.
 *
 * Built on native <details>/<summary>, which means: it works before hydration,
 * it works with JavaScript disabled, keyboard and screen-reader semantics come
 * from the platform, and browser find-in-page can reach closed content. The
 * shared `name` makes it an exclusive accordion natively in supporting
 * browsers, and degrades to independent disclosures elsewhere.
 */
export function Accordion({
  items,
  name,
  className,
  tone = 'light',
}: {
  items: FaqItem[];
  name: string;
  className?: string;
  tone?: 'light' | 'ink';
}) {
  return (
    <div className={cn('divide-y divide-line', tone === 'ink' && 'divide-white/12', className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          name={name}
          className="group"
          open={index === 0 ? true : undefined}
        >
          <summary
            className={cn(
              'flex cursor-pointer list-none items-start justify-between gap-6 py-5',
              'text-left text-[1.0625rem] font-semibold transition-colors',
              '[&::-webkit-details-marker]:hidden',
              tone === 'ink' ? 'text-on-ink hover:text-citrine-500' : 'text-text hover:text-brand-700',
            )}
          >
            <span className="min-w-0">{item.question}</span>
            <span
              aria-hidden="true"
              className={cn(
                'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[1.05rem] ring-1 transition-transform duration-300 ease-standard group-open:rotate-45',
                tone === 'ink'
                  ? 'text-citrine-500 ring-white/15'
                  : 'text-brand-700 ring-line-2 group-hover:ring-brand-300',
              )}
            >
              <Plus />
            </span>
          </summary>
          <div
            className={cn(
              'max-w-2xl pb-6 text-[0.9375rem] leading-relaxed',
              tone === 'ink' ? 'text-on-ink-2' : 'text-text-2',
            )}
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
