import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChartLine, Play, Search, Shield } from '@/components/icons';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const routes = [
  { href: '/features/', label: 'Features', description: 'What Lumina does, in detail', icon: ChartLine },
  { href: '/pricing/', label: 'Pricing', description: 'Three plans, one of them free', icon: ArrowRight },
  { href: '/security/', label: 'Security', description: 'How your data is protected', icon: Shield },
  { href: '/app/', label: 'Live demo', description: 'The dashboard, with sample data', icon: Play },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-paper">
        <Container className="py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-sm font-medium tracking-[0.16em] text-brand-700 uppercase">
              Error 404
            </p>
            <h1 className="mt-5 font-display text-display-2 font-normal text-text">
              That page has moved, or never existed.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-2">
              No harm done — nothing on this site handles real money, and nothing was lost. Here is
              where most people were heading.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <ButtonLink
                href="/"
                size="lg"
                trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
              >
                Back to the homepage
              </ButtonLink>
              <ButtonLink href="/contact/" variant="secondary" size="lg">
                Tell us what broke
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Popular pages" className="mt-16">
            <h2 className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.12em] text-text-3 uppercase">
              <Search className="size-4" aria-hidden="true" />
              Popular pages
            </h2>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2">
              {routes.map(({ href, label, description, icon: Glyph }) => (
                <li key={href} className="bg-paper">
                  <Link
                    href={href}
                    className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-paper-2"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-[1.2rem] text-brand-700 ring-1 ring-brand-200/60">
                        <Glyph />
                      </span>
                      <span>
                        <span className="block text-[1.0625rem] font-semibold text-text">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-[0.875rem] text-text-3">
                          {description}
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      className="size-5 shrink-0 text-text-3 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
