# Component library

The full primitive inventory. Each entry lists name, purpose, props, behaviors, accessibility requirements.

Every component lives in `apps/web/components/ui/<name>.tsx` and is exported from a barrel `index.ts`. Components are Server Components unless flagged `'client'` below.

## Foundation

### `Heading` (h1–h6)
Polymorphic heading with `as` and `variant`. Variants map to the type scale: `display`, `h1`, `h2`, `h3`, `h4`, `eyebrow`. Always renders the right HTML tag for semantics, irrespective of visual variant.

### `Text`
Body text with `variant` (`body | lead | caption`), `tone` (`default | muted | subtle`), `as` polymorphic.

### `Prose`
Wrapper for CMS-rendered Portable Text. Applies the long-form typography rules: max-width prose, drop cap option, heading rhythm.

### `Container`
Width constraint: `prose | content | wide | full`. Sets horizontal padding responsively.

### `Stack` and `Inline`
Vertical/horizontal spacing primitives, gap-driven. Replaces ad-hoc `space-y-*` chains.

### `Divider`
Horizontal rule with optional label and ornament (Catholic context: small cross or fleuron flourish for liturgical pages — see `chapters` and `gold-masses`).

## Form

### `Button` (client where needed)
Variants: `primary | secondary | ghost | link | sacred` (claret-tinted). Sizes: `sm | md | lg`. Loading state, disabled state, polymorphic `asChild` via Radix Slot.

### `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `DatePicker`
Built on Radix primitives where Radix exists, native HTML otherwise. All wrap labels and error messaging via the `Field` component.

### `Field` (client)
Composes label, control, hint, and error. Uses `useFormContext` from React Hook Form. Auto-wires `aria-describedby`.

### `Form` (client)
React Hook Form `<form>` wrapper that takes a Zod schema and calls a Server Action with parsed values. The standard for every form on the site.

## Navigation

### `Header`
Top of every page. Logo, primary nav, donate CTA, member portal affordance (sign in or "Member portal" link). Mobile: drawer.

### `Footer`
Site-wide. Sitemap, legal, social, donate CTA, newsletter sign-up (form post to a placeholder until newsletter is chosen post-launch).

### `Breadcrumbs`
Used on event/conference/biography detail pages. Schema.org `BreadcrumbList` JSON-LD.

### `NavLink`
Polymorphic active-aware link primitive. Knows when its href matches the current path.

### `SkipToContent`
Always-rendered, hidden until focused. First focusable element on every page.

## Surface

### `Card`
Token-driven card (border or shadow, never both). Supports `as="article"` for semantic content.

### `Callout`
Colored panel CTA. Variants: `default | gold | claret | ink`. Accepts heading, body, and an action slot.

### `Badge`
Small status pill. Variants: `default | gold | claret | success | warning | info`.

### `Avatar`
With initials fallback. Used in member directory, author bylines.

## Feedback

### `Alert`
Inline message: `info | success | warning | error`. Always includes an icon.

### `Toast` (client)
Radix Toast. Used for ephemeral feedback (e.g. "RSVP confirmed").

### `Skeleton`
Loading placeholder for the rare client-fetched surface.

## Overlay

### `Dialog` (client)
Radix Dialog. Used for the membership application sub-flows, RSVP confirmations.

### `Sheet` (client)
Side drawer. Mobile nav, account menu.

### `DropdownMenu` (client)
Radix DropdownMenu. Used in the header for account menu.

## Media

### `Picture`
Wraps `next/image` with our standard aspect-ratio + lazy + alt-required type signature. Accepts a Sanity asset and uses `@sanity/image-url` for the URL.

### `VideoEmbed` (client)
`lite-youtube-embed`. Takes a YouTube ID and a poster image. SSR-safe, hydrates on user interaction.

### `Map` (client, lazy)
MapLibre GL with protomaps. Loaded only when the user clicks "Show map".

## Content

### `Quote`
Pull-quote treatment. Optional citation.

### `Definition`
For glossary-style content (e.g., "What is a Gold Mass?" — used on FAQ and Gold Masses pages).

### `Timeline`
For biography pages — life events of a Catholic scientist.

### `EventCard`, `PostCard`, `ScientistCard`, `TalkCard`
Composed from `Card`, `Heading`, `Text`, `Picture`, `Badge`. Per-content-type card styling.

## Utility

### `Pagination`
Client-aware pagination using `useSearchParams`.

### `Tabs` (client)
Radix Tabs. Used on the conferences index (Programs / Talks / Photos).

### `CopyToClipboard` (client)
For sharing event links, biography URLs.

## Minimum accessibility per component

Every component MUST document:

1. Required keyboard interactions (Tab order, Enter/Space, Esc, arrows).
2. ARIA semantics it provides automatically.
3. Whether it traps focus (Dialog, Sheet — yes; everything else — no).
4. Color contrast for every variant (verified, recorded).
5. Reduced-motion behavior if it animates.

Document in JSDoc above the component and in the design route.

## Naming

- Component file: `kebab-case.tsx` (Next.js convention).
- Exported component: `PascalCase`.
- Variants: `camelCase` strings, never booleans like `primary={true}`.
