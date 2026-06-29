-- ============================================================
-- Stage 1 — Users table + profile-photos storage bucket
-- Run this in the Supabase Dashboard → SQL Editor
-- ============================================================

-- Users table (one row per person, mirrors auth.users)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  username text unique not null,
  profile_photo_url text,
  created_at timestamptz default now() not null
);

-- Index for username lookups (availability check + friend search)
create index if not exists users_username_idx on public.users (username);

-- Row-Level Security
alter table public.users enable row level security;

-- Anyone authenticated can read any profile (needed for username search)
create policy "Profiles are publicly readable"
  on public.users for select
  using (true);

-- Users can only create their own profile
create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Users can only update their own profile
create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- ============================================================
-- profile-photos storage bucket
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-photos',
  'profile-photos',
  true,
  5242880,  -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp']
) on conflict (id) do nothing;

-- Public read (bucket is public, but RLS still applies)
create policy "Profile photos are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'profile-photos');

-- Users upload only into their own folder (<user-id>/avatar.jpg)
create policy "Users can upload own profile photo"
  on storage.objects for insert
  with check (
    bucket_id = 'profile-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update own profile photo"
  on storage.objects for update
  using (
    bucket_id = 'profile-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete own profile photo"
  on storage.objects for delete
  using (
    bucket_id = 'profile-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
