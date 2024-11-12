import { Badge } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";

export function RevenueSection({ className }: { className: string }) {
  return (
    <div className={cn(" space-y-4", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 font-manrope">
          Revenue
        </h2>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <h1 className="text-4xl font-bold  font-bebas">Rp. 20.000,83</h1>
          <Badge
            className="bg-green-100 text-green-600 border-0 px-2 py-1 rounded-full 
                       font-bebas font-medium text-sm flex items-center space-x-1 hover:bg-green-200">
            <span>+7.8%</span>
          </Badge>
        </div>
        <p className="text-gray-500 font-manrope text-sm">
          Compared to last month
        </p>
      </div>
    </div>
  );
}
