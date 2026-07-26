import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Clock, Globe, Mail, MapPin, Play, Shield, Users } from '@/components/icons';
import { ContactForm } from '@/components/marketing/contact-form';
import { PageHero } from '@/components/marketing/page-hero';
import { TextLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact & demo',
  description:
    'Book a 20-minute walkthrough, ask a pricing question, or request our security documentation. A human replies within one business day.',
  path: '/contact/',
  socialDescription:
    'Book a 20-minute walkthrough or ask us anything. A human replies within one business day.',
});

const channels = [
  {
    icon: Mail,
    title: 'Member support',
    body: 'Account questions, connection trouble, billing.',
    action: { label: site.supportEmail, href: `mailto:${site.supportEmail}` },
  },
  {
    icon: Shield,
    title: 'Security & disclosure',
    body: 'Vulnerability reports, security questionnaires, SOC 2 summaries.',
    action: { label: site.securityEmail, href: `mailto:${site.securityEmail}` },
  },
  {
    icon: Users,
    title: 'Press & partnerships',
    body: 'Interviews, data requests, integration proposals.',
    action: { label: site.pressEmail, href: `mailto:${site.pressEmail}` },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & demo"
        title="Talk to someone who has actually used it"
        lede="Walkthroughs are run by the team that builds Lumina, not by a sales function reading from a deck. Twenty minutes, your questions, your screen if you want to bring your own numbers."
      />

      <Section tone="paper" size="sm" className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <Reveal className="min-w-0">
              <h2 className="sr-only">Send us a message</h2>
              <ContactForm />
            </Reveal>

            <Reveal delay={80} className="min-w-0">
              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-ink p-7 text-on-ink on-ink">
                  <Play className="size-6 text-citrine-500" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-semibold text-on-ink">
                    Or skip the conversation
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-ink-2">
                    The live demo is the real dashboard loaded with sample data. Filter the
                    transactions, act on an insight, break something. No sign-up, no card, nothing
                    to cancel.
                  </p>
                  <TextLink
                    href="/app/"
                    className="mt-5 inline-block text-citrine-500 decoration-citrine-500/40 hover:text-citrine-300"
                  >
                    Open the live demo →
                  </TextLink>
                </div>

                <ul className="divide-y divide-line rounded-xl bg-card ring-1 ring-line">
                  {channels.map(({ icon: Glyph, title, body, action }) => (
                    <li key={title} className="flex items-start gap-4 p-6">
                      <Glyph className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                      <div className="min-w-0">
                        <h3 className="text-[0.9375rem] font-semibold text-text">{title}</h3>
                        <p className="mt-1 text-[0.875rem] leading-snug text-text-2">{body}</p>
                        <TextLink href={action.href} className="mt-2 inline-block text-[0.875rem]">
                          {action.label}
                        </TextLink>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-4 rounded-xl bg-paper-2 p-6 ring-1 ring-line">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-text-3" aria-hidden="true" />
                    <div>
                      <dt className="text-[0.875rem] font-semibold text-text">Support hours</dt>
                      <dd className="mt-0.5 text-[0.875rem] text-text-2">
                        Monday to Friday, 08:00–20:00 CT. Security reports are monitored around the
                        clock.
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-text-3" aria-hidden="true" />
                    <div>
                      <dt className="text-[0.875rem] font-semibold text-text">Registered office</dt>
                      <dd className="mt-0.5 text-[0.875rem] text-text-2">
                        {site.legalName}
                        <br />
                        {site.address.street}
                        <br />
                        {site.address.city}, {site.address.region} {site.address.postal}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="mt-0.5 size-4 shrink-0 text-text-3" aria-hidden="true" />
                    <div>
                      <dt className="text-[0.875rem] font-semibold text-text">Languages</dt>
                      <dd className="mt-0.5 text-[0.875rem] text-text-2">
                        English, French, German and Spanish.
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
