# Search UI patterns

## Global ⌘K dialog

A `SearchDialog` (Radix Dialog) opens on:

- Click of the search icon in the header
- ⌘K (macOS), Ctrl+K (Windows/Linux)
- `/` keypress when no input is focused

Layout:

```
┌──────────────────────────────────────────┐
│ 🔍 Search the Society…                   │
├──────────────────────────────────────────┤
│ ▸ News                                   │
│   • Headline matched                     │
│   • Headline matched                     │
│   See all news results →                 │
│                                          │
│ ▸ Catholic Scientists of the Past        │
│   • …                                    │
│                                          │
│ ▸ Talks & Lectures                       │
│   • …                                    │
└──────────────────────────────────────────┘
  Tip: ↑↓ to navigate · Enter to open · Esc to close
```

Behavior:

- Debounced input (200ms).
- Up/Down arrows navigate, Enter opens, Esc closes.
- Recent searches stored in `localStorage` and shown on empty state.
- A "See all results" link per group navigates to `/search?q=…&type=…`.
- Selecting a result navigates via Next.js `<Link>`.

## `/search` page

Server-rendered. Shows results without requiring JS. Used as the destination for the dialog's "See all" links and accessible directly by URL for sharing.

Layout: input at top (preserves query), filter chips for type, then a flat ranked list of hits.

`<meta name="robots" content="noindex">` so search-result pages don't pollute Google.

## Topic pages

See `taxonomy.md`.

## Empty states

- Empty input in dialog: show recent searches + "Popular topics" links.
- No results: show "No results for '[query]'. Try a related topic:" + 3 random categories as chips.
