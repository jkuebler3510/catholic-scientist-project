# Sitemaps

## Main sitemap (`/sitemap.xml`)

Generated via Next.js's native `app/sitemap.ts`. Includes:

- Static routes (home, about, etc.)
- Dynamic routes by querying Sanity for every published `post`, `event`, `conference`, `talk`, `scientist`, `idea`, `chapter`, `category`, plus generated topic pages.

```ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, talks, scientists, ideas, chapters, categories] = await Promise.all([
    sanity.fetch(allPostsForSitemap),
    sanity.fetch(allEventsForSitemap),
    /* … */
  ]);

  return [
    { url: `${SITE}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/about`, changeFrequency: 'monthly' },
    /* … */
    ...posts.map(p => ({
      url: `${SITE}/news/${p.slug}`,
      lastModified: p._updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    /* … */
  ];
}
```

If size grows past Google's 50k-URL limit, split into a sitemap index — not needed in v1.

## News sitemap (`/news/sitemap.xml`)

Specialized for Google News. Lists posts published in the last 48 hours. Format follows the [Google News sitemap spec](https://support.google.com/news/publisher-center/answer/9606710).

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://catholicscientists.org/news/...</loc>
    <news:news>
      <news:publication>
        <news:name>Society of Catholic Scientists</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2026-04-25T14:00:00Z</news:publication_date>
      <news:title>...</news:title>
    </news:news>
  </url>
</urlset>
```

## Robots (`/robots.txt`)

```
User-agent: *
Allow: /
Disallow: /account
Disallow: /admin
Disallow: /api
Disallow: /sign-in
Disallow: /sign-up
Disallow: /search

Sitemap: https://catholicscientists.org/sitemap.xml
Sitemap: https://catholicscientists.org/news/sitemap.xml
```

## Submission

After launch, submit the sitemap in Google Search Console and Bing Webmaster Tools. Owner: `13-launch-qa`.
