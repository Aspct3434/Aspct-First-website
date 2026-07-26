import Link from 'next/link';
import { Lock, Mail, MapPin, ShieldCheck } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button';
import { LuminaMark } from '@/components/ui/logo';
import { footerNav, site } from '@/lib/site';

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="bg-ink text-on-ink on-ink">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Lumina — home" className="inline-flex items-center gap-2.5">
              <LuminaMark tone="light" className="size-9" />
              <span className="font-display text-2xl leading-none text-on-ink">Lumina</span>
            </Link>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-on-ink-2">
              An AI-powered personal finance platform. Connect your accounts, understand your
              spending, and let the saving happen on its own.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-on-ink-2">
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 shrink-0 text-brand-300" aria-hidden="true" />
                SOC 2 Type II · ISO 27001
              </li>
              <li className="flex items-center gap-2.5">
                <Lock className="size-4 shrink-0 text-brand-300" aria-hidden="true" />
                Read-only connections, AES-256 at rest
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-brand-300" aria-hidden="true" />
                {site.address.street}, {site.address.city} {site.address.region}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand-300" aria-hidden="true" />
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-on-ink hover:decoration-citrine-500"
                >
                  {site.supportEmail}
                </a>
              </li>
            </ul>

            <ButtonLink href="/signup/" variant="onInk" size="md" className="mt-8">
              Start your free trial
            </ButtonLink>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.8125rem] font-semibold tracking-[0.12em] text-citrine-500 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-on-ink-2 transition-colors hover:text-on-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="rounded-lg bg-white/[0.04] px-5 py-4 ring-1 ring-white/8">
            <p className="text-[0.8125rem] leading-relaxed text-on-ink-2">
              <span className="font-semibold text-on-ink">Demonstration site.</span> Lumina is a
              fictional company built to showcase product, design and engineering work. The
              testimonials, performance figures, certifications, institution counts and dashboard
              data on this site are illustrative and do not describe a real service. No account is
              created and no financial data is collected anywhere on this site.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 text-[0.8125rem] text-on-ink-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link href="/legal/privacy/" className="transition-colors hover:text-on-ink">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms/" className="transition-colors hover:text-on-ink">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/security/" className="transition-colors hover:text-on-ink">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="transition-colors hover:text-on-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
