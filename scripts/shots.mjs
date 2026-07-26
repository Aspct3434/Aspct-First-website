/**
 * Full-page screenshots for visual review. Dev-only tooling.
 *   node scripts/shots.mjs <origin> <outDir>
 */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const origin = process.argv[2] ?? 'http://localhost:4173';
const outDir = process.argv[3] ?? '.shots';
const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';

const targets = process.argv.slice(4);
const routes = targets.length ? targets : ['/', '/features/', '/pricing/', '/about/', '/security/', '/contact/', '/signin/', '/signup/', '/app/', '/404.html'];
const viewports = [
  { name: 'd', width: 1440, height: 1000 },
  { name: 'm', width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });

for (const route of routes) {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.6;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 260));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    const name = route.replace(/[/.]/g, '_').replace(/^_|_$/g, '') || 'home';
    await page.screenshot({ path: path.join(outDir, `${name}-${vp.name}.png`), fullPage: true });
    await page.close();
    console.log(`${name}-${vp.name}.png`);
  }
}
await browser.close();
