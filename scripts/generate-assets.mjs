/**
 * Renders the brand raster assets — Open Graph card, PWA icons, Apple touch
 * icon — so they stay in sync with the design tokens instead of drifting in a
 * design file somewhere.
 *
 *   npm run build
 *   npm run serve            # in another shell
 *   npm run assets
 *
 * The OG card is injected into the built homepage rather than rendered from a
 * standalone file, so it inherits the site's own @font-face rules and CSS
 * variables and does not need to know the build's asset hashes.
 *
 * Dev-only tooling. Nothing here ships in the site bundle.
 */
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = process.argv[2] ?? 'http://localhost:4173';
const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const root = process.cwd();

const iconSvg = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
     style="display:block;width:100vw;height:100vh">
  <rect width="32" height="32" fill="#0A4135"/>
  <g fill="none" stroke-linecap="round" stroke-width="2.2" transform="translate(2.5 2.5) scale(0.84)">
    <path d="M7.5 17.5A7.5 7.5 0 0 1 15 25" stroke="#F0C458"/>
    <path d="M7.5 11.5A13.5 13.5 0 0 1 21 25" stroke="#74BCA8"/>
    <path d="M7.5 5.5A19.5 19.5 0 0 1 27 25" stroke="#3C9F87" opacity="0.85"/>
  </g>
  <circle cx="8.8" cy="23.5" r="1.6" fill="#fff"/>
</svg>`;

const iconHtml = `<!doctype html><meta charset="utf-8">
<style>*{margin:0;padding:0}html,body{width:100%;height:100%;background:#0A4135;overflow:hidden}</style>
${iconSvg}`;

const ogCard = `
<div class="og">
  <div class="og-veil"></div>
  <div class="og-glow"></div>
  <div class="og-row">
    <svg width="56" height="56" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="9.5" fill="#F0C458"/>
      <g fill="none" stroke-linecap="round" stroke-width="2.5">
        <path d="M7.5 17.5A7.5 7.5 0 0 1 15 25" stroke="#0A4135"/>
        <path d="M7.5 11.5A13.5 13.5 0 0 1 21 25" stroke="#0B5445"/>
        <path d="M7.5 5.5A19.5 19.5 0 0 1 27 25" stroke="#0A6C56" opacity="0.85"/>
      </g>
      <circle cx="7.5" cy="25" r="1.9" fill="#072D26"/>
    </svg>
    <span class="og-wordmark">Lumina</span>
  </div>
  <div>
    <h1 class="og-title">Clarity for <em>every</em> dollar you earn.</h1>
    <p class="og-lede">AI-powered personal finance. Connect your accounts, see where the money goes, automate the saving.</p>
  </div>
  <div class="og-chips">
    <span class="og-chip og-chip--accent">30 days free</span>
    <span class="og-chip">No card required</span>
    <span class="og-chip">Read-only bank access</span>
    <span class="og-chip">SOC 2 Type II</span>
  </div>
</div>`;

const ogCss = `
  html, body { margin: 0; padding: 0; overflow: hidden; background: #0b1512; }
  .og {
    position: relative; width: 1200px; height: 630px; overflow: hidden;
    background: #0b1512; color: #f4f1ea; padding: 72px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
    font-family: 'Instrument Sans', system-ui, sans-serif;
  }
  .og-veil {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(244,241,234,.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(244,241,234,.05) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .og-glow {
    position: absolute; right: -180px; top: -220px; width: 720px; height: 720px;
    border-radius: 50%; background: rgba(11,84,69,.75); filter: blur(130px);
  }
  .og-row { position: relative; display: flex; align-items: center; gap: 16px; }
  .og-wordmark { font-family: 'Instrument Serif', serif; font-size: 40px; line-height: 1; }
  .og-title {
    position: relative; margin: 0; font-family: 'Instrument Serif', serif; font-weight: 400;
    font-size: 86px; line-height: 1.03; letter-spacing: -0.028em; max-width: 15ch;
  }
  .og-title em { font-style: italic; }
  .og-lede {
    position: relative; margin: 26px 0 0; font-size: 26px; line-height: 1.45;
    color: #a9bbb2; max-width: 30ch;
  }
  .og-chips { position: relative; display: flex; gap: 12px; flex-wrap: wrap; }
  .og-chip {
    border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.06);
    border-radius: 999px; padding: 10px 20px; font-size: 20px; font-weight: 600; color: #a9bbb2;
  }
  .og-chip--accent { color: #0b1512; background: #f0c458; border-color: #f0c458; }
`;

const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });

async function save(buffer, out, width, height) {
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, buffer);
  console.log(`${path.relative(root, out)}  ${width}×${height}`);
}

async function shootHtml(html, size, out) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'load' });
  const buffer = await page.screenshot({ type: 'png' });
  await save(buffer, out, size, size);
  await page.close();
}

async function shootOg(out) {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  // Load the real site first so the card inherits its self-hosted webfonts.
  await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
  await page.evaluate(
    ({ card, css }) => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.append(style);
      document.body.innerHTML = card;
    },
    { card: ogCard, css: ogCss },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const buffer = await page.screenshot({ type: 'png' });
  await save(buffer, out, 1200, 630);
  await page.close();
}

await shootOg(path.join(root, 'public/og.png'));
await shootHtml(iconHtml, 512, path.join(root, 'public/icon-512.png'));
await shootHtml(iconHtml, 192, path.join(root, 'public/icon-192.png'));
await shootHtml(iconHtml, 180, path.join(root, 'app/apple-icon.png'));

await browser.close();
