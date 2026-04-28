import { createClient } from "@supabase/supabase-js";

export function createClientFromSupabase() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
  );
  return supabase;
}
