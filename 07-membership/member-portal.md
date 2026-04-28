# Member portal (`/account/*`)

## Routes

- `/account` — dashboard (welcome, dues status, RSVPs, recent news for members)
- `/account/profile` — edit profile, link/unlink ORCID, manage 2FA, manage email
- `/account/directory` — browse member directory
- `/account/rsvps` — list of RSVPs (upcoming, past), cancel actions
- `/account/billing` — link to Stripe Customer Portal (see `dues-stripe.md`)
- `/account/admin` — only for users with `admin` role; admin-only utilities (review applications, refund a dues payment, view recent submissions)

All routes are `dynamic = 'force-dynamic'` (auth-gated, per-request). Layout sets a sidebar nav with the routes above.

## `/account` dashboard

Top of page: welcome message with first name. Below:

- **Dues status card.** "Active through 2027-04-27" or "Lapsed — renew now" with a CTA.
- **Upcoming RSVPs.** Compact list of events the user has confirmed.
- **Member-only resources.** Curated CMS-driven block list (e.g., "Latest internal newsletter", "Conference recordings only available to members").
- **Recent news.** 3 most-recent posts.

## `/account/profile`

Sections:

- **Account.** Email (read-only, change via Clerk's `<UserProfile>`), name, password change.
- **Profile.** Display name, affiliation, field, bio (≤ 500 chars), photo, links (ORCID, LinkedIn, personal site).
- **Directory.** "Show me in the public/internal directory" toggle. Sub-toggles: show email, show affiliation, show field, show photo.
- **2FA.** Manage via Clerk's `<UserProfile>`.
- **Notifications.** Email preferences (transactional only — no marketing in v1).
- **Danger zone.** Delete account (Clerk handles the auth deletion; we soft-delete the member row).

The form uses our `Form` primitive with React Hook Form + Zod. Server Action validates and writes to Postgres.

## `/account/rsvps`

Two sections: **Upcoming** (with a "Cancel RSVP" button per row) and **Past**.

Each row links to the event detail page. Cancel is a confirmation `Dialog`.

## `/account/admin`

Visible only to admins. Tools:

- **Applications queue** — list pending applications, approve/reject/notes.
- **Recent dues payments** — last 30 days, with link to Stripe.
- **Recent donations** — same.
- **Active member count** — single-stat card.

This avoids needing a separate admin product for v1. Real reporting can move to a BI tool later.

## Improvements over the current site

- **A real member portal.** The current site has nothing equivalent.
- **Dues status front and center.** Users always know whether they're active.
- **Clean profile editing,** with directory privacy controls.
