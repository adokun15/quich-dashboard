"use client";

import {
  AddProductImage,
  DeleteProductImage,
} from "@/server/product/ProductImage";
import Compressor from "compressorjs";
import Image from "next/image";
//Upload two images to cloud: max(5mb) Each

//Image are compressed to 1mb later

import { useState } from "react";
import Card from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPlusSquare,
  faSave,
} from "@fortawesome/free-regular-svg-icons";
import { faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons";
//import { Button } from "../ui/button";
//import placeImg from "../../image/undraw/undraw_Meditation_re_gll0.png";
//import { useUploadImageMutation } from "../../store/Slices/uploads";
//import { toast } from "sonner";
//import { Loader2 } from "lucide-react";

export default function ProductImageUpload({
  product_id,
  store_id,
  imgUrl = null,
}) {
  //Img Preview
  const [previewImg, setPreviewImage] = useState("");

  //Img Large Error : > 10mb
  const [imgError, setImageError] = useState("");

  //Current File
  const [file, setImgFile] = useState(null);

  //Product Upload state;
  const [product_images, setProductImages] = useState(imgUrl);

  //const [uploadMyProfile, { isLoading }] = useUploadImageMutation();

  const compressImageSize = async (file) => {
    return new Compressor(file, {
      width: 500,
      height: 500,
      quality: 0.6,
      convertSize: 5_000_000, //5mb
      success(file) {
        //console.log(file);
        console.log(file);
        setImgFile(file);
        setImageError("");
        //return file;
      },
      error(e) {
        console.log(e.message);
        setImageError(e.message);
      },
    });
  };

  //Listener for Change and lowkey compress image here
  const handleImgChange = async (e) => {
    const imgFile = e.target.files[0];

    console.log(imgFile);
    const size = (imgFile.size / (1024 * 1024)).toFixed(2);

    //Check If They are Sending video
    // if (imgFile?.type !== "image/png" || imgFile?.type !== "image/jpeg") {
    //   setImageError("Invalid File Retrieved.");
    ///  return;
    // }

    setPreviewImage(URL.createObjectURL(imgFile));

    if (size > 50) {
      setImageError("Image is too large. Pick Image less than 50mb");
      return;
    }

    await compressImageSize(imgFile);
  };

  //Trigger for Upload
  const handleUpload = async () => {
    if (imgError) return;

    if (file) {
      const fileExt = file.name.split(".").pop();
      const filepath = `store/${store_id}/products/${product_id}.${fileExt}`;

      const upload = await AddProductImage({ file, filepath, product_id });

      if (upload?.error) {
        setImageError(upload?.error);
        return;
      }

      setPreviewImage("");

      //Product Modal: Alert first

      console.log(upload);

      setProductImages([upload?.url]);

      /*await uploadMyProfile({ uid, file })
        .unwrap()
        .then((data) => {
          //Close Modal
          onClose();
          //Alert User
          toast.success("Profile pic updated", { description: data });
        })
        .catch((e) => {
          //Send toast
          toast.error("Profile pic update failed ", {
            description: e?.message,
          });
        });*/
    }
  };

  const RemoveCurrentUpload = async () => {
    if (!window.confirm("Are you sure you want to remove this image?")) return;

    if (imgUrl) {
      const upload = await DeleteProductImage({
        filepath: imgUrl,
        productId: product_id,
      });

      if (upload?.error) {
        setImageError(upload?.error);
        return;
      }

      //Product Modal: Alert first
      console.log(upload);

      setProductImages(null);
    }
  };

  return (
    <Card className="font-poppins px-5 py-4  space-y-4  overflow-y-auto md:h-fit block  md:mx-auto md:mt-[2vh] ">
      <p className="text-desc text-red-600">{imgError}</p>
      <div className="rounded">
        {(previewImg || product_images) && (
          <Image
            src={previewImg || product_images[0]}
            //src={previewImg || imgUrl || placeImg}
            width={190}
            height={210}
            alt="A product item"
          />
        )}

        {!previewImg && !product_images && (
          <>
            <div className="bg-input w-full text-desc py-12  text-center h-fit">
              <FontAwesomeIcon icon={faImage} className="text-[120px]" />
              <p>Add an image to showcase your products to your customer</p>
            </div>
          </>
        )}
      </div>

      <div className="*:mr-4 flex flex-wrap items-center gap-5">
        {/*!isLoading && ( */}

        <label
          type="button"
          className="
          text-text bg-input text-desc py-1 rounded-full  px-2 font-normal hover:text-muted cursor-pointer
         "
        >
          <input
            accept=".png,.jpeg,.jpg,image/pngm,image/jpeg,image/jpg"
            type="file"
            name="logo"
            onChange={handleImgChange}
            className="hidden"
          />
          {previewImg ? (
            <p className="space-x-2">
              <FontAwesomeIcon icon={faRepeat} />
              <span>Change Image</span>
            </p>
          ) : (
            <p className="space-x-2">
              <FontAwesomeIcon icon={faPlusSquare} />
              <span>Upload new Photo</span>
            </p>
          )}
        </label>

        {!previewImg && product_images && (
          <>
            <button
              type="button"
              variant="primary"
              onClick={RemoveCurrentUpload}
              className="linked_button bg-danger/50 text-desc 
             hover:text-muted text-danger
             cursor-pointer rounded-full "
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </>
        )}
        {previewImg && (
          <button
            type="button"
            variant="primary"
            onClick={handleUpload}
            className="linked_button text-primary text-desc 
             hover:text-muted bg-primary/30 
             cursor-pointer rounded-full "
          >
            <FontAwesomeIcon icon={faSave} />
            Save Image
          </button>
        )}
      </div>
    </Card>
  );
}

/*
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
          .from("quich/products").getPublicUrl()
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
        .from("quich")
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
*/
