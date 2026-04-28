# 03 — Core Pages

## Mission

Build the editorial backbone of the site: the home page, the About hub (mission, leadership, FAQ, statutes), the Catholic Scientists of the Past index and detail pages, the Ideas & Discussions index and detail pages, the Chapters directory and detail pages.

## Why this matters

These are the pages a first-time visitor lands on. They carry the brand. If they feel modern, scholarly, and trustworthy, the rest of the site has a runway. If they feel template-y, every other page inherits the doubt.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md` — full document (this folder owns the rows starting `/`, `/about*`, `/scientists-of-the-past*`, `/ideas*`, `/chapters*`)
3. `/DESIGN_PRINCIPLES.md`
4. `01-design-system/README.md` and the block library
5. `02-cms-schema/content-models.md`
6. `home.md`
7. `about-hub.md`
8. `scientists-of-the-past.md`
9. `ideas.md`
10. `chapters.md`

## Deliverables

- `apps/web/app/page.tsx` — home, composed of CMS blocks.
- `apps/web/app/about/page.tsx`, `apps/web/app/about/mission/page.tsx`, `apps/web/app/about/leadership/page.tsx`, `apps/web/app/about/faq/page.tsx`, `apps/web/app/about/statutes/page.tsx`.
- `apps/web/app/scientists-of-the-past/page.tsx` and `[slug]/page.tsx`.
- `apps/web/app/ideas/page.tsx` and `[slug]/page.tsx`.
- `apps/web/app/chapters/page.tsx`, `[slug]/page.tsx`, `start/page.tsx`.
- `apps/web/components/blocks/_blockRenderer.tsx` (if not delivered by `01-design-system` already).
- `apps/web/components/marketing/` — page-specific compositions not generic enough to be primitives or blocks.
- `generateMetadata` for every route.
- `generateStaticParams` for every dynamic route.
- Empty/loading/error states (`loading.tsx`, `error.tsx`, `not-found.tsx`) for each route.

## Acceptance criteria

- [ ] Every route in the IA owned by this folder is implemented and renders from Sanity.
- [ ] Home page is fully block-driven; no hard-coded content.
- [ ] Each page has unique, sensible `<title>`, `<meta description>`, and OG image.
- [ ] Every page is a Server Component by default; client islands isolated.
- [ ] Lighthouse perf ≥ 95 on home and a representative biography.
- [ ] axe-core clean on every route.
- [ ] Breadcrumbs present on detail pages, with `BreadcrumbList` JSON-LD.
- [ ] All images via `Picture` (delivered by `01-design-system`).
- [ ] An e2e Playwright test visits home, About, a biography, an idea, and a chapter, asserting no console errors.

## Out of scope

- News (lives in `04-news`).
- Events (`05-events`).
- Conferences and lectures (`06-conferences`).
- Membership and member portal (`07-membership`).
- Donations (`08-donations`).
- Site search (`09-search-discovery`) — this folder uses Sanity directly, no search wiring.

## Dependencies

| Folder | What we need from it |
| --- | --- |
| `00-foundation` | Repo + tooling |
| `01-design-system` | All primitives + the block library |
| `02-cms-schema` | All the content types this folder reads from |

## Open questions

- Leadership page: do we need bios that link to `person` documents, or a single page with embedded biographies? Default: linked individual pages, with the index showing role + headshot + short title.

## Suggested agent prompt

> You are implementing the editorial pages for the Society of Catholic Scientists website rebuild. Home, About hub, Scientists of the Past, Ideas, Chapters. Next.js 14 App Router, Server Components by default, content from Sanity.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/DESIGN_PRINCIPLES.md`
> 3. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 4. `/Catholic Scientist Project/01-design-system/` (every file)
> 5. `/Catholic Scientist Project/02-cms-schema/` (every file)
> 6. Every `.md` file in `/Catholic Scientist Project/03-core-pages/`.
>
> **Your job.** Implement every route owned by this folder per the IA. Compose pages from the block library. Wire every page to Sanity via the canonical queries in `lib/sanity/queries.ts`. `generateMetadata` and `generateStaticParams` everywhere. Don't reinvent components — if you need something not in `01-design-system`, file an issue rather than building it locally.
>
> **Acceptance.** All routes render, Lighthouse perf ≥ 95 on representative pages, axe-core clean, e2e test green.
>
> **When you finish,** post the route inventory you implemented, screenshots of home + a biography + a chapter, and any blocks/components you needed but couldn't find.
