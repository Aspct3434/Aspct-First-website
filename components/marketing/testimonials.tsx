import { Quote, Star } from '@/components/icons';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { testimonials } from '@/lib/data/content';
import { cn } from '@/lib/utils';

function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white',
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <Section id="testimonials" aria-labelledby="testimonials-title" tone="paper2">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="From members"
          title="What people say once the novelty wears off"
          lede="The compliment we hear most is that they stopped thinking about it. That is the goal."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="min-w-0">
            <figure className="flex h-full flex-col rounded-xl bg-ink p-8 text-on-ink on-ink sm:p-10">
              <Quote className="size-8 text-citrine-500" aria-hidden="true" />
              <blockquote className="mt-6 font-display text-2xl leading-snug text-on-ink sm:text-[1.75rem]">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <Avatar initials={featured.initials} className="bg-citrine-500 text-ink" />
                <div>
                  <p className="font-semibold text-on-ink">{featured.name}</p>
                  <p className="text-sm text-on-ink-3">
                    {featured.role} · {featured.location}
                  </p>
                </div>
                <span className="ml-auto hidden rounded-full bg-white/8 px-3 py-1.5 text-[0.75rem] font-medium text-on-ink-2 ring-1 ring-white/12 sm:block">
                  {featured.plan}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid min-w-0 gap-6">
            {rest.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={(index + 1) * 70}>
                <figure className="flex h-full flex-col rounded-xl bg-card p-6 shadow-xs ring-1 ring-line sm:p-7">
                  <div className="flex items-center gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-3.5 text-citrine-700" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-text-2">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <Avatar initials={testimonial.initials} className="size-9 text-[0.8125rem]" />
                    <div className="min-w-0">
                      <p className="truncate text-[0.9375rem] font-semibold text-text">
                        {testimonial.name}
                      </p>
                      <p className="truncate text-[0.8125rem] text-text-3">
                        {testimonial.role} · {testimonial.location}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-[0.8125rem] leading-relaxed text-text-3">
          Testimonials on this site are illustrative examples written for a demonstration build.
          They are not statements from real customers.
        </p>
      </Container>
    </Section>
  );
}
