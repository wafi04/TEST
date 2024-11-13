import {
  Home,
  BarChart,
  Settings,
  User,
  ShoppingBag,
  ShoppingCart,
  Bell,
} from "lucide-react";
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
    icon: ShoppingCart, // atau CreditCard
    label: "Checkout",
    path: "/dashboard/Checkout",
  },
  {
    icon: Bell, // atau CreditCard
    label: "Notifications",
    path: "/dashboard/notifications",
  },
  {
    icon: User,
    label: "Profile",
    path: "/dashboard/profile",
  },
];
