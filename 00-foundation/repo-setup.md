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

- `main` — protected, deploys to production. **No direct commits ever.**
- Feature branches per the workflow rule in `DELEGATION_GUIDE.md`:
  - `feat/<short-description>` — new feature
  - `fix/<short-description>` — bug fix
  - `chore/<short-description>` — tooling/config
  - `docs/<short-description>` — docs only
  - `refactor/<short-description>` — restructure, no behavior change
- Every change is a pull request against `main`. **Joe (project owner) reviews and merges every PR.** Agents never merge their own work.
- Branch protection on `main` requires:
  - Passing CI (typecheck, lint, tests, format).
  - Successful Vercel preview deploy.
  - Up-to-date with `main` before merge.
  - Squash-merge only — no merge commits, no rebase-merges.
  - Linear history.
  - Branch deletion on merge (auto).
- The foundation agent must configure these protections on `main` as part of the initial repo setup.

PR template: see `DELEGATION_GUIDE.md` for the required PR description sections (What / Why / How to verify / Acceptance checklist / Out of scope / Screenshots). The foundation agent should commit a `.github/pull_request_template.md` matching it.
