import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalLayout, type LegalSection } from '@/components/marketing/legal-layout';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy policy',
  description:
    'What data Lumina collects, why, how long it is kept, who it is shared with, and how to get it deleted.',
  path: '/legal/privacy/',
});

const sections: LegalSection[] = [
  {
    id: 'summary',
    heading: 'The short version',
    body: (
      <>
        <p>
          We collect the financial data you connect, the account details you give us, and basic
          product usage. We use it to run Lumina for you. We do not sell it, rent it, or share it
          with advertisers — in aggregate or otherwise. You can export everything and delete your
          account at any time, and connected data is destroyed within 30 days.
        </p>
        <p>
          The rest of this page is the detail behind those four sentences. If anything here is
          unclear, write to <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and we
          will answer in plain language.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: (
      <ul>
        <li>
          <strong>Account data.</strong> Your name, email address, and a hashed password or passkey
          credential. Billing details are held by our payment processor; we store only the last four
          digits and the expiry.
        </li>
        <li>
          <strong>Financial data.</strong> Transactions, balances, account names and types, and
          institution identifiers, received through regulated aggregation partners. We never receive
          your online banking credentials.
        </li>
        <li>
          <strong>Data you create.</strong> Budgets, goals, rules, categories, tags, notes and
          corrections.
        </li>
        <li>
          <strong>Product usage.</strong> Which screens are used and which actions succeed or fail,
          tied to your account so support can help you. We do not use third-party advertising or
          cross-site trackers.
        </li>
        <li>
          <strong>Technical data.</strong> IP address, device type and browser, retained for 30 days
          for security and abuse prevention.
        </li>
      </ul>
    ),
  },
  {
    id: 'why',
    heading: 'Why we process it',
    body: (
      <ul>
        <li>
          <strong>To provide the service</strong> — categorizing transactions, calculating budgets
          and forecasts, and running the automations you create. Legal basis: performance of a
          contract.
        </li>
        <li>
          <strong>To keep accounts secure</strong> — detecting unusual sign-ins and abuse. Legal
          basis: legitimate interests.
        </li>
        <li>
          <strong>To improve accuracy</strong> — your corrections improve your own categorization
          model. Legal basis: legitimate interests, with an opt-out in Settings.
        </li>
        <li>
          <strong>To meet legal obligations</strong> — tax, accounting and lawful requests. Legal
          basis: legal obligation.
        </li>
      </ul>
    ),
  },
  {
    id: 'ai',
    heading: 'How we use AI, and what we do not do with it',
    body: (
      <>
        <p>
          Categorization, recurring-charge detection and forecasting run on models we operate
          ourselves. Your data is used to personalize <strong>your</strong> model. It is not used to
          train a shared model that serves other customers, and it is not sent to third-party
          model providers.
        </p>
        <p>
          Insights are generated from your own ledger and always show the transactions behind them.
          No automated decision produces a legal or similarly significant effect, and nothing moves
          money without a rule you created and approved.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    heading: 'Who we share it with',
    body: (
      <>
        <p>Four categories of processor, each under contract and each audited annually:</p>
        <ul>
          <li>
            <strong>Aggregation partners</strong> who hold the read-only connection to your bank.
          </li>
          <li>
            <strong>Cloud infrastructure</strong> in the US and EU, with data residency matched to
            your region.
          </li>
          <li>
            <strong>Payment processing</strong> for subscriptions.
          </li>
          <li>
            <strong>Support tooling</strong>, which sees your email address and conversation, and
            reaches your financial data only with your explicit, time-boxed approval.
          </li>
        </ul>
        <p>
          We do not sell personal information as defined by the CCPA, and we have never done so. If
          Lumina were ever acquired, members would be given 90 days&rsquo; notice to export and
          close their accounts before any transfer of data.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    body: (
      <ul>
        <li>Financial and account data: for as long as your account is open.</li>
        <li>After deletion: purged from production within 7 days, and from backups within 30.</li>
        <li>Technical logs: 30 days.</li>
        <li>Invoices and tax records: 7 years, as required by law.</li>
      </ul>
    ),
  },
  {
    id: 'rights',
    heading: 'Your rights',
    body: (
      <>
        <p>
          Wherever you live, you can access, export, correct and delete your data, and object to
          processing based on legitimate interests. Export and deletion are self-service in
          Settings; the rest we handle within 30 days of a request to{' '}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
        <p>
          EU and UK members may complain to their supervisory authority. California residents may
          exercise CCPA rights without any change to price or service.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    heading: 'Cookies',
    body: (
      <p>
        We set one essential cookie to keep you signed in and one to remember interface preferences.
        There are no advertising, analytics or social cookies, which is why you have not been asked
        to dismiss a consent banner.
      </p>
    ),
  },
  {
    id: 'contact',
    heading: 'Contacting us',
    body: (
      <p>
        {site.legalName}, {site.address.street}, {site.address.city}, {site.address.region}{' '}
        {site.address.postal}. Privacy questions:{' '}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. Security reports:{' '}
        <a href={`mailto:${site.securityEmail}`}>{site.securityEmail}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      updated="12 June 2026"
      summary="What we collect, why we collect it, who touches it, and how to make it go away."
      sections={sections}
    />
  );
}
