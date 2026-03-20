//Store Information;
import Card from "@/components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { TextAreaInput, TextInput, TimeInput } from "@/components/input";
//import { EditableAvatar } from "@/components/Avatar";
import { Select } from "@/components/select";

export default function StoreDangerZone() {
  //const redirectToShop = () => {};
  //const updateStoreSettings = () => {};

  return (
    <div className=" space-y-2 w-full">
      <h2 className="text-xl font-semibold">Danger Zone</h2>
      <Card className="w-full">
        <h2 className="text-xl font-semibold">Disable Store </h2>
        <p className="text-muted text-desc">
          Visitors will be redirected to your WhatsApp
        </p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <button className="grow border-border bg-primary py-1 rounded px-2 text-white">
            Save
          </button>
        </div>
      </Card>

      {/*
      <Card>
        <h2 className="text-xl font-semibold">Delete Store</h2>
        <p className="text-muted text-desc">After De</p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <button className=" border-border bg-primary py-1 rounded px-2 text-white">
            Delete
          </button>
        </div>
      </Card>
 */}
    </div>
  );
}
