import {
  ProtectedLayout,
  PublicLayout,
} from "../../components/layouts/AuthLayouts";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layouts/Sidebar_Dashboard";
import { ProductTop } from "./components/ProductTop";
import { FreindsSection } from "./components/FreindsSection";
import { TeamSection } from "./components/TeamSection";
import { ProductBottom } from "./components/ProductBottom";
// Parent layout that will be shared across all dashboard routes
export function DashboardParent() {
  return (
    <PublicLayout title="Dashboard" className="overflow-hidden h-screen">
      <Sidebar>
        <Outlet />
      </Sidebar>
    </PublicLayout>
  );
}

// Component for the dashboard home page
export function DashboardHome() {
  return (
    <div className="space-y-10">
      <FreindsSection />
      <ProductTop />
      <TeamSection />
      <ProductBottom />
    </div>
  );
}
