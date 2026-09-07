import { article, ctaBand, compareTable, faq } from '../../lib/ui.mjs';

export default (site) => {
  const meta = {
    path: '/compare/nudge-vs-delta/',
    title: 'Nudge Invest vs Delta: private offline tracker vs cloud sync',
    h1: 'Nudge Invest vs Delta',
    crumbTitle: 'Nudge vs Delta',
    description: 'Delta syncs your portfolio to the cloud and links exchanges; Nudge Invest keeps everything on your phone with no account. Which tracker fits you.',
    datePublished: '2026-09-07',
    priority: '0.7',
  };

  const FAQ = faq(
    [
      { q: 'Is Nudge Invest a Delta alternative?', a: `<p>Yes, for the core job — tracking stocks, ETFs and crypto in one place — but with the opposite privacy model. Delta is an account-based, cloud-synced tracker with exchange and broker connections; Nudge Invest is offline-first with no account and no server copy of your data.</p>` },
      { q: 'Does Nudge Invest sync across devices like Delta?', a: `<p>No. There is no cloud, so there is no sync. You move data between devices with a CSV export and import. That is the price of having no server hold your portfolio.</p>` },
      { q: 'Is Delta free?', a: `<p>Delta has a free tier (ad-supported, with limits) and a paid Pro subscription. Nudge Invest's tracker is free without ads; only its optional AI coach is paid.</p>` },
    ],
    { heading: 'Nudge vs Delta — common questions' },
  );

  const body = `
<div class="tldr"><strong>In one sentence:</strong> choose Delta if you want automatic exchange connections and cloud sync across devices and are comfortable with an account holding your portfolio; choose Nudge Invest if you want the same asset coverage with nothing stored off your phone, no login, and dividends and custody tracked properly.</div>

<h2>The fundamental difference</h2>
<p><strong>Delta is a cloud service with a mobile app in front of it.</strong> You create an account, connect exchanges or brokers (or enter holdings manually), and Delta stores your portfolio on its servers so it can sync to your other devices, push price alerts and show live valuations. That architecture is what makes it convenient — and it is also what means a company (Delta is owned by eToro) holds a copy of what you own.</p>
<p><strong>Nudge Invest is an app with a database inside it.</strong> There is no account and no server-side portfolio. Everything you enter is stored in SQLite on the phone; the only things that ever leave the device are the specific data categories you enable for the optional AI coach, and ticker symbols if you turn on price refresh. If Nudge's developer disappeared tomorrow, the app would keep working exactly as it does today.</p>

<h2>Where Delta is stronger</h2>
<ul>
  <li><strong>Automatic connections.</strong> Delta links to many exchanges and some brokers, so trades appear without typing. Nudge has no aggregation — you add transactions, import a CSV, or let the AI coach read a statement.</li>
  <li><strong>Live prices everywhere, always.</strong> Delta streams quotes and alerts. Nudge is offline by default; live prices are an opt-in action through the coach.</li>
  <li><strong>Cross-device sync.</strong> Phone, tablet, desktop — one account. Nudge is per-device with CSV to move data.</li>
  <li><strong>iOS.</strong> Delta is on both platforms; Nudge is Android-only today.</li>
</ul>

<h2>Where Nudge Invest is stronger</h2>
<ul>
  <li><strong>Privacy that is structural, not a policy.</strong> No account, no cloud, no telemetry by default, no ad SDK. Nothing to breach or sell.</li>
  <li><strong>Dividends and DRIP as first-class data.</strong> Dividend income by asset and year, ROI with and without dividends, and DRIP modelled as both income and a buy so cost basis stays correct. Delta's dividend handling is comparatively thin.</li>
  <li><strong>Custody view.</strong> Every transaction records where the asset is held, so you can see how much sits on one exchange or in one wallet — useful after every exchange collapse of the last few years.</li>
  <li><strong>Your own exchange rates.</strong> Multi-currency portfolios convert with rates you set (and can refresh on request), rather than whatever a feed says.</li>
  <li><strong>Free means free.</strong> The full tracker has no ads and no holding limits. Only the AI coach is paid.</li>
  <li><strong>Statement import from a screenshot.</strong> With the coach, photograph a broker statement and approve the transactions it proposes.</li>
</ul>

<h2>Feature by feature</h2>
${compareTable(
  ['Nudge Invest', 'Delta'],
  [
    ['Account required', false, true],
    ['Where data lives', 'On your phone', 'Delta / eToro servers'],
    ['Works offline', true, '~Cached only'],
    ['Exchange / broker connections', false, true],
    ['Live prices', '~Opt-in via AI coach', true],
    ['Cross-device sync', false, true],
    ['Stocks, ETFs, crypto', true, true],
    ['Dividend income tracking', true, '~Basic'],
    ['DRIP handled as income + buy', true, false],
    ['Custody (where held) view', true, '~Per connection'],
    ['Own FX rates', true, false],
    ['CSV export', true, '~Limited'],
    ['Statement import via PDF/Excel/screenshot', true, false],
    ['Ads in free tier', false, true],
    ['Platforms', 'Android', 'iOS, Android, web'],
  ],
)}
<p class="muted small">Delta features summarised from public documentation as of ${meta.datePublished}; they may change.</p>

<h2>Who should pick which</h2>
<p><strong>Pick Delta</strong> if you trade often across several exchanges and want it all to appear automatically, with alerts, on every device.</p>
<p><strong>Pick Nudge Invest</strong> if you are a long-term or income investor who wants an honest, private record of what you own and what it's earned — and who would rather type or import a statement than hand a third party your holdings.</p>
<div class="callout"><p>You can also run both: use Delta for live watching, and keep Nudge as the private ledger of record. Nudge's CSV import makes that cheap.</p></div>
`;

  const A = article(site, meta, body, { crumbTrail: [{ name: 'Compare', path: '/compare/' }] });
  return { meta: { ...meta, schema: [A.schema, FAQ.schema] }, body: A.html + FAQ.html + ctaBand(site) };
};
