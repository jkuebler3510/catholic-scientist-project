# 08 — Donations

## Mission

Build the donation experience: a `/donate` landing page, one-time and recurring donation flows via Stripe Checkout, a thank-you page, donation receipts, and the webhook handler that records donations to Postgres.

## Why this matters

SCS is a non-profit. Donations matter. The donation flow needs to be friction-free, trustworthy, and properly receipted for tax purposes. This is a 1-page, 3-click experience that we can do really well.

## Inputs (read these first, in order)

1. `/README.md`
2. `/INFORMATION_ARCHITECTURE.md` (rows for `/donate*`)
3. `/DESIGN_PRINCIPLES.md`
4. `/TECH_DECISIONS.md` — Stripe section
5. `01-design-system/component-library.md` — `Form`, `Field`, `Callout`
6. `07-membership/postgres-schema.md` — `donations` table definition
7. `landing-page.md`
8. `stripe-flow.md`
9. `tax-receipts.md`

## Deliverables

- `apps/web/app/donate/page.tsx` — landing.
- `apps/web/app/donate/thank-you/page.tsx` — confirmation.
- `apps/web/app/api/checkout/donation/route.ts` — server endpoint that creates a Checkout session for a donation.
- Webhook handler logic in `/api/webhooks/stripe/route.ts` for `checkout.session.completed` and `charge.refunded` for donations (the route handler itself is shared with `07-membership` — coordinate so each kind of payment is handled by the right branch).
- React Email template `donation-receipt.tsx`.
- Donations table (defined in `07-membership/postgres-schema.md`, populated here).

## Acceptance criteria

- [ ] Donate page presents preset amounts ($25, $100, $250, $1,000) plus a custom-amount input, plus a "monthly" toggle.
- [ ] Form validates: amount ≥ $5, email valid, name required.
- [ ] Stripe Checkout session created with metadata `{ kind: 'donation', userId?, intent }`.
- [ ] Webhook records the donation to Postgres with the correct status.
- [ ] Donation receipt email sent within 60 seconds of `checkout.session.completed`.
- [ ] Thank-you page reads the session id from URL and confirms.
- [ ] No donation flow JS shipped to users who don't click the donate CTA — heavy logic lazy-loaded.
- [ ] axe-core clean, perf ≥ 95 on the donate page.

## Out of scope

- Donor portal (giving history, tax summaries) — defer to phase 2 once we have data to show.
- Donor wall / public recognition — defer.
- Memorial / honor-a-loved-one fields — defer (the `intent` field in `donations` reserves space for it).

## Dependencies

| Folder | What we need |
| --- | --- |
| `00-foundation` | Stripe SDK installed, env vars set |
| `01-design-system` | `Form`, `Field`, `Callout`, `Button`, `Picture` |
| `07-membership` | `donations` Postgres table, shared Stripe webhook handler |

## Open questions

- Apple Pay / Google Pay support: included via Stripe Checkout's automatic payment methods? Default: yes — let Stripe Checkout decide.
- Do we want Apple Pay buttons on the landing page itself (faster path), or always go through Checkout? Default: Checkout-only for v1; add Express Checkout later if conversion data warrants it.

## Suggested agent prompt

> You are implementing the donation experience for the Society of Catholic Scientists website rebuild.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/DESIGN_PRINCIPLES.md`
> 3. `/Catholic Scientist Project/01-design-system/`
> 4. `/Catholic Scientist Project/07-membership/postgres-schema.md`
> 5. Every `.md` in `/Catholic Scientist Project/08-donations/`.
>
> **Your job.** Implement the `/donate` landing, the Stripe Checkout creation server action, the thank-you page, the webhook branch for donations, and the receipt email. Coordinate with `07-membership` to share the Stripe webhook route.
>
> **Acceptance.** A guest can donate any amount, an authenticated member can donate with their email pre-filled, recurring donations work, receipt arrives, Postgres recorded.
