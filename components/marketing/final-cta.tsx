import { ArrowRight, Check } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';
import { LuminaMark } from '@/components/ui/logo';

const assurances = [
  '30 days of Plus, free',
  'No card required',
  'Read-only bank connections',
  'Delete your data any time',
];

export function FinalCta({
  title = 'See your money the way Lumina sees it.',
  body = 'Connect one account and you will have a categorized picture of the last twelve months before the kettle boils.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-ink text-on-ink on-ink">
      <div aria-hidden="true" className="grid-veil absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute bottom-[-20rem] left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-brand-700/35 blur-[130px]"
      />

      <Container className="py-20 text-center sm:py-28">
        <LuminaMark tone="light" className="mx-auto size-12" />
        <h2
          id="final-cta-title"
          className="mx-auto mt-8 max-w-3xl font-display text-display-2 font-normal text-on-ink"
        >
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-on-ink-2">{body}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 xs:flex-row">
          <ButtonLink
            href="/signup/"
            variant="onInk"
            size="lg"
            trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
          >
            Start your free trial
          </ButtonLink>
          <ButtonLink href="/contact/" variant="onInkGhost" size="lg">
            Book a 20-minute walkthrough
          </ButtonLink>
        </div>

        <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
          {assurances.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-on-ink-2">
              <Check className="size-4 shrink-0 text-citrine-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
