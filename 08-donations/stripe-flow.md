# Stripe flow (donations)

## Checkout session creation

`/api/checkout/donation` — POST endpoint, accepts:

```ts
const donationInputSchema = z.object({
  amountCents: z.number().int().min(500),
  recurring: z.boolean().default(false),
  email: z.string().email(),
  name: z.string().min(1).max(120),
  intent: z.string().max(80).optional(),
});
```

Creates a Stripe Checkout session:

- `mode: recurring ? 'subscription' : 'payment'`
- `line_items`: dynamic price (`price_data: { currency: 'usd', unit_amount: amountCents, product: STRIPE_DONATION_PRODUCT_ID, recurring: recurring ? { interval: 'month' } : undefined }`)
- `customer_email: email`
- `metadata: { kind: 'donation', userId: clerk.userId ?? '', intent: intent ?? 'general', name }`
- `success_url: ${SITE_URL}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`
- `cancel_url: ${SITE_URL}/donate?cancelled=true`
- `allow_promotion_codes: false`
- `billing_address_collection: 'auto'`
- `payment_method_types`: omit (let Stripe choose, including Apple/Google Pay)

Returns `{ url }`. Client redirects.

## Webhook handling

The shared `/api/webhooks/stripe/route.ts` route handler dispatches by event type and metadata.kind. For donations:

### `checkout.session.completed`

- Look up the session.
- Insert into `donations` with `status: 'succeeded'`.
- Send `donation-receipt` email.

### `invoice.payment_succeeded` (recurring)

- For subscriptions tagged `kind: donation`, append a row to `donations` reflecting the recurring charge.
- Send a monthly receipt.

### `charge.refunded`

- Mark the donation row `status: 'refunded'`.
- Optionally email the donor with a refund confirmation.

### Failure

Donation failures should not impact the user (Stripe Checkout shows them the error). Log and move on.

## Idempotency

Use Stripe event IDs (`evt_*`) as idempotency keys; store processed event IDs in a small `stripe_events_processed` table to avoid double-processing on webhook retries.

## Anti-fraud

Stripe Radar handles. We don't add custom rules in v1.

## Currency

USD only in v1. Architecture leaves `donations.currency` open; supporting EUR/GBP later is a Stripe configuration change and a UI dropdown.
