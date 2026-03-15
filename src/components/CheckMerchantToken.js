"use client";

import { useRouter } from "next/navigation";

export default function CheckMerchantToken({ info, token }) {
  const r = useRouter();

  if (info?.status) {
    localStorage.setItem("quich_login_token", token);
    r.push("/admin");
  }

  if (!info?.status) {
    return <p>{info?.message}</p>;
  }

  return <p>Verify Identity....</p>;
}
