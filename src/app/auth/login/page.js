"use client";

import Card from "@/components/card";
import ErrorText from "@/components/errorText";
import { createClientFromSupabase } from "@/lib/supabase/client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const supabase = createClientFromSupabase();

export default function LoginAuth() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    //  success: null,
    loading: null,
    error: null,
  });

  const router = useRouter();
  const SignInWithEmail = async () => {
    if (!email || !email?.includes("@")) return;

    //Show Loading State
    setStatus((p) => ({
      ...p,
      loading: true,
    }));

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${process.env.NODE_ENV === "production" ? "https" : "http"}://auth.${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/callback`,
      },
    });

    console.log(error);

    //Update Loading State to false
    setStatus((p) => ({
      ...p,
      loading: false,
    }));

    if (error) {
      setStatus((p) => ({
        ...p,
        error: error?.message,
      }));

      return;
    }

    if (data) {
      router.push("/verify-request");
    }
  };

  const SignInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/api/auth/callback",
      },
    });

    if (error) {
      console.log(error);
      return { message: error?.message };
    }

    if (data) {
      console.log(data); //{user: null, session: null}
      return "";
    }
  };

  return (
    <main className="space-y-4">
      {/**Two Component! */}

      <Card className="md:max-w-3xl mx-auto">
        {/* Logo */}
        <Image
          src="/favicon.ico"
          className=""
          alt="logo"
          height={100}
          width={100}
        />

        {/*Header */}
        <h2>Welcome to QuichShop</h2>

        {/*Little Tease */}
        <p>Create a free account assp, let get the selling started</p>

        {/*Google Login */}
        <button
          onClick={SignInWithGoogle}
          className="text-muted justify-self-center flex  items-center gap-x-3"
        >
          <FontAwesomeIcon icon={faGoogle} />
          <p className="text-primary"> Sign with Google</p>
        </button>

        <p>or</p>

        <form className="space-y-4 mx-auto min-w-fit flex flex-col justify-center">
          <div className="text-center opacity-50">
            <ErrorText>{status?.error}</ErrorText>
          </div>

          <div className="flex flex-col gap-x-3 justify-center items-center flex-wrap gap-y-3">
            <label>Email</label>
            <input
              placeholder="Enter your Email"
              value={email}
              className="grow block"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <button
              disabled={status?.loading}
              className="bg-primary h-fit px-6 py-1 rounded"
              onClick={SignInWithEmail}
              type="button"
            >
              {status?.loading ? (
                <FontAwesomeIcon icon={faSpinner} />
              ) : (
                "Send Link"
              )}
            </button>
          </div>
        </form>
      </Card>
      <div>
        <p>By signing up, you are agreeing to our Terms of Service</p>
        <p>Need help?</p>
      </div>
    </main>
  );
}
