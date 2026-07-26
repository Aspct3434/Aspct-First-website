'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Close } from '@/components/icons';
import { cn } from '@/lib/utils';

/**
 * Modal dialog built on the native <dialog> element.
 *
 * The platform gives us the focus trap, focus restore on close, Escape-to-close
 * and inertness of the page behind it — all things hand-rolled modals routinely
 * get wrong. We add: a labelled heading, a click-outside target, and body
 * scroll-lock.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const titleId = `dialog-title-${uid}`;
  const descId = `dialog-desc-${uid}`;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onClick={(event) => {
        // Clicks that land on the dialog element itself are backdrop clicks.
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        'm-auto w-[calc(100vw-2rem)] max-w-lg rounded-xl bg-card p-0 text-text shadow-xl',
        'backdrop:bg-ink/55 backdrop:backdrop-blur-[2px]',
        'open:animate-fade-in',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5">
        <div>
          <h2 id={titleId} className="text-lg font-semibold text-text">
            {title}
          </h2>
          {description ? (
            <p id={descId} className="mt-1 text-sm text-text-3">
              {description}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 -mt-1 rounded-md p-2 text-text-3 transition-colors hover:bg-paper-2 hover:text-text"
        >
          <Close className="size-[1.15rem]" />
          <span className="sr-only">Close dialog</span>
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
      {footer ? (
        <div className="flex flex-wrap justify-end gap-3 border-t border-line bg-paper-2 px-6 py-4">
          {footer}
        </div>
      ) : null}
    </dialog>
  );
}
