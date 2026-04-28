# Catholic Scientists of the Past (`/scientists-of-the-past/*`)

## Routes

- `/scientists-of-the-past` — index (sortable by name, year, field)
- `/scientists-of-the-past/[slug]` — biography page

## Index page

Layout: editorial list with portrait + name + dates + field on each row, on desktop. On mobile, smaller cards. Default sort: by birth year ascending. Filter chips for `field` values present in the dataset (e.g., Astronomy, Genetics, Mathematics, Physics, Theology-of-Nature). Search input filters by name + nationality + field.

This is the site's most distinctive content — give it space.

## Biography page

Layout, top to bottom:

1. Breadcrumbs
2. Eyebrow ("Catholic Scientist of the Past") + Name (display) + dates + nationality
3. Portrait (right-aligned on desktop, full-width on mobile, with caption noting the source/period of the portrait)
4. Lead summary paragraph
5. `Prose` body (full biography Portable Text), with optional drop cap on the first paragraph
6. `Quote` pull-outs interspersed (Portable Text custom block)
7. Key Contributions (if present): styled list
8. Further Reading (if present): typographic list with external link icons
9. Related: 3 other scientists (same `field` if possible)

## Schema notes

The `scientist` document supports `keyContributions[]`, `quotes[]`, and `furtherReading[]`. These render as discrete sections and are optional — biographies without them simply skip those sections cleanly.

## Improvements over the current site

- **Real biography pages instead of a wiki-style list.** Each scientist gets a full editorial treatment.
- **Quote pull-outs.** Direct quotes from the scientist, properly styled.
- **Filter & search on the index.** The current site has none.
- **Related scientists** at the bottom invite further reading.
- **Author credit.** If a biography was contributed by a member, surface their name and link to their profile. (Pulls from the optional `author` reference.)
