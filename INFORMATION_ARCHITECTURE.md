# Information Architecture

Every page on the new site, with the URL pattern, owning subtask folder, and source of content.

## Top-level navigation

```
Home
About
  ├ Mission & Vision
  ├ Leadership & Board
  ├ FAQ
  └ Statutes & Bylaws
News
Events
  ├ Calendar
  ├ Gold Masses
  ├ Conferences (annual + archive)
  └ Lectures & Webinars
Resources
  ├ Catholic Scientists of the Past
  ├ Ideas & Discussions
  ├ Video Library
  └ Reading Recommendations
Chapters
  ├ Chapter Directory
  └ Start a Chapter
Membership
  ├ Become a Member
  ├ Member Portal (auth-gated)
  └ Member Directory (auth-gated)
Donate
```

A persistent "Donate" CTA in the header points to `08-donations`. A "Sign in / Member Portal" affordance appears top-right (Clerk-powered).

## Full URL inventory

| URL | Page | Owner | Content source |
| --- | --- | --- | --- |
| `/` | Home | 03 | Sanity (homepage singleton) |
| `/about` | About hub | 03 | Sanity |
| `/about/mission` | Mission & Vision | 03 | Sanity |
| `/about/leadership` | Leadership & Board | 03 | Sanity (people doc) |
| `/about/faq` | FAQ | 03 | Sanity |
| `/about/statutes` | Statutes / bylaws | 03 | Sanity |
| `/news` | News index | 04 | Sanity (post[]) |
| `/news/[slug]` | News article | 04 | Sanity (post) |
| `/news/category/[slug]` | News category | 04 | Sanity |
| `/news/feed.xml` | RSS feed | 04 | derived |
| `/events` | Calendar / list | 05 | Sanity (event[]) |
| `/events/[slug]` | Event detail | 05 | Sanity |
| `/events/gold-masses` | Gold Masses landing | 05 | Sanity |
| `/events/calendar.ics` | iCal feed | 05 | derived |
| `/conferences` | Conference archive | 06 | Sanity |
| `/conferences/[year]` | Annual conference page | 06 | Sanity |
| `/conferences/[year]/talks/[slug]` | Talk + video | 06 | Sanity |
| `/lectures` | Lectures & webinars | 06 | Sanity |
| `/lectures/[slug]` | Lecture detail | 06 | Sanity |
| `/scientists-of-the-past` | Biography index | 03 | Sanity |
| `/scientists-of-the-past/[slug]` | Biography page | 03 | Sanity |
| `/ideas` | Ideas & discussions index | 03 | Sanity |
| `/ideas/[slug]` | Idea/essay detail | 03 | Sanity |
| `/videos` | Video library | 06 | Sanity (talk[]) |
| `/chapters` | Chapter directory | 03 | Sanity |
| `/chapters/[slug]` | Chapter page | 03 | Sanity |
| `/chapters/start` | Start a chapter | 03 | Sanity |
| `/membership` | Membership overview | 07 | Sanity |
| `/membership/apply` | Application form | 07 | Sanity copy + form |
| `/membership/dues` | Pay dues (Stripe redirect) | 07 + 08 | Stripe |
| `/account` | Member portal home | 07 | Postgres |
| `/account/profile` | Edit profile | 07 | Postgres |
| `/account/directory` | Member directory | 07 | Postgres |
| `/account/rsvps` | My event RSVPs | 07 | Postgres |
| `/account/billing` | Stripe customer portal redirect | 07 + 08 | Stripe |
| `/donate` | Donate landing | 08 | Sanity copy + Stripe |
| `/donate/thank-you` | Donation confirmation | 08 | static |
| `/sitemap.xml` | XML sitemap | 10 | derived |
| `/robots.txt` | Robots | 10 | static |
| `/api/webhooks/stripe` | Stripe webhook | 07 + 08 | — |
| `/api/webhooks/sanity` | Revalidation hook | 02 + 11 | — |
| `/api/webhooks/clerk` | User sync hook | 07 | — |
| `/api/search` | Site search | 09 | derived |

## Page block library (home + content pages)

The home page and most "about" pages are composed from a fixed set of content blocks defined in Sanity. Each block has a corresponding React component in `components/blocks/`. This is what lets editors rearrange the home page without a deploy.

Block types (v1):

```
HeroBlock              — full-width image, headline, CTAs
MissionStatementBlock  — pull-quote treatment of mission
FeaturedNewsBlock      — selects N latest or curated news posts
UpcomingEventsBlock    — next N events from the calendar
FeaturedScientistBlock — "Catholic scientist of the week" rotation
VideoSpotlightBlock    — embedded talk with summary
CalloutBlock           — colored CTA panel (membership, donate, conference)
TestimonialBlock       — member or speaker quotes
RichTextBlock          — Portable Text body
StatsBlock             — counters (members, chapters, lectures held)
ChaptersMapBlock       — world map of chapters
LogoCloudBlock         — partner / institution logos
```

Spec for each lives in `01-design-system/component-library.md` (visual) and `02-cms-schema/content-models.md` (data shape).

## Content type inventory (Sanity)

| Type | Purpose | Owner |
| --- | --- | --- |
| `homepage` (singleton) | Home page block list | 02, 03 |
| `siteSettings` (singleton) | Nav, footer, contact info, social | 02 |
| `page` | Generic CMS page (about/mission, statutes, etc.) | 02, 03 |
| `post` | News & announcements article | 02, 04 |
| `event` | Any event (Gold Mass, lecture, conference) | 02, 05 |
| `eventCategory` | Gold Mass / lecture / conference / panel | 02 |
| `conference` | Annual conference container | 02, 06 |
| `talk` | Single conference talk or lecture, with video | 02, 06 |
| `scientist` | Catholic scientist of the past (biography) | 02, 03 |
| `chapter` | Regional chapter | 02, 03 |
| `person` | Author/speaker/board member (shared) | 02 |
| `faqEntry` | Single FAQ Q&A | 02, 03 |
| `idea` | Essay / discussion piece | 02, 03 |
| `category` | Cross-cutting taxonomy | 02 |

## URL preservation

The existing site has years of inbound links. **Every existing public URL must redirect to its new equivalent** (or to the closest match) via `next.config.js` redirects. The mapping table is built and maintained in `12-content-migration/url-redirect-map.md`.
