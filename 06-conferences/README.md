# 06 — Conferences, Lectures & Video Library

## Mission

Build the conferences subsystem (annual conference pages, talk archives) and the standalone lectures/webinars area. Provide a unified `/videos` library that surfaces every recording on the site.

## Why this matters

Annual conferences and recorded lectures are the primary content artifact SCS produces. Members and the public want to find a specific talk by year, speaker, or topic. The current site exposes conferences as flat pages with embedded YouTube blocks; we structure them properly.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md` (rows for `/conferences*`, `/lectures*`, `/videos`)
3. `/DESIGN_PRINCIPLES.md`
4. `01-design-system/component-library.md` — `VideoEmbed`, `TalkCard`, `Tabs`
5. `02-cms-schema/content-models.md` — `conference`, `talk`, `person`
6. `02-cms-schema/groq-queries.md`
7. `conference-archive.md`
8. `conference-detail.md`
9. `lectures.md`
10. `video-library.md`
11. `registration.md`

## Deliverables

- `apps/web/app/conferences/page.tsx` — archive index.
- `apps/web/app/conferences/[year]/page.tsx` — annual conference page.
- `apps/web/app/conferences/[year]/talks/[slug]/page.tsx` — talk detail.
- `apps/web/app/lectures/page.tsx` and `[slug]/page.tsx`.
- `apps/web/app/videos/page.tsx` — unified video library with filtering.
- Conference registration interstitial (forwards to `event.registrationUrl` or in-app via Stripe — see `registration.md`).
- E2E test: visits `/conferences`, picks a year, plays a talk poster, navigates to a lecture.

## Acceptance criteria

- [ ] All routes implemented and statically generated where possible.
- [ ] Talk detail emits `VideoObject` JSON-LD with `embedUrl`, `uploadDate`, `duration`.
- [ ] `lite-youtube-embed` is the only video player; never includes the full YouTube iframe on first paint.
- [ ] Video library filters by year, speaker, topic.
- [ ] Lighthouse perf ≥ 95 on the archive index, ≥ 90 on a talk detail (video poster).
- [ ] axe-core clean.

## Out of scope

- Hosting our own video (defer to phase 2).
- Conference registration forms beyond linking to Stripe Checkout.

## Dependencies

| Folder | What we need |
| --- | --- |
| `01-design-system` | `VideoEmbed`, `TalkCard`, `Tabs`, `Picture` |
| `02-cms-schema` | `conference`, `talk`, `person`, `category` |
| `08-donations` | (only for paid conference registration via Stripe) |

## Open questions

- Conference registration: external (link out to Eventbrite or similar) vs. internal (Stripe Checkout → Postgres `conference_registrations`). Recommendation: internal Stripe-driven for v1, since we're already wiring Stripe for membership and donations.

## Suggested agent prompt

> You are implementing the conferences and video library subsystems for the Society of Catholic Scientists website rebuild.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/01-design-system/component-library.md`
> 4. `/Catholic Scientist Project/02-cms-schema/`
> 5. Every `.md` in `/Catholic Scientist Project/06-conferences/`.
>
> **Your job.** Implement conference archive, year pages, talk detail, lectures index/detail, and the unified `/videos` library. Wire conference registration through Stripe Checkout for SCS-hosted conferences. Use `lite-youtube-embed` on every video poster. Emit `VideoObject` JSON-LD.
>
> **Acceptance.** All routes implemented, video player is lite, JSON-LD validates, perf budgets met.
