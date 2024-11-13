import { Loader2 } from "lucide-react";
import { ProductData } from "../../../types/products";

export function SearchModal({
  product,
  status,
  isLoading,
}: {
  product: ProductData;
  isLoading: boolean;
  status: "error" | "success" | "pending";
}) {
  if (status === "pending" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="size-20 text-blue-500 animate-spin" />
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <a href={`/p/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-2">
          <h2 className="font-bebas text-xl truncate">{product.name}</h2>
          <h3 className="text-gray-500 truncate">{product.category}</h3>
          <p className="text-md font-semibold">
            Rp. {product.price.toFixed(2)}
          </p>
        </div>
      </a>
    </div>
  );
}
