# iCal feed (`/events/calendar.ics`)

## Purpose

Lets members subscribe to all SCS events in their calendar app. Apple Calendar, Google Calendar, and Outlook all support webcal subscriptions.

## Format

iCalendar (RFC 5545). One `VEVENT` per upcoming + past 90 days of events.

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Society of Catholic Scientists//Events//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
NAME:Society of Catholic Scientists — Events
X-WR-CALNAME:SCS Events
X-WR-TIMEZONE:UTC
REFRESH-INTERVAL;VALUE=DURATION:PT1H

BEGIN:VEVENT
UID:<event._id>@catholicscientists.org
DTSTAMP:20260427T120000Z
DTSTART:...
DTEND:...
SUMMARY:...
DESCRIPTION:...
LOCATION:...
URL:https://catholicscientists.org/events/<slug>
ORGANIZER;CN=Society of Catholic Scientists:mailto:events@catholicscientists.org
END:VEVENT
...
END:VCALENDAR
```

## Implementation

`apps/web/app/events/calendar.ics/route.ts`:

```ts
export const dynamic = 'force-dynamic';   // always serves fresh, server-cached
export const revalidate = 600;            // 10 min

export async function GET() {
  const events = await sanityClient.fetch(eventsForIcalQuery, {}, {
    next: { tags: ['event:list', 'event:upcoming'], revalidate: 600 }
  });
  const ical = renderIcal(events);
  return new Response(ical, {
    headers: { 'content-type': 'text/calendar; charset=utf-8' }
  });
}
```

## Subscription URL

`webcal://catholicscientists.org/events/calendar.ics` for Apple Calendar (auto-prompts subscribe). Provide both `https://` and `webcal://` links on the events page.

## Per-category feeds

`/events/calendar.ics?category=gold-mass` is supported via a query param. Same handler, filtered query.

## Validation

CI step runs `node-ical` to parse the generated feed and asserts ≥ 1 valid event.
