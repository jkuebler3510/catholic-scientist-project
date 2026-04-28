# 13 — Launch QA

## Mission

Be the gate between "everything is implemented" and "we go live." Run the cross-cutting tests, audits, and checklists that no individual feature folder can run alone. Sign off the site for launch.

## Why this matters

Every preceding folder ships its slice. This folder verifies that they compose into a working, accessible, fast, secure, search-discoverable site that doesn't leak data and won't fall over under load.

## Inputs (read these first, in order)

1. `/README.md`
2. `/ARCHITECTURE.md`
3. `/INFORMATION_ARCHITECTURE.md`
4. Every other folder's README (they're the inputs to QA)
5. `testing-strategy.md`
6. `accessibility-audit.md`
7. `performance-budget.md`
8. `security-checklist.md`
9. `go-live-checklist.md`

## Deliverables

- A consolidated test report covering: TypeScript (zero errors), ESLint (zero warnings), Vitest (passing, with coverage trend), Playwright (passing on Vercel preview), Lighthouse CI (under budget on every key page), axe-core (zero violations), redirect verifier (≥ 49/50 sample passing).
- Manual QA checklist completed and signed off.
- Cross-browser smoke test results (Chrome, Safari, Firefox, mobile Safari, mobile Chrome).
- A pre-launch security checklist (CSP, headers, rate-limiting, webhook signing, secret rotation, robots, noindex coverage).
- A post-launch monitoring runbook (first 72 hours).
- A go/no-go meeting agenda + decision log.

## Acceptance criteria

- [ ] All gates green simultaneously on a single commit on `main`.
- [ ] Lighthouse perf budget met on home, a representative news article, an event detail, the donate page, and `/account` (auth-gated).
- [ ] axe-core clean on every public route (auth-gated routes audited manually).
- [ ] Cross-browser sanity check: render and primary-flow click-through on Chrome, Safari, Firefox, mobile Safari, mobile Chrome.
- [ ] Stripe end-to-end: a $5 test donation lands in test-mode dashboard and emits a receipt.
- [ ] Clerk end-to-end: sign up, sign in, sign out, password reset all work.
- [ ] Sanity revalidation end-to-end: publish a draft → confirm the public route reflects the change within 5s.
- [ ] iCal feed parses in Apple Calendar, Google Calendar.
- [ ] RSS feed validates.
- [ ] Search dialog works on every page, returns relevant hits.
- [ ] Redirect verifier passes (50-URL sample).
- [ ] All open questions across folders are either resolved or explicitly deferred to phase 2.

## Out of scope

- Building features.
- Editorial content review (SCS staff own that).
- Marketing launch announcements.

## Dependencies

Every other folder.

## Open questions

- Load testing target: do we expect a launch-day spike? If yes, run a basic k6 scenario at 100 RPS for 5 minutes against the home and biography pages. Default: skip in v1; SCS's traffic profile doesn't warrant it.

## Suggested agent prompt

> You are running the launch QA gate for the Society of Catholic Scientists website rebuild.
>
> **Read first:** every folder's README in `/Catholic Scientist Project/`. Then this folder's `.md` files.
>
> **Your job.** Run all automated test gates, document results, run manual QA, run a security checklist, run a cross-browser smoke, verify integrations end-to-end, generate the consolidated report and the go/no-go decision package. Do not modify feature code; if you find a bug, file an issue and assign it to the owning folder.
>
> **Acceptance.** All gates green, all checklists complete, the consolidated report is delivered, the go/no-go decision is recorded.
