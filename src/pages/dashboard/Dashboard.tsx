import { PublicLayout } from "../../components/layouts/AuthLayouts";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layouts/Sidebar_Dashboard";
import { ProductTop } from "./components/ProductTop";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { HeaderDashboard } from "./components/Header-Dashboard";
import { CardVisualingData } from "./components/FreindsSection";
import { CardMockActivities } from "../../components/ui/card/CardMockActivititis";
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

export function DashboardHome() {
  return (
    <div className="space-y-10 p-6">
      {/* Dashboard Header */}
      <HeaderDashboard
        title="Dashboard"
        subTitle="Welcome back! Here's your business summary."
      />
      <ProductTop />
      {/* Revenue Chart */}
      <CardVisualingData />
      {/* Recent Activities */}
      <CardMockActivities />
    </div>
  );
}
