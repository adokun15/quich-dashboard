"use client";

//import { ErrorMessage } from "../../helper/ErrorMessage.js";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignupEmailAndPassword } from "@/server/firebase_auth";
import ErrorText from "@/components/errorText";
//import { useSignUpMutation } from "../../state/api";
//import { Loader } from "../../helper/Loading.js";

export default function SignUp() {
  const router = useRouter();
  const email = useRef();
  const password = useRef();

  //const username = useRef();
  //Auth Signup Error;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //linking result to verifyEmail-->
  //const [trigger, { isLoading }] = useSignUpMutation({
  //  fixedCacheKey: "user-object-linked",
  //});

  const signUptrigger = async () => {
    /*
    if (!username?.current?.value || username?.current?.value?.length <= 2) {
      setError("Invalid Name!");
      return;
    }
    
    if (!username.current.value) {
       setError("Invalid Input for Name Space");
       return;
    }
    if (username.current.value?.length < 3) {
        setError("Name too short!");
        return;
    }
    
    */

    //Run Regex for email and password!
    if (password.current?.value < 6) {
      setError("Password too short!");
      return;
    }

    try {
      setLoading(true);
      await SignupEmailAndPassword({
        email: email.current?.value,
        password: password.current?.value,
        // name: username.current.value,
      });

      //LocalStorage / cookie
      // localStorage.setItem("token", info);

      //redirect to Onboard
      router.push("/");
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className="bg-background md:px-5 px-2 py-4 rounded shadow shadow-slate-400 md:w-7/10 w-[90%] lg:w-[35%]  mx-auto ">
      <h1 className="text-3xl md:my-1 text-center tracking-wider font-roboto">
        QuichShop
      </h1>

      <form className=" px-3 py-2 space-y-4 min-h-[10vh]  ">
        <h1 className="text-2xl text-center">Create an account today</h1>

        {error && <ErrorText>{error} </ErrorText>}

        {/*<label className="*:block  block">
          <span className="text-xl">Name</span>
          <input
            ref={username}
            required
            className="border-2 ring-1 ring-offset-1 hover:shadow-teal-100 focus:outline-none focus:ring-offset-2 transition duration-200 ring-teal-800 border-teal-600 px-3 py-1 rounded w-full "
            placeholder="Enter a name eg John, Daniel"
          />
        </label>
        */}

        <label className="*:block  block">
          <span className="text-xl">Email</span>
          <input
            ref={email}
            required
            className="border-2 ring-1 ring-offset-1 hover:shadow-teal-100 focus:outline-none focus:ring-offset-2 transition duration-200 ring-teal-800 border-teal-600 px-3 py-1 rounded w-full "
            placeholder="Enter Email Address"
          />
        </label>

        <label className="*:block  block">
          <span className="text-xl">Password</span>
          <input
            ref={password}
            className="border-2 ring-1 ring-offset-1 hover:shadow-teal-100 focus:outline-none focus:ring-offset-2 transition duration-200 ring-teal-800 border-teal-600 px-3 py-1 rounded w-full "
            placeholder="Enter password"
            type="password"
          />
        </label>
        {/*
        <div className=" *:px-1 mt-5">
          <div className="space-x-2">
            <input type="checkbox" />
            <span>
              I accept the{" "}
              <Link href="/tos" className="underline">
                Term of Service
              </Link>{" "}
              of Spacebiz.
            </span>
          </div>
          <div className="space-x-2">
            <input type="checkbox" />
            <span>
              I have read the
              <Link href="/privacy" className="underline">
                Privacy and Policy
              </Link>{" "}
              of Spacebiz
            </span>
          </div>
        </div>
        */}

        <button
          type="button"
          onClick={signUptrigger}
          className="block bg-teal-700 hover:bg-teal-900 transition text-white
           w-full font-oswald tracking-wide px-3 py-1 rounded shadow"
        >
          {loading ? "..." : "Submit"}
        </button>
      </form>

      <p className="text-center mt-2 text-blue-500 text-xs ">
        <Link href="/login">Login Here</Link>
      </p>
    </main>
  );
}
