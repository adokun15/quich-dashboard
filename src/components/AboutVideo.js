"use client";
import { useState, useRef } from "react";
export default function FilePreviewer() {
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const filePicekerRef = useRef(null);

  function previewFile(e) {
    // Reading New File (open file Picker Box)
    const reader = new FileReader();
    // Gettting Selected File (user can select multiple but we are choosing only one)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      } else if (selectedFile.type.includes("video")) {
        setVideoPreview(readerEvent.target.result);
      }
    };
  }
  
  function clearFiles() {
    setImagePreview(null);
    setVideoPreview(null);
  }

  return (
    <div>
      <h1>Preview Image/Video</h1>
      <div className="btn-container">
        <input
          ref={filePicekerRef}
          accept="image/*, video/*"
          onChange={previewFile}
          type="file"
          hidden
        />
        <button className="btn" onClick={() => filePicekerRef.current.click()}>
          Choose
        </button>
        <button className="btn">x</button>
      </div>
      <div className="preview">
        {videoPreview != null && <video controls src={videoPreview}></video>}
      </div>
    </div>
  );
}
/*"use client";

import {
  AddProductImage,
  DeleteProductImage,
} from "@/server/product/ProductImage";
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

export default function StoreIntroVideo({ store_id, videoUrl = null }) {
  const [previewVideo, setPreviewVideo] = useState("");

  //Img Large Error : > 10mb || longer than a minutes
  const [videoError, setVideoError] = useState("");

  //Current File
  const [file, setVideoFile] = useState(null);

  const [store_video, setStoreVideo] = useState(videoUrl);

  //Listener for Change and lowkey compress image here
  const handleVideoChange = async (e) => {
    const videoFile = e.target.files[0];

    if (!videoFile) return;

    // basic validation
    if (!videoFile.type.startsWith("video/")) {
      setVideoError("Please upload a valid video file");
      return;
    }

    const size = videoFile.size / (1024 * 1024);

    if (size > 100) {
      setVideoError("Video must be less than 50MB");
      return;
    }

    setVideoFile(videoFile);
    setPreviewVideo(URL.createObjectURL(videoFile));
    setVideoError("");
  };

  //Trigger for Upload
  const handleUpload = async () => {
    if (videoError) return;

    if (file) {
      const filepath = `store/${store_id}/intro/${file.name}`;
      const upload = await AddProductImage({ file, filepath, product_id });

      if (upload?.error) {
        setVideoError(upload?.error);
        return;
      }

      setPreviewVideo("");

      //Product Modal: Alert first

      console.log(upload);

      setStoreVideo([upload?.url]);
    }
  };

  const RemoveCurrentUpload = async () => {
    if (!window.confirm("Are you sure you want to remove this video?")) return;

    if (videoUrl) {
      const upload = await DeleteProductImage({ filepath: videoUrl });

      if (upload?.error) {
        setVideoError(upload?.error);
        return;
      }

      //Product Modal: Alert first
      console.log(upload);

      setStoreVideo(null);
    }
  };

  return (
    <Card className="font-poppins px-5 py-4  space-y-4  overflow-y-auto md:h-fit block  md:mx-auto md:mt-[2vh] ">
      <p className="text-desc text-red-600">{videoError}</p>
      <div className="rounded">
        {(previewVideo || store_video) && (
          <div className="w-[190px] h-[210px] rounded-2xl ">
            <video className="w-full h-full object-cover" controls>
              <source src={previewVideo || store_video} type="video/mp4" />
            </video>
          </div>
        )}

        {!previewVideo && !store_video && (
          <>
            <div className="space-y-4 *:mx-auto border-b  py-6">
              <div className="w-fit mx-auto">
                <Image
                  className="w-full"
                  width={300}
                  height={300}
                  alt="Video logo"
                  src="/illustrations/undraw_video-files_cxl9.svg"
                />
              </div>

              <div className="text-center text-muted text-xs">
                <p>
                  Add a short 30 - 60 seconds video to your store profile,
                  showcase how your product work to your customer
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="*:mr-4 flex flex-wrap items-center gap-5">
 
        <label
          type="button"
          className="
          text-text bg-input text-desc py-1 rounded-full  px-2 font-normal hover:text-muted cursor-pointer
         "
        >
          <input
            accept="video/*"
            type="file"
            onChange={handleVideoChange}
            className="hidden"
          />
          {previewVideo ? (
            <p className="space-x-2">
              <FontAwesomeIcon icon={faRepeat} />
              <span>Change Video</span>
            </p>
          ) : (
            <p className="space-x-2">
              <FontAwesomeIcon icon={faPlusSquare} />
              <span>Upload video</span>
            </p>
          )}
        </label>

        {!previewVideo && store_video && (
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
        {previewVideo && (
          <button
            type="button"
            variant="primary"
            onClick={handleUpload}
            className="linked_button text-primary text-desc 
             hover:text-muted bg-primary/30 
             cursor-pointer rounded-full "
          >
            <FontAwesomeIcon icon={faSave} />
            Save Video
          </button>
        )}
      </div>
    </Card>
  );
}
*/
