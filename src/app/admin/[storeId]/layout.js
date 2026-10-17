import { Suspense } from "react";
import DashboardWrapper from "@/components/DashboardWrapper";

export default function SellerLayout({ children }) {
  return (
    <DashboardWrapper>
      <Suspense fallback={<p className="text-sm text-muted">Loading...</p>}>
        {children}
      </Suspense>
    </DashboardWrapper>
  );
}

/*import NavigateDashborad from "@/components/NavigateDashboard";
import Sidebar from "@/components/Sidebar";
import { verifyIdentity } from "@/server/merchant/VerifyMerchant";
import { getToken } from "@/utils/local-access";
import { redirect } from "next/navigation";
import { Suspense } from "react";
//import Sidebar from "@/components/Sidebar";

//Translate token -- user object
export default function SellerLayout({ params, children }) {
  //Verifies request
  return (
    <div>
      <NavigateDashborad />
      <main className="px-6 py-2 rounded flex md:flex-row flex-col gap-4   ">
        <Suspense>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<p>FFallback..</p>}>
          <div className="w-full grow">{children}</div>
        </Suspense>
      </main>
    </div>
  );
}
*/
