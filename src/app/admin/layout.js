/* -- `store_slug.quich.shop/admin/subscription?t=access_token`---  */

import NavigateDashborad from "@/components/NavigateDashboard";
//import Sidebar from "@/components/Sidebar";

export default function SellerLayout({ children }) {
  return (
    <>
      <NavigateDashborad />
      <main className="px-6 py-2 rounded flex md:flex-row flex-col gap-y-4 gap-x-16 mx-auto ">
        {/* <Sidebar />*/}
        {children}
      </main>
    </>
  );
}
