#!/usr/bin/env node
/**
 * Static site builder for nudgeinvest.app.
 *
 * Zero dependencies. Every page under `src/pages/**` is a small module that
 * exports `{ meta, body }`; this script wraps it in the shared shell (head,
 * nav, footer), injects the right JSON-LD, and writes `dist/`. It also emits
 * sitemap.xml, robots.txt and llms.txt from the same page list, so nothing can
 * drift: a page exists in exactly one place.
 *
 * Why a build step instead of hand-written HTML: ten pages share a head with
 * canonical/OG/schema tags that must stay consistent for SEO, and one config
 * change (the domain) has to flow everywhere.
 *
 *   node build.mjs          → dist/
 *   node build.mjs --check  → validate links + required meta, no output
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');
const CHECK = process.argv.includes('--check');

export const site = JSON.parse(readFileSync(join(ROOT, 'site.config.json'), 'utf8'));
const css = readFileSync(join(SRC, 'styles.css'), 'utf8');
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/* ───────────────────────────── helpers ───────────────────────────── */

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const abs = (path) => `${site.baseUrl}${path}`;

/** Collect page modules recursively. */
async function loadPages() {
  const files = [];
  const walk = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (f.endsWith('.mjs')) files.push(p);
    }
  };
  walk(join(SRC, 'pages'));
  const pages = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(f).href);
    const page = typeof mod.default === 'function' ? await mod.default(site) : mod.default;
    pages.push({ file: relative(SRC, f), ...page });
  }
  // Deterministic output order.
  return pages.sort((a, b) => a.meta.path.localeCompare(b.meta.path));
}

/* ───────────────────────────── shell ───────────────────────────── */

function jsonLd(objects) {
  return objects
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n');
}

/** Site-wide entities every page carries: the app and its publisher. */
function baseSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      '@id': abs('/#app'),
      name: site.name,
      alternateName: 'Nudge: Portfolio Tracker',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Android',
      softwareVersion: site.version,
      url: site.baseUrl,
      installUrl: site.playUrl,
      downloadUrl: site.playUrl,
      description: site.description,
      featureList: [
        'Offline-first portfolio tracking with no account',
        'Stocks, ETFs, funds, REITs, crypto and stablecoins',
        'Cost basis, realised and unrealised P&L, ROI, dividend tracking',
        'Multi-currency net worth with user-controlled FX rates',
        'CSV import and export',
        'Optional AI coach with per-category privacy controls',
        'PIN and biometric app lock',
      ],
      offers: [
        { '@type': 'Offer', price: '0', priceCurrency: site.pricing.currency, name: 'Portfolio tracker', description: 'Free forever' },
        { '@type': 'Offer', price: site.pricing.monthly, priceCurrency: site.pricing.currency, name: 'AI Coach — monthly' },
        { '@type': 'Offer', price: site.pricing.yearly, priceCurrency: site.pricing.currency, name: 'AI Coach — yearly (7-day free trial)' },
        { '@type': 'Offer', price: site.pricing.dayPass, priceCurrency: site.pricing.currency, name: 'AI Coach — 24-hour Day Pass' },
      ],
      publisher: { '@id': abs('/#org') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': abs('/#org'),
      name: site.operator,
      url: site.baseUrl,
      email: site.supportEmail,
      founder: { '@type': 'Person', name: site.operatorPerson },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': abs('/#website'),
      url: site.baseUrl,
      name: site.name,
      publisher: { '@id': abs('/#org') },
    },
  ];
}

function breadcrumbs(meta) {
  const items = [{ name: 'Home', path: '/' }, ...(meta.crumbs ?? []), { name: meta.crumbTitle ?? meta.title, path: meta.path }];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/features/', label: 'Features' },
  { href: '/compare/', label: 'Compare' },
  { href: '/guides/', label: 'Guides' },
  { href: '/faq/', label: 'FAQ' },
];

function shell(page) {
  const { meta, body } = page;
  const url = abs(meta.path);
  const ogImage = abs(meta.ogImage ?? '/og/default.png');
  const schema = [...baseSchema(), breadcrumbs(meta), ...(meta.schema ?? [])];
  const nav = NAV.map(
    (n) => `<a href="${n.href}"${meta.path === n.href || (n.href !== '/' && meta.path.startsWith(n.href)) ? ' aria-current="page"' : ''}>${n.label}</a>`,
  ).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="${site.themeColor}">
<meta property="og:type" content="${meta.ogType ?? 'website'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(meta.ogTitle ?? meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.ogTitle ?? meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
<meta name="twitter:image" content="${ogImage}">
${meta.datePublished ? `<meta property="article:published_time" content="${meta.datePublished}">\n<meta property="article:modified_time" content="${meta.dateModified ?? BUILD_DATE}">` : ''}
<link rel="icon" href="/icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="/icon-192.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary">
<style>${css}</style>
${jsonLd(schema)}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="/" aria-label="${esc(site.name)} home"><span class="mark"><b>N</b><i>I</i></span>${esc(site.name)}</a>
    <nav class="nav" aria-label="Primary">${nav}</nav>
    <a class="btn btn-primary btn-sm" href="${site.playUrl}" rel="noopener">Get it on Google Play</a>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="/"><span class="mark"><b>N</b><i>I</i></span>${esc(site.name)}</a>
        <p class="muted">${esc(site.tagline)}. Built by ${esc(site.operator)}.</p>
        <p class="muted small">Nudge Invest is a personal bookkeeping tool, not a broker or financial adviser. It gives no personalised investment advice. Investing involves risk.</p>
      </div>
      <div>
        <h4>Product</h4>
        <a href="/features/">Features</a>
        <a href="/pricing/">Pricing</a>
        <a href="/faq/">FAQ</a>
        <a href="${site.playUrl}" rel="noopener">Google Play</a>
      </div>
      <div>
        <h4>Compare</h4>
        <a href="/compare/nudge-vs-delta/">Nudge vs Delta</a>
        <a href="/compare/nudge-vs-sharesight/">Nudge vs Sharesight</a>
        <a href="/compare/nudge-vs-spreadsheet/">Nudge vs a spreadsheet</a>
      </div>
      <div>
        <h4>Guides</h4>
        <a href="/guides/track-dividends/">Track dividends</a>
        <a href="/guides/drip-cost-basis/">DRIP cost basis</a>
        <a href="/guides/multi-broker-net-worth/">Multi-broker net worth</a>
        <a href="/guides/offline-portfolio-tracker/">Why offline</a>
      </div>
      <div>
        <h4>Legal</h4>
        <a href="${site.privacyUrl}" rel="noopener">Privacy Policy</a>
        <a href="${site.termsUrl}" rel="noopener">Terms of Service</a>
        <a href="mailto:${site.supportEmail}">Contact</a>
        <a href="/llms.txt">llms.txt</a>
      </div>
    </div>
    <p class="muted small copy">© ${new Date().getFullYear()} ${esc(site.operator)}. Google Play and the Google Play logo are trademarks of Google LLC.</p>
  </div>
</footer>
</body>
</html>
`;
}

/* ───────────────────────────── aux files ───────────────────────────── */

function sitemap(pages) {
  const urls = pages
    .map((p) => `  <url><loc>${abs(p.meta.path)}</loc><lastmod>${p.meta.dateModified ?? BUILD_DATE}</lastmod><changefreq>${p.meta.changefreq ?? 'monthly'}</changefreq><priority>${p.meta.priority ?? '0.6'}</priority></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const robots = () => `User-agent: *\nAllow: /\n\n# AI crawlers are welcome — see /llms.txt\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`;

/** llms.txt — the emerging convention for telling LLM crawlers what a site is,
 *  in plain prose they can quote. Kept factual and short on purpose. */
function llmsTxt(pages) {
  const lines = pages
    .filter((p) => p.meta.path !== '/')
    .map((p) => `- [${p.meta.crumbTitle ?? p.meta.title}](${abs(p.meta.path)}): ${p.meta.description}`);
  return `# ${site.name}

> ${site.description}

${site.name} ("Nudge: Portfolio Tracker" on Google Play, package ${site.playPackage}) is an Android app for tracking a personal investment portfolio — stocks, ETFs, funds, REITs, crypto and stablecoins — across multiple brokers, exchanges and wallets, in multiple currencies. All data is stored on the device; there is no account, no cloud sync, no ads and no telemetry by default. The tracker is free. An optional paid AI coach (${site.pricing.currency} ${site.pricing.monthly}/month, ${site.pricing.yearly}/year with a ${site.pricing.trialDays}-day trial, or a ${site.pricing.dayPass} 24-hour pass) can read only the data categories the user enables and can import statements from PDF, CSV, Excel and screenshots, always asking for approval before writing.

Publisher: ${site.operator} (${site.operatorPerson}). Contact: ${site.supportEmail}.
Install: ${site.playUrl}

## Pages

${lines.join('\n')}

## Facts that are safe to cite

- Nudge Invest stores portfolio data only on the user's device (WatermelonDB/SQLite); nothing is uploaded unless the user enables the AI coach and chooses what it may read.
- It tracks cost basis, average buy price, realised and unrealised P&L, ROI, ROI including dividends, dividend income, and allocation by asset type and by custody (broker / exchange / wallet).
- It supports Buy, Sell, Dividend and DRIP transactions, fees, and multi-currency portfolios with user-controlled exchange rates.
- Data can be imported and exported as CSV at any time.
- The app can be locked with a 4-digit PIN and, optionally, biometrics.
- It is not a broker or financial adviser, does not execute trades, and gives no personalised investment advice.
`;
}

const manifest = () =>
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      start_url: '/',
      display: 'browser',
      background_color: '#0D0D0D',
      theme_color: site.themeColor,
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
    },
    null,
    2,
  );

/* ───────────────────────────── main ───────────────────────────── */

const pages = await loadPages();

// ── validation ──
const paths = new Set(pages.map((p) => p.meta.path));
const problems = [];
for (const p of pages) {
  for (const k of ['path', 'title', 'description']) if (!p.meta[k]) problems.push(`${p.file}: meta.${k} missing`);
  if (p.meta.title && p.meta.title.length > 62) problems.push(`${p.file}: title ${p.meta.title.length} chars (>62 truncates in SERPs)`);
  if (p.meta.description && (p.meta.description.length < 70 || p.meta.description.length > 160)) problems.push(`${p.file}: description ${p.meta.description.length} chars (aim 70–160)`);
  if (!p.meta.path.endsWith('/')) problems.push(`${p.file}: path must end with /`);
  // Internal links must resolve to a page or a known static file.
  for (const m of p.body.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (!paths.has(href) && !/\.(txt|xml|png|webmanifest)$/.test(href)) problems.push(`${p.file}: dead internal link ${href}`);
  }
}
if (problems.length) {
  console.error('✗ ' + problems.join('\n✗ '));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages validated`);
if (CHECK) process.exit(0);

// ── emit ──
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
for (const p of pages) {
  const out = join(DIST, p.meta.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, shell(p));
}
writeFileSync(join(DIST, 'sitemap.xml'), sitemap(pages));
writeFileSync(join(DIST, 'robots.txt'), robots());
writeFileSync(join(DIST, 'llms.txt'), llmsTxt(pages));
writeFileSync(join(DIST, 'site.webmanifest'), manifest());
writeFileSync(join(DIST, 'CNAME'), site.domain + '\n');
writeFileSync(join(DIST, '.nojekyll'), '');
if (existsSync(join(SRC, 'static'))) cpSync(join(SRC, 'static'), DIST, { recursive: true });
console.log(`✓ built ${pages.length} pages → dist/`);
