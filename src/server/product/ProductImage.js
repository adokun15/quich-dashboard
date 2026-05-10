"use server";

import { createClientFromSupabase } from "@/lib/supabase/client";
import { UpdateProductDetail } from "./UpdateProduct";
import { revalidateTag, updateTag } from "next/cache";
const supabase = createClientFromSupabase();

//Connect to supabase Storage INstead
export async function AddProductImage({ filepath, file, product_id }) {
  // Upload file using standard upload
  const { data, error } = await supabase.storage
    .from("quich")
    .upload(filepath, file, { upsert: true });

  if (error) {
    // Handle error
    if (error?.message === "fetch failed") {
      return {
        error: { message: "Network Error. Check your Internet Connection" },
      };
    }
    if (error?.message === "The resource already exists") {
      return { error: { message: "Image path already exist!", code: 500 } };
    }
    return { error: { message: error?.message, code: 500 } };
  }

  //Next process: Generate public url;
  const url = supabase.storage.from("quich").getPublicUrl(data?.path);

  try {
    //Final process: Update Public url;
    const product_image = await UpdateProductDetail({
      updates: {
        images: [url.data.publicUrl], //Later multiple images
      },
      product_id,
    });

    if (!product_image?.status) {
      //Reverse action(supabase)

      return {
        error: {
          message: product_image?.message,
          code: product_image?.code,
        },
      };
    }

    updateTag("single_product");

    return { message: "Upload successful", url: url.data.publicUrl };
  } catch (e) {
    return {
      error: {
        message: e?.message,
        code: 500,
      },
    };
  }
}

export async function DeleteProductImage({ filepath, productId }) {
  const get_path = filepath[0]?.split("quich/")[1];

  const { data: doesExist, error: checkError } = await supabase.storage
    .from("quich")
    .exists(get_path);

  if (checkError) {
    // Handle error
    if (error?.message === "fetch failed") {
      return {
        error: { message: "Network Error. Check your Internet Connection" },
      };
    }
    return { error: { message: error?.message } };
  }

  //Does this Resource exist
  if (!doesExist) {
    return { message: "Failed to delete. The resource does not exist." };
  }

  const { error } = await supabase.storage.from("quich").remove([get_path]);

  if (error) {
    // Handle error
    if (error?.message === "fetch failed") {
      return {
        error: { message: "Network Error. Check your Internet Connection" },
      };
    }

    return { error: { message: error?.message } };
  }

  try {
    //Final process:
    const product_image = await UpdateProductDetail({
      updates: {
        images: null, //Later multiple images
      },
      product_id: productId,
    });

    if (!product_image?.status) {
      //Reverse action(supabase)

      return {
        error: {
          message: product_image?.message,
          code: product_image?.code,
        },
      };
    }

    updateTag("single_product");

    return { message: "Deleted successful", id: product_image?.id };
  } catch (e) {
    return {
      error: {
        message: e?.message,
        code: 500,
      },
    };
  }
}
