# Vercel setup

## Project

- Connect the GitHub repo (**[github.com/jkuebler3510/catholic-scientist-project](https://github.com/jkuebler3510/catholic-scientist-project)**) to a new Vercel project named `scs-web`.
- Root directory: `apps/web`.
- Framework preset: Next.js (auto-detected).
- Build command: `cd ../.. && pnpm turbo run build --filter web` (run from root for proper monorepo build).
- Install command: `pnpm install --frozen-lockfile`.
- Output: default.
- Node version: 20.x (matches `00-foundation/repo-setup.md`).

## `vercel.json`

```jsonc
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ],
  "rewrites": [],
  "redirects": [
    /* sourced from 12-content-migration/url-redirect-map.md */
  ]
}
```

CSP is set in `next.config.js` (more flexible there for nonce handling).

## Environments

- **Development.** Local only. `vercel dev` not used; we use `pnpm dev`.
- **Preview.** Every PR. Branch deploys default to `staging` Sanity dataset, Stripe test mode, Clerk dev instance.
- **Production.** `main` branch. Production env vars.

Vercel allows per-environment variables; configure each variable from `00-foundation/env-vars.md` at the right scope.

## Build optimizations

- Turborepo remote cache via Vercel (free for accounts on Pro+; on Hobby use the local cache only).
- Output file tracing: defaults work; verify the build doesn't bundle Sanity Studio assets into the web build.

## Image optimization

`next/image` works out of the box on Vercel. Configure `images.remotePatterns` to whitelist Sanity's CDN host:

```ts
// next.config.js
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }, ...],
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
}
```

## Cron / scheduled tasks (none in v1)

If we add scheduled tasks later (e.g., year-end donation receipts), use Vercel Cron. Document in the runbook when added.

## Limits

Vercel Pro plan limits we should know about:

- Serverless function timeout: 60s (more than enough for our routes).
- Function memory: 1024 MB default (raise to 3008 MB if needed for image processing — should not be needed since Sanity does that).
- Edge function size: 1 MB (no edge functions in v1).

## Ownership transfer

Initially set up under a developer's personal Vercel account, then transfer to the Society's organization. Document the org slug in the runbook.
