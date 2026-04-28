# Extraction pipeline

## Tools

- Node.js scripts in `apps/web/scripts/migration/`.
- `node-fetch` (or native `fetch` on Node 20).
- `unified` + `rehype-parse` + `rehype-remark` + `remark-stringify` for HTML → Markdown → Portable Text.
- `@sanity/block-tools` for converting HTML to Portable Text directly (preferred — preserves structure better).
- `sharp` for any image preprocessing.

## Steps

### 1. Crawl

Hit each WP REST endpoint with pagination. Save raw responses as NDJSON in `apps/web/scripts/migration/raw/<type>.ndjson`. Each line is one item.

```
node scripts/migration/extract.ts --type=posts --output=raw/posts.ndjson
node scripts/migration/extract.ts --type=pages --output=raw/pages.ndjson
...
```

Parameters: `--per_page=100`, `--orderby=date`, `--order=asc`. Resume on failure: `--start_page=N`.

### 2. Sidecar metadata

For each item, also persist:

- WordPress permalink (the public URL)
- Featured media URL (the cover image)
- Author (slug → name)
- Categories and tags
- Embedded HTML body

### 3. Media

Fetch every `media` item's full URL. Save into `raw/media/` with filename `<id>-<original-name>`. Record a manifest `raw/media-manifest.json` mapping WP media id → local filename + original URL + alt text.

### 4. Sanity-bound images

Upload each image to the Sanity dataset using `client.assets.upload('image', stream)`. Capture the resulting Sanity asset `_id` and write to `raw/sanity-asset-map.json`. Transform pass uses this map to set image references on documents.

## Robustness

- Throttle to 5 req/s to avoid hammering the WP server.
- Retry with exponential backoff on transient errors.
- Log every failure to `raw/errors.log` with WP item ID and reason; continue.
- Compute MD5 of every downloaded media file; skip if already on disk (resumable).

## Manual review queue

Items that fail transformation enter `raw/manual-queue.json` for editor review. Examples:

- A post with no body (likely deleted but still indexed).
- An event with malformed dates.
- A scientist biography where the WP page used a custom shortcode we can't parse.

These get fixed by hand in Sanity Studio after import.
