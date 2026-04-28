# About hub (`/about/*`)

## Routes

- `/about` — overview, links to children
- `/about/mission` — formal mission statement, history, founding
- `/about/leadership` — board and staff (queries `person` documents with `role: board`)
- `/about/faq` — questions grouped by category, accordion UI
- `/about/statutes` — bylaws / governance documents (CMS page with downloadable PDF)

## Content sources

| Page | Sanity type | Notes |
| --- | --- | --- |
| `/about` | `page` (slug `about`) | Block-driven |
| `/about/mission` | `page` (slug `about/mission`) | Block-driven |
| `/about/leadership` | `person[]` filtered by role | Custom layout (grid of headshots + names + titles) |
| `/about/faq` | `faqEntry[]` grouped by category | Uses `FAQBlock` |
| `/about/statutes` | `page` (slug `about/statutes`) | Block-driven, includes `RichTextBlock` and a downloadable PDF link |

## Leadership page layout

Board first, organized into roles (President, VP, Secretary, Treasurer, At-Large). Each member shown with headshot, name, role, primary affiliation. Click → `/people/[slug]` (treated as a generic person profile route — owned by this folder, simple page using `person` document).

## FAQ structure

Categories: About SCS, Membership, Gold Masses, Conferences, Donations.

Each category renders as a section with its own H2 and an accordion. `FAQBlock` does the work; this page composes multiple `FAQBlock`s, one per category.

## Improvements over the current site

- **Statutes & bylaws as a real page**, not a buried PDF link.
- **Leadership headshots instead of a text list.**
- **FAQ search.** Add a client-side filter input above the accordion that filters questions in real time. (No external search infrastructure needed for a list this small.)
