# Taxonomy

## `category` document

The `category` content type in Sanity (`02-cms-schema/content-models.md`) is the cross-cutting tag for every type. One taxonomy across news, ideas, talks, conferences, scientists.

## Suggested initial categories

Curated by SCS editors but reasonable defaults:

- Astronomy / Cosmology
- Biology / Genetics
- Chemistry
- Physics
- Mathematics
- Neuroscience
- Philosophy of Science
- Theology of Nature
- History of Science
- Bioethics
- Catholic Tradition
- Education

Editors can add/remove. Slug conventions: lowercase, kebab-case.

## Topic pages (`/topics/[slug]`)

Auto-generated from the `category` document. Layout:

1. Eyebrow ("Topic")
2. Display title (category name)
3. Description (Portable Text from `category.description`)
4. Tabs: All · News · Talks · Ideas · Scientists · Events
5. Content list per tab, paginated.

Each tab's results are pulled via a GROQ query filtered by `references($categoryId)`.

## Sitemap

Topic pages are in the sitemap. They have non-trivial cross-content value for SEO.

## SEO

- Title: "Topic: [name] — Society of Catholic Scientists"
- Description: first 160 chars of the category description, fallback to a default.

## Improvements over the current site

- **Structured tagging** instead of free-form WordPress tags.
- **Cross-type discovery.** Click "Genetics" and see news, talks, biographies, and events all together.
