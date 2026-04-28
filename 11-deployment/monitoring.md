# Monitoring

## Stack

- **Sentry** for errors and performance traces.
- **Vercel Analytics + Speed Insights** for traffic and Web Vitals.
- **Vercel Logs** for request logs (live tail; longer retention requires Logflare or BetterStack — defer).
- **UptimeRobot** (or BetterStack) pinging `/api/health` every 5 minutes from US-East and EU.
- **Stripe Dashboard** for revenue.
- **Resend Dashboard** for email delivery.

## Alerts (initial set)

| Trigger | Tool | Recipient |
| --- | --- | --- |
| Sentry: new issue, level ≥ error | Sentry → email | dev on-call |
| Sentry: spike in errors (> 10 in 5 min) | Sentry → email | dev on-call |
| `/api/health` down | UptimeRobot → SMS | dev on-call |
| Vercel deploy fail | Vercel → email | dev on-call |
| Stripe webhook signature failure | Sentry breadcrumb + email alert | dev on-call |
| Resend bounce rate > 5% | Resend daily digest | dev on-call |

## Health endpoint

`apps/web/app/api/health/route.ts`:

```ts
export async function GET() {
  const dbOk = await db.execute(sql`select 1`).then(() => true).catch(() => false);
  const sanityOk = await sanity.fetch(`*[_type == "siteSettings"][0]._id`).then(() => true).catch(() => false);
  const status = dbOk && sanityOk ? 'ok' : 'degraded';
  return Response.json({
    status,
    commit: process.env.VERCEL_GIT_COMMIT_SHA,
    db: dbOk,
    cms: sanityOk,
    timestamp: new Date().toISOString(),
  }, { status: status === 'ok' ? 200 : 503 });
}
```

## Logs

- All errors logged with `console.error` from server code carry the request ID, user ID (if signed in), and route.
- Webhooks log every event ID processed.
- Stripe webhook signature failures log the raw signature header (sans body) to aid debugging.

## Performance dashboards

Vercel Speed Insights tracks LCP, FID, CLS, INP per route. Review weekly post-launch. Regressions in any Web Vital → an open issue against the relevant page-owning folder.

## Cost monitoring

- Vercel: review monthly. Hobby → Pro upgrade triggers when bandwidth, function executions, or team-seat needs exceed Hobby limits.
- Sanity: free tier is generous; watch document and asset counts.
- Stripe: 2.9% + $0.30 per US transaction; SCS may negotiate a non-profit rate.
- Neon: Free tier includes 0.5 GB; upgrade if storage/concurrent connections climb.
- Resend: 3,000 emails/month free; SCS will exceed within a year of growth.

## Runbook

Living document in `runbook.md` (next to this file, populated during setup). Covers:

- Rolling back a deploy.
- Rotating Clerk, Stripe, Sanity, Resend keys.
- Restoring Postgres from PITR.
- Restoring a Sanity dataset from a backup.
- Adding a new admin via Clerk + Postgres.
- Investigating a Stripe webhook signature failure.
