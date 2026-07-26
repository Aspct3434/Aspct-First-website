'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Close } from '@/components/icons';

/**
 * One announcement, one link, one way out.
 *
 * Dismissal is remembered in localStorage and applied by the boot script before
 * first paint, so returning visitors never see it flash in and out — the bar is
 * either there on the first frame or it never renders at all.
 */
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="announcement-bar relative z-50 bg-ink text-on-ink on-ink">
      <div className="container-page flex items-center justify-center gap-3 py-2.5">
        <p className="flex min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.8125rem] leading-snug">
          <span className="font-semibold text-citrine-500">New in Lumina 3.0</span>
          <span className="text-on-ink-2">
            Cash-flow forecasting built for irregular income.
          </span>
          <Link
            href="/features/#forecast"
            className="inline-flex items-center gap-1 font-semibold text-on-ink underline decoration-white/30 underline-offset-[3px] transition-colors hover:decoration-citrine-500"
          >
            See how it works
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            try {
              localStorage.setItem('lumina.banner', 'dismissed');
              document.documentElement.dataset.banner = 'off';
            } catch {
              /* storage unavailable — dismissal lasts for this page view */
            }
          }}
          className="absolute right-3 rounded-md p-1.5 text-on-ink-3 transition-colors hover:bg-white/10 hover:text-on-ink sm:right-5"
        >
          <Close className="size-4" />
          <span className="sr-only">Dismiss announcement</span>
        </button>
      </div>
    </div>
  );
}
