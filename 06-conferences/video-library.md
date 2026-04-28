# Video library (`/videos`)

## Purpose

A unified view across every `talk` on the site — conference talks AND standalone lectures — with rich filtering.

## Layout

Sidebar (desktop) or filter chips (mobile) for:

- Year (any year a talk exists)
- Speaker (autocomplete)
- Topic
- Conference vs. lecture

Main column: grid of `TalkCard`s (poster, title, speaker, duration), 24 per page, paginated.

## Search input

Free-text input that filters on `title`, `speaker.name`, and `description`. Client-side filter on already-loaded results, plus URL param for shareability.

## Featured section

At the top, a single curated featured talk pulled from `homepage.featuredTalk` or the most recent talk if not curated.

## Improvements over the current site

- **Unified video archive.** Today, talks are scattered across conference pages and news posts.
- **Multi-axis filtering.** Speaker × year × topic.
- **Shareable filtered views** via URL params.
