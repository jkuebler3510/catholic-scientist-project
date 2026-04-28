# 00 — Foundation

## Mission

Stand up the Next.js + TypeScript monorepo, tooling, base configuration, and CI scaffolding that every other subtask will build on.

## Why this matters

This is the substrate. If TypeScript, lint, formatting, package management, or CI are configured wrong, every downstream agent inherits the pain. Get this right and every subsequent folder's work is just feature work.

## Inputs (read these first, in order)

1. `/README.md`
2. `/ARCHITECTURE.md` — especially "Directory layout" and "Environments"
3. `/TECH_DECISIONS.md` — full document
4. `tooling.md`
5. `repo-setup.md`
6. `env-vars.md`
7. `decisions-to-make.md`

## Deliverables

A monorepo at the root of the implementation repo with:

- `pnpm` workspaces + Turborepo configuration.
- `apps/web/` — Next.js 14+ (App Router), TypeScript strict mode.
- `apps/studio/` — Sanity Studio v3, sharing types with `apps/web`.
- `packages/config/` — shared `eslint.config.js`, `tsconfig.base.json`, `tailwind.preset.ts`, `prettier.config.js`.
- `packages/emails/` — empty React Email package, ready for `07-membership` and `08-donations` to fill.
- `.github/workflows/ci.yml` — typecheck, lint, format-check, unit tests on every PR.
- `.github/workflows/e2e.yml` — Playwright on PR (allowed to fail until pages exist).
- `.env.example` enumerating every variable the app will need (see `env-vars.md`).
- `vercel.json` minimum config.
- `.github/pull_request_template.md` with the PR description template from `DELEGATION_GUIDE.md`.
- `.github/CODEOWNERS` listing Joe as the required reviewer for every path.
- Branch protection rules configured on `main` per `repo-setup.md`.
- A working `pnpm dev` that boots Next.js and the Studio side-by-side.
- Decisions made and documented for: ORM (Drizzle vs. Prisma), rate-limit / KV store (Vercel KV vs. Upstash Redis).
- `CONTRIBUTING.md` covering branch naming, commit style (Conventional Commits), and the PR checklist.

## Acceptance criteria

- [ ] `pnpm install` from a fresh clone succeeds.
- [ ] `pnpm dev` boots both apps with no errors.
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` all green.
- [ ] CI runs the same four commands on a sample PR and passes.
- [ ] TypeScript is in strict mode (`strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`).
- [ ] ESLint config enforces no `any` at module boundaries (use `@typescript-eslint/no-explicit-any` with `ignoreRestArgs: true`).
- [ ] No app-specific feature code in this folder (no pages, no schemas).
- [ ] Decision records added for ORM and KV in `decisions-to-make.md` resolving each open item.

## Out of scope

- Any actual page, component, schema, or business logic.
- Vercel project creation (lives in `11-deployment`).
- Auth, payments, CMS wiring (lives in respective folders).
- Design tokens — `01-design-system` owns the Tailwind theme; this folder stops at the empty preset.

## Dependencies

None. This folder unblocks everything else.

## Open questions

- ORM: **Drizzle** is the recommendation (better TypeScript inference, lighter runtime, edge-compatible). Confirm in `decisions-to-make.md`.
- KV store: **Upstash Redis** recommended over Vercel KV for portability.

## Suggested agent prompt

> You are setting up the foundation for the Society of Catholic Scientists website rebuild — a Next.js 14 App Router + TypeScript monorepo.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/TECH_DECISIONS.md`
> 4. Every `.md` file in `/Catholic Scientist Project/00-foundation/`.
>
> **Your job.** Initialize a pnpm + Turborepo monorepo with `apps/web` (Next.js), `apps/studio` (Sanity Studio v3 stub), and `packages/config`. Wire up TypeScript strict mode, ESLint flat config, Prettier, Vitest, and Playwright. Create `.github/workflows/ci.yml`. Document every environment variable in `.env.example`. Resolve the two open decisions (ORM, KV) and record them in `decisions-to-make.md`. Do not write any feature code.
>
> **Acceptance.** `pnpm install`, `pnpm dev`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, and the CI workflow all pass on a fresh clone.
>
> **When you finish,** post the file tree and confirm each acceptance item.
