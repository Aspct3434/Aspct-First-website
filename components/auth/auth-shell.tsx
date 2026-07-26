import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronLeft, Quote, ShieldCheck } from '@/components/icons';
import { Logo, LuminaMark } from '@/components/ui/logo';

/**
 * Split layout for sign-in and sign-up.
 *
 * The right panel is not decoration: it carries the two things that stop people
 * completing a finance sign-up — "is my bank data safe" and "is anyone actually
 * using this". It collapses away below `lg`, where the form is the only job.
 */
export function AuthShell({
  children,
  aside,
}: {
  children: ReactNode;
  aside: { quote: string; name: string; role: string; assurances: string[] };
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      <div className="flex flex-col bg-paper">
        <header className="container-page flex h-20 shrink-0 items-center justify-between gap-4">
          <Logo />
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-text-2 transition-colors hover:bg-paper-2 hover:text-text"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </header>

        <main id="main" className="container-page flex flex-1 items-center py-10 sm:py-14">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </main>

        <footer className="container-page shrink-0 py-6">
          <p className="text-[0.8125rem] text-text-3">
            Demonstration build — no account is created and nothing is transmitted.{' '}
            <Link href="/legal/privacy/" className="underline underline-offset-[3px]">
              Privacy
            </Link>{' '}
            ·{' '}
            <Link href="/legal/terms/" className="underline underline-offset-[3px]">
              Terms
            </Link>
          </p>
        </footer>
      </div>

      <aside className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-on-ink on-ink lg:flex">
        <div aria-hidden="true" className="grid-veil absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute top-[-12rem] right-[-12rem] size-[34rem] rounded-full bg-brand-700/40 blur-[120px]"
        />

        <LuminaMark tone="light" className="relative size-10" />

        <figure className="relative max-w-md">
          <Quote className="size-7 text-citrine-500" aria-hidden="true" />
          <blockquote className="mt-5 font-display text-[1.75rem] leading-snug text-on-ink">
            “{aside.quote}”
          </blockquote>
          <figcaption className="mt-5 text-sm text-on-ink-2">
            {aside.name} · {aside.role}
            <span className="mt-1 block text-on-ink-3">Illustrative testimonial</span>
          </figcaption>
        </figure>

        <ul className="relative space-y-3">
          {aside.assurances.map((assurance) => (
            <li key={assurance} className="flex items-start gap-3 text-[0.9375rem] text-on-ink-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
              {assurance}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
