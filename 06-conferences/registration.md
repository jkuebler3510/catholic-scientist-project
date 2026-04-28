# Conference registration

## Scope

For SCS-hosted conferences. External conferences set `registrationUrl` on the conference document and we link out.

## Flow (in-app, Stripe-powered)

1. User clicks "Register" on `/conferences/[year]`.
2. Land on `/conferences/[year]/register` — a CMS-driven page describing tiers (regular, student, supporter), inclusions, deadline.
3. User picks a tier. Server Action creates a Stripe Checkout session with the corresponding price ID, with metadata `{ conferenceYear, userId, tier }`.
4. Stripe Checkout collects payment and contact info.
5. On success, Stripe webhook fires (`checkout.session.completed`):
   - Looks up the metadata.
   - Inserts a row in `conference_registrations` (Postgres).
   - Sends a registration confirmation email (Resend) with the conference iCal attachment.
6. User redirected to `/conferences/[year]/register/success` showing confirmation + next steps.

## Postgres schema (added in `07-membership`)

```ts
conference_registrations {
  id              uuid pk
  user_id         text                       // Clerk userId, nullable for guests
  email           text not null
  name            text not null
  conference_year int  not null
  tier            text not null
  amount_cents    int  not null
  stripe_session  text not null              // unique
  status          enum('paid', 'refunded', 'pending')
  created_at      timestamptz default now()
}
unique (stripe_session)
index (conference_year)
```

## Pricing in Stripe

A separate Stripe **Product** per conference (or a shared product with multiple Prices). Pricing is the editor's responsibility via Stripe Dashboard; the conference document stores only the **Stripe Price IDs** for each tier.

## Refunds

Manual via Stripe Dashboard. Webhook listens for `charge.refunded` and updates `status`.

## Out of scope for v1

- Self-service refund/cancellation by the user.
- Coupon codes — defer.
- Hotel/travel booking — out of scope, link to external resources.
