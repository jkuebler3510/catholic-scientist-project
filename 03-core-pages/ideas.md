# Ideas & Discussions (`/ideas/*`)

## Routes

- `/ideas` — index (chronological, with topic filter)
- `/ideas/[slug]` — essay page

Distinct from `/news` (announcements) — `Ideas` are essays, lectures-as-text, theological-scientific reflections. This is one of the site's more underdeveloped sections in the current implementation; we treat it as a feature.

## Index page

Editorial list, newest first. Each row: topic eyebrow, title, dek (`excerpt`), author, date. No card grid.

Topic filter chips above. Topics are stored on the `idea` document via `topics[] -> category`.

## Detail page

Layout: long-form article treatment.

1. Breadcrumb
2. Topic eyebrow + Title + Author + Date + Reading time
3. Cover image (optional)
4. Lead (the `excerpt` field promoted into a styled lead paragraph)
5. `Prose` body, drop cap optional
6. Author block at the end (headshot, bio, link to profile)
7. Related: 3 other essays (same topics)

## Improvements over the current site

- **Long-form article treatment.** Generous typography, drop caps, real reading widths.
- **Author bylines.** Most essays in the current site lack clear attribution.
- **Topic taxonomy.** Allow editors to tag essays by topic and filter the index.
- **Reading time.** Estimated from Portable Text word count.
