# DNS & domain

## Domains in play

- `catholicscientists.org` — root, primary
- `www.catholicscientists.org` — redirect to root (via Vercel)
- `studio.catholicscientists.org` — Sanity Studio (CNAME to Sanity-managed deploy)
- `mail.catholicscientists.org` — optional, for Resend tracking pixels (Resend manages)

## Records

```
A     @     76.76.21.21        ; Vercel
AAAA  @     2606:4700:7::a29f  ; Vercel
CNAME www   cname.vercel-dns.com.
CNAME studio scs.sanity.studio. ; Sanity managed

; Email (Resend; values come from Resend dashboard)
TXT   @     "v=spf1 include:resend.com ~all"
TXT   resend._domainkey   "<DKIM key from Resend>"
TXT   _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@catholicscientists.org; pct=100"

; Verification
TXT   @     "google-site-verification=..."
TXT   @     "stripe-verification=..."
```

Lower TTLs (300s) during cutover; raise to 3600s once stable.

## Cutover plan

1. Verify the new site on a temporary domain (`new.catholicscientists.org` CNAME'd to Vercel).
2. Submit redirects from old WP routes (already live in `vercel.json`) and verify a sample of 50.
3. Snapshot WordPress content one final time for migration.
4. Lower the WP DNS TTL 24 hours before cutover.
5. Cutover: update root A/AAAA records to Vercel.
6. Monitor 404s in Vercel logs and Sentry for 72 hours.
7. After 7 days, decommission the WordPress instance (keep an export in cold storage indefinitely).

## SSL

Vercel issues and renews via Let's Encrypt automatically.

## Apex CNAME

`apex` (root) doesn't support CNAME in DNS. Vercel provides `A` and `AAAA` records, used above. If we need `ALIAS`/`ANAME` (e.g., we move to Cloudflare DNS), update accordingly.
