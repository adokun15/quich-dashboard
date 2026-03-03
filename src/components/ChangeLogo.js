/*
import { useState } from "react";
import placeImg from "@/asset/user-demo.png";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Loader } from "@/helper/Loading.jsx";
import { useCreateBusinessLogoMutation } from "@/state/endpoints/user.js";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.jsx";

export function EditMerchantLogo({ controlModal, modal, uid, link, imgUrl }) {
  //Img Preview
  const [previewImg, setPreviewImage] = useState("");

  //Img Large Error : > 15mb
  const [imgError, setImageError] = useState("");

  //Current File
  const [imgFile, setImgFile] = useState(null);

  //Upload
  const [uploadProfileLogo, { isLoading: uploading, error }] =
    useCreateBusinessLogoMutation({ fixedCacheKey: "edit-merchant-logo" });

  //Listener for Change
  const handleImgChange = (e) => {
    const imgFile = e.target.files[0];

    const size = (imgFile.size / (1024 * 1024)).toFixed(2);

    setPreviewImage(URL.createObjectURL(imgFile));

    if (size > 15) {
      setImageError("Image is too large. Pick Image less than 15mb");
      return;
    }

    setImgFile(imgFile);
    setImageError("");
  };

  //Trigger for Upload
  const handleUpload = async () => {
    if (!uid || !link) {
      setImageError("Something went wrong. You seem to be logged out already!");
      return;
    }
    await uploadProfileLogo({
      uid,
      file: imgFile,
      link,
    })
      .unwrap()
      .then(controlModal)
      .catch((err) => {
        setImageError(err?.message || "Unable to upload Image!");
      });
  };
 

  return (
    <Dialog open={modal} onOpenChange={controlModal}>
      <DialogContent>
        <form>
          {" "}
          <DialogTitle asChild>
            <h1 className="grow text-3xl font-sans_serif">Upload Logo</h1>
          </DialogTitle>
          <p className="text-[1.2rem] text-center font-roboto">
            Upload your brand logo or your profile image
          </p>
          <p className="text-xs text-center text-red-600">
            {imgError || error?.message || ""}
          </p>
          <div>
            <img
              src={previewImg || imgUrl || placeImg}
              width={120}
              height={120}
              alt="logo"
            />
          </div>
          <div className="*:mr-4 flex flex-wrap  justify-between">
            <label
              type="button"
              className="p-2 cursor-pointer rounded text-teal-800 bg-slate-200"
            >
              <input
                accept=".png,.jpeg,.jpg,image/pngm,image/jpeg,image/jpg"
                type="file"
                name="logo"
                onChange={handleImgChange}
                className="hidden"
              />
              {previewImg ? "Change Logo" : "Upload a new Logo Image"}
              <UploadCloud className="inline mx-1" />
            </label>
            {previewImg && (
              <Button
                type="button"
                onClick={handleUpload}
                className="bg-teal-800 text-slate-200"
              >
                {uploading ? <Loader /> : "Save Logo"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
*/