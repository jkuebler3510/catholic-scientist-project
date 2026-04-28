# Decisions to make in the foundation phase

The agent working on `00-foundation` is responsible for resolving these and writing the rationale into this file before passing the work downstream.

## 1. ORM: Drizzle vs. Prisma

**Recommendation: Drizzle.**

Pros (Drizzle): TypeScript-first, no codegen step, lighter runtime (matters on edge/serverless), schema-as-code reads like SQL, edge-compatible drivers exist for Neon. Migrations via `drizzle-kit`.

Pros (Prisma): More mature ecosystem, friendlier query API for newcomers, excellent DX with Prisma Studio.

Cons (Drizzle): Smaller community, schema migration story slightly less polished. Mitigated by Drizzle's strong direction in 2024/2025.

Cons (Prisma): Prisma Client query engine has a startup cost on serverless; the new `prisma/client` driver adapters reduce but don't eliminate this.

**Decision (final, please confirm):** Drizzle, with `drizzle-kit` for migrations and the Neon HTTP driver for production.

## 2. KV / rate-limit store: Upstash Redis vs. Vercel KV

**Recommendation: Upstash Redis.**

Pros (Upstash): Portable across hosts, generous free tier, official Next.js integration, used heavily by `@upstash/ratelimit`.

Pros (Vercel KV): Integrated billing, same dashboard as the rest of the project.

Reason to prefer Upstash: portability. We don't want to be unable to migrate off Vercel later because we've embedded Vercel-specific data services.

**Decision (final, please confirm):** Upstash Redis.

## 3. Component library structure: collocated vs. `packages/ui`

The design system (`01-design-system`) needs to decide whether shared components live in `apps/web/components/` or in a separate `packages/ui` workspace.

**Recommendation: collocated** in `apps/web/components/` for v1. We have one consumer; a dedicated package adds build complexity without payoff. Promote to `packages/ui` only if a second consumer (Sanity Studio's preview, or a future mobile app) materializes.

## 4. Email package timing

`packages/emails` should be scaffolded empty in foundation, populated by `07-membership` and `08-donations` when they need their respective templates. Foundation just makes sure React Email is installed and an example template renders.

---

Once these are resolved, this file should be marked **closed** at the top, and any decisions changed in `TECH_DECISIONS.md` propagated.
