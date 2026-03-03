/*"use client"
import { Loader } from "@/helper/Loading.jsx";
import { useState } from "react";
import { useCreateMerchantMutation } from "@/state/endpoints/store.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx";
import { Input } from "./ui/input.jsx";
import CreateBusinessAccount from "./createBusinessAccount.jsx";
import Whatsapp from "./Whatapp.jsx";
import { toast } from "sonner";
import { Button } from "./ui/button.jsx";
import { useSearchParams } from "react-router-dom";

export default function CreateStoreLink({ refetchUser }) {
  const [step, setStep] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const [store, setStore] = useSearchParams();

  const totalSteps = 3;

  const [formData, setFormData] = useState({
    industry: "",
    businessName: "",
    businessDescription: "",
  });

  const handleChange = (e) => {
    //Inputs
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);

  //  const handleBack = () => setStep((prev) => prev - 1);

  const progressWidth = `${(step / totalSteps) * 100}%`;

  // Mutate User Api for the database
  const [createuserstoreprofile, { isLoading, isSuccess }] =
    useCreateMerchantMutation();

  //Save
  const createprofile = async () => {
    if (!formData?.businessName || formData?.businessName?.length < 3) {
      toast.warning("Error: Business Name error");
      return;
    }

    if (!formData?.industry) {
      toast.warning("Error: Business Category error");
      return;
    }

    if (formData?.businessDescription === "") {
      toast.warning("Error: Business Description error");
      return;
    }

    await createuserstoreprofile({
      bName: formData?.businessName,
      bCategory: formData?.industry,
      bDesc: formData?.businessDescription,
    })
      .unwrap()
      .then((info) => {
        toast.success(info?.message);
        setStore(`store=${info?.link}`);
        handleNext();
      })
      .catch(({ data }) => {
        toast.error(data?.status, {
          description: data?.message,
        });
      });
  };

  return (
    <div className="space-y-3 max-w-md mx-auto mt-12 p-6  rounded-2xl shadow-md">
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-teal-700 transition-all duration-300 ease-in-out"
          style={{ width: progressWidth }}
        ></div>
      </div>

      <form className=" px-5 py-4 space-y-4 ">
        {step === 1 && (
          <>
            <h1 className="text-xl">Create a Merchant profile.</h1>
            <label className="*:block space-y-2 block">
              <span className="text-2xl">Business Name</span>
              <Input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="border-2 border-teal-700 px-3 py-1 rounded w-full "
                placeholder="Enter your business name e.g Joyce Thrifts"
              />
            </label>

            <Select
              onValueChange={(val) =>
                handleChange({
                  target: {
                    name: "industry",
                    value: val,
                  },
                })
              }
            >
              <label>
                <span className="text-2xl">
                  What type of business are you into?
                </span>
              </label>

              <SelectTrigger>
                <SelectValue placeholder="Select business category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fashion/clothing">
                  {" "}
                  Fashion & clothing
                </SelectItem>
                <SelectItem value="Beauty, cosmetics & personal care">
                  {" "}
                  Beauty, cosmetics & personal Care
                </SelectItem>
                <SelectItem value="Supermarket/convinence store">
                  Supermarket/convinence Store
                </SelectItem>
                <SelectItem value="Electronic store">
                  {" "}
                  Electronics & Gadgets
                </SelectItem>
                <SelectItem value="Baby & Kids Items">
                  {" "}
                  Baby & Kids Items
                </SelectItem>
                <SelectItem value="Home Decor"> Home Decor</SelectItem>
                <SelectItem value="Arts and Crafts">Art and Crafts</SelectItem>
              </SelectContent>
            </Select>

            <label className="*:block space-y-2 block">
              <span className="text-2xl ">
                Provide description about your business.
              </span>
              <textarea
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                required
                maxLength={1250}
                className="border-2 min-h-40 border-teal-700 px-3 py-1 rounded w-full "
                placeholder="Enter description."
              ></textarea>
            </label>
            <button
              type="button"
              onClick={createprofile}
              className="block bg-teal-900 text-white px-3 py-1 rounded shadow"
            >
              {isLoading ? <Loader /> : "Save and proceed"}
            </button>
          </>
        )}

        {step === 2 && isSuccess && (
          <>
            <CreateBusinessAccount next={handleNext} />
            <Button
              variant="link"
              type="button"
              onClick={handleNext}
              className="text-gray-600 block"
            >
              I will do this later
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <Whatsapp onboardingComplete={refetchUser} />
            <div className="flex justify-between">
              <Button
                onClick={refetchUser}
                variant="link"
                type="submit"
                className="text-teal-700 px-4 py-2 rounded-lg"
              >
                Skip And Get Started
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
*/

/*
import { useState } from "react";


  return (

      <form onSubmit={handleSubmit}>
   
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Step 2: Your Business
            </h2>
            <label className="block mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-4"
              required
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Step 3: What Do You Do?
            </h2>
            <label className="block mb-2">Business Description</label>
            <textarea
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-4"
              rows={4}
              required
            />
            
          </div>
        )}
      </form>
    </div>
  );
}*/
