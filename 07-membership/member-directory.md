# Member directory (`/account/directory`)

## Visibility

Auth-gated. Only signed-in members in good standing (dues active OR within 90-day grace) can see it.

Within the directory, a member is visible only if `directoryOptIn === true`. Per-field visibility is controlled by the member's privacy settings (see `member-portal.md`).

## Layout

Search input + filters at top:

- Search (name, affiliation, field)
- Field (e.g. Physics, Genetics)
- Country
- Chapter

Grid of member cards: photo, name, affiliation, field, country. Click → `/account/directory/[username]` (a member-only profile view).

Pagination: 24 per page, server-rendered.

## Profile view (`/account/directory/[username]`)

- Photo, name, title/affiliation, field, country, chapter
- Bio
- Public links (ORCID, LinkedIn, personal site)
- "Send a message" button (mailto, gated to members)
- List of their public talks/contributions if any (queries `talk` and `idea` documents authored by them)

## Implementation

```ts
// Server Component
const members = await db
  .select({...})
  .from(members)
  .where(and(
    eq(members.directoryOptIn, true),
    isNull(members.deletedAt),
    isActiveDues(members)
  ))
  .orderBy(members.lastName);
```

Filters become parameterized SQL conditions. Search uses Postgres full-text on `name + affiliation + field`.

## Performance

Directory is data-driven so it can't be statically generated. Use Vercel's RSC streaming and a small "loading skeleton" to show structure quickly. Cache the page per user-key for 60 seconds (since it's the same for every member at a given moment).

## Privacy

- No SSR-rendered emails or phone numbers in the HTML; if email is shown, render via "Send a message" button that opens a server-handled compose form (not raw `mailto`) to keep emails out of scrapers.
- Robots.txt blocks all `/account/*` paths.
- The directory route returns 401 if accessed without a session.

## Improvements over the current site

- **A directory exists.** Currently no member-to-member discovery.
- **Privacy by default.** Opt-in, with per-field controls.
- **Connection across chapters and fields,** which is the entire point of fellowship.
