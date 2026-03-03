import NavigateDashborad from "@/components/NavigateDashboard";
import Sidebar from "@/components/Sidebar";
import WhatsappCommunity from "@/components/WhatsappCommunity";
import ManageStore from "@/components/ManageStore";
import ControlHours from "@/components/ControlHours";
import AboutVideo from "@/components/AboutVideo";

export default async function Home() {
  const user = {};

  return (
    <>
      <div className="flex flex-wrap gap-y-4 gap-x-6 py-1 min-h-screen dark:bg-black">
        <ManageStore />
        <WhatsappCommunity />
        <ControlHours />
        {/*<AboutVideo />*/}
      </div>
    </>
  );
}
