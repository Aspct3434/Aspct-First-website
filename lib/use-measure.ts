'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Element width, measured after mount.
 *
 * Charts need real pixels (not a scaled viewBox) so strokes stay 2px and labels
 * stay legible at every breakpoint. The initial value is identical on server and
 * client, so hydration never mismatches; the observer refines it on mount.
 */
export function useMeasure<T extends HTMLElement>(initialWidth = 720) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setWidth((current) => (Math.abs(current - next) > 1 ? next : current));
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
