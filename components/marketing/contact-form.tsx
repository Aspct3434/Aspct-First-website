'use client';

import { useRef, useState, type FormEvent } from 'react';
import { AlertTriangle, ArrowRight, Calendar, CheckCircle, Mail } from '@/components/icons';
import { Button, ButtonLink } from '@/components/ui/button';
import {
  CheckboxField,
  FormStatus,
  SelectField,
  TextAreaField,
  TextField,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/toast';

type FieldName = 'name' | 'email' | 'company' | 'topic' | 'teamSize' | 'message' | 'consent';

type Values = {
  name: string;
  email: string;
  company: string;
  topic: string;
  teamSize: string;
  message: string;
  consent: boolean;
};

const initialValues: Values = {
  name: '',
  email: '',
  company: '',
  topic: '',
  teamSize: '',
  message: '',
  consent: false,
};

const labels: Record<FieldName, string> = {
  name: 'Your name',
  email: 'Email address',
  company: 'Company',
  topic: 'What can we help with?',
  teamSize: 'How many people would use Lumina?',
  message: 'Your message',
  consent: 'Contact consent',
};

/** Deliberately permissive: real addresses break strict patterns more often than not. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.name.trim()) errors.name = 'Enter your name so we know who we are replying to.';
  else if (values.name.trim().length < 2) errors.name = 'That looks too short to be a name.';

  if (!values.email.trim()) errors.email = 'Enter an email address so we can reply.';
  else if (!EMAIL.test(values.email.trim()))
    errors.email = 'Enter a complete address, like alex@company.com.';

  if (!values.topic) errors.topic = 'Choose the closest option so we route this to the right team.';

  if (!values.message.trim()) errors.message = 'Tell us what you need — a sentence is plenty.';
  else if (values.message.trim().length < 15)
    errors.message = 'A little more detail helps us give you a useful answer.';

  if (!values.consent) errors.consent = 'We need your permission before we can email you back.';

  return errors;
}

/**
 * Lead form with client-side validation.
 *
 * Behaviour, in order of how much it matters:
 * 1. Nothing is marked invalid before the first submit — being told off while
 *    still typing is the most common way forms feel hostile.
 * 2. After a failed submit, a summary names each problem and links to it, and
 *    focus moves to the first invalid control.
 * 3. Fields then re-validate on change, so errors clear as they are fixed.
 * 4. Success replaces the form with what happens next, not just a tick.
 */
export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const update = <K extends FieldName>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setState('idle');
      // Move the user to the problem, rather than announcing it and leaving
      // them to find it.
      requestAnimationFrame(() => {
        const firstField = Object.keys(found)[0] as FieldName;
        const control = formRef.current?.querySelector<HTMLElement>(`#contact-${firstField}`);
        summaryRef.current?.scrollIntoView({ block: 'nearest' });
        control?.focus();
      });
      return;
    }

    setState('sending');
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // This build has no backend. `@example.com` is wired to the failure path so
    // the error state is reachable and testable.
    if (values.email.trim().toLowerCase().endsWith('@example.com')) {
      setState('failed');
      return;
    }

    setState('sent');
    toast({
      title: 'Message sent',
      description: 'We reply to everything within one business day.',
    });
  }

  if (state === 'sent') {
    return (
      <div className="rounded-xl bg-card p-8 shadow-sm ring-1 ring-line sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-positive-soft text-positive">
          <CheckCircle className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-display-3 font-normal text-text">
          Thanks, {values.name.trim().split(' ')[0]}. That is with us.
        </h2>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-text-2">
          A confirmation is on its way to{' '}
          <span className="font-semibold text-text">{values.email.trim()}</span>. If it has not
          arrived in ten minutes, check your spam folder — then tell us and we will find it.
        </p>

        <ol className="mt-8 space-y-4 border-t border-line pt-8">
          {[
            {
              icon: Mail,
              title: 'A human reads it',
              body: 'Not a routing bot. Our team answers everything within one business day, usually the same afternoon.',
            },
            {
              icon: Calendar,
              title: 'If you asked for a walkthrough',
              body: 'We will send three times in your timezone. Twenty minutes, screen shared, your questions rather than our slides.',
            },
            {
              icon: ArrowRight,
              title: 'Meanwhile',
              body: 'The live demo has the whole dashboard loaded with sample data — no sign-up needed.',
            },
          ].map(({ icon: Glyph, title, body }) => (
            <li key={title} className="flex items-start gap-4">
              <Glyph className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <p className="text-[0.9375rem] font-semibold text-text">{title}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-text-2">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/app/" size="md">
            Open the live demo
          </ButtonLink>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setValues(initialValues);
              setErrors({});
              setSubmitted(false);
              setState('idle');
            }}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  const errorEntries = Object.entries(errors) as [FieldName, string][];
  const showSummary = submitted && errorEntries.length > 0;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-line sm:p-8"
      aria-describedby="contact-form-intro"
    >
      <p id="contact-form-intro" className="text-[0.9375rem] text-text-2">
        Tell us what you need and we will reply within one business day. Fields marked
        <span aria-hidden="true"> * </span>
        <span className="sr-only"> required </span>
        are required.
      </p>

      <div aria-live="polite" className="mt-5 empty:mt-0">
        {showSummary ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            className="rounded-md bg-negative-soft p-4 ring-1 ring-negative/25"
          >
            <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-negative">
              <AlertTriangle className="size-[1.1rem]" aria-hidden="true" />
              {errorEntries.length === 1
                ? 'There is one thing to fix'
                : `There are ${errorEntries.length} things to fix`}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a
                    href={`#contact-${field}`}
                    className="text-[0.875rem] text-negative underline underline-offset-[3px] hover:no-underline"
                    onClick={(event) => {
                      event.preventDefault();
                      formRef.current?.querySelector<HTMLElement>(`#contact-${field}`)?.focus();
                    }}
                  >
                    <span className="font-medium">{labels[field]}:</span> {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {state === 'failed' ? (
          <FormStatus status="error">
            <p className="font-semibold">We could not send that.</p>
            <p className="mt-1 font-normal">
              Something went wrong on our side, and nothing was saved. Try again, or email{' '}
              <a href="mailto:support@lumina.finance" className="underline underline-offset-[3px]">
                support@lumina.finance
              </a>{' '}
              directly.
            </p>
          </FormStatus>
        ) : null}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          id="contact-name"
          name="name"
          label={labels.name}
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="Alex Moreau"
        />
        <TextField
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          label={labels.email}
          autoComplete="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(event) => update('email', event.target.value)}
          placeholder="alex@company.com"
        />
        <TextField
          id="contact-company"
          name="company"
          label={labels.company}
          autoComplete="organization"
          optionalLabel
          value={values.company}
          onChange={(event) => update('company', event.target.value)}
          placeholder="Northwind Labs"
        />
        <SelectField
          id="contact-topic"
          name="topic"
          label={labels.topic}
          required
          value={values.topic}
          error={errors.topic}
          onChange={(event) => update('topic', event.target.value)}
        >
          <option value="">Choose one…</option>
          <option value="demo">A 20-minute product walkthrough</option>
          <option value="pricing">Pricing or billing</option>
          <option value="security">Security review or documentation</option>
          <option value="support">Help with my account</option>
          <option value="press">Press or partnership</option>
          <option value="other">Something else</option>
        </SelectField>

        <SelectField
          id="contact-teamSize"
          name="teamSize"
          label={labels.teamSize}
          optionalLabel
          hint="Household plans cover up to five people."
          value={values.teamSize}
          onChange={(event) => update('teamSize', event.target.value)}
          wrapperClassName="sm:col-span-2"
        >
          <option value="">Prefer not to say</option>
          <option value="1">Just me</option>
          <option value="2">Two of us</option>
          <option value="3-5">Three to five</option>
          <option value="6+">More than five</option>
        </SelectField>

        <TextAreaField
          id="contact-message"
          name="message"
          label={labels.message}
          required
          value={values.message}
          error={errors.message}
          onChange={(event) => update('message', event.target.value)}
          hint="What are you trying to work out? The more specific, the more useful our answer."
          placeholder="We are two freelancers with irregular income and four accounts between us. Can Lumina forecast that?"
          wrapperClassName="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <CheckboxField
            id="contact-consent"
            name="consent"
            checked={values.consent}
            error={errors.consent}
            onChange={(event) => update('consent', event.target.checked)}
          >
            I agree that Lumina may use these details to reply to me. We will not add you to a
            mailing list, and you can ask us to delete the message at any time.
          </CheckboxField>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 xs:flex-row xs:items-center xs:justify-between">
        <Button
          type="submit"
          size="lg"
          loading={state === 'sending'}
          loadingLabel="Sending…"
          trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
        >
          Send message
        </Button>
        <p className="text-[0.8125rem] leading-snug text-text-3">
          Typical reply time: <span className="font-semibold text-text-2">under 4 hours</span> on
          weekdays.
        </p>
      </div>

      <p className="mt-6 rounded-md bg-paper-2 px-4 py-3 text-[0.8125rem] leading-relaxed text-text-3">
        <span className="font-semibold text-text-2">Demonstration form.</span> Nothing is
        transmitted or stored — submission is simulated in your browser. Submitting with an address
        ending <code className="font-mono">@example.com</code> shows the failure state.
      </p>
    </form>
  );
}
