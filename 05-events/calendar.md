# Calendar (`/events`)

## Views

Two switchable views, default depends on viewport:

- **List** (mobile default): vertical timeline. Each event row is a typography-led card showing day-of-month + month chip on the left, then title, time, location, host. Group rows by month with sticky month headers.
- **Month grid** (desktop default): traditional calendar grid with event chips. Click a day to expand its events; click an event chip to navigate to detail.

URL state:

- `/events` (defaults: upcoming, all categories, list view on mobile / grid on desktop)
- `/events?view=list&category=gold-mass&region=northeast-us`
- `/events?month=2026-06` (specific month in grid view)
- `/events?view=past&year=2024` (past events archive)

## Filters

- Category (multi): Gold Mass / Lecture / Conference / Panel / Retreat / Other.
- Region (multi): Americas / Europe / Asia / Oceania / Africa.
- Online-only toggle.

Filters drive the URL; the page is statically rendered for the most common combinations and SSR for arbitrary combinations.

## Past events

`/events?view=past&year=2024` shows the archive. Same UI, sorted descending. Lets users find recordings of past Gold Masses + lectures.

## Improvements over the current site

- **Real calendar grid view.** The current site is list-only.
- **Timezone-correct display.** Explicit "8 PM ET" labels; user's local time alongside if browser permits.
- **Region filter.** Currently no way to filter by country.
- **Past events archive** with intentional discovery, not buried in pagination.
