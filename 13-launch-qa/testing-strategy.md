# Testing strategy

## Pyramid

- **Unit tests** (Vitest) for pure functions: SEO helpers, formatters, parsers, transform code. Co-located with source as `*.test.ts`.
- **Component tests** (Vitest + React Testing Library) for non-trivial components: forms, dialogs, the search dialog, blocks that compute (e.g., `FeaturedScientistBlock` rotation).
- **Integration tests** for server actions and route handlers, mocking Stripe / Sanity / Clerk via fixtures.
- **End-to-end** (Playwright) for critical user flows.

## Critical-path E2E suite

Each test owned by the relevant folder, but the full suite is the gate:

| Flow | Owner |
| --- | --- |
| Visit home → click news article → render | 03 + 04 |
| Visit a biography → render → click related | 03 |
| Visit calendar → filter to Gold Mass → click an event | 05 |
| Apply for membership (form submit) → see thank-you | 07 |
| Sign in → land on `/account` → render dashboard | 07 |
| Sign in → pay dues (Stripe test mode) → see updated status | 07 + 08 |
| Donate $5 (Stripe test mode) → see thank-you → email arrives | 08 |
| Visit conference page → tabs work → play talk | 06 |
| Search dialog opens via ⌘K → typing returns hits → enter navigates | 09 |
| RSS feed loads | 04 |
| iCal feed loads | 05 |
| 301 from a sample WP URL | 10 + 12 |

Each flow runs against the Vercel preview URL in CI.

## Coverage policy

No global coverage threshold. Per-package targets where they make sense:

- `lib/seo/`: 90%
- `lib/sanity/`: 80%
- `lib/db/`: 80%
- `components/`: variable, manual review during code review

Coverage trend monitored in CI; a PR that drops coverage by > 3% is flagged for review.

## Snapshot tests

Used sparingly. Email templates have HTML snapshots so unintended visual changes are caught. UI component snapshots are not used (too brittle).

## Mocking

- Sanity: a `mockSanityClient` in `lib/sanity/mock.ts` returns deterministic fixtures keyed by query.
- Clerk: use `@clerk/testing` for E2E sign-in.
- Stripe: use Stripe's test mode in E2E; for unit tests, a mock client.
- Resend: use `@resend/testing` (or set `RESEND_API_KEY=test_*` and assert outgoing requests).

## Pre-launch dry run

The full suite runs against the production environment with `APP_ENV=production-dry-run` once, with a known dataset, before cutover.
