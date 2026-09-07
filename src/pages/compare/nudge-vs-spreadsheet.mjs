import { article, ctaBand, compareTable, faq } from '../../lib/ui.mjs';

export default (site) => {
  const meta = {
    path: '/compare/nudge-vs-spreadsheet/',
    title: 'Nudge Invest vs a spreadsheet for tracking your portfolio',
    h1: 'Nudge Invest vs a spreadsheet',
    crumbTitle: 'Nudge vs spreadsheet',
    description: 'A spreadsheet is the honest baseline. What Nudge Invest adds — correct cost basis, dividends, custody, mobile — and when to keep the sheet.',
    datePublished: '2026-09-07',
    priority: '0.7',
  };

  const FAQ = faq(
    [
      { q: 'Can I keep using my spreadsheet alongside Nudge Invest?', a: `<p>Yes. Nudge exports the whole portfolio as CSV at any time, so the spreadsheet can stay your analysis layer while Nudge is the ledger you actually keep up to date on the phone.</p>` },
      { q: 'Is a Google Sheet private?', a: `<p>A Google Sheet lives in your Google account on Google's servers. That is a very different privacy model from Nudge Invest, where the data never leaves the phone. A local Excel file is closer to Nudge — but it is not on your phone when you need it.</p>` },
      { q: 'Can Nudge Invest do everything my spreadsheet does?', a: `<p>No, and it doesn't try. A spreadsheet is infinitely flexible; Nudge is opinionated. If you rely on custom models, scenario tabs or a specific tax calculation, keep the sheet and feed it from Nudge's CSV.</p>` },
    ],
    { heading: 'Nudge vs spreadsheet — common questions' },
  );

  const body = `
<div class="tldr"><strong>In one sentence:</strong> a spreadsheet gives you total flexibility and (if it's a local file) total privacy, at the cost of doing every calculation and every data entry yourself, on a screen that isn't your phone; Nudge Invest gives you correct cost basis, dividend and custody tracking out of the box, offline on the phone, and hands you a CSV whenever you want the spreadsheet back.</div>

<h2>The spreadsheet is a good tool. Here is where it breaks.</h2>
<p>Most people who track a portfolio seriously started in a spreadsheet, and the spreadsheet did the job — until one of four things happened.</p>
<ol>
  <li><strong>DRIP.</strong> A reinvested dividend is income <em>and</em> a purchase at that day's price. Modelling that correctly in a sheet means a second table, a lookup, and a formula that half the internet gets wrong. Get it wrong and your cost basis, share count and ROI are all off.</li>
  <li><strong>A second currency.</strong> One EUR ETF in a USD portfolio means an FX column, a rate you have to update, and a conversion in every total. Two currencies means the sheet is now mostly FX plumbing.</li>
  <li><strong>Fees and partial sells.</strong> Cost basis after selling a third of a position, fees included on both sides, realised versus unrealised — every one of these is a formula that has to be right forever.</li>
  <li><strong>You are not at your desk.</strong> The trade happened on your phone. The sheet is on your laptop. You'll “add it later”. You won't.</li>
</ol>

<h2>What Nudge Invest does that the sheet makes you do</h2>
<ul>
  <li><strong>Cost basis, average price, realised and unrealised P&amp;L</strong> computed from the transaction log, fees included, every time.</li>
  <li><strong>Dividends and DRIP</strong> as transaction types, with dividend income by asset and year and ROI both with and without dividends. <a href="/guides/drip-cost-basis/">How DRIP cost basis works →</a></li>
  <li><strong>Multi-currency</strong> with an exchange-rate table you control; stale rates are flagged.</li>
  <li><strong>Custody</strong> on every transaction — broker, exchange or wallet — with an allocation view by place.</li>
  <li><strong>Duplicate-aware import</strong> so re-importing a statement can't double-count.</li>
  <li><strong>It's on the phone</strong>, offline, with a PIN lock. The trade gets logged when it happens.</li>
</ul>

<h2>What the spreadsheet does that Nudge doesn't</h2>
<ul>
  <li><strong>Anything you can imagine.</strong> Custom models, scenario tabs, Monte Carlo, your own tax logic. Nudge is a ledger with fixed, well-tested metrics.</li>
  <li><strong>Automatic quotes.</strong> <code>GOOGLEFINANCE()</code> in Sheets is free and live. Nudge refreshes prices only on request, via the optional AI coach.</li>
  <li><strong>Big-screen review.</strong> Sorting, filtering and charting across a whole history is more comfortable at a desk.</li>
</ul>

<h2>Side by side</h2>
${compareTable(
  ['Nudge Invest', 'Google Sheets', 'Local Excel'],
  [
    ['Private (data stays with you)', true, false, true],
    ['On your phone, offline', true, '~App, needs sync', false],
    ['Correct cost basis with fees & partial sells', true, '~If your formulas are right', '~If your formulas are right'],
    ['DRIP as income + buy', true, '~Manual', '~Manual'],
    ['Multi-currency conversion', true, '~GOOGLEFINANCE + formulas', '~Manual'],
    ['Custody / “where held” view', true, '~Extra column', '~Extra column'],
    ['Duplicate-safe import', true, false, false],
    ['Live prices', '~Opt-in', true, '~Add-ins'],
    ['Custom models', false, true, true],
    ['Cost', 'Free', 'Free', 'Office licence'],
  ],
)}

<h2>The honest recommendation</h2>
<p><strong>Keep the spreadsheet if</strong> your edge is a model you built and you genuinely maintain it. <strong>Switch to Nudge Invest if</strong> the spreadsheet has become a chore you avoid, if DRIP or a second currency has started to make it lie, or if you simply want the record on your phone where the trades happen.</p>
<div class="callout"><p>The realistic path for most people: Nudge as the ledger, a CSV export into the sheet once a quarter for the analysis you enjoy.</p></div>
`;

  const A = article(site, meta, body, { crumbTrail: [{ name: 'Compare', path: '/compare/' }] });
  return { meta: { ...meta, schema: [A.schema, FAQ.schema] }, body: A.html + FAQ.html + ctaBand(site) };
};
