# Chapters (`/chapters/*`)

## Routes

- `/chapters` — directory + map
- `/chapters/[slug]` — chapter detail
- `/chapters/start` — "Start a chapter" CMS page

## Directory page

Two views, switchable: **Map** (default on desktop) and **List** (default on mobile).

- Map: `Map` primitive (lazy MapLibre), markers for every `chapter`. Click marker → side panel with chapter summary + link to detail page.
- List: alphabetical by country, grouped by region. Each row: chapter name, city/region, coordinator name.

Filter by region (Americas, Europe, Asia, Oceania, Africa) and by partner institution.

## Detail page

1. Breadcrumb
2. Chapter name (display) + region + country
3. Map (small, just this chapter's location)
4. Coordinator block (name, headshot, contact email link)
5. Description (`Prose` body)
6. Recent events (queries `event` where `host == this chapter`, last 5 + next 5)
7. Partner institutions logo cloud
8. CTA: "Get involved with the [name] chapter" → mailto coordinator

## Start a chapter

CMS page (`page` document with slug `chapters/start`). Block-driven. Should culminate in a `CalloutBlock` linking to a contact form (server action that emails the SCS team).

## Improvements over the current site

- **Real map.** Communicates international scope at a glance.
- **Per-chapter pages.** Currently chapters are buried in a single page; each chapter deserves its own URL and identity.
- **Recent events on the chapter page.** Surfaces activity, not just existence.
- **Coordinator visible.** First-class person, not a footnote.
