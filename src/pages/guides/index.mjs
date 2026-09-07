import { ctaBand } from '../../lib/ui.mjs';

export default (site) => {
  const body = `
<div class="article-head"><div class="wrap">
  <h1>Guides</h1>
  <p class="lede">Practical, tool-agnostic explanations of the parts of portfolio tracking people get wrong — dividends, DRIP, cost basis, multi-broker net worth, and why offline matters. Each one shows how Nudge Invest handles it.</p>
</div></div>
<section style="padding-top:8px"><div class="wrap list-cards">
  <div class="grid grid-2">
    <a class="card" href="/guides/track-dividends/"><h3>How to track dividend income across brokers</h3><p>Why dividends belong in the transaction log, how to record them, and how to read income per asset and per year.</p><span class="more">Read the guide →</span></a>
    <a class="card" href="/guides/drip-cost-basis/"><h3>How DRIP affects your cost basis</h3><p>A reinvested dividend is income and a purchase. A worked example, the formula, and the mistake most spreadsheets make.</p><span class="more">Read the guide →</span></a>
    <a class="card" href="/guides/multi-broker-net-worth/"><h3>One net worth number across brokers, exchanges and wallets</h3><p>How to consolidate holdings in different currencies and custodians without a cloud aggregator — including CSV import.</p><span class="more">Read the guide →</span></a>
    <a class="card" href="/guides/offline-portfolio-tracker/"><h3>What an offline-first portfolio tracker is, and why it matters</h3><p>The threat model behind account-based trackers, what “offline-first” actually guarantees, and the trade-offs.</p><span class="more">Read the guide →</span></a>
  </div>
</div></section>
${ctaBand(site)}
`;
  return {
    meta: {
      path: '/guides/',
      title: 'Guides — dividends, DRIP, cost basis, net worth',
      crumbTitle: 'Guides',
      description: 'Practical guides to tracking a portfolio privately: dividends, DRIP cost basis, multi-broker net worth, and why offline-first matters.',
      priority: '0.8',
    },
    body,
  };
};
