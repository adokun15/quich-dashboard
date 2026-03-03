"use client";
//Forgot password Page;

import { useRef } from "react";
//import { useResetPasswordMutation } from "../../state/api";
import Link from "next/link";

export default function ForgotPassWord() {
  const email = useRef();

  //const [trigger] = useResetPasswordMutation();

  const handlePasswordLink = async () => {
    /*   await trigger(email.current.value)
      .unwrap()
      .then((mes) => {
        console.log(mes);
      })
      .catch((e) => {
        console.log(e);
      });
  */
  };
  return (
    <main className="bg-white px-5 py-4 rounded shadow shadow-slate-400 md:w-7/10 w-[90%] lg:w-[35%]  mx-auto ">
      <h1 className="text-3xl md:my-1 text-center tracking-wider font-roboto">
        QuichShop
      </h1>
      <form className=" px-3 py-2 space-y-4 min-h-[10vh]  ">
        <h1 className="tracking-wider text-xl text-center">Forgot Password</h1>
        <p>Enter Your Email to receive password link</p>
        {/*error && <ErrorMessage>{error} </ErrorMessage>*/}

        <label className="*:block  block">
          <span className="text-xl">Email</span>
          <input
            ref={email}
            required
            className="border-2 border-teal-700 px-3 py-1 rounded w-full "
            placeholder="Enter Email Address"
          />
        </label>

        <button
          type="button"
          onClick={handlePasswordLink}
          className="block bg-teal-700 hover:bg-teal-900 transition text-white w-full font-oswald tracking-wide px-3 py-1 rounded shadow"
        >
          Submit
        </button>
      </form>
      <div className=" *:px-1 mt-5 flex justify-center ">
        <div className="space-x-2 mx-1">
          <Link href="/login" className="underline">
            Login
          </Link>{" "}
        </div>
        or
        <div className="mx-2 block">
          <Link href="/signup" className="underline">
            Create an Account
          </Link>{" "}
        </div>
      </div>
    </main>
  );
}

//Verify Emaill!!

/**
 import { MailOpen } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEmailVerifiedQuery } from "@/state/endpoints/user.js";

import Button from "@/components/Button.jsx";
import { Loader } from "@/helper/Loading.jsx";
export default function EmailVerificationComponent() {
  const router = useNavigate();
  const [params] = useSearchParams();

  const emailParam = params.get("email");

  const {
    data: verifyMessage,
    isError,
    isFetching,
    refetch,
    isLoading,
    error,
  } = useEmailVerifiedQuery(emailParam, { skip: !emailParam });

  console.log(verifyMessage);
  console.log(error);

  const GoToLogin = () => {
    router("/auth/login");
  };

  return (
    <div className="bg-white px-5 py-4 rounded shadow shadow-slate-400 md:w-7/10 w-[90%] lg:w-[35%]  mx-auto ">
      {emailParam && (isLoading || isFetching) && !isError && (
        <div>
          <Loader />
          <p>Verifying Email...</p>
        </div>
      )}

      {emailParam && isError && !isLoading && !isFetching && (
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold font-sans_serif">
            Email Verification
          </h1>
          <h1 className="text-2xl  font-sans_serif">
            Could not complete Request
          </h1>
          <p>Possible Reason: {error?.data?.message || "Network issue!"}</p>
          <Button clxName="bg-teal-700 text-white" onClick={refetch}>
            Reload Page
          </Button>
          <p className="text-xs md:text-xl underline" onClick={GoToLogin}>
            Try Login Again
          </p>
        </div>
      )}

      {emailParam && !isLoading && !isError && !isFetching && (
        <div className="space-y-4">
          <div className="">
            <MailOpen className="text-teal-600" width={40} height={40} />
            <h1 className="text-4xl ">Email Verification Success</h1>
          </div>

          <p>{verifyMessage?.message}</p>

          <Button
            clxName="bg-teal-800 text-white font-roboto"
            onClick={GoToLogin}
          >
            Login
          </Button>
        </div>
      )}

      {!emailParam && !isLoading && !isFetching && !isError && (
        <>
          <div className="flex gap-3 items-center">
            <h1 className="text-4xl ">Email Verification</h1>
            <MailOpen className="text-teal-600" width={40} height={40} />
          </div>
          <p>
            An email Verification <strong>link</strong> has been sent to your
            email.
          </p>
          <Button clxName="bg-teal-800 text-white font-roboto">
            Check Mail
          </Button>
        </>
      )}
    </div>
  );
}

 */