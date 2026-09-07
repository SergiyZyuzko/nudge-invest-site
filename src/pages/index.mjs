import { faq, ctaBand, compareTable, esc } from '../lib/ui.mjs';

/**
 * Landing page.
 *
 * Written for two readers at once: a person deciding whether to install, and a
 * language model deciding whether to cite. That means every section leads with
 * a plain, complete, quotable sentence ("Nudge Invest is …", "It stores …")
 * before the marketing copy — GEO in practice is just being unambiguous.
 */
export default (site) => {
  const FAQ = faq([
    {
      q: 'Is Nudge Invest really free?',
      a: `<p>Yes. The portfolio tracker — every asset type, every metric, unlimited transactions, CSV import and export, charts, app lock — is free with no ads and no time limit.</p><p>The only paid feature is the optional AI coach: ${site.pricing.currency} ${site.pricing.monthly}/month, ${site.pricing.yearly}/year with a ${site.pricing.trialDays}-day free trial, or a ${site.pricing.dayPass} 24-hour Day Pass. Billing goes through Google Play.</p>`,
    },
    {
      q: 'Does it work offline?',
      a: `<p>Completely. Nudge Invest is offline-first: your holdings, transactions, exchange rates and history live in a local database on your phone and never require a connection. Only two optional actions use the network — asking the AI coach a question, or asking it to refresh prices — and both are off until you turn them on.</p>`,
    },
    {
      q: 'Do I need an account?',
      a: `<p>No. There is no sign-up, no email, no password and no cloud account. Install it and start adding holdings. Because there's no account, there's also nothing to leak: no server holds your portfolio.</p>`,
    },
    {
      q: 'Which assets can I track?',
      a: `<p>Stocks, ETFs and index funds, REITs, cryptocurrencies and stablecoins — in any currency, held at any broker, exchange or self-custody wallet. Cash and stablecoins can be tracked as holdings too, so your net worth number is complete.</p>`,
    },
    {
      q: 'How does it handle dividends and DRIP?',
      a: `<p>Dividends are first-class transactions, not a footnote. Log a <strong>Dividend</strong> and it counts as income; log a <strong>DRIP</strong> (dividend reinvestment) and it counts as both income and a buy, so your cost basis, share count and "ROI including dividends" all stay correct. See the <a href="/guides/track-dividends/">dividend tracking guide</a>.</p>`,
    },
    {
      q: 'Can I import my broker statement?',
      a: `<p>Yes, two ways. Import a CSV directly — with a duplicate-aware preview so re-importing never double-counts. Or, with the AI coach, attach a PDF, Excel file, CSV or even a screenshot of a statement and it will propose the transactions it finds; nothing is saved until you approve.</p>`,
    },
    {
      q: 'What does the AI coach send off my phone?',
      a: `<p>Only what you allow. Settings → AI privacy has a switch for each data category — portfolio totals, per-asset metrics, transactions, free-text notes (off by default), live price refresh, web search (off by default). Anything switched off never leaves the device. The coach is analytical and educational only; it cannot trade and gives no personalised investment advice.</p>`,
    },
    {
      q: 'Is it available on iPhone?',
      a: `<p>Nudge Invest is currently an Android app on Google Play. The codebase is cross-platform, and iOS is planned; there's no date to announce yet.</p>`,
    },
  ]);

  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow"><b>Free on Android</b> · No account · No cloud · No ads</div>
      <h1>The private, offline portfolio tracker for stocks, ETFs, crypto &amp; dividends</h1>
      <p class="lede">Nudge Invest keeps your whole portfolio — every broker, exchange and wallet — in one number, on your own phone. Real cost basis, P&amp;L, ROI and dividend income. Nothing uploaded, ever, unless you ask.</p>
      <div class="cta-row">
        <a class="btn btn-primary btn-lg" href="${site.playUrl}" rel="noopener">Get it on Google Play</a>
        <a class="btn btn-ghost btn-lg" href="/compare/">See how it compares</a>
      </div>
      <div class="trust"><span>Works fully offline</span><span>No sign-up</span><span>CSV in &amp; out</span><span>PIN &amp; biometric lock</span></div>
    </div>
    <div class="hero-shot">
      <img src="/shots/01-portfolio.png" width="585" height="1170" alt="Nudge Invest portfolio screen showing net worth, P&amp;L, ROI and an allocation donut" fetchpriority="high">
    </div>
  </div>
</section>

<section id="what">
  <div class="wrap">
    <div class="section-head">
      <h2>What Nudge Invest is</h2>
      <p><strong>Nudge Invest is a personal investment tracker for Android that stores everything on the device.</strong> You log what you own and what you paid; it tells you what it's worth, what you've made, and where it's kept — without an account, a cloud, or a data broker in the middle.</p>
    </div>
    <div class="grid grid-3">
      <div class="card"><div class="icon">Σ</div><h3>Everything you own, in one number</h3><p>Net worth across every broker, exchange and wallet, converted into the currency you choose with exchange rates you control.</p></div>
      <div class="card"><div class="icon">%</div><h3>The numbers that actually matter</h3><p>Cost basis, average buy price, realised and unrealised P&amp;L, ROI, and ROI including dividends — per asset and for the whole portfolio.</p></div>
      <div class="card"><div class="icon">₪</div><h3>Dividends done properly</h3><p>Dividend income by asset and by year. DRIP counts as both income and a buy, so reinvested cost basis stays right.</p></div>
      <div class="card"><div class="icon">◔</div><h3>Allocation you can act on</h3><p>Allocation by asset type or by custody — see at a glance how much sits on one exchange or in one wallet.</p></div>
      <div class="card"><div class="icon">⇄</div><h3>Your data, portable</h3><p>Import and export CSV at any time. A duplicate-aware preview means re-importing a statement never double-counts.</p></div>
      <div class="card"><div class="icon">🔒</div><h3>Locked and local</h3><p>4-digit PIN, optional biometrics, idle auto-lock. No telemetry by default. Nothing leaves the phone unless you enable it.</p></div>
    </div>
  </div>
</section>

<section id="screens" style="padding-top:0">
  <div class="wrap">
    <div class="shots">
      <img src="/shots/01-portfolio.png" width="585" height="1170" loading="lazy" alt="Portfolio dashboard with net worth and metrics">
      <img src="/shots/02-charts.png" width="585" height="1170" loading="lazy" alt="Unrealised P&amp;L by asset and value history charts">
      <img src="/shots/03-assets.png" width="585" height="1170" loading="lazy" alt="Assets list with cost basis, ROI and custody">
      <img src="/shots/04-transactions.png" width="585" height="1170" loading="lazy" alt="Transactions list with buys, sells, dividends and DRIP">
      <img src="/shots/05-coach.png" width="585" height="1170" loading="lazy" alt="AI coach screen with portfolio insights">
      <img src="/shots/06-settings.png" width="585" height="1170" loading="lazy" alt="Settings with AI privacy toggles and app lock">
    </div>
  </div>
</section>

<section id="offline">
  <div class="wrap">
    <div class="section-head">
      <h2>Why offline-first is the whole point</h2>
      <p>Most portfolio apps are a login in front of a database somebody else runs. Your holdings, your trades and your net worth sit on their servers, tied to your email, and usually to a brokerage connection you had to authorise.</p>
      <p><strong>Nudge Invest does not have a server that stores portfolios.</strong> There is nothing to breach, sell, subpoena or lose when a startup shuts down. Your data is a file on your phone that you can export whenever you like. <a href="/guides/offline-portfolio-tracker/">Read why this matters →</a></p>
    </div>
  </div>
</section>

<section id="coach">
  <div class="wrap">
    <div class="grid grid-2" style="align-items:center">
      <div>
        <h2>An AI coach that reads only what you allow</h2>
        <p class="lede">Ask questions about your own portfolio in plain language — "how concentrated am I in one exchange?", "what did I earn in dividends this year?" — and get answers grounded in your actual numbers.</p>
        <p class="muted">Per-category privacy switches decide exactly what the coach may see. It can import statements from PDF, Excel, CSV or a screenshot, and every proposed transaction waits for your approval. It is educational and analytical only: it cannot trade and gives no personalised investment advice.</p>
        <p><a class="btn btn-ghost" href="/pricing/">See pricing</a></p>
      </div>
      <div><img src="/shots/05-coach.png" width="585" height="1170" loading="lazy" alt="AI coach screen" style="max-width:360px;margin:0 auto;border-radius:24px;border:1px solid var(--line)"></div>
    </div>
  </div>
</section>

<section id="pricing-teaser">
  <div class="wrap">
    <div class="section-head"><h2>Free tracker. Optional coach.</h2><p>The tracker is free, forever, with no ads. The AI coach is the only paid feature.</p></div>
    <div class="plans">
      <div class="plan"><h3>Tracker</h3><div class="price">Free<small> forever</small></div><ul><li>Unlimited assets &amp; transactions</li><li>All metrics &amp; charts</li><li>CSV import / export</li><li>App lock</li></ul><a class="btn btn-ghost" href="${site.playUrl}" rel="noopener">Install</a></div>
      <div class="plan"><h3>Coach · Day Pass</h3><div class="price">$${site.pricing.dayPass}<small> / 24 hours</small></div><ul><li>Full AI coach for a day</li><li>Import a stack of statements</li><li>No renewal</li></ul><a class="btn btn-ghost" href="${site.playUrl}" rel="noopener">Install</a></div>
      <div class="plan featured"><h3>Coach · Yearly</h3><div class="price">$${site.pricing.yearly}<small> / year</small></div><ul><li>${site.pricing.trialDays}-day free trial</li><li>Everything in monthly</li><li>≈ $${(site.pricing.yearly / 12).toFixed(2)}/month</li></ul><a class="btn btn-primary" href="${site.playUrl}" rel="noopener">Start free trial</a></div>
      <div class="plan"><h3>Coach · Monthly</h3><div class="price">$${site.pricing.monthly}<small> / month</small></div><ul><li>Cancel any time</li><li>Statement import</li><li>Live price &amp; FX refresh</li></ul><a class="btn btn-ghost" href="${site.playUrl}" rel="noopener">Install</a></div>
    </div>
  </div>
</section>

<section id="compare">
  <div class="wrap">
    <div class="section-head"><h2>How it compares</h2><p>Most trackers trade your privacy for convenience. Nudge Invest makes the other trade.</p></div>
    ${compareTable(
      ['Nudge Invest', 'Delta', 'Sharesight', 'Spreadsheet'],
      [
        ['Works without an account', true, false, false, true],
        ['Data stays on your device', true, false, false, '~Depends on the app'],
        ['Free core tracker', true, '~Free tier', '~Free up to 10 holdings', true],
        ['Stocks + ETFs + crypto in one', true, true, '~Stocks/ETFs first', '~Manual'],
        ['Dividend & DRIP tracking', true, '~Basic', true, '~Manual'],
        ['Multi-currency with your own FX', true, '~Auto only', '~Auto only', '~Manual'],
        ['CSV import & export', true, '~Import only', true, true],
        ['Statement import via AI (PDF/Excel/screenshot)', true, false, false, false],
        ['Ads', false, '~In free tier', false, false],
      ],
    )}
    <p class="muted small" style="margin-top:12px">Feature availability for other products reflects their public documentation at the time of writing and may change. <a href="/compare/">Detailed comparisons →</a></p>
  </div>
</section>

${FAQ.html}

${ctaBand(site)}
`;

  return {
    meta: {
      path: '/',
      title: 'Nudge Invest — Private, Offline Portfolio Tracker for Android',
      ogTitle: 'Nudge Invest — the private, offline portfolio tracker',
      description: 'Free offline portfolio tracker for stocks, ETFs, crypto and dividends. No account, no cloud, no ads. Cost basis, P&L, ROI and net worth stay on your phone.',
      crumbTitle: 'Home',
      priority: '1.0',
      changefreq: 'weekly',
      schema: [FAQ.schema],
    },
    body,
  };
};
