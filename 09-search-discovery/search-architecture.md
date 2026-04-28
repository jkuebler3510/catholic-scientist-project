# Search architecture

## Interface

```ts
// lib/search/client.ts
export type SearchHit = {
  id: string;
  type: 'post' | 'event' | 'conference' | 'talk' | 'scientist' | 'idea' | 'chapter' | 'faq' | 'page';
  title: string;
  description: string;
  url: string;
  thumbnail?: { url: string; alt: string };
  score: number;
};

export interface SearchClient {
  search(input: {
    query: string;
    types?: SearchHit['type'][];
    limit?: number;
    offset?: number;
  }): Promise<{
    hits: SearchHit[];
    totalByType: Partial<Record<SearchHit['type'], number>>;
  }>;
}
```

## v1 implementation (Sanity GROQ)

A single GROQ query unions multiple subqueries with the search predicate:

```groq
{
  "posts": *[_type == "post" && (
    title match $q || excerpt match $q || pt::text(body) match $q
  )][0...$limit] { _id, "type": "post", title, "description": excerpt, "url": "/news/" + slug.current, "thumbnail": { "url": coverImage.asset->url, "alt": coverImageAlt } },

  "events": *[_type == "event" && (
    title match $q || pt::text(description) match $q
  ) && startDate > now()][0...$limit] { ... },

  "talks": *[_type == "talk" && (
    title match $q || speaker->name match $q || pt::text(description) match $q
  )][0...$limit] { ... },

  // ... and so on for scientist, idea, chapter, faq, page
}
```

GROQ's `match` operator does prefix-match per token. For phrase matching, use `text::query`. Document in code comments.

Combine and rank server-side: title hits win, then description, then body. Boost recency for `post` and `event`.

## Future migration path

If volume or ranking quality demands it, swap the v1 implementation for an Algolia or Typesense client behind the same `SearchClient` interface. Migration steps documented (briefly) here:

1. Provision the index, define a sync job (Sanity webhook → search index).
2. Drop in a new implementation of `SearchClient`.
3. Switch `lib/search/index.ts` export from `groqSearchClient` to `algoliaSearchClient`.

No consumer code changes.

## Snippets / highlighting

For v1, we don't render highlighted snippets (GROQ doesn't surface them). Show plain `description`. Algolia/Typesense get us highlighted hits later.

## Caching

Search responses are not cached. Sanity's CDN already handles that for static queries; live search hits the Sanity API. p95 should be well under 250ms in our content volume.
