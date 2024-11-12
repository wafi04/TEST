import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllProductsBySearch } from "../../../api/products/products.get";
import { ProtectedLayout } from "../../../components/layouts/AuthLayouts";
import { SidebarFilter } from "../../../components/layouts/Sidebar_Filter";
import { HeaderSearch } from "../../../components/ui/search/HeaderSearch";
import { motion } from "framer-motion";
import { ProductData } from "../../../types/products";
import { FormatPrice } from "../../../utils/format_Price";
import {
  MAX_PRICE,
  MIN_PRICE,
  priceOptions,
} from "../../../components/layouts/sidebar/price/Hooks";
import { useSidebar } from "../../../hooks/useSidebar";
import EachUtils from "../../../utils/EachUtils";

export function ProductAll() {
  const [searchParams] = useSearchParams();
  const { show } = useSidebar();
  const query = searchParams.get("q") ?? "";
  const gender = searchParams.get("gender") ?? "";
  const price_id = searchParams.get("price") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "";
  const getPriceRangeFromId = (id: string | null) => {
    const option = priceOptions.find((opt) => opt.id === id);
    return {
      max: option ? option.max : MAX_PRICE,
      min: option ? option.min : MIN_PRICE,
    };
  };

  const { data, count } = useGetAllProductsBySearch({
    search: query,
    maxPrice: getPriceRangeFromId(price_id).max,
    minPrice: getPriceRangeFromId(price_id).min,
    gender,
    sortBy,
  });

  return (
    <ProtectedLayout title={`Search for : ${query}`}>
      <HeaderSearch title={query} count={count as number} />
      <div className="flex">
        {show && <SidebarFilter />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8   ">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)] p-3 overflow-y-auto">
            <EachUtils
              of={data as ProductData[]}
              render={(data, index) => (
                <ProductCard product={data} index={index} />
              )}
            />
          </motion.div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

interface ProductCardProps {
  product: ProductData;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const push = useNavigate();

  return (
    <motion.div
      onClick={() => push(`/p/${product.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative  p-3">
      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden relative bg-gray-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">{product.color}</p>

          <p className="text-gray-500">{FormatPrice(product.price)}</p>
        </div>
      </div>
    </motion.div>
  );
}
