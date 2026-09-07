import { article, ctaBand, compareTable, faq } from '../../lib/ui.mjs';

export default (site) => {
  const meta = {
    path: '/compare/nudge-vs-sharesight/',
    title: 'Nudge Invest vs Sharesight: private tracker vs tax reports',
    h1: 'Nudge Invest vs Sharesight',
    crumbTitle: 'Nudge vs Sharesight',
    description: 'Sharesight is a web-based portfolio and tax reporting service; Nudge Invest is a private, offline Android tracker. What each does well and who each is for.',
    datePublished: '2026-09-07',
    priority: '0.7',
  };

  const FAQ = faq(
    [
      { q: 'Does Nudge Invest produce tax reports like Sharesight?', a: `<p>No. Nudge Invest tracks cost basis, realised and unrealised P&amp;L and dividend income, which is the raw material for tax — but it does not generate jurisdiction-specific tax reports. Sharesight's capital gains and dividend tax reports (AU, NZ, UK, CA, US) are its core strength.</p>` },
      { q: 'Is Sharesight free?', a: `<p>Sharesight has a free plan limited to a small number of holdings, then paid tiers. Nudge Invest's tracker has no holding limit and no ads; only its optional AI coach is paid.</p>` },
      { q: 'Can I move from Sharesight to Nudge Invest?', a: `<p>Export your trades from Sharesight as CSV, map the columns to Nudge's <a href="/guides/multi-broker-net-worth/">CSV format</a>, and import. The duplicate-aware preview shows exactly what will be added before anything is written.</p>` },
    ],
    { heading: 'Nudge vs Sharesight — common questions' },
  );

  const body = `
<div class="tldr"><strong>In one sentence:</strong> Sharesight is a paid, web-first accounting and tax-reporting service for investors who need capital-gains and dividend reports for a specific tax jurisdiction; Nudge Invest is a free, private, mobile-first tracker for investors who want to see what they own and what it has earned without a subscription or an account.</div>

<h2>They solve different problems</h2>
<p><strong>Sharesight</strong> started as a tax tool for Australian and New Zealand investors and grew into a full portfolio accounting service. Its distinguishing features are jurisdiction-aware tax reports (capital gains, dividend income with franking credits, foreign income), broker email/CSV imports, benchmark comparisons and performance attribution. It is a web application with a companion app, and it requires an account because the reports are computed server-side.</p>
<p><strong>Nudge Invest</strong> is a personal ledger. It answers “what do I own, what did I pay, what is it worth, what has it paid me, and where is it kept?” — on the phone, offline, with no account. It deliberately does not attempt tax reports, because doing that honestly means encoding one jurisdiction's rules, and Nudge's users span many.</p>

<h2>Where Sharesight is stronger</h2>
<ul>
  <li><strong>Tax reporting.</strong> Capital gains (with lot selection methods), dividend income and foreign tax credit reports for AU, NZ, UK, CA and US. Nothing in Nudge does this.</li>
  <li><strong>Performance attribution.</strong> Annualised returns, benchmark comparison and the split between price return and income.</li>
  <li><strong>Broker imports at scale.</strong> Email-forwarded trade confirmations and many broker CSV templates.</li>
  <li><strong>Web interface.</strong> Large-screen work with reports and exports is more comfortable in a browser.</li>
</ul>

<h2>Where Nudge Invest is stronger</h2>
<ul>
  <li><strong>Privacy.</strong> Sharesight holds your full trade history on its servers under your account. Nudge holds nothing.</li>
  <li><strong>Cost.</strong> Unlimited holdings free, no ads. Sharesight's free plan caps holdings; meaningful use is a subscription.</li>
  <li><strong>Crypto and custody.</strong> Crypto, stablecoins and self-custody wallets are first-class in Nudge, alongside the broker/exchange/wallet view. Sharesight is stocks-first.</li>
  <li><strong>Mobile-first, offline.</strong> Nudge is built for the phone in your pocket, with no connection needed.</li>
  <li><strong>Statement import via AI.</strong> A PDF, Excel file or screenshot of a statement becomes proposed transactions you approve — no template mapping.</li>
</ul>

<h2>Feature by feature</h2>
${compareTable(
  ['Nudge Invest', 'Sharesight'],
  [
    ['Account required', false, true],
    ['Where data lives', 'On your phone', 'Sharesight servers'],
    ['Free plan', 'Full tracker, unlimited', '~Limited holdings'],
    ['Tax reports (CGT, dividends)', false, 'Yes — AU/NZ/UK/CA/US'],
    ['Performance vs benchmark', false, true],
    ['Dividend income tracking', true, true],
    ['DRIP handling', true, true],
    ['Crypto & stablecoins', true, '~Limited'],
    ['Custody (broker/exchange/wallet) view', true, '~Per portfolio'],
    ['Own FX rates', true, false],
    ['Broker auto-import', false, true],
    ['CSV import / export', 'Both', 'Both'],
    ['Statement import via PDF/Excel/screenshot', true, '~Email/CSV templates'],
    ['Platforms', 'Android', 'Web, iOS, Android'],
  ],
)}
<p class="muted small">Sharesight features summarised from public documentation as of ${meta.datePublished}; they may change.</p>

<h2>Who should pick which</h2>
<p><strong>Pick Sharesight</strong> if you file taxes in one of its supported countries and want your capital-gains and dividend reports generated for you. That is worth a subscription.</p>
<p><strong>Pick Nudge Invest</strong> if you want a private, free, always-available record of a multi-asset, multi-currency portfolio — and you either do your own tax or hand your accountant a CSV.</p>
<div class="callout"><p>Many people use both: Nudge as the private day-to-day tracker on the phone, Sharesight once a year for the tax report, fed by Nudge's CSV export.</p></div>
`;

  const A = article(site, meta, body, { crumbTrail: [{ name: 'Compare', path: '/compare/' }] });
  return { meta: { ...meta, schema: [A.schema, FAQ.schema] }, body: A.html + FAQ.html + ctaBand(site) };
};
