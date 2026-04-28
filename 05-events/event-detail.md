# Event detail (`/events/[slug]`)

## Layout

1. Breadcrumb
2. Category eyebrow + title (display) + dates (with timezone)
3. Hero image (or themed illustration if no image)
4. **Quick facts row** (sticky on desktop): date, time, venue, host. Plus action: "RSVP" (if `registrationFormEnabled`) or "Register at host site" (external).
5. `Prose` description body
6. Speakers section (`speakers[]` rendered as small `Card`s with name, headshot, affiliation)
7. Map (lazy) — venue location
8. Logistics (parking, accessibility, dress code if specified) — optional Portable Text section
9. Related: events at the same chapter or part of the same conference

## Auth-gated RSVP

If `registrationFormEnabled` is true:

- **Signed in:** RSVP button opens a `Dialog` with optional fields (dietary preferences, +1 if `allowsGuests`). Server Action submits.
- **Not signed in:** Button shows "Sign in to RSVP" → Clerk sign-in modal → upon return, dialog opens.

If `registrationUrl` is set instead, render an external link with `rel="noopener"`.

## JSON-LD

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "...",
  "startDate": "...",
  "endDate": "...",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "...",
    "address": { "@type": "PostalAddress", ... }
  },
  "performer": [{ "@type": "Person", "name": "..." }],
  "organizer": { "@type": "Organization", "name": "Society of Catholic Scientists" },
  "image": "...",
  "description": "..."
}
```

## Add-to-calendar

A small button group: "Apple", "Google", "Outlook", "Download .ics". Each generates the appropriate URL/file from the event data.

## Improvements over the current site

- **Speakers as first-class.** Headshot, affiliation, link to talks.
- **Add-to-calendar buttons.** Currently absent.
- **Map of the venue.** Currently a text-only address.
- **Auth-gated SCS-managed RSVPs**, removing the need for an external form.
