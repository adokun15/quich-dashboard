import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { verifyIdentity } from "@/server/merchant/VerifyMerchant.js";
import { NextResponse } from "next/server";

//Redirect to Onboaard or dashboard
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");

  if (!token_hash) {
    return redirect("/login?error=missing_token");
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, {
              ...options,
              // domain: ".quich.shop",
              domain: ".app.localhost",
            });
          });
        },
      },
    },
  );

  try {
    /*   const {
      error,
      data: { session },
    } = await supabase.auth.verifyOtp({
      token_hash,
      type: "email",
    });
*/
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log(session);
    if (error || !session?.access_token) {
      return redirect("/login?error=invalid_or_expired");
    }

    //Check if it exist: Get User
    const hasUser = await verifyIdentity(session?.access_token);
    // { userId, email, store_slug, store_id, current_step, registration_complete};// Detokenize, need to add more property

    console.log(hasUser);

    if (!hasUser?.status && hasUser?.message === "no_account_yet") {
      return redirect(
        `${process.env.NODE_ENV === "production" ? "https" : "http"}://onboarding.${process.env.NEXT_PUBLIC_APP_DOMAIN}/personal`,
      );
    }

    if (!hasUser?.status) {
      //Somethingwentwrong!
      return redirect(`/login?error=user_error&message=${hasUser?.message}`);
    }

    const nextLoc = hasUser?.registration_completed
      ? `${hasUser?.store_slug}.${process.env.NEXT_PUBLIC_APP_DOMAIN}/admin`
      : `onboarding.${process.env.NEXT_PUBLIC_APP_DOMAIN}/`;

    return redirect(
      `${process.env.NODE_ENV === "production" ? "https" : "http"}://${nextLoc}`,
    );
  } catch (e) {
    console.log(e);
    //return redirect("/login?error=unknown_error");
  }
}
