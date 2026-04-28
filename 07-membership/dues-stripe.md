# Dues via Stripe

## Model

Annual dues. Single Stripe **Price** (e.g. `STRIPE_DUES_PRICE_ID`), recurring yearly. Stored as a Stripe **Subscription** for each member who pays via the recurring option, OR as one-off Checkout sessions for members who prefer manual yearly renewal.

Recommendation for v1: **subscription** (auto-renew). Members receive a renewal-reminder email 30 days before charge.

## Flow

1. Approved applicant lands on `/membership/dues` (or a member with lapsed dues).
2. Server Action creates a Stripe Checkout session with mode `subscription` and the dues price ID, plus metadata `{ userId, kind: 'dues' }`.
3. User completes Checkout.
4. Webhook `/api/webhooks/stripe` processes `checkout.session.completed`:
   - Verifies signature.
   - Reads `userId` from metadata.
   - Updates `members.stripeCustomerId`, `members.stripeSubscriptionId`, `members.duesPaidThrough` to subscription's `current_period_end`.
   - Sends `dues-receipt` email.
   - Revalidates `/account` for that user.
5. User redirected to `/account?welcome=true` with a one-time success toast.

## Renewal

Stripe automatically charges the subscription each year. Webhook listens to `invoice.payment_succeeded`:

- Update `duesPaidThrough` to the new `current_period_end`.
- Send `dues-renewed` email.

If `invoice.payment_failed`:

- Stripe smart retries.
- Member sees "payment failing" banner in the portal.
- After Stripe's final failure event, set `members.duesStatus = 'lapsed'` and email the member.

## Customer Portal

`/account/billing` redirects to a server-created Stripe Customer Portal session. Members can update card, pause, cancel from there. We do not rebuild billing UI.

## Pricing

Stored in Stripe Dashboard. Editable by the SCS team without code changes. The dues page renders the price from the Stripe Price object (fetched server-side, cached for 1 hour).

## Postgres `members` columns relevant to dues

```ts
members {
  ...,
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  dues_paid_through      timestamptz,
  dues_status            enum('not_started','active','lapsed','cancelled'),
  ...
}
```

## Refunds

Manual via Stripe Dashboard. Webhook listens to `charge.refunded`:

- Mark the corresponding row in `donations` (for donations) or `members.duesStatus` (for dues) appropriately.

## Tax

Stripe Tax is opt-in per Checkout session. SCS is a non-profit, but tax reporting still matters for some jurisdictions. Recommendation: enable Stripe Tax in production and let it handle. Verify with the SCS team's CPA before launch.
