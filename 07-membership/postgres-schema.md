# Postgres schema

The complete schema delivered by this folder. Drizzle definitions live in `apps/web/lib/db/schema.ts`.

## Conventions

- All tables use UUID primary keys (`uuid` with `gen_random_uuid()`).
- All tables have `created_at` and `updated_at` (timestamptz).
- Soft-delete via `deleted_at` where rows must be retained for audit.
- Foreign keys are explicit in Drizzle relations, with `onDelete` configured per case.

## Tables

### `members`
The single source of truth for application data tied to a Clerk user.

```ts
members {
  id                       uuid pk default gen_random_uuid()
  clerk_user_id            text unique not null            // Clerk userId
  email                    text not null
  first_name               text not null
  last_name                text not null
  display_name             text
  field                    text                            // copied from approved application
  affiliation              text
  doctoral_institution     text
  doctoral_year            int
  bio                      text
  country                  text
  city                     text
  chapter_id               text                            // Sanity chapter._id, nullable
  photo_url                text
  orcid                    text
  links                    jsonb                           // [{label, url}]
  directory_opt_in         boolean default false
  directory_show_email     boolean default false
  directory_show_affiliation boolean default true
  directory_show_field     boolean default true
  directory_show_photo     boolean default true
  application_id           uuid references applications(id) on delete set null
  stripe_customer_id       text unique
  stripe_subscription_id   text unique
  dues_paid_through        timestamptz
  dues_status              enum('not_started','active','lapsed','cancelled') default 'not_started'
  role                     enum('member','admin','board') default 'member'
  created_at               timestamptz default now()
  updated_at               timestamptz default now()
  deleted_at               timestamptz
}
indexes:
  members_email_idx (email)
  members_chapter_idx (chapter_id)
  members_dues_status_idx (dues_status)
  full_text_search_idx tsv((first_name || ' ' || last_name || ' ' || coalesce(affiliation,'') || ' ' || coalesce(field,'')))
```

### `applications`
See `application-flow.md`.

### `event_rsvps`
See `05-events/rsvp-flow.md`.

### `conference_registrations`
See `06-conferences/registration.md`.

### `donations`
Owned by `08-donations`; schema delivered here for foreign-key cohesion.

```ts
donations {
  id                  uuid pk
  user_id             text                   // Clerk userId, nullable for guest donations
  email               text not null
  name                text not null
  amount_cents        int not null
  currency            text not null default 'usd'
  recurring           boolean default false
  stripe_session_id   text unique
  stripe_subscription_id text unique
  stripe_charge_id    text
  intent              text                   // free-form: "general","conference","memorial-mendel" etc.
  status              enum('pending','succeeded','failed','refunded')
  created_at          timestamptz default now()
  updated_at          timestamptz default now()
}
```

### `audit_logs` (lightweight)
For sensitive admin actions: application approval/rejection, refunds, role changes.

```ts
audit_logs {
  id           uuid pk
  actor_id     text not null            // Clerk userId
  action       text not null            // e.g. 'application.approve'
  subject      text not null            // id of affected resource
  diff         jsonb
  created_at   timestamptz default now()
}
```

## Migrations

`drizzle-kit generate` writes SQL migrations into `apps/web/drizzle/migrations/`. CI runs `drizzle-kit migrate` against the preview database before deploying. Production migrations require a manual approval gate (see `11-deployment`).

## Backups

Neon's point-in-time recovery covers production. We do not script our own backups in v1.

## Seeding

A `pnpm db:seed` script in `apps/web/scripts/seed.ts` populates a sample admin, sample member, sample application, sample RSVP. Used for local dev and Playwright e2e.
