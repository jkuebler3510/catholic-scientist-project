# CI/CD

## Pipeline

GitHub Actions runs CI; Vercel runs the deploy. They overlap intentionally — Vercel verifies the build, GitHub Actions verifies the tests.

Repo: **[github.com/jkuebler3510/catholic-scientist-project](https://github.com/jkuebler3510/catholic-scientist-project)**.

## `.github/workflows/ci.yml`

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm test --coverage
      - run: pnpm build
        env:
          NEXT_PUBLIC_SITE_URL: https://catholicscientists.org
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: staging
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${{ secrets.CLERK_PUBLISHABLE_KEY_DEV }}
          # ... others
```

## `.github/workflows/e2e.yml`

Runs Playwright against the Vercel preview URL once Vercel reports the deploy ready (via `vercel-actions/await-for-deployment` or polling).

```yaml
name: E2E
on:
  deployment_status:
jobs:
  e2e:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm e2e
        env:
          BASE_URL: ${{ github.event.deployment_status.target_url }}
```

## `.github/workflows/migrate.yml`

Production migrations gate. Triggered manually after a `main` merge that includes new migrations:

```yaml
name: DB migrate (prod)
on:
  workflow_dispatch:
jobs:
  migrate:
    runs-on: ubuntu-latest
    environment: production       # GitHub manual approval
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm db:migrate:prod
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_PROD }}
```

The `production` environment in GitHub requires reviewers to approve before the job runs.

## Branch protection on `main`

- Require a passing CI run.
- Require at least one approving review.
- No direct pushes; PRs only.
- Squash merging only.

## Pre-push (lightweight)

Husky doesn't run typecheck/test pre-push. Rely on CI. Pre-commit only runs lint-staged on changed files (see `00-foundation/tooling.md`).

## Deployments

Vercel handles deploys. Preview per PR. Production on `main`. We do not use GitHub Actions to deploy.

## Cache

- Turborepo's local cache covers most of CI's repetition.
- pnpm store cache via `pnpm/action-setup`.
- Playwright browser cache (`~/.cache/ms-playwright`) cached between runs.
