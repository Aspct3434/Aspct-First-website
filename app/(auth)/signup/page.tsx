import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { AuthShell } from '@/components/auth/auth-shell';
import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata: Metadata = pageMetadata({
  title: 'Create your account',
  description:
    'Start a 30-day free trial of Lumina Plus. No card required, read-only bank connections, and nothing to cancel.',
  path: '/signup/',
});

export default function SignUpPage() {
  return (
    <AuthShell
      aside={{
        quote:
          'It showed me my own last twelve months and proposed the budget. I changed two numbers and that was setup.',
        name: 'Priya Raghunathan',
        role: 'Senior product manager, Seattle',
        assurances: [
          '30 days of Plus, free — and no card to remove afterwards',
          'Your banking password never reaches Lumina',
          'Export everything, or delete it all, in two clicks',
        ],
      }}
    >
      <SignUpForm />
    </AuthShell>
  );
}
