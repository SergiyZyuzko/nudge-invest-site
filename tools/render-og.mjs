#!/usr/bin/env node
/**
 * Render tools/og.html → src/static/og/default.png (1200x630).
 * Reuses the app repo's CDP helper so both repos drive Chrome the same way.
 *
 *   node tools/render-og.mjs
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const { launchChrome, capturePage } = await import(
  pathToFileURL(resolve(here, '../../nudge-invest/scripts/lib/cdp.mjs')).href
);

const { cdp, dispose } = await launchChrome({ port: 9335 });
try {
  const { png } = await capturePage(cdp, {
    url: pathToFileURL(resolve(here, 'og.html')).href,
    device: { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false },
    ready: 'window.__ready === true',
    settleMs: 300,
    timeoutMs: 10_000,
  });
  const out = resolve(here, '../src/static/og/default.png');
  writeFileSync(out, png);
  console.log('✓', out);
} finally {
  await dispose();
}
