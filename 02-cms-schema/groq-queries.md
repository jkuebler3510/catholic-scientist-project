# GROQ queries

Canonical query patterns. Live in `apps/web/lib/sanity/queries.ts`. Other folders import these — they don't write their own.

## Patterns

- One named export per query: `homepageQuery`, `postBySlugQuery`, etc.
- Queries take parameters via the GROQ `$param` syntax.
- Queries return strongly-typed data via `sanity-codegen` or hand-written types.
- Every query is paired with the cache tags it lives under (consumed by the revalidation webhook).

## Frequently used queries

```groq
// homepageQuery
*[_type == "homepage"][0] {
  seo,
  "blocks": blocks[] {
    ...,
    _type == "featuredNewsBlock" => {
      ...,
      "posts": *[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...^.count] {
        _id, title, slug, excerpt, coverImage, publishedAt
      }
    },
    _type == "upcomingEventsBlock" => {
      ...,
      "events": *[_type == "event" && startDate > now()] | order(startDate asc)[0...^.count] {
        _id, title, slug, startDate, location, category->
      }
    },
    _type == "featuredScientistBlock" => {
      ...,
      "scientist": coalesce(
        selectedScientist->,
        *[_type == "scientist" && featuredOnHomepage == true][0]
      ) { _id, name, slug, summary, portrait, birthYear, deathYear, field }
    }
  }
}
```

```groq
// postsListQuery (paginated)
{
  "posts": *[_type == "post"] | order(publishedAt desc)[$from...$to] {
    _id, title, slug, excerpt, coverImage, publishedAt, "author": author->{name, slug, headshot}
  },
  "total": count(*[_type == "post"])
}
```

```groq
// postBySlugQuery
*[_type == "post" && slug.current == $slug][0] {
  ...,
  "author": author->{name, slug, headshot, bio},
  "categories": categories[]->{title, slug},
  "relatedPosts": relatedPosts[]->{ _id, title, slug, coverImage, publishedAt }
}
```

```groq
// upcomingEventsQuery
*[_type == "event" && startDate > now()] | order(startDate asc) {
  _id, title, slug, startDate, endDate, timezone, location, online,
  "category": category->{ title, slug, color }
}
```

```groq
// eventBySlugQuery
*[_type == "event" && slug.current == $slug][0] {
  ...,
  "category": category->,
  "speakers": speakers[]->{name, slug, headshot, title},
  "relatedConference": relatedConference->{title, slug, year}
}
```

```groq
// conferenceByYearQuery
*[_type == "conference" && year == $year][0] {
  ...,
  "talks": talks[]->{ _id, title, slug, speaker->{ name }, youtubeId, posterImage }
}
```

```groq
// scientistsListQuery
*[_type == "scientist"] | order(birthYear asc) {
  _id, name, slug, summary, portrait, birthYear, deathYear, field, nationality
}
```

```groq
// chaptersListQuery
*[_type == "chapter"] | order(country asc, name asc) {
  _id, name, slug, region, country, city, coordinates, "coordinator": coordinator->{ name }
}
```

```groq
// faqByCategoryQuery
*[_type == "faqEntry" && category == $category] | order(order asc) {
  question, answer
}
```

```groq
// siteSettingsQuery
*[_type == "siteSettings"][0] {
  siteName, tagline, logo, socialImage,
  primaryNav, footerColumns, socialLinks, contactEmail, mailingAddress
}
```

## Image URL builder

```ts
// apps/web/lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url';
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source).auto('format');
```

Used inside the `Picture` primitive (in `01-design-system/component-library.md`).

## Tags & revalidation

Every consumer attaches the relevant cache tags:

```ts
const data = await client.fetch(homepageQuery, {}, {
  next: { tags: ['homepage', 'post:list', 'event:upcoming', 'scientist:list'] }
});
```

The webhook's `tagsFor` function maps document mutations to tag invalidations.
