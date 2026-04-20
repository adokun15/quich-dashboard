//Store Information;
import Card from "@/components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { TextAreaInput, TextInput, TimeInput } from "@/components/input";
import { SelectForm } from "@/components/select";
import WhatsappCommunity from "@/components/WhatsappCommunity";
import StoreRegion from "@/components/Region";
import ManageWhatsapp from "@/components/manageWhatsapp";
import StoreDangerZone from "@/components/StoreDangerZone";

//-->
export default function ManageStore({
  store_name,
  description,
  categories,
  store_category,
}) {
  //const redirectToShop = () => {};
  //const updateStoreSettings = () => {};

  return (
    <>
      {/*<div
        className="sticky top-0 flex justify-between 
      py-3 rounded-2xl px-4 items-center h-fit z-40
       bg-input w-full"
      >
        <p className="">Unsaved Changes Detect</p>
        <button
          className=" bg-primary py-2  transition
                border px-4 text-desc font-medium rounded cursor-pointer
                "
        >
          Save
        </button>{" "}
      </div>*/}

      <div className=" space-y-2 w-full">
        <Card className="w-full">
          <h2 className="text-xl font-semibold">Store Name</h2>
          <p className="text-muted text-desc">Change your store name publicy</p>
          <div className="mt-4 max-w-full flex gap-x-3 ">
            <input className="px-2 w-full" placeholder="The Store Name" />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Business Category</h2>
          <p className="text-muted text-desc">
            Select which category your store fall into
          </p>
          <div className="mt-4 max-w-full flex gap-x-3 ">
            <SelectForm
              title="Retails Store"
              className="grow"
              items={[{ id: "clothing and apparel", name: "Retail Store" }]}
            />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Store Description</h2>
          <p className="text-muted text-desc">
            Tell us what is your store about?
          </p>
          <div className="mt-4 max-w-full flex-col gap-x-3 ">
            <textarea className="" placeholder="The Store Name" />
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
