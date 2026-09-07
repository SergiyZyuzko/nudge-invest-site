import { article, ctaBand, faq } from '../../lib/ui.mjs';

export default (site) => {
  const meta = {
    path: '/guides/multi-broker-net-worth/',
    title: 'One net worth number across brokers, exchanges and wallets',
    h1: 'One net worth number across brokers, exchanges and wallets',
    crumbTitle: 'Multi-broker net worth',
    description: 'How to consolidate holdings across brokers, crypto exchanges and wallets — in several currencies — into one net worth figure, no cloud aggregator.',
    datePublished: '2026-09-07',
    priority: '0.7',
  };

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Consolidate a multi-broker portfolio into one net worth number',
    description: meta.description,
    step: [
      { '@type': 'HowToStep', name: 'List every custodian', text: 'Write down each broker, exchange and wallet that holds anything. These become the custody labels.' },
      { '@type': 'HowToStep', name: 'Add holdings in their own currency', text: 'Add each asset in the currency it trades in, tagged with where it is held.' },
      { '@type': 'HowToStep', name: 'Set exchange rates', text: 'Enter a rate for each currency pair you hold against your display currency. Refresh them when they matter.' },
      { '@type': 'HowToStep', name: 'Import history', text: 'Export each custodian\'s transaction history as CSV and import it; use the duplicate preview to avoid double counting.' },
      { '@type': 'HowToStep', name: 'Read allocation by place', text: 'Use the “Held at” allocation view to see concentration on any one platform.' },
    ],
  };

  const FAQ = faq(
    [
      { q: 'Why not just use an aggregator that connects to all my accounts?', a: `<p>Aggregators are convenient, and they require you to hand a third party read access to every account plus a copy of everything in them. For many people that is an acceptable trade; for others it isn't. A manual/CSV-based tracker like Nudge Invest gives you the consolidated view without the credential-sharing.</p>` },
      { q: 'How often do I need to update exchange rates?', a: `<p>As often as the precision matters to you. Nudge flags a rate as stale after 30 days. For a long-term portfolio, monthly is plenty; with the AI coach you can also ask for a refresh from a live source on demand.</p>` },
      { q: 'How do I track the same ETF held at two brokers?', a: `<p>Add it once per custodian. Portfolio totals consolidate the two, while the allocation-by-place view and the asset list keep the split visible.</p>` },
    ],
    { heading: 'Consolidation questions' },
  );

  const body = `
<div class="tldr"><strong>The short version:</strong> a real net worth number needs every custodian, every currency and every asset class in one ledger, converted with rates you trust. You don't need a cloud aggregator for that — you need consistent custody labels, an exchange-rate table, and a CSV import that can't double-count. That is the whole method, and it takes an afternoon the first time and minutes after.</div>

<h2>The problem</h2>
<p>A typical investor today has a broker for stocks and ETFs, maybe a second broker for a pension or a different market, an exchange or two for crypto, a hardware wallet, and some stablecoins parked somewhere earning yield. Four to six places, two or three currencies. Each app shows its own slice; none shows the whole.</p>
<p>The usual answers are a cloud aggregator (hand over credentials, get a dashboard) or a spreadsheet (do it all yourself, on a laptop). <strong>The middle path is a local ledger with custody tracking and multi-currency built in.</strong></p>

<h2>Step by step</h2>
<h3>1. Name your custodians</h3>
<p>Nudge Invest tracks <em>where</em> each transaction happened as a custody: a <strong>broker</strong>, an <strong>exchange</strong>, or a <strong>wallet</strong>, with a label (“IBKR”, “Kraken”, “Ledger”). Decide on your labels up front and reuse them exactly — that's what makes the allocation-by-place view meaningful.</p>

<h3>2. Add each asset in its own currency</h3>
<p>A EUR-denominated ETF is added in EUR; a US stock in USD; BTC in USD or EUR depending on how you bought it. <strong>Never convert by hand when entering.</strong> Enter what the statement says, in the currency the statement uses.</p>

<h3>3. Build the exchange-rate table</h3>
<p>Pick a display currency for the portfolio total. Enter one rate for each other currency you hold against it. Nudge stores one row per pair, uses the inverse automatically, and marks rates older than 30 days as stale so you know when the total is approximate. With the optional AI coach you can ask for a refresh from a live source and approve the new rates.</p>

<h3>4. Import the history</h3>
<p>Every broker and exchange exports transactions as CSV. Nudge's CSV import takes one file at a time, shows a <strong>duplicate-aware preview</strong> (rows matching an existing transaction on date, asset, type, quantity and price are flagged, not silently added), and only writes what you confirm. Export from Nudge once first — the header row of that file is the exact format to match. For messy statements, the AI coach can read a PDF, Excel file or screenshot and propose rows.</p>

<h3>5. Read the result</h3>
<ul>
  <li><strong>Net worth</strong> in your display currency, across everything.</li>
  <li><strong>Allocation by asset type</strong> — stocks vs funds vs crypto vs stablecoins.</li>
  <li><strong>Allocation by place</strong> — how much sits at each custodian. If one exchange holds 40% of your net worth, this is where you find out.</li>
  <li><strong>Per-asset metrics</strong> consolidated across custodians, with the split still visible.</li>
</ul>

<h2>Mistakes that make the number wrong</h2>
<ul>
  <li><strong>Inconsistent custody labels</strong> (“Kraken” and “kraken”) split one venue into two.</li>
  <li><strong>Converting at entry.</strong> You lose the original amount and can never re-convert at a better rate.</li>
  <li><strong>Forgetting the stablecoins.</strong> They're cash. Leaving them out understates net worth and misstates allocation.</li>
  <li><strong>Re-importing without dedup.</strong> The classic spreadsheet failure: the same quarter imported twice. Nudge's preview exists for this.</li>
  <li><strong>Trusting one FX feed blindly.</strong> If the number matters, know what rate produced it. That's why Nudge lets you own the table.</li>
</ul>
<div class="callout"><p>All of this happens on the phone. No custodian credentials leave your possession, and no server holds the consolidated picture — which, for a document that lists everything you own, is not a small thing.</p></div>
`;

  const A = article(site, meta, body, { crumbTrail: [{ name: 'Guides', path: '/guides/' }] });
  return { meta: { ...meta, schema: [A.schema, howTo, FAQ.schema] }, body: A.html + FAQ.html + ctaBand(site) };
};
