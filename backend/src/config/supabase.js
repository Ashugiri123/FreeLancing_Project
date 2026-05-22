import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

for (const envPath of [path.resolve(process.cwd(), ".env"), path.resolve(process.cwd(), "backend", ".env")]) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false });
  }
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const rawServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseServiceRoleKey =
  rawServiceRoleKey && !rawServiceRoleKey.startsWith("your-") ? rawServiceRoleKey : "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY are required.");
}

if (!supabaseUrl.startsWith("https://") || !supabaseUrl.includes(".supabase.co")) {
  throw new Error("SUPABASE_URL must look like https://your-project-ref.supabase.co.");
}

if (supabaseAnonKey.startsWith("your-")) {
  throw new Error("SUPABASE_ANON_KEY is still a placeholder. Add your real Supabase anon key.");
}

console.log(`[supabase] Client initialized for ${supabaseUrl}`);
console.log(`[supabase] Service role key ${supabaseServiceRoleKey ? "configured" : "not configured"}`);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : supabase;

export function supabaseForToken(accessToken) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
