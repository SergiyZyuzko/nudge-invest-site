import { article, ctaBand, faq } from '../../lib/ui.mjs';

export default (site) => {
  const meta = {
    path: '/guides/offline-portfolio-tracker/',
    title: 'What is an offline-first portfolio tracker, and why it matters',
    h1: 'What an offline-first portfolio tracker is — and why it matters',
    crumbTitle: 'Why offline-first',
    description: "Offline-first trackers store holdings on your device, not a company's servers. What that guarantees, the threat model, and the trade-offs.",
    datePublished: '2026-09-07',
    priority: '0.7',
  };

  const FAQ = faq(
    [
      { q: 'What does “offline-first” mean for a portfolio app?', a: `<p>The app's source of truth is a database on your device. It works with no connection, and any network feature is an optional extra layered on top rather than a requirement. Contrast “online-first”, where the phone is a window onto a server that holds the real data.</p>` },
      { q: 'Is an offline portfolio tracker less convenient?', a: `<p>In two specific ways: no automatic broker sync, and no cross-device cloud sync. Everything else — metrics, charts, imports, exports — works the same. Whether that trade is worth it depends on how you feel about a third party holding a complete list of your assets.</p>` },
      { q: "If it's offline, how do I back it up?", a: `<p>Export a CSV and keep it wherever you keep important files. Since there's no server copy, the export is your backup — which also means you, not a vendor, decide where it lives.</p>` },
      { q: 'Does Nudge Invest ever send data anywhere?', a: `<p>Only if you turn on the optional AI coach, and then only the categories you enable (plus any file you attach). Price refresh sends ticker symbols only. Everything is off by default. Full detail is in the <a href="${site.privacyUrl}" rel="noopener">privacy policy</a>.</p>` },
    ],
    { heading: 'Offline-first questions' },
  );

  const body = `
<div class="tldr"><strong>The short version:</strong> an offline-first portfolio tracker keeps the complete record of what you own on your own device, with no account and no server copy. The point isn't working on a plane. The point is that a list of everything you own — brokers, wallets, amounts — is one of the most sensitive documents you have, and most apps store it on someone else's computer under your email address.</div>

<h2>The document you're handing over</h2>
<p>Think about what a portfolio tracker knows once you've set it up properly: every broker and exchange you use, every wallet, how much is in each, what you bought and when, and your total net worth. Combined with the email it's tied to, that is a precise map of your assets and where to find them.</p>
<p><strong>Account-based trackers store that map on their servers.</strong> Usually with good intentions and reasonable security. But it exists there, and things that exist can be breached, subpoenaed, sold as part of an acquisition, monetised in a pivot, or lost when the company shuts down. Several well-known trackers have done at least one of those in the last five years.</p>

<h2>What offline-first actually guarantees</h2>
<p><strong>Offline-first means the device is the source of truth.</strong> Concretely, in Nudge Invest:</p>
<ul>
  <li>Holdings, transactions, exchange rates, snapshots and chat history are stored in a local SQLite database inside the app.</li>
  <li>There is no account, so there is no user record to associate the data with.</li>
  <li>There is no sync server, so there is no second copy.</li>
  <li>There is no analytics or crash-reporting SDK sending telemetry by default.</li>
  <li>Uninstalling the app, or wiping it in Settings, removes the data. Nothing remains to “request deletion” of.</li>
</ul>
<p>The one deliberate exception is the optional AI coach. When you ask it something, the categories of data you have enabled — and only those — are sent through the developer's proxy to the model provider for that request. Free-text notes and web search are off by default. Price refresh sends ticker symbols and nothing about quantities. You can see exactly what's enabled in Settings → AI privacy, and turn it all off.</p>

<h2>What you give up</h2>
<p>Honesty matters here, because the trade is real.</p>
<ul>
  <li><strong>No automatic broker sync.</strong> Transactions are typed, imported from CSV, or read from a statement by the coach. For a long-term investor that's minutes a month; for an active trader it's a chore.</li>
  <li><strong>No cross-device sync.</strong> Your phone is the ledger. Moving to a new phone is a CSV export and import.</li>
  <li><strong>Prices don't update themselves.</strong> You enter them, or ask the coach to fetch them. The app is a ledger of what you own and paid, not a live ticker.</li>
</ul>

<h2>Who this is for</h2>
<p>People who hold across several custodians and want one honest picture without giving anyone the keys. People who have watched an exchange or a fintech disappear and don't want their records to go with it. People who simply think a complete list of their assets is nobody else's business.</p>
<div class="callout"><p>The test for any tracker is simple: if the company behind it vanished tonight, would you still have your data, and would anyone else? With an offline-first app the answers are <em>yes</em> and <em>no</em>. With most others, it's the reverse.</p></div>
`;

  const A = article(site, meta, body, { crumbTrail: [{ name: 'Guides', path: '/guides/' }] });
  return { meta: { ...meta, schema: [A.schema, FAQ.schema] }, body: A.html + FAQ.html + ctaBand(site) };
};
