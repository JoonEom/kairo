# Kairo — Claude Context

## What this is
A React Native + Expo iOS app. Private invite-only weekly photo journal with a Thursday "reveal" mechanic.
Full spec: `docs/PRD.md`. Design system + screen specs: `docs/Kairo_Design_Brief.md`. Design handoff HTML mockups: `design/`.

## Stack
- Expo SDK 54 / React Native 0.81.5 / React 19 / TypeScript 5.9
- Supabase (auth + database + storage)
- Env vars: `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env` (git-ignored, never commit)

## File structure 
```
app/              ← Expo Router screens
  (auth)/         ← Onboarding flow (signup, profile, intro, invite)
  (tabs)/         ← Main tab screens (Home, Friends, Create, Profile)
  _layout.tsx     ← Root layout — fonts, splash, AuthProvider
  index.tsx       ← Launch screen
contexts/         ← AuthContext (session + profile state)
constants/        ← Design tokens (colors.ts, typography.ts)
design/           ← Design handoff HTML mockups
docs/             ← PRD.md + Kairo_Design_Brief.md
lib/              ← supabase.ts client
supabase/
  migrations/     ← SQL migration files (run in Supabase SQL Editor)
types/            ← TypeScript types (database.ts has all 5 table shapes)
assets/           ← Images, fonts
```

Use `@/` path alias for all imports (e.g. `import { colors } from '@/constants/colors'`).

## Build sequence — current status

| Stage | What | Status |
|-------|------|--------|
| 0 | Project skeleton — Expo + Supabase connected, blank app on phone | ✅ COMPLETE |
| 1 | Auth + onboarding — Sign in with Apple, profile setup (name, username, photo), 3 intro cards | ✅ COMPLETE |
| 2 | Data layer — 5 Supabase tables + RLS + photo storage bucket | 🔜 NEXT |
| 3 | Capture + Create — camera (horizontal lock), make-a-postcard flow, workbench | — |
| 4 | Weekly cycle + Home — countdown, reveal gate, Home screen | — |
| — | **PAUSE after Stage 4** — use solo for a few days before social layer | — |
| 5 | Friends — username search, requests, friends list | — |
| 6 | Profile + archive — identity, revealed weeks, settings | — |
| 7 | Notifications + Share-out | — |

## Rules
- **One stage at a time.** Never build ahead. Confirm each stage works on device before starting the next.
- **Never commit `.env`** — it contains real Supabase keys.
- Auth is **Sign in with Apple only** for MVP (iOS-first).
- The reveal gate (friends can't see postcards until `ends_at`) must be enforced at **DB level via RLS**, not just in the app.
- Offline-first capture is a hard requirement — postcards save locally immediately, sync when signal returns.
- Max **3 postcards per user per week** — enforced by backend, not just UI.
