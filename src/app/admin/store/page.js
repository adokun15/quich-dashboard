import NavigateDashborad from "@/components/NavigateDashboard";
import Sidebar from "@/components/Sidebar";
import WhatsappCommunity from "@/components/WhatsappCommunity";
import ManageStore from "@/components/ManageStore";
import AboutVideo from "@/components/AboutVideo";
import StoreRegion from "@/components/Region";
import ManageWhatsapp from "@/components/manageWhatsapp";
import StoreDangerZone from "@/components/StoreDangerZone";

/*
What i notice while editing?
- max stock by a single user;
- conditions: Cart must be more than 5k ?

*/
export default async function Home() {
  const user = {};

  return (
    <>
      <div className="w-full mx-auto md:max-w-xl">
        <ManageStore />
        <StoreRegion />
        <ManageWhatsapp />
        <WhatsappCommunity />
        <StoreDangerZone />
      </div>
    </>
  );
}
