import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://your-project-id.supabase.co",
  "sb_publishable_...",
);
// ---cut---
async function signOut() {
  const { error } = await supabase.auth.updateUser();
}
