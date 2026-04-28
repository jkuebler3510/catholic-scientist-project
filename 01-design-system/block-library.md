# Block library

CMS-driven page blocks composed of primitives from `component-library.md`. Editors arrange these blocks to build the home page and most "about" pages.

Each block has:

- A Sanity schema in `apps/studio/schemas/blocks/<name>.ts` (delivered by `02-cms-schema`).
- A React component in `apps/web/components/blocks/<name>.tsx` (delivered here).
- A renderer entry in `apps/web/components/blocks/_blockRenderer.tsx` that maps a block type to its component.

## Block specifications

### `HeroBlock`
- Fields: `eyebrow?`, `headline` (display), `subhead?` (lead), `image` (full-bleed), `actions[]` (max 2 buttons), `tone` (`gold | ink | parchment`).
- Layout: full-bleed image with overlay, headline left-aligned, max 2 CTAs.
- Variants: `home`, `inner` (smaller, for non-home pages).

### `MissionStatementBlock`
- Fields: `kicker`, `statement` (large serif paragraph), `signature?` (e.g. "— The Society of Catholic Scientists").
- Layout: pull-quote treatment, generous padding.

### `FeaturedNewsBlock`
- Fields: `heading`, `mode` (`latest | curated`), `count` (3, 4, or 6), `selectedPosts[]?` (used when mode = curated).
- Layout: editorial list (typography-led rows) on desktop, stacked cards on mobile.

### `UpcomingEventsBlock`
- Fields: `heading`, `count` (3 default), `categoryFilter?` (Gold Mass / lecture / conference), `cta?`.
- Behavior: queries Sanity for events whose `startDate >= now()`, sorted ascending. Displays date prominently in the new design.

### `FeaturedScientistBlock`
- Fields: `mode` (`weekly-rotation | curated`), `selectedScientist?` (used in curated mode).
- Behavior: in rotation mode, selects scientist of the week deterministically from `scientist[]` by ISO week number. Displays portrait, name, dates, one-paragraph blurb, link to full biography.

### `VideoSpotlightBlock`
- Fields: `heading`, `talkRef`.
- Behavior: pulls a single `talk` document, renders title, speaker, summary, and a `VideoEmbed`.

### `CalloutBlock`
- Fields: `tone` (`gold | claret | ink | parchment`), `eyebrow?`, `heading`, `body?`, `action`.
- Common uses: "Become a member", "Donate", "Register for the 2026 conference".

### `TestimonialBlock`
- Fields: `quotes[]` (each with `quote`, `attribution`, `affiliation?`, `avatar?`).
- Layout: single quote pull-out, or 2-up grid for plural.

### `RichTextBlock`
- Fields: `body` (Portable Text).
- Behavior: renders inside `Prose` with the long-form typography rules.

### `StatsBlock`
- Fields: `stats[]` (`label`, `value`, `note?`). 3 or 4 items.
- Examples: "1,800+ members", "27 chapters", "9 annual conferences".

### `ChaptersMapBlock`
- Fields: `heading`, `description?`.
- Behavior: lazy-loads `Map` primitive, plots chapter coordinates from Sanity.

### `LogoCloudBlock`
- Fields: `heading`, `logos[]` (image + alt + url).
- Use: partner institutions, conference sponsors.

### `TimelineBlock`
- Fields: `events[]` (`year`, `title`, `description?`).
- Use: SCS history page, biography pages.

### `FAQBlock`
- Fields: `heading`, `entries[]` (linked `faqEntry` documents) or `categoryFilter`.
- Layout: accordion (Radix Collapsible).

## Renderer contract

```tsx
// _blockRenderer.tsx
type Block =
  | HeroBlock
  | MissionStatementBlock
  | FeaturedNewsBlock
  /* … */;

export function renderBlock(block: Block) {
  switch (block._type) {
    case 'heroBlock': return <Hero {...block} />;
    /* … */
    default: {
      const _exhaustive: never = block;
      return null;
    }
  }
}
```

The exhaustive switch enforces "you cannot ship a new block type without updating the renderer."

## Composability rules

- Blocks render exactly the layout described. They do not query the CMS for additional data — pages do that and pass it in via props.
- Blocks may not import each other. If two blocks share UI, extract a primitive into `components/ui/`.
- A page is, in v1, always a `Hero` plus a sequence of `Block`s. No bespoke page layouts unless approved.
