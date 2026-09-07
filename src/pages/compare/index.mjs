import { ctaBand, compareTable } from '../../lib/ui.mjs';

export default (site) => {
  const body = `
<div class="article-head"><div class="wrap">
  <h1>Nudge Invest compared</h1>
  <p class="lede">Honest, feature-by-feature comparisons with the tools people usually consider instead. Where another product does something better, the page says so.</p>
</div></div>

<section style="padding-top:8px"><div class="wrap">
  ${compareTable(
    ['Nudge Invest', 'Delta', 'Sharesight', 'Spreadsheet'],
    [
      ['Account required', false, true, true, '~Google Sheets: yes'],
      ['Data stored on device only', true, false, false, '~Excel: yes · Sheets: no'],
      ['Free tier', 'Full tracker, no ads', '~With ads', '~Up to 10 holdings', true],
      ['Stocks & ETFs', true, true, true, '~Manual'],
      ['Crypto', true, true, '~Limited', '~Manual'],
      ['Dividend tracking', true, '~Basic', 'Excellent (incl. tax reports)', '~Manual'],
      ['DRIP as income + buy', true, false, true, '~Manual'],
      ['Custody (broker/exchange/wallet) view', true, '~Per-connection', '~Per-portfolio', '~Manual'],
      ['Multi-currency, own FX rates', true, '~Auto rates', '~Auto rates', '~GOOGLEFINANCE'],
      ['Automatic live prices', '~Opt-in, via AI coach', true, true, '~GOOGLEFINANCE'],
      ['Broker auto-sync', false, true, true, false],
      ['CSV import / export', 'Both', '~Import', 'Both', 'Both'],
      ['Statement import (PDF / Excel / screenshot)', 'Via AI coach', false, '~Some brokers', false],
      ['Tax reporting', false, false, 'Yes (AU/NZ/UK/CA/US)', '~Manual'],
      ['Ads', false, '~Free tier', false, false],
    ],
  )}
  <p class="muted small" style="margin-top:12px">Other products' features are summarised from their public documentation and may change. Corrections welcome at <a href="mailto:${site.supportEmail}">${site.supportEmail}</a>.</p>
</div></section>

<section><div class="wrap list-cards">
  <div class="grid grid-3">
    <a class="card" href="/compare/nudge-vs-delta/"><h3>Nudge Invest vs Delta</h3><p>Delta syncs everything to the cloud and links your exchanges. Nudge keeps it on the phone. Which trade-off suits you.</p><span class="more">Read the comparison →</span></a>
    <a class="card" href="/compare/nudge-vs-sharesight/"><h3>Nudge Invest vs Sharesight</h3><p>Sharesight is the tax-reporting heavyweight. Nudge is the private, mobile-first tracker. Very different tools.</p><span class="more">Read the comparison →</span></a>
    <a class="card" href="/compare/nudge-vs-spreadsheet/"><h3>Nudge Invest vs a spreadsheet</h3><p>The spreadsheet is the honest baseline. What you gain, what you give up, and when to keep the spreadsheet.</p><span class="more">Read the comparison →</span></a>
  </div>
</div></section>

${ctaBand(site)}
`;
  return {
    meta: {
      path: '/compare/',
      title: 'Compare — Nudge Invest vs Delta, Sharesight and spreadsheets',
      crumbTitle: 'Compare',
      description: 'Side-by-side comparison of Nudge Invest with Delta, Sharesight and a spreadsheet: privacy, pricing, dividends, multi-currency, imports and live prices.',
      priority: '0.8',
    },
    body,
  };
};
