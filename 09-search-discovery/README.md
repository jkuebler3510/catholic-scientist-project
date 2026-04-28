# 09 — Search & Discovery

## Mission

Build a unified search across every public content surface — news, events, conferences, talks, biographies, ideas, chapters, FAQ — and the cross-cutting tag/category infrastructure that powers filtering throughout the site.

## Why this matters

The current site has no search. With years of news, dozens of conferences, hundreds of talks, and a growing biography archive, search is what turns a content site into a research tool.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md`
3. `/ARCHITECTURE.md` — "Search layer" section
4. `01-design-system/component-library.md` — `Input`, `Dialog`
5. `02-cms-schema/groq-queries.md`
6. `search-architecture.md`
7. `taxonomy.md`
8. `ui-patterns.md`

## Deliverables

- `apps/web/app/api/search/route.ts` — search endpoint with query, type filter, pagination.
- `apps/web/components/search/SearchDialog.tsx` (client) — global ⌘K search dialog wired into the header.
- `apps/web/app/search/page.tsx` — full search results page (for share-of-link traffic and SEO indexing? actually no — `noindex` because we don't want low-content search pages indexed).
- A canonical `searchClient` in `lib/search/client.ts` with a typed interface that v1 implements via Sanity GROQ and a future Algolia/Typesense backend can drop in behind.
- Tag pages: `/topics/[slug]` listing all content (news, talks, ideas, scientists) tagged with that topic.
- E2E test: ⌘K opens dialog, typing yields results, Enter navigates.

## Acceptance criteria

- [ ] Global ⌘K (and `/`) keyboard shortcut opens the search dialog from any page.
- [ ] Results are grouped by content type, with "See all" links per group.
- [ ] Server-side search works without JS (the `/search` page).
- [ ] Topic pages render the cross-content list, sorted by recency.
- [ ] Search latency p95 < 250ms.
- [ ] Results respect editorial visibility: drafts and unpublished content excluded.
- [ ] axe-core clean on the dialog and topic pages.

## Out of scope

- Algolia/Typesense onboarding (the v1 implementation uses GROQ; the interface is abstracted so we can swap later).
- Full-text search of the Postgres `members` directory — owned by `07-membership` (uses Postgres FTS directly).
- Searching within Portable Text body — defer; v1 searches title + excerpt + summary fields.

## Dependencies

| Folder | What we need |
| --- | --- |
| `01-design-system` | `Input`, `Dialog`, `Badge`, `Heading` |
| `02-cms-schema` | All searchable types, plus a `category` taxonomy |
| `03`–`06` | The pages search results link to |

## Open questions

- Which fields per type are weighted highest? Default: title (1.0), summary/excerpt (0.6), category names (0.4). Documented in `search-architecture.md`.
- Should we cache search results? Default: no — Sanity CDN is fast and queries are cheap. Re-evaluate if p95 climbs.

## Suggested agent prompt

> You are implementing the search and topic-discovery infrastructure for the Society of Catholic Scientists website rebuild.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 4. `/Catholic Scientist Project/01-design-system/component-library.md`
> 5. `/Catholic Scientist Project/02-cms-schema/groq-queries.md`
> 6. Every `.md` in `/Catholic Scientist Project/09-search-discovery/`.
>
> **Your job.** Implement the `searchClient` interface, the Sanity-backed v1 implementation, the global `SearchDialog`, the `/search` server-rendered fallback, and the topic pages. Wire the keyboard shortcut and ensure the dialog works without focus-trap regressions.
>
> **Acceptance.** All routes implemented, p95 < 250ms in production, dialog is keyboard-perfect, topic pages cover the expected content types.
