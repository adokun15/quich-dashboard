//import CheckMerchantToken from "@/components/CheckMerchantToken";
//import { verifyIdentity } from "@/server/merchant/VerifyMerchant";
//import { useRouter, useSearchParams } from "next/navigation";

// Error Message | Admin(cookies: 30mins);
export default async function AuthLayout({ children, searchParams }) {
  const p = await searchParams;
  //const info = await verifyIdentity(p.token);

  // return <CheckMerchantToken token={p.token} info={info} />;
  return <>{children}</>;
}
