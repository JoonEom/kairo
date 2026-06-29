# Kairo — Design Brief

*For Claude Design. A self-contained visual spec: design system + every screen. Generate iOS (iPhone) mockups in this style. Build the design system FIRST (tokens + the Postcard component), then every screen inherits it.*

---

## What Kairo is (context for tone)

A private, invite-only weekly photo journal shared with close friends. Each week there's one **Kairo** (a short, poetic prompt — e.g. "take the long way," "find water"). You make up to **3 postcards** answering it. Everyone's postcards stay private until a synchronized **reveal** every **Thursday 8am**, when you see how all your friends interpreted the same Kairo. The soul: *make the day count* — calm, intimate, nostalgic, a little exclusive ("a club normal people don't know about"). NOT loud, NOT a typical engagement-maximizing social app. Restraint is the brand.

---

## Design System (build this first)

### Mood
Warm minimal. Calm, papery, nostalgic, confident through restraint. The UI is quiet so the photos are the only real color. Think: a beautiful analog postcard / journal, rendered cleanly and modern (not heavy skeuomorphic texture).

### Color tokens
- `bg` **#F7F3EA** — warm bone, app background
- `surface` **#FBF8F1** — slightly lighter, cards / back of postcard / tab bar
- `surface.white` **#FFFFFF** — postcard front frame
- `text.primary` **#26241F** — warm espresso near-black; primary text, buttons
- `text.secondary` **#7A7363** — muted brown; secondary text
- `text.tertiary` **#9C9484** — light taupe; meta, labels, hints
- `text.placeholder` **#B5AD9C** — lightest; placeholders, counts
- `border` **#E4DCC9** — warm hairline; dividers, card borders
- **No accent color.** Photos provide all color. Buttons/active states use `text.primary` (espresso). Keep it neutral on purpose.

### Typography
- **Serif — Fraunces** (warm, characterful, slightly literary). Used for: the **Kairo wordmark**, every **Kairo/prompt** (always serif *italic*), postcard **captions**, section headlines (e.g. "The Reveal"), archive entries. This carries the soul.
- **Sans — SF Pro (iOS system) or Inter.** Used for: UI labels, buttons, meta, counts, nav. Clean and out of the way.
- Labels (e.g. "KAIRO IN PROGRESS") are sans, uppercase, letter-spaced, small, `text.tertiary`.

### Shape & spacing
- Spacing scale: 4 / 8 / 14 / 16 / 20 / 24 px
- Radius: cards 14px, photos 8px, buttons 12–14px, pills/inputs 10–12px
- Card shadow: soft and low — `0 6px 20px rgba(38,36,31,0.10)` (heavier for focused/hero cards)
- Generous whitespace. Nothing cramped. Minimal formatting.

### Core component — THE POSTCARD (most important)
- Horizontal photo (4:3) inside a white card with a small margin (the "postcard").
- **Front:** the photo. Optional **location** label subtly bottom-left, small uppercase, white with a soft text-shadow (omit entirely if no location). NO prompt text and NO wordmark on the in-app front.
- **Back (tap to flip — animated turn-over):** authentic postcard structure — **caption** on the left (serif), a vertical divider, and on the right a small **stamp** + **location** + **date** like a postmark.
- **Share-out version only:** compose the front with the **Kairo (prompt)** over the photo (serif italic, on a gradient scrim, bottom-left) AND a quiet **"Kairo" wordmark signature** in a corner. (This version is ONLY for sharing to Instagram/etc., never shown in-app.)

### Other components
- **Tab bar** (bottom, 4 tabs): Home / Friends / Create / Profile. Active = espresso + bold; inactive = `text.placeholder`. On `surface` with a top hairline border.
- **Primary button:** espresso fill, bone text, radius 12–14, centered label.
- **Avatar:** circular; profile photo, or initial on a warm gradient if none.
- **"Kairo in progress" card:** bordered `surface` card — small uppercase label + live countdown (days/hours/min) + the Kairo (serif italic) + a circular espresso **+ button**.
- **Progress indicator:** 3-segment bar + "X / 3" count (for the postcard cap).

---

## Screens

> Build each in the system above. Phone (iPhone) frames. Several screens have empty/edge states noted.

### 1. Launch / First Open
Mostly empty, generous whitespace. Serif **Kairo** wordmark centered upper-middle → short hairline divider → tone line **"Make the day count."** → large empty space → primary button **"Get started"** near bottom → small secondary link **"I already have an account."** No content preview (nothing visible without an account).

### 2. Onboarding (a short sequence)
- **Sign in with Apple** (standard Apple button).
- **Profile setup** (one screen): name (pre-filled, editable), **username** (live availability check — show ✓ available / ✗ taken), profile photo (optional, skippable; default = initial avatar).
- **Intro — 3 swipeable cards**, skippable (skip link visible), calm and centered:
  - Card 1: **"New Kairo, every week."** (no sub)
  - Card 2: **"Capture your Kairo."** — sub: *"Collect your week in postcards."*
  - Card 3: **"Thursdays, the reveal."** — sub: *"Everyone's take, all at once."*
- **Invite a friend** (one screen, skippable): line *"Kairo's better with friends"* + one primary **"Invite a friend"** button (opens share sheet). No username search here.

### 3. Home (the most-seen screen)
Top: serif **Kairo** wordmark.
**"Kairo in progress" card** (prominent): label "KAIRO IN PROGRESS" + countdown ("reveals in 2d 14h 32m") + the current Kairo (serif italic, large) + circular **+ button**.
**"The Reveal" section:** big serif headline **"The Reveal"** → lead-in **"everyone's take on [Kairo]"** where the Kairo is set apart (serif italic espresso) from the muted sans lead-in → divider.
**Feed — grouped by friend:** each friend = avatar + name + count ("· 3 postcards"), then their postcard (photo only in-feed; optional location bottom-left; small dots if multiple to swipe). Stacked vertically (scrolling a deck of horizontal cards).
Empty state (no friends): the in-progress card + a gentle "add friends / make your first postcard" nudge. Never blank.

### 4. Create (private workbench for the current week)
Top: current Kairo context (label + serif italic Kairo + countdown).
**Progress:** 3-segment bar + "X / 3".
**Deck:** your in-progress postcards, **one at a time, full width** (no peek), "tap to flip · swipe to browse."
**"+ Make a postcard"** button.
**At 3/3:** + button replaced by celebratory **"Kairo complete · see everyone's take on Thursday"** (no countdown here).
**Empty (0/3):** dashed postcard placeholder + **"Your week starts here"** + warm line *"Make a postcard whenever the moment's right. It stays yours until the reveal."* + **"Make your first postcard."**

### 5. Make-a-postcard — details screen (after capture)
Top bar: **Cancel** / "New postcard" / **Retake**. The captured photo in a postcard frame. **Caption** field (serif, optional). **Location** field — searchable autocomplete picker (type → tap a suggested place; e.g. typing "tiger" shows "Tiger Mountain, WA"); optional; no GPS. **Done** button.
(Camera itself: horizontal hard-lock — full-screen camera that requires rotating the phone sideways; "turn sideways" prompt if held vertical.)

### 6. Friends
**Search bar** (find by username, live results). **Incoming requests** (accept / decline). **Outgoing pending** ("requested"). **Friends list** (avatar + name + username; tap → their Profile). **"Invite a friend"** button (share sheet). Before mutual, a searched user shows only username + name + photo + an **Add** button.

### 7. Profile (yours, and friends')
**Settings gear** top-right (own only). Centered **identity:** avatar, name, username, **Edit profile** button (own only). No stats.
**Archive — "[Name]'s Kairos":** list of past weeks, each a tappable entry — small cover photo + the Kairo (serif italic) + **date/month** (e.g. "March 2026") + postcard count. Only **revealed/completed** weeks (current in-progress week excluded).
Empty state: "Your Kairos will appear here after your first reveal."

### 8. Opened week (tapping an archive entry)
That week's Kairo as a header + its postcards shown together (the deck/grid for that week). Postcards flip for caption/back.

### 9. Settings (standard list)
Notification preferences (per-type toggles: the reveal / mid-week / friend requests) · Sign out · **Delete account** · Privacy Policy · Terms · Report a problem. Minimal, clean list rows.

### 10. Share-out image (composed, for export only)
The postcard front + the **Kairo (prompt)** over the photo + a quiet **"Kairo" wordmark signature**. No "see more" CTA, no advertisement — just the signature. (This is the only place the prompt and wordmark appear on a postcard front.)

---

## Tone reminders for all copy
- Short, warm, plain. Never corny, never performatively warm, never "AI-prompt"-sounding.
- "Kairo" = both the app and the weekly prompt. "Postcard" = the artifact. "The reveal" = the Thursday moment.
- Calm and understated everywhere. Restraint is the brand.
