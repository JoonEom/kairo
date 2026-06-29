# Handoff: Kairo — weekly photo-postcard app

## Overview
Kairo is a mobile (iOS-first) social app built around a single weekly ritual. Each week everyone shares the same prompt (e.g. *"Find Water"*). Throughout the week you capture up to **3 landscape postcards** — a photo + caption + location — which stay **private** until a synchronized group **reveal every Thursday at 8:00 AM**. The reveal unseals everyone's postcards at once, like a BeReal-meets-postcard ritual. Tagline: *"Make the day count."*

The aesthetic is deliberately quiet: a warm, minimal, restrained "bone/espresso" palette with **no accent hue on purpose**, so the photos are the only real color. The core artifact is a flippable postcard (photo on the front, handwritten caption + postmark on the back).

## About the design files
The files in this bundle are **design references created in HTML** — interactive prototypes that show intended look and behavior. They are **not production code to copy directly**. They use a small in-house templating runtime (`support.js`, the `.dc.html` "Design Component" format) that exists only for prototyping — **do not port that runtime.**

Your task is to **recreate these designs in the target codebase's environment** using its established patterns and libraries. Given this is an iOS-first mobile app, the natural targets are **SwiftUI (native iOS)** or **React Native / Expo**. If no codebase exists yet, choose whichever of those best fits the team and build the designs there. Treat the HTML/CSS values below as the source of truth for layout, color, type, and motion — then implement idiomatically for your platform.

## Fidelity
**High-fidelity (hifi).** These are pixel-level mockups with final colors, typography, spacing, radii, shadows, and interaction/animation timing. Recreate the UI faithfully — exact hex values, font families, sizes, and the documented motion. The only placeholder is photo content: every photo is a drop-zone in the prototype and should be a real image/camera source in the app.

---

## Design tokens

### Color — one warm-neutral family, no brand accent
| Token | Hex | Usage |
|---|---|---|
| `bg` | `#F7F3EA` | Warm bone — app background |
| `bg.canvas` | `#E8E4DC` | Slightly darker bone — behind device frames in mockups only (not an in-app surface) |
| `surface` | `#FBF8F1` | Cards, postcard back, tab bar, inputs |
| `surface.white` | `#FFFFFF` | Postcard **front** frame, photo mounts |
| `border` | `#E4DCC9` | Hairlines, dividers, card borders |
| `border.soft` | `#ECE5D5` / `#EDE6D6` | Inner row dividers, postcard-back border |
| `text.primary` | `#26241F` | Espresso — primary text **and** all buttons/active states |
| `text.secondary` | `#7A7363` | Muted brown — secondary text |
| `text.tertiary` | `#9C9484` | Taupe — meta, labels, captions |
| `text.placeholder` | `#B5AD9C` | Placeholders, counts, hints, inactive tab icons |
| `text.onDark` | `#F7F3EA` | Text/icons on espresso buttons & dark screens |
| `danger` | `#B0473A` | Destructive only (Delete account) |

There is **no accent/brand hue.** Primary buttons and active states all use espresso `#26241F`. The only color in the app comes from user photos and from avatar gradients (below).

**Avatar gradients** (140° linear, initial in `#FBF8F1` Fraunces): Maya `#CDB994→#9E8462`, Jonah `#B9A7C0→#8A7392`, Priya `#A9B89E→#74866A`, Sofia/warm `#C2A38C→#8E6B58`, Theo/cool `#9FA9B8→#6A7488`, Nathan `#B0A48C→#7E7152`.

### Typography
Two families only:
- **Fraunces** (serif, optical) — "carries the soul." Wordmark, the weekly prompt/Kairo title, postcard captions, screen headings, empty-state titles. Weights used: 400 (captions), 500 (titles/wordmark). Italic used for the "K" postmark glyph. Letter-spacing on large titles ≈ `-0.01em`.
- **Inter** (sans) — "out of the way." Body, UI, labels, buttons. On native iOS, **SF Pro** is the intended substitute for Inter. Weights: 400/500/600.

Type roles:
| Role | Family / weight / size / tracking |
|---|---|
| Wordmark "Kairo" | Fraunces 500, 22–25px (nav), 72px (marketing) |
| Prompt / Kairo title | Fraunces 500, 29–34px, line-height ~1.05, `-0.01em` |
| Postcard caption | Fraunces 400, 19px, line-height 1.5 |
| Screen heading | Fraunces 500, 26px |
| Eyebrow / label | Inter 600, 11px, `letter-spacing 0.14–0.18em`, UPPERCASE, color `#9C9484` |
| Body | Inter 400, 14–15px, line-height ~1.55 |
| Button label | Inter 600, 15–16px |
| Meta / username | Inter 400–500, 13px, `#9C9484` |

### Spacing scale (px)
`4 · 8 · 14 · 16 · 20 · 24` (with larger section gaps 26/34/46 used between blocks).

### Radius
- `14` — cards
- `13` — buttons
- `12` — inputs / search
- `10` — small / inputs
- `8` — photo within postcard front
- `50%` — avatars, FAB, tab-icon hit areas
- Postcard back & misc `11`; postmark stamp `2–3`

### Shadow
- Card (soft, low): `0 6px 20px rgba(38,36,31,0.10)`
- Lighter card: `0 4px 14px rgba(38,36,31,0.06–0.08)`
- Floating FAB: `0 3px 10px rgba(38,36,31,0.22)`
- Reveal/elevated stack: `0 12px 30px rgba(38,36,31,0.18)` up to `0 16px 36px rgba(0,0,0,0.4)` on dark

### Device / layout
Designed for iPhone at logical **402 × 874** (the prototype's device frame). Screens are vertical flex columns: fixed-height header → scrolling content → fixed tab bar. Safe-area top padding ≈ 56–64px; tab bar bottom padding ≈ 30px (home indicator).

---

## The core component — Postcard

A flippable card, the heart of the app. Aspect ratio **1.31:1** (landscape, ≈4:3 photo).

**Front:** white `#FFFFFF` frame, ~3.1% padding, inner photo with `border-radius:8px` over `#EFE9DC` mount. Optional **location** overlaid bottom-left — Inter 600, 13px, UPPERCASE, `letter-spacing 0.12em`, white with `text-shadow:0 1px 4px rgba(0,0,0,0.5)`. A circular **flip affordance** sits bottom-right: 30px circle, `rgba(251,248,241,0.94)` fill, `#E4DCC9` border, contains a `⤺` glyph in `#7A7363`.

**Back:** `#FBF8F1` with `#EDE6D6` border, ~6% padding, split into two columns by a 1px `#E4DCC9` vertical divider:
- **Left (~60%):** caption in Fraunces 400, 19px, line-height 1.5, `#26241F`. If no caption: *"No caption"* in italic `#B5AD9C`.
- **Right (~38%):** a **postmark stamp** at top (46×56px white rect, `#E4DCC9` border, rotated 3°, containing a dashed-border box with an italic Fraunces "K"; a faint circular "KAIRO · POST ·" cancellation ring overlaps it). At the bottom-right: location (Inter 600, 11px, UPPERCASE, `#9C9484`) above the date (Inter, 12px, `#7A7363`).

**Flip interaction:** 3D `rotateY` on the inner element, `transition: transform 0.62s cubic-bezier(0.2,0.72,0.16,1)`, `transform-style: preserve-3d`, `backface-visibility: hidden`. Front face shows at 0°, back at 180°. Tapping the flip button turns it over; tapping the back turns it back. Pointer-events are toggled so only the visible face is interactive.

**Props:** `photoId`, `caption`, `location` (optional — hides the overlay/label when absent), `date`, `photoPlaceholder`. Source: `Postcard.dc.html`.

---

## Screens / Views

### 1. Onboarding (3 slides + invite) — `Onboarding.dc.html`
Full-screen carousel on `#F7F3EA`, "Kairo" wordmark pinned top-center. 3-dot pager (active `#26241F`, inactive `#D8CFBC`), full-width espresso "Continue"/"Get started" button at the bottom.
- **1 of 3 — "New Kairo, every week."** Visual: a small card showing `THIS WEEK'S KAIRO` eyebrow + "Find Water" in large Fraunces.
- **2 of 3 — "Capture your Kairo."** Sub: "Collect your week in postcards." Visual: two fanned postcards (rotated −7° / +6°).
- **3 of 3 — "Thursdays, the reveal."** Sub: "Everyone's take, all at once." Visual: 2×2 grid of mini postcards.
- **Invite (skippable):** "Skip" top-right. Cluster of 3 overlapping avatars. Title "Kairo's better with friends", sub "Invite the people you'd actually send a postcard to." Primary "Invite a friend" (with + icon) + ghost "Maybe later".

### 2. Home / The Reveal — `Home.dc.html` (and in `Kairo Prototype.dc.html`)
Header: centered "Kairo" wordmark (Fraunces 500, 25px). Scrolling body, tab bar with **Home** active.
- **"Kairo in progress" card** (tappable → Create): surface card, eyebrow `KAIRO IN PROGRESS`, prompt "Find Water" (Fraunces 31px), a countdown "Reveals in 0d 0h 02m", and a 52px espresso circular **+ FAB** bottom-right.
- **The Reveal — locked (pre-reveal) state:** heading "The Reveal", "Everyone's in. 4 friends posted this week." A **sealed stack** of 3 overlapping blank postcards (rotated −7°/+4°/−1°) with a wax-seal-style "K" ring centered. Caption "THURSDAY · 8:00 AM" + "Sealed until everyone can see at once." Primary button "Open the reveal" (with lock icon).
- **The Reveal — revealed state:** heading "The Reveal", "Everyone's take on *Find Water*". Per-friend sections (avatar + name + "· N postcards"), each a horizontal **snap-scroll carousel** of that friend's postcards with a dot pager beneath (active `#26241F`, inactive `#D8CFBC`). Example data: Maya Lin (3 postcards), Jonah Reese (1).

### 3. The Reveal ceremony (animation overlay) — in `Kairo Prototype.dc.html`
Triggered by "Open the reveal". A full-screen espresso `#26241F` overlay that plays a timed sequence, then dismisses to the revealed Home feed. Phases (see Interactions): label fades in → title "The reveal is here" + prompt fade in → 3 postcards settle in from the sides with slight rotations → "Tap to see them all" appears → overlay fades out. Tappable to skip.

### 4. Create (this week's postcards) — `Create.dc.html` (and in prototype)
Header: eyebrow `KAIRO IN PROGRESS`, prompt "Find Water", countdown, and a **progress meter** — 3 segments (filled `#26241F`, empty `#E1D8C6`) + "N / 3" count. Tab bar with **Create** active.
- **Empty state:** dashed 1.31:1 frame with a + glyph, "Your week starts here", "Make a postcard whenever the moment's right. It stays yours until the reveal.", primary "Make your first postcard".
- **Populated:** vertical list of the user's Postcards (up to 3), then a dashed **"Make a postcard"** add-tile (44px espresso + circle, "N left this week") while count < 3. At 3, an "Kairo complete — See everyone's take on Thursday." note replaces the add-tile.

### 5. Camera (capture) — in `Kairo Prototype.dc.html`
Dark screen `#161412`, slides up from bottom. Top bar: "Cancel" / `NEW POSTCARD` eyebrow. **Landscape-locked 4:3 viewfinder** with corner brackets and a "LANDSCAPE · 4:3" label; a pill hint "Turn your phone sideways — Kairo postcards are landscape." A 74px ring **shutter** at the bottom. Capturing triggers a white **flash** (opacity 0.92, 120ms) then transitions to Make details.

### 6. Make details (after capture) — in `Kairo Prototype.dc.html`
Nav: "Cancel" / "New postcard" / "Retake". Shows the captured photo in a white postcard frame, then editable **Caption** (Fraunces 19px with a blinking caret) and **Location** (pin icon + value, underlined field) sections. Sticky bottom bar with primary "Add to this week".

### 7. Friends — `Friends.dc.html` (3 states)
Header "Friends" (Fraunces 26px). Search field ("Find by username", search icon). Tab bar with **Friends** active.
- **Populated:** `REQUESTS` section (avatar + name/@handle + round accept ✓ / decline ✕ buttons), then `FRIENDS · 4` list (avatar, name, @handle, chevron), then a ghost "Invite a friend" button.
- **Search results:** active (espresso-bordered) search field with caret; `RESULTS` list where each row's trailing control reflects relationship — "Friends" (text), "Add" (espresso pill), or "Requested" (outlined pill).
- **Empty:** centered friends icon, "No friends yet", "Search for a username, or invite someone to join you on Kairo.", primary "Invite a friend".

### 8. Profile — `Profile.dc.html` (4 states)
Tab bar with **Profile** active (own) — friend's profile uses a back arrow instead.
- **Own profile:** gear icon top-right. Centered identity: 84px avatar, name (Fraunces 25px), @handle, "Edit profile" outline button. Divider, then **"Ava's Kairos"** archive — list of past weeks (72px postcard thumb + week title in Fraunces + "Week of … · N postcards" + chevron).
- **Friend's profile:** back arrow, no gear. Same identity block but with a "✓ Friends" status pill instead of Edit. "Maya's Kairos" archive list.
- **Empty archive:** identity block, then "No Kairos yet — Your Kairos will appear here after your first reveal." with a dashed postcard placeholder.
- **Opened week (archive entry):** back nav "Ava's Kairos", centered week header ("WEEK OF MARCH 9" eyebrow + title "Take The Long Way" + "3 postcards"), then the full vertical list of that week's Postcards.

### 9. Settings — `Settings.dc.html`
Nav bar: back arrow + "Settings". Grouped list rows on `#FBF8F1` cards:
- **Notifications:** "The reveal / Thursdays at 8am" (toggle ON), "Mid-week nudge / A reminder to capture" (toggle ON), "Friend requests" (toggle OFF). Toggle = 44×26 pill, ON `#26241F` / OFF `#D8CFBC`, 20px white knob.
- **Account:** "Sign out", "Delete account" (`#B0473A`).
- **About:** Privacy Policy, Terms of Service, Report a problem.
- Footer "Kairo · v1.0".

---

## Interactions & behavior

### Navigation
4-tab bar: **Home · Friends · Create · Profile** (icons + 10px labels; active = `#26241F` filled/bold, inactive = `#B5AD9C`). Tapping a tab switches the root screen.

### Postcard flip
See component above. 0.62s `cubic-bezier(0.2,0.72,0.16,1)` 3D Y-rotation; only the visible face accepts taps.

### Create flow
"Kairo in progress" / "+" → **Create** → "Make a postcard" → **Camera**. Shutter → 120ms white flash → **Make details** → "Add to this week" → back to **Create** with the new postcard appended and the progress meter incremented (max 3). Camera & Make-details screens **slide up** from the bottom (`translateY(101%)` → `0`), other screens cross-fade.

### Screen transitions (from the prototype)
Each screen: `transition: opacity .45s ease, transform .5s cubic-bezier(.2,.72,.16,1)`. Standard screens fade/translate; camera & make-details translate from `101%` (sheet style).

### Reveal ceremony timeline (ms, from `startReveal`)
- `0` — overlay in, label "Thursday · 8:00 AM" fades up
- `1300` — title "The reveal is here" + prompt fade up
- `2800` — 3 postcards settle in: card0 from left (x −96, rotate −8°), card1 center (delay +130ms), card2 from right (x +96, rotate +9°, delay +260ms); each `transition ... 1s cubic-bezier(.2,.72,.16,1)`
- `4700` — "Tap to see them all" fades in
- `6400` — overlay begins fading out; revealed feed is now behind it
- `7350` — overlay unmounted
Tapping anywhere skips to the end (jumps to revealed feed after ~900ms). Element fades use `opacity/transform translateY` over `.85s`.

### Carousel paging
Friend postcard rows use horizontal scroll-snap (`scroll-snap-type:x mandatory`, each card `scroll-snap-align:center`, full-width). The dot pager reflects `round(scrollLeft / clientWidth)`.

### Other micro-states
- Capture flash: white overlay, opacity 0→0.92→0 over ~130ms.
- Caption/search fields show a 1.5px blinking caret block (`#26241F`) at the text end.
- Toggles animate the knob across the pill.

---

## State management
Minimum state to drive the flows (names from the prototype):
- `screen`: `'home' | 'create' | 'camera' | 'makeDetails'` (+ Friends/Profile/Settings as routes) — active screen.
- `revealed`: boolean — has this week's reveal happened (gates locked vs. revealed Home).
- `revealPhase`: `0–5` — drives the reveal ceremony timeline; 0 = not playing.
- `createdCount`: `0–3` — how many postcards the user has made this week (drives Create empty/populated, progress meter, add-tile vs. "complete").
- `flashing`: boolean — camera capture flash.
- `mayaIndex` (and per-friend equivalents): active card index in each carousel.

Real-app data needs (not in the prototype, infer for production):
- Current weekly **prompt** + reveal timestamp (weekly cadence, Thursday 8:00 AM local).
- User's postcards for the active week (private until reveal).
- Friends graph: friends, incoming requests, outgoing (requested) — drives Friends row states.
- Per-friend revealed postcards for the week; archive of past weeks per user.
- Settings/notification preferences.

## Assets
- **Photos:** every postcard photo is a placeholder drop-zone (`image-slot.js`) in the prototype. In production these are user photos from camera/library, locked to landscape 4:3.
- **Avatars:** rendered as initial-on-gradient (see gradient list under Color) — no image assets. Real app may use uploaded avatars with this as fallback.
- **Icons:** all inline SVG, 1.6–1.8 stroke weight, line style (home, friends, camera, profile, search, gear, chevron, pin, lock, plus, check, x, rotate). Re-draw with your platform's icon set (SF Symbols on iOS map closely) keeping the line weight light.
- **Fonts:** Fraunces (Google Fonts, optical 9–144, weights 400/500/600) and Inter (400/500/600). On iOS substitute **SF Pro** for Inter; Fraunces must be bundled.
- **No logo image** — the wordmark is set type (Fraunces 500).

## Screenshots
Rendered reference images live in `screenshots/` (full-layout captures of each file, including every state variant):
- `01-design-system.png` — tokens + Postcard spec page
- `02-onboarding.png` — 3 onboarding slides + invite
- `03-home.png` — Home states (locked / revealed)
- `04-create.png` — Create states (empty / populated / complete)
- `05-friends.png` — Friends (populated / search / empty)
- `06-profile.png` — Profile (own / friend's / empty / opened week)
- `07-settings.png` — Settings list
- `08-prototype-home.png` — the interactive prototype's default state

## Files in this bundle
- `README.md` — this document (self-sufficient).
- `Kairo Design System.dc.html` — color, type, spacing, radius/shadow, and the Postcard spec on one page. **Best single reference for tokens.**
- `Kairo Prototype.dc.html` — the interactive core flow: Home (locked + revealed) → Create → Camera → Make details → Reveal ceremony. Contains the real state logic and animation timings.
- `Postcard.dc.html` — the flippable Postcard component (props + flip logic).
- `Onboarding.dc.html` — 3 onboarding slides + invite screen.
- `Home.dc.html`, `Create.dc.html` — standalone screen layouts (state variants laid out side by side).
- `Friends.dc.html` — populated / search / empty states.
- `Profile.dc.html` — own / friend's / empty / opened-week states.
- `Settings.dc.html` — settings list.
- `ios-frame.jsx`, `image-slot.js`, `support.js` — **prototype runtime only.** Provided so the HTML opens and renders; **do not port.** `ios-frame.jsx` is the device bezel, `image-slot.js` is the drag-to-fill photo placeholder, `support.js` is the templating engine.

> To preview any `.dc.html` file, open it directly in a browser (it self-loads `support.js`). The `Kairo Prototype.dc.html` file is the one to click through.
