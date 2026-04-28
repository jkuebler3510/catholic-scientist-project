# Go-live checklist

A single source of truth for the launch decision. Runs through with the SCS team in a brief go/no-go meeting.

## Code & infrastructure

- [ ] CI green on `main` (typecheck, lint, format, unit, e2e, lighthouse, axe).
- [ ] Vercel production build green.
- [ ] All env vars configured in production.
- [ ] DNS configured: root, www, studio.
- [ ] SSL certificates valid.
- [ ] HSTS preloaded (or scheduled to preload).
- [ ] Email DNS authenticates: SPF / DKIM / DMARC.
- [ ] Sentry receiving events from production.
- [ ] Vercel Analytics receiving events.
- [ ] Health endpoint returns 200.
- [ ] Stripe webhook configured to production endpoint and signature verified.
- [ ] Clerk webhook configured to production endpoint.
- [ ] Sanity revalidation webhook configured to production endpoint.

## Content

- [ ] Migration sign-off from SCS editorial.
- [ ] Home page blocks reviewed by SCS leadership.
- [ ] Mission, About, Statutes pages reviewed.
- [ ] Footer text + nav reviewed.
- [ ] FAQ entries reviewed.
- [ ] At least one upcoming event in the calendar.
- [ ] At least 5 recent news posts present.
- [ ] All "Catholic Scientists of the Past" biographies migrated.
- [ ] Privacy policy and terms (if any) live at the footer URLs.

## Auth & payments

- [ ] One test user can complete the application form on production-staging dataset.
- [ ] One test user can sign up via Clerk.
- [ ] One test user can pay $5 dues via Stripe live mode and the Postgres `members` row reflects it.
- [ ] One test user can donate $5 via Stripe live mode and receives a receipt email.
- [ ] Refund of the $5 test donation works and is reflected in Postgres.

## Search & discovery

- [ ] Search dialog opens on every page.
- [ ] Top-of-mind queries return expected results: "Lemaître", "Mendel", "Gold Mass", "2024 conference".
- [ ] Topic pages render.

## SEO & redirects

- [ ] Sitemap submitted to Google Search Console.
- [ ] News sitemap submitted.
- [ ] Robots.txt verified.
- [ ] 50 random redirects from the WP URL map verified passing.
- [ ] Open Graph image renders for: home, a post, an event, a biography.
- [ ] JSON-LD validates for each type in Google's Rich Results Test.

## Accessibility

- [ ] axe-core clean on every public route in CI.
- [ ] Manual tab-through audit complete.
- [ ] Screen reader spot-check complete.

## Communications

- [ ] SCS membership notice prepared (email + social).
- [ ] Internal launch comm to staff & board.
- [ ] On-call dev assigned for the first 72 hours.

## Sign-offs

- [ ] Engineering lead
- [ ] SCS executive
- [ ] Editorial lead
- [ ] Treasurer (for Stripe / donations)

When all rows are checked, **launch**.

## Post-launch (first 72 hours)

- Monitor Sentry every 30 min.
- Watch Vercel logs for 404s; immediately add redirects for any high-volume miss.
- Watch Search Console "Coverage" report for indexing issues.
- Stripe & Clerk dashboards: verify dues + donations + sign-ups flowing.
- Resend: monitor bounce rate.
- Daily standup (30 min) with the SCS team for the first week to triage anything surfaced.
