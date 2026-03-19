import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import PaidPlan from "@/components/PaidPlan";
import { cookies } from "next/headers";

const getBillingInfo = async () => {
  try {
    // Get User Cookies first: 30mins
    const cookie = await cookies();
    const user_token = cookie?.get("quich_login_token");

    if (!user_token) {
      redirect("/");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user/billing`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token?.value}`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: data?.message, status_code: data?.status_code };
    }

    return {
      data: {
        merchant: {
          subscription_plan: "",
          subscription_amount: "",
        }, //From the token; 'name, store_name, slug_id, user_id'
      },
    };
  } catch (e) {
    return { error: e?.message };
  }
};

//Billing Pricing Page
export default function Billing() {
  //Access Cookies
  const merchantplan = null;
  return (
    <>
      <PaidPlan />
    </>
  );
}
