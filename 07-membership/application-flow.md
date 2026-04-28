# Application flow

## States

```
[ Not applied ]
    │  /membership/apply (public form)
    ▼
[ Submitted ]    ← email sent: application-received
    │  Admin reviews
    ▼
[ Approved ] OR [ Rejected ]
    │              │
    ▼              ▼
  invite       email: application-rejected (with rationale)
  email
    │
    ▼
[ Account created ]   ← user signs up via Clerk; webhook links application → member
    │
    ▼
[ Dues prompted ]     ← /membership/dues, Stripe checkout
    │
    ▼
[ Active member ]     ← duesPaidThrough = today + 1y
```

## Public application form (`/membership/apply`)

Required fields:

- First name, last name
- Email (must match Clerk later if/when they sign up)
- Doctoral field (string, e.g. "Physics", "Genetics")
- Doctoral institution
- Year of doctorate
- Current affiliation (institution + role)
- Short statement of interest (≤ 500 chars)
- Acknowledgment of the Society's mission (checkbox)

Optional:

- ORCID iD
- Personal/professional website URL
- LinkedIn or other professional URL
- Country and city
- Preferred chapter (`chapter` reference)

Anti-spam: Turnstile.

## Submission

Server Action `submitApplication(input)`:

1. Parse with Zod (server-side schema mirrors the form).
2. Verify Turnstile token.
3. Insert into `applications` (status `'submitted'`).
4. Send `application-received` email to the applicant.
5. Send a notification to `membership@catholicscientists.org`.
6. Redirect to `/membership/apply/thank-you`.

## Admin review

For v1, admins review applications via a thin admin page at `/admin/applications` (auth-gated to users with the `admin` role on Clerk). The page lists pending applications, lets admins approve/reject and add internal notes.

Approval flow:

1. Admin clicks "Approve."
2. Server Action updates `applications.status = 'approved'`.
3. Sends `application-approved` email containing a Clerk magic-link sign-up URL pre-filled with the applicant's email.
4. When the applicant signs up via that link, the Clerk webhook links the application to the new `member` row.

Rejection flow: status → `rejected`, optional rationale, send `application-rejected` email.

## Postgres `applications` table

```ts
applications {
  id           uuid pk
  status       enum('submitted','approved','rejected','withdrawn') default 'submitted'
  email        text not null
  first_name   text not null
  last_name    text not null
  field        text not null
  doctoral_institution text not null
  doctoral_year int not null
  affiliation  text not null
  statement    text not null
  orcid        text
  website      text
  linkedin     text
  country      text
  city         text
  preferred_chapter_id text       // Sanity chapter._id
  reviewed_by  text                // Clerk userId of admin
  reviewed_at  timestamptz
  rejection_reason text
  created_at   timestamptz default now()
  updated_at   timestamptz default now()
}
```

## Improvements over the current site

- **Real form with validation.** Currently a third-party-plugin form with poor UX.
- **Clear status communication.** Applicants get an acknowledgment email immediately and a decision email later.
- **Admin review surface** instead of email-driven approvals.
