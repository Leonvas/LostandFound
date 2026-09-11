import { createClient } from '@supabase/supabase-js';

// These must be set in .env.local (Vite only exposes vars prefixed VITE_):
//   VITE_SUPABASE_URL=https://<your-project>.supabase.co
//   VITE_SUPABASE_ANON_KEY=<your anon/public key>
//
// Use the ANON key here, never the service-role/secret key — this file ships
// to the browser. The anon key is safe as long as Row Level Security (RLS)
// on lost_reports / found_items only allows the reads you intend.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase) {
  // Non-fatal: the dashboard falls back to polling if realtime isn't configured.
  console.warn(
    '[supabaseClient] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set — ' +
      'live match updates will fall back to periodic polling instead of realtime.'
  );
}
