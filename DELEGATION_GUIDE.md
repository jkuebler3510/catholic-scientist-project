# Delegation Guide

This folder is structured so that each numbered subtask can be assigned to an independent agent (or contributor) without that agent needing to read the rest of the project. This document explains the pattern.

## Workflow rule: small commits, agents self-merge

Agents push their own work to `github.com/jkuebler3510/catholic-scientist-project` and **may merge their own PRs (or commit directly to `main`)** to keep the project moving fast. There is no human review gate.

What that means in practice — the **git history is the audit trail**, so the only hard rule is:

> **Every change ships as a series of small, focused commits with descriptive messages.**

Joe doesn't review PRs in real time, but he reads the git log. Make it easy to scan.

### Commit rules (mandatory)

- **One logical change per commit.** Don't bundle a refactor with a feature. Don't bundle five fixes. If you're typing "and" in your commit message, split.
- **Conventional Commits.** Every commit message starts with one of:
  - `feat:` — new feature or capability
  - `fix:` — bug fix
  - `chore:` — tooling, dependencies, config
  - `docs:` — documentation only
  - `refactor:` — restructure with no behavior change
  - `test:` — tests only
  - `perf:` — performance improvement
  - `build:` / `ci:` — build system or CI config
- **Optional scope** after the type matches the subtask folder:
  - `feat(news): paginate the index`
  - `fix(events): correct timezone display on detail page`
- **Subject line ≤ 72 chars, imperative mood** ("add", not "added" or "adds"). No trailing period.
- **Body required when the subject isn't enough.** Wrap at 72 chars. Explain *why* the change was made and what alternatives were considered, not just *what* changed (the diff already shows that).
- **Reference the subtask folder** in the body when relevant: "Implements deliverable from `04-news/index-page.md`."

A good commit:

```
feat(news): add RSS 2.0 feed at /news/feed.xml

Implements the RSS deliverable from 04-news/rss-feeds.md. Returns
the latest 50 posts as a validated RSS 2.0 document with proper
content-type, atom:link self-reference, and content:encoded body.

Cache tag `post:list` revalidates the feed when new posts publish.
```

A bad commit:

```
update news stuff
```

### Branching: encouraged, not required

- **For anything non-trivial** (new feature, multi-file refactor, schema change), use a feature branch:
  - `feat/<short-description>` (e.g. `feat/news-rss-feed`)
  - `fix/<short-description>`, `chore/<short-description>`, `docs/<short-description>`, `refactor/<short-description>`
  - Subtask folder number is welcome context: `feat/04-news-rss-feed`.
  - Open a PR (so the Vercel preview deploy is visible and CI runs against the branch), then **squash-merge it yourself** when CI is green.
- **For small, isolated changes** (typo fix, single-file copy edit, dependency bump), committing directly to `main` is fine.
- **Force-pushes to `main` are forbidden.** Force-pushing to your own feature branch before merge is fine.
- **Branch hygiene.** Delete branches after merge (GitHub can auto-delete — leave that on). No long-running branches; if a branch is older than five days, ship it or close it.

### CI is the gate, not Joe

`main` is set up to require passing CI before merge (typecheck, lint, format, unit tests, Vercel preview build). Don't bypass CI. If CI is wrong, fix CI in a separate commit; don't disable rules to land work.

### PR descriptions: brief, scannable

When you open a PR (recommended for non-trivial work), keep the description short. The commit log carries the detail. A useful PR description has:

- **What & why** — one or two sentences, plus a pointer to the subtask folder.
- **How to verify** — one or two steps to spot-check on the preview deploy.
- **Acceptance checklist** — relevant items from the folder's "Acceptance criteria", ticked.
- **Screenshots** — for UI changes.

That's it. Agents self-merge once CI is green.

### How agent prompts should reflect this

When the suggested agent prompt at the bottom of a folder's README is handed to an agent, the orchestrator should append: "Push commits to `github.com/jkuebler3510/catholic-scientist-project` per the workflow rule in `DELEGATION_GUIDE.md`. Use small, focused, Conventional Commits. Use a feature branch for non-trivial work and squash-merge it yourself once CI is green."

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
