import { faq } from '../lib/ui.mjs';

/**
 * Landing page — implemented from the Claude Design canvas
 * "Nudge Invest Landing.dc.html" (project 3bea2fc2).
 *
 * The canvas file is a standalone page with its own header, footer and a
 * `DCLogic` component class. Here the shared shell (build.mjs) keeps owning the
 * header, footer, canonical/OG tags and site-wide JSON-LD — that shell is what
 * links the other twelve pages together, and the canvas header only had
 * on-page anchors. What is ported is the body: sections, visual language and
 * the three interactions, rewritten as `<details>` plus ~20 lines of vanilla JS
 * so the FAQ and the fact sheet stay in the DOM for crawlers with JS disabled.
 *
 * Written for two readers at once: a person deciding whether to install, and a
 * language model deciding whether to cite. Every section leads with a plain,
 * quotable sentence before the marketing copy.
 */

const ICONS = {
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>',
  shieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path>',
  eyeOff: '<path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68"></path><path d="M6.06 6.06A13.6 13.6 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.94-1.94"></path><path d="M14.08 14.08a3 3 0 1 1-4.16-4.16"></path><path d="m2 2 20 20"></path>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l4.2 4.2-2 3.4-2.5-.5.9 3.1 3.1.9-.5-2.5 3.4-2 4.2 4.2a.5.5 0 0 0 .8-.5z"></path>',
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path>',
  coins: '<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4M10 10h4M10 14h4M10 18h4"></path>',
  trend: '<path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path>',
  globe: '<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  sparkle: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v5h5"></path><path d="M8 13h8M8 17h5"></path>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path>',
  toggle: '<rect x="2" y="6" width="20" height="12" rx="6"></rect><circle cx="16" cy="12" r="2.5"></circle>',
  bot: '<path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>',
  check: '<path d="M20 6 9 17l-5-5"></path>',
  chevron: '<path d="m6 9 6 6 6-6"></path>',
  info: '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path>',
};

const svg = (name, { size = 18, stroke = '#1D9E75', width = 1.8 } = {}) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const PLAY_GLYPH = (w = 23, h = 25) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 512 555" aria-hidden="true"><path fill="#34A853" d="M20 12 300 292 366 226 60 6C46 -3 31 1 20 12z"></path><path fill="#EA4335" d="M20 543 300 263 366 329 60 549C46 558 31 554 20 543z"></path><path fill="#FBBC04" d="M470 240C495 254 495 301 470 315L392 359 322 278 392 196z"></path><path fill="#4285F4" d="M14 18C10 26 8 36 8 48v459c0 12 2 22 6 30l286-260z"></path></svg>`;

const APPLE_GLYPH = (w = 22, h = 26) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 24 28" fill="#FAFAFA" aria-hidden="true"><path d="M17.6 14.8c0-2.7 2.2-4 2.3-4.1-1.2-1.8-3.2-2-3.9-2.1-1.6-.2-3.2.9-4 .9-.8 0-2.1-.9-3.5-.9-1.8 0-3.5 1.1-4.4 2.7-1.9 3.2-.5 8 1.3 10.6.9 1.3 2 2.7 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.8c1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4zM15 6.9c.7-.9 1.2-2.1 1.1-3.4-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.4-.6 3.2-1.5z"></path></svg>`;

/** The two store buttons. iOS has no destination yet — it announces itself. */
const storeButtons = (site, { center = false } = {}) => `
<div class="nd-stores"${center ? ' style="justify-content:center"' : ''}>
  <a class="nd-store" href="${site.playUrl}" rel="noopener">
    ${PLAY_GLYPH()}
    <span class="lab"><i>Get it on</i><b>Google Play</b></span>
  </a>
  <button type="button" class="nd-store" data-ios>
    <span class="idle">
      ${APPLE_GLYPH()}
      <span class="lab"><i>Download on the</i><b>App Store</b></span>
    </span>
    <span class="soon">Coming soon</span>
  </button>
</div>`;

export default (site) => {
  const { monthly, yearly, dayPass, trialDays } = site.pricing;

  /* The five questions the design puts on the homepage. The long-tail set
     lives on /faq/, so the two pages don't compete for the same snippet. */
  const FAQ = faq(
    [
      { q: 'Is it really free?', a: '<p>Yes. The whole tracker is free forever, with unlimited assets and transactions and no ads. The only paid feature is the optional AI Coach.</p>' },
      { q: 'Where is my data stored?', a: '<p>On your device. Holdings, transactions and your FX table stay in local storage on the phone, protected by a 4-digit PIN and biometric app lock.</p>' },
      { q: 'Can I import from my broker?', a: '<p>Yes. CSV import and export are part of the free tracker. The AI Coach can also read broker statements from PDF, Excel, CSV or photos, and never saves anything without an explicit Approve. See the <a href="/guides/offline-portfolio-tracker/">offline tracker guide</a>.</p>' },
      { q: 'Does it need an account?', a: '<p>No. There is no sign-up and no account. Paid AI Coach plans are billed through Google Play.</p>' },
      { q: 'When is iOS coming?', a: '<p>Android is available now. iOS is in progress and will be announced on this page when it ships.</p>' },
    ],
    { heading: 'Questions' },
  );

  /* Rendered as the design's own accordion rather than the shared .faq block,
     so the chevron and card styling match the rest of the page. */
  const faqHtml = FAQ.schema.mainEntity
    .map(
      (q, i) => `<details${i === 0 ? ' open' : ''}>
      <summary>${q.name}${svg('chevron', { size: 17, width: 2 })}</summary>
      <div class="a">${q.acceptedAnswer.text}</div>
    </details>`,
    )
    .join('\n    ');

  const FACTS = [
    ['Product name', 'Nudge Invest'],
    ['Listed on Google Play as', 'Nudge: Portfolio Tracker'],
    ['Developer', site.operator],
    ['Category', 'Finance — portfolio tracker'],
    ['Platforms', 'Android (available now). iOS (coming soon, no date announced).'],
    ['Price of the tracker', 'Free, forever. Unlimited assets and transactions.'],
    ['Only paid feature', `AI Coach — $${monthly}/month, $${yearly}/year with a ${trialDays}-day free trial, or a $${dayPass} 24-hour Day Pass`],
    ['Billing', 'Google Play'],
    ['Where data is stored', 'On the user&rsquo;s device only. No cloud sync, no server copy.'],
    ['Account required', 'No. There is no sign-up and no account.'],
    ['Ads', 'None.'],
    ['Works offline', 'Yes. The tracker is fully offline-first.'],
    ['Asset types tracked', 'Stocks, ETFs, funds, REITs, crypto, stablecoins'],
    ['Metrics', 'Cost basis, average buy price, realised and unrealised P&amp;L, ROI, ROI including dividends, dividend income per asset and per year, net worth'],
    ['Currencies', 'Multi-currency net worth using the user&rsquo;s own FX table'],
    ['Held at', 'Each holding is tagged with its broker, exchange or wallet'],
    ['Import and export', 'CSV import and export. AI Coach can read PDF, Excel, CSV and photo statements.'],
    ['Security', '4-digit PIN and biometric app lock'],
    ['AI Coach permissions', 'Reads only what privacy toggles allow; never writes without an explicit Approve'],
    ['Install URL', `<a href="${site.playUrl}" rel="noopener">${site.playUrl.replace('https://', '')}</a>`],
    ['Support', `<a href="mailto:${site.supportEmail}">${site.supportEmail}</a>`],
  ];

  const SHOTS = [
    ['01-portfolio', 'Portfolio', 'Portfolio dashboard with net worth, all-time P&amp;L and allocation by asset type'],
    ['03-assets', 'Asset detail', 'Assets list showing cost basis, ROI and where each holding is kept'],
    ['04-transactions', 'Transactions', 'Transaction history with buys, sells, dividends and DRIP'],
    ['02-charts', 'Charts', 'Unrealised profit and loss by asset, and portfolio value over time'],
    ['05-coach', 'AI Coach', 'AI Coach answering a question about the portfolio'],
    ['06-settings', 'Settings', 'Settings screen with AI privacy toggles and app lock'],
  ];

  const body = `
<div class="nd">

  <section style="position:relative;overflow:hidden">
    <div class="nd-glow" style="top:-160px;right:-80px;width:760px;height:760px;background:radial-gradient(closest-side,rgba(29,158,117,0.16),rgba(29,158,117,0))"></div>
    <div class="nd-wrap nd-split" style="padding-top:clamp(52px,7vw,104px)">
      <div class="col">
        <div class="nd-pill">${svg('shield', { size: 14 })}<span>The private, offline portfolio tracker</span></div>
        <h1 style="margin:20px 0 0">The private, offline portfolio tracker for stocks, ETFs, crypto &amp; dividends</h1>
        <p class="lede" style="max-width:54ch">Track stocks, ETFs, funds, REITs, crypto and stablecoins in one place, see real profit &amp; loss, and keep every number on your own device. No account. No sign-up. No ads. No cloud.</p>
        ${storeButtons(site)}
        <div class="nd-trust">
          <b>${svg('check', { size: 14, width: 2.2 })}No account</b>
          <b>${svg('check', { size: 14, width: 2.2 })}No cloud</b>
          <b>${svg('check', { size: 14, width: 2.2 })}No ads</b>
          <span style="color:#555550">·</span>
          <span>Android now, iOS coming soon</span>
        </div>
      </div>
      <div class="shot">
        <div class="nd-phone float">
          <div class="nd-screen">
            <div class="nd-notch"></div>
            <div class="nd-status"><span>9:41</span><span style="display:flex;align-items:center;gap:5px"><b style="font-size:9px">5G</b><span style="display:block;width:18px;height:9px;border:1px solid #FAFAFA;border-radius:2px;padding:1px"><span style="display:block;width:72%;height:100%;background:#FAFAFA;border-radius:1px"></span></span></span></div>
            <div class="nd-body">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:22px;font-weight:500;letter-spacing:-0.4px">Portfolio</span>
                <span style="display:flex;align-items:center;gap:6px">
                  <span style="display:flex;align-items:center;gap:5px;background:#1A1A1A;border:1px solid rgba(255,255,255,0.08);border-radius:999px;padding:5px 9px"><span style="font-size:12px">&#127482;&#127480;</span><b style="font-size:11px">USD</b></span>
                  <span style="display:flex;align-items:center;gap:3px;background:rgba(29,158,117,0.15);border-radius:9px;padding:5px 9px;color:var(--green)"><b style="font-size:13px;line-height:1">+</b><b style="font-size:11px">Add</b></span>
                </span>
              </div>
              <div class="nd-tile" style="padding:15px">
                <div style="font-size:11px;font-weight:500;color:#888780;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px">Net worth</div>
                <div style="display:flex;align-items:center;gap:8px"><span style="font-size:20px">&#127482;&#127480;</span><span class="tnum" style="font-size:28px;font-weight:500;letter-spacing:-0.5px">$48,250.00</span></div>
                <div style="display:flex;align-items:center;gap:7px;margin-top:7px"><span class="tnum" style="font-size:13px;font-weight:600;color:var(--green)">+$6,180.00</span><span class="tnum" style="font-size:13px;color:var(--green)">(+14.7%)</span><span style="font-size:10px;color:#888780">all-time · incl. div</span></div>
              </div>
              <div style="display:flex;gap:10px">
                <div class="nd-tile" style="flex:1;border-radius:12px;padding:11px"><div style="font-size:9px;color:#888780;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Cash invested</div><div class="tnum" style="font-size:15px;font-weight:500">$42,070</div></div>
                <div class="nd-tile" style="flex:1;border-radius:12px;padding:11px"><div style="font-size:9px;color:#888780;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Dividends 2026</div><div class="tnum" style="font-size:15px;font-weight:500;color:var(--green)">$612.40</div></div>
              </div>
              <div class="nd-tile">
                <div style="font-size:10px;color:#888780;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:10px">By type</div>
                <div style="display:flex;height:11px;border-radius:999px;overflow:hidden;background:#242424"><span style="flex:34;background:#6366F1"></span><span style="flex:28;background:#1D9E75"></span><span style="flex:20;background:#7C5AF8"></span><span style="flex:10;background:#D97706"></span><span style="flex:8;background:#3B9EE8"></span></div>
                <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;font-size:12px">
                  <div style="display:flex;align-items:center;justify-content:space-between"><span style="display:flex;align-items:center;gap:7px"><span style="width:9px;height:9px;border-radius:50%;background:#6366F1"></span>Stock</span><span class="tnum" style="font-size:11px;color:#888780">$16,405 · 34.0%</span></div>
                  <div style="display:flex;align-items:center;justify-content:space-between"><span style="display:flex;align-items:center;gap:7px"><span style="width:9px;height:9px;border-radius:50%;background:#1D9E75"></span>Fund</span><span class="tnum" style="font-size:11px;color:#888780">$13,510 · 28.0%</span></div>
                  <div style="display:flex;align-items:center;justify-content:space-between"><span style="display:flex;align-items:center;gap:7px"><span style="width:9px;height:9px;border-radius:50%;background:#7C5AF8"></span>Crypto</span><span class="tnum" style="font-size:11px;color:#888780">$9,650 · 20.0%</span></div>
                </div>
              </div>
            </div>
            <div class="nd-tabs">
              <div style="color:var(--green)">${svg('chart', { size: 20 })}Portfolio</div>
              <div>${svg('chart', { size: 20, stroke: '#888780' })}Assets</div>
              <div>${svg('file', { size: 20, stroke: '#888780' })}Activity</div>
              <div>${svg('sparkle', { size: 20, stroke: '#888780' })}AI Coach</div>
              <div>${svg('toggle', { size: 20, stroke: '#888780' })}Settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="why">
    <div class="nd-wrap">
      <div class="nd-eyebrow">Why offline-first</div>
      <h2 style="max-width:20ch">Privacy is the architecture, not a setting</h2>
      <div class="nd-cards">
        <div class="nd-card">
          <div class="nd-ico">${svg('shieldCheck', { size: 19 })}</div>
          <h3>Your data never leaves your phone</h3>
          <p>Holdings, transactions and your FX table are stored locally, behind a 4-digit PIN and biometric app lock.</p>
        </div>
        <div class="nd-card">
          <div class="nd-ico">${svg('eyeOff', { size: 19 })}</div>
          <h3>No account, no tracking, no ads</h3>
          <p>There is nothing to sign up for and no profile to create. The app carries no ad slots.</p>
        </div>
        <div class="nd-card">
          <div class="nd-ico">${svg('plane', { size: 19 })}</div>
          <h3>Works on a plane, in a vault, anywhere</h3>
          <p>The tracker runs fully offline. Open it with no signal and every number is still there. <a href="/guides/offline-portfolio-tracker/">Why this matters &rarr;</a></p>
        </div>
      </div>
    </div>
  </section>

  <section id="features">
    <div class="nd-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-end;justify-content:space-between">
        <div>
          <div class="nd-eyebrow">The tracker</div>
          <h2>Everything you own, one screen</h2>
        </div>
        <span class="nd-tag" style="padding:5px 11px;font-size:12px">Free, forever, no ads</span>
      </div>
      <div class="nd-cards">
        <div class="nd-card"><div class="nd-ico" style="background:rgba(99,102,241,0.14)">${svg('chart', { stroke: '#6366F1' })}</div><h3>Stocks, ETFs &amp; funds</h3><p>Unlimited assets and transactions, with cost basis and average buy price on every position.</p></div>
        <div class="nd-card"><div class="nd-ico" style="background:rgba(124,90,248,0.14)">${svg('coins', { stroke: '#7C5AF8' })}</div><h3>Crypto &amp; stablecoins</h3><p>Coins and stablecoins sit beside your shares, each tagged with the exchange or wallet they are held at.</p></div>
        <div class="nd-card"><div class="nd-ico" style="background:rgba(217,119,6,0.14)">${svg('building', { stroke: '#D97706' })}</div><h3>REITs &amp; dividend income</h3><p>Dividend income per asset and per year, plus ROI including dividends alongside plain ROI.</p></div>
        <div class="nd-card"><div class="nd-ico" style="background:rgba(29,158,117,0.14)">${svg('trend')}</div><h3>Real profit &amp; loss</h3><p>Realised and unrealised P&amp;L and ROI, calculated from your own transactions and cost basis.</p></div>
        <div class="nd-card"><div class="nd-ico" style="background:rgba(59,158,232,0.14)">${svg('globe', { stroke: '#3B9EE8' })}</div><h3>Multi-currency net worth</h3><p>Net worth across currencies using your own FX table, so the conversion is yours and not a guess.</p></div>
        <div class="nd-card"><div class="nd-ico" style="background:rgba(255,255,255,0.07)">${svg('lock', { stroke: '#FAFAFA' })}</div><h3>CSV, charts and app lock</h3><p>CSV import and export, charts over your history, and a 4-digit PIN with biometric app lock.</p></div>
      </div>
    </div>
  </section>

  <section id="coach" style="position:relative;overflow:hidden">
    <div class="nd-glow" style="left:-140px;bottom:-200px;width:620px;height:620px;background:radial-gradient(closest-side,rgba(124,90,248,0.13),rgba(124,90,248,0))"></div>
    <div class="nd-wrap nd-split">
      <div class="col">
        <div class="nd-pill violet">${svg('sparkle', { size: 14, stroke: '#7C5AF8' })}<span>The only paid feature</span></div>
        <h2 style="margin-top:16px">AI Coach that reads only what you allow</h2>
        <p class="lede" style="max-width:54ch">Optional, off by default, and it never writes to your portfolio without an explicit Approve.</p>
        <div style="margin-top:28px;display:flex;flex-direction:column;gap:14px">
          <div class="nd-card" style="display:flex;gap:13px;align-items:flex-start;border-radius:12px;padding:15px 16px">${svg('file', { stroke: '#7C5AF8' })}<p style="margin:0;font-size:15px;line-height:1.55;color:var(--ink)">Imports broker statements from PDF, Excel, CSV or photos.</p></div>
          <div class="nd-card" style="display:flex;gap:13px;align-items:flex-start;border-radius:12px;padding:15px 16px">${svg('refresh', { stroke: '#7C5AF8' })}<p style="margin:0;font-size:15px;line-height:1.55;color:var(--ink)">Refreshes prices and FX rates when you ask it to.</p></div>
          <div class="nd-card" style="display:flex;gap:13px;align-items:flex-start;border-radius:12px;padding:15px 16px">${svg('toggle', { stroke: '#7C5AF8' })}<p style="margin:0;font-size:15px;line-height:1.55;color:var(--ink)">Privacy toggles decide what it can see. Nothing else is shared.</p></div>
        </div>
        <p style="margin-top:22px"><a class="btn btn-ghost" href="/pricing/">See pricing</a></p>
      </div>
      <div class="shot">
        <div class="nd-phone violet">
          <div class="nd-screen">
            <div class="nd-notch"></div>
            <div class="nd-status"><span>9:41</span><span style="display:flex;align-items:center;gap:5px"><b style="font-size:9px">5G</b><span style="display:block;width:18px;height:9px;border:1px solid #FAFAFA;border-radius:2px;padding:1px"><span style="display:block;width:72%;height:100%;background:#FAFAFA;border-radius:1px"></span></span></span></div>
            <div class="nd-body" style="gap:10px">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:22px;font-weight:500;letter-spacing:-0.4px">AI Coach</span>
                <span style="display:flex;align-items:center;gap:5px;background:rgba(124,90,248,0.15);border-radius:999px;padding:5px 9px"><span style="width:6px;height:6px;border-radius:50%;background:#7C5AF8"></span><b style="font-size:10px;color:#B9A6FB">Read-only</b></span>
              </div>
              <div style="align-self:flex-end;max-width:82%;background:#242424;border-radius:14px 14px 4px 14px;padding:10px 12px;font-size:12.5px;line-height:1.5">Import this statement from my broker.</div>
              <div class="nd-tile" style="align-self:flex-start;max-width:88%;border-radius:14px 14px 14px 4px;padding:10px 12px;font-size:12.5px;line-height:1.5">I read 12 transactions from the PDF. Nothing has been saved yet.</div>
              <div class="nd-tile" style="padding:13px;display:flex;flex-direction:column;gap:9px">
                <div style="font-size:9px;font-weight:600;color:#888780;text-transform:uppercase;letter-spacing:0.6px">Proposed changes</div>
                <div style="display:flex;justify-content:space-between;font-size:12px"><span>Buy VWCE &times; 24</span><span class="tnum" style="font-weight:600;color:var(--green)">+$2,880.00</span></div>
                <div style="display:flex;justify-content:space-between;font-size:12px"><span>Sell AAPL &times; 6</span><span class="tnum" style="font-weight:600;color:#E24B4A">&minus;$1,344.60</span></div>
                <div style="display:flex;justify-content:space-between;font-size:12px"><span>Dividend O</span><span class="tnum" style="font-weight:600;color:#D97706">+$26.40</span></div>
                <div style="font-size:11px;color:#888780">+ 9 more</div>
                <div style="display:flex;gap:8px;margin-top:2px">
                  <span style="flex:1;height:38px;border-radius:10px;background:var(--green);display:flex;align-items:center;justify-content:center;gap:5px;font-size:13px;font-weight:600;color:#062019">${svg('check', { size: 14, stroke: '#062019', width: 2.4 })}Approve</span>
                  <span style="flex:1;height:38px;border-radius:10px;background:#242424;border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#D8D8D2">Reject</span>
                </div>
              </div>
              <div class="nd-tile" style="margin-top:auto;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;border-radius:999px;padding:9px 9px 9px 14px;font-size:12.5px;color:#888780">
                Ask the coach&hellip;
                <span style="width:28px;height:28px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#062019" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 14 0M13 6l6 6-6 6"></path></svg></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="screens">
    <div class="nd-wrap" style="padding-bottom:20px">
      <div class="nd-eyebrow">Screens</div>
      <h2>A look inside</h2>
    </div>
    <div class="nd-strip">
      ${SHOTS.map(
        ([file, label, alt]) =>
          `<figure><img src="/shots/${file}.png" width="232" height="412" loading="lazy" alt="${alt}"><figcaption>${label}</figcaption></figure>`,
      ).join('\n      ')}
    </div>
  </section>

  <section id="pricing">
    <div class="nd-wrap">
      <div class="nd-eyebrow">Pricing</div>
      <h2>Free tracker. Optional coach.</h2>

      <div class="nd-free">
        <div style="display:flex;align-items:center;gap:13px">
          <div class="nd-ico" style="width:34px;height:34px">${svg('check', { size: 17 })}</div>
          <div>
            <div style="font-size:15.5px;font-weight:600">Tracker</div>
            <div style="font-size:13.5px;color:#888780;margin-top:2px">Free, forever, no ads</div>
          </div>
        </div>
        <div class="tnum" style="font-size:20px;font-weight:600;color:var(--green)">$0</div>
      </div>

      <div class="nd-plans">
        <div class="nd-plan">
          <div style="font-size:15.5px;font-weight:600">Monthly</div>
          <div class="amt tnum"><b>$${monthly}</b><small>/ month</small></div>
          <p>AI Coach, billed monthly. Cancel any time.</p>
          <div class="buy"><a href="${site.playUrl}" rel="noopener">Via Google Play</a></div>
        </div>
        <div class="nd-plan featured">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
            <div style="font-size:15.5px;font-weight:600">Yearly</div>
            <span class="nd-tag">${trialDays}-day free trial</span>
          </div>
          <div class="amt tnum"><b>$${yearly}</b><small>/ year</small></div>
          <p>AI Coach for a year, with a ${trialDays}-day free trial.</p>
          <div class="buy"><a href="${site.playUrl}" rel="noopener">Via Google Play</a></div>
        </div>
        <div class="nd-plan">
          <div style="font-size:15.5px;font-weight:600">Day Pass</div>
          <div class="amt tnum"><b>$${dayPass}</b><small>/ 24 hours</small></div>
          <p>One-off access for 24 hours. No subscription.</p>
          <div class="buy"><a href="${site.playUrl}" rel="noopener">Via Google Play</a></div>
        </div>
      </div>
      <p class="muted small" style="margin-top:16px">Billing via Google Play. <a href="/pricing/">Full pricing details &rarr;</a></p>
    </div>
  </section>

  <section id="faq">
    <div class="nd-wrap" style="max-width:820px">
      <h2 style="margin:0 0 30px">Questions</h2>
      <div class="nd-acc">
    ${faqHtml}
      </div>
      <p class="muted small" style="margin-top:18px"><a href="/faq/">More questions answered &rarr;</a></p>
    </div>
  </section>

  <section id="for-ai">
    <div class="nd-wrap" style="max-width:960px">
      <div class="nd-pill plain">${svg('bot', { size: 14 })}<span>Machine-readable</span></div>
      <h2 style="margin-top:16px">Are you an AI or agent?</h2>
      <p class="lede" style="max-width:64ch">Everything about Nudge Invest, stated once and plainly, so it can be quoted without guessing. The same facts are published on this page as schema.org <code>SoftwareApplication</code> and <code>FAQPage</code> JSON-LD, and in <a href="/llms.txt">llms.txt</a>.</p>

      <div class="nd-acc" style="margin-top:22px">
        <details>
          <summary>The facts, in full${svg('chevron', { size: 16, width: 2 })}</summary>
          <div class="a">
            <div class="nd-card" style="padding:22px 24px">
              <div style="font-size:10px;font-weight:700;color:#8E8D86;letter-spacing:0.08em;text-transform:uppercase">One-sentence summary</div>
              <p style="margin:10px 0 0;font-size:16.5px;line-height:1.6;color:var(--ink)">Nudge Invest is a free, offline-first portfolio tracker for Android that keeps stocks, ETFs, funds, REITs, crypto and stablecoins on the user&rsquo;s own device, with no account, no cloud and no ads, and one optional paid feature: an AI Coach that reads only what the user allows.</p>
            </div>
            <dl class="nd-facts">
              ${FACTS.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n              ')}
            </dl>
            <div class="nd-card" style="margin-top:28px;padding:22px 24px">
              <div style="font-size:10px;font-weight:700;color:#8E8D86;letter-spacing:0.08em;text-transform:uppercase">What Nudge Invest does not do</div>
              <ul style="margin:12px 0 0;padding-left:18px;display:flex;flex-direction:column;gap:8px;font-size:15px;line-height:1.6;color:var(--nd-dim)">
                <li>It does not execute trades or connect to a brokerage account.</li>
                <li>It does not give financial advice or recommend securities.</li>
                <li>It does not create an account, a profile, or a cloud backup.</li>
                <li>It does not show ads or sell data.</li>
                <li>It is not available on iOS yet.</li>
              </ul>
            </div>
          </div>
        </details>
      </div>
    </div>
  </section>

  <section id="get" style="position:relative;overflow:hidden">
    <div class="nd-glow" style="left:50%;top:-260px;transform:translateX(-50%);width:900px;height:600px;background:radial-gradient(closest-side,rgba(29,158,117,0.14),rgba(29,158,117,0))"></div>
    <div class="nd-wrap" style="display:flex;flex-direction:column;align-items:center;text-align:center;position:relative">
      <h2 style="margin:0;font-size:clamp(28px,3.4vw,42px);letter-spacing:-0.03em;max-width:19ch">Keep every number on your own device</h2>
      <p style="margin:14px 0 0;font-size:16px;color:var(--nd-dim)">No account. No sign-up. No ads. No cloud.</p>
      ${storeButtons(site, { center: true })}
      <p class="muted small" style="margin:20px 0 0">No account &middot; No cloud &middot; No ads</p>
    </div>
  </section>

  <div class="nd-mark" aria-hidden="true">
    <div><span class="a">NUDGE</span><span class="b">INVEST</span></div>
  </div>

  <div class="nd-toast" id="nd-toast" role="status">${svg('info', { size: 15, width: 2 })}iOS is coming soon. Android is available now.</div>
</div>

<script>
(function () {
  var toast = document.getElementById('nd-toast');
  var timers = [];
  function clear() { timers.forEach(clearTimeout); timers = []; }
  document.querySelectorAll('.nd-store[data-ios]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      clear();
      document.querySelectorAll('.nd-store[data-ios]').forEach(function (b) { b.classList.remove('is-soon'); });
      btn.classList.add('is-soon');
      toast.classList.add('on');
      timers.push(setTimeout(function () { btn.classList.remove('is-soon'); }, 2000));
      timers.push(setTimeout(function () { toast.classList.remove('on'); }, 2400));
    });
  });
  // One open panel at a time, matching the design's single-open accordion.
  document.querySelectorAll('#faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      document.querySelectorAll('#faq details').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
</script>
`;

  return {
    meta: {
      path: '/',
      title: 'Nudge Invest — Private, Offline Portfolio Tracker for Android',
      ogTitle: 'Nudge Invest — the private, offline portfolio tracker',
      description:
        'Free offline portfolio tracker for stocks, ETFs, crypto and dividends. No account, no cloud, no ads. Cost basis, P&L, ROI and net worth stay on your phone.',
      crumbTitle: 'Home',
      priority: '1.0',
      changefreq: 'weekly',
      schema: [FAQ.schema],
    },
    body,
  };
};
