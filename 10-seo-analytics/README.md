# 10 — SEO & Analytics

## Mission

Implement everything that makes the site discoverable and measurable: structured data, sitemaps, Open Graph and Twitter cards, robots, canonical URLs, redirects from the old site, and analytics + error tracking.

## Why this matters

The current site has years of accrued backlinks. Losing that traffic is the single biggest risk of a rebuild. Strong SEO baselines plus a comprehensive redirect map preserve it.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md`
3. `/ARCHITECTURE.md` — "SEO" and "Observability" sections
4. `seo-strategy.md`
5. `sitemaps.md`
6. `analytics.md`
7. `redirects.md`

## Deliverables

- `apps/web/app/sitemap.ts` — XML sitemap generator (Next.js native).
- `apps/web/app/robots.ts` — robots.txt.
- `apps/web/app/news/sitemap.xml/route.ts` — news-specific sitemap (Google News).
- A canonical `seo` helper in `lib/seo/index.ts` that builds `Metadata` from a Sanity `seo` object plus per-route fallbacks.
- JSON-LD helpers in `lib/seo/jsonLd.ts` for Organization, Article, Event, VideoObject, Person, BreadcrumbList.
- `vercel.json` redirects for the old WordPress URL patterns (mapping table maintained in `12-content-migration/url-redirect-map.md` and consumed here).
- Vercel Analytics installed.
- Sentry integration (browser + server + edge).
- A `lighthouse-ci` configuration documenting the budget.

## Acceptance criteria

- [ ] `/sitemap.xml` includes every public route with proper `lastmod` from Sanity `_updatedAt`.
- [ ] `/robots.txt` allows public routes, disallows `/account`, `/admin`, `/api`, `/sign-in`, `/sign-up`.
- [ ] Every page sets a unique title and description.
- [ ] Open Graph image renders: home, a post, an event, a biography, a talk.
- [ ] JSON-LD validates in Google's Rich Results Test for: home (Organization), a news article (Article), an event (Event), a talk (VideoObject), a biography (Person), any deep page (BreadcrumbList).
- [ ] All redirects from the URL map respond 301 with the correct destination.
- [ ] Sentry captures a deliberate test error from the browser and the server.
- [ ] Vercel Analytics shows traffic in the dashboard.

## Out of scope

- Editorial SEO (writing meta descriptions per article — that's the editor's job, with the schema's `seo` fields).
- Marketing campaigns / paid acquisition.
- A/B testing infrastructure.

## Dependencies

| Folder | What we need |
| --- | --- |
| All page-owning folders | Their routes must exist before they can be in the sitemap |
| `12-content-migration` | The redirect-map source of truth |

## Open questions

- Do we want Google Tag Manager, or only direct Vercel Analytics + Sentry? Default: **direct only**. GTM is overkill and adds to client JS.
- Do we want a cookie banner? Default: **no**, because we use no tracking that legally requires one (Vercel Analytics is privacy-respecting and consentless in the EU). Reconsider only if marketing pixels are added.

## Suggested agent prompt

> You are implementing SEO, sitemaps, structured data, redirects, and analytics for the Society of Catholic Scientists website rebuild.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/ARCHITECTURE.md`
> 4. Every `.md` in `/Catholic Scientist Project/10-seo-analytics/`.
> 5. `/Catholic Scientist Project/12-content-migration/url-redirect-map.md` once it exists.
>
> **Your job.** Sitemap, robots, OG, JSON-LD helpers, redirects, Vercel Analytics, Sentry. Confirm rich-results validation across every content type.
>
> **Acceptance.** All sitemaps render, every JSON-LD type validates against Google's tool, every redirect works.
