# RSS feeds

## `/news/feed.xml`

Contains the latest 50 posts. Format: RSS 2.0 (most universally consumable).

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Society of Catholic Scientists — News</title>
    <link>https://catholicscientists.org/news</link>
    <description>News and announcements from the Society of Catholic Scientists.</description>
    <language>en-us</language>
    <atom:link href="https://catholicscientists.org/news/feed.xml" rel="self" type="application/rss+xml" />
    <item>...</item>
  </channel>
</rss>
```

Each `<item>` includes `title`, `link`, `guid` (post URL), `pubDate`, `author`, `description` (excerpt), and `content:encoded` (rendered HTML body).

## Implementation

`apps/web/app/news/feed.xml/route.ts`. Standard Next.js Route Handler returning `Content-Type: application/rss+xml; charset=utf-8`.

```ts
export async function GET() {
  const posts = await sanityClient.fetch(latestPostsQuery, { count: 50 }, {
    next: { tags: ['post:list'], revalidate: 300 }
  });
  const xml = renderRss({ posts, siteUrl: env.NEXT_PUBLIC_SITE_URL });
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
}
```

## Discovery

Add `<link rel="alternate" type="application/rss+xml">` in the root layout pointing to `/news/feed.xml`. RSS readers find the feed automatically.

## Validation

Add a CI step (or just include in `13-launch-qa`) that runs `xmllint` against the generated feed and checks W3C feed validator compatibility.

## Per-category feeds (deferred)

Could ship `/news/category/[slug]/feed.xml`. Not in v1 — defer until requested.
