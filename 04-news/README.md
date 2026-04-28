# 04 — News & Announcements

## Mission

Build the news subsystem: the index with pagination and category filtering, the article detail pages, the RSS feed, and the structured-data integration so news articles appear correctly in Google News / aggregators.

## Why this matters

The Society publishes regularly: chapter announcements, conference news, statements, member achievements. The current site's news is hard to scan and lacks RSS. A well-structured news layer is the most-visited surface after the home page.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md` (rows for `/news*`)
3. `/DESIGN_PRINCIPLES.md`
4. `01-design-system/component-library.md` (`PostCard`, `Pagination`, `Prose`)
5. `02-cms-schema/content-models.md` (`post`, `category`)
6. `02-cms-schema/groq-queries.md`
7. `index-page.md`
8. `detail-page.md`
9. `rss-feeds.md`

## Deliverables

- `apps/web/app/news/page.tsx` — index with pagination + filtering.
- `apps/web/app/news/[slug]/page.tsx` — article page.
- `apps/web/app/news/category/[slug]/page.tsx` — filtered index.
- `apps/web/app/news/feed.xml/route.ts` — RSS feed.
- `apps/web/app/news/sitemap.xml/route.ts` — news-only sitemap (for Google News).
- Components in `apps/web/components/news/` for any compositions not generic enough to live in `01-design-system`.
- `generateMetadata` and `generateStaticParams` everywhere.
- `Article` JSON-LD on detail pages.
- `loading.tsx`, `error.tsx`, `not-found.tsx` per route.
- E2E test: index loads → click article → renders correctly.

## Acceptance criteria

- [ ] Index paginates server-side via `?page=` URL param.
- [ ] Category filter (`/news/category/[slug]`) renders the same UI with filtered data.
- [ ] Article page includes author, date, reading time, related posts, share buttons.
- [ ] `Article` JSON-LD validates in [Schema.org validator].
- [ ] RSS feed validates in [W3C feed validator].
- [ ] Lighthouse perf ≥ 95 on the index and on a representative article.
- [ ] axe-core clean.

## Out of scope

- Newsletter sending (deferred).
- Comments / reactions (not in v1).
- Editorial workflow inside Sanity — covered by `02-cms-schema/editorial-workflow.md`.

## Dependencies

| Folder | What we need |
| --- | --- |
| `00-foundation` | Repo, tooling |
| `01-design-system` | `PostCard`, `Prose`, `Pagination`, `Picture` |
| `02-cms-schema` | `post`, `category`, `person` schemas + GROQ queries |

## Open questions

- Do we want **search inside news** specifically, or rely on global search? Default: global only — owned by `09-search-discovery`.

## Suggested agent prompt

> You are implementing the news subsystem for the Society of Catholic Scientists website rebuild.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/DESIGN_PRINCIPLES.md`
> 3. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 4. `/Catholic Scientist Project/01-design-system/`
> 5. `/Catholic Scientist Project/02-cms-schema/`
> 6. Every `.md` in `/Catholic Scientist Project/04-news/`.
>
> **Your job.** Implement the index, detail, category, RSS, and news-sitemap routes. Use the canonical GROQ queries from `lib/sanity/queries.ts` (extending only if necessary, with new queries added back to that file). Add `Article` JSON-LD on detail pages. Wire pagination via URL params for shareability.
>
> **Acceptance.** All routes implemented, RSS validates, JSON-LD validates, perf ≥ 95.
