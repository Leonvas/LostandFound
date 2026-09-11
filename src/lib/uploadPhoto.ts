import { supabase } from './supabaseClient';

// Single bucket, split into "lost/" and "found/" folders so photos for both
// report types are easy to tell apart in the Supabase dashboard.
const PHOTO_BUCKET = 'item-photos';

export type PhotoFolder = 'lost' | 'found';

/**
 * Uploads a single image file to Supabase Storage and returns its public URL.
 * Throws if the upload fails (bucket missing, RLS policy blocking, etc.) —
 * callers should catch this and show the user a toast/error.
 */
export async function uploadItemPhoto(file: File, folder: PhotoFolder): Promise<string> {
  const fileExt = file.name.split('.').pop() || 'jpg';
  const randomId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const path = `${folder}/${randomId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage.from(PHOTO_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
