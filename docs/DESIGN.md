# Lumina — design and engineering notes

Everything behind the build: the strategy it serves, the system it is made of, the
decisions that were judgement calls, and the things it does not do.

---

## 1. Business strategy

**Positioning.** Lumina is the AI financial copilot for people who are good at their jobs
and bad at spreadsheets. It is not a budgeting app you have to become a *budgeting person*
to use.

**The wedge.** Every competitor asks you to build the system first — categories, envelopes,
targets — and then maintain it. Most people quit in week two. Lumina inverts the order: it
reads your last twelve months, proposes the plan, and asks you to approve it. Setup is
about four minutes and is mostly waiting for your bank.

**The moat we claim.** Two things, both stated as behaviour rather than technology:

1. **Automation with a floor.** Savings rules that reduce or skip themselves rather than
   overdrawing you. This is the feature that makes automation safe enough to trust, and it
   is the reason irregular-income earners can use the product at all.
2. **Evidence with every number.** No insight ships unless it can show the transactions
   behind it. This is a trust position as much as a product one.

**Business model as a trust argument.** Subscription-funded, never data-funded. The free
plan is limited by *capability*, not by a countdown, precisely because there is no ad
model to backfill it. This is used as a conversion argument, not just an ethics statement.

**Primary goal.** Free-trial starts. **Secondary goals:** trust, comprehension, value
demonstration, objection handling.

**How the funnel is built:**

- Friction removed: 30 days, no card, no auto-conversion. Nothing to cancel later.
- The largest objection ("do I trust you with my bank?") is answered *above the fold* in
  the trust strip and again in a full section, rather than being buried in a footer link.
- The strongest proof is the product itself, so the secondary CTA everywhere is **Explore
  the live demo** — a real dashboard with no sign-up.

---

## 2. Personas

**Priya — "I have money, not a system." (primary)**
32, senior product manager, $145k, three cards and two banks. Has quit two budgeting apps.
Does not want to be taught personal finance; wants the current picture and a nudge before
she overspends. *Wins when:* setup is under five minutes and the first insight tells her
something she did not know. *Loses when:* the app asks her to build categories.

**Daniel — "My income is a wave." (primary)**
38, freelance motion designer, income swings ±60% month to month. Every averaging tool
insults him. *Wins when:* the forecast shows a range and the savings rule adapts. *Loses
when:* a fixed transfer overdraws him once — one incident and he is gone forever.

**Nina & Ben — "Two people, one mortgage, separate accounts." (secondary)**
Mid-30s, shared bills and private accounts. Every app forces full disclosure or full
separation. *Wins when:* they see one honest household number without merging their lives.

**Tomás — "Where is the leak?" (secondary)**
41, structural engineer, comfortable. Suspects he is losing money to subscriptions. *Wins
when:* something is found in week one that pays for the year.

**Anti-persona:** the spreadsheet enthusiast who enjoys the ritual. We say so on the
features page rather than pretending otherwise — that honesty is itself a conversion asset.

---

## 3. Key journeys

| # | Journey | Path |
| --- | --- | --- |
| 1 | **Skeptic → trial** | Home hero → trust strip → security section → pricing → `/signup/` |
| 2 | **Show-me → trial** | Hero secondary CTA → `/app/` live demo → in-dashboard footer CTA → `/signup/` |
| 3 | **Evaluator** | `/features/` jump nav → deep feature → `/pricing/` comparison matrix → FAQ → `/signup/` |
| 4 | **Price-checker** | `/pricing/` → billing toggle → limits ("what it does not do") → billing FAQ → trial |
| 5 | **Security reviewer** | Footer → `/security/` → can/cannot table → certifications → disclosure contact |
| 6 | **Hand-holder** | `/contact/` → validated form → success state with what-happens-next |
| 7 | **Returning member** | `/signin/` → forgot-password dialog |

Every journey ends at a real destination. There are no dead ends and no non-functional
controls: social sign-in buttons explain themselves when pressed, and dashboard sidebar
items navigate to real sections of a single-page dashboard rather than to routes that do
not exist.

---

## 4. Visual direction

**The brief to ourselves:** premium and editorial, not another indigo SaaS gradient;
financially credible without being cold; technically sophisticated without being sterile.

| Element | Decision | Rationale |
| --- | --- | --- |
| **Ground** | Warm paper `#FBF9F5`, not white | Long reading sessions. White cards then read as *raised* without heavy shadows. |
| **Ink** | Near-black with a green undertone `#0B1512` | Dark bands feel part of the family rather than generic black. |
| **Brand** | Evergreen, `brand-600 #0A6C56` for actions | Money-adjacent without the mint-green fintech cliché. |
| **Accent** | Citrine `#F0C458` — the "lumina" light | Used sparingly, almost entirely on ink surfaces, so it never becomes decoration. |
| **Type** | Instrument Serif display + Instrument Sans UI | A superfamily pairing: editorial authority in the headlines, neutral clarity in the interface. |
| **Numerals** | JetBrains Mono, only for years and clause numbers | A small technical signal; not preloaded, so it costs nothing on pages that do not use it. |
| **Shape** | Pill buttons, 16–22px cards, 12px inputs | The pill/soft-rectangle contrast is the layout's most recognisable signature. |
| **Shadows** | Four layered levels, ink-tinted, low alpha | Warm-tinted shadows on warm paper; grey shadows would read as dirt. |
| **Motion** | 16px travel, ≤620ms, entrance only | Motion explains a state change; it never decorates. |

**Anti-monotony.** No two consecutive sections use the same container. Benefits are a
hairline matrix; features are alternating full-bleed rows with live interface vignettes;
results are a divided numeric band; testimonials pair one ink feature quote with three
light cards. Band tones alternate paper → paper-2 → ink so the page has rhythm rather
than being a stack of shadowed cards.

**Illustration policy: none.** No abstract blobs, no stock isometrics. Where a feature
needs a picture, it gets a *vignette* — a real slice of the dashboard built from the same
components and the same data. The hero "product shot" is the actual product, rendered
live: crisp at every density, readable by screen readers, and incapable of going stale.

### Tokens

Declared once in `app/globals.css` under `@theme`; nothing hard-codes a colour, radius,
shadow or easing curve.

- **Colour** — paper (4 steps), ink (4), text (3 light / 3 on-ink), evergreen (11), citrine
  (4), clay (3), iris (3), semantic positive/caution/negative each with a soft surface.
- **Spacing** — 4px base; sections carry the vertical rhythm, not individual components.
- **Radii** — `xs 6px` → `3xl 36px`, plus pill.
- **Shadows** — `xs`/`sm`/`md`/`lg`/`xl` + a brand glow for the primary CTA hover.
- **Type** — three fluid display sizes clamped so nothing overflows at 320px; 14px floor
  for body text anywhere on the site.
- **Motion** — three durations, three easings, one `prefers-reduced-motion` escape hatch.

### Data visualisation

Charts follow one discipline throughout:

- **One y-axis, always.** Money in and money out share a scale; two measures of different
  scale would get two charts, never a second axis.
- **Nominal categories get one hue.** Bar length already encodes magnitude; a value ramp
  would double-encode it.
- **Legend for two or more series**, plus a table-view twin on every dashboard chart, so
  identity and value are never colour-only.
- **Meters carry severity in the fill, with the track a lighter step of the same ramp**, and
  always beside a text label ("$188 left", "$41 over") so colour is never the only signal.
- **Marks are thin**: 2px lines, ≥8px markers with a 2px surface ring, hairline solid
  gridlines one step off the surface, 10% area washes.
- **The categorical trio was validated, not eyeballed.** Evergreen `#0A8368`, clay
  `#C05A21`, iris `#5750BE` clear the lightness band, the chroma floor, colour-vision
  separation (worst adjacent CVD ΔE 9.0, normal-vision 22.8) and 3:1 contrast against the
  paper surface.

---

## 5. Information architecture

```
/                    Home — the full argument, in order: promise → trust → benefit →
                     mechanism → product → results → proof → security → price → objections
/features/           Four deep capabilities with vignettes, four supporting ones,
                     coverage, and an honest comparison with the alternatives
/pricing/            Three tiers, billing toggle, guarantees, full matrix, billing FAQ
/security/           Can/cannot table, connection flow, commitments, certifications,
                     vulnerability disclosure
/about/              Mission, principles, timeline, team, written commitments, careers
/contact/            Validated lead form + direct channels + live-demo escape hatch
/app/                The dashboard demo (own shell, in-page navigation)
/signin/  /signup/   Split-layout auth with objection-handling side panel
/legal/privacy/  /legal/terms/
404                  Full chrome, real recovery routes
```

**Navigation rules.** Four primary items (Features, Pricing, Security, About) — Security
is promoted into the top nav rather than hidden in the footer, because it is a primary
objection for this category. Every footer link resolves to a real page or a real anchor.
The dashboard's sidebar navigates within the page and marks the active section from what
is actually on screen.

---

## 6. Assumptions

Product decisions made in the absence of a brief, each documented because a real
stakeholder might overrule them:

1. **Fictional company, marked as such.** A footer disclosure appears on every page, and
   testimonials, statistics and team members carry inline markers. This costs a little
   polish and buys honesty.
2. **US-first, dollars, `en-US`.** Copy mentions UK/EU/Canada coverage; localisation is not
   built.
3. **Trial requires no card.** Lower friction, better trial-start rate, worse trial-to-paid
   conversion. Chosen because the brand's argument is trust.
4. **Three tiers, $0 / $12 / $20 monthly, 25% off annually.** Household rather than a
   "Pro" tier, because shared finances are an underserved and defensible niche.
5. **"Today" is 26 July 2026** across all demo data, so month-to-date figures, projections
   and the 5-days-remaining copy stay internally consistent.
6. **Single light theme with intentional dark bands** rather than a dark-mode toggle. A
   half-considered dark mode would undermine the credibility the palette is buying.
7. **The dashboard is one page.** A multi-route app would mean six routes of scaffolding;
   one dense, real page demonstrates more.
8. **No cookie banner**, because the described product sets no tracking cookies. The
   privacy policy says so explicitly.
9. **Forms simulate submission in the browser.** A static export has no backend. The
   contact form routes `@example.com` to the failure path so the error state is reachable.
10. **Auth is a facade.** Sign-in explains that there is no account to sign into and links
    to the open dashboard rather than failing silently.

---

## 7. Accessibility

Targeting WCAG 2.1 AA.

**Colour and contrast.** Every foreground/background pair in the system was checked
programmatically before any component was written: body text ≥ 4.5:1 (most pairs 5.3–16.6:1),
UI boundaries and chart marks ≥ 3:1. Form control borders use a dedicated `--color-control`
token at 3.5:1 against paper and 3.7:1 against white, satisfying SC 1.4.11.

**Never colour-alone.** Deltas pair an arrow glyph with a sign; budget severity is stated
in words beside every meter; chart series carry a legend and a table-view twin; validation
errors carry an icon and text.

**Keyboard.** A 58-stop sweep of the home page found every stop visible and every one
carrying a focus indicator. One focus treatment site-wide (2px brand outline, offset 2px;
citrine on ink surfaces), `:focus-visible` only. Skip links on all three layouts.

**Platform semantics over re-implementation.** The mobile menu, the dashboard drawer and
both dialogs are native `<dialog>` elements — focus trap, focus restoration, `Escape`, and
inertness of the page behind come from the browser. The FAQ is native `<details>`/`<summary>`
with a shared `name`, so it works before hydration, works with JavaScript disabled, and is
reachable by browser find-in-page. The segmented controls (billing cycle, chart range) are
real radio groups, so arrow-key navigation is free.

**Forms.** Labels are always visible — no placeholder-as-label. `aria-describedby` wires
hints and errors; `aria-invalid` marks failures. Nothing is marked invalid before the first
submit. After a failed submit, a summary names each problem, links to it, and focus moves
to the first invalid control. Errors then clear as they are fixed. Password visibility is a
real toggle with `aria-pressed`, and strength is announced politely.

**Charts.** Each is a labelled `figure`. The SVG is focusable with a descriptive
`aria-label`; arrow keys walk data points and mirror the hover readout into a polite live
region (verified: focus + `ArrowRight` announces *"Jul: Money in $7.0k, Money out $5.3k"*).
Every chart has a table view; no value is gated behind hover.

**Motion.** `prefers-reduced-motion: reduce` removes movement entirely rather than
shortening it — verified that zero reveal elements remain transparent under that setting.
Entrance states are scoped to `[data-js='true']`, so a visitor without JavaScript sees
fully painted content rather than a blank page.

**Structure.** Exactly one `h1` per page, no skipped heading levels, landmarks throughout,
`aria-labelledby` on every section, and no duplicate `id`s — all enforced by `npm run audit:pages`
across 12 routes × 3 viewports.

---

## 8. Performance

**Architecture.** Every route is pre-rendered HTML. There is no server on the critical
path and no client-side data fetching anywhere — first paint needs only HTML, one CSS file
and two webfonts.

**Measured payload** (gzipped, from the production export):

| Route | JS + CSS | HTML |
| --- | --- | --- |
| `/` | 210 kB | 41 kB |
| `/features/` | 204 kB | 29 kB |
| `/pricing/` | 208 kB | 27 kB |
| `/app/` | 224 kB | 20 kB |

Nearly all of that is the React 19 + App Router runtime, and all of it is deferred —
it hydrates an already-painted page. Application code is a small fraction: the entire
chart engine is about 4 kB.

**What was deliberately not installed:** a charting library (~90 kB), an animation library
(~50 kB), an icon package, and a component library. Charts are hand-built SVG over a pure
geometry module; motion is CSS plus one `IntersectionObserver`; the ~45 icons are drawn
in-repo and tree-shake individually.

**Layout stability.** Fonts are self-hosted via `next/font` with `display: swap` and size
adjustment, so there is no FOUT reflow. The announcement bar's dismissal is applied by a
pre-paint inline script, so a returning visitor never sees it appear and vanish. Charts
render at a fixed server-side width and refine via `ResizeObserver` after mount, so
hydration never mismatches. No lazy-loaded content shifts the page.

**Fonts.** Latin subset only. Serif and sans are preloaded (the serif renders the LCP
headline); the monospace face is explicitly not preloaded, since it appears on three pages.

**Images.** There are effectively none. The interface is SVG and CSS; the only rasters are
the social card and app icons, which the pages themselves never load.

**Verification honesty.** Lighthouse was not run in this environment, so the scores are not
claimed as measured. What *is* measured: bundle sizes above, zero console errors and zero
failed requests across 36 page/viewport combinations, and no horizontal overflow anywhere.
The design decisions that drive the scores — static HTML, deferred JS, self-hosted
preloaded fonts, no layout-shifting media, semantic landmarks, complete metadata — are all
in place.

---

## 9. SEO implementation

- **Per-page metadata through one composer** (`lib/seo.ts`). Next merges metadata field by
  field, so a page declaring its own `openGraph` silently drops `og:image`, `og:type` and
  `og:site_name`. Routing every page through the composer makes that impossible — verified
  across all 11 routes.
- **Titles and descriptions** are unique, specific and written for the result page, with a
  `%s · Lumina` template and an absolute title on the home page.
- **Canonicals** on every route, derived from `NEXT_PUBLIC_SITE_URL` so they follow the
  deployment rather than being hard-coded.
- **Open Graph and Twitter** complete on every page, with a 1200×630 card generated from
  the site's own tokens and fonts.
- **Structured data:** `Organization` + `WebSite` in the root layout, `SoftwareApplication`
  with per-plan offers on the home page, `Product` with `UnitPriceSpecification` on pricing,
  and `FAQPage` on both pages that render an FAQ.
- **`sitemap.xml`** is an explicit list with per-route priorities and change frequencies, so
  a page cannot enter it unconsidered. **`robots.txt`** allows everything except `/signin/`,
  which is also `noindex` — it has nothing to index and would compete with `/signup/`.
- **Semantic HTML throughout**: one `h1`, ordered headings, real `<nav>`/`<main>`/`<footer>`,
  `<table>` with `<caption>` and scoped headers, `<figure>`/`<figcaption>` for charts.
- **Crawlable content.** Because everything is pre-rendered, the FAQ answers, pricing
  matrix and dashboard figures are all in the HTML source.

---

## 10. Known limitations

1. **Lighthouse scores are not measured** — no Lighthouse in the build environment. Section 8
   states what was measured instead.
2. **No backend.** Forms simulate submission; auth is a facade; the dashboard is fixed
   sample data.
3. **No dark mode.** A deliberate scope decision (§6.6), not an oversight.
4. **No automated test suite.** There is a real QA harness (`audit:pages`) but no unit or
   component tests. The chart geometry module is pure and is the obvious first target.
5. **English/US only.** No i18n scaffolding, no currency switching.
6. **Without JavaScript**, the site is fully readable and navigable and the FAQ still works,
   but the mobile menu, chart interactions, form validation and the billing toggle do not.
7. **Charts render at a default width before hydration.** Correct within a frame of mount;
   briefly wide on very narrow screens for a no-JS visitor.
8. **No analytics or consent tooling** — appropriate for a demonstration, a gap for a real
   launch.
9. **`prefers-contrast: more` is not specifically styled**, though the base palette clears AA
   comfortably.

---

## 11. Recommended next steps for production

**Before launch**

1. Run Lighthouse and WebPageTest against the deployed origin; add Lighthouse CI to the
   workflow with budgets so regressions fail the build.
2. Add axe-core to the QA sweep for automated rule coverage, then commission a manual audit
   with screen-reader users (NVDA, VoiceOver, TalkBack).
3. Wire the contact form to a real endpoint with server-side validation, rate limiting and
   spam protection; add server-side email verification to sign-up.
4. Replace the auth facade with a real identity provider — passkeys first, TOTP second, and
   the social buttons connected or removed.
5. Legal review of the privacy policy and terms. The current documents demonstrate structure
   and tone; they are not fit for use.
6. Substantiate every claim on the site or remove it: the certifications, the accuracy
   figure, the institution counts, and the outcome statistics all need evidence or a
   footnote naming the population.

**Shortly after**

7. Unit tests for `lib/chart.ts` and the form validators; component tests for the dialogs,
   accordion and segmented controls; visual regression on the screenshot set.
8. Analytics with a consent-appropriate tool, instrumented against the seven journeys in §3
   so funnel drop-off is attributable.
9. A/B the hero headline, the primary CTA label, and card-vs-no-card on the trial — the
   three highest-leverage variables on the page.
10. Dark mode, designed rather than inverted, with the chart palette re-validated against
    the dark surface.
11. A CMS or MDX layer for marketing copy, so pricing and FAQ changes do not require a
    deploy.
12. Real-user monitoring for Core Web Vitals, alerting on p75 regressions.
