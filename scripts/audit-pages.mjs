/**
 * Cross-page QA sweep. Run against a served static build:
 *
 *   npm run build
 *   npm run serve       # in another shell
 *   npm run audit:pages
 *
 * Checks, per page and per viewport:
 *   · horizontal overflow of the document
 *   · elements extending past the viewport (the usual cause)
 *   · console errors and page exceptions
 *   · failed network requests
 *   · one <h1>, and no skipped heading levels
 *   · images without alt text
 *   · buttons and links with no accessible name
 *   · duplicate element ids
 *   · internal links that 404
 *
 * Dev-only tooling. Nothing here ships in the site bundle.
 */
import { chromium } from 'playwright-core';

const origin = process.argv[2] ?? 'http://localhost:4173';
const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';

const pages = [
  '/',
  '/features/',
  '/pricing/',
  '/security/',
  '/about/',
  '/contact/',
  '/signin/',
  '/signup/',
  '/app/',
  '/legal/privacy/',
  '/legal/terms/',
  '/404.html',
];

const viewports = [
  { name: 'mobile', width: 360, height: 780 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const inPage = () => {
  const problems = [];
  const doc = document.documentElement;
  const width = doc.clientWidth;

  if (doc.scrollWidth > width + 1) {
    problems.push(`document scrollWidth ${doc.scrollWidth} > viewport ${width}`);
  }

  // An element wider than the viewport is only a defect if nothing between it
  // and the document clips or scrolls it. Wide tables inside `.scroll-x`, and
  // decorative bleeds inside `overflow-hidden` sections, are deliberate.
  const seenOverflow = new Set();
  const isContained = (el) => {
    let node = el.parentElement;
    while (node && node !== document.documentElement) {
      const style = getComputedStyle(node);
      if (['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowX)) return true;
      node = node.parentElement;
    }
    return false;
  };

  for (const el of document.querySelectorAll('body *')) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    if (rect.right <= width + 1 && rect.left >= -1) continue;
    if (isContained(el)) continue;
    const cls = typeof el.className === 'string' ? el.className : (el.className?.baseVal ?? '');
    const key = `${el.tagName}.${cls.slice(0, 40)}`;
    if (seenOverflow.has(key)) continue;
    seenOverflow.add(key);
    problems.push(
      `escapes viewport: <${el.tagName.toLowerCase()} class="${cls.slice(0, 60)}"> L${Math.round(
        rect.left,
      )} R${Math.round(rect.right)}`,
    );
  }

  const h1s = document.querySelectorAll('h1');
  if (h1s.length !== 1) problems.push(`${h1s.length} <h1> elements (expected exactly 1)`);

  let previous = 0;
  for (const heading of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const level = Number(heading.tagName[1]);
    if (previous && level > previous + 1) {
      problems.push(
        `heading jump h${previous} → h${level}: "${(heading.textContent ?? '').trim().slice(0, 45)}"`,
      );
    }
    previous = level;
  }

  for (const img of document.querySelectorAll('img')) {
    if (!img.hasAttribute('alt')) problems.push(`<img> without alt: ${img.getAttribute('src')}`);
  }

  const accessibleName = (el) =>
    (
      el.getAttribute('aria-label') ??
      (el.getAttribute('aria-labelledby')
        ? (document.getElementById(el.getAttribute('aria-labelledby'))?.textContent ?? '')
        : '') ??
      ''
    ).trim() || (el.textContent ?? '').trim() || (el.querySelector('title')?.textContent ?? '').trim();

  for (const el of document.querySelectorAll('a[href], button')) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (!accessibleName(el)) {
      problems.push(`<${el.tagName.toLowerCase()}> with no accessible name`);
    }
  }

  const ids = new Map();
  for (const el of document.querySelectorAll('[id]')) {
    ids.set(el.id, (ids.get(el.id) ?? 0) + 1);
  }
  for (const [id, count] of ids) {
    if (count > 1) problems.push(`duplicate id "${id}" (${count}×)`);
  }

  const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
  return { problems, links };
};

const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
const allLinks = new Set();
let failures = 0;

for (const route of pages) {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const consoleErrors = [];
    const networkErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
    page.on('requestfailed', (request) => {
      const reason = request.failure()?.errorText ?? '';
      // Next cancels in-flight route prefetches on navigation; that is expected
      // behaviour, not a broken asset.
      if (reason.includes('ERR_ABORTED')) return;
      networkErrors.push(`${request.url()} — ${reason}`);
    });

    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    // Let entrance animations settle and lazy observers fire.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(350);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const { problems, links } = await page.evaluate(inPage);
    links.forEach((href) => allLinks.add(href));

    const all = [
      ...problems,
      ...consoleErrors.map((e) => `console: ${e}`),
      ...networkErrors.map((e) => `network: ${e}`),
    ];

    if (all.length) {
      failures += all.length;
      console.log(`\n✗ ${route}  [${viewport.name} ${viewport.width}px]`);
      all.forEach((problem) => console.log(`    ${problem}`));
    } else {
      console.log(`✓ ${route}  [${viewport.name}]`);
    }

    await page.close();
  }
}

// --- Link check -----------------------------------------------------------
console.log('\nChecking internal links…');
const internal = [...allLinks].filter(
  (href) => href && href.startsWith('/') && !href.startsWith('//'),
);
const checked = new Set();
for (const href of internal) {
  const [pathPart, hash] = href.split('#');
  const target = pathPart || '/';
  if (checked.has(target)) continue;
  checked.add(target);
  const response = await fetch(`${origin}${target}`, { method: 'HEAD' });
  if (!response.ok) {
    failures += 1;
    console.log(`  ✗ ${href} → ${response.status}`);
  }
  if (hash) {
    const page = await browser.newPage();
    await page.goto(`${origin}${target}`, { waitUntil: 'domcontentloaded' });
    const found = await page.evaluate((id) => Boolean(document.getElementById(id)), hash);
    if (!found) {
      failures += 1;
      console.log(`  ✗ anchor #${hash} missing on ${target}`);
    }
    await page.close();
  }
}
console.log(`  ${checked.size} internal targets checked.`);

await browser.close();
console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} problem(s) found.`);
process.exit(failures === 0 ? 0 : 1);
