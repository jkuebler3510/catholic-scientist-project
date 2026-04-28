# Conference detail (`/conferences/[year]`)

## Layout

1. Breadcrumb (Home › Conferences › [Year])
2. Eyebrow ("Annual SCS Conference")
3. Display title + theme
4. Dates + location
5. Hero: poster image OR a banner photo from the conference
6. Tabs (Radix `Tabs`): **Overview · Program · Talks · Photos**

### Overview tab
Portable Text body (themed introduction, organizing committee, sponsors).

### Program tab
The downloadable program PDF (if uploaded), plus the schedule rendered from the talks list (sorted by date if dates exist on talks).

### Talks tab
Grid of `TalkCard`s, each with poster image (auto-fetched from YouTube if not overridden), title, speaker, duration. Clicks → `/conferences/[year]/talks/[slug]`.

### Photos tab
Optional. If the conference has `photos[]` on the document, show them in a lightweight gallery.

## Registration

If `registrationOpen === true`, render a sticky banner at the top of the page with a "Register" CTA. The CTA either:

- redirects to `event.registrationUrl` (external), or
- opens `/conferences/[year]/register` (Stripe Checkout, owned here + `08-donations` Stripe wiring).

## Improvements over the current site

- **Tabbed structure** keeps the page navigable even with 12+ talks.
- **Auto-poster from YouTube** so the talks tab doesn't show empty rectangles before editors upload posters.
- **Schedule rendered from data,** not hardcoded.
