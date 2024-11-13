import { useProductByUser } from "../../../../api/products/products.get";
import { ProductCard } from "./CardProducts";
export function ProductComponent() {
  const { products, isLoading, error, isError } = useProductByUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">{error?.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
