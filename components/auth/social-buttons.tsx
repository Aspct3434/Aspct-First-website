'use client';

import { AppleMark, GoogleMark } from '@/components/icons';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

/**
 * Social sign-in.
 *
 * These are represented visually only — this build has no identity provider
 * behind it. Rather than leaving dead buttons on the page, each one explains
 * itself when pressed, so nothing on the site is a control that does nothing.
 */
export function SocialButtons({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const { toast } = useToast();
  const verb = mode === 'sign-in' ? 'Sign in' : 'Sign up';

  const providers = [
    { name: 'Google', mark: <GoogleMark className="size-[1.15rem]" /> },
    { name: 'Apple', mark: <AppleMark className="size-[1.15rem]" /> },
  ];

  return (
    <div className="grid gap-3 xs:grid-cols-2">
      {providers.map((provider) => (
        <button
          key={provider.name}
          type="button"
          onClick={() =>
            toast({
              tone: 'info',
              title: `${provider.name} sign-in is not wired up`,
              description:
                'This is a demonstration build with no identity provider. Use the email form below.',
            })
          }
          className={cn(
            'flex h-11 items-center justify-center gap-2.5 rounded-full bg-card px-4',
            'text-[0.9375rem] font-semibold text-text shadow-xs ring-1 ring-inset ring-line-2',
            'transition-colors hover:bg-paper-2 hover:ring-control',
          )}
        >
          {provider.mark}
          {verb} with {provider.name}
        </button>
      ))}
    </div>
  );
}
