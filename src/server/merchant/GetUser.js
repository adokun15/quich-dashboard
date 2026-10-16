import { createClientFromSupabase } from "@/lib/supabase/client";

//Get user via token;
export async function getUserFromToken(token) {
  const { data, error } = await createClientFromSupabase().auth.getUser(token);

  if (error || !data.user) return null;

  return data.user;
}
