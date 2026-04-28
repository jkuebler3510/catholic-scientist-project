# Analytics & monitoring

## Tools

- **Vercel Analytics** for page views and Web Vitals. Privacy-respecting; no consent banner needed.
- **Sentry** for error tracking and performance traces (browser + server + edge runtimes).
- **Vercel Logs** for request logs (free with Hobby; consider Logflare for retention if SCS upgrades).
- **Stripe Dashboard** is the single source of truth for revenue.

We do **not** use Google Analytics in v1.

## Vercel Analytics

```ts
// apps/web/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

<Analytics />
<SpeedInsights />
```

Only loads in production.

## Sentry

```ts
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,
});
```

Server config sets `tracesSampleRate: 0.05`, edge similar. Source maps uploaded on production builds via `SENTRY_AUTH_TOKEN`.

Filter: never capture PII. Scrub `request.cookies`, `request.body.email`, etc. Use Sentry's default scrubbing plus a custom `beforeSend`.

## Custom events (lightweight)

Track three things via Vercel Analytics custom events:

- `donation.completed` (amount, recurring)
- `application.submitted`
- `rsvp.confirmed`

These let us measure conversion of the most important flows without building a custom analytics pipeline.

## Health checks

`apps/web/app/api/health/route.ts` returns `{ status: 'ok', commit: process.env.VERCEL_GIT_COMMIT_SHA }` for uptime monitoring. Configure UptimeRobot or BetterStack to ping every 5 minutes.

## Performance budget

Tracked in CI via Lighthouse CI. Budget set in `13-launch-qa/performance-budget.md`. Failures block PR merges.

## Alerts

- Sentry: any new `error` issue notifies #engineering Slack (channel TBD).
- Vercel: deploy failure → email.
- Stripe: webhook signature failures → Sentry breadcrumb + alert.
- Resend: bounce rate > 5% → email.

## Privacy

Vercel Analytics is consentless in the EU because it doesn't set cookies and doesn't track individuals across sites. We add a brief privacy note in the footer linking to `/privacy` (a CMS page) describing what's collected.
