# Accessibility audit

## Automated

- **axe-core** runs in Playwright on every public route in CI. Zero violations to pass.
- **Pa11y CI** as a secondary check during nightly runs.
- **Lighthouse** accessibility score ≥ 95 on the same routes as the perf budget.

## Manual

Tab-through audit at least once per release on:

- Home
- A news article
- An event detail
- The donation form
- The application form
- The search dialog
- The member portal dashboard

Verify:

- Every interactive element is reachable.
- Focus order matches visual order.
- Focus is always visible.
- Skip-to-content jumps past nav.
- Mobile drawer opens with keyboard, traps focus, restores on close.

## Screen reader

VoiceOver (macOS) and NVDA (Windows) spot-check on:

- Home page (heading hierarchy)
- News article (article semantics)
- Event detail (date/time/location announcement)
- Application form (field labels, error announcement)

## Color & motion

- Verify with the [WebAIM contrast checker] every variant of every primitive against every background.
- Verify `prefers-reduced-motion` disables transitions site-wide.

## Forms

- Every form: error messaging surfaces in `aria-live`.
- Every input: associated label.
- Every required field: marked `aria-required`.
- Every form's success path: announces success to screen readers.

## Document language

`<html lang="en">` set in root layout.

## Heading hierarchy

Audit with axe + manual: every page has exactly one `<h1>`, headings descend without skipping levels.

## Outcome

A short PDF or markdown report with screenshots of any deficiencies found, owner assigned, and resolution status. Required to be clean before launch.
