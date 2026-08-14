import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white">

      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">

        <DashboardSidebar />

        <main className="min-w-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
};