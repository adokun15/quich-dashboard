"use client";

import { useState } from "react";
import NavigateDashboard from "@/components/NavigateDashboard";
import Sidebar from "@/components/Sidebar";

export default function DashboardWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigateDashboard onMenuClick={() => setSidebarOpen(true)} />

      <main className="mx-auto flex w-full max-w-[1600px] items-start gap-6 px-4 py-5 sm:px-6 lg:gap-8 lg:px-8">
        <Sidebar open={sidebarOpen} onClose={closeSidebar} />

        <div className="min-w-0 flex-1">{children}</div>
      </main>
    </div>
  );
}
