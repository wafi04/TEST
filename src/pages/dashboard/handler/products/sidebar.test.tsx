"use client";
import { ReactNode, useState } from "react";
import {
  Home,
  ShoppingBag,
  Users,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Slack,
} from "lucide-react";

const menuItems = [
  { icon: <Home size={24} />, label: "Dashboard", href: "/dashboard" },
  {
    icon: <ShoppingBag size={24} />,
    label: "Products",
    href: "/dashboard/products",
  },
  {
    icon: <Slack size={24} />,
    label: "Category",
    href: "/dashboard/category",
  },
  {
    icon: <Users size={24} />,
    label: "Customers",
    href: "/dashboard/customers",
  },
  {
    icon: <BarChart size={24} />,
    label: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    icon: <Settings size={24} />,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex sticky top-0 h-full bg-gray-100 font-monserrat">
      <aside
        className={`bg-black text-white transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && <h2 className="text-2xl font-bold">Dashboard</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full hover:bg-gray-700">
            {isCollapsed ? (
              <ChevronRight size={24} />
            ) : (
              <ChevronLeft size={24} />
            )}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center space-x-4 py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                  <span className="">{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 px-4 ">{children}</main>
    </div>
  );
};

export default Sidebar;
