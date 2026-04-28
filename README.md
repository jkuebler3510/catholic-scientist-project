# Society of Catholic Scientists — Website Rebuild

This folder is the **single source of truth** for rebuilding [catholicscientists.org](https://catholicscientists.org) from scratch as a modern Next.js application. It is structured so that each subtask can be picked up by an independent AI agent (or human contributor) with everything they need to do the job well, without reading the rest of the project.

## What we're building

A complete replacement for the existing Society of Catholic Scientists website with full feature parity — news, events, conferences, Gold Masses, lectures, member portal, donations, and the historical "Catholic Scientists of the Past" archive — in a modern, accessible, fast, and easy-to-edit stack.

## Confirmed decisions

| Area | Choice |
| --- | --- |
| Repository | [github.com/jkuebler3510/catholic-scientist-project](https://github.com/jkuebler3510/catholic-scientist-project) |
| Framework | Next.js 14+ (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui component primitives |
| CMS | Sanity (headless) |
| Auth | Clerk |
| Payments | Stripe (membership dues + donations) |
| Hosting | Vercel |
| Design direction | Modern redesign, preserving brand identity |
| Launch scope | Full feature parity at v1 |

The full rationale for each is in `TECH_DECISIONS.md`.

## How to navigate this folder

Read these in order if you are new to the project:

1. `README.md` — this file
2. `ARCHITECTURE.md` — overall system architecture and data flow
3. `INFORMATION_ARCHITECTURE.md` — sitemap, page inventory, URL scheme
4. `DESIGN_PRINCIPLES.md` — visual & UX direction
5. `TECH_DECISIONS.md` — why each technology was chosen
6. `DELEGATION_GUIDE.md` — how to assign workstreams to agents

Then drill into the numbered subtask folders. Each one has its own `README.md` that re-establishes context for an agent dropped into that folder cold.

## Subtask folders

| # | Folder | Mission | Depends on |
| --- | --- | --- | --- |
| 00 | `00-foundation/` | Repo, tooling, TypeScript config, lint/format, base CI | — |
| 01 | `01-design-system/` | Brand tokens, typography, component library | 00 |
| 02 | `02-cms-schema/` | Sanity content models, editorial workflow | 00 |
| 03 | `03-core-pages/` | Home, About, Mission, FAQ, Chapters, Ideas, Catholic Scientists of the Past | 01, 02 |
| 04 | `04-news/` | News & Announcements list, post detail, RSS | 01, 02 |
| 05 | `05-events/` | Calendar, event detail, Gold Masses, RSVPs, iCal | 01, 02, 07 |
| 06 | `06-conferences/` | Conference archive, video archive, registration | 01, 02, 08 |
| 07 | `07-membership/` | Auth, application flow, member portal, directory, dues | 00, 01 |
| 08 | `08-donations/` | Stripe-powered one-time and recurring donations | 00, 01 |
| 09 | `09-search-discovery/` | Site search, tag/category filtering | 02, 03, 04 |
| 10 | `10-seo-analytics/` | SEO, sitemaps, structured data, analytics | 03 |
| 11 | `11-deployment/` | Vercel project, environments, monitoring, CI/CD | 00 |
| 12 | `12-content-migration/` | Audit, extract, transform, import existing site content | 02 |
| 13 | `13-launch-qa/` | Testing strategy, a11y audit, perf budget, go-live checklist | all |

## How to delegate a subtask

Open `DELEGATION_GUIDE.md` for the full workflow. The short version: each folder's `README.md` contains a ready-to-paste "Agent Brief" with mission, inputs, deliverables, acceptance criteria, and out-of-scope guardrails. Hand the agent a pointer to `/Catholic Scientist Project/<folder>/README.md` plus the relevant top-level docs listed in that brief.

## Workflow rule (read before starting any work)

Every change ships as a **pull request** against `main` on [github.com/jkuebler3510/catholic-scientist-project](https://github.com/jkuebler3510/catholic-scientist-project). Multiple agents will be working in parallel; Joe reviews and merges every PR himself.

The flow: branch (`feat/`, `fix/`, `chore/`, `docs/`, `refactor/` prefix, kebab-case) → commit (Conventional Commits) → push → open a PR with the required description template → wait for Joe's review → Joe merges (squash). **Agents never merge their own PRs.** Full rules and the PR description template live in `DELEGATION_GUIDE.md`.

## Status

This is the **planning phase**. No code has been written yet. Every folder contains specifications, contracts, and design docs that the implementing agents will turn into a working codebase.
