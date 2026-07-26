import { Bank, Eye, Lock, ShieldCheck } from '@/components/icons';
import { Container } from '@/components/ui/layout';

const marks = [
  { icon: Lock, label: 'Read-only connections', detail: 'Lumina can never move money at your bank' },
  { icon: ShieldCheck, label: 'SOC 2 Type II', detail: 'Independently audited every year' },
  { icon: Bank, label: '11,000+ institutions', detail: 'US, UK, Canada and the EU' },
  { icon: Eye, label: 'Never sold, never shared', detail: 'Funded by subscriptions, not by data' },
];

/**
 * The first objection a finance product meets is "should I trust you with my
 * bank?" — so it is answered immediately below the fold, in specifics rather
 * than badges.
 */
export function TrustStrip() {
  return (
    <section aria-label="Security and coverage at a glance" className="border-y border-line bg-paper-2">
      <Container>
        <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {marks.map(({ icon: Glyph, label, detail }, index) => (
            <li
              key={label}
              className={[
                'flex items-start gap-3.5 py-6 sm:py-7',
                index % 2 === 1 ? 'sm:border-l sm:border-line sm:pl-6' : 'sm:pr-6',
                'lg:border-l lg:border-line lg:px-6 lg:first:border-l-0 lg:first:pl-0',
                index === 2 ? 'sm:border-l-0 sm:pl-0 lg:border-l lg:pl-6' : '',
              ].join(' ')}
            >
              <Glyph className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[0.9375rem] font-semibold text-text">{label}</p>
                <p className="mt-0.5 text-sm leading-snug text-text-3">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
