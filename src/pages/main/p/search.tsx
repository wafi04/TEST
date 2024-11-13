import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

// API & Hooks
import {
  useGetAllProductsBySearch,
  useProductByNotMe,
} from "../../../api/products/products.get";
import { useSidebar } from "../../../hooks/useSidebar";

// Layouts & Components
import { PublicLayout } from "../../../components/layouts/AuthLayouts";
import { SidebarFilter } from "../../../components/layouts/Sidebar_Filter";
import { HeaderSearch } from "../../../components/ui/search/HeaderSearch";

// Utils & Types
import { ProductData } from "../../../types/products";
import { FormatPrice } from "../../../utils/format_Price";
import {
  MAX_PRICE,
  MIN_PRICE,
  priceOptions,
} from "../../../components/layouts/sidebar/price/Hooks";

// Shadcn UI
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

export function ProductAll() {
  const [searchParams] = useSearchParams();
  const { show } = useSidebar();

  // Memoize search parameters
  const searchConfig = useMemo(
    () => ({
      query: searchParams.get("q") ?? "",
      gender: searchParams.get("gender") ?? "",
      price_id: searchParams.get("price") ?? "",
      sortBy: searchParams.get("sortBy") ?? "",
    }),
    [searchParams]
  );

  // Memoized price range calculation
  const priceRange = useMemo(() => {
    const option = priceOptions.find((opt) => opt.id === searchConfig.price_id);
    return {
      max: option ? option.max : MAX_PRICE,
      min: option ? option.min : MIN_PRICE,
    };
  }, [searchConfig.price_id]);

  // Fetch products
  const { products } = useProductByNotMe({
    maxPrice: priceRange.max,
    minPrice: priceRange.min,
    gender: searchConfig.gender,
    sortBy: searchConfig.sortBy,
  });
  const { data, count } = useGetAllProductsBySearch({
    search: searchConfig.query,
    maxPrice: priceRange.max,
    minPrice: priceRange.min,
    gender: searchConfig.gender,
    sortBy: searchConfig.sortBy,
  });

  // Determine final product list
  const dataProducts = searchConfig.query ? data : products;

  return (
    <PublicLayout title={`Search for : ${searchConfig.query}`}>
      <HeaderSearch
        title={searchConfig.query || "All Products"}
        count={(count as number) || (products?.length as number)}
      />
      <div className="flex">
        {show && <SidebarFilter />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-3 overflow-y-auto">
            {dataProducts?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}

interface ProductCardProps {
  product: ProductData;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const navigate = useNavigate();

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            onClick={() => navigate(`/p/${product.id}`)}
            className="cursor-pointer">
            <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold">
                    {FormatPrice(product.price)}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{product.color}</span>
                  <Badge variant="secondary" className="text-xs">
                    {product.gender}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>View Product Details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
