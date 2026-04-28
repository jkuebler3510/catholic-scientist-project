# Tax receipts

## Legal context

SCS is a US 501(c)(3) non-profit. US donors receive tax-deductible receipts. Donors outside the US receive an acknowledgment that may or may not be tax-deductible depending on jurisdiction; we do not opine on foreign tax law.

## Receipt content

The `donation-receipt` email contains:

- The Society's full legal name
- EIN
- Mailing address
- Donation amount, date, and method (e.g. "Visa ending 4242")
- Statement: "No goods or services were provided in exchange for this contribution."
- For recurring donations, the schedule and how to manage / cancel
- Link to the donor's giving history (`/account/giving`, deferred to phase 2 — for v1 the email is the record)
- Reply-to: `donations@catholicscientists.org`

## Year-end summary (deferred)

A January batch email summing each donor's giving for the prior calendar year. Useful for tax filings. Defer to phase 2; document as a future task.

## Audit trail

Every donation is logged in Postgres (`donations` table) with the Stripe charge ID. Stripe's dashboard remains the source of truth for the financial record; our `donations` table is for application logic (receipts, donor recognition, future donor portal).

## Privacy

Donations include name and email. Do NOT publicly surface donor names without explicit opt-in (currently no opt-in mechanism exists; defer to phase 2). The donor wall idea, if pursued, requires UI in the donate flow + a column on `donations`.
