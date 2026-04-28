# RSVP flow

## Scope

Only for events that explicitly enable in-app RSVPs (`event.registrationFormEnabled === true`). For external events, the detail page links out via `registrationUrl`.

## Postgres schema (added in `07-membership`)

```ts
event_rsvps {
  id          uuid pk default gen_random_uuid()
  user_id     text not null              // Clerk user id
  event_id    text not null              // Sanity event document _id
  status      enum('confirmed', 'cancelled', 'waitlist')
  guests      int  default 0
  dietary     text                       // free text
  notes       text
  created_at  timestamptz default now()
  updated_at  timestamptz default now()
  unique (user_id, event_id)
}
```

Index on `event_id` for capacity queries.

## Form

- **Required:** none (the user is already authenticated; we have their email).
- **Optional:** `guests` (capped at `event.allowsGuests`), `dietary`, `notes`.
- **Schema:** Zod, shared between client and server.

```ts
export const rsvpSchema = z.object({
  eventId: z.string(),
  guests: z.number().int().min(0).max(2).default(0),
  dietary: z.string().max(280).optional(),
  notes: z.string().max(500).optional(),
});
```

## Server Action

```ts
export async function submitRsvp(input: z.infer<typeof rsvpSchema>) {
  const { userId } = auth();
  if (!userId) throw new UnauthorizedError();

  const parsed = rsvpSchema.parse(input);
  const event = await sanityClient.fetch(eventByIdQuery, { id: parsed.eventId });
  if (!event?.registrationFormEnabled) throw new BadRequestError();

  // capacity check (transactional)
  await db.transaction(async tx => {
    if (event.capacity) {
      const [{ count }] = await tx
        .select({ count: sql`count(*)` })
        .from(eventRsvps)
        .where(and(eq(eventRsvps.eventId, event._id), eq(eventRsvps.status, 'confirmed')));
      if (count >= event.capacity) throw new CapacityFullError();
    }
    await tx
      .insert(eventRsvps)
      .values({ userId, eventId: event._id, status: 'confirmed', guests: parsed.guests, ... })
      .onConflictDoUpdate({
        target: [eventRsvps.userId, eventRsvps.eventId],
        set: { status: 'confirmed', guests: parsed.guests, dietary: parsed.dietary, notes: parsed.notes, updatedAt: new Date() }
      });
  });

  await sendRsvpConfirmationEmail({ userId, event, guests: parsed.guests });
  revalidateTag(`event:rsvps:${event._id}`);
}
```

## Email

`packages/emails/rsvp-confirmation.tsx` (React Email):

- Subject: "RSVP confirmed — [event title]"
- Body: event title, date+time, venue, link to detail page, ICS attachment.

## Cancellation

In the member portal (`/account/rsvps`, owned by `07-membership`), users can cancel. Cancellation flips `status` to `'cancelled'` and sends a cancellation email.

## Capacity & waitlist (deferred)

For v1, capacity-full → 409. No waitlist UI. Architecturally, we leave the `'waitlist'` status in the enum for phase 2.

## Anti-spam

- Auth required → spam not a real risk.
- For unauthenticated paths (e.g. the "Host a Gold Mass" mailto-style form on the Gold Masses page), use Turnstile.
