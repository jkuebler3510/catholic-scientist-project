# Environments

## Three environments, full parity

| Service | Development | Preview | Production |
| --- | --- | --- | --- |
| Vercel | local `pnpm dev` | `*.vercel.app` (per PR) | `catholicscientists.org` |
| Sanity | dataset `development` | dataset `staging` | dataset `production` |
| Postgres (Neon) | branch `dev` | branch `preview-<pr>` | branch `main` |
| Clerk | dev instance | dev instance | prod instance |
| Stripe | test mode | test mode | live mode |
| Resend | dev domain | dev domain | `catholicscientists.org` |
| Sentry | environment `dev` | `preview` | `production` |

## Branching the database

Neon supports branching the production schema for preview deploys. Configure the Vercel-Neon integration so each PR gets a Postgres branch automatically; the branch is destroyed on PR close.

This means preview deploys never touch real member data and never block production with migrations.

## Promotion process

1. Open a PR against `main`.
2. CI runs typecheck, lint, unit tests, e2e, perf budget.
3. Vercel creates a preview deploy on the PR's Postgres branch and Sanity `staging` dataset.
4. Reviewer eyeballs the preview, reviews code, approves.
5. Merge to `main` (squash-merge).
6. Vercel runs the production build.
7. Postgres migrations: a separate `pnpm db:migrate:prod` job runs after build, before traffic switch. Manual approval required (configurable per project in Vercel).
8. Traffic switches to the new build.

Rollback: re-promote the previous deployment via Vercel UI; revert the migration manually if needed.

## Migration safety

Every migration must be:

- Backwards-compatible with the previous deployed code (so a partial deploy doesn't break).
- Reviewed in the PR.
- Tested by running against the preview branch first.

For destructive migrations (drop column, drop table), use the two-deploy pattern: deploy the code that no longer reads/writes the column → next deploy drops it.

## Secrets

- Stored in Vercel project settings (per environment).
- Mirrored in 1Password "SCS Engineering" vault for break-glass access.
- Rotated quarterly.
- Never committed to the repo.

## Per-environment behavior

- `APP_ENV` env var distinguishes (since `NODE_ENV` is `production` for both preview and production builds).
- Use `APP_ENV !== 'production'` to gate things like the "Preview banner", debug logging, dev-only routes (`/dev/*`), and any indexing toggle (preview is `noindex`).

## DNS-attached environments (deferred)

Vercel supports staging URLs (e.g., `staging.catholicscientists.org` pointing to a specific deployment). Defer; preview deploys at `*.vercel.app` are sufficient for v1.
