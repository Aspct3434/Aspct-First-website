'use client';

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle } from '@/components/icons';
import { SocialButtons } from '@/components/auth/social-buttons';
import { Button, ButtonLink } from '@/components/ui/button';
import { CheckboxField, FormStatus, PasswordField, TextField } from '@/components/ui/form';
import { Modal } from '@/components/ui/modal';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'rejected' | 'done'>('idle');
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState<string>();
  const [resetSent, setResetSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: typeof errors = {};
    if (!email.trim()) found.email = 'Enter the email address on your account.';
    else if (!EMAIL.test(email.trim())) found.email = 'That does not look like a complete address.';
    if (!password) found.password = 'Enter your password.';

    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`#signin-${first}`)?.focus();
      return;
    }

    setState('submitting');
    await new Promise((resolve) => setTimeout(resolve, 900));
    // No authentication service exists in this build, so every attempt lands on
    // the same explained outcome rather than a silent failure.
    setState('rejected');
  }

  return (
    <>
      <div>
        <h1 className="font-display text-display-3 font-normal text-text">Welcome back</h1>
        <p className="mt-3 text-[1.0625rem] text-text-2">
          Sign in to pick up where you left off.{' '}
          <Link
            href="/signup/"
            className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-[3px] hover:text-brand-800"
          >
            Create an account
          </Link>{' '}
          if you do not have one.
        </p>
      </div>

      <div className="mt-8">
        <SocialButtons mode="sign-in" />
      </div>

      <div className="my-7 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-line-2" />
        <span className="text-[0.8125rem] font-medium text-text-3">or with email</span>
        <span className="h-px flex-1 bg-line-2" />
      </div>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        {state === 'rejected' ? (
          <FormStatus status="info">
            <p className="font-semibold">There is no account to sign in to.</p>
            <p className="mt-1 font-normal">
              This is a demonstration build with no authentication service. The dashboard is open to
              everyone — no credentials needed.
            </p>
            <ButtonLink href="/app/" size="sm" className="mt-3">
              Open the dashboard
            </ButtonLink>
          </FormStatus>
        ) : null}

        <TextField
          id="signin-email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          required
          value={email}
          error={errors.email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
          }}
          placeholder="alex@moreau.co"
        />

        <div>
          <PasswordField
            id="signin-password"
            name="password"
            label="Password"
            autoComplete="current-password"
            required
            value={password}
            error={errors.password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
            }}
            placeholder="••••••••••••"
          />
          <button
            type="button"
            onClick={() => setResetOpen(true)}
            className="mt-2 text-[0.875rem] font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:text-brand-800"
          >
            Forgot your password?
          </button>
        </div>

        <CheckboxField id="signin-remember" name="remember" defaultChecked>
          Keep me signed in on this device
        </CheckboxField>

        <Button
          type="submit"
          size="lg"
          full
          loading={state === 'submitting'}
          loadingLabel="Signing in…"
          trailing={<ArrowRight className="size-[1.15em]" aria-hidden="true" />}
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-[0.8125rem] leading-relaxed text-text-3">
        Protected by two-factor authentication and passkeys. We will never ask for your online
        banking password.
      </p>

      <Modal
        open={resetOpen}
        onClose={() => {
          setResetOpen(false);
          setResetSent(false);
          setResetError(undefined);
        }}
        title="Reset your password"
        description="We will email you a link that expires in 30 minutes."
        footer={
          resetSent ? (
            <Button
              variant="secondary"
              onClick={() => {
                setResetOpen(false);
                setResetSent(false);
              }}
            >
              Close
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setResetOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!EMAIL.test(resetEmail.trim())) {
                    setResetError('Enter the email address on your account.');
                    return;
                  }
                  setResetError(undefined);
                  setResetSent(true);
                }}
              >
                Send reset link
              </Button>
            </>
          )
        }
      >
        {resetSent ? (
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 size-5 shrink-0 text-positive" aria-hidden="true" />
            <p className="text-[0.9375rem] leading-relaxed text-text-2">
              If <span className="font-semibold text-text">{resetEmail.trim()}</span> matches an
              account, a reset link is on its way. We do not confirm whether an address is
              registered — that would tell anyone who asks.
            </p>
          </div>
        ) : (
          <TextField
            id="reset-email"
            type="email"
            label="Email address"
            autoComplete="email"
            required
            value={resetEmail}
            error={resetError}
            onChange={(event) => setResetEmail(event.target.value)}
            placeholder="alex@moreau.co"
          />
        )}
      </Modal>
    </>
  );
}
