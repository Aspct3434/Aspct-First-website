import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ArrowUpRight, Bank, Check, MapPin, Users } from '@/components/icons';
import { FinalCta } from '@/components/marketing/final-cta';
import { PageHero } from '@/components/marketing/page-hero';
import { ButtonLink, TextLink } from '@/components/ui/button';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { milestones, openRoles, principles, team } from '@/lib/data/content';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Lumina is a subscription-funded personal finance company. Our mission, our principles, the people who build it, and the commitments we have written into our terms.',
  path: '/about/',
  socialDescription:
    'Subscription-funded, never data-funded. The mission, principles and people behind Lumina.',
});

const commitments = [
  'We do not sell, rent or share your financial data — written into our terms of service.',
  'We publish categorization accuracy every quarter, including the quarters it falls.',
  'We will not be acquired by a lender or an advertising business without giving members 90 days to export and leave.',
  'Every automated transfer is logged with the reason it ran, and can be reversed for 24 hours.',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Lumina"
        title="A finance company that only makes money when you keep more of yours"
        lede="Lumina was started in 2021 by two people who had each kept a household spreadsheet for a decade and watched it fall out of date the moment life got busy. The arithmetic was never the hard part. Staying current was."
        actions={
          <>
            <ButtonLink href="/signup/" size="lg">
              Start your free trial
            </ButtonLink>
            <ButtonLink href="#careers" variant="secondary" size="lg">
              See open roles
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-xl bg-ink p-8 text-on-ink on-ink shadow-lg">
            <p className="text-[0.75rem] font-semibold tracking-[0.12em] text-citrine-500 uppercase">
              Our mission
            </p>
            <p className="mt-4 font-display text-2xl leading-snug text-on-ink">
              To give people the same clarity about their own money that a good accountant gives a
              small business — automatically, and without a lecture.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
              <div>
                <dt className="text-[0.8125rem] text-on-ink-3">Founded</dt>
                <dd className="mt-1 text-xl font-semibold text-on-ink">{site.founded}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-on-ink-3">Members</dt>
                <dd className="mt-1 text-xl font-semibold text-on-ink">38,000+</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-on-ink-3">Team</dt>
                <dd className="mt-1 text-xl font-semibold text-on-ink">34 people</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-on-ink-3">Revenue from data</dt>
                <dd className="mt-1 text-xl font-semibold text-citrine-500">$0</dd>
              </div>
            </dl>
          </div>
        }
      />

      <Section id="principles" aria-labelledby="principles-title" tone="paper2">
        <Container>
          <SectionHeading
            id="principles-title"
            eyebrow="Principles"
            title="Four rules we use to settle arguments"
            lede="Not values on a wall. These are the arguments we have already had, written down so we do not have them again."
          />

          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={index * 60} className="bg-paper-2">
                <div className="flex h-full flex-col gap-3 p-7 sm:p-9">
                  <span className="font-display text-4xl text-brand-600">0{index + 1}</span>
                  <h3 className="text-xl font-semibold text-text">{principle.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-text-2">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="story" aria-labelledby="story-title" tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <SectionHeading
                id="story-title"
                eyebrow="Our story"
                title="Six years, one idea, a lot of corrections"
                lede="Every step below happened because members told us the previous version was not good enough."
              />
            </div>

            <ol className="relative border-l border-line pl-8">
              {milestones.map((milestone, index) => (
                <Reveal as="li" key={milestone.year} delay={index * 40} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[2.3rem] size-3 rounded-full bg-brand-600 ring-4 ring-paper"
                  />
                  <p className="font-mono text-[0.8125rem] font-medium tracking-wide text-brand-700">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-text">{milestone.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-2">
                    {milestone.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section id="team" aria-labelledby="team-title" tone="paper2">
        <Container>
          <SectionHeading
            id="team-title"
            eyebrow="The team"
            title="Thirty-four people. These six sign off on what ships."
            lede="Everyone here has an account with their own money in it. It is the only user research that never gets scheduled away."
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <Reveal as="li" key={member.name} delay={index * 45}>
                <div className="flex h-full flex-col rounded-xl bg-card p-6 shadow-xs ring-1 ring-line">
                  <span
                    aria-hidden="true"
                    className="flex size-14 items-center justify-center rounded-full bg-brand-700 text-lg font-semibold text-white"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-text">{member.name}</h3>
                  <p className="text-[0.875rem] font-medium text-brand-700">{member.role}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-2">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 text-[0.8125rem] text-text-3">
            Team members shown are fictional, created for this demonstration build.
          </p>
        </Container>
      </Section>

      <Section id="commitments" aria-labelledby="commitments-title" tone="ink" className="grid-veil">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              id="commitments-title"
              eyebrow="In writing"
              tone="dark"
              title="Promises we put somewhere you can hold us to"
              lede="Anyone can say they respect your privacy on a marketing page. These four are in the terms of service, which is a different kind of sentence."
            />

            <ul className="space-y-5">
              {commitments.map((commitment, index) => (
                <Reveal as="li" key={commitment} delay={index * 50} className="flex items-start gap-4">
                  <Check className="mt-1 size-5 shrink-0 text-citrine-500" aria-hidden="true" />
                  <p className="text-[1.0625rem] leading-relaxed text-on-ink-2">{commitment}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8 text-sm text-on-ink-2">
            <span className="flex items-center gap-2">
              <Bank className="size-4 text-brand-300" aria-hidden="true" />
              Series A, $14M — Fieldstone Ventures &amp; Ravel Capital
            </span>
            <span className="flex items-center gap-2">
              <Users className="size-4 text-brand-300" aria-hidden="true" />
              34 people across 9 countries
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-brand-300" aria-hidden="true" />
              {site.address.street}, {site.address.city}
            </span>
          </div>
        </Container>
      </Section>

      <Section id="careers" aria-labelledby="careers-title" tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <SectionHeading
                id="careers-title"
                eyebrow="Careers"
                title="We hire slowly and write things down"
                lede="Remote-first with quarterly weeks together. Salary bands are published in the first message, and we pay the same rate wherever you live."
              />
              <p className="mt-6 text-[0.9375rem] text-text-2">
                Nothing here fits?{' '}
                <TextLink href={`mailto:${site.supportEmail}`}>Send us a note anyway</TextLink> — we
                read all of them.
              </p>
            </div>

            <ul className="divide-y divide-line rounded-xl bg-card ring-1 ring-line">
              {openRoles.map((role) => (
                <li key={role.title}>
                  <a
                    href={`mailto:${site.supportEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                    className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-paper-2"
                  >
                    <span className="min-w-0">
                      <span className="block text-[1.0625rem] font-semibold text-text">
                        {role.title}
                      </span>
                      <span className="mt-1 block text-sm text-text-3">
                        {role.team} · {role.location}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-text-3 transition-colors group-hover:text-brand-700"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <FinalCta
        title="Judge us on the product, not the manifesto."
        body="Thirty days of Plus, no card, and an export button if it turns out we were wrong about any of this."
      />
    </>
  );
}
