# Repository setup

## Repository

GitHub: **[github.com/jkuebler3510/catholic-scientist-project](https://github.com/jkuebler3510/catholic-scientist-project)**

The foundation agent should clone this repo and initialize the monorepo inside it. Default branch is `main`; protect it per the rules in this document and in `11-deployment/ci-cd.md`.

## Package manager

**pnpm** (≥ 9). Reason: best workspace support, content-addressed store, fast installs on CI. Lockfile is committed.

## Workspace layout

```
/
  apps/
    web/                  # Next.js
    studio/               # Sanity Studio v3
  packages/
    config/               # eslint, tsconfig, tailwind, prettier, vitest presets
    emails/               # React Email templates (empty placeholder)
    ui/                   # ← optional, decided in 01-design-system
  .github/
    workflows/
      ci.yml
      e2e.yml
  .changeset/             # if we adopt changesets later
  .vscode/
    settings.json
    extensions.json
  pnpm-workspace.yaml
  turbo.json
  package.json
  tsconfig.base.json
  README.md
```

## Turborepo

Pipelines defined in `turbo.json`:

- `dev` — runs Next.js and Studio together
- `build` — builds web + studio in dependency order
- `typecheck` — `tsc --noEmit` in every package
- `lint` — `eslint .` in every package
- `test` — `vitest run` in every package that has tests
- `e2e` — Playwright in `apps/web` only

Cache the build, typecheck, lint, and test outputs. Set `TURBO_REMOTE_CACHE` only when a remote cache is provisioned.

## Node and tooling versions

- Node: 20 LTS, pinned with `engines` in root `package.json` and a `.nvmrc`.
- pnpm: 9.x, pinned with `packageManager` in root `package.json`.
- TypeScript: 5.4+ in `packages/config`, consumed by every workspace.

## Editor config

- `.editorconfig` — LF line endings, 2-space indent, trim trailing whitespace.
- `.vscode/extensions.json` recommends: ESLint, Prettier, Tailwind CSS IntelliSense, Sanity v3.
- `.vscode/settings.json` enables format-on-save, ESLint as the formatter for `.ts/.tsx/.js`, Tailwind class sorting.

## Conventional Commits

- `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`, `build:`, `ci:`.
- Optional scope after the type: `feat(news): paginate the index`.
- Enforced via `commitlint` + a Husky `commit-msg` hook (lightweight, just commitlint — no other hooks).

## Branch model

- `main` — deploys to production. Agents push here directly for small isolated changes (typo fixes, dep bumps, single-file edits) and merge their own feature-branch PRs once CI is green. **There is no human review gate** — see `DELEGATION_GUIDE.md` for the workflow rule.
- Feature branches (encouraged for any non-trivial change):
  - `feat/<short-description>` — new feature
  - `fix/<short-description>` — bug fix
  - `chore/<short-description>` — tooling/config
  - `docs/<short-description>` — docs only
  - `refactor/<short-description>` — restructure, no behavior change
- Branch protection on `main`:
  - **Passing CI required** — typecheck, lint, format, tests. **CI is the gate, not a human reviewer.**
  - **No force-pushes to `main`.**
  - Squash-merge only on PRs (no merge commits, no rebase-merges).
  - Auto-delete branches on merge.
  - Linear history.
  - Direct commits to `main` are *allowed* for small changes; CI still runs on the push.
- The foundation agent configures these protections on `main` as part of the initial repo setup.

PR template (used when an agent opens a PR for non-trivial work — most common case): the foundation agent commits a `.github/pull_request_template.md` mirroring the brief description template in `DELEGATION_GUIDE.md` (What & why / How to verify / Acceptance checklist / Screenshots).
