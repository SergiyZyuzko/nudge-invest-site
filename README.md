# nudge-invest-site

Marketing site for **Nudge Invest** — the private, offline portfolio tracker for Android.

Static HTML, zero dependencies, built by one Node script, deployed to GitHub Pages on every push to `main`.

## Layout

```
site.config.json      ← the ONE place the domain, prices, links and version live
build.mjs             ← wraps every page in the shared shell; emits sitemap/robots/llms.txt/CNAME
src/styles.css        ← inlined into every page (single request per page)
src/lib/ui.mjs        ← shared fragments: FAQ (+ FAQPage schema), article shell (+ Article schema), compare tables
src/pages/**/*.mjs    ← one module per page: `export default (site) => ({ meta, body })`
src/static/           ← copied into dist/ as-is (icons, screenshots, og/)
tools/og.html         ← Open Graph card; tools/render-og.mjs renders it
```

## Commands

```bash
node build.mjs           # build → dist/ (also validates titles, descriptions, internal links)
node build.mjs --check   # validate only
npm run serve            # build + serve dist/ on :8090
node tools/render-og.mjs # regenerate src/static/og/default.png (needs ../nudge-invest for the CDP helper)
```

## Changing the domain

Edit `domain` and `baseUrl` in `site.config.json`. Canonicals, OG URLs, JSON-LD `@id`s, `sitemap.xml`, `llms.txt` and the `CNAME` file all follow. Then point DNS at GitHub Pages:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  sergiyzyuzko.github.io
```

and set the custom domain in the repo's **Settings → Pages** (enable *Enforce HTTPS* once the certificate issues).

**Live on `https://nudgeinvest.app` since 2026-09-12.** Registrar Spaceship, DNS in Spaceship's own nameservers: four apex `A` records to GitHub Pages (`185.199.108-111.153`) plus `www` `CNAME` -> `sergiyzyuzko.github.io`. Spaceship's panel has no `ALIAS`/`ANAME` type, so the apex is pinned to IPs — if GitHub ever renumbers its edge, these four records are what breaks. The repo variable `SITE_BASE_URL=https://nudgeinvest.app` drives the build; `build.mjs` emits `CNAME` automatically whenever the base URL is the custom domain, which is what sets the domain on Pages. `github.io` now 301s to the apex, and `www` 301s to the apex. Certificate covers both names. **Note:** `.app` is HSTS-preloaded, so there is no HTTP fallback — if the certificate ever lapses the site is unreachable, not merely insecure.

## SEO / GEO conventions

- Every page: one `<h1>`, a ≤62-char `<title>`, a 70–160-char description, canonical, OG/Twitter tags, `BreadcrumbList`. The build fails if any of these are off.
- Site-wide JSON-LD: `MobileApplication` (with offers), `Organization`, `WebSite`. Guides add `Article` + `HowTo`; FAQ sections add `FAQPage` generated from the *same* items that render, so markup can never drift from content.
- Every section opens with a complete, quotable sentence ("Nudge Invest is …") before any marketing copy — that's what gets cited by AI engines.
- `/llms.txt` is generated from the page list and carries a "facts that are safe to cite" block.
- AI crawlers are explicitly allowed in `robots.txt`.

## Refreshing screenshots

Screenshots come from the app repo's capture rig (`../nudge-invest/scripts/capture-screenshots.mjs`), resized to 585px wide:

```bash
for f in ../nudge-invest/build/screenshots/raw/0*.png; do
  sips --resampleWidth 585 "$f" --out src/static/shots/$(basename "$f")
done
node tools/render-og.mjs
```

## Search Console

The github.io property is verified two ways — `src/static/google3a20395304e6f416.html` (HTML-file method) and the `googleSiteVerification` meta tag emitted from `site.config.json`. Don't delete either. Sitemap: `/sitemap.xml` (submitted 2026-09-07). After the custom domain is live, add it as a Domain property in Search Console; the meta tag verifies it automatically.

## IndexNow

Bing/Yandex/Seznam/Naver get told about new pages via IndexNow — the key is `indexNowKey` in `site.config.json`, hosted as `src/static/<key>.txt`. Ping after a deploy:

```bash
node tools/indexnow.mjs
```
