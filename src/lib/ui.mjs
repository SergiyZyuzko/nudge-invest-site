/**
 * Shared page fragments. Each returns HTML (and, where relevant, the JSON-LD
 * that must accompany it) so pages stay declarative and schema never drifts
 * from the visible content — Google penalises FAQ/HowTo markup that doesn't
 * match what's on the page.
 */

/** Effective origin (+ base path) — CI may override the config domain until DNS is live. */
export const baseUrl = (site) => (process.env.SITE_BASE_URL || site.baseUrl).replace(/\/$/, '');

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Strip HTML for schema text fields (they must be plain). */
export const plain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** FAQ block + matching FAQPage schema. `items`: [{ q, a }] with `a` as HTML. */
export function faq(items, { heading = 'Frequently asked questions', id = 'faq' } = {}) {
  const html = `
<section id="${id}" class="faq">
  <div class="wrap">
    <div class="section-head"><h2>${esc(heading)}</h2></div>
    ${items
      .map(
        (it) => `<details>
      <summary>${esc(it.q)}</summary>
      <div class="a">${it.a}</div>
    </details>`,
      )
      .join('\n')}
  </div>
</section>`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(it.a) },
    })),
  };
  return { html, schema };
}

/** Closing call-to-action band, used on every page. */
export function ctaBand(site, { title = 'Track your portfolio privately', text } = {}) {
  return `
<section>
  <div class="wrap">
    <div class="band">
      <div>
        <h2>${esc(title)}</h2>
        <p>${text ?? `Free on Android. No account, no cloud, no ads — your data stays on your phone.`}</p>
      </div>
      <a class="btn btn-primary btn-lg" href="${site.playUrl}" rel="noopener">Get it on Google Play</a>
    </div>
  </div>
</section>`;
}

/** Breadcrumb trail rendered above article titles. */
export function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${[{ name: 'Home', path: '/' }, ...items]
    .map((c, i, arr) => (i === arr.length - 1 ? `<span>${esc(c.name)}</span>` : `<a href="${c.path}">${esc(c.name)}</a>`))
    .join(' › ')}</nav>`;
}

/**
 * Article shell for guides and comparisons: header + prose column + Article
 * schema. `body` is the prose HTML; `meta` supplies title/description/dates.
 */
export function article(site, meta, body, { crumbTrail = [], kind = 'Article' } = {}) {
  const html = `
<div class="article-head">
  <div class="wrap">
    ${crumbs([...crumbTrail, { name: meta.crumbTitle ?? meta.title, path: meta.path }])}
    <h1>${esc(meta.h1 ?? meta.title)}</h1>
    <p class="lede">${esc(meta.description)}</p>
    <p class="meta">Updated ${meta.dateModified ?? meta.datePublished} · ${esc(site.operator)}</p>
  </div>
</div>
<section style="padding-top:8px">
  <div class="wrap"><div class="prose">${body}</div></div>
</section>`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': kind,
    headline: meta.h1 ?? meta.title,
    description: meta.description,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
    author: { '@type': 'Organization', name: site.operator, url: baseUrl(site) },
    publisher: { '@id': `${baseUrl(site)}/#org` },
    mainEntityOfPage: `${baseUrl(site)}${meta.path}`,
    about: { '@id': `${baseUrl(site)}/#app` },
  };
  return { html, schema };
}

/** Feature-comparison table. rows: [label, ...cells]; cells: true | false | 'part' | string */
export function compareTable(cols, rows) {
  const cell = (v) => {
    if (v === true) return '<td class="yes">Yes</td>';
    if (v === false) return '<td class="no">No</td>';
    if (typeof v === 'string' && v.startsWith('~')) return `<td class="part">${esc(v.slice(1))}</td>`;
    return `<td>${esc(v)}</td>`;
  };
  return `<div class="table-wrap"><table>
<thead><tr><th scope="col"></th>${cols.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
<tbody>${rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map(cell).join('')}</tr>`).join('\n')}</tbody>
</table></div>`;
}
