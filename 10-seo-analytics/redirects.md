# Redirects from the old site

## Strategy

Every public URL on the existing WordPress site must 301 to its closest equivalent on the new site. Where no equivalent exists, redirect to the nearest parent (e.g., a removed event page → `/events`).

## Source of truth

The mapping is built and maintained in `12-content-migration/url-redirect-map.md`. This folder consumes that map.

## Implementation

`vercel.json`:

```json
{
  "redirects": [
    { "source": "/2018-10-information-on-upcoming-gold-masses-2", "destination": "/events/gold-masses", "permanent": true },
    { "source": "/event/2018-scs-conference", "destination": "/conferences/2018", "permanent": true },
    { "source": "/event/:slug", "destination": "/events/:slug", "permanent": true },
    { "source": "/events/category/:slug", "destination": "/events?category=:slug", "permanent": true },
    { "source": "/category/:slug", "destination": "/news/category/:slug", "permanent": true }
  ]
}
```

For per-post URL changes (e.g. WP slug differs from new slug), the redirect map produces explicit entries.

If the redirect list grows past Vercel's `vercel.json` size limit, move to `next.config.js` `async redirects()` (no size limit) and read the map from a JSON file at build time.

## 404 fallback

If a request 404s on the new site, the `not-found.tsx` page should:

- Apologize.
- Offer the search dialog.
- Link to the home, news index, events index.

This matters: a small fraction of old links won't be in the map.

## Verification

A CI job (in `13-launch-qa`) takes a sample of 50 random URLs from the redirect map and asserts each returns 301 with the correct `Location`.
