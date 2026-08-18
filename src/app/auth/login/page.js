"use client";

import { createClientFromSupabase } from "@/lib/supabase/client";
import { useState } from "react";

const supabase = createClientFromSupabase();

export default function LoginAuth() {
  const [email, setEmail] = useState("");
  const { status, setStatus } = useState({
    success: null,
    error: null,
  });

  const SignInWithEmail = async () => {
    console.log(email);
    if (!email || !email?.includes("@")) return;

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: "http://auth.localhost:3000/confirm-login",
      },
    });

    if (error) {
      console.log(error);
      return { message: error?.message };
    }

    if (data) {
      console.log(data);
      return "Sent magic link successfully.";
    }
  };

  return (
    <main>
      <form>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <button className="bg-primary" onClick={SignInWithEmail} type="button">
          Login
        </button>
      </form>
    </main>
  );
}
