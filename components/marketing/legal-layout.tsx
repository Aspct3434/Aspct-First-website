import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container, Section } from '@/components/ui/layout';

export type LegalSection = { id: string; heading: string; body: ReactNode };

/**
 * Long-form legal pages: a persistent contents list on wide screens, generous
 * measure (~68 characters), and every section addressable by anchor so support
 * can link to a specific clause.
 */
export function LegalLayout({
  title,
  updated,
  summary,
  sections,
}: {
  title: string;
  updated: string;
  summary: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Section tone="paper" size="sm" className="border-b border-line">
        <Container>
          <p className="text-sm font-semibold tracking-[0.14em] text-brand-700 uppercase">Legal</p>
          <h1 className="mt-4 font-display text-display-2 font-normal text-text">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-2">{summary}</p>
          <p className="mt-6 text-sm text-text-3">Last updated {updated}</p>
        </Container>
      </Section>

      <Section tone="paper" size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[0.8125rem] font-semibold tracking-[0.1em] text-text-3 uppercase">
                On this page
              </h2>
              <ol className="mt-4 space-y-2.5">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="flex gap-3 text-[0.875rem] text-text-2 transition-colors hover:text-brand-700"
                    >
                      <span className="font-mono text-[0.75rem] text-text-3">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {section.heading}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 max-w-[68ch]">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="mb-12 last:mb-0">
                  <h2 className="flex gap-3 text-xl font-semibold text-text">
                    <span className="font-mono text-[0.875rem] text-brand-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-text-2 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-[3px] [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-text [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                    {section.body}
                  </div>
                </section>
              ))}

              <div className="mt-12 rounded-xl bg-paper-2 p-6 ring-1 ring-line">
                <p className="text-[0.9375rem] leading-relaxed text-text-2">
                  <strong className="font-semibold text-text">Demonstration document.</strong>{' '}
                  Lumina is a fictional company. This page shows the structure and tone a real
                  policy would take; it is not legal advice and creates no obligations. Do not reuse
                  it as a template without professional review.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
