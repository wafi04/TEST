import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// type props of layout
export interface LayoutProps {
  children: ReactNode;
  className?: string;
  requireAuth?: boolean;
  title?: string;
}
//  type props api response from  backend
export type API_RESPONSE<T> = {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
};

// Tipe Menu Item
export interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
}
