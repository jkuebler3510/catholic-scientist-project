# Security checklist

## Headers

Set in `next.config.js`:

- `Content-Security-Policy` with strict-dynamic + nonce (no `'unsafe-inline'` for scripts; styles allow inline because Tailwind requires it).
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (verify HSTS preload after launch).
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` (or `frame-ancestors 'none'` in CSP).
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` (no use cases yet).

## Auth

- Clerk middleware protects every `/account/*` and `/admin/*` route.
- Session cookies are HttpOnly, Secure, SameSite=Lax (Clerk default).
- 2FA required for `admin` and `board` roles; encouraged for everyone.

## Webhooks

- Stripe webhook: signature verified with `STRIPE_WEBHOOK_SECRET`. Reject anything that fails.
- Clerk webhook: Svix signature verified.
- Sanity webhook: HMAC SHA-256 verified with `SANITY_REVALIDATE_SECRET`.
- All webhook handlers are idempotent (use event IDs).

## Forms

- Every public form (application, donation, RSVP-while-signed-in counts as semi-public) protected by Turnstile when not auth-gated.
- All inputs Zod-validated server-side. Never trust client validation alone.
- Email address fields normalized (trim, lowercase) before storage.

## Rate limiting

`@upstash/ratelimit` on:

- `/api/checkout/donation` — 10 req/min per IP
- `/api/rsvp` — 30 req/min per user
- `/api/search` — 60 req/min per IP
- Membership application server action — 5 req/hour per IP

Unauthenticated routes use IP; authenticated routes use Clerk userId.

## Secrets

- Never logged.
- Never sent to the client (validated by `lib/env.ts` separating server and `NEXT_PUBLIC_*` vars).
- Rotated quarterly.

## SQL injection

Drizzle's parameterized queries handle this. Never concatenate user input into SQL.

## XSS

- Portable Text rendering uses `@portabletext/react` — no `dangerouslySetInnerHTML`.
- The few places we render HTML from Sanity (e.g., page bodies converted from WP HTML) are sanitized via `rehype-sanitize` during transform.
- User-generated content (member bios) is sanitized server-side before render.

## CSRF

Server Actions in Next.js use a CSRF token automatically. Route Handlers that mutate state require either Clerk auth or a Stripe-signed body (already covered).

## Robots

- `noindex` for `/account/*`, `/admin/*`, `/sign-in`, `/sign-up`, `/api/*`, `/search?*`, `/donate/thank-you`, `(preview)` group.
- `robots.txt` disallows the same.

## Privacy

- Member emails never rendered as plain mailto unless the member opts in.
- Donations never publicly listed.
- A privacy policy at `/privacy` (CMS page) covers data collection.

## Penetration testing

Out of scope for v1 internal QA. Recommendation: arrange a third-party pen test post-launch (3-month mark).

## Dependencies

- `pnpm audit` runs in CI.
- Renovate or Dependabot configured to open PRs for security updates.
- Major version upgrades held for review; patch and minor auto-merged after CI green.
