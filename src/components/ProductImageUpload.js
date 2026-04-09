"use client";

import React, { useEffect, useState } from "react";
import { createClientFromSupabase } from "@/lib/supabase";
import Image from "next/image";

export default function ProductImageUpload({
  product_id,
  store_id,
  url = null,
  size,
  onUpload,
}) {
  const supabase = createClientFromSupabase();

  const [productImageUrl, setProductImageUrl] = useState(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage
          .from("quich/products")
          .download(path);

        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);

        setProductImageUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadProductImage = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${store_id}/${product_id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("quich/products")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading product Image!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {productImageUrl ? (
        <Image
          width={size}
          height={size}
          src={productImageUrl}
          alt="productImage"
          className="productImage image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="" style={{ height: size, width: size }} />
      )}

      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadProductImage}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
