# 11 — Deployment & Infrastructure

## Mission

Set up Vercel, the Postgres database, environments (dev, preview, production), DNS, monitoring hooks, and the CI/CD pipeline that ties them together.

## Why this matters

Code that works locally but won't deploy is worth nothing. This folder makes sure every PR previews on a real URL, every merge promotes safely, and every prod incident is observable.

## Inputs (read these first, in order)

1. `/README.md`
2. `/ARCHITECTURE.md` — "Environments" section
3. `/TECH_DECISIONS.md` — "Hosting" section
4. `00-foundation/env-vars.md` — full inventory
5. `vercel-setup.md`
6. `environments.md`
7. `dns-and-domain.md`
8. `monitoring.md`
9. `ci-cd.md`

## Deliverables

- A Vercel project linked to the GitHub repo, with `apps/web` as the root.
- A second deploy target for `apps/studio` (Sanity manage tier or also on Vercel).
- Three environments: development, preview, production. Each with its own:
  - Sanity dataset
  - Stripe API keys (test for dev/preview, live for production)
  - Clerk instance (development for dev/preview, production for production)
  - Neon database (branched per env)
  - Resend domain
- DNS configured: `catholicscientists.org` and `www.catholicscientists.org` pointed at Vercel; `studio.catholicscientists.org` pointed at the Studio.
- Email DNS records: SPF, DKIM, DMARC for sending from `catholicscientists.org`.
- Vercel deploy hooks configured for Sanity webhooks (revalidation already lives in code, but Sanity → Vercel deploy hooks are the secondary failsafe).
- `infra/vercel/vercel.json` minimum config (security headers, redirects, function regions).
- A runbook for: rolling back a deploy, rotating Clerk keys, rotating Stripe keys, restoring Postgres from PITR.

## Acceptance criteria

- [ ] A new PR creates a preview deployment on a `*.vercel.app` URL with the staging dataset.
- [ ] A merge to `main` promotes to `catholicscientists.org`.
- [ ] All env vars are set in Vercel for each env, sourced from a sealed `.env` checked into a 1Password vault (or equivalent).
- [ ] Sentry is receiving events from preview and production.
- [ ] DNS resolves correctly: root, `www`, `studio`.
- [ ] Email sender domain authenticates: SPF pass, DKIM pass, DMARC pass.
- [ ] The runbook is reviewed by at least one other engineer.

## Out of scope

- The application code itself — this folder is infrastructure only.
- Ongoing SRE / on-call (the SCS team's responsibility post-launch).

## Dependencies

| Folder | What we need |
| --- | --- |
| `00-foundation` | The repo, env-var inventory |
| Every page-owning folder | Their build must pass before they can be deployed |

## Open questions

- Studio hosting: Sanity's managed deploy or self-hosted on Vercel? Recommendation: Sanity-managed (zero ops). Custom domain via CNAME.
- Function region: Vercel default (`iad1`). For SCS's primarily US/EU audience, single-region is fine; consider multi-region only if metrics show TTFB > 800ms in EU.

## Suggested agent prompt

> You are setting up the deployment, environments, DNS, monitoring, and CI/CD for the Society of Catholic Scientists website rebuild on Vercel.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/ARCHITECTURE.md`
> 3. `/Catholic Scientist Project/00-foundation/env-vars.md`
> 4. Every `.md` in `/Catholic Scientist Project/11-deployment/`.
>
> **Your job.** Provision Vercel, Neon, Sanity, Clerk, Stripe, Resend, Sentry across three environments. Configure DNS. Wire CI/CD so PRs preview-deploy automatically and `main` promotes to production. Author the runbook.
>
> **Acceptance.** Preview deploys on PRs, prod deploys on merge, env parity verified, Sentry receives test events, the runbook is reviewed.
