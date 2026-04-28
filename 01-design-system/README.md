# 01 — Design System

## Mission

Define the brand tokens, typography, color, spacing, accessibility baseline, and reusable component library that every page and block in the site will compose from.

## Why this matters

The design system is the project's most leveraged surface — it shows up on every page, in every email, on every form. A coherent, accessible, performant set of primitives is what separates a site that feels professionally crafted from one that feels stitched together by ten different agents.

## Inputs (read these first, in order)

1. `/README.md`
2. `/DESIGN_PRINCIPLES.md`
3. `/ARCHITECTURE.md` — "Cross-cutting concerns" section
4. `/TECH_DECISIONS.md` — "Styling" section
5. `tokens.md`
6. `typography.md`
7. `component-library.md`
8. `accessibility.md`
9. `block-library.md`

## Deliverables

- `packages/config/tailwind.preset.ts` — full token system (color, type, spacing, radii, shadows, motion).
- `apps/web/styles/globals.css` — base reset, font loading, CSS variables, focus styles.
- `apps/web/components/ui/` — primitive components (see `component-library.md` for the full list, ~25 components).
- `apps/web/components/blocks/` — CMS-driven content blocks (see `block-library.md`).
- A Storybook (or `apps/web/app/(dev)/_design/` route) showing every primitive and block.
- `01-design-system/usage-snippets.md` — copy-paste examples for downstream agents.
- An accessibility checklist applied to every component (keyboard, screen reader, contrast, focus, motion).

## Acceptance criteria

- [ ] Every primitive renders correctly in Storybook / the design route, in light theme.
- [ ] All color combinations meet WCAG 2.2 AA contrast (4.5:1 for body, 3:1 for large text and UI).
- [ ] Every interactive component is fully keyboard-accessible.
- [ ] axe-core passes on the design route.
- [ ] No primitive depends on browser-only APIs in render paths (Server Component-safe).
- [ ] Tailwind preset exports a single canonical set of tokens; no hard-coded colors anywhere outside the preset.
- [ ] `next/font` configured for the chosen serif + sans pairing with subset and display swap.
- [ ] All primitives are exported from a single barrel `apps/web/components/ui/index.ts`.

## Out of scope

- Page-level layouts (owned by `03`–`08`).
- Marketing copy (owned by Sanity content + content authors).
- Dark mode visual design — define tokens that *could* support it, but ship light only in v1.

## Dependencies

| Folder | What we need from it |
| --- | --- |
| `00-foundation` | Tailwind installed, Tailwind preset wired, ESLint a11y rules active |

## Open questions

- Final type pairing (serif + sans). Recommendation in `typography.md`.
- Whether to publish components as `packages/ui` or keep collocated. Default: collocated (see `00-foundation/decisions-to-make.md` §3).

## Suggested agent prompt

> You are building the design system for the Society of Catholic Scientists website rebuild. Tailwind + shadcn/ui as the substrate. The design must feel scholarly and reverent without being stuffy or pious — read `/Catholic Scientist Project/DESIGN_PRINCIPLES.md` carefully.
>
> **Read first, in order:**
> 1. `/Catholic Scientist Project/README.md`
> 2. `/Catholic Scientist Project/DESIGN_PRINCIPLES.md`
> 3. `/Catholic Scientist Project/ARCHITECTURE.md`
> 4. `/Catholic Scientist Project/TECH_DECISIONS.md`
> 5. Every `.md` file in `/Catholic Scientist Project/01-design-system/`.
>
> **Your job.** Define design tokens in `packages/config/tailwind.preset.ts`. Implement the primitive library in `apps/web/components/ui/`. Implement the content block library in `apps/web/components/blocks/`. Set up font loading via `next/font`. Build a `/dev/design` route (or Storybook) showing every primitive and block. Ensure WCAG 2.2 AA across the board.
>
> **Acceptance.** Every primitive renders, axe-core clean, contrast verified, all components Server-Component-safe by default.
>
> **When you finish,** post a screenshot of the design route, the contrast audit results, and any open visual decisions you escalated.
