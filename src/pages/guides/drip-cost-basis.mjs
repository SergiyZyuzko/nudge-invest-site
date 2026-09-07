import { article, ctaBand, faq } from '../../lib/ui.mjs';

export default (site) => {
  const meta = {
    path: '/guides/drip-cost-basis/',
    title: 'How DRIP affects cost basis — worked example and formula',
    h1: 'How DRIP affects your cost basis',
    crumbTitle: 'DRIP cost basis',
    description: 'A reinvested dividend is both income and a purchase. A worked example of how DRIP changes share count, cost basis, average price and ROI.',
    datePublished: '2026-09-07',
    priority: '0.7',
  };

  const FAQ = faq(
    [
      { q: 'Does DRIP increase my cost basis?', a: `<p>Yes. Each reinvestment buys shares at that day's price, and those shares are added to cost basis at what they cost — the dividend amount. Over years of reinvesting, a large share of your cost basis can be reinvested dividends rather than cash you deposited.</p>` },
      { q: 'Is a reinvested dividend still taxable income?', a: `<p>In most jurisdictions, yes — a DRIP is treated as if you received the cash and immediately bought shares. That is exactly why Nudge Invest records DRIP as income <em>and</em> a buy. Check your local rules.</p>` },
      { q: 'What is the difference between “cash invested” and “cost basis” after DRIP?', a: `<p>Cash invested is the money you personally put in. Cost basis includes reinvested dividends too. After years of DRIP, cost basis is higher than cash invested; the gap is income you never saw as cash.</p>` },
    ],
    { heading: 'DRIP questions' },
  );

  const body = `
<div class="tldr"><strong>The short version:</strong> a DRIP transaction is a dividend you were paid <em>and</em> a purchase you made with it, on the same day, at that day's price. Record it as one event of type DRIP with the shares received and the price. Cost basis goes up by the dividend amount, share count goes up by the shares received, average price moves toward that day's price, and dividend income goes up by the dividend amount. Miss any one of those and your ROI is wrong.</div>

<h2>What a DRIP actually is</h2>
<p>A Dividend Reinvestment Plan takes the cash dividend you're owed and buys more shares (often fractional) instead of paying it out. Economically, two things happened: <strong>you received income</strong>, and <strong>you bought shares</strong>. Most tracking mistakes come from recording only one of them.</p>
<ul>
  <li>Record only the buy → your cost basis is right but your dividend income is missing, so “ROI including dividends” is understated and the position looks like it never paid you.</li>
  <li>Record only the dividend → income is right but share count and cost basis are wrong, so your unrealised P&amp;L and average price are fiction.</li>
</ul>

<h2>A worked example</h2>
<p>You buy 100 shares of an ETF at $50 (ignore fees for a moment).</p>
<div class="table-wrap"><table>
<thead><tr><th>Event</th><th>Shares</th><th>Cost basis</th><th>Average price</th><th>Dividend income</th></tr></thead>
<tbody>
<tr><th scope="row">Buy 100 @ $50</th><td>100</td><td>$5,000</td><td>$50.00</td><td>$0</td></tr>
<tr><th scope="row">DRIP: $60 dividend reinvested @ $55 → 1.0909 sh</th><td>101.0909</td><td>$5,060</td><td>$50.05</td><td>$60</td></tr>
<tr><th scope="row">DRIP: $62 dividend reinvested @ $48 → 1.2917 sh</th><td>102.3826</td><td>$5,122</td><td>$50.03</td><td>$122</td></tr>
</tbody></table></div>
<p>Notice three things:</p>
<ol>
  <li><strong>Cost basis rose by exactly the dividends</strong> ($5,000 → $5,122), even though you deposited nothing new. Your <em>cash invested</em> is still $5,000.</li>
  <li><strong>Average price moved toward each reinvestment price</strong> — up after the $55 buy, down after the $48 buy. That's dollar-cost averaging happening automatically.</li>
  <li><strong>Dividend income is $122</strong>, and that $122 is also sitting inside cost basis as shares. Nothing is double-counted: income is one measure, cost basis is another.</li>
</ol>
<p>If the ETF is now $52: market value is 102.3826 × $52 = $5,323.90. Unrealised P&amp;L is $5,323.90 − $5,122 = <strong>+$201.90</strong> (3.9% on cost basis). ROI on cash invested including dividends is ($5,323.90 − $5,000) / $5,000 = <strong>+6.5%</strong>. Both numbers are true; they answer different questions.</p>

<h2>The formulas</h2>
<p>For a position with transactions <em>t</em>:</p>
<ul>
  <li><strong>Shares held</strong> = Σ shares bought (Buy + DRIP) − Σ shares sold</li>
  <li><strong>Cost basis</strong> = Σ (shares × price + fee) over Buy and DRIP, reduced proportionally when shares are sold</li>
  <li><strong>Average price</strong> = cost basis ÷ shares held</li>
  <li><strong>Dividend income</strong> = Σ Dividend amounts + Σ DRIP amounts (the DRIP amount is shares × price)</li>
  <li><strong>Unrealised P&amp;L</strong> = shares held × current price − cost basis</li>
  <li><strong>ROI incl. dividends</strong> = (market value + dividends taken as cash + realised P&amp;L − cash invested) ÷ cash invested</li>
</ul>

<h2>Where spreadsheets go wrong</h2>
<ul>
  <li><strong>Treating DRIP as a plain buy</strong> with money from nowhere. Income vanishes.</li>
  <li><strong>Adjusting average price by hand</strong> after each reinvestment. One typo and every later figure is off.</li>
  <li><strong>Fractional shares.</strong> DRIP almost always produces fractions; a sheet that rounds to whole shares drifts a little every quarter.</li>
  <li><strong>Return of capital distributions.</strong> Not income; they reduce cost basis. If your fund does this, your statement will say so — record the income part only.</li>
</ul>

<h2>How Nudge Invest records it</h2>
<p>Add a transaction, choose <strong>DRIP</strong>, enter the shares received and the price per share. That single entry updates share count, cost basis, average price, dividend income, and both ROI figures. Nothing else to maintain. If your broker's statement lists reinvestments, import it as CSV or let the AI coach read the PDF and propose the DRIP rows for your approval.</p>
<div class="callout"><p>Under the hood: in Nudge's metrics, <code>Buy</code> and <code>DRIP</code> both add to bought quantity and cost basis (fees increase net cost); <code>Dividend</code> and <code>DRIP</code> both add to dividend income. That's the whole model, and it's unit-tested.</p></div>
`;

  const A = article(site, meta, body, { crumbTrail: [{ name: 'Guides', path: '/guides/' }] });
  return { meta: { ...meta, schema: [A.schema, FAQ.schema] }, body: A.html + FAQ.html + ctaBand(site) };
};
