import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalLayout, type LegalSection } from '@/components/marketing/legal-layout';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of service',
  description:
    'The agreement between you and Lumina: what the service does, what it does not do, how billing works, and how either side can end it.',
  path: '/legal/terms/',
});

const sections: LegalSection[] = [
  {
    id: 'agreement',
    heading: 'The agreement',
    body: (
      <p>
        These terms are between you and {site.legalName}. By creating an account you accept them. If
        you are using a Household plan, the person who pays accepts them on behalf of the household,
        and each member accepts them for their own use.
      </p>
    ),
  },
  {
    id: 'what-lumina-is',
    heading: 'What Lumina is, and is not',
    body: (
      <>
        <p>
          Lumina is a personal finance <strong>information</strong> service. It reads your accounts
          and helps you plan. It is not a bank, it does not hold your money, and it is not a
          regulated financial adviser.
        </p>
        <p>
          Nothing in the product is financial, tax or legal advice. Forecasts are estimates and can
          be wrong. Decisions you make using Lumina remain yours.
        </p>
      </>
    ),
  },
  {
    id: 'connections',
    heading: 'Bank connections and automation',
    body: (
      <ul>
        <li>Connections are read-only at your institution.</li>
        <li>
          Automated transfers move money only between accounts you own, only through rules you
          create, and never below the balance floor you set.
        </li>
        <li>
          You are responsible for keeping enough funds available for your own obligations. Lumina
          is not liable for fees resulting from your own account activity.
        </li>
        <li>
          An automated transfer can be reversed inside the product for 24 hours; after that, it is
          an ordinary transfer between your accounts.
        </li>
      </ul>
    ),
  },
  {
    id: 'billing',
    heading: 'Plans, billing and refunds',
    body: (
      <ul>
        <li>
          Trials run 30 days on Plus without a card and do not convert to a paid plan. At the end,
          accounts move to Starter.
        </li>
        <li>Paid plans renew automatically until cancelled, at the price shown when you signed up.</li>
        <li>
          Annual plans cancelled within 30 days of billing are refunded in full. After that we
          refund unused whole months on request.
        </li>
        <li>Prices exclude sales tax and VAT, which are calculated from your billing address.</li>
        <li>
          Price changes are announced at least 60 days ahead and never apply to a term you have
          already paid for.
        </li>
      </ul>
    ),
  },
  {
    id: 'your-data',
    heading: 'Your data stays yours',
    body: (
      <>
        <p>
          You own everything you put into Lumina. You grant us only the license needed to run the
          service for you.
        </p>
        <p>
          <strong>We will not sell, rent or share your financial data</strong> with advertisers or
          data brokers, in identifiable or aggregate form. If Lumina is acquired, members receive at
          least 90 days&rsquo; notice to export and close their accounts before any data transfer.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable use',
    body: (
      <ul>
        <li>Connect only accounts you are entitled to access.</li>
        <li>Do not attempt to disrupt the service or access another member&rsquo;s data.</li>
        <li>
          Security research is welcome under our disclosure policy, and we will not pursue
          researchers who follow it.
        </li>
      </ul>
    ),
  },
  {
    id: 'availability',
    heading: 'Availability and support',
    body: (
      <p>
        We target 99.9% monthly availability, excluding announced maintenance. Bank connections
        depend on third parties and occasionally fail; when that happens we show you which
        connection is stale and when it last succeeded, rather than quietly presenting old numbers
        as current.
      </p>
    ),
  },
  {
    id: 'liability',
    heading: 'Liability',
    body: (
      <p>
        To the extent permitted by law, our total liability in any 12-month period is limited to the
        amount you paid us in that period. We do not exclude liability for fraud, death or personal
        injury caused by negligence, or anything else that cannot lawfully be excluded.
      </p>
    ),
  },
  {
    id: 'ending',
    heading: 'Ending the agreement',
    body: (
      <p>
        You can close your account at any time from Settings, and export first. We may suspend an
        account for non-payment or for a serious breach of acceptable use, with notice and an
        opportunity to fix it wherever that is possible.
      </p>
    ),
  },
  {
    id: 'changes',
    heading: 'Changes to these terms',
    body: (
      <p>
        We will give at least 30 days&rsquo; notice of material changes by email and in-product, and
        keep a public change log. Continuing to use Lumina after that means accepting the new terms.
        Questions: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of service"
      updated="12 June 2026"
      summary="What we promise, what we do not, and how either of us can walk away."
      sections={sections}
    />
  );
}
