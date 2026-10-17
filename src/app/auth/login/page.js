"use client";

import Card from "@/components/card";
import ErrorText from "@/components/errorText";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActionState } from "react";
import Image from "next/image";
import { LoginUserToAccount } from "@/server/auth/login";

export default function LoginAuth() {
  const [state, action, pending] = useActionState(LoginUserToAccount, false);

  const { error } = state;

  return (
    <main className="space-y-4 my-[4%]">
      {/**Two Component! */}

      <Card className="md:max-w-3xl min-w-fit space-y-4 mx-auto">
        {/* Logo */}
        <Image
          src="/favicon.ico"
          className=""
          alt="logo"
          height={100}
          width={100}
        />

        <form
          action={action}
          className="space-y-4 w-full flex flex-col justify-center"
        >
          <h2 className="font-bold">Login</h2>
          <div className="text-center opacity-50">
            <ErrorText>{error}</ErrorText>
          </div>

          <div className="flex flex-col  gap-x-3 gap-y-3">
            <div>
              <label>Email</label>
              <input
                placeholder="Enter your Email"
                className="grow block"
                required
                type="email"
                name="email"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                placeholder="Enter your Password"
                className="grow block"
                required
                name="passward"
                type="password"
              />
            </div>
            <button
              disabled={pending}
              className="bg-primary h-fit px-6 py-1 rounded"
              type="submit"
            >
              {pending ? (
                <FontAwesomeIcon icon={faSpinner} />
              ) : (
                "Login to account"
              )}
            </button>
          </div>
        </form>
        <div>
          <p>No account. Sign Up</p>
          <p>Forgot password. Request reset link</p>
        </div>
      </Card>
    </main>
  );
}
