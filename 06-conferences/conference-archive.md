# Conference archive (`/conferences`)

## Layout

A timeline of annual conferences from oldest to newest at the top, with the **upcoming** conference promoted in a hero treatment if it's open for registration.

```
[ Hero: 2026 Conference — Open for registration ]
[ Year / Theme / Dates / Location / Register CTA ]

──── Past conferences ────

2025 — Theme · City    → 12 talks
2024 — Theme · City    → 14 talks
2023 — Theme · City    → 11 talks
...
```

Each row links to the year page. On hover/focus, show count of recorded talks.

## Recommendation engine on the index

Beneath the timeline, a small "Recently watched" or "Most popular talks" section pulls from the video library. (Popularity = simple click-through count tracked in Postgres or skipped entirely for v1.)

## Improvements over the current site

- **Single timeline view** for every annual conference, instead of one navigation submenu per year.
- **Theme + photo per conference**, giving each year an identity.
- **Talk count surfaced** on the index so visitors know there's depth behind the link.
