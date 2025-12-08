"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginEmailAndPassword } from "@/server/firebase_auth";
import ErrorText from "@/components/errorText";

export default function Login() {
  const router = useRouter();
  const email = useRef();
  const password = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginTrigger = async () => {
    const emailString = email.current?.value;
    const passwordString = password.current?.value;

    if (!emailString || !emailString?.includes("@")) {
      setError("Invalid email!");
      return;
    }

    if (!passwordString || passwordString?.length < 6) {
      setError("Password too short!");
      return;
    }

    try {
      setLoading(true);

      await LoginEmailAndPassword({
        email: emailString,
        password: passwordString,
      });

      router.push("/");
    } catch (e) {
      setError(e?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background px-5 py-4 rounded shadow  md:w-7/10 w-[90%] lg:w-[35%]  mx-auto ">
      <h1 className="text-3xl my-5 text-center font-roboto">QuichShop</h1>
      <form className=" px-3 py-2 space-y-4 min-h-[10vh]  ">
        <h1 className="text-2xl text-center">Login to your account</h1>
        {error && <ErrorText>{error} </ErrorText>}

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

        <button
          type="button"
          onClick={loginTrigger}
          className="block bg-teal-700
           hover:bg-teal-900 transition
          text-white w-full font-oswald 
           tracking-wide px-3 py-1 rounded shadow"
        >
          {loading ? "..." : "Submit"}
        </button>
      </form>

      <p className="text-center mt-4 text-blue-500 text-1">
        <Link href="/signup">Don&#39;t have an account? Sign Up now</Link>
      </p>
      <div className="md:mt-3 mx-auto space-y-2 w-fit *:block">
        <p className="text-center mt-4 text-blue-500 text-1">
          <Link href="/forgotpassword">Forgot password?</Link>
        </p>
      </div>
    </main>
  );
}
