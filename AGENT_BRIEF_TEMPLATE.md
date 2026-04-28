# Agent Brief Template

Copy this file as the starting `README.md` for any new subtask folder. Replace bracketed placeholders.

---

# [Folder name] — [Mission in five words]

## Mission

[One sentence: what this subtask delivers, in active voice. "Implement the news index and detail pages, including RSS, with full Sanity wiring."]

## Why this matters

[Two to four sentences of context. Why does this exist? What user problem does it solve? What does the rest of the project assume about this slice once it's done?]

## Inputs (read these first, in order)

1. `/README.md`
2. `/ARCHITECTURE.md` (sections relevant to this work)
3. `/DESIGN_PRINCIPLES.md`
4. `/TECH_DECISIONS.md` (sections relevant to this work)
5. `/INFORMATION_ARCHITECTURE.md` (the URL rows owned by this folder)
6. `[/NN-dependency-folder/README.md]` for each upstream folder
7. The other `.md` files in this folder, in the order listed in "Deliverables"

## Deliverables

Concrete artifacts, with target paths in the implementation repo:

- `apps/web/app/...` — [what this route owns]
- `apps/web/components/...` — [components introduced]
- `apps/web/lib/...` — [helpers, queries, types introduced]
- `apps/studio/schemas/...` — [if this subtask owns schemas]
- Tests — [unit + e2e expectations]
- Docs — [updates to this folder's `.md` files if architecture shifts]

## Acceptance criteria

A checklist that the agent (and the reviewer) can verify objectively:

- [ ] [Routes exist and render correct data from the CMS.]
- [ ] [Forms validate on client + server.]
- [ ] [Lighthouse perf ≥ 95 on the new routes.]
- [ ] [axe-core clean on the new routes.]
- [ ] [E2E test added covering the primary flow.]
- [ ] [Documentation in this folder updated to reflect what was actually built.]

## Out of scope

Make these explicit so the agent doesn't drift:

- [Building things owned by other folders.]
- [Performance work beyond the per-route budget.]
- [Migrating existing content (lives in `12-content-migration`).]

## Dependencies

| Folder | What we need from it |
| --- | --- |
| `00-foundation` | Repo, tooling, CI |
| `01-design-system` | Components used here: [list] |
| `02-cms-schema` | Types used here: [list] |
| `[other]` | [why] |

## Open questions

- [Question 1 — who decides, by when]
- [Question 2 — same]

## Suggested agent prompt

> You are implementing the [name] subsystem for the Society of Catholic Scientists website rebuild.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/DESIGN_PRINCIPLES.md`
> 4. `/Catholic Scientist Project/TECH_DECISIONS.md`
> 5. `/Catholic Scientist Project/INFORMATION_ARCHITECTURE.md`
> 6. `/Catholic Scientist Project/[this folder]/README.md`
> 7. The other `.md` files in this folder.
> 8. Each dependency folder's `README.md`.
>
> **Your job.** [One paragraph restating mission + scope.]
>
> **Constraints.** Next.js 14 App Router + TypeScript. Tailwind + shadcn/ui. Sanity for content. Clerk for auth. Stripe for payments. Vercel hosting. Server Components by default. WCAG 2.2 AA. Lighthouse perf ≥ 95.
>
> **Deliverables.** [Bullet list mirroring the Deliverables section above.]
>
> **Acceptance.** [Mirror the checklist above.]
>
> **Out of scope.** [Mirror.]
>
> **When you finish,** post a summary listing every file created or changed, every route added, every test added, and any open questions you escalated.
