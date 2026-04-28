# Design tokens

Canonical token definitions. The Tailwind preset is the only place these live in code.

## Color

The brand identity is gold (St. Albert the Great, Gold Mass) on a deep, scholarly substrate. Restraint is the whole game.

### Primitive ramps (HSL, 50–950 each)

| Token | Role | Use |
| --- | --- | --- |
| `gold` | Brand accent | Primary CTA, link underlines, accents only |
| `ink` | Body text + UI | Headings, body text, borders |
| `parchment` | Surface | Page background, card surfaces |
| `claret` | Sacred accent | Use sparingly: liturgical references, Gold Mass branding |
| `slate` | Cool neutral | Subdued surfaces, captions |

Approximate anchors (final values are the implementer's call within this brief):

```
gold-50:  hsl(42, 70%, 96%)
gold-500: hsl(40, 70%, 48%)   ← brand
gold-700: hsl(36, 75%, 36%)
gold-950: hsl(30, 60%, 14%)

ink-50:   hsl(220, 18%, 97%)
ink-500:  hsl(220, 14%, 32%)
ink-900:  hsl(220, 22%, 12%)  ← body
ink-950:  hsl(220, 24%, 6%)   ← display

parchment-50:  hsl(40, 35%, 99%) ← page bg
parchment-100: hsl(38, 28%, 96%)
parchment-200: hsl(36, 20%, 91%) ← borders, dividers

claret-500:    hsl(355, 50%, 36%)
claret-700:    hsl(355, 55%, 26%)

slate-* — Tailwind defaults are fine
```

### Semantic tokens

Map primitives to semantic names. Pages and components reference semantic tokens, not primitives.

```
bg-canvas         → parchment-50
bg-surface        → white
bg-surface-muted  → parchment-100
bg-inverse        → ink-950

fg-default        → ink-900
fg-muted          → ink-500
fg-subtle         → slate-500
fg-on-inverse     → parchment-50
fg-link           → gold-700
fg-link-hover     → gold-950
fg-sacred         → claret-700

border-default    → parchment-200
border-strong     → ink-200
border-focus      → gold-500

accent            → gold-500
accent-hover      → gold-700
accent-fg         → ink-950 (on gold)
```

Define these as CSS custom properties in `globals.css`, mirrored in the Tailwind config so utility classes like `bg-canvas` work natively.

## Typography

See `typography.md` for the type system in detail. Tokens here just for reference:

```
font-display  → Source Serif 4 / Crimson Pro (TBD)
font-body     → same family, weights 400/500/600
font-ui       → Inter or Geist
font-mono     → JetBrains Mono (used in code blocks only)
```

Fluid type scale (clamp-based, 360–1440 px viewport):

```
text-xs    → 12 → 13 px
text-sm    → 14 → 15 px
text-base  → 16 → 18 px       (body)
text-lg    → 18 → 20 px
text-xl    → 22 → 26 px
text-2xl   → 26 → 32 px
text-3xl   → 32 → 44 px
text-4xl   → 40 → 56 px
text-5xl   → 48 → 72 px       (display)
```

Line-heights:

```
leading-tight   → 1.1   (display)
leading-snug    → 1.25  (headings)
leading-normal  → 1.5   (UI)
leading-relaxed → 1.65  (body)
```

## Spacing

8-point grid. Tailwind's default `spacing` scale is fine; we tighten the small end:

```
0   1   2   3   4   5   6   8   10  12  16  20  24  32  40  48  56  64  80  96
```

Vertical rhythm: section padding is always one of `py-16`, `py-24`, `py-32` on desktop; halved on mobile.

## Container widths

```
prose    → max-w-prose  (~ 65ch, ≈ 720 px)
content  → max-w-3xl    (760 px)  — default article width
wide     → max-w-5xl    (1024 px) — feature pages
full     → max-w-7xl    (1280 px) — home, conference index
```

## Radii

```
rounded-none  → 0
rounded-sm    → 2px
rounded       → 4px
rounded-md    → 6px   (default for buttons, inputs)
rounded-lg    → 10px  (cards)
rounded-xl    → 16px  (callouts)
rounded-full  → 9999px
```

## Shadows

Sparing. Buttons/inputs do not get shadows. Cards optionally get a 1px border or a faint shadow, never both.

```
shadow-sm     → 0 1px 2px rgba(0,0,0,0.04)
shadow        → 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
shadow-md     → 0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04)
shadow-lg     → 0 10px 15px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.04)
```

## Motion

```
duration-100  → micro (focus rings)
duration-150  → standard hover
duration-200  → in-out for menus, dialogs
ease-out-quad → cubic-bezier(0.16, 1, 0.3, 1)  ← canonical easing
```

Respect `prefers-reduced-motion` globally: in `globals.css`, set `transition-duration: 0ms !important` inside the media query.

## Z-index

Single canonical scale, named, no magic numbers:

```
z-base     → 0
z-elevated → 10  (dropdowns inline)
z-overlay  → 50  (modals, dialogs)
z-toast    → 60
z-tooltip  → 70
z-skip     → 80  (skip-to-content link)
```
