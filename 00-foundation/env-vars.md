# Environment variables

The complete inventory the app will need. `00-foundation` owns the `.env.example` template; downstream folders fill in the values they need at the time they wire up the integration.

## Naming convention

- `NEXT_PUBLIC_*` — exposed to the browser. Use only for non-secret identifiers.
- Everything else is server-only.
- Group with a comment header per integration. Order alphabetical within a group.

## The variables

```bash
# ── App ─────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=                # https://catholicscientists.org or preview URL
NODE_ENV=development                 # set by the runtime
APP_ENV=development                  # one of: development | preview | production

# ── Sanity ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=          # development | staging | production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-01
SANITY_API_READ_TOKEN=               # server-side token for draft reads
SANITY_REVALIDATE_SECRET=            # shared secret for the revalidation webhook

# ── Clerk ───────────────────────────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=                # for /api/webhooks/clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/account
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/account

# ── Stripe ──────────────────────────────────────────────────────────────────
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_DUES_PRICE_ID=                # set after creating the dues product
STRIPE_DONATION_PRODUCT_ID=

# ── Database (Neon Postgres) ────────────────────────────────────────────────
DATABASE_URL=                        # pooled connection (?pgbouncer=true)
DATABASE_DIRECT_URL=                 # direct connection for migrations

# ── KV / rate limiting (Upstash Redis) ──────────────────────────────────────
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# ── Email (Resend) ──────────────────────────────────────────────────────────
RESEND_API_KEY=
RESEND_FROM_EMAIL="Society of Catholic Scientists <noreply@catholicscientists.org>"
RESEND_REPLY_TO_EMAIL=membership@catholicscientists.org

# ── Turnstile (anti-spam on public forms) ───────────────────────────────────
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# ── Analytics / monitoring ──────────────────────────────────────────────────
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=     # auto-injected on Vercel; explicit override
SENTRY_DSN=
SENTRY_AUTH_TOKEN=                   # for source map uploads
NEXT_PUBLIC_SENTRY_DSN=
```

## Validation

In `apps/web/lib/env.ts`, validate at boot using `zod`:

```ts
const env = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  SANITY_API_READ_TOKEN: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  // …
}).parse(process.env);
```

Imported lazily on the server. Public vars validated separately in `lib/env.public.ts` so they can be safely referenced from client code.

## Secret management

- Local: `.env.local`, never committed.
- Preview/Production: Vercel project env vars (managed in `11-deployment`).
- Rotated quarterly for any user-facing service (Clerk, Stripe, Resend).
