'use client';

import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { AlertTriangle, Check, ChevronDown, Eye, EyeOff } from '@/components/icons';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------------
   Shared control chrome.
   The boundary color clears 3:1 against both paper and card surfaces so the
   control's edge is perceivable (WCAG 2.1 SC 1.4.11).
   ------------------------------------------------------------------------- */

const controlBase =
  'w-full rounded-md bg-card text-text placeholder:text-text-3/80 ' +
  'ring-1 ring-inset ring-control/60 transition-[box-shadow,background-color] duration-150 ' +
  'hover:ring-control focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ' +
  'disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-text-3';

const controlSize = 'h-11 px-3.5 text-[0.9375rem]';

const invalidRing = 'ring-negative ring-2 hover:ring-negative';

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  optionalLabel,
  children,
  className,
  descriptionId,
  errorId,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  optionalLabel?: boolean;
  children: ReactNode;
  className?: string;
  descriptionId: string;
  errorId: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-sm font-semibold text-text">
        {label}
        {optionalLabel && !required ? (
          <span className="text-xs font-medium text-text-3">Optional</span>
        ) : null}
        {required ? (
          <span className="text-xs font-medium text-text-3">
            <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={descriptionId} className="text-[0.8125rem] leading-snug text-text-3">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={errorId}
          className="flex items-start gap-1.5 text-[0.8125rem] font-medium text-negative"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

function describedBy(hint: ReactNode, error: string | undefined, dId: string, eId: string) {
  const ids = [hint ? dId : null, error ? eId : null].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
}

/* --- Text input ---------------------------------------------------------- */

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: ReactNode;
  error?: string;
  optionalLabel?: boolean;
  leading?: ReactNode;
  wrapperClassName?: string;
};

export function TextField({
  label,
  hint,
  error,
  optionalLabel,
  leading,
  className,
  wrapperClassName,
  required,
  id: providedId,
  ...props
}: TextFieldProps) {
  const uid = useId();
  const id = providedId ?? `f-${uid}`;
  const dId = `${id}-hint`;
  const eId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      optionalLabel={optionalLabel}
      descriptionId={dId}
      errorId={eId}
      className={wrapperClassName}
    >
      <div className="relative">
        {leading ? (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[1.1rem] text-text-3">
            {leading}
          </span>
        ) : null}
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint, error, dId, eId)}
          className={cn(
            controlBase,
            controlSize,
            leading && 'pl-10',
            error && invalidRing,
            className,
          )}
          {...props}
        />
      </div>
    </FieldShell>
  );
}

/* --- Password with visibility control ------------------------------------ */

export function PasswordField({
  label,
  hint,
  error,
  className,
  required,
  wrapperClassName,
  id: providedId,
  ...props
}: Omit<TextFieldProps, 'type' | 'leading'>) {
  const uid = useId();
  const id = providedId ?? `p-${uid}`;
  const dId = `${id}-hint`;
  const eId = `${id}-error`;
  const [visible, setVisible] = useState(false);

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      descriptionId={dId}
      errorId={eId}
      className={wrapperClassName}
    >
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint, error, dId, eId)}
          className={cn(controlBase, controlSize, 'pr-12', error && invalidRing, className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-[1.15rem] text-text-3 transition-colors hover:text-text"
        >
          {visible ? <EyeOff /> : <Eye />}
          <span className="sr-only">{visible ? 'Hide password' : 'Show password'}</span>
        </button>
      </div>
    </FieldShell>
  );
}

/* --- Textarea ------------------------------------------------------------ */

export function TextAreaField({
  label,
  hint,
  error,
  className,
  required,
  optionalLabel,
  wrapperClassName,
  id: providedId,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: ReactNode;
  error?: string;
  optionalLabel?: boolean;
  wrapperClassName?: string;
}) {
  const uid = useId();
  const id = providedId ?? `t-${uid}`;
  const dId = `${id}-hint`;
  const eId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      optionalLabel={optionalLabel}
      descriptionId={dId}
      errorId={eId}
      className={wrapperClassName}
    >
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, dId, eId)}
        className={cn(
          controlBase,
          'min-h-32 resize-y px-3.5 py-3 text-[0.9375rem] leading-relaxed',
          error && invalidRing,
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
}

/* --- Select -------------------------------------------------------------- */

export function SelectField({
  label,
  hint,
  error,
  className,
  required,
  optionalLabel,
  children,
  wrapperClassName,
  id: providedId,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: ReactNode;
  error?: string;
  optionalLabel?: boolean;
  wrapperClassName?: string;
}) {
  const uid = useId();
  const id = providedId ?? `s-${uid}`;
  const dId = `${id}-hint`;
  const eId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      optionalLabel={optionalLabel}
      descriptionId={dId}
      errorId={eId}
      className={wrapperClassName}
    >
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint, error, dId, eId)}
          className={cn(
            controlBase,
            controlSize,
            'appearance-none pr-10',
            error && invalidRing,
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute inset-y-0 right-3.5 my-auto size-[1.1rem] text-text-3" />
      </div>
    </FieldShell>
  );
}

/* --- Checkbox ------------------------------------------------------------ */

export function CheckboxField({
  label,
  error,
  className,
  children,
  id: providedId,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
  error?: string;
  children?: ReactNode;
}) {
  const uid = useId();
  const id = providedId ?? `c-${uid}`;
  const eId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className={cn('flex items-start gap-3', className)}>
        <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? eId : undefined}
            className={cn(
              'peer size-5 appearance-none rounded-[0.3rem] bg-card ring-1 ring-inset ring-control',
              'transition-colors checked:bg-brand-600 checked:ring-brand-600',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
              error && 'ring-2 ring-negative',
            )}
            {...props}
          />
          <Check className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100" />
        </span>
        <label htmlFor={id} className="text-sm leading-relaxed text-text-2">
          {children ?? label}
        </label>
      </div>
      {error ? (
        <p id={eId} className="flex items-start gap-1.5 pl-8 text-[0.8125rem] font-medium text-negative">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

/* --- Segmented control ---------------------------------------------------
   Built on native radios so arrow-key navigation, form association and screen
   reader semantics come for free.
   ------------------------------------------------------------------------- */

export function Segmented<T extends string>({
  name,
  legend,
  hideLegend = true,
  options,
  value,
  onChange,
  size = 'md',
  tone = 'light',
  className,
}: {
  name: string;
  legend: string;
  hideLegend?: boolean;
  options: { value: T; label: string; suffix?: ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  tone?: 'light' | 'ink';
  className?: string;
}) {
  const uid = useId();
  return (
    <fieldset className={cn('min-w-0', className)}>
      <legend className={cn(hideLegend ? 'sr-only' : 'mb-2 text-sm font-semibold text-text')}>
        {legend}
      </legend>
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-full p-1',
          tone === 'ink' ? 'bg-white/10 ring-1 ring-white/12' : 'bg-paper-3 ring-1 ring-line-2',
        )}
      >
        {options.map((option) => {
          const id = `${name}-${uid}-${option.value}`;
          const checked = value === option.value;
          return (
            <span key={option.value} className="relative">
              <input
                type="radio"
                id={id}
                name={`${name}-${uid}`}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  'flex cursor-pointer items-center gap-1.5 rounded-full font-semibold transition-colors duration-200',
                  size === 'sm' ? 'h-8 px-3 text-[0.8125rem]' : 'h-9 px-4 text-sm',
                  'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                  tone === 'ink'
                    ? 'text-on-ink-2 peer-checked:bg-ink peer-checked:text-on-ink peer-focus-visible:outline-citrine-500 hover:text-on-ink'
                    : 'text-text-2 peer-checked:bg-card peer-checked:text-text peer-checked:shadow-xs peer-focus-visible:outline-brand-600 hover:text-text',
                )}
              >
                {option.label}
                {option.suffix}
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}

/* --- Form-level status --------------------------------------------------- */

export function FormStatus({
  status,
  children,
}: {
  status: 'error' | 'success' | 'info';
  children: ReactNode;
}) {
  const tones = {
    error: 'bg-negative-soft text-negative ring-negative/25',
    success: 'bg-positive-soft text-positive ring-positive/25',
    info: 'bg-brand-50 text-brand-700 ring-brand-200',
  };
  const Glyph = status === 'error' ? AlertTriangle : Check;
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-md px-4 py-3 text-sm font-medium ring-1 ring-inset',
        tones[status],
      )}
    >
      <Glyph className="mt-0.5 size-[1.1rem] shrink-0" />
      <div>{children}</div>
    </div>
  );
}
