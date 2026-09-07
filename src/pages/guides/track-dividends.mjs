import { article, ctaBand, faq } from '../../lib/ui.mjs';

export default (site) => {
  const meta = {
    path: '/guides/track-dividends/',
    title: 'How to track dividend income across brokers (2026 guide)',
    h1: 'How to track dividend income across brokers',
    crumbTitle: 'Track dividends',
    description: 'How to track dividend income across several brokers: what to record, income per asset and per year, and how ROI including dividends is computed.',
    datePublished: '2026-09-07',
    priority: '0.7',
  };

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Track dividend income across brokers in Nudge Invest',
    description: meta.description,
    totalTime: 'PT10M',
    step: [
      { '@type': 'HowToStep', name: 'Add each holding once', text: 'Add every dividend-paying asset with its currency and where it is held (broker, exchange or wallet).' },
      { '@type': 'HowToStep', name: 'Log each dividend as a transaction', text: 'For a cash dividend, add a Dividend transaction with the amount received. For a reinvested dividend, add a DRIP transaction with the shares bought and the price.' },
      { '@type': 'HowToStep', name: 'Read income per asset and per year', text: 'The Portfolio screen shows dividends this year and all-time; each asset shows its own dividend total and ROI including dividends.' },
      { '@type': 'HowToStep', name: 'Import instead of typing', text: 'Import a CSV of dividend payments, or attach a broker statement (PDF, Excel or screenshot) for the AI coach to propose the transactions.' },
    ],
  };

  const FAQ = faq(
    [
      { q: 'Should dividends count towards ROI?', a: `<p>Both numbers are useful, so show both. Plain ROI (price return) tells you how the asset's value moved; ROI including dividends tells you what the position actually earned you. For an income portfolio the second is the honest figure — a stock that fell 5% but paid 7% made money.</p>` },
      { q: 'How do I handle dividends paid in a different currency?', a: `<p>Record the dividend in the asset's currency. The tracker converts to your display currency using your exchange-rate table, so a EUR dividend shows correctly in a USD-denominated portfolio total.</p>` },
      { q: 'What about withholding tax on dividends?', a: `<p>Record the net amount you actually received, and put the gross and the tax in the note if you need it for filing. Nudge Invest is a tracker, not a tax engine; keep the tax detail where your accountant will look for it.</p>` },
    ],
    { heading: 'Dividend tracking questions' },
  );

  const body = `
<div class="tldr"><strong>The short version:</strong> treat every dividend as a transaction — <em>Dividend</em> for cash, <em>DRIP</em> for reinvested — in the same log as your buys and sells. Do that and income per asset, income per year and “ROI including dividends” fall out automatically. The mistake is keeping dividends in a separate tab (or not at all) and then wondering why your portfolio “return” ignores the money it paid you.</div>

<h2>Why dividends belong in the transaction log</h2>
<p>A portfolio has two returns: what the assets are worth now versus what you paid (price return), and what they paid you along the way (income). Most trackers and most spreadsheets are good at the first and vague about the second. That vagueness is expensive if you hold ETFs, REITs or dividend stocks — for those, income can be most of the return.</p>
<p><strong>Dividend income is only accurate if it is recorded at the same granularity as trades: one event, one asset, one date, one amount.</strong> Then any question — “what did VOO pay me this year?”, “what's my income yield across all brokers?” — is a sum over the log rather than a guess.</p>

<h2>Step by step</h2>
<h3>1. Add each holding once, with its custody</h3>
<p>Add the asset with its currency and where it's held. If you own the same ETF at two brokers, add it twice with different custody — Nudge consolidates them in the portfolio view but keeps the custody split visible. This matters for dividends because different brokers pay on different dates and sometimes withhold differently.</p>

<h3>2. Record a cash dividend</h3>
<p>Add a <strong>Dividend</strong> transaction: date, asset, amount received. Quantity stays zero — you didn't buy anything. It counts toward <em>dividend income</em> and <em>ROI including dividends</em>, and nothing else changes.</p>

<h3>3. Record a reinvested dividend (DRIP)</h3>
<p>Add a <strong>DRIP</strong> transaction: date, asset, the shares purchased and the price per share. Nudge counts it as <em>both</em> income (the dividend you were paid) and a buy (the shares you now own at that price). That keeps your share count, cost basis and average price correct. <a href="/guides/drip-cost-basis/">The DRIP cost-basis guide</a> walks through the arithmetic.</p>

<h3>4. Read the numbers</h3>
<ul>
  <li><strong>Portfolio → Dividends this year / all-time.</strong> Total income across every broker, in your display currency.</li>
  <li><strong>Asset detail → Dividends and ROI incl. dividends.</strong> Per holding.</li>
  <li><strong>Transactions → filter Dividend / DRIP.</strong> The audit trail, by date, with notes.</li>
</ul>

<h3>5. Stop typing: import</h3>
<p>Most brokers export a dividend or activity statement. Import it as CSV — the duplicate-aware preview shows exactly which rows are new — or, with the AI coach, attach the PDF, Excel file or a screenshot and approve the transactions it proposes. A year of dividends across three brokers is a ten-minute job.</p>

<h2>What to watch for</h2>
<ul>
  <li><strong>Ex-dividend vs pay date.</strong> Record the pay date — the day the money arrived. That's what your statements and your tax return use.</li>
  <li><strong>Foreign dividends.</strong> Record in the asset's currency; let the FX table convert. Don't convert by hand at some remembered rate.</li>
  <li><strong>Return of capital.</strong> Some REIT and fund distributions are partly return of capital rather than income. If your statement splits them, record the income part as Dividend and note the rest — return of capital technically reduces cost basis, which Nudge does not model; your tax software will.</li>
  <li><strong>Accumulating ETFs.</strong> They reinvest internally and pay nothing out. Nothing to record — the return shows up in price.</li>
</ul>

<div class="callout"><p><strong>Rule of thumb:</strong> if money hit your account, it's a Dividend; if shares hit your account instead of money, it's a DRIP; if neither happened, there's nothing to record.</p></div>
`;

  const A = article(site, meta, body, { crumbTrail: [{ name: 'Guides', path: '/guides/' }] });
  return { meta: { ...meta, schema: [A.schema, howTo, FAQ.schema] }, body: A.html + FAQ.html + ctaBand(site) };
};
