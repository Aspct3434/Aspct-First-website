'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChartBar, Layers } from '@/components/icons';
import { cn } from '@/lib/utils';

export type LegendEntry = { label: string; color: string; shape?: 'line' | 'rect' };

/**
 * Every chart on the dashboard sits in this frame, which guarantees three
 * things the charts themselves must not be trusted to remember:
 *
 * 1. a legend whenever two or more series are plotted (identity is never
 *    color-alone);
 * 2. a table view twin, so every value is reachable without hovering;
 * 3. a caption marking the figures as demonstration data.
 */
export function ChartFrame({
  title,
  description,
  legend,
  caption,
  table,
  children,
  headingLevel: Heading = 'h3',
  action,
  className,
}: {
  title: string;
  description?: string;
  legend?: LegendEntry[];
  caption?: ReactNode;
  table: ReactNode;
  children: ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4';
  action?: ReactNode;
  className?: string;
}) {
  const uid = useId();
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const panelId = `chart-panel-${uid}`;
  const titleId = `chart-title-${uid}`;

  return (
    <figure
      className={cn('flex min-w-0 flex-col', className)}
      role="group"
      aria-labelledby={titleId}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <Heading id={titleId} className="text-base font-semibold text-text">
            {title}
          </Heading>
          {description ? <p className="mt-1 text-sm text-text-3">{description}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <div className="flex items-center gap-0.5 rounded-full bg-paper-2 p-0.5 ring-1 ring-line">
            {(
              [
                ['chart', 'Chart', ChartBar],
                ['table', 'Table', Layers],
              ] as const
            ).map(([value, label, Glyph]) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                aria-pressed={view === value}
                aria-controls={panelId}
                className={cn(
                  'flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[0.8125rem] font-semibold transition-colors',
                  view === value
                    ? 'bg-card text-text shadow-xs'
                    : 'text-text-3 hover:text-text',
                )}
              >
                <Glyph className="size-3.5" />
                {label}
                <span className="sr-only"> view of {title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {legend && legend.length > 1 ? (
        <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {legend.map((entry) => (
            <li key={entry.label} className="flex items-center gap-2 text-[0.8125rem] text-text-2">
              {entry.shape === 'rect' ? (
                <span
                  aria-hidden="true"
                  className="size-3 rounded-[3px]"
                  style={{ backgroundColor: entry.color }}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="h-0.5 w-5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
              )}
              {entry.label}
            </li>
          ))}
        </ul>
      ) : null}

      <div id={panelId} className="mt-4 min-w-0 flex-1">
        {view === 'chart' ? children : <div className="scroll-x">{table}</div>}
      </div>

      {caption ? (
        <figcaption className="mt-3 text-xs leading-relaxed text-text-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** The table twin. Same numbers, no color dependency, fully keyboard-reachable. */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: (string | number)[][];
  caption?: string;
}) {
  return (
    <table className="w-full min-w-[26rem] border-collapse text-sm">
      {caption ? <caption className="sr-only">{caption}</caption> : null}
      <thead>
        <tr className="border-b border-line-2">
          {columns.map((column, index) => (
            <th
              key={column}
              scope="col"
              className={cn(
                'py-2 pr-4 text-[0.8125rem] font-semibold text-text-2',
                index === 0 ? 'text-left' : 'text-right',
              )}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={String(row[0])} className="border-b border-line last:border-0">
            {row.map((cell, index) => (
              <td
                key={index}
                className={cn(
                  'py-2 pr-4',
                  index === 0 ? 'text-left font-medium text-text' : 'text-right text-text-2',
                )}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
