'use client';

import { useState } from 'react';
import { AlertTriangle, Bolt, Check, Sparkle, Target } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { insights, type Insight } from '@/lib/data/demo-account';
import { cn } from '@/lib/utils';

const kindMeta: Record<Insight['kind'], { label: string; icon: typeof Sparkle; tone: string }> = {
  watch: { label: 'Needs attention', icon: AlertTriangle, tone: 'text-caution bg-caution-soft' },
  save: { label: 'Money back', icon: Bolt, tone: 'text-brand-700 bg-brand-50' },
  plan: { label: 'Planning', icon: Target, tone: 'text-iris-700 bg-iris-100' },
};

/**
 * AI recommendations.
 *
 * Each one states the amount, the evidence and a single action. Acting on a
 * card resolves it in place and confirms in a toast — so the feedback is both
 * where the user is looking and announced to assistive technology.
 */
export function InsightsPanel() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const { toast } = useToast();

  async function act(insight: Insight) {
    setBusy(insight.id);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setBusy(null);
    setDone((current) => ({ ...current, [insight.id]: true }));
    toast({ title: 'Done', description: insight.confirmation });
  }

  const openCount = insights.filter((insight) => !done[insight.id]).length;

  return (
    <div>
      <p className="text-[0.875rem] text-text-3" aria-live="polite">
        {openCount === 0
          ? 'All caught up. New insights appear as your accounts refresh.'
          : `${openCount} of ${insights.length} still to act on.`}
      </p>

      <ul className="mt-5 grid gap-5 lg:grid-cols-2">
        {insights.map((insight) => {
          const meta = kindMeta[insight.kind];
          const Glyph = meta.icon;
          const isDone = done[insight.id];

          return (
            <li key={insight.id}>
              <article
                className={cn(
                  'flex h-full flex-col rounded-xl bg-card p-6 ring-1 transition-colors',
                  isDone ? 'ring-positive/30' : 'ring-line',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold',
                      meta.tone,
                    )}
                  >
                    <Glyph className="size-3.5" aria-hidden="true" />
                    {meta.label}
                  </span>
                  {insight.impact ? (
                    <span className="text-[0.8125rem] font-semibold text-text-2">
                      {insight.impact}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-[1.0625rem] font-semibold text-text">{insight.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-text-2">
                  {insight.body}
                </p>

                <div className="mt-5 border-t border-line pt-4">
                  {isDone ? (
                    <p className="flex items-start gap-2.5 text-[0.875rem] font-medium text-positive">
                      <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {insight.confirmation}
                    </p>
                  ) : (
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        size="sm"
                        loading={busy === insight.id}
                        loadingLabel="Applying…"
                        onClick={() => act(insight)}
                      >
                        {insight.action}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDone((current) => ({ ...current, [insight.id]: true }));
                          toast({
                            tone: 'info',
                            title: 'Dismissed',
                            description: `“${insight.title}” will not be shown again this month.`,
                          });
                        }}
                      >
                        Not now
                      </Button>
                    </div>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
