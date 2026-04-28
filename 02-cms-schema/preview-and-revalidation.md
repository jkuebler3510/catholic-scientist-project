# Preview & revalidation

## Preview mode

Editors need to see drafts on the actual site before publishing. We use Next.js's `draftMode()` together with Sanity's preview tokens.

**Flow.**

1. Editor clicks "Preview" on a document in the Studio.
2. Studio opens `https://catholicscientists.org/api/preview?slug=<slug>&type=<type>&secret=<token>`.
3. The preview route validates the secret, calls `draftMode().enable()`, and 302s to the canonical public URL of that document.
4. Subsequent requests on that browser carry the draft cookie. Sanity client uses the `SANITY_API_READ_TOKEN` to read drafts.
5. Editor sees the draft. A persistent banner ("Preview mode — exit") sits at the top.

The exit route `/api/preview/exit` calls `draftMode().disable()` and redirects.

## On-demand revalidation

On publish, Sanity POSTs the webhook. The handler revalidates the tagged routes immediately so the next request after publish renders fresh content.

```ts
// apps/web/app/api/webhooks/sanity/route.ts
export async function POST(request: Request) {
  const signature = request.headers.get('sanity-webhook-signature');
  const body = await request.text();

  if (!isValidSignature(body, signature, process.env.SANITY_REVALIDATE_SECRET)) {
    return new Response('Invalid signature', { status: 401 });
  }

  const payload = JSON.parse(body) as WebhookPayload;
  const tags = tagsFor(payload);
  for (const tag of tags) revalidateTag(tag);
  return Response.json({ revalidated: tags });
}
```

`tagsFor(payload)` is a pure function with full type coverage — every `_type` maps to a known set of tags.

## Caching strategy

- **Static generation** wins by default. Every public page uses `fetch(..., { next: { tags: [...] } })` and is cached at the edge.
- **No `dynamic = 'force-dynamic'`** on content pages. If a page must be dynamic (e.g. member portal), put it under the `(account)` route group, which has `dynamic = 'force-dynamic'` set at the layout level.
- **Search and feed routes** (RSS, sitemap, iCal) cache for 5 minutes (revalidate via tag on publish).
- **In Studio preview**, draft data is fetched fresh on every request (`{ next: { revalidate: 0 } }`) inside the `(preview)` route group.

## Image delivery

Sanity assets are fetched through `@sanity/image-url`. The resulting URL is passed to `next/image`. We define a custom Next.js image loader that:

1. Takes the Sanity asset URL.
2. Appends `auto=format` and Sanity's `w` and `q` parameters using the size Next.js requested.
3. Lets `next/image` handle responsive `srcset`.

This double-stack gives us Sanity's transforms (crop hot-spot, focal point, format) plus Next.js's responsive layout.

## Live editing (future, not v1)

Sanity 3.40+ supports `@sanity/visual-editing` for inline editing in the rendered app. Architecture leaves room for it: the Sanity client supports the `perspective: 'previewDrafts'` mode, and the layout doesn't break if we add the overlay later.
