"use client";

import Card from "@/components/card";
import { SelectForm } from "@/components/select";
import { UpdateMerchantSettings } from "@/server/merchant/UpdateMerchantAccount";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ManageSettings() {
  const ref = useRef();
  const [hasChanged, setChanges] = useState(null);
  const [timer, setTimer] = useState(0);


  const [] = useState({
    error: null,
    loading: null,
  })
  const AutoSaveRadioSettings = (e) => {
    //Check RADIO TYPE;
    const value = "adasda";

    //add to execution list:
    setChanges((p) => ({ ...p, key: "new_value" }));

    //Set timer @ 5secs
    setTimer(5);
  };

  //Action to update all
  const saveChangesAtOnce = useCallback(async() => {
     try{
       const res = await UpdateMerchantSettings({
        updates: hasChanged, 
       })

       if(res?.error){

       }

       //Success: alert user
      }catch(e){

     }
  }, []);

  //Auto-Save
  useEffect(() => {
    //Call the function once, only if there is a change input, execute in 5 seconds;
   setTimeout(()=>{


    //Set tImer to 0
   }, timer)
  }, []);
  return (
    <>
      <main className="max-w-3xl  space-y-6 py-1 pb-4 mx-auto min-h-screen dark:bg-black">
        <Card className=" space-y-4">
          <h2 className="text-xl mb-4 font-medium ">
            Notification & Community
          </h2>
          <div className="space-y-2">
            <p>
              Receive promotional message, We send tips few times and we do not
              spam!
            </p>

            <section className="flex flex-col gap-x-2 gap-y-1">
              <div className="space-x-1 flex-row flex">
                <input
                  ref={ref}
                  onClick={AutoSaveRadioSettings}
                  className="w-fit peer"
                  type="checkbox"
                />
                <span className="text-muted peer-checked:text-text">Email</span>
              </div>

              <div className="space-x-1 flex-row flex">
                <input className="w-fit peer" type="checkbox" />
                <span className="text-muted peer-checked:text-text">
                  WhatsApp
                </span>
              </div>
            </section>
          </div>

          <div className="space-y-2">
            <p>Manage store notification.</p>
            <section className="flex flex-col gap-y-1 gap-2">
              <div className="space-x-1  flex-row flex">
                <input className="w-fit peer" type="checkbox" />
                <span className="text-muted peer-checked:text-text">
                  Out Of Stock
                </span>
              </div>

              <div className="space-x-1 flex-row flex">
                <input className="w-fit peer" type="checkbox" />
                <span className="text-muted peer-checked:text-text">
                  New Order
                </span>
              </div>
            </section>
          </div>

          <div className="flex justify-between flex-wrap">
            <p>
              Checkout our Whatsapp channel to keep in touch and get updates
            </p>
            <Link
              href="/whatsapp-channel-link"
              className="text-primary underline"
            >
              Join us
            </Link>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-xl mb-4 font-medium">Account</h2>

          <article className="">
            <p className="text-base">Change Email</p>
            <div className="flex flex-wrap gap-y-4 justify-between">
              <input
                className="bg-input transiton peer w-full rounded px-4 py-2"
                placeholder="Enter New Email Address"
              />
              <button
                className="bg-primary py-2 hover:visible focus-within:visible duration-700 ease-in peer-focus-visible:visible invisible transition
                border px-4 text-desc font-medium rounded cursor-pointer"
              >
                Send Otp
              </button>
            </div>
          </article>

          <article className="">
            <p className="text-base">Phone</p>
            <div className="flex flex-wrap gap-y-4 justify-between">
              <input
                className="bg-input transiton peer w-full rounded px-4 py-2"
                defaultValue={2348129504035}
                disabled={true}
              />
            </div>
          </article>
          {/*Allow store be display in certain region*/}
        </Card>

        <Card>
          <h2 className="text-xl mb-4 font-medium">Theme</h2>
          <SelectForm
            title="System"
            items={[
              {
                name: "System",
                value: "system",
              },
              {
                name: "Light",
                value: "light",
              },
              {
                name: "Dark",
                value: "dark",
              },
            ]}
          />
        </Card>

        <Card>
          <p>Delete Account Permanently</p>
          <button
            className="bg-danger/50 text-danger 
          border-0 w-fit rounded cursor-pointer  px-8"
          >
            Delete
          </button>
        </Card>

        <div className="**:block md:flex md:justify-between text-primary text-xl space-y-2">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms and Conditions</Link>
          <Link href="#">About us</Link>
        </div>
      </main>
    </>
  );
}
