# Transactional emails

All transactional email is sent via Resend. Templates are React Email components in `packages/emails/`.

## Templates

| Template | Trigger | Subject |
| --- | --- | --- |
| `welcome.tsx` | Clerk `user.created` (linked to approved application) | Welcome to the Society of Catholic Scientists |
| `application-received.tsx` | `submitApplication` server action | We received your application |
| `application-approved.tsx` | Admin approves an application | Your application has been approved — finish your sign-up |
| `application-rejected.tsx` | Admin rejects | A note about your application |
| `dues-receipt.tsx` | Stripe `invoice.payment_succeeded` for dues | Your annual SCS dues — receipt |
| `dues-renewed.tsx` | Stripe yearly renewal | Your SCS membership renewed |
| `dues-payment-failing.tsx` | Stripe `invoice.payment_failed` | Action needed: payment for your SCS dues |
| `dues-cancelled.tsx` | Subscription cancelled | Your SCS membership has ended |
| `rsvp-confirmation.tsx` | `submitRsvp` | RSVP confirmed — [event] |
| `rsvp-cancelled.tsx` | RSVP cancellation | Your RSVP has been cancelled |
| `donation-receipt.tsx` | Stripe `checkout.session.completed` for donation | Thank you for your donation |
| `conference-registration.tsx` | Stripe `checkout.session.completed` for conference | Conference registration confirmed |

## Shared layout

`packages/emails/_layout.tsx` provides:

- Header with logo, organization name
- Centered content (≤ 600 px)
- Footer with mailing address, unsubscribe placeholder (transactional emails legally don't need unsubscribe, but include "Manage email preferences" link to `/account/profile`)
- Brand-tinted accents matching the design system tokens

## Sender

`Society of Catholic Scientists <noreply@catholicscientists.org>` with `Reply-To: membership@catholicscientists.org`.

DKIM, SPF, DMARC must be configured for `catholicscientists.org` in Resend (and in DNS). Owner: `11-deployment`.

## Preview

`pnpm --filter emails dev` boots React Email's preview server. Every template renders in the preview UI.

## Testing

- Unit: snapshot test the rendered HTML for each template.
- E2E (Playwright): trigger flows that fire emails and assert the email landed in a test inbox (Resend's test mode + the `Idempotency-Key` header).
