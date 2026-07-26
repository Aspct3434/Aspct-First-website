import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { AuthShell } from '@/components/auth/auth-shell';
import { SignInForm } from '@/components/auth/sign-in-form';

export const metadata: Metadata = pageMetadata({
  title: 'Sign in',
  description: 'Sign in to your Lumina account.',
  path: '/signin/',
  noindex: true,
});

export default function SignInPage() {
  return (
    <AuthShell
      aside={{
        quote:
          'I stopped checking three banking apps on a Sunday. That is the whole review. One page, always current.',
        name: 'Tomás Herrera',
        role: 'Structural engineer, Austin',
        assurances: [
          'Read-only connections — Lumina can never move money at your bank',
          'Passkeys and two-factor authentication on every account',
          'SOC 2 Type II and ISO 27001, audited annually',
        ],
      }}
    >
      <SignInForm />
    </AuthShell>
  );
}
