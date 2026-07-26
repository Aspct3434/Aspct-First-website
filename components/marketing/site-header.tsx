'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Close, Menu } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { primaryNav } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  // Navigating within the menu must dismiss it — a client-side route change
  // does not unmount the dialog on its own.
  const closeMenu = () => setMenuOpen(false);
  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-b border-line bg-paper/85 shadow-xs backdrop-blur-md'
          : 'border-b border-transparent bg-paper',
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative flex h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors',
                    isActive(item.href)
                      ? 'text-text'
                      : 'text-text-2 hover:bg-paper-2 hover:text-text',
                  )}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-brand-600"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin/"
            className="hidden rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-text-2 transition-colors hover:bg-paper-2 hover:text-text sm:block"
          >
            Sign in
          </Link>
          {/* Wrapped rather than given `hidden` directly: the button's own
              `inline-flex` would otherwise win the cascade over `hidden`. */}
          <div className="hidden xs:block">
            <ButtonLink
              href="/signup/"
              size="sm"
              trailing={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              Start free trial
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="flex size-10 items-center justify-center rounded-full text-text ring-1 ring-line-2 transition-colors hover:bg-paper-2 lg:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/*
        The mobile menu is a native modal dialog: the platform supplies the focus
        trap, focus restoration, Escape-to-close and inertness of the page behind.
      */}
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-paper p-0 text-text backdrop:bg-ink/40 lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="container-page flex h-18 shrink-0 items-center justify-between border-b border-line">
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

          <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto py-6">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href} className="border-b border-line last:border-0">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span
                        className={cn(
                          'block text-lg font-semibold',
                          isActive(item.href) ? 'text-brand-700' : 'text-text',
                        )}
                      >
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="mt-0.5 block text-sm text-text-3">{item.description}</span>
                      ) : null}
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-text-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li className="border-t border-line">
                <Link
                  href="/app/"
                  onClick={closeMenu}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block text-lg font-semibold text-text">Live demo</span>
                    <span className="mt-0.5 block text-sm text-text-3">
                      The dashboard, with sample data
                    </span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-text-3" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="container-page shrink-0 space-y-3 border-t border-line py-5">
            <ButtonLink href="/signup/" size="lg" full onClick={closeMenu}>
              Start free trial
            </ButtonLink>
            <ButtonLink href="/signin/" variant="secondary" size="lg" full onClick={closeMenu}>
              Sign in
            </ButtonLink>
            <p className="pt-1 text-center text-[0.8125rem] text-text-3">
              30 days free. No card required.
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
