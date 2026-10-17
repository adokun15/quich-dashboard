"use client";
import { createClientFromSupabase } from "@/lib/supabase/client";
import { useState, useRef } from "react";
//import { createClient } from "@supabase/supabase-js";

const MAX_BYTES = 100 * 1024 * 1024;
const MIN_SECS = 15;
const MAX_SECS = 60;

export default function VideoUpload({ storeId }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const inputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFile = (f) => {
    setError("");
    setDone(false);
    setProgress(0);

    if (!f?.type.startsWith("video/")) {
      setError("Please select a video file.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError(`Max size is 4 MB. Your file is ${formatSize(f.size)}.`);
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setDuration(null);
  };

  const onMetaLoaded = () => {
    const secs = videoRef.current?.duration;
    setDuration(secs);
    if (secs < MIN_SECS) {
      setError(
        `Video is too short (${Math.round(secs)}s). Minimum is ${MIN_SECS}s.`,
      );
      setFile(null);
    } else if (secs > MAX_SECS) {
      setError(
        `Video is too long (${Math.round(secs)}s). Maximum is ${MAX_SECS}s.`,
      );
      setFile(null);
    }
  };

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    const ext = file.name.split(".").pop();
    const path = `stores/${storeId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await createClientFromSupabase()
      .storage.from("store-videos")
      .upload(path, file, {
        contentType: file.type,
        upsert: true,
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });

    setUploading(false);

    if (uploadError) {
      setError("Upload failed. Please try again.");
    } else {
      setDone(true);
    }
  };

  const clear = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setDuration(null);
    setError("");
    setDone(false);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-sm">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {!preview ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full border border-dashed border-gray-300 rounded-xl py-10
                     text-sm text-gray-400 hover:border-gray-400 hover:text-gray-500
                     transition-colors bg-gray-50"
        >
          Tap to select your store video
          <span className="block text-xs mt-1 text-gray-300">
            15 – 30 seconds · max 4 MB
          </span>
        </button>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <video
            ref={videoRef}
            src={preview}
            controls
            playsInline
            className="w-full bg-black"
            onLoadedMetadata={onMetaLoaded}
          />

          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="text-xs text-gray-400 space-y-0.5">
              <p className="text-gray-700 font-medium truncate max-w-[160px]">
                {file?.name}
              </p>
              <p>
                {duration ? `${Math.round(duration)}s` : "…"} ·{" "}
                {formatSize(file?.size)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clear}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Remove
              </button>
              <button
                onClick={upload}
                disabled={uploading || done || !!error}
                className="px-4 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium
                           disabled:opacity-40 hover:bg-gray-700 transition-colors"
              >
                {done ? "Uploaded ✓" : uploading ? `${progress}%` : "Upload"}
              </button>
            </div>
          </div>

          {uploading && (
            <div className="h-0.5 bg-gray-100">
              <div
                className="h-full bg-gray-900 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
