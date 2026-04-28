# Performance budget

## Targets

| Page | Lighthouse perf | LCP | CLS | TTFB | Initial JS gzipped |
| --- | --- | --- | --- | --- | --- |
| `/` (home) | ≥ 95 mobile / 98 desktop | < 2.0s 4G | < 0.05 | < 200ms | < 100 KB |
| `/news/[slug]` | ≥ 95 | < 2.0s | < 0.05 | < 200ms | < 110 KB |
| `/events` | ≥ 92 | < 2.5s | < 0.05 | < 250ms | < 130 KB |
| `/events/[slug]` | ≥ 95 | < 2.0s | < 0.05 | < 200ms | < 110 KB |
| `/conferences/[year]/talks/[slug]` | ≥ 90 | < 2.5s | < 0.05 | < 250ms | < 130 KB |
| `/donate` | ≥ 95 | < 2.0s | < 0.05 | < 200ms | < 120 KB |
| `/account` (auth) | ≥ 90 | < 2.5s | < 0.05 | < 400ms | < 150 KB |

## Levers

- Server Components by default → minimal client JS.
- `next/font` with subset and `display: swap`.
- `next/image` for every image; AVIF + WebP.
- `lite-youtube-embed` for every video; never the YouTube iframe on first paint.
- Lazy-load below-the-fold blocks via `next/dynamic`.
- CSS = Tailwind. No CSS-in-JS runtime.
- Defer all third-party scripts. Vercel Analytics is the only one and is light.

## Lighthouse CI

`.lighthouserc.json` configures the budgets. Run on every preview deploy. Failures comment on the PR.

```json
{
  "ci": {
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }]
      }
    },
    "collect": {
      "url": ["http://localhost:3000/", "http://localhost:3000/news/example", ...]
    }
  }
}
```

## Bundle analysis

`pnpm analyze` runs `@next/bundle-analyzer` and uploads the report to a CI artifact. PRs that introduce > 20 KB to a route's bundle without a clear reason are flagged.

## Image budget

- Hero images: max 200 KB at 1600px wide.
- Inline images: max 100 KB.
- Cover images: max 150 KB.

`next/image` should give us this for free, but we verify post-migration that Sanity's source images aren't accidentally being served raw.

## Web Vitals monitoring

Vercel Speed Insights tracks the real-user numbers. Weekly review. Regressions in any Web Vital → an open issue against the relevant folder.
