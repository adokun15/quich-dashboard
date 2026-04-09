"use server";

import { createClientFromSupabase } from "@/lib/supabase";

//Connect to supabase Storage INstead
export async function AddProductImage({ filepath, file, productId }) {
  const supabase = createClientFromSupabase();
  // Upload file using standard upload
  async function uploadFile() {
    const { data, error } = await supabase.storage
      .from("quich")
      .upload(filepath, file, {});

    if (error) {
      // Handle error
    } else {
      // Handle success
    }
  }
}

export async function DownloadProductImage({ filepath, file, productId }) {
  const supabase = createClientFromSupabase();
  // Upload file using standard upload
  async function uploadFile() {
    const { data, error } = await supabase.storage
      .from("quich")
      .upload(filepath, file, {});

    if (error) {
      // Handle error
    } else {
      // Handle success
    }
  }
}
