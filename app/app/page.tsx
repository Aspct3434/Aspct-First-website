import type { Metadata } from 'next';
import { AppShell } from '@/components/dashboard/app-shell';
import { Dashboard } from '@/components/dashboard/dashboard';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Dashboard demo',
  description:
    'An interactive preview of the Lumina dashboard: balances, spending trends, budget pace, savings goals, transactions and AI recommendations — loaded with realistic sample data.',
  path: '/app/',
  socialTitle: 'Live dashboard demo · Lumina',
  socialDescription:
    'Balances, spending trends, budget pace, savings goals and AI recommendations — with sample data, no sign-up.',
});

export default function AppPage() {
  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}
