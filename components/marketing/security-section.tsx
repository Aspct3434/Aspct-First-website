import { Eye, Globe, Key, Lock, Shield, Users } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { certifications, securityItems } from '@/lib/data/content';

const icons = { shield: Shield, lock: Lock, key: Key, globe: Globe, eye: Eye, users: Users } as const;

export function SecuritySection() {
  return (
    <Section id="security" aria-labelledby="security-title" tone="ink" className="grid-veil">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="security-title"
              eyebrow="Security & privacy"
              tone="dark"
              title="Built for people who read the small print"
              lede="You are about to connect your bank to a company you have not met. Here is exactly what we can and cannot do with that."
            />
            <ButtonLink href="/security/" variant="onInkGhost" size="md" className="mt-8">
              Read the full security overview
            </ButtonLink>

            <ul className="mt-10 flex flex-wrap gap-2">
              {certifications.map((certification) => (
                <li
                  key={certification.name}
                  className="rounded-full bg-white/8 px-3 py-1.5 text-[0.8125rem] font-medium text-on-ink-2 ring-1 ring-white/12"
                >
                  {certification.name}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2">
            {securityItems.map((item, index) => {
              const Glyph = icons[item.icon];
              return (
                <Reveal as="li" key={item.title} delay={index * 50} className="bg-ink-2">
                  <div className="flex h-full flex-col gap-3 p-6">
                    <Glyph className="size-5 text-citrine-500" aria-hidden="true" />
                    <h3 className="text-base font-semibold text-on-ink">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-on-ink-2">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
