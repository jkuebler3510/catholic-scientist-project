# Delegation Guide

This folder is structured so that each numbered subtask can be assigned to an independent agent (or contributor) without that agent needing to read the rest of the project. This document explains the pattern.

## Subtask folder anatomy

Every subtask folder has the same shape:

```
NN-folder-name/
  README.md                     ← agent brief (start here)
  <topic>.md                    ← detailed spec for one slice of the work
  <topic>.md
  <topic>.md
```

The `README.md` always contains nine sections, in this order:

1. **Mission** — one sentence.
2. **Why this matters** — context the agent needs to make judgment calls.
3. **Inputs** — what the agent must read first (top-level docs + dependency folders).
4. **Deliverables** — concrete artifacts (files, types, routes, schemas).
5. **Acceptance criteria** — how to know it's done.
6. **Out of scope** — what the agent must *not* do.
7. **Dependencies** — which other folders must be complete first.
8. **Open questions** — known unknowns to escalate.
9. **Suggested agent prompt** — copy-paste-ready briefing.

That last section is the key feature: it is the literal text you (or an orchestrator) hand to a delegated agent, with relative file paths it should read before writing any code.

## Order of execution

There is a partial order, but several tracks can run in parallel:

```
                   ┌── 01-design-system ──┐
00-foundation ─────┤                       ├──── 03-core-pages ───┐
                   └── 02-cms-schema ──────┤                       │
                                           ├──── 04-news ──────────┤
                                           ├──── 05-events ────────┼─→ 13-launch-qa
                                           └──── 06-conferences ──┤
                       07-membership ──────┘                       │
                       08-donations ─────────────────────────────┐ │
                                                                  │ │
                       09-search-discovery ───────────────────────┤ │
                       10-seo-analytics ─────────────────────────┤ │
                       11-deployment ────────────────────────────┤ │
                       12-content-migration ─────────────────────┘ │
```

Recommended phasing for a small team or a coordinator running multiple agents:

**Phase 1 (sequential foundation).** `00-foundation` → both `01-design-system` and `02-cms-schema` in parallel.

**Phase 2 (parallel build).** Once 01 and 02 land, fan out: `03-core-pages`, `04-news`, `05-events`, `06-conferences`, `07-membership`, `08-donations`. These are independent; the design system and CMS are their shared interface.

**Phase 3 (cross-cutting).** `09-search-discovery`, `10-seo-analytics`, `11-deployment`, `12-content-migration`. These touch many surfaces but don't block the page-level work.

**Phase 4 (gate).** `13-launch-qa` blocks the public launch until acceptance criteria across the project are met.

## Coordination protocol

- **Schema is the contract.** Sanity schemas (in `02-cms-schema`) and the Postgres schema (in `07-membership`) are the only places types are defined. Other folders import; they don't redeclare.
- **No folder edits another folder's files.** If `04-news` needs a field added to the `post` schema, it files a request against `02-cms-schema` rather than editing the schema directly.
- **Block library lives in `01-design-system`.** Pages (`03`–`06`) compose blocks, never rebuild them.
- **Open questions go in the folder's README.** When an agent finishes its work, any unresolved questions move from `Open questions` into a new top-level `OPEN_QUESTIONS.md` for the orchestrator to triage.

## How to brief an agent

Copy the "Suggested agent prompt" from the folder's README. Then, in your own words, add:

- The repo URL (or local path) where the work should land.
- Any updates that postdate this plan.
- A pointer to recent decisions in `OPEN_QUESTIONS.md` if any apply.

A good brief looks like:

> Read `/Catholic Scientist Project/04-news/README.md` and the docs it links. Implement the news subsystem in the existing repo at `/repo/path`. The CMS schemas you'll need are already implemented in `apps/studio/schemas/post.ts` (review it before designing your queries). When you're done, post a summary listing every file you created or changed, the routes that now exist, and any open questions.

## Quality gates

Each subtask's "Acceptance criteria" section is the per-folder gate. The project as a whole has these gates, all enforced in `13-launch-qa`:

- TypeScript: zero `any` crossing module boundaries; `tsc --noEmit` green.
- Lint: `eslint .` green with zero warnings.
- Unit tests: critical-path tests passing; coverage trend not falling.
- E2E: the Playwright suite green on Vercel preview.
- Lighthouse: home + a content page + a member portal page meet the budget in `13-launch-qa/performance-budget.md`.
- Accessibility: axe-core scan clean on every public route.
- SEO: every public route has unique `<title>` and `<meta description>`, a canonical URL, and structured data where applicable.

## Templates

Templates the agent should use rather than inventing from scratch:

- `AGENT_BRIEF_TEMPLATE.md` — the canonical structure for any new subtask folder README, in case new workstreams emerge.
