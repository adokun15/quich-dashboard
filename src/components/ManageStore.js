//Store Information;
import Card from "@/components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { TextAreaInput, TextInput, TimeInput } from "@/components/input";
import { EditableAvatar } from "@/components/Avatar";
import { Select } from "@/components/select";

export default function ManageStore() {
  const redirectToShop = () => {};

  const updateStoreSettings = () => {};

  return (
    <Card className="px-0 space-y-6">
      <div className="flex mb-4 items-center  py-1 justify-between">
        <p className="font-medium text-4">Hello, James</p>
        <button className="">
          <FontAwesomeIcon className="" icon={faArrowAltCircleUp} />
          View Store
        </button>
      </div>

      <div className="px-4 flex w-full gap-4 ">
        <EditableAvatar />
        <div className="w-full space-y-4">
          <div className="flex gap-x-2 gap-y-4 flex-wrap">
            <label>
              Store Name
              <TextInput
                placeholder="The store name"
                defaultValue={"The store name"}
              />
            </label>

            <label>
              Business Type
              <Select />
            </label>
          </div>

          <label>Description</label>
          <TextAreaInput placeholder="Store Description: Talk about your business, where you are located or maybe where you deliver" />
        </div>
      </div>

      <button className="px-6 mx-auto block">Save</button>
    </Card>
  );
}
