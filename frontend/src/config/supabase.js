import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasValidUrl = Boolean(supabaseUrl?.startsWith("https://") && supabaseUrl.includes(".supabase.co"));
const hasPlaceholderKey = Boolean(supabaseAnonKey?.startsWith("your-"));
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && hasValidUrl && !hasPlaceholderKey);

if (!isSupabaseConfigured) {
  console.warn("[supabase] Client not initialized. Missing or invalid VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.");
}

if (isSupabaseConfigured) {
  console.log(`[supabase] Browser client initialized for ${supabaseUrl}`);
}

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable auth and data.");
  }

  return supabase;
}
