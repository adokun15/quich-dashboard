"use client";
//import InputPhone from "../helper/InputPhone";
/*import {
  useGetMerchantQuery,
  useSendWhatsAppCodeMutation,
  useVerifyWhatsAppCodeQuery,
  } from "../state/endpoints/store";
  import Button from "./Button";
import Input from "./Input";
import { Loader } from "../helper/Loading";
import { ErrorMessage } from "../helper/ErrorMessage";
import { Sheet, SheetContent } from "./ui/sheet";
*/
import { useEffect, useState } from "react";
import Card from "./card";
import ErrorText from "./errorText";
//import { useSearchParams } from "next/navigation";

export default function ManageWhatsapp({ store_url }) {
  //const store = useSearchParams();

  //const link = store.get("store") || store_url || null;
  const link = store_url || null;

  //const [sheetOpen, triggerSheet] = useState(false);

  //Collect whatapp number
  const [bphone, setPhoneNumber] = useState("");
  const [vCode, setVcode] = useState("");

  //run verification
  const verifyCode = !(
    vCode &&
    typeof vCode === "number" &&
    String(vCode).length === 6
  );

  const merchant = null;
  const whatappRequestError = null;
  const whatappRespond = null;
  const error = null;
  const isLoading = null;
  const whatappRespondLoading = null;
  const whatappRespondError = null;
  const requestingCode = null;

  //Merchant Phone: Get
  // const {
  //  data: merchant,
  //  isLoading,
  // error,
  //} = useGetMerchantQuery(link, {
  ///  skip: link,
  // });

  //Send Code: Post
  // const [sendCode, { error: whatappRequestError, isLoading: requestingCode }] =
  //  useSendWhatsAppCodeMutation();

  //Verify Code: Post
  /* const {
    data: whatappRespond,
    isLoading: whatappRespondLoading,
    error: whatappRespondError,
  } = useVerifyWhatsAppCodeQuery(
    { code: vCode, link },
    {
      skip: verifyCode,
    }
  );
*/

  //A useEffect: automatically close modal if successful
  useEffect(() => {
    if (whatappRespond) {
      //Alert Use
      triggerSheet(false);

      // if (onboardingComplete) {
      // onboardingComplete();
      // }
    }
  }, []);

  const triggerPhoneNumber = (e) => {
    const phone = +e.target.value;
    if (typeof phone !== "number" || isNaN(phone)) return;
    setPhoneNumber(phone);
  };

  const triggerRequestCode = async () => {
    if (bphone === "" || !bphone) return;

    alert("Sent");
    //  await sendCode({ link, phone: bphone })
    //  .unwrap()
    // .then((d) => {
    //  triggerSheet(true);
    //  console.log(d);
    // })
    // .catch((e) => console.log(e));
  };

  return (
    <Card>
      {/*  Merchant : phone*/}
      {error && !isLoading && <p>Something Went Wrong</p>}

      {isLoading && !error && "..."}

      {!error && !isLoading && (
        <div>
          {merchant?.phone && (
            <p>
              Your number for order notifications and announcement is:{" "}
              <b>+234{merchant?.phone}</b>
            </p>
          )}

          <div>
            <form className="space-y-3 px-5 py-4 rounded shadow  md:w-7/10 w-[90%] lg:w-[35%]  mx-auto ">
              <h1 className="text-xl font-bold font-sans_serif">
                WhatsApp Verification Process
              </h1>

              <p>Enter the six-digit verification code sent to your Whatsapp</p>

              <div className="my-24">{whatappRespondLoading && "..."}</div>

              <input
                value={vCode}
                onChange={(e) => {
                  const code = +e.target.value;
                  if (typeof code !== "number" || isNaN(code)) return;
                  setVcode(code);
                }}
                maxLength={6}
                className="rounded p-2"
                placeholder="******"
              />
              {whatappRespondError?.data?.message && (
                <p className="text-red-700">
                  {whatappRespondError?.data?.message}
                </p>
              )}
              {/* If there Is an eRROR the user should be offered a button to close and try again*/}
            </form>
          </div>

          {!merchant?.phone && !isLoading && (
            <>
              {whatappRequestError?.data?.message && (
                <ErrorText>{whatappRequestError?.data?.message}</ErrorText>
              )}

              <form className="space-y-5">
                <h3 className="text-2xl font-bold font-sans_serif">
                  Enter WhatsApp Phone Number
                </h3>
                <p className="font-roboto">
                  A verification code will be sent to you
                </p>
                <label className="space-y-2 my-6 block">
                  Phone Number
                  <input
                    value={bphone}
                    required
                    placeholder="Active Phone Number"
                    onChange={/*triggerPhoneNumber*/ () => {}}
                  />
                </label>
                <button
                  onClick={/*triggerRequestCode*/ () => {}}
                  type="button"
                  className="bg-teal-800 my-3 text-white"
                >
                  {requestingCode ? "..." : "Send Verification Code"}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </Card>
  );
}
