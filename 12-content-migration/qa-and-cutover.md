# Migration QA & cutover

## QA checklist

- [ ] Document counts per type match source audit (or differences are explained).
- [ ] Every `post` has a body, title, publishedAt, author.
- [ ] Every image has alt text (or a flag exists in the editor's review queue).
- [ ] No broken internal links (every link in Portable Text resolves to a Sanity document or external URL that returns 200).
- [ ] Spot-check 20 random posts on staging — visual fidelity acceptable.
- [ ] Spot-check 5 random conferences — talks present, videos embedded.
- [ ] Spot-check 5 random scientist biographies — portrait, body, dates correct.
- [ ] Categories and tags populated.
- [ ] FAQ entries categorized correctly.
- [ ] Chapters have coordinator and coordinates.

A staff editor must sign off before the production import runs.

## Cutover sequence

This is the critical operational moment. Order:

1. **T-7 days.** Final staging migration. SCS staff review.
2. **T-3 days.** Lower WP DNS TTL to 300s.
3. **T-1 day.** Final production migration. Run on staging-equivalent dataset, dry-run any incremental.
4. **T-0.** Update DNS A/AAAA records to Vercel. Watch traffic shift over 5–60 minutes.
5. **T+0.** Run the redirect verification suite.
6. **T+1 hour.** Submit new sitemap to Google Search Console; request reindex on the most important URLs.
7. **T+72 hours.** Watch Sentry, Vercel logs, and Search Console for 404s. Fix any redirect omissions immediately.
8. **T+7 days.** Decommission the WP host (with a final database snapshot to cold storage).

## Communication

A short note from SCS leadership to members 24 hours before cutover, explaining the new site, mentioning the member portal sign-up, with the apply-now or sign-up link. Drafted by SCS, hosted in Sanity.

## Rollback

If something goes badly wrong post-cutover:

1. Re-point DNS back to WP (TTL of 300s gives us a 5-minute rollback).
2. Investigate the failure on Vercel without traffic pressure.
3. Re-cutover when fixed.

The cost of a same-day rollback is minimal because we lowered TTL in advance.
