"use client";
import { createClientFromSupabase } from "@/lib/supabase/client";
import { CreateLoginCookie } from "@/server/merchant/AuthCookie";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmOtpAuth() {
  const sp = useSearchParams();
  const token_hash = sp.get("token_hash");
  const type = sp.get("type");

  console.log(token_hash);
  console.log(type);
  //Redirect: A userid
  useEffect(() => {
    const verifyEmail = async () => {
      await CreateLoginCookie({
        refresh_token: "qweivnyd53yx",
        access_token:
          "eyJhbGciOiJFUzI1NiIsImtpZCI6IjY5NzZjZTUwLTEzYjctNGE4Yy04MjA5LTVhMDQyY2EyMTE2NSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Zjampvbml4ZW14c25rcWlyd3NqLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhNDQ5MWMwOC00M2YwLTRlZGItYjQ3OC0yYmE3NWRlOTA1NDkiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc3MzkxNzM2LCJpYXQiOjE3NzczODgxMzYsImVtYWlsIjoiYW1vc2RhbmllbDIwMDVAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImFtb3NkYW5pZWwyMDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImE0NDkxYzA4LTQzZjAtNGVkYi1iNDc4LTJiYTc1ZGU5MDU0OSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTc3NzM4ODEzNn1dLCJzZXNzaW9uX2lkIjoiZTY0MGZlMWEtZjJhZi00NDg3LTg1ZWMtYmYxYTBlNTc4OGFjIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.8tvM198Q1xB6_L8-0SAnnya2SYYIIIy7L0Tn2Y7Zy6h9KgWWXy5djDYTH78PiwmXHXcKXpKkdsjCL6wcB0vn8Q",
      });

      /*
      if (!token_hash && !type) return;

      const {
        data: {
          session: { access_token, refresh_token },
        },
        error,
      } = await createClientFromSupabase().auth.verifyOtp({
        token_hash,
        type,
      });

      if (error) {
        console.log(error);
        return { message: error?.message };
      }

      if (access_token && refresh_token) {
        //Save to cookie
        //Check if user has_store via access "to
        //Redirect to onboarding / store dashboard;
      }
        */
    };

    verifyEmail();
  }, []);

  return (
    <main>
      <p>Confirming Login</p>
    </main>
  );
}

/**
 
  */
