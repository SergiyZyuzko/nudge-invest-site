import { ctaBand, faq } from '../lib/ui.mjs';

export default (site) => {
  const p = site.pricing;
  const FAQ = faq(
    [
      { q: 'Is there really no catch on the free tracker?', a: `<p>None. It is not a trial, not a “lite” version, and not ad-supported. Unlimited holdings and transactions, every metric and chart, CSV import and export, and app lock are free. The AI coach is the business model.</p>` },
      { q: 'What happens to my data if I stop paying for the coach?', a: `<p>Nothing. Your portfolio lives on your phone and belongs to you; the coach subscription only controls access to the coach tab. Everything you imported with the coach stays.</p>` },
      { q: 'How does the Day Pass work?', a: `<p>A one-time purchase that unlocks the full coach for 24 hours from the moment you buy it. It does not renew. It's designed for the “I have a stack of statements to import” afternoon.</p>` },
      { q: 'How do I cancel?', a: `<p>Subscriptions are billed and managed by Google Play: Play Store → your profile → Payments &amp; subscriptions. Cancelling keeps access until the end of the paid period.</p>` },
      { q: 'Is there a free trial?', a: `<p>The yearly plan includes a ${p.trialDays}-day free trial. The tracker itself needs no trial because it's free.</p>` },
    ],
    { heading: 'Pricing questions' },
  );

  const body = `
<div class="article-head"><div class="wrap">
  <h1>Pricing</h1>
  <p class="lede">The tracker is free, forever, with no ads. The AI coach is the only paid feature, and it's optional.</p>
</div></div>

<section style="padding-top:8px"><div class="wrap">
  <div class="plans">
    <div class="plan">
      <h3>Tracker</h3>
      <div class="price">Free<small> forever</small></div>
      <ul>
        <li>Unlimited assets and transactions</li>
        <li>Stocks, ETFs, REITs, crypto, stablecoins</li>
        <li>Cost basis, P&amp;L, ROI, dividends</li>
        <li>Allocation and history charts</li>
        <li>Multi-currency with your own FX rates</li>
        <li>CSV import &amp; export</li>
        <li>PIN &amp; biometric app lock</li>
        <li>No ads, no account</li>
      </ul>
      <a class="btn btn-ghost" href="${site.playUrl}" rel="noopener">Get it on Google Play</a>
    </div>
    <div class="plan">
      <h3>Coach · Day Pass</h3>
      <div class="price">$${p.dayPass}<small> / 24 hours</small></div>
      <ul>
        <li>Full AI coach for 24 hours</li>
        <li>Statement import (PDF, Excel, CSV, screenshot)</li>
        <li>Price &amp; FX refresh</li>
        <li>One-time — does not renew</li>
      </ul>
      <a class="btn btn-ghost" href="${site.playUrl}" rel="noopener">Get it on Google Play</a>
    </div>
    <div class="plan featured">
      <h3>Coach · Yearly</h3>
      <div class="price">$${p.yearly}<small> / year</small></div>
      <ul>
        <li><strong>${p.trialDays}-day free trial</strong></li>
        <li>Everything in Monthly</li>
        <li>≈ $${(p.yearly / 12).toFixed(2)} per month</li>
        <li>Cancel any time in Google Play</li>
      </ul>
      <a class="btn btn-primary" href="${site.playUrl}" rel="noopener">Start free trial</a>
    </div>
    <div class="plan">
      <h3>Coach · Monthly</h3>
      <div class="price">$${p.monthly}<small> / month</small></div>
      <ul>
        <li>Ask anything about your portfolio</li>
        <li>Statement import</li>
        <li>Price &amp; FX refresh</li>
        <li>Optional web search</li>
        <li>Cancel any time</li>
      </ul>
      <a class="btn btn-ghost" href="${site.playUrl}" rel="noopener">Get it on Google Play</a>
    </div>
  </div>
  <p class="muted small" style="margin-top:16px">Prices in ${p.currency}; Google Play shows your local price. Billing, renewal and cancellation are handled by Google Play. The AI coach is educational and analytical only and gives no personalised investment advice.</p>
</div></section>

${FAQ.html}
${ctaBand(site, { title: 'The tracker is free. Start there.' })}
`;

  return {
    meta: {
      path: '/pricing/',
      title: 'Pricing — Nudge Invest (free tracker, optional AI coach)',
      crumbTitle: 'Pricing',
      description: `Nudge Invest's portfolio tracker is free with no ads. The optional AI coach is $${p.monthly}/month, $${p.yearly}/year with a ${p.trialDays}-day trial, or a $${p.dayPass} 24-hour Day Pass.`,
      priority: '0.7',
      schema: [FAQ.schema],
    },
    body,
  };
};
