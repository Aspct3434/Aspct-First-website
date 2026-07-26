'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Bell,
  ChartBar,
  ChartLine,
  Close,
  Home,
  Layers,
  Menu,
  Receipt,
  Repeat,
  Search,
  Sparkle,
  Target,
} from '@/components/icons';
import { Logo, LuminaMark } from '@/components/ui/logo';
import { demoUser } from '@/lib/data/demo-account';
import { cn } from '@/lib/utils';

/**
 * The dashboard is one continuous page, so the sidebar navigates within it
 * rather than to routes that do not exist. Every item resolves to a real
 * section, and the active item is driven by what is actually on screen.
 */
const navItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'cashflow', label: 'Cash flow', icon: ChartLine },
  { id: 'spending', label: 'Spending', icon: ChartBar },
  { id: 'budgets', label: 'Budgets', icon: Layers },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'insights', label: 'Insights', icon: Sparkle },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'recurring', label: 'Recurring', icon: Repeat },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function NavList({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {navItems.map(({ id, label, icon: Glyph }) => {
        const isActive = active === id;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-text-2 hover:bg-paper-2 hover:text-text',
              )}
            >
              <Glyph className="size-[1.15rem] shrink-0" aria-hidden="true" />
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const active = useScrollSpy(navItems.map((item) => item.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  return (
    <div className="min-h-dvh bg-paper-2 lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <a
        href="#app-main"
        className="skip-link rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-ink shadow-lg"
      >
        Skip to dashboard content
      </a>

      {/* Sidebar — desktop */}
      <div className="hidden border-r border-line bg-paper lg:flex lg:h-dvh lg:flex-col lg:sticky lg:top-0">
        <div className="flex h-18 shrink-0 items-center border-b border-line px-5">
          <Logo />
        </div>

        <nav aria-label="Dashboard sections" className="flex-1 overflow-y-auto p-4">
          <NavList active={active} />

          <div className="mt-8 rounded-lg bg-brand-50 p-4 ring-1 ring-brand-200/70">
            <p className="text-[0.8125rem] font-semibold text-brand-700">Interactive demo</p>
            <p className="mt-1.5 text-[0.8125rem] leading-snug text-text-2">
              Sample data for a fictional member. Nothing here is real, and nothing is stored.
            </p>
            <Link
              href="/signup/"
              className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand-700 underline decoration-brand-300 underline-offset-[3px] hover:text-brand-800"
            >
              Start your own trial
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </nav>

        <div className="shrink-0 border-t border-line p-4">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-[0.8125rem] font-semibold text-white"
            >
              {demoUser.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.875rem] font-semibold text-text">{demoUser.name}</p>
              <p className="truncate text-[0.75rem] text-text-3">
                {demoUser.plan} · {demoUser.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:h-18">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-text ring-1 ring-line-2 transition-colors hover:bg-paper-2 lg:hidden"
            >
              <Menu className="size-5" />
              <span className="sr-only">Open dashboard menu</span>
            </button>

            <div className="lg:hidden">
              <LuminaMark className="size-8" />
            </div>

            <form
              role="search"
              className="ml-auto hidden min-w-0 flex-1 sm:ml-0 sm:block sm:max-w-md"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="app-search" className="sr-only">
                Ask Lumina a question about your money
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-text-3"
                  aria-hidden="true"
                />
                <input
                  id="app-search"
                  type="search"
                  placeholder="Ask Lumina — “how much did I spend on travel?”"
                  className="h-10 w-full rounded-full bg-paper-2 pr-4 pl-10 text-[0.875rem] text-text ring-1 ring-inset ring-line placeholder:text-text-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                />
              </div>
            </form>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <Link
                href="/"
                className="hidden rounded-full px-3.5 py-2 text-[0.875rem] font-medium text-text-2 transition-colors hover:bg-paper-2 hover:text-text md:block"
              >
                Back to site
              </Link>
              <button
                type="button"
                className="relative flex size-10 items-center justify-center rounded-full text-text-2 ring-1 ring-line-2 transition-colors hover:bg-paper-2 hover:text-text"
              >
                <Bell className="size-[1.15rem]" />
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2.5 size-2 rounded-full bg-clay-500 ring-2 ring-paper"
                />
                <span className="sr-only">Notifications, 2 unread</span>
              </button>
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-brand-700 text-[0.8125rem] font-semibold text-white"
              >
                {demoUser.initials}
              </span>
            </div>
          </div>
        </header>

        <main id="app-main" tabIndex={-1} className="min-w-0 flex-1 focus:outline-none">
          {children}
        </main>
      </div>

      {/* Sidebar — mobile, as a native modal so focus is trapped and Escape works */}
      <dialog
        ref={dialogRef}
        aria-label="Dashboard menu"
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-[19rem] max-w-[85vw] bg-paper p-0 text-text backdrop:bg-ink/45 lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex size-10 items-center justify-center rounded-full text-text ring-1 ring-line-2 transition-colors hover:bg-paper-2"
            >
              <Close className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Dashboard sections" className="flex-1 overflow-y-auto p-4">
            <NavList active={active} onNavigate={() => setMenuOpen(false)} />
          </nav>

          <div className="shrink-0 border-t border-line p-4">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-text-2 hover:bg-paper-2"
            >
              Back to lumina.finance
            </Link>
            <Link
              href="/signup/"
              className="mt-1 block rounded-lg px-3 py-2.5 text-[0.9375rem] font-semibold text-brand-700 hover:bg-brand-50"
            >
              Start your own trial
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );
}
