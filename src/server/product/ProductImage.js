"use server";

import { createClientFromSupabase } from "@/lib/supabase/client";
import { UpdateProductDetail } from "./UpdateProduct";
const supabase = createClientFromSupabase();

//Connect to supabase Storage INstead
export async function AddProductImage({ filepath, file, product_id }) {
  // Upload file using standard upload
  const { data, error } = await supabase.storage
    .from("quich")
    .upload(filepath, file, { upsert: true }); //You

  console.log(data);
  console.log(error);
  if (error) {
    // Handle error
    console.log(error);
    if (error?.message === "fetch failed") {
      return { error: "Network Error. Check your Internet Connection" };
    }
    if (error?.message === "The resource already exists") {
      return { error: error?.message };
    }
    console.log(error.message);
    return { error: error?.message };
  }

  //Next process: Generate public url;
  const url = supabase.storage.from("quich").getPublicUrl(data?.path);

  console.log(url);

  //Final process: Update Public url;
  const product_image = await UpdateProductDetail({
    updates: {
      images: [url.data.publicUrl], //Later multiple images
    },
    product_id,
  });

  if (product_image?.error) {
    console.log(product_image?.error);
    return { error: "Something went wrong" };
  }

  console.log(product_image);
  return { message: "Upload successful", url: url.data.publicUrl };
}

export async function DeleteProductImage({ filepath, productId }) {
  const get_path = filepath[0]?.split("quich/")[1];

  const { data: doesExist, error: checkError } = await supabase.storage
    .from("quich")
    .exists(get_path);

  if (checkError) {
    // Handle error
    if (error?.message === "fetch failed") {
      return { error: "Network Error. Check your Internet Connection" };
    }
    return { error: error?.message };
  }

  //Does this Resource exist
  if (!doesExist) {
    return { error: "No resource found!" };
  }

  const { error } = await supabase.storage.from("quich").remove([get_path]);

  if (error) {
    // Handle error
    if (error?.message === "fetch failed") {
      return { error: "Network Error. Check your Internet Connection" };
    }

    console.log(error.message);
    return { error: error?.message };
  }

  //Final process:
  const product_image = await UpdateProductDetail({
    updates: {
      images: null, //Later multiple images
    },
    product_id: productId,
  });

  if (product_image?.error) {
    console.log(product_image?.error);
    return { error: "Something went wrong" };
  }

  console.log(product_image);
  return { message: "Deleted successful", id: product_image?.id };
}
