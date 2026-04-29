/* -- `store_slug.quich.shop/admin/subscription?t=access_token`---  */
import NavigateDashborad from "@/components/NavigateDashboard";
import Sidebar from "@/components/Sidebar";
import { verifyIdentity } from "@/server/merchant/VerifyMerchant";
import { getToken } from "@/utils/local-access";
import { redirect } from "next/navigation";
//import Sidebar from "@/components/Sidebar";

//Translate token -- user object
export default function SellerLayout({ billing, children }) {
  //Verifies request
  return (
    <div>
      <NavigateDashborad />
      <main className="px-6 py-2 rounded flex md:flex-row flex-col gap-4   ">
        <Sidebar />
        <div className="w-full grow">{children}</div>
      </main>
    </div>
  );
}
