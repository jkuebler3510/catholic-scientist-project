# Architecture

This document describes the overall system architecture for the Society of Catholic Scientists website. It is the canonical reference that every subtask agent should read before writing code.

## System diagram (logical)

```
                ┌──────────────────────────────────────┐
                │            Sanity Studio              │
                │   (content editors author here)       │
                └──────────────┬───────────────────────┘
                               │ GROQ / CDN
                               ▼
┌────────────┐    ┌────────────────────────────────────┐    ┌──────────────┐
│  Visitor   │───▶│   Next.js App (Vercel, Edge+SSR)    │───▶│    Clerk     │
│ (browser)  │    │   App Router · RSC · Route Handlers │    │ (auth/users) │
└────────────┘    └─────┬────────────────────┬─────────┘    └──────────────┘
                        │                    │
                        ▼                    ▼
                  ┌──────────┐         ┌────────────┐
                  │  Stripe  │         │  Postgres  │
                  │ (dues +  │         │  (Neon /   │
                  │ donations)│        │  Supabase) │
                  └──────────┘         └────────────┘
                                              ▲
                                              │
                                       member directory,
                                       RSVPs, applications
```

## Layered responsibilities

**Presentation layer.** Next.js App Router with React Server Components by default. Static rendering for public marketing/content pages; dynamic rendering only where personalization or auth is required (member portal, RSVP flows, admin views). Tailwind for styling, shadcn/ui for accessible primitives, Radix under the hood.

**Content layer.** Sanity is the single source of truth for all editorial content: news posts, event records, conference pages, biographies of Catholic scientists of the past, chapters, FAQ entries, and structured marketing blocks for the home page. The Next.js app reads from Sanity via GROQ at build time (ISR) and via the live preview API in the Studio.

**Identity layer.** Clerk owns authentication, sessions, and the user object. Member-specific application data (PhD field, institution, dues status, directory opt-in, RSVPs) lives in our own Postgres and is keyed by the Clerk `userId`.

**Commerce layer.** Stripe Checkout for one-time donations and the membership dues flow. Stripe Customer Portal for managing recurring contributions. Webhooks update Postgres dues status; the member portal reads that status to gate member-only content.

**Data layer.** Postgres (Neon or Supabase Postgres) for relational application data: member profiles, RSVPs, dues ledger, application submissions, audit logs. Drizzle or Prisma as the ORM (decision deferred to `00-foundation`). Sanity remains the system of record for editorial content; do not mirror Sanity into Postgres.

**Search layer.** v1 uses Sanity's GROQ + a thin client-side filter for site search. If volume warrants it, swap in Algolia or Typesense in phase 2 — the search interface is abstracted in `09-search-discovery`.

## Rendering strategy

| Surface | Strategy | Why |
| --- | --- | --- |
| Home page | SSG with revalidation (60s) | Mostly static, occasional content updates |
| News list/detail | SSG with on-demand revalidation | Updated when editors publish in Sanity |
| Event list/detail | SSG with on-demand revalidation | Same, plus webhook on calendar publish |
| Calendar (interactive) | SSR + RSC, hydrated client island | Date filtering needs URL state |
| Biographies | SSG (rebuild on Sanity webhook) | Stable historical content |
| Member portal | SSR (per-request, auth-gated) | Personalized, never cacheable |
| Application form | SSR + Server Actions | Form submission with validation |
| Donation/dues flow | SSR + Stripe redirect | Server creates Checkout session |
| Sitemap, RSS, iCal feeds | Route Handlers, SSG | Cacheable per content version |

## Directory layout (target)

```
apps/
  web/                          # Next.js application
    app/
      (marketing)/              # public, statically rendered
      (account)/                # auth-gated member portal
      (admin)/                  # staff-only admin views
      api/
        webhooks/
          stripe/
          sanity/
          clerk/
        rsvp/
        search/
    components/
      ui/                       # shadcn primitives
      blocks/                   # CMS-driven page blocks
      layout/
    lib/
      sanity/                   # client, queries, types
      clerk/
      stripe/
      db/                       # Drizzle/Prisma schema + client
      analytics/
      seo/
    styles/
    public/
  studio/                       # Sanity Studio (separately deployable)
    schemas/
    desk-structure/
    plugins/
packages/
  config/                       # shared eslint, tsconfig, tailwind preset
  emails/                       # React Email templates (welcome, dues receipt)
infra/
  vercel/                       # vercel.json, env templates
  github/                       # workflows
docs/                           # mirrors this planning folder post-implementation
```

The monorepo is managed with **pnpm workspaces** + **Turborepo**. The Sanity Studio lives in the same repo so schema changes are reviewed alongside the code that consumes them.

## Data contracts

The CMS schema (`02-cms-schema/`) defines the canonical TypeScript types via `sanity-codegen`. Every consuming page (`03` through `06`) imports types from `lib/sanity/types.ts`. No subtask should hand-roll a content shape — if a field is missing, file an issue against `02-cms-schema`.

The Postgres schema (`07-membership/`) similarly publishes Drizzle types from `lib/db/schema.ts`. Server Actions and Route Handlers must use those types end-to-end.

## Environments

| Environment | Branch | URL | Sanity dataset | Stripe | Clerk |
| --- | --- | --- | --- | --- | --- |
| Local | any | localhost:3000 | `development` | test mode | dev instance |
| Preview | PR branches | `*.vercel.app` | `staging` | test mode | dev instance |
| Production | `main` | `catholicscientists.org` | `production` | live mode | prod instance |

Full env-var inventory lives in `00-foundation/env-vars.md`.

## Cross-cutting concerns

**Accessibility.** WCAG 2.2 AA target. Every component in `01-design-system` has documented keyboard, screen-reader, and color-contrast requirements. Pa11y or axe-core runs in CI.

**Performance.** Lighthouse perf budget: ≥ 95 mobile, ≥ 98 desktop on the home page. LCP < 2.0s on 4G. Set in `13-launch-qa/performance-budget.md`.

**Internationalization.** Out of scope for v1. All copy in English. Architecture leaves room for `next-intl` to be added later (no hard-coded URLs that would break locale routing).

**SEO.** Per-route metadata via Next.js `generateMetadata`. JSON-LD for Article, Event, Person (biographies), and Organization. Detailed in `10-seo-analytics`.

**Observability.** Vercel Analytics + Sentry for error tracking. Logflare or Vercel Logs for request logs. Defined in `11-deployment/monitoring.md`.

**Security.** All forms protected by Clerk session or Turnstile (for unauthenticated submissions). Stripe webhook signatures verified. Sanity webhook signatures verified. CSP headers configured in `next.config.js`.

## Key non-negotiables

1. **No client-side fetching of Sanity.** All content reads happen in Server Components or Route Handlers.
2. **No business logic in components.** Use Server Actions or Route Handlers; components render.
3. **Every page must work without JavaScript** for the core content path (links, forms, navigation). Interactivity layered on top.
4. **No images that aren't through `next/image`.** No exceptions.
5. **No untyped `any` crossing a module boundary.**

## Open architectural questions

- Drizzle vs. Prisma for the Postgres ORM — decided in `00-foundation`.
- Use Vercel KV for the rate-limit / Turnstile state, or Upstash Redis — decided in `00-foundation`.
- Whether to expose a member-directory search backed by Postgres or by piping to Algolia — decided after measuring v1 traffic in `09-search-discovery`.
