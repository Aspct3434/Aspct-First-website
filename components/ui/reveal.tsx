'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Entrance animation on first scroll into view.
 *
 * Deliberately restrained: 16px of travel, once only. Two safety properties
 * matter more than the effect itself —
 *
 * · Without JavaScript the content is simply visible: the hidden state is
 *   scoped to `[data-js='true']`, which the boot script sets.
 * · Under `prefers-reduced-motion` the hidden state is cancelled in CSS, so
 *   content is painted before hydration rather than waiting on an observer.
 *
 * An already-visible element needs no special case: IntersectionObserver
 * invokes its callback on the first observation, so above-the-fold content
 * reveals immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: As = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. Keep under 240 — longer reads as lag, not choreography. */
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Threshold 0, deliberately: a ratio-based threshold can never be reached
      // by an element taller than the root, which would leave it invisible.
      // The negative bottom margin holds the entrance back until the element is
      // properly on screen rather than clipping the viewport edge.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      className={cn('reveal', className)}
      data-shown={shown ? 'true' : 'false'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </As>
  );
}
