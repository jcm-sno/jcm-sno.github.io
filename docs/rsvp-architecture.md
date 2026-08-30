# Guest systems architecture decision

Status: **wishlist architecture selected; RSVPify trial recommended; production
authentication and storage intentionally not connected**

This record covers two related but independently deployable guest systems:

- a native interactive wishlist, where invited guests can privately reserve
  items and mark them ordered; and
- RSVP collection, including household lookup, conditional plus-ones,
  event-specific invitations, edits, reminders, and exports.

No real guest roster, invitation credential, wishlist claim, or RSVP response
may be committed to this public repository.

## Decision summary

1. **Build the wishlist natively** on a Cloudflare Worker and D1. Authenticate
   guests with random invitation links or codes, not ordinary third-party
   accounts. Make every claim transactional and retain an append-only revision
   record.
2. **Trial RSVPify Personal Platinum before purchase.** It is the best current
   fit when the RSVP form must remain inside this website. Test it with
   synthetic edge cases, use month-to-month billing only for the live RSVP
   window, and keep a direct-form link as a fallback for browsers that block an
   embedded form.
3. **Do not claim that paid RSVP software is faster.** Wedding-scale traffic is
   trivial for either RSVPify or a small D1 application. Payment buys product
   hardening, guest communications, administration, monitoring, recovery, and
   support—not meaningful database capacity.
4. **Keep custom RSVP as the fallback.** A custom system can match the required
   behavior, and can improve identity handling by making a private invitation
   code primary and name lookup secondary. It cannot honestly claim the same
   operational maturity until the full test and recovery program below passes.

## Why the two systems use different approaches

Wishlist claiming is a small, bounded transaction: authenticate an invited
party, show available items, and atomically reserve or release one. That is a
good custom-build problem.

RSVP is operationally broader. It combines roster import, household grouping,
name matching, conditional event access, plus-ones, per-person questions,
confirmation delivery, reminders, guest edits, host corrections, exports,
privacy controls, and support. A missing edge case can affect headcount or meal
orders. A mature service is valuable even though the underlying database load
is tiny.

The hybrid design means guests may identify themselves twice: once through
RSVPify's invitation lookup and once through the website's private wishlist
link. RSVPify does not document a public API that would safely share its guest
session with this site. This separation is intentional: a wishlist defect
cannot corrupt the wedding's RSVP system of record.

## RSVP downselect

| Option | Identity and invitation rules | Website fit | Operations and reliability | Current cost | Decision |
| --- | --- | --- | --- | --- | --- |
| RSVPify Personal Platinum | Partial name/email matching, households, invitee-specific plus-ones, and private secondary events | Supported embed; direct-link fallback needed for some privacy settings | Email reminders and delivery tracking, exports, priority support, SOC 2 Type II, encryption, backups, and disaster recovery | $15/month base or $108/year as reviewed 2026-08-30 | **Recommended trial** |
| WedSites Standard | Name/email lookup, households, plus-ones, event lists, and explicit nickname/alternate-spelling fields | Standalone RSVP page; no supported external embed or inherited site styling found | Email tracking, reminders, exports, and support; less public infrastructure assurance than RSVPify | $99 one time as reviewed 2026-08-30 | Best linked-page alternative |
| Joy | Household RSVP, plus-one controls, multiple events, questions, and reminders | Separate Joy experience; no supported external embed found | Mature hosted workflow, but strict matching can make spelling and nickname errors guest-visible | Free as reviewed 2026-08-30 | Free fallback if leaving this site is acceptable |
| Custom Worker + D1 | Private code first; normalized names and explicit aliases as fallback; fully controllable rules | Fully native and can share authentication with the wishlist | We must build and operate imports, email, correction tools, monitoring, audit history, backups, restores, and support | Free-tier infrastructure is ample at wedding scale | Functional fallback, not first operational choice |

Current official references:

- [RSVPify pricing and feature matrix](https://rsvpify.com/pricing/personal-events/)
- [RSVPify invite-list behavior](https://help.rsvpify.com/en/articles/1222532-what-is-the-invite-list-and-do-i-need-to-use-it)
- [RSVPify matching behavior](https://help.rsvpify.com/en/articles/8652575-how-does-the-invite-list-match-my-invitees)
- [RSVPify embed guidance](https://help.rsvpify.com/en/articles/5162749-how-do-i-embed-the-rsvpify-form-on-my-website)
- [RSVPify privacy and security](https://rsvpify.com/privacy-and-security/)
- [WedSites alternate-name handling](https://help.wedsites.com/en/articles/14456100-how-do-i-handle-alternate-names-or-nicknames)
- [WedSites pricing](https://wedsites.com/pricing)
- [Joy online RSVP](https://withjoy.com/online-rsvp/)
- [Cloudflare D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)
  and [limits](https://developers.cloudflare.com/d1/platform/limits/)

Pricing and plan features can change; verify the selected plan immediately
before purchase.

### What must be confirmed before paying RSVPify

The public documentation does not prove two details that matter to this event:

1. whether Personal Platinum exposes prior RSVP revisions or a usable audit log,
   rather than only the latest response; and
2. whether every desired tag- or guest-specific question rule is available on
   Personal Platinum, not only on a business plan.

Ask support those questions in writing. Do not upload the real roster until the
answers and the synthetic acceptance test are satisfactory.

### RSVPify acceptance test

Use a synthetic roster that includes:

- duplicate full names;
- short and long forms such as Mike and Michael;
- maiden and married names;
- apostrophes, hyphens, spaces, and diacritics;
- two households sharing a surname;
- named and unnamed plus-ones;
- children and split household attendance;
- guests invited to ceremony/reception only and guests invited to an
  additional event;
- partial attendance, declines, response edits, and host corrections;
- failed email delivery, CSV export, and administrative recovery; and
- mobile Safari, strict privacy settings, ad blockers, and the direct-link
  fallback.

If the trial passes, subscribe only for the active RSVP period. At the reviewed
base price, four to six months would cost roughly $60–$90. If it fails, proceed
with the custom design below rather than working around a known defect.

## Native wishlist design

### Guest authentication

"Authenticated guest" means possession of a private, high-entropy invitation
credential issued to an invited party. It does not require a Google, GitHub,
ChatGPT, or social account.

1. Put a random deep link and a short manual code on the invitation. Carry the
   deep-link secret in the URL fragment so it is not sent in an HTTP request or
   referrer, exchange it once, and immediately remove it from the address bar.
2. Store only a salted credential hash in D1.
3. While GitHub Pages and the Worker API are on different sites, issue a short-
   lived opaque bearer session, keep it in `sessionStorage`, enforce exact-origin
   CORS, and apply a strict content-security policy. If both surfaces later move
   under one registrable domain, replace that token with an `HttpOnly`, `Secure`,
   same-site cookie.
4. Rate-limit failed code attempts and require Turnstile after suspicious
   behavior. Return the same message for unknown, expired, and revoked codes.
5. Allow credential revocation and rotation without changing the party record.

The wishlist link may be separate from RSVPify's lookup. If RSVP later becomes
custom, the same party session can authorize both systems.

### Data model

- `parties`: stable invitation group, display label, and status
- `invitation_credentials`: party, salted token hash, expiry, revocation, and
  last-used timestamp
- `wishlist_items`: title, description, merchant URL, optional image, desired
  quantity, ordering position, and active status
- `wishlist_item_slots`: one row per claimable unit, allowing quantities without
  oversubscription
- `wishlist_claims`: slot, party, state (`reserved` or `ordered`), optional note,
  and timestamps; one active claim per slot
- `wishlist_claim_revisions`: append-only reserve, order, release, and
  administrative-correction history

### Claim integrity and privacy

- Reserve an item by inserting a claim for a slot protected by a database unique
  constraint. Concurrent attempts cannot both succeed.
- Apply reserve, release, and ordered-state changes transactionally with an
  idempotency key. Repeated taps or network retries must not duplicate a claim.
- Show other guests only `available`, `partially reserved`, or `reserved`—never
  the claimant's identity.
- Let a guest review and release their own reservations from the same party
  session.
- Decide before launch whether the couple's normal view hides claim identities
  and ordered states to preserve the surprise; retain a separate emergency
  administrative recovery view.
- Treat merchant links as informational. Do not collect card data, proxy a
  retailer checkout, or infer that an item was purchased; the guest explicitly
  marks it ordered.

## If RSVP becomes custom

The custom RSVP model adds:

- `guests` and `party_members` for named guests and open plus-one slots;
- `guest_aliases` for deterministic nicknames, maiden names, transliterations,
  and common variations;
- `events` and guest-level `event_invitations`;
- versioned `responses`, per-guest `answers`, idempotency keys, and append-only
  response revisions; and
- notification jobs that run only after the response transaction commits.

Name search is a recovery path, not the primary credential. Normalize it
server-side, try exact aliases first, use fuzzy matching only when a result is
uniquely confident, and never download the roster into the browser. Ambiguous
results must ask for the invitation code rather than reveal possible guests.

To approach paid-service reliability, the custom system must also ship a roster
import validator, authenticated admin corrections, email delivery/retries,
monitoring and alerts, regular exports, a tested restore, browser/device tests,
and a written day-of-support procedure. Raw D1 capacity does not satisfy those
requirements by itself.

## Google Sheets boundary

Google Sheets remains acceptable as a private administrative mirror or CSV
destination, not as the source of truth. It has adequate throughput but weak
schema enforcement, awkward multi-row transactions, mutable identifiers, and a
high risk of accidental sorting or editing. The guest browser must never receive
Sheets credentials or an unrestricted sheet link.

Canonical wishlist claims and any custom RSVP responses belong in D1. Export a
denormalized, read-friendly view to Sheets for filtering and notes, but never
derive authorization or availability from manually editable cells.

## Go-live gates

1. Implement both systems with synthetic parties and no production credentials.
2. Complete the RSVPify acceptance test and vendor questions; choose RSVPify or
   custom explicitly.
3. Test wishlist authentication, enumeration resistance, simultaneous claims,
   retries, releases, ordered-state changes, revocation, export, and restore.
4. Finalize events, questions, meal options, plus-one rules, deadlines, and edit
   policy.
5. Complete mobile, accessibility, privacy, administrative, alerting, export,
   and recovery checks.
6. Import the real roster privately, issue credentials, take a clean backup, and
   open RSVP and Wishlist together with invitations.
