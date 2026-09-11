import { createClient } from '@supabase/supabase-js';

// These are the PUBLIC (anon) Supabase credentials — safe to expose in the
// browser bundle as long as Row Level Security / Storage policies are set up
// correctly on the Supabase project. Never put the service_role/secret key
// here (that one stays in backend/.env and is only used by main.py).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw — just warn, so the rest of the app (which talks to the
  // FastAPI backend) still works even before photo uploads are configured.
  console.warn(
    '[supabaseClient] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. ' +
      'Photo uploads will fail until these are added to your .env file.'
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
