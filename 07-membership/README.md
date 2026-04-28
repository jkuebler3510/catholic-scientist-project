# 07 — Membership & Member Portal

## Mission

Build the entire membership stack: Clerk auth, the public application flow, the auth-gated member portal, the member directory, dues collection via Stripe, and the Postgres schema that stores everything.

## Why this matters

Membership is the heart of SCS — it's how scientists join the Society, pay dues, RSVP to events, and access member-only resources. The current site uses a third-party plugin and the experience is rough. A purpose-built portal is the single most differentiating piece of v1.

## Inputs (read these first, in order)

1. `/README.md`
2. `/ARCHITECTURE.md` — sections on Identity, Data, Commerce
3. `/INFORMATION_ARCHITECTURE.md` (rows for `/membership*`, `/account*`)
4. `/TECH_DECISIONS.md`
5. `01-design-system/component-library.md` — `Form`, `Field`, `Dialog`
6. `08-donations/README.md`
7. `auth-clerk.md`
8. `application-flow.md`
9. `member-portal.md`
10. `member-directory.md`
11. `dues-stripe.md`
12. `postgres-schema.md`
13. `emails.md`

## Deliverables

- Clerk integration: middleware, `<SignIn>` / `<SignUp>` UI on `/sign-in` and `/sign-up`, Clerk webhook handler at `/api/webhooks/clerk` that syncs user create/update/delete to Postgres.
- Postgres schema (Drizzle, in `apps/web/lib/db/schema.ts`) for: `members`, `applications`, `event_rsvps`, `conference_registrations`, `donations` (the donations folder owns this table; we expose its schema here).
- Migrations runner (`drizzle-kit`).
- `/membership` (overview), `/membership/apply` (application form), `/membership/dues` (dues redirect to Stripe).
- `/account` and child routes: `/account/profile`, `/account/directory`, `/account/rsvps`, `/account/billing`.
- Server Actions for application submission, profile update, directory opt-in, RSVP cancellation.
- React Email templates: `welcome.tsx`, `application-received.tsx`, `application-approved.tsx`, `dues-receipt.tsx`.
- E2E test: apply → admin approves → user signs in → pays dues → sees portal.

## Acceptance criteria

- [ ] Clerk middleware protects every route under `/account`.
- [ ] Application form is Zod-validated client + server, captures all required fields, writes to `applications` table.
- [ ] On Clerk user creation, the webhook upserts a `members` row keyed by `userId`.
- [ ] Member directory respects `directoryOptIn`; opted-out members are not visible.
- [ ] Stripe dues flow: redirect to Checkout → webhook on success updates `members.duesPaidThrough`, sends receipt email.
- [ ] Member portal renders correctly; perf ≥ 90 (it's dynamic, so slightly relaxed).
- [ ] axe-core clean on every form.

## Out of scope

- The donations subsystem itself — owned by `08-donations`. We share the Stripe webhook endpoint but keep handlers separate.
- Marketing of membership (lives in `/membership` CMS copy, owned by editors).

## Dependencies

| Folder | What we need |
| --- | --- |
| `00-foundation` | Repo, ORM choice, KV store, Postgres connection wired |
| `01-design-system` | All form primitives, `Toast`, `Dialog`, `Card` |
| `02-cms-schema` | The `/membership` and `/membership/apply` page documents |
| `08-donations` | Stripe shared webhook handler |

## Open questions

- Does the application form need **manual approval** by SCS staff, or is paying dues sufficient for membership? Default: manual approval first (SCS verifies PhD and field), then user invited to pay dues. Confirm with the SCS team.
- Member directory: opt-in or opt-out? Default: **opt-in**.
- 2FA: required for all members or opt-in? Default: optional in v1, recommended on the profile page; required for board members.

## Suggested agent prompt

> You are building the complete membership stack for the Society of Catholic Scientists website rebuild. Clerk for auth, Postgres for application data, Stripe for dues.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/TECH_DECISIONS.md`
> 4. `/Catholic Scientist Project/01-design-system/`
> 5. Every `.md` in `/Catholic Scientist Project/07-membership/`.
>
> **Your job.** Stand up Clerk, the Postgres schema (Drizzle), the application flow, the member portal, the directory, the dues flow via Stripe, and all transactional emails. Add an admin approval flow (a thin admin page or Studio workflow — your call, document it).
>
> **Acceptance.** Auth wall on `/account/*` works, application → approval → dues → portal flow works end to end, emails render correctly, e2e test green.
