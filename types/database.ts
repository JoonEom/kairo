// Supabase table types — populated in Stage 2 when tables are created.
// Shape mirrors the PRD data model exactly.

export type FriendshipStatus = 'pending' | 'accepted';

export interface User {
  id: string;
  name: string;
  username: string;
  profile_photo_url: string | null;
  created_at: string;
}

export interface Friendship {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: FriendshipStatus;
  created_at: string;
}

export interface Kairo {
  id: string;
  text: string;
  created_at: string;
}

export interface Week {
  id: string;
  kairo_id: string;
  starts_at: string;
  ends_at: string;
  created_at: string;
}

export interface Postcard {
  id: string;
  user_id: string;
  week_id: string;
  photo_url: string;
  caption: string | null;
  location: string | null;
  created_at: string;
  synced_at: string | null;
}
