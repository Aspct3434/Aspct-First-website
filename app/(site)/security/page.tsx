import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Check, Close, Eye, Globe, Key, Lock, Shield, ShieldCheck, Users } from '@/components/icons';
import { FinalCta } from '@/components/marketing/final-cta';
import { PageHero } from '@/components/marketing/page-hero';
import { ButtonLink, TextLink } from '@/components/ui/button';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Reveal } from '@/components/ui/reveal';
import { certifications, securityItems } from '@/lib/data/content';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Security & privacy',
  description:
    'How Lumina protects your financial data: read-only connections, no stored bank credentials, AES-256 at rest, TLS 1.3 in transit, SOC 2 Type II and ISO 27001, and a policy of never selling data.',
  path: '/security/',
  socialDescription:
    'Read-only connections, no stored bank credentials, independently audited, and never funded by selling data.',
});

const icons = { shield: Shield, lock: Lock, key: Key, globe: Globe, eye: Eye, users: Users } as const;

const canDo = [
  'Read transactions, balances and account names',
  'Read up to 24 months of history where your bank provides it',
  'Move money between accounts you own, but only through rules you create',
  'Show you the data back, and export it whenever you ask',
];

const cannotDo = [
  'See or store your online banking password',
  'Send money to anyone other than your own connected accounts',
  'Open, close or change any product at your bank',
  'Sell, rent or share your data with advertisers or brokers',
  'Let an engineer browse your account without your explicit, time-boxed approval',
];

const flow = [
  {
    title: 'You choose your bank',
    body: 'Lumina hands you to a regulated aggregation partner. Everything after this happens on your bank’s own domain.',
  },
  {
    title: 'You authenticate with your bank',
    body: 'Your credentials go to your bank, not to us. If your bank supports it, you approve the connection inside its own app.',
  },
  {
    title: 'Your bank issues a token',
    body: 'We receive a revocable, read-only token scoped to accounts you selected. There is no password in our systems to leak.',
  },
  {
    title: 'You can revoke at any time',
    body: 'From Lumina, or from your bank’s own connected-apps screen. Revocation takes effect on the next request, and we delete the cached data within 30 days.',
  },
];

const practices = [
  { label: 'Encryption in transit', value: 'TLS 1.3, HSTS preloaded, certificate pinning in mobile apps' },
  { label: 'Encryption at rest', value: 'AES-256, with field-level encryption for account identifiers' },
  { label: 'Key management', value: 'Hardware security modules, quarterly key rotation' },
  { label: 'Authentication', value: 'Passkeys, TOTP two-factor, and device review in-product' },
  { label: 'Infrastructure', value: 'Segregated production, no standing engineer access, all access logged' },
  { label: 'Testing', value: 'Independent penetration tests twice yearly, continuous dependency scanning' },
  { label: 'Data residency', value: 'US and EU regions; EU member data stays in the EU' },
  { label: 'Retention', value: 'Deleted accounts purged within 30 days, backups included' },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & privacy"
        title="What we can do with your data, and what we cannot"
        lede="Connecting a bank account to a company you have not met is a real decision. This page is the detail you should have before you make it — not a badge wall."
        actions={
          <>
            <ButtonLink href="/signup/" size="lg">
              Start your free trial
            </ButtonLink>
            <ButtonLink href="#disclosure" variant="secondary" size="lg">
              Report a vulnerability
            </ButtonLink>
          </>
        }
      />

      <Section aria-labelledby="permissions-title" tone="paper" size="sm" className="pt-0">
        <Container>
          <h2 id="permissions-title" className="sr-only">
            Lumina permissions
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl bg-card p-7 shadow-xs ring-1 ring-line sm:p-8">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-text">
                  <span className="flex size-9 items-center justify-center rounded-full bg-positive-soft text-positive">
                    <Check className="size-5" aria-hidden="true" />
                  </span>
                  What Lumina can do
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {canDo.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-text-2">
                      <Check className="mt-1 size-4 shrink-0 text-positive" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div className="h-full rounded-xl bg-card p-7 shadow-xs ring-1 ring-line sm:p-8">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-text">
                  <span className="flex size-9 items-center justify-center rounded-full bg-negative-soft text-negative">
                    <Close className="size-5" aria-hidden="true" />
                  </span>
                  What Lumina cannot do
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {cannotDo.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-text-2">
                      <Close className="mt-1 size-4 shrink-0 text-negative" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="flow-title" tone="ink" className="grid-veil">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHeading
              id="flow-title"
              eyebrow="How a connection works"
              tone="dark"
              title="Your password never reaches us"
              lede="Lumina uses token-based access through regulated aggregation partners. Here is the whole sequence."
            />

            <ol className="space-y-8">
              {flow.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 60} className="flex gap-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-citrine-500 ring-1 ring-white/12">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-on-ink">{step.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-on-ink-2">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="principles-title" tone="paper">
        <Container>
          <SectionHeading
            id="principles-title"
            eyebrow="Our commitments"
            title="Six things that do not change with the roadmap"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityItems.map((item, index) => {
              const Glyph = icons[item.icon];
              return (
                <Reveal as="li" key={item.title} delay={index * 45}>
                  <div className="flex h-full flex-col gap-3 rounded-xl bg-card p-6 shadow-xs ring-1 ring-line">
                    <Glyph className="size-5 text-brand-600" aria-hidden="true" />
                    <h3 className="text-base font-semibold text-text">{item.title}</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-text-2">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section id="certifications" aria-labelledby="certifications-title" tone="paper2">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeading
              id="certifications-title"
              eyebrow="Certifications & practices"
              title="Audited by people who are paid to disagree with us"
              lede="Summaries of our most recent penetration test and SOC 2 report are available under NDA — ask support and we will send them."
            />

            <div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {certifications.map((certification) => (
                  <li
                    key={certification.name}
                    className="flex items-start gap-3 rounded-lg bg-card p-4 ring-1 ring-line"
                  >
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-text">{certification.name}</p>
                      <p className="mt-0.5 text-[0.8125rem] text-text-3">{certification.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-8 divide-y divide-line rounded-xl bg-card ring-1 ring-line">
                {practices.map((practice) => (
                  <div key={practice.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                    <dt className="w-52 shrink-0 text-[0.875rem] font-semibold text-text">
                      {practice.label}
                    </dt>
                    <dd className="text-[0.875rem] text-text-2">{practice.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="disclosure" aria-labelledby="disclosure-title" tone="paper">
        <Container>
          <div className="mx-auto max-w-3xl rounded-xl bg-ink p-8 text-on-ink on-ink sm:p-12">
            <h2 id="disclosure-title" className="font-display text-display-3 font-normal text-on-ink">
              Found something? Tell us.
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-on-ink-2">
              We run an open bug bounty and we do not threaten researchers. Report to{' '}
              <TextLink
                href={`mailto:${site.securityEmail}`}
                className="text-citrine-500 decoration-citrine-500/40 hover:text-citrine-300"
              >
                {site.securityEmail}
              </TextLink>{' '}
              and you will get a human reply within one business day, a triage decision within
              three, and credit in our disclosure log unless you would rather stay anonymous.
            </p>
            <dl className="mt-8 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-[0.8125rem] text-on-ink-3">First response</dt>
                <dd className="mt-1 text-xl font-semibold text-on-ink">1 business day</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-on-ink-3">Triage decision</dt>
                <dd className="mt-1 text-xl font-semibold text-on-ink">3 business days</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-on-ink-3">Safe harbour</dt>
                <dd className="mt-1 text-xl font-semibold text-citrine-500">Yes</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <FinalCta
        title="Connect one account and judge for yourself."
        body="Start with the account you would miss least. You can disconnect it in one click, and everything Lumina cached goes with it."
      />
    </>
  );
}
