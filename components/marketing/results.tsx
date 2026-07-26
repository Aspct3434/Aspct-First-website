import { Container, Section } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { outcomeStats } from '@/lib/data/content';

/**
 * Measurable results.
 *
 * Four numbers, each with the population it was measured over. Vague social
 * proof ("thousands of happy users") is worth less than one number a reader can
 * check the shape of.
 */
export function Results() {
  return (
    <Section aria-labelledby="results-title" tone="paper" size="sm">
      <Container>
        <h2 id="results-title" className="max-w-2xl font-display text-display-3 font-normal text-text">
          What changes, measured
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-2">
          Reported from members who connected at least two accounts and stayed for 90 days.
        </p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {outcomeStats.map((stat, index) => (
            <Reveal key={stat.value} delay={index * 60} className="bg-paper">
              <div className="flex h-full flex-col gap-3 p-7">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="font-semibold text-5xl tracking-[-0.03em] text-brand-700">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-snug text-text-2">{stat.label}</p>
                  {stat.footnote ? (
                    <p className="mt-2 text-[0.8125rem] leading-snug text-text-3">{stat.footnote}</p>
                  ) : null}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <p className="mt-8 max-w-2xl text-[0.8125rem] leading-relaxed text-text-3">
          These figures are illustrative demonstration content produced for this build, not results
          from a real service.
        </p>
      </Container>
    </Section>
  );
}
