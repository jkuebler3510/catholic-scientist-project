# Auth (Clerk)

## Setup

1. Create a Clerk application (one for development/preview, one for production).
2. Pick the chosen authentication factors:
   - Email + password
   - Email magic link
   - Optional: Google OAuth (lots of academics use institutional Google accounts)
3. Configure session timeout: 30 days, refreshing on activity.
4. Configure 2FA: optional for all users, **required** for users in the `board` organization role.

## Middleware

`apps/web/middleware.ts`:

```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/account(.*)',
  '/membership/dues',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
```

## Sign-in/up routes

- `/sign-in/[[...sign-in]]/page.tsx` — uses Clerk's `<SignIn>` component, themed via Clerk's `appearance` prop to match our design system.
- `/sign-up/[[...sign-up]]/page.tsx` — same for `<SignUp>`.

After sign-up, redirect to `/account` (Clerk env vars handle this).

## Webhook (`/api/webhooks/clerk`)

Listens to `user.created`, `user.updated`, `user.deleted`, `session.created`. Verifies Svix signature.

On `user.created`:
- Upserts a `members` row keyed by Clerk `userId`.
- If an `application` exists for the same email and is `approved`, link it: set `members.applicationId` and copy approved fields onto the member.

On `user.updated`:
- Sync `email`, `firstName`, `lastName` to the `members` row.

On `user.deleted`:
- Soft-delete the `members` row (`deletedAt`) and cancel any active Stripe subscription. Do not hard-delete — we keep historical donations and RSVPs.

## Organizations (deferred to phase 2)

Clerk supports Organizations — useful for representing chapters with chapter coordinator roles. Not in v1. Architecture leaves the door open: `members.chapterId` exists on the schema; chapter-level access controls can be added later.

## Themed Clerk UI

Clerk's `<SignIn>` and `<SignUp>` accept an `appearance` prop. Match our tokens:

```ts
appearance: {
  elements: {
    card: 'shadow-none border border-border-default rounded-lg',
    formButtonPrimary: 'bg-accent text-accent-fg hover:bg-accent-hover ...',
    headerTitle: 'font-serif text-3xl text-fg-default',
    ...
  }
}
```

Centralize the appearance object in `lib/clerk/appearance.ts`.
