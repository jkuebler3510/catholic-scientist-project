# SEO strategy

## Per-page metadata

Every route exports `generateMetadata`. The pattern:

```ts
import { buildMetadata } from '@/lib/seo';
export const generateMetadata = async ({ params }) => buildMetadata({
  source: await fetchSeoSource(params),
  fallback: { title: 'News & Announcements', description: '…' },
  canonical: `/news/${params.slug}`,
});
```

`buildMetadata` is the canonical helper that:

1. Prefers `seo.title` from Sanity, falls back to fallback title, then `siteSettings.siteName`.
2. Prefers `seo.description`, falls back to first 155 chars of relevant body field.
3. Generates OG image: `seo.image` if set, else the page's primary image (cover, portrait, hero), else the global `siteSettings.socialImage`.
4. Sets canonical URL based on the supplied path + `NEXT_PUBLIC_SITE_URL`.

## Open Graph + Twitter

Every page has:

- `og:title`, `og:description`, `og:image` (1200×630), `og:type`, `og:url`
- `twitter:card: summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`

For posts and ideas, also `og:type: article` with `article:published_time`, `article:author`, `article:section`.

## Dynamic OG images

Use Next.js's `ImageResponse` for OG image generation as a fallback when no editorial image is set. Templates in `apps/web/app/api/og/route.tsx`:

- Default template: SCS logo + headline + tagline on parchment background.
- Article template: cover image with overlay + title.
- Event template: date callout + title.

## JSON-LD

Centralized in `lib/seo/jsonLd.ts`. Each page's RSC renders the appropriate `<script type="application/ld+json">` server-side.

Types per page:

| Page | JSON-LD types |
| --- | --- |
| Home | Organization, WebSite |
| Any deep page | BreadcrumbList |
| News article | Article |
| Event | Event |
| Conference | Event |
| Talk | VideoObject |
| Biography | Person, Article (the biography itself) |
| FAQ | FAQPage |

## Canonical URLs

Every page sets `<link rel="canonical">` via `Metadata.alternates.canonical`. Always absolute. No trailing slash.

## hreflang

Out of scope for v1 (English only). Architecture leaves room.

## Robots / noindex

`noindex` for: `/account/*`, `/admin/*`, `/sign-in`, `/sign-up`, `/api/*`, `/search?*`, `/donate/thank-you`, the `(preview)` route group.

## Page speed

LCP is the dominant ranking factor. Specifically:

- Hero images use `priority` + `next/image`.
- No render-blocking client JS.
- Fonts subset via `next/font` with `display: 'swap'`.
- CMS-driven blocks deferred-render only when below the fold.

Lighthouse perf budget per page in `13-launch-qa`.

## Internal linking

Surface internal links generously: every news article links to related posts and tagged topics; every biography links to related scientists; every talk links to its conference. The `Related` section pattern is mandatory on detail pages (delivered by each owning folder).
