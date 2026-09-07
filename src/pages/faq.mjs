import { ctaBand, faq } from '../lib/ui.mjs';

/**
 * The FAQ is the page most likely to be quoted by an AI engine, so each answer
 * opens with a complete sentence that stands alone out of context.
 */
export default (site) => {
  const p = site.pricing;
  const FAQ = faq(
    [
      { q: 'What is Nudge Invest?', a: `<p>Nudge Invest is a private, offline-first portfolio tracker for Android. It tracks stocks, ETFs, funds, REITs, crypto and stablecoins across multiple brokers, exchanges and wallets, in multiple currencies, and stores all of it on the phone rather than in a cloud account.</p>` },
      { q: 'Is Nudge Invest free?', a: `<p>The tracker is free with no ads and no limits. The optional AI coach costs $${p.monthly}/month, $${p.yearly}/year (with a ${p.trialDays}-day free trial) or $${p.dayPass} for a 24-hour Day Pass.</p>` },
      { q: 'Does Nudge Invest need an account or login?', a: `<p>No. There is no sign-up, email or password. Data is stored locally on the device.</p>` },
      { q: 'Does Nudge Invest work offline?', a: `<p>Yes, fully. The only network features are the optional AI coach and optional price/exchange-rate refresh, both off by default.</p>` },
      { q: 'Where is my data stored?', a: `<p>In a local database (SQLite via WatermelonDB) inside the app on your phone. It is not uploaded to any server unless you enable the AI coach and choose which categories it may read.</p>` },
      { q: 'Does Nudge Invest connect to my broker?', a: `<p>No. Nudge Invest never asks for brokerage credentials and has no Plaid-style aggregation. You add transactions manually, import a CSV, or let the AI coach read a statement you attach.</p>` },
      { q: 'What assets does Nudge Invest support?', a: `<p>Stocks, ETFs, index funds, REITs, cryptocurrencies and stablecoins, each in its own currency and held at a broker, exchange or wallet you name.</p>` },
      { q: 'How does Nudge Invest calculate cost basis?', a: `<p>Cost basis is the sum of what you paid for the shares you still hold, including fees on buys. Average buy price is cost basis divided by quantity. A Sell reduces the position; DRIP adds shares at the reinvestment price and is also counted as dividend income.</p>` },
      { q: 'Does Nudge Invest track dividends?', a: `<p>Yes. Dividend and DRIP transactions feed dividend income (per asset, this year and all-time) and an “ROI including dividends” figure alongside plain ROI.</p>` },
      { q: 'Can I import my transactions?', a: `<p>Yes — via CSV import with a duplicate-aware preview, or via the AI coach, which can read a PDF, Excel file, CSV or screenshot of a statement and propose transactions for your approval.</p>` },
      { q: 'Can I export my data?', a: `<p>Yes. Settings → Export CSV writes every asset and transaction to a CSV file you can save or share.</p>` },
      { q: 'What does the AI coach send off my phone?', a: `<p>Only the categories you switch on in Settings → AI privacy — portfolio totals, per-asset metrics, transactions, and (off by default) free-text notes — plus any file or screenshot you attach in the chat. Requests go through the developer's proxy to Anthropic's API. Price refresh sends only ticker symbols to CoinGecko / Twelve Data.</p>` },
      { q: 'Does the AI coach give investment advice?', a: `<p>No. It is educational and analytical: it explains your own numbers and concepts in plain language. It does not recommend what to buy or sell, cannot trade and cannot move money.</p>` },
      { q: 'Is there an iPhone version?', a: `<p>Not yet. Nudge Invest is on Google Play for Android. The codebase is cross-platform and iOS is planned, without a date.</p>` },
      { q: 'How do I lock the app?', a: `<p>Settings → App lock sets a 4-digit PIN; you can add fingerprint or face unlock on top and choose an idle auto-lock time. If you forget the PIN, recovery wipes local data (there is no server copy).</p>` },
      { q: 'Who makes Nudge Invest?', a: `<p>${site.operator} — an independent developer, ${site.operatorPerson}. Contact: <a href="mailto:${site.supportEmail}">${site.supportEmail}</a>.</p>` },
    ],
    { heading: 'Frequently asked questions' },
  );

  const body = `
<div class="article-head"><div class="wrap">
  <h1>Nudge Invest FAQ</h1>
  <p class="lede">Straight answers about privacy, pricing, what the app tracks, and what the AI coach can and cannot do.</p>
</div></div>
${FAQ.html}
${ctaBand(site)}
`;

  return {
    meta: {
      path: '/faq/',
      title: 'FAQ — Nudge Invest offline portfolio tracker',
      crumbTitle: 'FAQ',
      description: 'Is Nudge Invest free, does it work offline, where is data stored, which assets it tracks, how DRIP is handled, and what the AI coach sends.',
      priority: '0.8',
      changefreq: 'monthly',
      schema: [FAQ.schema],
    },
    body,
  };
};
