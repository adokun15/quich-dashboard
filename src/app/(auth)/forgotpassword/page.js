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
