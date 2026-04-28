# 05 — Events

## Mission

Build the events subsystem: a calendar/list view, event detail pages, the dedicated Gold Masses landing page, in-app RSVPs for SCS-hosted events, and an iCal feed so members can subscribe in their calendar app.

## Why this matters

Events — Gold Masses, lectures, retreats, conferences — are the core of SCS's organizational life. The current site uses a generic events plugin and the experience is rough. We can do meaningfully better with structured event data, real timezones, geocoded venues, and clean RSVPs.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md` (rows for `/events*`)
3. `/DESIGN_PRINCIPLES.md`
4. `01-design-system/` — `EventCard`, `Map`, form primitives
5. `02-cms-schema/content-models.md` — `event`, `eventCategory`, `chapter`
6. `02-cms-schema/groq-queries.md`
7. `07-membership/README.md` — auth context for RSVPs
8. `calendar.md`
9. `event-detail.md`
10. `gold-masses.md`
11. `rsvp-flow.md`
12. `ical-feed.md`

## Deliverables

- `apps/web/app/events/page.tsx` — calendar/list view with filters.
- `apps/web/app/events/[slug]/page.tsx` — event detail.
- `apps/web/app/events/gold-masses/page.tsx` — Gold Masses landing page.
- `apps/web/app/events/calendar.ics/route.ts` — iCal feed.
- `apps/web/app/api/rsvp/route.ts` — RSVP server endpoint.
- Postgres `event_rsvps` table (schema added via the membership Postgres setup).
- Server Action: `submitRsvp(formData)` that validates with Zod, requires Clerk session, writes to Postgres, sends Resend confirmation email.
- E2E test: signed-in user RSVPs to an event and sees the confirmation.

## Acceptance criteria

- [ ] Calendar lists upcoming events, sorted by date, in user's local timezone (with explicit timezone label).
- [ ] Filter by category (Gold Mass / lecture / conference / panel) and by region.
- [ ] Toggle between list and month-grid views.
- [ ] Each event detail includes structured-data `Event` JSON-LD.
- [ ] Gold Masses page explains the tradition, lists upcoming Gold Masses, links to the full calendar.
- [ ] RSVP flow: signed-in only (Clerk wall + sign-in CTA for unsigned visitors), Zod-validated, writes to Postgres, sends an email.
- [ ] iCal feed validates and is subscribable in Apple/Google/Outlook Calendar.
- [ ] Lighthouse perf ≥ 95 on the calendar page (lazy-load the month-grid view).
- [ ] axe-core clean.

## Out of scope

- Event ticketing / paid events (Stripe Checkout for paid events deferred to phase 2; in v1, `event.registrationUrl` can point external).
- Conference registration — owned by `06-conferences`.

## Dependencies

| Folder | What we need |
| --- | --- |
| `01-design-system` | `EventCard`, `Map`, `Form`, `Field`, `Toast` |
| `02-cms-schema` | `event`, `eventCategory`, `chapter` |
| `07-membership` | Clerk integration, Postgres + `event_rsvps` schema |

## Open questions

- Calendar grid view: build from scratch or use `@fullcalendar/react`? Recommendation: custom (FullCalendar bundle is heavy and we have specific styling requirements).
- Capacity enforcement: race-condition-safe via Postgres unique-on-conflict or via a queueing mechanism? For v1 audience size, a simple Postgres transaction + check is fine.

## Suggested agent prompt

> You are implementing the events subsystem for the Society of Catholic Scientists website rebuild.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/DESIGN_PRINCIPLES.md`
> 3. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 4. `/Catholic Scientist Project/01-design-system/`
> 5. `/Catholic Scientist Project/02-cms-schema/`
> 6. `/Catholic Scientist Project/07-membership/README.md`
> 7. Every `.md` in `/Catholic Scientist Project/05-events/`.
>
> **Your job.** Implement calendar/list, event detail, Gold Masses landing, RSVP, and iCal feed. Auth-gate the RSVP via Clerk. Persist RSVPs in Postgres. Emit `Event` JSON-LD on detail pages.
>
> **Acceptance.** All routes implemented, RSVP works end-to-end, iCal validates, JSON-LD validates.
