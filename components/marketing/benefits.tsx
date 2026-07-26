import { Bolt, ChartLine, Layers, Sparkle } from '@/components/icons';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { benefits } from '@/lib/data/content';

const icons = { layers: Layers, chart: ChartLine, bolt: Bolt, sparkle: Sparkle } as const;

/**
 * Benefits are laid out as a hairline matrix rather than a grid of shadowed
 * cards — the page already uses cards for features and pricing, and repeating
 * the same container three times is what makes a site read as a template.
 */
export function Benefits() {
  return (
    <Section id="benefits" aria-labelledby="benefits-title" tone="paper">
      <Container>
        <SectionHeading
          id="benefits-title"
          eyebrow="Why people stay"
          title="Four things that change in your first month"
          lede="Not features — outcomes. These are the differences members describe when we ask them what actually changed."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Glyph = icons[benefit.icon];
            return (
              <Reveal key={benefit.title} delay={index * 60} className="bg-paper">
                <div className="flex h-full flex-col gap-4 p-7 sm:p-9">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-brand-50 text-[1.35rem] text-brand-700 ring-1 ring-brand-200/60">
                    <Glyph />
                  </span>
                  <h3 className="text-xl font-semibold text-text">{benefit.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-text-2">{benefit.body}</p>
                  <p className="mt-auto pt-2 text-[0.8125rem] font-semibold tracking-wide text-brand-700 uppercase">
                    {benefit.proof}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
