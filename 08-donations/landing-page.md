# Donate landing (`/donate`)

## Layout

1. Hero: headline ("Help Catholic scientists witness to the harmony of faith and reason"), short paragraph, gold accent.
2. **Donation form** (the centerpiece, above the fold on desktop):
   - Preset amount buttons: $25, $100, $250, $1,000.
   - Custom amount input.
   - Toggle: One-time / Monthly.
   - Name + email (pre-filled if authenticated).
   - Optional intent dropdown: "General support", "Annual conference", "Memorial Mass intentions". Stores to `donations.intent`.
   - Big primary button: "Donate $X" (updates as the user picks an amount).
3. **Why give** section: short paragraphs (CMS-driven via Sanity `page` document with slug `donate`), with stats (members, chapters, lectures held, students reached).
4. **Where your gift goes** — pie / list breakdown (CMS-driven).
5. **Other ways to give** — section with text on bequests, employer matching, stock gifts, with a contact email.
6. **Tax-deductibility** notice — SCS's 501(c)(3) status, EIN, with a link to Form 990.

## Form behavior

- Live amount label on the button: "Donate $100" / "Donate $100/month".
- Validation:
  - Amount ≥ $5
  - If custom amount, integer dollars only (Stripe handles cents but we keep UX simple)
  - Email valid
- Submit: server action calls `/api/checkout/donation` which creates a Stripe Checkout session and returns the session URL; client redirects.

## Mobile

The form occupies the full viewport on mobile; the rest is below. Submit button is sticky at the bottom on small screens.

## Visual polish

- Gold accent on the form's primary CTA.
- The amount selector uses a segmented control style (large touch targets).
- Calm, scholarly imagery in the hero — not "smiling people overlaid on stock photos."

## Improvements over the current site

- **Conversion-optimized form above the fold,** instead of a separate page that explains why to donate before letting you actually give.
- **Recurring as a one-tap option,** not a separate flow.
- **Real receipt email** with the EIN and tax language.
