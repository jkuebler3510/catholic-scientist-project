# News article (`/news/[slug]`)

## Layout

1. Breadcrumb (Home › News › [Category])
2. Eyebrow (category, links to category page)
3. Title (display)
4. Lead (`excerpt`)
5. Byline row: author headshot + name + role + date + reading time
6. Cover image (full width within prose container)
7. `Prose` body
8. Author bio block
9. Share row (copy link, X/Twitter, LinkedIn, Email — each a normal link with proper share intents)
10. Related posts (3, same category)

## Metadata

```ts
generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    openGraph: {
      type: 'article',
      title: ...,
      description: ...,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [...],
    },
    twitter: { card: 'summary_large_image', ... },
    alternates: { canonical: `${SITE_URL}/news/${post.slug.current}` }
  };
}
```

## JSON-LD

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Person", "name": "...", "url": "..." },
  "publisher": { "@type": "Organization", "name": "Society of Catholic Scientists", ... },
  "mainEntityOfPage": "...",
  "image": "..."
}
```

## Static generation

`generateStaticParams` returns all post slugs at build time. New posts trigger revalidation via the Sanity webhook (`post:slug:<slug>` and `post:list` tags).

## 404 handling

`notFound()` if no post matches the slug. `not-found.tsx` renders a styled 404 with a link back to the index.

## Improvements over the current site

- **First-class author bylines** with headshot and link to profile.
- **Reading time** (computed on the server).
- **Real share buttons.** Currently absent.
- **Related posts** based on shared categories.
