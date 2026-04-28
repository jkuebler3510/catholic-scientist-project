# Source audit

## What to enumerate

Run these queries against the existing WP REST API and record counts in this file:

```
GET /wp-json/wp/v2/posts?per_page=1            # X-WP-Total header gives the count
GET /wp-json/wp/v2/pages?per_page=1
GET /wp-json/wp/v2/categories?per_page=1
GET /wp-json/wp/v2/tags?per_page=1
GET /wp-json/wp/v2/media?per_page=1
GET /wp-json/wp/v2/users?per_page=1
GET /wp-json/wp/v2/event?per_page=1            # if events plugin exposes a CPT
```

Also enumerate any custom post types the events / biographies plugin uses (e.g. `tribe_events`, `tribe_venue`, `tribe_organizer`).

## Map old → new types

| WordPress | Sanity | Notes |
| --- | --- | --- |
| `post` | `post` | 1:1 |
| `page` (about, mission, statutes) | `page` | Some pages map to specific routes (mission, statutes) — see explicit list below |
| `tribe_events` (or equivalent) | `event` | Decompose recurring events |
| Custom "Catholic Scientists of the Past" CPT (or pages) | `scientist` | If they're pages, identify by URL pattern `/catholic-scientists-of-the-past/...` |
| Conference custom pages | `conference` + `talk[]` | Often a single page per year with embedded videos; transform into a conference + N talks |
| Chapter pages | `chapter` | Often listed on a single chapters page; decompose |
| FAQ entries | `faqEntry` | If FAQ is a single page with `<h3>` Q + `<p>` A blocks, parse the HTML |
| Idea / discussion pages | `idea` | Identify by URL pattern or category |
| Categories | `category` | 1:1, deduplicated |

## Explicit pages to map by hand

These pages need editor attention regardless of automated migration:

- `/about` and any sub-pages
- `/about/mission` (or wherever mission lives)
- `/leadership` / `/board`
- `/membership` overview
- `/statutes` / bylaws PDF
- `/donate`
- `/gold-masses` overview

For each, record current URL, current title, target slug in the new site, and any notes about fields that need manual editorial intervention.

## Out of scope

- Comments (the existing site has Disqus or none — verify; if present, archive separately, not migrated).
- Footer widgets, sidebar widgets — replaced by `siteSettings` in Sanity.
- WordPress users — replaced by Clerk + Postgres.
