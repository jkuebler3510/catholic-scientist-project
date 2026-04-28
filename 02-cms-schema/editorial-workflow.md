# Editorial workflow

How content actually moves from "draft" to "live."

## Roles

Sanity has fine-grained role permissions. We use three:

- **Administrator** — board members and tech leads. Can edit every type, manage users.
- **Editor** — communications team. Can publish posts, events, biographies, but cannot edit `siteSettings`.
- **Contributor** — external authors. Can create and save drafts, cannot publish; their drafts go through review.

## Lifecycle

1. **Draft.** Contributors and editors save drafts in the Studio. Drafts are visible in preview (see `preview-and-revalidation.md`).
2. **Review.** Editor opens the draft, fills in any missing fields, optionally schedules.
3. **Publish.** Live. Webhook fires. The relevant routes revalidate.
4. **Update.** Subsequent edits create a new draft on top of the published version. Publishing re-fires the webhook.
5. **Unpublish.** Removes the document from public queries. The route 404s. URL stays redirected.
6. **Delete.** Only administrators. Document gone permanently.

## Scheduled publishing

Use `@sanity/scheduled-publishing`. Editors can schedule a `post` or `event` for a future datetime; Sanity publishes automatically. Useful for embargoed announcements and event publishing in advance.

## Editorial UI (desk structure)

Pin singletons at the top of the navigator:

```
🏠 Home page
⚙ Site settings
─────────────
📰 News
📅 Events
🎓 Conferences
🎤 Talks & Lectures
👤 Catholic Scientists of the Past
🏛 Chapters
✍ Ideas & Discussions
❓ FAQ
─────────────
👥 People
🏷 Categories
```

Each section uses `S.documentTypeList` with grouped views ("Drafts", "Published this month", "Archive").

## Authoring guidelines

For each content type, write a one-paragraph "what good looks like" guide and surface it in the Studio via a `description` on the document type. Examples:

- `post`: "150–800 words. Lead with the news. Use H2 (not bold) for sections. Link to source materials."
- `event`: "Always include venue + city. Use the event's local timezone. Add a registration URL if external; toggle in-app RSVP if SCS handles registration."
- `scientist`: "Open with one paragraph that summarizes the person's contribution. Include at least one direct quote with citation. End with two further-reading links."

## Approvals

In v1, no formal approval workflow inside Sanity. The Editor role is trusted to publish. If we need stricter approval later, add `@sanity/document-internationalization`-style draft → approved transitions.

## Webhooks

A single webhook on the `production` dataset fires on `create`, `update`, and `publish` of any document. The handler in `apps/web/app/api/webhooks/sanity/route.ts`:

1. Verifies the signature (HMAC SHA-256, `SANITY_REVALIDATE_SECRET`).
2. Parses the `_type` and `slug.current`.
3. Calls `revalidateTag(...)` and/or `revalidatePath(...)` for the affected routes.
4. Returns 200 within 5 seconds (Sanity retries on failure).

Tag scheme:

- `post:list`, `post:slug:<slug>`
- `event:list`, `event:slug:<slug>`, `event:upcoming`
- `conference:list`, `conference:year:<year>`
- `talk:slug:<slug>`, `talk:list`
- `scientist:slug:<slug>`, `scientist:list`
- `chapter:slug:<slug>`, `chapter:list`
- `homepage`, `siteSettings`

Each query in `lib/sanity/queries.ts` declares the tags it lives under via `next: { tags: [...] }`.
