# Product Requirements Document — Kairo

*Name: **Kairo** — a respelling of **Kairos**, the Greek concept of the fleeting, opportune, meaningful moment (vs. chronos, ordinary clock-time). The respelling keeps the meaning, sound, and story while being more ownable. App Store name verified clear at time of decision.*

**Mission:** Make the day count. A weekly invitation to do something, notice something, or make something — and keep a record of it with the people who matter.

A private, invite-only journal shared with close friends on a weekly reveal ("the drop").

**Core terminology:**
- **Kairo** — both the app *and* the weekly prompt-object. Context disambiguates ("open Kairo" = app; "this week's Kairo" = the prompt). Replaces the word "prompt" everywhere (avoids AI connotation; makes the brand name a living word friends say — "did you do this week's Kairo?"). Written as "this week's **Kairo**" when referring to the prompt-object.
- **Postcard** — the artifact a user creates (horizontal photo front; typed caption + optional location + date on the back).
- **Reveal** — the Thursday moment when everyone's week becomes visible. (Earlier placeholder "drop" is being phased toward "reveal" in user-facing copy.)

---

## Identity & Scope

- **One-sentence pitch:** *"An app that nudges you to make your days count — and share what you did with close friends each week."*
- Scope is deliberately broad: a prompt can be answered indoors or outdoors. The thread is intentionality, not location.
- Distinctiveness rests on the mission, the weekly prompt + the delight of seeing how friends interpret it differently, and the drop ritual.
- **Feel:** exclusive, like a club with your closest friends. Something normal people won't know about. Intimate, not broadcast.

**Scarcity is signaled, not enforced.** No hard cooldown or post limit. Design, copy, and feel encourage treating each card as deliberate. Users self-rant; flexibility is preserved.

---

## The Weekly Cycle

- **One pivot moment: Thursday 8:00am PST.** At that instant: the ended week is revealed (the drop), a new prompt begins, and the new week opens for posting.
- **Weekly arc:** Thursday (new prompt, planning) → Fri–Sun (active peak) → Mon–Wed (calm tail — tend/edit your journal).
- **Anticipation:** app shows a "new drop in… [countdown]" label.
- **Timezone:** one absolute moment, 8am PST for everyone, so the reveal is simultaneous.

---

## Prompts

**Voice rules:**
- Short. Clear. Immediately pictureable.
- Feels like it came from a friend who knows you, not an app that doesn't.
- Plain and direct (Voice A) with occasional warmth (Voice B) — never flowery or confusing.
- Never so ambiguous that you have to think about what it means. Read it → immediately see yourself doing something.
- Tone: intimate, club-like. Written for your specific group, not broadcast to the world.

**How it works:**
- One prompt per week, written by hand by the founder, drawn from the bank below or invented fresh.
- Prompts are approved and scheduled manually — not AI-generated.
- Flavors are not limited to the categories below; the bank is a living starting point.

**Starting bank (style approved; individual prompts subject to curation):**

*Place*
- go somewhere new
- revisit a place you haven't been in a while
- find the best view you can get to today
- go somewhere just to see it
- explore somewhere within walking distance
- find a quiet spot

*Light / noticing*
- catch the light today
- find something worth looking at twice
- notice something you usually walk past
- go outside and just look up
- find the best sky you can
- find something growing

*Making / doing*
- make something with your hands
- cook something from scratch
- start something you've been putting off
- finish something you started

*Moving*
- go somewhere on foot
- take the long way
- move your body somewhere new
- go far enough that it feels worth it
- find somewhere worth the walk

*People*
- spend time with someone you've been meaning to see
- do something with someone you care about
- show someone a place you love
- go somewhere with a friend

*Everyday elevated*
- find the best version of an ordinary thing today
- do one thing today that's just for you
- do something you've never done before
- make today worth a postcard *(use sparingly — once or twice a year)*

---

## Tech Stack

- **Client:** React Native + Expo, iOS-first (Android deferred).
- **Backend:** Supabase (database + auth + storage).
- **Auth:** **Sign in with Apple only (MVP).** Lowest-friction, most secure, zero support burden (no passwords/SMS/email verification); covers 100% of the iOS-only seed group. Email/other methods deferred until Android. Note: Apple lets users hide their real email (relay address) — fine, since Kairo never needs their email (friend-finding is username/link).
- **Photo storage:** Supabase Storage.
- **Offline-first capture (hard requirement):** cards are fully capturable with no internet. App holds a complete local copy; cloud is backup + sharing. Two independent switches: *when a card uploads* (as soon as signal returns) and *when friends see it* (the Thursday drop).

---

## Visual Direction

**Direction: warm minimal ("B2").** Confirmed; exact hex values finalized once tested on photo-heavy screens (card, feed, drop).

- **Background:** warm bone / off-white (not stark white) — calm, papery base.
- **Wordmark:** serif — carries the keepsake soul; used for the logo and app icon.
- **Primary accent / buttons:** warm near-black (espresso), not pure black.
- **Personality:** minimal, confident, content-forward. Restraint *is* the brand — exclusivity comes from what's withheld, not from dark/moody styling. Photos provide the color; the UI stays quiet so cards pop.
- A single brand accent color may be added later, chosen against the actual card/feed screens (not off an empty screen).

**Postcard design (the core artifact):**
- **Front:** full-bleed photo (edge to edge within a thin white card frame). The **Kairo (prompt)** sits over the photo, bottom-left, in serif italic, on a **stronger gradient scrim** (guarantees legibility even on bright/busy photos while keeping the immersive full-photo look). No wordmark, no date on the front in-app.
- **Back (tap-to-flip, animated):** authentic postcard structure — **caption** on the left (serif, letter-like), a vertical divider, and on the right a **stamp** + **location** + **date** styled like a postmark.
- **Shared version only:** the front composes in a quiet **"Kairo" wordmark signature** (in-app front stays clean; signature appears only when shared out).
- Style: clean minimal *interpretation* of a postcard (warm-minimal palette), not heavy skeuomorphic texture.

**Open: typography not yet selected.** PRD specifies "serif" as a direction (wordmark + prompt + caption) and a sans for UI, but specific typefaces are not chosen — needs selection before/at build.

### Design System (starter tokens — for Claude Design import)

*Lean, single-platform (iOS). Built up as screens are designed. Values are starting points, finalized against photo-heavy screens.*

**Color tokens (provisional):**
- `color.background` = #F7F3EA (warm bone — app background)
- `color.surface` = #FBF8F1 (slightly lighter — cards/back of postcard)
- `color.surface.white` = #FFFFFF (postcard front frame)
- `color.text.primary` = #26241F (warm near-black/espresso — primary text, buttons)
- `color.text.secondary` = #7A7363 (muted brown — captions, secondary)
- `color.text.tertiary` = #9C9484 (light taupe — meta, dates, hints)
- `color.border` = #E4DCC9 (warm hairline — dividers)
- `color.accent` = TBD (single brand accent, chosen later against card/feed)

**Typography tokens:**
- `font.serif` = TBD typeface — used for wordmark, the Kairo (prompt), captions (the keepsake/human voice)
- `font.sans` = TBD typeface — used for UI labels, buttons, meta
- Specific typefaces not yet selected.

**Spacing / shape (provisional, to refine):**
- Spacing scale: 4 / 8 / 14 / 16 / 24 (px)
- `radius.card` = 14px; `radius.photo` = 8px; `radius.button` = 12px
- Card shadow: soft, low (e.g. 0 6px 20px rgba(38,36,31,0.10))

**Core components:**
- **Postcard** (front: full-bleed photo + optional subtle location label bottom-left; back: caption / divider / stamp + location + date; tap-to-flip). In-feed shows photo only; prompt overlay + Kairo wordmark signature appear only on the **share-out** version. *The* central component.
- **"Kairo in progress" card** — bordered surface card with label + live countdown (days/hours/min) + current Kairo (serif italic) + the **+ button**.
- **"The Reveal" header** — serif headline + "everyone's take on [Kairo]" lead-in with the prompt set apart.
- **Friend entry** — avatar (photo or initial) + name + postcard count, above their postcard(s).
- Primary button, tab bar (4 tabs: Home / Friends / Create / Profile), avatar (photo or initial fallback).

---

## Screen Flow

### Screen 1 — Launch / First Open

**Purpose:** First thing seen on a fresh install or any launch while signed out. Sets the calm, exclusive tone and routes into signup.

**Shows when:** not signed in. Once signed in, future launches skip straight to Home.

**Layout (top→bottom):** mostly empty, generous whitespace. Serif **Kairo** wordmark centered upper-middle → short hairline divider → tone line **"Make the day count."** (mission, not a feature summary) → large empty space → primary button **"Get started"** near bottom → small secondary link **"I already have an account."**

**Interactions:**
- "Get started" → Screen 2 (Onboarding/Signup).
- "I already have an account" → login (Sign in with Apple).

**Deliberately absent:** no content preview, no browse, no feature list, no demo. Nothing inside Kairo is visible without an account (reinforces invite-only feel).

**Edge cases:**
- Already signed in → screen skipped; opens to Home.
- New device / reinstall → land here, log in with Apple to recover account + journal.
- Tapped an invite link without the app → App Store → download → lands here normally (no auto-connect at MVP); signs up, then adds friend via username/link manually.
- Tapped invite link, has app, not signed in → lands here; friend added manually after login.
- Offline on first open → signup needs connection (Apple auth); show gentle "you'll need to be online to set up your account." (Only account creation requires connectivity; capture works offline afterward.)

### Screen 2 — Onboarding / Signup

**Purpose:** Take a new user from "Get started" to fully set up, with minimal friction. Apple handles auth, so no passwords/email verification.

**Flow (in order):**
1. **Sign in with Apple** — Apple sheet; one tap. Returns account + (optionally) name and a possibly-hidden relay email.
2. **Profile setup** (one screen):
   - **Name** — pre-filled from Apple; user confirms or edits. If Apple returns nothing, user types it. Shown to friends as the warm/human label.
   - **Username** — required (globally unique; how friends find you). Rules: lowercase letters/numbers/underscores, ~3–20 chars. Live availability check as they type (✓ available / ✗ taken); taken usernames block until changed.
   - **Profile photo** — optional, skippable. Default if skipped: user's initial on a neutral bone/espresso avatar.
3. **Brief intro** — 3 cards, skippable, mission-forward (not feature/privacy plumbing). Establishes the 3 core vocabulary words — **Kairo** (the weekly thing), **postcard** (the artifact), **reveal** (the Thursday moment):
   - **Card 1:** "New Kairo, every week." *(no sub — let it breathe)*
   - **Card 2:** "Capture your Kairo." — sub: *"Collect your week in postcards."*
   - **Card 3:** "Thursdays, the reveal." — sub: *"Everyone's take, all at once."*
   - Skip link always visible.
4. **Invite a friend** — skippable, not a wall. One line (e.g. *"Kairo's better with friends"*) and a single **"Invite a friend"** button that opens the iOS share sheet with the user's invite link (no contacts access). Username *search* is NOT here — it lives in the app (Friends area) for ongoing use, since new users often don't know friends' handles yet.
5. Land on **Home** (current week's Kairo visible; intro has primed what it means).

**Decisions / rationale:**
- **Name kept** (not username-only): warmth fits the close-friends soul; cost is near-zero since it's pre-filled from Apple.
- **Intro kept despite friction**: Kairo's ritual isn't self-evident (empty app + invite-only + delayed reveal confuses cold users); 3 tight cards prevent bounce. Friction controlled by keeping it short + skippable.
- **No contacts quick-add for MVP**: contact-matching needs phone numbers or real emails to match against — incompatible with Apple-only/no-phone, and unnecessary for a personally-onboarded seed group. Friend-finding = username search + share-sheet invite. Revisit (with phone as optional 2nd sign-in) only if scaling to strangers makes friend-finding friction a real problem.

**Edge cases:**
- Apple returns no name → name field empty, user types it.
- Username taken → blocked with inline ✗ until they pick a free one.
- User skips photo → initial-avatar default.
- User skips "add your people" → lands on Home with zero friends (solo use is valid); add-friends remains easily reachable later.
- Offline during signup → cannot complete (Apple auth needs connection); gentle message to reconnect.

### Navigation — Four Tabs

**Home / Friends / Create / Profile.**

Mental model: *make in Create, view in Home; this week is private, last week is shared; the archive lives on profiles.*

### Screen 3 — Home (the shared/social space)

**Shows the most recently *revealed* week.** Friends' postcards are hidden during the active week and only appear at the Thursday reveal.

**Layout (top→bottom):**
- **App wordmark** "Kairo" (serif) top-left.
- **"Kairo in progress" card** (prominent, bordered surface card): label "KAIRO IN PROGRESS" + live countdown ("reveals in 2d 14h 32m", days/hours/minutes — no seconds), the current Kairo in big serif italic, and a **+ button** (make a postcard). Framed as the active assignment — *the one you're meant to be working on*, not done yet.
- **"The Reveal" section** (the revealed feed): big serif headline **"The Reveal"** → lead-in line **"everyone's take on [Kairo]"** where the Kairo is set visually apart (serif italic espresso, the prompt's signature styling) so it's distinct from the muted sans lead-in → divider → the feed.

**Why this wording:** sections are distinguished by *role*, not time — "Kairo in progress" (your active move) vs "The Reveal" (the event that happened) — which removes the earlier this-week/last-week confusion. "In progress" signals unfinished/your-turn; "The Reveal" (with article) names it as an event.

**The feed — grouped by friend:**
- One entry per friend: avatar + name + count ("· 3 postcards"). Tap/swipe to see that friend's full week (multi-postcard hint = small dots on the card).
- **Postcards in-feed = photo only** (no prompt overlay — the Kairo is already named in the section header; redundant per-card). **Optional location** shown subtly bottom-left on the photo; omitted entirely if not added (never forced). Caption + date live on the **back** (tap to flip).

**Anti-confusion rule (critical):** a Kairo is never shown without its state. Current Kairo = "in progress" + countdown (hidden results). Past Kairo = "The Reveal" + postcards. Theme + state always together.

**On Thursday 8am reveal:** last week's postcards clear; the just-ended week's reveal in the feed; the new Kairo begins in the "in progress" card with a fresh countdown.

**Your own in-progress postcards do NOT live on Home** — they live in Create.

**Edge cases:**
- New user / no friends → no revealed postcards. Home shows the in-progress Kairo + countdown + a gentle nudge (add friends / make your first postcard). Never blank.
- Empty week (nobody posted) → calm empty state under "The Reveal," not a broken screen.

### Screen 4 — Create (your private workbench for the current week)

**Purpose:** Make and manage *your* postcards for the current Kairo. "View and create" space.

**Layout:**
- Top: current Kairo context (label "KAIRO IN PROGRESS" + the Kairo in serif italic + countdown) — so you remember what you're answering.
- **Progress indicator:** segmented bar (3 segments) + "X / 3" count.
- **Deck:** your in-progress postcards, **one at a time, full (no peek)** — tap to flip (back/caption), swipe to browse. (Peeking neighbors = later enhancement.)
- **"+ Make a postcard"** button (labeled).

**The 3-postcard cap (enforced):**
- Hard max **3 postcards per week** (deliberate reversal of earlier "unlimited/scarcity-by-feel" — a clean small cap makes the week a curated finite set; 3 is generous enough to avoid feeling punishing). Cap is **per week, resets at each reveal**.
- At **3/3**: the + button is replaced by a celebratory complete state — **"Kairo complete · see everyone's take on Thursday"** (no timer — already shown at top). Reads as accomplishment rolling into anticipation, not "limit reached."
- **Delete** (pre-reveal only): tap a postcard → delete (with "Delete this postcard?" confirm; permanent) → frees a slot → "+ Make a postcard" returns. After reveal, postcards are locked (part of the shared record).
- **Edit** (pre-reveal only): caption/location editable while the week is active; locked after reveal.

**Empty state (start of week, 0/3):** Kairo at top + inviting empty state — dashed postcard placeholder, "Your week starts here," warm line ("Make a postcard whenever the moment's right. It stays yours until the reveal."), "+ Make your first postcard."

### Screen 7 — Capture & make-a-postcard flow

**Flow:** "+ Make a postcard" → camera → details screen → Done → added to deck.

**Camera:**
- **Horizontal hard-lock** — must rotate phone; shutter disabled vertical (shows "turn sideways" prompt). Rotation is part of the ritual.
- **Live capture only** — no camera roll (protects honest "you lived this week" model).
- **One photo per postcard.** User chooses **front or back camera** per postcard (face or scene). Not dual-capture.

**Details screen (after capture):**
- Top bar: **Cancel** / "New postcard" / **Retake**.
- Captured photo in postcard frame.
- **Caption** — free text, serif, **optional** (postcard with just a photo is valid). Reasonable char limit (~150–200) so the back stays readable.
- **Location** — **optional searchable autocomplete picker** (type → choose from city/place suggestions, TikTok-style; stored as text; **no GPS**, no location permission, no coordinates — privacy-clean, user controls precision). Backed by a places dataset/API; offline autocomplete may be limited (fine — location is optional).
- **Done** button → saves to deck.

**Postcard display (the artifact, held vertically):**
- Horizontal photo at natural wide ratio in a white card frame (never stretched/cropped to fill).
- **Front** = photo + optional subtle location label (bottom-left). **Back** = caption + location + date, postcard-structured (caption left / divider / stamp + location + date right).
- **Tap to flip** (animated) — the back is a small reward, like turning a real postcard.
- **In-feed:** photo only (Kairo named in section header; no per-card prompt overlay). Prompt overlay + Kairo wordmark signature appear **only on the share-out version**.

**Offline:** full capture works with no internet (photo + caption + location + date saved locally immediately); syncs when signal returns; created-date = capture time, not upload time. A postcard made offline that syncs after its reveal joins that week's archive late (never lost).

**Edge cases:**
- **Camera permission denied** → gentle "Kairo needs camera access to make postcards" + settings link (no camera-roll fallback since live-only, so permission is essential — asked with context).
- **Cancel after taking photo** → "Discard this postcard?" confirm; on confirm, photo discarded, no draft saved.
- **Offline location** → picker can't suggest; skip (optional) or it syncs later.
- **Delete before first sync (offline)** → vanishes locally, never uploaded.
- **3/3 at reveal** → week's postcards lock in; new week resets to 0/3.

### Screen 5 — Friends

**Contains:**
- **Search bar** — find people by username, live results as you type.
- **Incoming requests** — "X wants to add you" → accept / decline.
- **Outgoing pending** — requests you've sent, shown as "requested" status (so you know it went through; still no access to their content until they accept).
- **Friends list** — everyone you're mutually connected with; tap → their profile (→ their past Kairos).
- **"Invite a friend" button** — opens iOS share sheet with the user's invite link (for friends not yet on Kairo).

**Behaviors:**
- **Before mutual**, a searched user shows only **username + name + profile photo** (enough to confirm identity); everything else locked.
- Tapping a search result opens a **minimal profile preview** with an "Add" button (more intentional than adding straight from the list).
- Tapping "Add" sends a pending request (invisible to both as a connection until accepted).
- **Removal**: from a friend's profile; silent (no notification); mutual by nature (removing disconnects both; both lose access to each other's content).
- **No friend cap** (closeness encouraged by feel, not enforced).
- **No blocking in v1** — removal suffices for MVP. (Revisit for safety if scaling beyond close circles.)

### Screen 6 — Profile

**Two roles, same structure:** your own Profile (with edit/settings); a friend's Profile (same, minus edit/settings, plus tucked-away remove-friend) when tapped from Friends.

**Layout:**
- **Settings gear** top-right (own profile only).
- **Identity** centered: profile photo (or initial avatar), name, username. **Edit profile** button (own profile only). No stats.
- **Archive — "[Name]'s Kairos"** (e.g. "Joon's Kairos"): a list of past weeks, each a **tappable entry** — cover photo + the Kairo (serif italic) + **date/month** (e.g. "March 2026") + postcard count. Tap → opens that week's postcards. Reads like flipping through chapters.

**Archive rule (own + friends, identical):** only **completed/revealed** weeks appear. The **in-progress week is excluded** (it lives in Create until revealed). Clean split: Create = current unrevealed week; Profile = revealed past.

**Friends see your full archive** (mutual close-friends openness; no recency limit).

**Edit:** photo + name editable; **username permanent**; **no bio**.

**Settings (own only, minimal but complete):** notification preferences (per-type) · sign out · **delete account** (App Store requirement) · privacy policy + terms links (App Store requirement) · report a problem / contact.

**Edge case:** new user with no completed weeks → empty archive state ("Your Kairos will appear here after your first reveal").

**Storage (resolved):** negligible cost; per-postcard visibility deferred (no storage benefit, undercuts honest-reveal). Full-reveal for MVP. (~500KB/postcard, ~26MB/user/yr; bandwidth handled by CDN/thumbnails.)

### Notifications

**Philosophy:** few, meaningful, welcome — never guilt-inducing. Notifications are *event-framed* (the reveal is coming), never *behavior-framed* ("you haven't posted"). The app's scarcity of notifications is what makes them matter; restraint protects the one essential notification (the reveal) from being muted.

**The set (MVP):**
1. **The reveal** — Thursday 8am: calm/understated/warm copy. → opens **Home**. The heartbeat; non-negotiable. (New Kairo begins at the same moment — same event, one notification.)
2. **Mid-week anticipation — escalating countdown (two touches):**
   - **Saturday** (soft, action-flavored): e.g. *"the weekend's a good time for this week's Kairo."* Catches people when they have free time to go do something. → opens **Home**.
   - **Wednesday** (suspense-flavored): e.g. *"reveal tomorrow."* The urgency/anticipation beat. → opens **Home**.
   - Framed as one countdown rhythm, not two separate nags.
3. **Friend request received** — "X wants to add you on Kairo." → opens **Friends**.
4. **Friend request accepted** — "You and X are now friends." → opens **Friends**.

**Explicitly excluded:** no "a friend posted" notification (would spoil the hidden-until-reveal mechanic + drive doomscroll behavior). No streak/guilt notifications ever.

**Mechanics:**
- **Toggleable per-type** in settings (e.g. mute friend pings but keep the reveal).
- **Permission requested with context** — after onboarding / first meaningful action, framed around the reveal ("Kairo will let you know when the weekly reveal is ready"), so the opt-in is motivated, not a cold generic prompt.
- **Tone throughout:** calm, warm, understated. No urgency-bait, no emoji-spam, no exclamation overload.

### Screen 8 — The Reveal (Thursday 8am)

**Ambient, not ceremonial** (deliberate MVP scoping — no takeover screen or big animation).
- The **notification** carries the "moment" ("the reveal is here").
- In-app: the **Home tab glows** when there's a fresh, unseen reveal — a quiet pull toward Home; clears once viewed. This is the minimal-ceremony in-app echo of the notification.
- Opening Home shows the newly-revealed week, clearly labeled ("Last week — [Kairo]"), with the new Kairo + fresh countdown at top (per Home spec).
- **Order of postcards:** simple, non-algorithmic (reverse-chronological or gentle shuffle). No engagement ranking — algorithms are the doomscroll behavior Kairo avoids.

**New / friendless user's first reveal:** Home shows the new Kairo + countdown + an "add friends" nudge. **Never sad** — because the new Kairo dropping means *something was revealed*; the weekly pulse fills the empty state. No special first-timer handling needed.

### Screen 9 — Share-out (postcard → Instagram story / anywhere)

**The growth model:** pull, not push. No "see more on Kairo" CTA, no advertising. Growth comes from personal invites + the quiet repetition of an unexplained logo (seeing the same mark on several friends' stories creates curiosity the viewer scratches themselves — higher-intent than a begged click; matches the exclusive/club soul).

**Mechanics:**
- **Share your own postcards only** (never friends' — privacy/intimacy), and only **after the reveal** (sharing before would leak your hidden week).
- A **share button on each revealed postcard** — share whichever you like.
- **Shared image** = the postcard (photo + caption + the **Kairo**/prompt) with a **quiet "Kairo" wordmark as a signature** in a corner. No tease, no CTA, no "+more."
- Shares via the **iOS share sheet** (Instagram stories, texts, anywhere) — less to build than a custom Instagram integration; image is pre-composed in the Kairo postcard style.

---

## Data Model

Five tables. Plain-English purpose given for each; field list is build-precise for Supabase (Postgres). All tables have an `id` (uuid, primary key) and `created_at` (timestamp) unless noted.

### `users` — *one row per person*
- `id` (uuid, from Supabase Apple auth)
- `name` (text) — display name shown to friends
- `username` (text, **unique**, permanent) — how friends find you
- `profile_photo_url` (text, nullable) — null = render initial avatar
- `created_at` (timestamp)
- *(email comes from Apple auth and may be a hidden relay; not relied upon.)*

### `friendships` — *who is friends with who*
- `id`
- `requester_id` (uuid → users.id) — who sent the request
- `receiver_id` (uuid → users.id) — who received it
- `status` (enum: `pending` | `accepted`)
- `created_at`
- **Rules:** mutual — when `accepted`, direction stops mattering; a user's friends = rows where they are requester OR receiver AND status = accepted. While `pending`, the connection is invisible to both. Either party deleting = remove the row. Backend must prevent duplicate/reverse requests (check both directions before insert). No blocking in v1.

### `kairos` — *the bank of prompts (hand-written)*
- `id`
- `text` (text) — the prompt, e.g. "find water"
- `created_at`
- *(Just reusable prompt text. Scheduling lives in `weeks`.)*

### `weeks` — *each weekly cycle/instance*
- `id`
- `kairo_id` (uuid → kairos.id) — which prompt runs this week
- `starts_at` (timestamp) — a Thursday 8am PST
- `ends_at` (timestamp) — the next Thursday 8am PST (the reveal moment)
- `created_at`
- **Notes:** founder creates each week's row by hand (sets the Kairo + the Thursday dates) for MVP. Themes can recur — a repeated prompt is simply a new `weeks` row, so it appears as a distinct dated archive entry. Postcards belong to a `week`.

### `postcards` — *the core artifact*
- `id`
- `user_id` (uuid → users.id) — who made it
- `week_id` (uuid → weeks.id) — which weekly instance it belongs to
- `photo_url` (text) — image in Supabase Storage
- `caption` (text, nullable) — optional; ~150–200 char limit
- `location` (text, nullable) — optional; the **picked place name only** (e.g. "Cedar Creek") — NOT GPS coordinates
- `created_at` (timestamp) — **capture time** (set when made, even offline; not upload time). Determines which week it belongs to and the date shown on the back.
- `synced_at` (timestamp, nullable) — when it uploaded; null = still local-only/pending (drives offline sync)
- **Rules (enforced by backend, not just UI):**
  - **Max 3 per user per week** (block the 4th).
  - **Reveal gate (critical, DB-level via Row-Level Security):** friends can read a postcard only *after* its week's `ends_at`. Before that, only the owner can see it. This must be enforced at the database level (RLS) so unrevealed postcards are genuinely unreadable by others — not merely hidden in the app.
  - **Delete:** owner only, pre-reveal only (before `ends_at`). After reveal, locked.
  - **Edit (caption/location):** owner only, pre-reveal only.

### Key query patterns (for reference)
- **Home "in progress":** current `week` (where now is between starts_at/ends_at) + its `kairo`.
- **Home "the reveal":** the most-recently-ended `week` + friends' `postcards` for it (readable because past `ends_at`).
- **Create workbench:** your `postcards` for the current `week`.
- **Profile archive:** your `weeks` that have ended (past `ends_at`), each with its postcards — in-progress week excluded.
- **Storage:** photos in Supabase Storage; serve downscaled/thumbnail versions in feeds, full image on tap.

---

## Resolved Edge Cases

- **Card's week** = weekly instance active at creation time (not upload time).
- **Offline card uploading after its week dropped:** joins its week's archive late; never lost.
- **Thursday 8am PST:** closes/reveals old week and opens new week + prompt simultaneously.
- **Joining mid-week:** joins current week in progress; no special handling.
- **Zero friends at drop:** you see your own completed week.
- **Empty week:** passes quietly; no archive entry; no guilt.

---

## Build Sequence

Build in dependency order. Each stage produces something openable/testable before the next. **Never build everything at once.** Foundations before features; no UI before the data it shows exists. (Build with Claude Code; designs come from the Claude Design handoff bundle.)

**Stage 0 — Project skeleton.** React Native + Expo project, Supabase connected, blank app running on phone via Expo. *Test: empty app opens on phone.*

**Stage 1 — Auth + onboarding.** Sign in with Apple; profile setup (name, username + live availability check); 3 intro cards. *Test: sign in, pick username, land in app.* (Everything needs a logged-in user.)

**Stage 2 — Data layer.** The five Supabase tables + Row-Level Security (especially the reveal gate) + photo storage. No new UI. *Test: add a row in Supabase, app reads it.*

**Stage 3 — Capture + Create.** Camera (horizontal hard-lock), make-a-postcard flow (photo → caption → location autocomplete → save), Create workbench (deck, 3-cap, complete state, delete/edit pre-reveal). *Test: make a postcard, see it in the workbench.*

**Stage 4 — Weekly cycle + Home.** Weeks, current-Kairo display, countdown, the reveal gate working (postcards hidden until `ends_at`, then visible), Home's "Kairo in progress" + "The Reveal" sections. *Test: make postcards, simulate week ending, see them reveal.*

→ **PAUSE HERE. Use the app solo for a few days before building the social layer.** Stages 0–4 yield a usable solo loop — the real test of whether the core concept (capture → wait → reveal, journaling-for-yourself) is satisfying. Judge the core mechanics, not the (absent) social magic. Only continue if the core feels good.

**Stage 5 — Friends.** Username search, requests, accept/decline, friends list, friend profiles. *Test: two accounts friend each other and see each other's revealed postcards.*

**Stage 6 — Profile + archive.** Identity, by-week archive (revealed weeks only), friends' profiles, settings (incl. delete account, legal links). *Test: past weeks appear in archive.*

**Stage 7 — Notifications + Share-out.** Reveal + escalating mid-week countdown notifications + friend-request notifications; share-to-Instagram composed image (postcard + Kairo + wordmark signature). *Test: receive reveal notification; share a postcard.*

**Logic:** 0–2 = foundation (toolchain, auth, data). 3–4 = core loop (make + reveal — a usable solo app). 5–7 = social + polish (depend on the core existing).

---

## Status & To Do

**Spec + design + data model + build sequence: COMPLETE. PRD is build-ready.**

Handoff assets:
- **This PRD** → Claude Code (mission, screens, data model, build sequence).
- **Claude Design handoff bundle** → the visuals / design system.

Remaining (setup + during build):
- Accounts/services to set up: Supabase project, Apple Developer (Sign in with Apple + App Store), a location-autocomplete API/dataset.
- Write privacy policy + terms (required for App Store approval).
- Build stage by stage (start Stage 0); pause after Stage 4 to test solo.
- Cosmetic: finish migrating any "drop" wording to "reveal."
