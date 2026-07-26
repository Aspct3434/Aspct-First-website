import { ArrowRight, Check, Play } from '@/components/icons';
import { ProductPreview } from '@/components/marketing/product-preview';
import { ButtonLink } from '@/components/ui/button';
import { Container, Eyebrow } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';

const assurances = [
  '30 days free',
  'No card required',
  'Read-only bank access',
  'Cancel in two clicks',
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper pt-12 pb-20 sm:pt-16 sm:pb-24">
      {/* Ground texture and a single soft light behind the product shot. */}
      <div aria-hidden="true" className="grid-veil-light absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute top-[-14rem] right-[-18rem] -z-10 size-[46rem] rounded-full bg-brand-200/35 blur-[120px]"
      />

      <Container>
        <div className="grid items-center gap-14 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-10">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>AI-powered personal finance</Eyebrow>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-6 font-display text-display-1 font-normal text-text">
                Clarity for <em className="italic">every</em> dollar you earn.
              </h1>
            </Reveal>

            <Reveal delay={110}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-2 sm:text-xl">
                Lumina connects your accounts, shows you where the money actually goes, and
                automates the saving you keep meaning to do. Most people are set up in about four
                minutes.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center">
                <ButtonLink
                  href="/signup/"
                  size="lg"
                  trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
                >
                  Start your free trial
                </ButtonLink>
                <ButtonLink
                  href="/app/"
                  variant="secondary"
                  size="lg"
                  leading={<Play className="size-[1em]" aria-hidden="true" />}
                >
                  Explore the live demo
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                {assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-2">
                    <Check className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140} className="min-w-0">
            <div className="relative xl:-mr-[9vw]">
              <ProductPreview className="xl:min-w-[46rem] 2xl:min-w-[52rem]" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
