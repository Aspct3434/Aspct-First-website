import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import { Accordion } from '@/components/ui/accordion';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import type { Faq } from '@/lib/data/content';

export function FaqSection({
  id = 'faq',
  eyebrow = 'Questions',
  title = 'The things people ask before they connect a bank',
  lede,
  faqs,
  name = 'faq',
  footer,
  tone = 'paper',
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  faqs: Faq[];
  name?: string;
  footer?: React.ReactNode;
  tone?: 'paper' | 'paper2';
}) {
  return (
    <Section id={id} aria-labelledby={`${id}-title`} tone={tone}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} lede={lede} />
            {footer ?? (
              <p className="mt-6 text-[0.9375rem] text-text-2">
                Still unsure?{' '}
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:text-brand-800"
                >
                  Ask us directly
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </p>
            )}
          </div>

          <Accordion name={name} items={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />
        </div>
      </Container>
    </Section>
  );
}

/** FAQPage structured data, emitted next to the visible accordion. */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
