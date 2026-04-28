# Gold Masses (`/events/gold-masses`)

## Why this page exists

Gold Masses for Scientists are one of SCS's defining traditions — votive Masses in honor of St. Albert the Great (patron of natural science). The current site has a Gold Masses page; we promote it here.

## Layout

1. Hero with imagery tied to St. Albert (sacred art, gold tones)
2. Eyebrow ("A Tradition of the Society")
3. Display headline ("Gold Masses for Scientists")
4. Lead paragraph explaining what a Gold Mass is
5. **What is a Gold Mass?** section — Portable Text from a CMS page
6. **Upcoming Gold Masses** section — `UpcomingEventsBlock` filtered to `category == 'gold-mass'`
7. **Past Gold Masses** section — same component, past events, paginated
8. **Host a Gold Mass** section — Portable Text + CTA mailto-form for institutions wanting to host
9. **About St. Albert the Great** section — short biography linking to his entry in `/scientists-of-the-past/[albert-the-great]`

The page is partially block-driven (CMS provides the body) and partially structured (the events lists are computed).

## Static content source

A `page` document in Sanity with slug `events/gold-masses` provides the marketing copy. The events lists are GROQ-queried at request time and revalidated on tag.

## Improvements over the current site

- **Visual treatment that matches the gravity of the tradition.** Sacred imagery, claret-tinted accents, generous typography.
- **Past Gold Masses** properly archived and linkable.
- **"Host a Gold Mass" callout.** Surfaces the path for institutions to participate.
