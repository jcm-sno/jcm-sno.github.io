# RSVP architecture decision

Status: **prototype UI complete; $0 architecture selected; response storage intentionally not connected**

The public RSVP route is native to this website. It should not accept real
responses until the guest roster, privacy rules, administrative workflow, and
recovery plan are tested together.

## Required behavior

- Find an invitation from a guest name without exposing the guest list.
- Return the entire invited party, while allowing a response for each person.
- Offer a plus-one only where the roster explicitly grants one.
- Show only the events each guest is invited to.
- Allow a party to review and revise its response before the deadline.
- Collect meal and accessibility answers at the guest level.
- Provide authenticated administration, CSV export, change history,
  notifications, and a documented recovery path.
- Resist guest-list enumeration, guessing, duplicate submissions, and accidental
  overwrites.

## Downselect

The operating-cost requirement is **$0**. A solution that requires a paid tier
to remove a guest cap, unlock secondary events, or embed the form is not an
acceptable production choice.

| Option | Free constraints | Conditional plus-ones and events | Native-site experience | Decision |
| --- | --- | --- | --- | --- |
| Cloudflare Worker + D1 | Free limits are far beyond wedding-scale traffic and storage | Natural relational model; fully controllable | Fully native | **Selected** |
| RSVPify Free | Up to 100 guests; one active event; no external-site embed | Invite list and unnamed +1 are available, but secondary-event capability is paid | Separate RSVPify page | Fallback only if the final list is ≤100 and one event is enough |
| Google Sheets + server-side API | No added charge at wedding scale; API and Apps Script quotas apply | Must be custom-built; weak relational and transactional guarantees | Can appear native through a custom API | Use as an admin mirror/export, not the source of truth |
| Supabase Free | Project pauses after inactivity; automatic production backups require paid service | Natural relational model | Fully native | Reject under the $0 reliability requirement |
| Airtable, Tally, Google Forms | Free tiers are form- or table-first | Weak for roster-derived household, event, and plus-one permissions | Usually a separate or embedded generic form | Reject for core RSVP |
| Firestore | Free quota is ample | Possible, but relationship-heavy and easier to mis-model | Fully native | Reject in favor of relational D1 |

### Recommendation

Build the native RSVP workflow on a Cloudflare Worker with D1. Its free tier is
several orders of magnitude larger than a wedding RSVP workload, its relational
model cleanly represents parties and event-specific invitations, and it keeps
the guest experience inside this website. The tradeoff is engineering effort,
not service cost.

Keep RSVPify Free as an escape hatch, not the design target. It is genuinely
free for up to 100 guests and includes an exclusive invite list and unnamed
plus-ones. However, embedding is a paid feature and the free plan does not meet
the intended multi-event, fully native experience. If the custom system cannot
pass the go-live tests, the hosted free RSVPify page is safer than shipping
fragile custom code.

Current limits and feature comparisons:

- [Cloudflare D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)
  and [limits](https://developers.cloudflare.com/d1/platform/limits/)
- [RSVPify personal-event pricing and feature matrix](https://rsvpify.com/pricing/personal-events/)
- [Google Sheets API usage limits](https://developers.google.com/workspace/sheets/api/limits)
- [Google Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)

## Google Sheets assessment

Google Sheets **can** store this RSVP data, and its request limits are easily
adequate for a wedding. It should not be the authoritative production database.

The problem is not throughput. A spreadsheet has weak schema enforcement,
awkward multi-row transactions, fragile relationships, and a high risk of an
administrator accidentally sorting, renaming, deleting, or editing a key cell.
The Sheets API also requires server-side credentials; the browser must never
receive a service-account key or an unrestricted sheet link. Apps Script can
publish a free web app, but then availability and execution depend on mutable
per-user quotas and script ownership.

Recommended use:

1. Store canonical parties, invitations, and responses in D1.
2. Provide a protected admin export to CSV.
3. Optionally sync a denormalized, read-friendly copy into a private Google
   Sheet for Samantha and James to review, filter, and annotate.
4. Never read authorization rules back from manually editable Sheet cells
   during a guest RSVP.

If Sheets were forced to be primary storage, the minimum acceptable design
would still require a server-side API, hidden credentials, append-only response
history, serialized writes, immutable party IDs, revision numbers, validation,
regular snapshots, and a recovery test. At that point D1 is both safer and
simpler.

## Selected D1 design

### Data model

- `parties`: household or invitation group and contact metadata
- `guests`: individual people, including named and open plus-one records
- `party_members`: membership and response permissions
- `events`: ceremony, reception, rehearsal, and other events
- `event_invitations`: guest-level invitations to events
- `responses`: one response per guest and event, with an optimistic version
- `answers`: meal, accessibility, and custom guest-level answers
- `lookup_aliases`: normalized invitation-name variants
- `response_revisions`: append-only audit history

Event access belongs at the guest level, not only the party level. This avoids
accidentally offering an event to every member of a household.

### Lookup and privacy

1. Normalize names server-side: Unicode NFKD, lowercase, strip punctuation and
   titles, remove diacritics, and collapse whitespace.
2. Try exact normalized aliases first. Never download the roster to the browser.
3. Use fuzzy matching only on the server and only when the result is uniquely
   confident. Otherwise request invitation spelling or a secondary verifier
   such as postal code or a short invitation code.
4. Return the same generic failure message for unknown and ambiguous searches.
5. Rate-limit by network and device signal with escalating temporary lockouts.
6. On success, issue a short-lived opaque party session. Never expose a raw
   sequential party identifier.

### Response integrity and operations

- Derive party members, plus-one availability, and eligible events on the
  server; never trust client-provided permissions.
- Update the party transactionally with an idempotency key and optimistic
  version check.
- Preserve revisions and permit edits before the RSVP deadline.
- Require strong admin authentication; keep administrative routes separate.
- Test roster import in staging, export all responses regularly, and verify a
  restore before invitations are mailed.
- Add email notifications only after the core write is committed; notification
  failure must not lose a response.

## Implementation gates

1. Build the D1-backed flow with synthetic guests only.
2. Finalize events, guest-level invitation rules, plus-one rules, questions,
   deadline, and edit policy.
3. Import a synthetic roster and test happy paths, ambiguous names, split
   households, open plus-ones, partial attendance, revisions, and lockouts.
4. Complete privacy, accessibility, mobile, export, and restore checks.
5. Import the real roster privately and open the page with invitations.

The real guest roster and exports must never be committed to the public GitHub
repository.
