import { ReactNode } from "react";
import { cn } from "../../../lib/utils";
interface CardDashboardProps {
  className?: string;
  children: ReactNode;
}

export function CardDashboard({ children, className }: CardDashboardProps) {
  return (
    <div
      className={cn("size-fit p-4 rounded-md bg-black text-white", className)}>
      {children}
    </div>
  );
}
