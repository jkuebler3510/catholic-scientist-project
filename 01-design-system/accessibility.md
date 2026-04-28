# Accessibility baseline

WCAG 2.2 AA is the project floor. Every primitive ships with documented compliance.

## Per-component checklist

For every component delivered:

- [ ] **Semantic HTML.** Use the right tag (`button`, `nav`, `main`, `article`, `aside`, `figure`, `header`, `footer`, etc.) before reaching for `div`s.
- [ ] **Keyboard interaction.** Document and test Tab, Shift-Tab, Enter, Space, Esc, arrow keys.
- [ ] **Focus visible.** Every focusable element shows a visible focus ring on `:focus-visible`. Default ring: 2px solid `border-focus` with 2px offset.
- [ ] **ARIA correctness.** Don't add `role`/`aria-*` to elements that already have implicit semantics. When you do need them, follow ARIA Authoring Practices.
- [ ] **Color contrast.** 4.5:1 for body, 3:1 for large/UI. Verified against every background variant.
- [ ] **Don't rely on color alone.** Status badges include an icon. Form errors use both color and an icon + text.
- [ ] **Touch target size.** ≥ 44 × 44 px for any interactive element on mobile.
- [ ] **Reduced motion.** Honor `prefers-reduced-motion: reduce` — disable transitions, freeze auto-animations.

## Page-level requirements

- Every page has a `SkipToContent` link as the first focusable element.
- Every page sets `<html lang="en">`.
- Every page has exactly one `<h1>` (the page title).
- The header `<nav>` has `aria-label="Primary"`. The footer `<nav>` has `aria-label="Footer"`.
- Forms surface errors at the field and announce them via `aria-live="polite"` for screen reader users.
- All images via `next/image` require explicit `alt`. Decorative images use `alt=""`. The component type signature enforces this.
- All YouTube embeds include a `title` attribute and a captioned poster.

## Testing

- **axe-core** runs in Playwright on every public route in CI.
- **Pa11y CI** as a secondary check during nightly builds.
- **Manual.** Tab through the site once per release. Use VoiceOver (macOS) or NVDA (Windows) to spot-check critical flows: apply, donate, RSVP, member portal.

## Specific patterns

- **Dialogs and sheets** trap focus and restore it on close.
- **Skip-to-content** is positioned to be visible on focus, not hidden off-screen permanently.
- **Mobile menu** uses a properly labeled `<button aria-expanded aria-controls>`.
- **Tabs** use Radix Tabs (already keyboard-correct). Don't roll your own.
- **Accordions** (FAQ block) use Radix Collapsible. Allow multiple open at once unless single-open is explicitly required.
- **Carousels** are forbidden. We do not autoplay anything.

## Non-negotiables

- No `tabindex` greater than 0.
- No removing the focus ring without providing an equally visible alternative.
- No "fake" buttons (`<div onclick>`). Use `<button>`.
- No "fake" links (`<span>` with click handler). Use `<a>` (Next.js `Link`).
- No `outline: none` without `:focus-visible` styles to compensate.
