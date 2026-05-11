"use client";
//Store Information;
import Card from "@/components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TextAreaInput, TextInput, TimeInput } from "@/components/input";
import { SelectForm } from "@/components/select";
import WhatsappCommunity from "@/components/WhatsappCommunity";
import StoreRegion from "@/components/Region";
import ManageWhatsapp from "@/components/manageWhatsapp";
import StoreDangerZone from "@/components/StoreDangerZone";
import { useFormStateData } from "@/utils/state/FormState";
import { useState } from "react";
import { StoreUpdate } from "@/server/store/UpdateStore";
import { ToasterModalToggle } from "@/utils/state/modal/modalSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import ErrorText from "./errorText";

/*
  store_name,
  description,
  categories,
  store_category,
*/

export default function ManageStore({ store }) {
  const {
    isDirty,
    newData,
    handleInputChanges,
    handleSelectChanges,
    updatedField,
  } = useFormStateData({
    oldStateData: store,
  });

  const [trimmed_slug, setTrimmedSlug] = useState(store?.slug || "");

  //Manage State;
  const [state, setState] = useState({
    loading: null,
    error: null,
  });

  //dispatch notification;
  const dispatch = useDispatch();

  //Update store
  const updateStoreSettings = async () => {
    if (!isDirty) return;

    setState((p) => ({ ...p, loading: true }));

    //Check if the updated Value has an Empty String
    const { error } = await StoreUpdate({
      updates: updatedField,
    });

    if (error) {
      setState((p) => ({ loading: null, error: error?.message }));
      return;
    }

    dispatch(
      ToasterModalToggle({
        type: "success",
        title: "Store updated",
      }),
    );

    setState((p) => ({ loading: null, error: "" }));
  };

  const checkTrimmedInputChanges = (e) => {
    if (e?.target?.value?.includes(" ")) return;
    setTrimmedSlug(e?.target?.value);
    handleInputChanges(e);
  };
  const newData_stringed = JSON.stringify(newData);
  const store_stringed = JSON.stringify(store);

  return (
    <>
      {newData_stringed !== store_stringed && (
        <div
          className="sticky top-0 flex justify-between 
      py-3 rounded-2xl px-4 items-center h-fit z-40
       bg-input w-full"
        >
          <p className="">Unsaved Changes Detect</p>
          <button
            onClick={updateStoreSettings}
            disabled={state?.loading}
            className=" bg-primary py-2  transition
                border px-4 text-desc font-medium rounded cursor-pointer
                "
          >
            {state?.loading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              "Save"
            )}
          </button>{" "}
        </div>
      )}

      <ErrorText>{state?.error}</ErrorText>
      <div className=" space-y-2 w-full">
        <Card className="w-full space-y-5">
          <article>
            <h2 className="text-xl font-semibold">Store Name</h2>
            <p className="text-muted text-desc">
              Change your store name publicy
            </p>
            <div className="mt-4 max-w-full flex gap-x-3 ">
              <input
                onChange={handleInputChanges}
                placeholder="Enter store name"
                maxLength={30}
                data-field_name="name"
                defaultValue={store?.name}
              />{" "}
            </div>
          </article>
          <article>
            <h2 className="text-xl font-semibold">Store Slug</h2>
            <p className="text-muted text-desc">
              Current:{" "}
              <a
                href="https://{store?.slug}.quich.shop"
                target="_blank"
                className="text-primary"
              >
                {store?.slug}.quich.shop/
              </a>
            </p>
            <div className="mt-4 max-w-full flex gap-x-3 ">
              <input
                placeholder="Enter new slug"
                maxLength={15}
                onChange={checkTrimmedInputChanges}
                data-field_name="slug"
                value={trimmed_slug}
              />{" "}
            </div>
          </article>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Business Category</h2>
          <p className="text-muted text-desc">
            Select which category your store fall into
          </p>
          <div className="mt-4 max-w-full flex gap-x-3 ">
            <SelectForm
              title={store?.category || "Select Category"}
              field="category"
              className="grow"
              onChangeValue={handleSelectChanges}
              items={[
                { id: "clothing", name: "Clothes and Apparel" },
                { id: "Others", name: "Others" },
                { id: "fruits", name: "Fruit mart" },
                {
                  id: "retails and supermarket",
                  name: "Retails & Supermarket",
                },
              ]}
            />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Store Description</h2>
          <p className="text-muted text-desc">
            Tell us what is your store about?
          </p>
          <div className="mt-4 max-w-full flex-col gap-x-3 ">
            <textarea
              placeholder="What does your store represent?"
              maxLength={500}
              onChange={handleInputChanges}
              data-field_name="bio"
              defaultValue={store?.bio}
            />
          </div>
        </Card>
      </div>

      <StoreRegion />
      {/* <ManageWhatsapp /> */}
      <WhatsappCommunity />
      <StoreDangerZone />
    </>
  );
}
