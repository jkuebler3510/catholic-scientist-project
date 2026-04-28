# URL redirect map

## Format

Maintained as `apps/web/scripts/migration/redirects.json`:

```json
[
  { "source": "/event/2018-scs-conference", "destination": "/conferences/2018", "permanent": true },
  { "source": "/event/:slug", "destination": "/events/:slug", "permanent": true },
  ...
]
```

Read at build time and merged into `vercel.json` redirects, or fed to `next.config.js` `redirects()` (chosen by `10-seo-analytics`).

## Categories of redirects

### 1. Pattern-based (hand-written, few)

```
/event/:slug                    → /events/:slug
/category/:slug                 → /news/category/:slug
/tag/:slug                      → /topics/:slug
/events/category/:slug          → /events?category=:slug
/wp-content/uploads/...         → leave alone (Vercel won't intercept asset paths to other origins)
```

### 2. Per-post explicit (auto-generated during transform)

For every WP post, page, event, etc., the transform records:

```
{ source: <wpPermalinkPath>, destination: <newPath>, permanent: true }
```

If the slugs match (most will), the rule may already be covered by a pattern; the explicit entry is harmless.

### 3. Manual overrides

Edge cases where the WP URL doesn't follow a pattern (e.g., a one-off "about" page at a custom path). Recorded by editors in `redirects.manual.json` and merged.

## Tooling

A small CLI:

```
pnpm migrate:redirects:build
pnpm migrate:redirects:verify --sample=50
```

`build` produces the merged redirects file. `verify` HEADs each source URL and asserts a 301 to the destination — used in `13-launch-qa` post-cutover.

## Asset URL handling

WordPress uploads typically live at `/wp-content/uploads/...`. After cutover, those URLs no longer resolve on our origin. Options:

- **Best:** every internal link to `/wp-content/uploads/` is rewritten during transform to point at the equivalent Sanity-hosted asset (preferred).
- **Fallback:** add a redirect rule from `/wp-content/uploads/...` → the Sanity asset's CDN URL, parameterized by the migration manifest.

We pursue both: rewrite where possible, fallback where the rewrite missed.

## Documentation

Once migration completes, update this file with the actual counts:

- Total redirects: ___
- Pattern-based: ___
- Per-post explicit: ___
- Manual overrides: ___
- Verification result (sample): ___ / 50 passing
