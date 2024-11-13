import io from "socket.io-client";
import { ChartConfig } from "../components/ui/chart";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const socket = io(BASE_URL);
export const chartData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
];
export const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
};
