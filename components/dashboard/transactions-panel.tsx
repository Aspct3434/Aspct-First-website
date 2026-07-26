'use client';

import { useId, useMemo, useState } from 'react';
import { Close, Filter, Receipt, Search } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  accountLabels,
  accounts,
  categoryLabels,
  transactions,
  type Transaction,
} from '@/lib/data/demo-account';
import { Modal } from '@/components/ui/modal';
import { formatCurrency, formatDateLong, formatDateShort } from '@/lib/utils';
import { cn } from '@/lib/utils';

const categoryOptions = Array.from(new Set(transactions.map((t) => t.categoryId))).sort((a, b) =>
  (categoryLabels[a] ?? a).localeCompare(categoryLabels[b] ?? b),
);

export function TransactionsPanel() {
  const uid = useId();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [account, setAccount] = useState('all');
  const [selected, setSelected] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return transactions.filter((transaction) => {
      if (category !== 'all' && transaction.categoryId !== category) return false;
      if (account !== 'all' && transaction.accountId !== account) return false;
      if (!needle) return true;
      return (
        transaction.merchant.toLowerCase().includes(needle) ||
        (categoryLabels[transaction.categoryId] ?? '').toLowerCase().includes(needle) ||
        (transaction.note ?? '').toLowerCase().includes(needle)
      );
    });
  }, [query, category, account]);

  const isFiltered = query.trim() !== '' || category !== 'all' || account !== 'all';

  const total = filtered.reduce((sum, t) => sum + (t.amount < 0 ? t.amount : 0), 0);

  function clearFilters() {
    setQuery('');
    setCategory('all');
    setAccount('all');
  }

  const selectClasses =
    'h-10 rounded-full bg-card px-3.5 pr-9 text-[0.875rem] text-text ring-1 ring-inset ring-line-2 ' +
    'appearance-none transition-colors hover:ring-control focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600';

  return (
    <>
      {/* One filter row, above everything it scopes. */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 basis-64">
          <label htmlFor={`${uid}-search`} className="sr-only">
            Search transactions by merchant, category or note
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-text-3"
            aria-hidden="true"
          />
          <input
            id={`${uid}-search`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search merchants and notes"
            className="h-10 w-full rounded-full bg-card pr-4 pl-10 text-[0.875rem] text-text ring-1 ring-inset ring-line-2 placeholder:text-text-3 transition-colors hover:ring-control focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
        </div>

        <div className="relative">
          <label htmlFor={`${uid}-category`} className="sr-only">
            Filter by category
          </label>
          <select
            id={`${uid}-category`}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={selectClasses}
          >
            <option value="all">All categories</option>
            {categoryOptions.map((id) => (
              <option key={id} value={id}>
                {categoryLabels[id] ?? id}
              </option>
            ))}
          </select>
          <Filter
            className="pointer-events-none absolute inset-y-0 right-3.5 my-auto size-4 text-text-3"
            aria-hidden="true"
          />
        </div>

        <div className="relative">
          <label htmlFor={`${uid}-account`} className="sr-only">
            Filter by account
          </label>
          <select
            id={`${uid}-account`}
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            className={selectClasses}
          >
            <option value="all">All accounts</option>
            {accounts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <Filter
            className="pointer-events-none absolute inset-y-0 right-3.5 my-auto size-4 text-text-3"
            aria-hidden="true"
          />
        </div>

        {isFiltered ? (
          <Button variant="ghost" size="sm" onClick={clearFilters} leading={<Close className="size-4" />}>
            Clear
          </Button>
        ) : null}
      </div>

      <p aria-live="polite" className="mt-4 text-[0.875rem] text-text-3">
        {filtered.length === 0
          ? 'No transactions match these filters.'
          : `Showing ${filtered.length} of ${transactions.length} transactions · ${formatCurrency(
              Math.abs(total),
            )} out`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-line-2 bg-paper-2 px-6 py-14 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-card text-[1.4rem] text-text-3 ring-1 ring-line">
            <Receipt />
          </span>
          <h3 className="mt-4 text-base font-semibold text-text">Nothing matches that</h3>
          <p className="mt-2 max-w-sm text-[0.9375rem] text-text-2">
            Try a shorter search term, or widen the category and account filters.
          </p>
          <Button variant="secondary" size="sm" className="mt-5" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="scroll-x mt-4 rounded-xl bg-card ring-1 ring-line">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Recent transactions. Select a row to see the full detail.
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 text-[0.75rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
                  Date
                </th>
                <th scope="col" className="px-5 py-3 text-[0.75rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
                  Merchant
                </th>
                <th scope="col" className="hidden px-5 py-3 text-[0.75rem] font-semibold tracking-[0.08em] text-text-3 uppercase md:table-cell">
                  Category
                </th>
                <th scope="col" className="hidden px-5 py-3 text-[0.75rem] font-semibold tracking-[0.08em] text-text-3 uppercase lg:table-cell">
                  Account
                </th>
                <th scope="col" className="px-5 py-3 text-right text-[0.75rem] font-semibold tracking-[0.08em] text-text-3 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((transaction) => {
                const isIncome = transaction.amount > 0;
                return (
                  <tr
                    key={transaction.id}
                    className="border-b border-line last:border-0 transition-colors hover:bg-paper-2"
                  >
                    <td className="px-5 py-3.5 align-top text-[0.875rem] whitespace-nowrap text-text-3 tabular">
                      {formatDateShort(transaction.date)}
                    </td>
                    <td className="px-5 py-3.5 align-top">
                      <button
                        type="button"
                        onClick={() => setSelected(transaction)}
                        className="text-left text-[0.9375rem] font-medium text-text underline-offset-[3px] hover:underline"
                      >
                        {transaction.merchant}
                        <span className="sr-only"> — view transaction detail</span>
                      </button>
                      <span className="mt-1 flex flex-wrap items-center gap-2 md:hidden">
                        <span className="text-[0.75rem] text-text-3">
                          {categoryLabels[transaction.categoryId] ?? transaction.categoryId}
                        </span>
                        <span aria-hidden="true" className="text-text-3">
                          ·
                        </span>
                        <span className="text-[0.75rem] text-text-3">
                          {accountLabels[transaction.accountId]}
                        </span>
                      </span>
                      {transaction.pending ? (
                        <Badge tone="caution" className="mt-1.5">
                          Pending
                        </Badge>
                      ) : null}
                    </td>
                    <td className="hidden px-5 py-3.5 align-top md:table-cell">
                      <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[0.8125rem] text-text-2 ring-1 ring-line">
                        {categoryLabels[transaction.categoryId] ?? transaction.categoryId}
                      </span>
                    </td>
                    <td className="hidden px-5 py-3.5 align-top text-[0.875rem] text-text-2 lg:table-cell">
                      {accountLabels[transaction.accountId]}
                    </td>
                    <td
                      className={cn(
                        'px-5 py-3.5 text-right align-top text-[0.9375rem] font-semibold whitespace-nowrap tabular',
                        isIncome ? 'text-positive' : 'text-text',
                      )}
                    >
                      {isIncome ? '+' : '−'}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.merchant ?? 'Transaction'}
        description={selected ? formatDateLong(selected.date) : undefined}
        footer={
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected ? (
          <dl className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.875rem] text-text-3">Amount</dt>
              <dd
                className={cn(
                  'text-2xl font-semibold',
                  selected.amount > 0 ? 'text-positive' : 'text-text',
                )}
              >
                {selected.amount > 0 ? '+' : '−'}
                {formatCurrency(Math.abs(selected.amount))}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <dt className="text-[0.875rem] text-text-3">Category</dt>
              <dd className="text-[0.9375rem] font-medium text-text">
                {categoryLabels[selected.categoryId] ?? selected.categoryId}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.875rem] text-text-3">Account</dt>
              <dd className="text-[0.9375rem] font-medium text-text">
                {accountLabels[selected.accountId]}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.875rem] text-text-3">Status</dt>
              <dd className="text-[0.9375rem] font-medium text-text">
                {selected.pending ? 'Pending — may still change' : 'Cleared'}
              </dd>
            </div>
            {selected.note ? (
              <div className="border-t border-line pt-4">
                <dt className="text-[0.875rem] text-text-3">Note</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-2">
                  {selected.note}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </Modal>
    </>
  );
}
