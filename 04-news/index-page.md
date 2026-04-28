# News index (`/news`)

## Layout

Editorial list, newest first. Each row:

```
[ Cover image, 4:3, ~ 200px ]   Eyebrow (category)
                                Headline (h2-sized, serif)
                                Excerpt (lead-sized)
                                Byline · Date · Reading time
```

On mobile, image moves above and full-width.

Above the list: page title ("News & Announcements") + a category filter chip row.

Below the list: pagination ("← Newer · Older →"), 12 per page.

## URL params

- `?page=N` — page number (server-rendered, `generateStaticParams` covers pages 1–10).
- `/news/category/[slug]` — filtered by category.

Pagination component reads `useSearchParams` (client) but the underlying page is statically generated per `?page=` value through `generateStaticParams`.

## Featured post

Optional. If the most recent post has `featured: true`, render it at the top in a hero treatment (full-width cover image, larger headline, lead) before the list.

## Empty state

If a category has no posts, show a friendly empty state with a link back to the unfiltered index.

## Improvements over the current site

- **Real categories.** Currently flat. We give each post one or more categories.
- **Reading time.** Calculated from Portable Text body word count.
- **Editorial list, not card grid.** Lets headlines breathe.
- **Featured post slot.** For major announcements (new conference, awards).
