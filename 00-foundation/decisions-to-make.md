# Decisions Made in Foundation Phase

**Status: CLOSED.** All open decisions have been resolved and documented below.

## 1. ORM: Drizzle vs. Prisma — DECIDED: Drizzle

**Final Decision: Drizzle, with `drizzle-kit` for migrations and the Neon HTTP driver for production.**

Rationale: TypeScript-first design with no codegen step; lighter runtime suitable for edge/serverless; schema-as-code maps naturally to SQL; edge-compatible drivers available for Neon. The slightly smaller community is mitigated by Drizzle's strong momentum in 2024/2025.

Dependencies:

- `drizzle-orm` and `drizzle-kit` installed in Wave 2 when `07-membership` is implemented
- `@neon-http/client` for production HTTP driver
- See `07-membership/database.md` for schema scaffolding

## 2. KV / rate-limit store: Upstash Redis vs. Vercel KV — DECIDED: Upstash Redis

**Final Decision: Upstash Redis.**

Rationale: Portability across hosting platforms is critical. Vercel KV would lock us into Vercel's ecosystem; Upstash Redis works everywhere and has first-class `@upstash/ratelimit` integration. Generous free tier suitable for v1 launch.

## 3. Component library structure: collocated vs. `packages/ui`

The design system (`01-design-system`) needs to decide whether shared components live in `apps/web/components/` or in a separate `packages/ui` workspace.

**Recommendation: collocated** in `apps/web/components/` for v1. We have one consumer; a dedicated package adds build complexity without payoff. Promote to `packages/ui` only if a second consumer (Sanity Studio's preview, or a future mobile app) materializes.

## 4. Email package timing

`packages/emails` should be scaffolded empty in foundation, populated by `07-membership` and `08-donations` when they need their respective templates. Foundation just makes sure React Email is installed and an example template renders.

---

Once these are resolved, this file should be marked **closed** at the top, and any decisions changed in `TECH_DECISIONS.md` propagated.
