import { CardDashboard } from "../../../components/ui/card/CardDashboard";
import { TrendingUp, Award, Crown } from "lucide-react";
import { RevenueSection } from "./RevenueSection";
import { Badge } from "../../../components/ui/badge";

export function ProductTop() {
  const boxes = [
    {
      label: "Growth",
      amount: "Rp. 20.000,83",
      percentage: "7.8%",
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Best Deal",
      amount: "Rp. 15.000,00",
      percentage: "5.2%",
      icon: <Award className="w-5 h-5 text-yellow-600" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      label: "Top Sales",
      amount: "Rp. 12.500,00",
      percentage: "4.3%",
      icon: <Crown className="w-5 h-5 text-purple-600" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-4xl font-bold text-gray-500 font-manrope">
        New Report
      </h2>

      <div className="flex justify-between space-x-6">
        <RevenueSection className="flex-grow" />

        <div className="grid grid-cols-3 gap-4 ">
          {boxes.map((box, index) => (
            <div
              key={index}
              className={`
                ${box.bgColor} 
                p-4 rounded-2xl 
                hover:shadow-md 
                transition-all 
                duration-300 
                ease-in-out
                transform 
                hover:-translate-y-1
              `}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-manrope text-gray-600">
                    {box.label}
                  </span>
                  {box.icon}
                </div>

                <div>
                  <p className="text-xl font-bold font-manrope text-gray-900 mb-1">
                    {box.amount}
                  </p>
                  <Badge
                    className={`
                      ${box.bgColor} 
                      ${box.textColor} 
                      border-0 
                      font-manrope 
                      font-medium 
                      text-xs 
                      px-2 
                      py-0.5 
                      rounded-full
                    `}>
                    +{box.percentage}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
