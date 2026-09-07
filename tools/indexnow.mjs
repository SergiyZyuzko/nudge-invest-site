// Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver share the index).
// Usage: node tools/indexnow.mjs   (reads dist/sitemap.xml — run build.mjs first)
import { readFileSync } from 'node:fs';
const site = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8'));
const base = (process.env.SITE_BASE_URL || site.baseUrl).replace(/\/$/, '');
const host = new URL(base).host;
const xml = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const body = { host, key: site.indexNowKey, keyLocation: `${base}/${site.indexNowKey}.txt`, urlList };
const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`IndexNow → ${res.status} ${res.statusText} (${urlList.length} URLs, key at ${body.keyLocation})`);
if (!res.ok) console.log(await res.text());
