import { Home, BarChart, Settings, User, ShoppingBag } from "lucide-react";
import { MenuItemProps } from "../../../types/types.utils";
export const menuItems: MenuItemProps[] = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard" || "/dashboard/",
  },
  {
    icon: BarChart,
    label: "Products",
    path: "/dashboard/products",
  },
  {
    icon: ShoppingBag,
    label: "Cart",
    path: "/dashboard/Cart",
  },
  {
    icon: User,
    label: "Profile",
    path: "/dashboard/profile",
  },
];
