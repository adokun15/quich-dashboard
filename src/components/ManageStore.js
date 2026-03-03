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

/**Edit store!!*/
/*
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Loader } from "@/helper/Loading.jsx";
import { useUpdateMerchantMutation } from "@/state/endpoints/store.js";
import Input from "@/components/Input.jsx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.jsx";

export function EditMerchantProfile({ controlModal, modal, prevData, link }) {
  // const token = localStorage.getItem("token");

  //  const { user } = useVerifyUserQuery({ token });

  //Inputs
  const bname = useRef();
  const bdescription = useRef();
  const bCategory = useRef();
  const bStatus = useRef();

  const [error, setError] = useState("");
  //Edit Profile
  const [editProfile, { isLoading }] = useUpdateMerchantMutation({
    fixedCacheKey: "edit-merchant-profile",
  });

  //Add product to Db
  const triggerEditProfile = async () => {
    let updateMerchantField = {};

    if (bname.current.value !== "") {
      updateMerchantField.businessName = bname.current.value;
    }

    if (bdescription.current.value !== "") {
      updateMerchantField.description = bdescription.current.value;
    }

    if (bStatus.current.current !== "") {
      updateMerchantField.status = bStatus.current.value;
    }

    if (bCategory.current.value !== "") {
      updateMerchantField.category = bCategory.current.value;
    }

    if (!updateMerchantField || !link) return;

    await editProfile({
      link,
      data: { ...updateMerchantField },
    })
      .unwrap()
      .then(controlModal)
      .catch((e) => {
        setError(e?.message);
      });
  };

  return (
    <Dialog open={modal} onOpenChange={controlModal}>
      <DialogContent>
        <DialogTitle>
          <h2 className="font-sans_serif text-center text-3xl">
            Edit Your Profile
          </h2>
        </DialogTitle>
        <p className="text-xs my-2">
          Leave out space that does not need an update{" "}
        </p>
        {error && (
          <p
            className="text-red font-oswald text-start text-[16px] text-red-600 px-4 py-[1px] shadow font-bold bg-red-300 border-2 border-red-500 border-solid
      my-3 rounded-xl"
          >
            {error}
          </p>
        )}
        <form className="w-full px-2 py-2 space-y-6">
          <label className="space-y-2 block">
            <span>Business Name</span>
            <Input
              required
              clx="w-full font-roboto text-xl"
              placeholder={prevData?.businessName}
              ref={bname}
            />
          </label>

          <label className="space-y-2 block">
            <span>Business Category</span>
            <Input
              required
              clx="w-full font-roboto text-xl"
              placeholder={prevData?.category}
              ref={bCategory}
            />
          </label>

          <label className="space-y-2 block">
            <span>Business Status</span>
            <Input
              required
              clx="w-full font-roboto text-xl"
              placeholder={prevData?.status}
              ref={bStatus}
            />
          </label>
          <label className="space-y-2 block">
            <span className="block">Description</span>
            <textarea
              className=" border-2 w-full px-3 py-2 block resize-none min-h-[10rem] outline-none rounded focus:shadow"
              placeholder={prevData?.description || ""}
              ref={bdescription}
            ></textarea>
          </label>

          <div className="my-4 flex gap-4 flex-wrap">
            <Button
              variant="ghost"
              onClick={controlModal}
              type="button"
              className="bg-slate-300 text-teal-700"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={triggerEditProfile}
              className="bg-teal-800 text-white"
            >
              {isLoading ? <Loader /> : "Edit Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
*/

/*
import Card from "@/components/Card.jsx";
import { Button } from "@/components/ui/button.jsx";
import Logo from "@/asset/user-demo.png";

import { EditMerchantProfile } from "@/pages/prompts/edit-merchant-profile.jsx";
import { EditMerchantLogo } from "@/pages/prompts/edit-merchant-logo.jsx";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.jsx";
import { useGetMerchantQuery } from "@/state/endpoints/store.js";
import { useVerifyUserQuery } from "@/state/endpoints/user.js";
import { useState } from "react";
import { Loader } from "@/helper/Loading.jsx";
import StorePublish from "@/components/StorePublish.jsx";
import StoreApperanceSettings from "@/components/StoreAppearanceSettings.jsx";
import SuccessMessageSettings from "@/components/SuccessMessageSettings.jsx";
import ShippingSettings from "@/components/ShippingSettings.jsx";
import { Pen } from "lucide-react";

export default function DashboardStore() {
  //Modals for merchant edits
  const [merchantProfileOpened, setToggle] = useState();
  const [DashboardModal, toggleModal] = useState(false);
  const toggleModalProfile = () => {
    //dispatch(ModalAction.toggleDashBoardModal());
    toggleModal((s) => !s);
    setToggle(true);
  };
  const toggleModalLogo = () => {
    //dispatch(ModalAction.toggleDashBoardModal());
    toggleModal((s) => !s);
    setToggle(false);
  };

  //Token
  const token = localStorage.getItem("token");

  //Active Logged In User
  const {
    data: user,
    isError,
    error,
    isFetching,
    isLoading,
  } = useVerifyUserQuery({ token });

  //Merchant Data
  const {
    merchantData,
    merchantLoading,
    merchantFetching,
    merchantError,
    isMerchantError,
  } = useGetMerchantQuery(`${user?.link}_${user?.userId}`, {
    skip: !user?.link,
    selectFromResult: (res) => {
      return {
        merchantLoading: res?.isLoading,
        merchantFetching: res?.isFetching,
        merchantError: res.error,
        isMerchantError: res.isError,
        merchantData: res?.data,
      };
    },
  });

  if (isLoading || isFetching) {
    return "Loading";
  }

  if (isError) {
    console.log(error);
    return null;
  }

  return (
    <>
      <EditMerchantProfile
        link={user?.link}
        prevData={merchantData}
        modal={DashboardModal && merchantProfileOpened}
        controlModal={toggleModalProfile}
      />
      <EditMerchantLogo
        imgUrl={merchantData?.logo}
        link={user?.link}
        uid={merchantData?.userId}
        modal={DashboardModal && !merchantProfileOpened}
        controlModal={toggleModalLogo}
      />
      <h1 className="text-2xl">Manage Store </h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Manage profile</TabsTrigger>
          <TabsTrigger value="shipping">Shipping options</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          {isMerchantError && (
            <Card className="space-y-4">
              <p>{merchantError?.message}</p>
            </Card>
          )}

          {(merchantLoading || merchantFetching) && <Loader />}

          {!isMerchantError && !merchantLoading && !merchantFetching && (
            <Card className="space-y-3 space-x-4">
              <div className="w-36 my-4 h-36 rounded-full overflow-hidden">
                <img
                  src={merchantData?.logo || Logo}
                  alt="Logo"
                  className="aspect-square bg-cover"
                />
              </div>
              <button onClick={toggleModalLogo} className="underline">
                Change Logo
              </button>

              <div className="md:grid md:grid-cols-2 p-4 md:w-3/5 my-4 md:space-y-0 gap-2 space-y-3">
                <article>
                  <h3 className="fira-sans-semibold">Business Name</h3>
                  <p>{merchantData?.businessName}</p>
                </article>
                <article>
                  <h3 className="fira-sans-semibold">Category</h3>
                  <p>{merchantData?.category}</p>
                </article>
                {/*   <article>
                <h3 className="fira-sans-semibold">Kyc Status</h3>
                <p>{merchantData?.status}</p>
              </article>
           */}
                <article>
                  <h3 className="fira-sans-semibold">Store Description</h3>
                  <p>~ {merchantData?.description}</p>
                </article>
              </div>

              <Button
                variant="link"
                onClick={toggleModalProfile}
                className="text-teal-700"
              >
                <span>
                  <Pen />
                </span>
                Edit Profile
              </Button>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="customize">
          <StorePublish link={user?.link} />
          <StoreApperanceSettings link={user?.link} />
          <SuccessMessageSettings link={user?.link} />
        </TabsContent>
        <TabsContent value="shipping">
          <ShippingSettings link={user?.link} />
        </TabsContent>
        {/*
      <Card>
        <h1>Notification </h1>
        <ul>
          <li>
            <span>Receive Order Update via WhatsApp</span>
            <Switch></Switch>
          </li>
          <li>
            <p></p>
            <span>Receive notification for payout</span>
            <Switch></Switch>
          </li>
        </ul>
      </Card>
   //}
      </Tabs>
    </>
  );
}

*/