# Content models

Canonical Sanity schema definitions. Field names use camelCase. `_type` is the document type id (lowercase).

## Singletons

### `siteSettings`
- `siteName` (string, required)
- `tagline` (string)
- `logo` (image)
- `favicon` (image)
- `socialImage` (image, used as default OG)
- `primaryNav` (array of `navItem`)
- `footerColumns` (array of `footerColumn` with link arrays)
- `socialLinks` (array of `{ platform, url }`)
- `contactEmail` (string)
- `mailingAddress` (block content)
- `donateUrl` (string, internal default `/donate`)

### `homepage`
- `seo` (object: `title`, `description`, `image`)
- `blocks` (array of references to block types — all blocks listed in `01-design-system/block-library.md`)

## Reusable

### `navItem`
- `label`, `href`, `children[]?` (one level of dropdown)

### `seo`
- `title`, `description`, `image`, `noindex` (boolean)

### `slug`
- Standard Sanity `slug` with source `title`.

## Content documents

### `page`
Generic CMS page (about/mission, statutes, leadership).
- `title`, `slug`, `seo`, `blocks[]` (block-driven content), `breadcrumbHidden?`

### `post` (news article)
- `title`, `slug`, `excerpt`, `coverImage`, `coverImageAlt` (required if image)
- `publishedAt` (datetime, required)
- `author` (reference to `person`)
- `categories[]` (references to `category`)
- `tags[]` (string array, free-form)
- `body` (Portable Text)
- `relatedPosts[]?`
- `seo`

### `event`
- `title`, `slug`, `summary`
- `startDate`, `endDate` (datetime)
- `timezone` (string, required for accurate display)
- `category` (reference to `eventCategory`: gold-mass | lecture | conference | panel | retreat | other)
- `location` (object: `venue`, `address`, `city`, `region`, `country`, `geo` lat/lng)
- `online` (boolean) + `streamUrl?`
- `host` (reference to `chapter` or free-form `hostText`)
- `speakers[]` (references to `person`)
- `image`
- `description` (Portable Text)
- `registrationUrl?` (external) or `registrationFormEnabled` (boolean — enables in-app RSVP, see `05-events`)
- `capacity?`
- `relatedConference?` (reference to `conference`)
- `seo`

### `eventCategory`
- `title`, `slug`, `color` (token reference), `description`

### `conference`
- `title`, `year` (number), `slug` (e.g. `2026`)
- `dates` (object: `start`, `end`)
- `location`
- `summary`
- `theme` (string)
- `posterImage`
- `programPdf` (file)
- `talks[]` (references to `talk`)
- `registrationOpen` (boolean)
- `registrationUrl?`
- `body` (Portable Text)
- `seo`

### `talk`
A single talk or lecture. Used both on conferences and standalone for `lectures`.
- `title`, `slug`
- `speaker` (reference to `person`)
- `coSpeakers[]?`
- `date` (datetime, optional — falls back to parent conference)
- `youtubeId` (string)
- `posterImage` (auto-fetched from YouTube via Studio plugin if missing)
- `description` (Portable Text)
- `parentConference?` (reference)
- `topics[]` (references to `category`)
- `durationMinutes?`
- `seo`

### `scientist` (Catholic scientist of the past)
- `name`, `slug`
- `birthYear`, `deathYear`
- `field` (string, e.g. "Genetics", "Astronomy")
- `nationality`
- `portrait` (image)
- `summary` (string, ≤ 240 chars — used in cards and metadata)
- `body` (Portable Text — full biography)
- `keyContributions[]?` (string array)
- `quotes[]?` (objects: `text`, `source?`)
- `furtherReading[]?` (objects: `title`, `url`, `description?`)
- `featuredOnHomepage` (boolean — drives the "Catholic scientist of the week" rotation if rotation is set to curated mode)
- `seo`

### `chapter`
- `name`, `slug`
- `region` (e.g. "Northeast US", "Italy")
- `country`
- `city?`
- `coordinates` (object: lat/lng)
- `coordinator` (reference to `person`)
- `contactEmail?`
- `description` (Portable Text)
- `partnerInstitutions[]?` (objects: `name`, `url?`, `logo?`)
- `recentEvents[]` (computed via reverse query, not stored)
- `seo`

### `person`
Used for board members, authors, speakers, chapter coordinators.
- `name`, `slug`
- `title?` (e.g. "Professor of Physics, Boston College")
- `affiliation?`
- `bio` (Portable Text)
- `headshot?`
- `roles[]` (string array: `board`, `author`, `speaker`, `coordinator`)
- `links[]?` (objects: `label`, `url`)

### `faqEntry`
- `question`, `answer` (Portable Text)
- `category` (string: about, membership, gold-masses, conferences, donations)
- `order` (number — for stable sorting within a category)

### `idea` (essay / discussion piece)
- `title`, `slug`
- `author` (reference to `person`)
- `publishedAt`
- `excerpt`
- `coverImage?`
- `body` (Portable Text)
- `topics[]` (references to `category`)
- `seo`

### `category`
- `title`, `slug`, `description?`, `color?`

## Block schemas

Implement one schema per block in `01-design-system/block-library.md`. Each block lives at `apps/studio/schemas/blocks/<name>.ts`. Document references (e.g. the `talk` referenced by `VideoSpotlightBlock`) use the standard Sanity `reference` type with the appropriate `to` array.

The `homepage.blocks` and `page.blocks` array fields accept `{ type: 'heroBlock' | 'missionStatementBlock' | … }` — the discriminated union the renderer in `01-design-system` expects.

## Validation rules

- Every required field uses Sanity's `Rule.required().error('…')` with a human-readable message.
- Slugs are unique within a type (Sanity's default).
- Image fields enforce `alt` text via a custom validation: image present → `alt` required.
- Datetime fields show in editor's local time but store UTC.
- `excerpt` capped at 240 characters.

## Portable Text configuration

Custom marks: `link` (with target/rel), `footnote`, `smallCaps`.

Custom blocks: `image` (with caption + alt), `quote`, `videoEmbed` (YouTube ID), `callout` (`tone`, body), `figure` (image with caption and source).

Decorators: `strong`, `em`, `code`. No underline (link styling owns that).

Lists: bulleted, numbered.
