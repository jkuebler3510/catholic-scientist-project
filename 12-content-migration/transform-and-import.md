# Transform & import

## Transform

Per type, a transform function in `apps/web/scripts/migration/transform/<type>.ts`:

```ts
export function transformPost(wp: WpPost, ctx: TransformContext): SanityPost {
  return {
    _type: 'post',
    title: wp.title.rendered,
    slug: { _type: 'slug', current: wp.slug },
    excerpt: htmlToPlainText(wp.excerpt.rendered),
    coverImage: ctx.assetMap[wp.featured_media]?.ref,
    coverImageAlt: ctx.assetMap[wp.featured_media]?.alt,
    publishedAt: wp.date_gmt + 'Z',
    author: ctx.authorMap[wp.author]?.ref,
    categories: wp.categories.map(id => ctx.categoryMap[id]?.ref).filter(Boolean),
    tags: wp.tags.map(id => ctx.tagMap[id]).filter(Boolean),
    body: htmlToPortableText(wp.content.rendered, { assetMap: ctx.assetMap }),
    seo: {
      title: wp.yoast_head_json?.title ?? wp.title.rendered,
      description: wp.yoast_head_json?.description ?? null,
    },
    _wpPermalink: wp.link, // used to build the redirect map; stripped before import
  };
}
```

## HTML → Portable Text

Use `@sanity/block-tools`. Customize the deserializer to:

- Map `<img>` → image block with `assetMap` lookup; preserve `alt`.
- Map `<iframe src="youtube.com/...">` → custom `videoEmbed` block with the YouTube ID extracted.
- Map `<blockquote>` → `quote` block.
- Map shortcodes (`[caption]`, `[gallery]`) → matching custom blocks or flagged for manual review.

## Internal link rewriting

After all documents are transformed, traverse Portable Text bodies and rewrite `href` values that point at the existing WP site to the new equivalent. Use the URL redirect map (built in tandem; see `url-redirect-map.md`) as the source.

If a target can't be resolved, leave the link as-is and log it to a "broken internal links" report for editors.

## Import

Use Sanity's transactional import:

```ts
const tx = client.transaction();
for (const doc of documents) tx.createOrReplace(doc);
await tx.commit({ visibility: 'async' });
```

Order matters when documents reference each other:

1. `category` + `tag` → `category`
2. `person` (authors)
3. `chapter`
4. `scientist`
5. `talk`
6. `conference` (which references `talk`)
7. `event`
8. `post`
9. `page`
10. `idea`
11. `faqEntry`
12. Singletons (`siteSettings`, `homepage`) — assembled by hand

Run twice: once into `staging` for review, once into `production` after sign-off.

## Idempotency

Use deterministic `_id`s (`post-<wp-slug>`, `scientist-<wp-slug>`) so re-running the import updates rather than duplicates.

## Validation

After import, run a script that:

- Counts documents per type and compares to expected (from `source-audit.md`).
- Asserts every `post` has a non-empty body.
- Asserts every `scientist` has a portrait.
- Asserts no `null` references remain.

Failures block the production import.
