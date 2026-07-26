# Lumina

A production-grade marketing site and application dashboard for **Lumina**, a fictional
AI-powered personal finance company. Built as a demonstration of product strategy, design
systems, accessible front-end engineering and performance work.

> **Lumina is not a real company.** Testimonials, performance figures, certifications,
> institution counts and all dashboard data are illustrative demonstration content. No
> account is created and no financial data is collected anywhere on this site.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

### Build and preview the production output

```bash
npm run build        # static export → ./out
npm run serve        # serves ./out on http://localhost:4173
```

### Checks

```bash
npm run lint         # ESLint (next/core-web-vitals + TypeScript rules)
npm run typecheck    # tsc --noEmit
npm run audit:pages  # cross-page QA sweep — needs `npm run serve` running
```

`audit:pages` loads every route at three viewports and fails on horizontal overflow,
console errors, failed requests, missing/duplicate `h1`s, skipped heading levels, images
without `alt`, controls without an accessible name, duplicate `id`s, and broken internal
links or anchors.

### Regenerating brand assets

```bash
npm run build && npm run serve   # in one shell
npm run assets                   # in another
```

Renders `public/og.png`, `public/icon-{192,512}.png` and `app/apple-icon.png` from the
site's own tokens and webfonts, so the social card can never drift from the brand.

---

## Environment

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `<link rel=canonical>`, Open Graph, sitemap and robots. | `https://lumina.finance` |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path prefix when the site is not served from a domain root (GitHub Project Pages). | *(none)* |

The GitHub Pages workflow sets both from `actions/configure-pages`, so the same build
works at a domain root or under `/<repo>` with no code changes.

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, base metadata, Organization + WebSite JSON-LD
  globals.css             The design system — every token lives here and nowhere else
  icon.svg                Favicon (file-based metadata)
  apple-icon.png          Apple touch icon
  sitemap.ts robots.ts manifest.ts
  not-found.tsx           404 with the full site chrome and real recovery links

  (site)/                 Marketing chrome: announcement bar, header, footer
    page.tsx              Home
    features/ pricing/ security/ about/ contact/
    legal/privacy/ legal/terms/

  (auth)/                 Minimal chrome: split layout, no site nav
    signin/ signup/

  app/                    Logged-in dashboard preview (its own shell)

components/
  ui/                     Primitives: button, card, badge, form controls, accordion,
                          modal, toast, stat, layout, logo, reveal
  charts/                 Hand-built SVG charts: trend, category bars, meter, sparkline,
                          chart frame (legend + table-view twin)
  icons/                  ~45 icons drawn in-repo on one 24px, 1.6-stroke grid
  marketing/              Page sections — hero, benefits, how-it-works, feature showcase,
                          security, testimonials, results, pricing, FAQ, final CTA
  dashboard/              App shell, dashboard composition, insights, transactions
  auth/                   Auth shell and the two forms

lib/
  site.ts                 Brand strings, navigation, canonical URLs
  seo.ts                  Per-page metadata composer
  chart.ts                Pure chart geometry (scales, paths, hit-testing)
  utils.ts                cn(), money/date formatters
  use-measure.ts          ResizeObserver hook for pixel-accurate charts
  data/                   demo-account.ts · pricing.ts · content.ts

scripts/
  audit-pages.mjs         QA sweep (dev-only)
  generate-assets.mjs     Brand raster asset generation (dev-only)
  shots.mjs               Full-page screenshots for review (dev-only)
```

**Design notes, personas, information architecture, assumptions, accessibility and
performance detail:** see [`docs/DESIGN.md`](docs/DESIGN.md).

---

## Stack

| Choice | Why |
| --- | --- |
| **Next.js 16 (App Router), static export** | Every route is HTML at build time: no server on the critical path, and it deploys to any static host. |
| **React 19 + TypeScript (strict)** | Type-safe component contracts; no `any` in the codebase. |
| **Tailwind CSS v4** | Tokens declared once in `@theme` and consumed as utilities. No config file, no token duplication. |
| **No component library** | Buttons, forms, dialogs, accordions, toasts, charts and icons are all in-repo, so the visual system is genuinely ours rather than a theme over someone else's. |
| **No animation or charting library** | Charts are ~4 kB of SVG maths; motion is CSS plus one `IntersectionObserver`. Saves roughly 150 kB of JavaScript. |

Runtime dependencies: `next`, `react`, `react-dom`. That is the entire list.
`playwright-core` is a dev dependency used only by the QA and asset scripts.

---

## Deployment

Pushes to `main` build the static export and publish it to GitHub Pages
(`.github/workflows/static.yml`). The workflow lints and typechecks before building, so a
failing check never reaches production.

The output in `out/` is plain HTML, CSS, JS and fonts — host it anywhere.
