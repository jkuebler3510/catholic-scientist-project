# 12 — Content Migration

## Mission

Audit every piece of content on the existing WordPress site, extract it, transform it into the shape the new Sanity schemas expect, and import it. Maintain the URL redirect map that `10-seo-analytics` consumes. Land the new site with full historical content intact.

## Why this matters

Without migration, the new site launches empty and the existing site's years of news, events, conferences, biographies, and chapter pages disappear from public view. Migration is what makes feature parity actually meaningful.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md`
3. `02-cms-schema/content-models.md` — target schemas
4. `10-seo-analytics/redirects.md` — how the redirect map is consumed
5. `source-audit.md`
6. `extraction-pipeline.md`
7. `transform-and-import.md`
8. `url-redirect-map.md`
9. `qa-and-cutover.md`

## Deliverables

- An audit document listing every content asset on the existing site, by type and count (`source-audit.md` populated with real numbers).
- An extraction pipeline (Node scripts in `apps/web/scripts/migration/`) that pulls content from the WordPress JSON API and saves it as raw NDJSON.
- A transform step that maps each WordPress post/page/event/etc. to the corresponding Sanity document type, including image asset uploads to Sanity's CDN.
- An import script that uses Sanity's `@sanity/client` to write transformed documents to the `staging` dataset, then a manual sign-off, then the same to `production`.
- The `url-redirect-map.md` populated with old → new URLs (rule-based + per-post explicit), in JSON form for `vercel.json`.
- A migration QA checklist covering content fidelity, image alt text, broken links, and 301 verification.

## Acceptance criteria

- [ ] Every WordPress post is represented as a Sanity `post` (or appropriate type).
- [ ] All images carry alt text; missing alts flagged in a report for editors to fill.
- [ ] Internal links inside Portable Text bodies rewritten to new URLs (or flagged if no equivalent).
- [ ] Conference talks and lectures linked to YouTube IDs (extracted from embedded YT URLs in WP).
- [ ] All historical events preserved in the events archive.
- [ ] All biographies of "Catholic Scientists of the Past" migrated.
- [ ] URL redirect map contains a rule for every public WordPress URL pattern + explicit entries for slugs that don't follow the pattern.
- [ ] Sample of 50 redirects verified post-cutover (handled in `13-launch-qa`).
- [ ] No personal data scraped (no member emails, no Stripe data — those don't exist in WP anyway).

## Out of scope

- Migrating member accounts (no auth on the existing site; v1 starts fresh on Clerk).
- Migrating donation history (lives entirely in Stripe, not WP).
- Authoring new content during migration — that's editorial work.

## Dependencies

| Folder | What we need |
| --- | --- |
| `02-cms-schema` | Target schemas must exist before transform can run |
| `10-seo-analytics` | Consumes the URL map |

## Open questions

- Does the existing WP site expose the REST API publicly, or do we need a service-account login? The agent should check `https://catholicscientists.org/wp-json/wp/v2/posts?per_page=1` first; if it errors, follow up with the SCS team for credentials.
- Some WordPress shortcodes (e.g. `[event_calendar]`) may not have direct equivalents. Document each in `transform-and-import.md` with a manual handling note.

## Suggested agent prompt

> You are migrating content from the existing WordPress catholicscientists.org to the new Sanity-backed site.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/02-cms-schema/content-models.md`
> 4. Every `.md` in `/Catholic Scientist Project/12-content-migration/`.
>
> **Your job.** Audit, extract, transform, import. Build the URL redirect map. Generate a migration report listing what was migrated, what was flagged for manual review, and what failed.
>
> **Acceptance.** All public WP content represented in Sanity; redirect map covers every WP URL; migration report delivered.
