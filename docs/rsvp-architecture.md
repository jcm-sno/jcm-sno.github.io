# RSVP architecture decision

Status: **prototype UI complete; response storage intentionally not connected**

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
- Provide authenticated administration, CSV import/export, change history,
  notifications, and a documented recovery path.
- Resist guest-list enumeration, guessing, duplicate submissions, and accidental
  overwrites.

## Downselect

| Option | Invitation lookup | Conditional plus-ones and events | Native-site experience | Operational burden | Decision |
| --- | --- | --- | --- | --- | --- |
| RSVPify Platinum embed | Built in | Built in | Embeddable, with direct-link fallback | Low | **Recommended first proof of concept** |
| Cloudflare Worker + D1 | Custom, fully controllable | Natural relational model | Fully native | High | **Finalist when control outweighs maintenance** |
| Supabase | Custom | Natural relational model | Fully native | Medium; paid tier needed for dependable backups/no pause | Do not select unless its dashboard is decisive |
| Airtable plus custom API | Custom | Possible but awkward | Fully native | Medium; proxy, quotas, and schema drift | Reject as the system of record |
| Tally or generic forms | Form-first | Weak for roster-derived permissions | Embeddable | Low | Reject for core RSVP |
| Firestore | Custom | Possible, but relationship-heavy | Fully native | High | Reject in favor of a relational store |

### Recommendation

Prototype RSVPify Platinum in the native RSVP page first. Its guest-list
lookup, per-invite plus-one controls, secondary-event invitations, and supported
embed address the difficult behavior without making the wedding team operate a
custom authentication and data system. Keep the direct RSVPify event URL as an
accessible fallback.

Choose the custom D1 path only if the embedded experience fails the visual or
workflow review, or if full data ownership is worth building and maintaining
the safeguards below. The database cost is negligible at wedding scale; the
real cost is engineering, testing, support, and recovery.

## Custom D1 design, if selected

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

1. Approve RSVPify embed versus custom D1 proof of concept.
2. Finalize events, guest-level invitation rules, plus-one rules, questions,
   deadline, and edit policy.
3. Import a synthetic roster and test happy paths, ambiguous names, split
   households, open plus-ones, partial attendance, revisions, and lockouts.
4. Complete privacy, accessibility, mobile, export, and restore checks.
5. Import the real roster privately and open the page with invitations.
