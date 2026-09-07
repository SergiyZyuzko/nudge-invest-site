import { ctaBand, faq } from '../lib/ui.mjs';

export default (site) => {
  const FAQ = faq(
    [
      { q: 'Does Nudge Invest fetch live prices?', a: `<p>Not automatically — by default you enter or update prices yourself, which is what keeps the app fully offline. If you enable the AI coach and switch on <em>Live price refresh</em> in AI privacy, you can ask the coach to fetch current quotes (crypto via CoinGecko, stocks and ETFs via Twelve Data) and it proposes the updates for your approval.</p>` },
      { q: 'Can I track cash?', a: `<p>Yes — add a stablecoin or a cash-like holding and it flows into net worth and allocation like anything else.</p>` },
      { q: 'How many currencies can a portfolio mix?', a: `<p>As many as you hold. Each asset has its own currency; the portfolio is displayed in the currency you pick, converted with exchange rates you enter and control. Rates older than 30 days are flagged as stale.</p>` },
    ],
    { heading: 'Feature questions' },
  );

  const F = (title, text) => `<div class="card"><h3>${title}</h3><p>${text}</p></div>`;

  const body = `
<div class="article-head"><div class="wrap">
  <h1>Features</h1>
  <p class="lede">Everything the tracker does, and exactly what the optional AI coach adds. The tracker is free; nothing on this page except the coach costs money.</p>
</div></div>

<section style="padding-top:8px"><div class="wrap">
  <h2>Track</h2>
  <div class="grid grid-3">
    ${F('Every asset type', 'Stocks, ETFs and index funds, REITs, cryptocurrencies and stablecoins. One list, one net worth number.')}
    ${F('Buy, Sell, Dividend, DRIP', 'Four transaction types with fees. DRIP is modelled correctly as both income and a purchase, so reinvested cost basis is right.')}
    ${F('Where it is held', 'Every transaction records its custody — broker, exchange or wallet — so you can see concentration on any one platform.')}
    ${F('Multi-currency', 'Assets in USD, EUR, GBP, UAH, anything. Display in one currency using exchange rates you enter; stale rates are flagged after 30 days.')}
    ${F('Notes', 'Free-text notes on any transaction — “staking reward”, “tax lot 2”. Notes are private by default and never sent to the AI coach unless you allow it.')}
    ${F('Daily snapshots', 'The app records a daily portfolio value so the history chart reflects what your portfolio was actually worth, not a back-calculation.')}
  </div>
</div></section>

<section><div class="wrap">
  <h2>Understand</h2>
  <div class="grid grid-3">
    ${F('Cost basis & average price', 'Per asset and in aggregate, fees included. The number that decides whether a sale is a gain or a loss.')}
    ${F('Realised & unrealised P&amp;L', 'What you have banked versus what is still on the table, side by side.')}
    ${F('ROI — with and without dividends', 'Two ROI figures, because for an income portfolio the second one is the honest one.')}
    ${F('Dividend income', 'By asset, this year and all time. See what the portfolio actually pays you.')}
    ${F('Allocation', 'Donut by asset type or by custody; a P&amp;L bar chart per asset; top and bottom performers.')}
    ${F('Value history', 'Invested amount and portfolio value over time, on one chart, in your display currency.')}
  </div>
</div></section>

<section><div class="wrap">
  <h2>Own your data</h2>
  <div class="grid grid-3">
    ${F('Offline-first, on-device', 'Everything is stored in a local SQLite database on the phone. No account, no cloud sync, no background uploads, no telemetry by default.')}
    ${F('CSV import & export', 'Export the entire portfolio as CSV whenever you like. Import CSV from anywhere, with a duplicate-aware preview so re-importing never double-counts.')}
    ${F('App lock', '4-digit PIN as the base credential, optional fingerprint / face unlock on top, idle auto-lock. Never biometric-only.')}
    ${F('No ads', 'The free tracker has no ads and no “upgrade” nags in the data. The only paid surface is the coach tab.')}
    ${F('Wipe in one tap', 'Settings → Wipe all data removes everything locally. There is no server copy to chase.')}
    ${F('Tablets & foldables', 'Rotates and resizes properly on large screens.')}
  </div>
</div></section>

<section><div class="wrap">
  <div class="grid grid-2" style="align-items:center">
    <div>
      <h2>Optional AI coach</h2>
      <p class="lede">A private analyst for your own numbers. Paid, optional, and gated by per-category privacy switches.</p>
      <ul class="muted">
        <li><strong>Ask anything about your portfolio</strong> — concentration, income, what changed, what a metric means.</li>
        <li><strong>Import statements</strong> from PDF, Excel, CSV or a screenshot. The coach proposes transactions; nothing is saved until you approve.</li>
        <li><strong>Refresh prices and exchange rates</strong> on request (opt-in), again as proposals you approve.</li>
        <li><strong>Web search</strong> for public facts like inflation — off by default.</li>
        <li><strong>You choose what it sees.</strong> Totals, per-asset metrics, transactions and notes each have their own switch.</li>
      </ul>
      <p class="muted small">Educational and analytical only. The coach cannot trade, cannot move money, and does not give personalised investment advice.</p>
      <p><a class="btn btn-ghost" href="/pricing/">Pricing</a></p>
    </div>
    <div><img src="/shots/06-settings.png" width="585" height="1170" loading="lazy" alt="AI privacy toggles in Settings" style="max-width:340px;margin:0 auto;border-radius:24px;border:1px solid var(--line)"></div>
  </div>
</div></section>

${FAQ.html}
${ctaBand(site)}
`;

  return {
    meta: {
      path: '/features/',
      title: 'Features — Nudge Invest portfolio tracker',
      crumbTitle: 'Features',
      description: 'Every Nudge Invest feature: cost basis, P&L, ROI, dividend and DRIP tracking, multi-currency net worth, CSV import/export, app lock, AI coach.',
      priority: '0.8',
      schema: [FAQ.schema],
    },
    body,
  };
};
