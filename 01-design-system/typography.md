# Typography

The single highest-leverage decision in this redesign. The current site reads flat. We fix that here.

## Type pairing

**Display + body: a single high-quality serif.** Recommendation: **Source Serif 4** (open source, excellent on-screen, full italic + small caps, designed by Frank Grießhammer at Adobe). Backup: **Crimson Pro** (warmer, more humanist, good for body) or **EB Garamond** (more traditional, smaller x-height).

**UI sans: Inter.** It's the most reliable interface sans, has a tabular figures variant we'll need for dates and dollar amounts, and is at home next to a serif.

**Mono (rare):** JetBrains Mono. Used in the design route and code blocks; not on user-facing pages.

Serve via `next/font`:

```ts
import { Source_Serif_4, Inter } from 'next/font/google';

export const serif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});
```

Apply both `variable`s on `<html>`. Body default is `font-serif`. UI chrome (buttons, badges, nav, form labels) is `font-sans`.

## Hierarchy

| Use | Family | Size | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- | --- |
| Display (hero) | serif | 5xl | 600 | -0.02em | tight |
| H1 | serif | 4xl | 600 | -0.015em | tight |
| H2 | serif | 3xl | 600 | -0.01em | snug |
| H3 | serif | 2xl | 600 | -0.005em | snug |
| H4 | serif | xl | 600 | 0 | snug |
| H5 | sans | base | 600 | 0.02em | snug |
| Body | serif | base | 400 | 0 | relaxed |
| Lead | serif | lg | 400 | 0 | relaxed |
| Caption | sans | sm | 500 | 0.01em | normal |
| Eyebrow | sans | xs | 600 | 0.08em (uppercase) | normal |
| Button | sans | sm | 600 | 0 | normal |
| Code | mono | sm | 400 | 0 | normal |

## Body copy rules

- Never wider than 68 ch.
- `text-wrap: pretty` on headings, `text-wrap: balance` on display headings (Tailwind 3.4+).
- Hyphens: `auto` on body copy.
- Pull-quotes use display weight, italic optional, never decorative quotation marks (use real curly quotes in copy).

## Drop caps

On long-form articles (`post`, `idea`, `scientist` biographies) the first paragraph optionally uses a drop cap. Token: `prose-dropcap`. Implementation via CSS `::first-letter` with `float: left; font-size: 4em; line-height: 0.85; padding-right: 0.1em; padding-top: 0.05em;`.

## Display digits

Use `font-feature-settings: 'tnum'` on tabular contexts (member directory rows, dollar amounts in donation flow, dates in event lists) so numerals align.

## Anti-patterns

- **No tracking on body copy.** Default 0. Tracking is a typographic emergency button, not a design feature.
- **No all-caps body text.** Eyebrows and small UI labels only.
- **No three-different-weights in one paragraph.** Bold for emphasis is enough.
- **No font-size-only emphasis.** If something is more important, also reflect that in placement and surrounding whitespace.
