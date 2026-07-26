'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CheckCircle, Close, Info } from '@/components/icons';
import { cn } from '@/lib/utils';

type ToastTone = 'success' | 'info';

type Toast = {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastContextValue = {
  toast: (input: { title: string; description?: string; tone?: ToastTone }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DISMISS_AFTER = 5200;

/**
 * Confirmation feedback for actions that change something but do not navigate.
 *
 * The live region is polite and always present in the DOM (rather than being
 * inserted with the message), which is what assistive tech needs in order to
 * announce it.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback<ToastContextValue['toast']>(
    ({ title, description, tone = 'success' }) => {
      const id = nextId.current++;
      setToasts((current) => [...current.slice(-2), { id, title, description, tone }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), DISMISS_AFTER),
      );
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-90 flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg bg-ink px-4 py-3.5 text-on-ink shadow-xl ring-1 ring-white/10',
              'animate-toast-in on-ink',
            )}
          >
            <span
              className={cn(
                'mt-0.5 text-[1.15rem]',
                t.tone === 'success' ? 'text-brand-300' : 'text-citrine-500',
              )}
            >
              {t.tone === 'success' ? <CheckCircle /> : <Info />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description ? (
                <p className="mt-0.5 text-[0.8125rem] leading-snug text-on-ink-2">
                  {t.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="-mr-1 -mt-1 rounded-md p-1.5 text-on-ink-3 transition-colors hover:bg-white/10 hover:text-on-ink"
            >
              <Close className="size-4" />
              <span className="sr-only">Dismiss notification</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>');
  return context;
}
