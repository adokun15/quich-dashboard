"use client";
import Card from "@/components/card";
import ErrorText from "@/components/errorText";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RegisterUserToAccount } from "@/server/auth/register";

export default function SignupAuth() {
  const [state, action, pending] = useActionState(RegisterUserToAccount, false);
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
          <h2 className="font-bold">Sign up</h2>
          <div className="text-center opacity-50">
            <ErrorText>{error}</ErrorText>
          </div>

          <div className="flex flex-col  gap-x-3 gap-y-3">
            <div>
              <label>Name</label>
              <input
                placeholder="Enter your Name"
                className="grow block"
                required
                name="name"
                type="text"
              />
            </div>

            <div>
              <label>Email</label>
              <input
                placeholder="Enter your Email"
                className="grow block"
                name="email"
                required
                type="email"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                placeholder="Enter your Password"
                className="grow block"
                name="password"
                required
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
                "Create an account"
              )}
            </button>
          </div>
        </form>
        <div>
          <p>
            Have an account.{" "}
            <Link className="text-primary" href="/login">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}
