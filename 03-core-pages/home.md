# Home page (`/`)

## Page model

Fully block-driven from the `homepage` Sanity singleton. The route reads `homepageQuery` and renders each block in order via `_blockRenderer`.

## Recommended block sequence (editor-configurable)

A solid default editors can rearrange:

1. `HeroBlock` — full-bleed photograph (annual conference, lab, sacred art tied to St. Albert), display headline, two CTAs ("Become a member", "Watch our latest lecture").
2. `MissionStatementBlock` — one paragraph of the mission, pull-quote treatment.
3. `FeaturedNewsBlock` — three latest posts, editorial list.
4. `UpcomingEventsBlock` — next three events, with prominent date column.
5. `FeaturedScientistBlock` — Catholic scientist of the week, in rotation mode.
6. `VideoSpotlightBlock` — featured talk from the most recent conference.
7. `StatsBlock` — members, chapters, conferences-held counters.
8. `ChaptersMapBlock` — world map, sells the international scope.
9. `CalloutBlock` — donation CTA in claret tone.
10. `LogoCloudBlock` — partner institutions.

Editors can add/remove/reorder. The renderer accepts any sequence.

## Improvements over the current site

- **Single hero, not three competing modules.** The current home page tries to lead with a slider plus a "newsletter signup" plus a "donate" plus a "next conference" all above the fold. We commit to a single anchor.
- **Editorial list for news, not card grid.** Cards force titles to short lengths. Editorial lists let titles breathe.
- **Featured scientist of the week in real type.** Currently shown as a link; here it's a small editorial component with portrait and 2-sentence summary.
- **Map sells global reach.** The current site lists chapters as a long bullet list. A real map communicates 25+ chapters across 4 continents instantly.
- **Donate is a single, clear CTA at one moment in the page.** Not three "donate" buttons in different colors.

## Performance targets

- LCP element: hero image (using `priority`).
- LCP < 2.0s on 4G.
- Lighthouse perf ≥ 95.
- Total JS shipped: < 100KB gzipped initial.

## Metadata

```ts
export async function generateMetadata(): Promise<Metadata> {
  const homepage = await sanityClient.fetch(homepageQuery, {}, { next: { tags: ['homepage'] } });
  return {
    title: homepage.seo?.title ?? 'Society of Catholic Scientists',
    description: homepage.seo?.description ?? 'An international organization fostering fellowship among Catholic scientists.',
    openGraph: {
      title: ...,
      description: ...,
      images: homepage.seo?.image ? [urlFor(homepage.seo.image).width(1200).url()] : [],
    },
  };
}
```

## JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Society of Catholic Scientists",
  "url": "https://catholicscientists.org",
  "logo": "https://catholicscientists.org/logo.png",
  "sameAs": ["https://www.youtube.com/@SocietyOfCatholicScientists", ...]
}
```

Rendered in a `<script type="application/ld+json">` in the layout, populated from `siteSettings`.
