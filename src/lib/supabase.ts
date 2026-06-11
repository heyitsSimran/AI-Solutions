import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if service role key is available and valid
const hasValidServiceKey = supabaseServiceKey && 
  supabaseServiceKey !== "YOUR_SERVICE_ROLE_KEY_HERE" && 
  supabaseServiceKey.length > 50;

// Client-side Supabase client (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (uses service role key for admin operations)
// Falls back to anon key if service role key is not available
export const supabaseAdmin: SupabaseClient = hasValidServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

// Helper to check if we're using service role
export const isUsingServiceRole = hasValidServiceKey;
