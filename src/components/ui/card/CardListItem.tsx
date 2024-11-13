import { ArrowDownWideNarrow, ChevronUp, Filter } from "lucide-react";
import { Badge } from "../badge";
export interface ProductData {
  name: string;
  image: string;
  price: number;
  percentase: number;
}

interface CardListItemProps {
  data: ProductData[];
}

export function CardListItem({ data }: CardListItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            <ArrowDownWideNarrow className="rotate-180 w-4 h-4" />
            <span>Sort by</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {data.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="relative ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-full object-cover p-1 size-10"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge
                className={`${
                  product.percentase > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                <ChevronUp
                  className={`w-3 h-3 mr-0.5 ${
                    product.percentase < 0 ? "rotate-180" : ""
                  }`}
                />
                {Math.abs(product.percentase)}%
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}
