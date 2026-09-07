import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error('Supabase URL is not configured. Set NEXT_PUBLIC_SUPABASE_URL in Vercel.');
  if (!key) throw new Error('Supabase service role key is not configured. Set SUPABASE_SERVICE_ROLE_KEY in Vercel.');

  _supabaseAdmin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _supabaseAdmin;
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, property, receiver) {
    return Reflect.get(getSupabaseAdmin() as object, property, receiver);
  },
});

export const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'site-media';
