# Contributing to Society of Catholic Scientists Website

This document outlines our workflow, commit practices, and PR review expectations.

## Workflow

We use **feature branches** for non-trivial work and **direct commits to `main`** for small, isolated changes (typos, single-file edits, dependency bumps). Every change must pass CI before landing.

### Branch naming

- `feat/<description>` — new feature (e.g., `feat/04-news-rss-feed`)
- `fix/<description>` — bug fix (e.g., `fix/events-timezone`)
- `chore/<description>` — tooling, dependencies, config
- `docs/<description>` — documentation only
- `refactor/<description>` — restructure, no behavior change

Include the subtask folder number if relevant: `feat/04-news-rss-feed`.

### Commits (Conventional Commits)

Every commit message starts with one of:

- `feat:` — new feature or capability
- `fix:` — bug fix
- `chore:` — tooling, dependencies, config
- `docs:` — documentation only
- `refactor:` — restructure with no behavior change
- `test:` — tests only
- `perf:` — performance improvement
- `build:` / `ci:` — build system or CI config

Rules:

1. **Subject line ≤ 72 chars, imperative mood** ("add", not "added"). No trailing period.
2. **One logical change per commit.** Don't bundle a refactor with a feature.
3. **Body required when subject isn't enough.** Wrap at 72 chars. Explain _why_, not just _what_.

### Good commit example

```
feat(news): add RSS 2.0 feed at /news/feed.xml

Implements the RSS deliverable from 04-news/rss-feeds.md. Returns
the latest 50 posts as a validated RSS 2.0 document with proper
content-type, atom:link self-reference, and content:encoded body.

Cache tag `post:list` revalidates the feed when new posts publish.
```

### Bad commit example

```
update news stuff
```

## Pull requests

**For non-trivial work:** Open a PR when you push your feature branch. The Vercel preview deploy will run automatically.

**For small changes:** You can commit directly to `main`.

When you open a PR, include:

- **What & why:** One or two sentences + link to the subtask folder
- **How to verify:** Steps to spot-check on the preview
- **Acceptance checklist:** Items from the folder's acceptance criteria
- **Screenshots:** For UI changes

## Merging

- **Squash-merge your own PR** once CI is green (or `--no-ff` merge if you prefer preserving individual commits, per team preference).
- **No force-pushes to `main`.** Force-pushing to your own feature branch is fine.
- **Delete the branch after merge.**

## CI gates

CI must pass before a commit lands on `main`. The following run on every PR:

- `pnpm typecheck` — TypeScript
- `pnpm lint` — ESLint
- `pnpm format:check` — Prettier
- `pnpm test` — Unit tests
- Vercel preview build

If CI fails, fix the issue and push a new commit. Don't disable rules to land work.

## Code quality

- TypeScript: strict mode, zero `any` crossing module boundaries
- ESLint: zero warnings
- Prettier: auto-formatted
- Tests: critical paths covered; coverage trend doesn't fall
- Docs: updated alongside code
