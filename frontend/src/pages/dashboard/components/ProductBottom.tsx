import { Fragment } from "react";
import { CardListItem } from "../../../components/ui/card/CardListItem";
import { CardListVisualizationData } from "../../../components/ui/card/CardVisualingData";
export function ProductBottom() {
  const exampleData = [
    {
      name: "Product 1",
      image: "https://avatars.dicebear.com/api/avataaars/example.svg",
      price: 150000,
      percentase: 12.5,
    },
    {
      name: "Product 2",
      image: "https://avatars.dicebear.com/api/avataaars/example.svg",
      price: 299000,
      percentase: -5.3,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-2">
        <div className="space-x-2 flex w-full">
          <CardListItem data={exampleData} />
          <CardListVisualizationData data={exampleData} />
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
