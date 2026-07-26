import { AnnouncementBar } from '@/components/marketing/announcement-bar';
import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-ink shadow-lg">
        Skip to main content
      </a>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
