# Lectures & webinars (`/lectures` and `/lectures/[slug]`)

## Distinction from conferences

Conferences are annual gatherings with many talks. Lectures are standalone — a single speaker, a single date, often hosted by a chapter. Both reuse the `talk` document type, but lectures have no `parentConference`.

## Index (`/lectures`)

Editorial list (newest first). Each row: poster, title, speaker, date, hosting chapter, duration.

Filters: year, speaker (autocomplete), topic.

## Detail (`/lectures/[slug]`)

1. Breadcrumb
2. Title (display) + speaker
3. `VideoEmbed` (poster + lite YouTube)
4. Description (Portable Text)
5. About the speaker (short bio + headshot, link to profile)
6. Topics (linked to category pages, eventually feeding global search)
7. Related lectures (same speaker or topics)

## JSON-LD

```jsonc
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "...",
  "description": "...",
  "thumbnailUrl": "...",
  "uploadDate": "...",
  "duration": "PT45M",
  "embedUrl": "https://www.youtube.com/embed/<id>",
  "publisher": { "@type": "Organization", "name": "Society of Catholic Scientists" }
}
```

## Improvements over the current site

- **Lectures as a real archive,** not buried under news posts.
- **Speaker-centric filtering.** Find every talk by a specific scholar.
- **Lite YouTube embed** keeps the page fast even when videos are present.
