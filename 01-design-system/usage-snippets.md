# Design System Usage Snippets

Copy-paste examples for downstream agents implementing pages and features.

## Typography

### Headings

```tsx
import { Heading } from '@/components/ui';

// Semantic heading with display styling
<Heading variant="display">Hero Headline</Heading>

// Page title
<Heading variant="h1">Page Title</Heading>

// Section headings
<Heading variant="h2">Section Title</Heading>
<Heading variant="h3">Subsection</Heading>

// Small labels
<Heading variant="eyebrow">Label</Heading>

// Polymorphic: render as h1 but style as h2
<Heading variant="h2" as="h1">Title (styled as h2)</Heading>
```

### Body Text

```tsx
import { Text } from '@/components/ui';

// Standard body text
<Text>Standard paragraph text.</Text>

// Lead paragraph (intro text, larger)
<Text variant="lead">Introduction paragraph.</Text>

// Caption (small, semibold)
<Text variant="caption">Image caption or label.</Text>

// Tone variants (default, muted, subtle)
<Text tone="default">Normal text</Text>
<Text tone="muted">Secondary text</Text>
<Text tone="subtle">Tertiary text (lowest contrast)</Text>
```

### Long-form Content (Prose)

```tsx
import { Prose } from "@/components/ui";

// Wrap CMS Portable Text or rich content
<Prose>
  {/* All h2, h3, p, ul, blockquote, etc. styled automatically */}
  <h2>Article Title</h2>
  <p>First paragraph...</p>
  <ul>
    <li>Bullet point</li>
  </ul>
  <blockquote>Quote</blockquote>
</Prose>;
```

## Layout

### Container (width constraint)

```tsx
import { Container } from '@/components/ui';

// Content width (760px) - most common
<Container width="content">
  <h1>Article</h1>
  <p>Content here...</p>
</Container>

// Prose width (65 characters)
<Container width="prose">
  {/* Long-form text */}
</Container>

// Wide (1024px) - feature pages
<Container width="wide">
  {/* Grid layouts, etc. */}
</Container>

// Full width (1280px) - home page
<Container width="full">
  {/* Hero sections, etc. */}
</Container>
```

### Stacking

```tsx
import { Stack, Inline } from '@/components/ui';

// Vertical spacing
<Stack gap="4">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Stack>

// Horizontal spacing
<Inline gap="4">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
</Inline>

// Gap options: 0, 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32
```

## Form Elements

### Buttons

```tsx
import { Button } from '@/components/ui';

// Variants: primary, secondary, ghost, link, sacred
<Button variant="primary">Primary CTA</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="link">Link Style</Button>
<Button variant="sacred">Liturgical</Button>

// Sizes: sm, md, lg
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button isLoading>Loading...</Button>

// As link
<Button as="a" href="/donate">Donate</Button>
```

## Surface Components

### Cards

```tsx
import { Card } from '@/components/ui';

// Border variant (default)
<Card variant="border">
  <h3>Card Title</h3>
  <p>Card content.</p>
</Card>

// Shadow variant
<Card variant="shadow">
  <h3>Card Title</h3>
  <p>Card content.</p>
</Card>

// Semantic article card
<Card as="article" variant="border">
  <h3>Article Title</h3>
  <p>Summary...</p>
</Card>
```

### Badges

```tsx
import { Badge } from '@/components/ui';

// Variants: default, gold, claret, success, warning, info
<Badge variant="default">Badge</Badge>
<Badge variant="gold">Featured</Badge>
<Badge variant="claret">Sacred</Badge>
```

### Callouts

```tsx
import { Callout } from "@/components/ui";

// Used for promotional panels
<Callout
  tone="gold"
  eyebrow="Action"
  heading="Become a Member"
  body="Join a community of Catholic scientists."
  action={<Button variant="primary">Learn More</Button>}
/>;

// Tone options: default, gold, claret, ink
```

### Alerts

```tsx
import { Alert } from '@/components/ui';

// Variants: info, success, warning, error
<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

### Avatars

```tsx
import { Avatar } from '@/components/ui';

// With fallback initials
<Avatar
  initials="JD"
  name="Jane Doe"
  size="md"
/>

// With image
<Avatar
  src="/jane.jpg"
  alt="Jane Doe"
  size="lg"
/>

// Sizes: sm, md, lg
```

## Content Components

### Quotes

```tsx
import { Quote } from "@/components/ui";

<Quote citation="Saint Albert the Great">
  The study of nature is the path to God.
</Quote>;
```

### Definitions / Glossary

```tsx
import { Definition } from "@/components/ui";

<Definition
  items={[
    {
      term: "What is a Gold Mass?",
      definition: "A special liturgical celebration...",
    },
    {
      term: "Who can join?",
      definition: "Any practicing Catholic scientist...",
    },
  ]}
/>;
```

### Dividers

```tsx
import { Divider } from '@/components/ui';

// Simple rule
<Divider />

// With label
<Divider label="OR" />

// With ornament (fleuron, cross, etc.)
<Divider ornament="✦" />
```

## Page Blocks

### Hero Block

```tsx
import { HeroBlock } from "@/components/blocks";

<HeroBlock
  eyebrow="Welcome"
  headline="Main Headline"
  subhead="Subheading or description"
  image={{ src: "/path/to/image.jpg", alt: "Description" }}
  actions={[
    { label: "Primary CTA", variant: "primary" },
    { label: "Secondary CTA", variant: "secondary" },
  ]}
  tone="gold"
  variant="home" // or 'inner' for content pages
/>;
```

### Mission Statement Block

```tsx
import { MissionStatementBlock } from "@/components/blocks";

<MissionStatementBlock
  kicker="Our Mission"
  statement="Bringing together the scientific and spiritual dimensions..."
  signature="— The Society of Catholic Scientists"
/>;
```

### Callout Block

```tsx
import { CalloutBlock } from "@/components/blocks";

<CalloutBlock
  tone="gold"
  heading="Become a Member"
  body="Join a community of Catholic scientists..."
  action={<Button variant="primary">Learn More</Button>}
/>;
```

### Stats Block

```tsx
import { StatsBlock } from "@/components/blocks";

<StatsBlock
  heading="By the Numbers"
  stats={[
    { value: "1,800+", label: "Members" },
    { value: "27", label: "Chapters" },
    { value: "9", label: "Conferences" },
  ]}
/>;
```

## Color Tokens

### Semantic tokens (use these, not primitives)

```tsx
// In Tailwind classes
<div className="bg-bg-canvas text-fg-default">
  {/* Page background with default text color */}
</div>

<a href="#" className="text-fg-link hover:text-fg-link-hover">
  Link
</a>

<div className="border border-border-default">
  {/* Default border */}
</div>

<div className="bg-bg-surface border border-border-focus">
  {/* Surface with focus border (e.g., for inputs) */}
</div>

// Available semantic tokens:
// bg-canvas, bg-surface, bg-surface-muted, bg-inverse
// fg-default, fg-muted, fg-subtle, fg-on-inverse
// fg-link, fg-link-hover, fg-sacred
// border-default, border-strong, border-focus
```

### Primitive colors (rarely used directly)

```tsx
// For special branding or accent needs
<div className="bg-gold-500 text-ink-950">
  {/* Gold background with ink text */}
</div>

<div className="border-2 border-claret-700">
  {/* Claret border (liturgical accent) */}
</div>

// Color scales: gold, ink, parchment, claret
// Each has shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
```

## Accessibility Checklist

Every component you use has these guarantees:

- ✓ Semantic HTML (proper `<button>`, `<nav>`, `<article>`, etc.)
- ✓ Keyboard accessible (Tab, Enter, Esc all work)
- ✓ Focus visible (gold ring visible on every focusable element)
- ✓ Color contrast (4.5:1 for body, 3:1 for large text/UI)
- ✓ Screen reader support (ARIA labels where needed)
- ✓ Motion respects `prefers-reduced-motion`

## Common Patterns

### Centered content with max width

```tsx
<Container width="content" className="py-24">
  <h1 className="text-center">Title</h1>
  <p className="text-center">Centered paragraph</p>
</Container>
```

### Card grid (3 or 4 columns)

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </Card>
  ))}
</div>
```

### Call-to-action section

```tsx
<CalloutBlock
  tone="gold"
  heading="Ready to Join?"
  body="Become part of a growing community of Catholic scientists."
  action={<Button variant="primary">Apply Today</Button>}
/>
```

### Article with sidebar

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    <Prose>{/* Main article content */}</Prose>
  </div>
  <aside>
    <Card variant="border">
      <h3>Related</h3>
      {/* Sidebar content */}
    </Card>
  </aside>
</div>
```

## Design Token Reference

All tokens are defined in `packages/config/tailwind.preset.ts` and available as Tailwind utilities:

- **Typography**: `font-serif`, `font-sans`, `font-mono`
- **Colors**: `text-gold-500`, `bg-ink-950`, `border-parchment-200`, etc.
- **Spacing**: `p-4`, `m-6`, `gap-8` (8-point grid)
- **Sizing**: `text-lg`, `rounded-md`, `w-12`, `h-16`
- **Effects**: `shadow-md`, `ring-2`, `ring-offset-2`
- **Motion**: `transition-colors`, `duration-150`, `ease-out-quad`

## Notes for Agents

1. **Server Components by default.** Use `'use client'` only for interactive elements (buttons in modals, form state, etc.).
2. **Never hard-code colors.** Use semantic tokens or color scale utilities; never write `#fff` or `rgb()` directly.
3. **No inline styles.** Always use Tailwind classes. If a class doesn't exist, add it to the preset.
4. **Compose don't build.** Use existing primitives and blocks. Don't roll custom components unless explicitly approved.
5. **Test keyboard navigation.** Every form, button, and interactive element must work with Tab and Enter.
