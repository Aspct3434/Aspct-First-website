import { ArrowRight, Clock } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { howItWorks } from '@/lib/data/content';

export function HowItWorks() {
  return (
    <Section id="how-it-works" aria-labelledby="how-title" tone="ink" className="grid-veil">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="how-title"
              eyebrow="How it works"
              tone="dark"
              title="Set up once. Then mostly leave it alone."
              lede="Three steps, about four minutes of your attention, and nothing automated until you say so."
            />
            <ButtonLink
              href="/signup/"
              variant="onInk"
              size="lg"
              className="mt-8"
              trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
            >
              Start your free trial
            </ButtonLink>
          </div>

          <ol className="relative">
            {/* The connecting spine, drawn behind the numbered markers. */}
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-10 left-[1.4rem] w-px bg-gradient-to-b from-citrine-500/50 via-white/15 to-transparent"
            />
            {howItWorks.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80} className="relative flex gap-6 pb-10 last:pb-0">
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-base font-semibold text-citrine-500 ring-1 ring-white/15">
                  {index + 1}
                </span>
                <div className="min-w-0 pt-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-semibold text-on-ink">{step.title}</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1 text-[0.75rem] font-medium text-on-ink-2 ring-1 ring-white/10">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-ink-2">{step.body}</p>
                  <p className="mt-3 border-l-2 border-citrine-500/40 pl-4 text-sm text-on-ink-3">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
