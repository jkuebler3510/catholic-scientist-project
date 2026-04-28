# Design Principles

Read this before doing any visual work. The full design system spec — tokens, components, accessibility — lives in `01-design-system/`. This document defines the *posture* the design should hold.

## Audience

Three primary personas, in order of traffic share:

1. **Curious public.** A Catholic looking for the Church's intellectual engagement with science, or a scientist curious about Catholicism. Wants accessible writing, clear answers, no jargon, no insider tone.
2. **Members and prospective members.** Practicing scientists with PhDs in STEM. Wants clear value, easy access to videos and conference recordings, low-friction membership management.
3. **Press, academics, donors.** Wants credibility signals — board, statutes, financials, conference programs, partner institutions.

Design must respect all three without pandering to any.

## Voice & tone

- **Scholarly, not stuffy.** This is an organization of working scientists. Confidence and precision; no purple prose.
- **Reverent, not pious.** Catholic identity is foundational and visible, but the site is not a devotional app. The intellectual tradition is the focus.
- **Plainspoken about science.** Real working scientists don't use clip-art DNA strands. Imagery and copy should reflect actual research and actual scientists.

## Visual direction

**Brand identity to preserve:** the SCS gold (St. Albert the Great patronage and the Gold Mass tradition), serif typography for editorial content, the sense of intellectual seriousness.

**Improvements over the current site:**

- Modern, generous typography. A high-quality serif for body and display (e.g. Source Serif 4, Crimson Pro, or EB Garamond), paired with a clean grotesque for UI (Inter, Geist, or Söhne).
- Strong typographic hierarchy. The current site reads flat — every element competes. Use scale, weight, and whitespace to guide the eye.
- Restrained color palette. SCS gold as the accent, deep navy or warm black as the primary, rich neutrals for surfaces. Avoid the rainbow of CTA colors the current site uses.
- Real photography, not stock. Conference photos, scientists at work, sacred art tied to the patron saints. Curate ruthlessly.
- Deliberate whitespace. The current site is dense. Let pages breathe — full-bleed hero imagery, generous padding, fewer competing modules per screen.

## Layout principles

- **Mobile-first, but designed for desktop too.** Treat 360px and 1440px as primary breakpoints; tablet is interpolation.
- **Reading-first widths.** Body copy max-width ~ 68 characters (≈ 680px). Never let a paragraph stretch full-width on a 1440px screen.
- **Consistent vertical rhythm.** All spacing is a multiple of a single base (4px or 8px). No magic numbers.
- **Cards are a last resort.** When a list of items has clear hierarchy (title, dek, byline, date) prefer typography-led list rows over uniform cards.

## Component philosophy

- **Composition over configuration.** Build small primitives (Button, Heading, Card, Badge) and compose; avoid 12-prop "Section" components.
- **Server-first.** Every component is a Server Component until proven otherwise. Client islands only for interactivity that genuinely needs the browser.
- **Accessible by default.** No component ships without keyboard navigation, ARIA semantics, focus-visible states, and contrast verified.

## Interaction & motion

- Subtle, purposeful motion only. Page transitions: none. Hover states: 100–150ms ease. Reveal-on-scroll: avoided.
- Respect `prefers-reduced-motion`.
- No autoplaying carousels. If something must rotate, it's controllable and paused by default.

## Imagery & iconography

- Photography over illustration. Where illustration is needed, lean on classical scientific drawings (woodcuts, anatomical illustrations, astronomical diagrams) rather than vector-art figures.
- Iconography is a single, consistent set (Lucide). No mixing of styles.
- Saint imagery (St. Albert the Great, Gregor Mendel, Lemaître) is welcomed where contextually relevant — biographies, Gold Mass pages — but is not decorative chrome.

## Anti-patterns to avoid

- "Hero with three feature columns" home page. The current site does a version of this; we will not.
- Excessive bolding and ALL CAPS in body copy.
- Colored "tag" pills on every list item.
- Floating-back-to-top buttons.
- Cookie banner (we use no tracking that legally requires one — see `10-seo-analytics`).
- "Read more →" buttons on every card. The whole row should be the link.

## Inspiration references

Useful sites to look at when designing — borrow posture, not pixels:

- *London Review of Books* / *NYRB* — editorial typography
- *Stripe* — clarity, hierarchy, trust signals
- *Hoover Institution* — academic credibility, event archives
- *McKinsey Insights* — long-form article treatment
- *Pope Francis* (vatican.va translations) — restraint, gravitas

The implementing agent should not copy any of these visually. Use them to calibrate seriousness, not aesthetics.
