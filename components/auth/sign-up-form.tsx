'use client';

import Link from 'next/link';
import { useMemo, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, CheckCircle, Close } from '@/components/icons';
import { SocialButtons } from '@/components/auth/social-buttons';
import { Button, ButtonLink } from '@/components/ui/button';
import { CheckboxField, PasswordField, TextField } from '@/components/ui/form';
import { cn } from '@/lib/utils';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const requirements = [
  { id: 'length', label: 'At least 12 characters', test: (v: string) => v.length >= 12 },
  { id: 'case', label: 'Upper and lower case', test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: 'number', label: 'A number', test: (v: string) => /\d/.test(v) },
  { id: 'symbol', label: 'A symbol', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const strengthLabels = ['Too short', 'Weak', 'Fair', 'Strong', 'Very strong'] as const;

function scorePassword(value: string) {
  if (!value) return 0;
  const met = requirements.filter((requirement) => requirement.test(value)).length;
  // Length carries more weight than character classes, which is what actually
  // resists offline cracking.
  const lengthBonus = value.length >= 16 ? 1 : 0;
  return Math.min(4, Math.max(value.length < 8 ? 0 : 1, met - 1 + lengthBonus));
}

export function SignUpForm() {
  const [values, setValues] = useState({ name: '', email: '', password: '', terms: false });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'done'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const score = useMemo(() => scorePassword(values.password), [values.password]);
  const met = useMemo(
    () => requirements.filter((requirement) => requirement.test(values.password)).length,
    [values.password],
  );

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: Record<string, string | undefined> = {};

    if (!values.name.trim()) found.name = 'Enter your name — we use it to say hello, nothing else.';
    if (!values.email.trim()) found.email = 'Enter an email address.';
    else if (!EMAIL.test(values.email.trim()))
      found.email = 'Enter a complete address, like alex@company.com.';
    if (!values.password) found.password = 'Choose a password.';
    else if (met < 3)
      found.password = 'Meet at least three of the four requirements below.';
    if (!values.terms) found.terms = 'Please accept the terms and privacy policy to continue.';

    const filtered = Object.fromEntries(Object.entries(found).filter(([, v]) => v));
    setErrors(filtered);

    if (Object.keys(filtered).length) {
      const first = Object.keys(filtered)[0];
      formRef.current?.querySelector<HTMLElement>(`#signup-${first}`)?.focus();
      return;
    }

    setState('submitting');
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setState('done');
  }

  if (state === 'done') {
    return (
      <div>
        <span className="flex size-12 items-center justify-center rounded-full bg-positive-soft text-positive">
          <CheckCircle className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-display-3 font-normal text-text">
          You are all set, {values.name.trim().split(' ')[0]}
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-text-2">
          In the real product, the next step is connecting your first account — about two minutes,
          on your bank&rsquo;s own sign-in page. This is a demonstration build, so no account has
          been created and nothing was sent anywhere.
        </p>

        <ol className="mt-8 space-y-3 rounded-xl bg-paper-2 p-6 ring-1 ring-line">
          {[
            'Connect an account (read-only, about 2 minutes)',
            'Lumina categorizes up to 24 months of history',
            'Approve the budget and savings rule it proposes',
          ].map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-[0.9375rem] text-text-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[0.75rem] font-semibold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <ButtonLink
          href="/app/"
          size="lg"
          full
          className="mt-6"
          trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
        >
          Go to your dashboard
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="font-display text-display-3 font-normal text-text">
          Start your 30-day trial
        </h1>
        <p className="mt-3 text-[1.0625rem] text-text-2">
          Full access to Plus. No card required.{' '}
          <Link
            href="/signin/"
            className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-[3px] hover:text-brand-800"
          >
            Already have an account?
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <SocialButtons mode="sign-up" />
      </div>

      <div className="my-7 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-line-2" />
        <span className="text-[0.8125rem] font-medium text-text-3">or with email</span>
        <span className="h-px flex-1 bg-line-2" />
      </div>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          id="signup-name"
          name="name"
          label="Your name"
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event) => set('name', event.target.value)}
          placeholder="Alex Moreau"
        />

        <TextField
          id="signup-email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(event) => set('email', event.target.value)}
          placeholder="alex@moreau.co"
        />

        <div>
          <PasswordField
            id="signup-password"
            name="password"
            label="Password"
            autoComplete="new-password"
            required
            value={values.password}
            error={errors.password}
            onChange={(event) => set('password', event.target.value)}
            placeholder="Something only you would pick"
          />

          {/* Strength is advisory, so it is announced politely rather than as an alert. */}
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3].map((segment) => (
                  <span
                    key={segment}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors duration-300',
                      values.password && score > segment
                        ? score <= 1
                          ? 'bg-negative'
                          : score === 2
                            ? 'bg-caution'
                            : 'bg-positive'
                        : 'bg-paper-3',
                    )}
                  />
                ))}
              </div>
              <p aria-live="polite" className="w-24 shrink-0 text-right text-[0.8125rem] font-medium text-text-2">
                {values.password ? strengthLabels[score] : ''}
              </p>
            </div>

            <ul className="mt-3 grid gap-x-4 gap-y-1.5 xs:grid-cols-2">
              {requirements.map((requirement) => {
                const passed = requirement.test(values.password);
                return (
                  <li
                    key={requirement.id}
                    className={cn(
                      'flex items-center gap-2 text-[0.8125rem]',
                      passed ? 'text-positive' : 'text-text-3',
                    )}
                  >
                    {passed ? (
                      <Check className="size-3.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <Close className="size-3.5 shrink-0 opacity-50" aria-hidden="true" />
                    )}
                    <span>{requirement.label}</span>
                    <span className="sr-only">{passed ? '— met' : '— not yet met'}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <CheckboxField
          id="signup-terms"
          name="terms"
          checked={values.terms}
          error={errors.terms}
          onChange={(event) => set('terms', event.target.checked)}
        >
          I agree to the{' '}
          <Link href="/legal/terms/" className="font-medium text-brand-700 underline underline-offset-[3px]">
            terms of service
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy/" className="font-medium text-brand-700 underline underline-offset-[3px]">
            privacy policy
          </Link>
          .
        </CheckboxField>

        <Button
          type="submit"
          size="lg"
          full
          loading={state === 'submitting'}
          loadingLabel="Creating your account…"
          trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-[0.8125rem] leading-relaxed text-text-3">
        No card required. Your trial ends by itself after 30 days — there is nothing to cancel.
      </p>
    </>
  );
}
