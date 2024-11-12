import { useParams } from "react-router-dom";
import { useProductById } from "../../../api/products/products.get";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { InventoryItem } from "../../../types/products";
import { PublicLayout } from "../../../components/layouts/AuthLayouts";
import { FormatPrice } from "../../../utils/format_Price";
import { ErrorComponent } from "../../ErrrorComponent";
import { ProductDetailSkeleton } from "../../../components/ui/skeleton/ProductDetailSkeleton";
import { FormatText } from "../../../utils/FormatDescription";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { toast } from "sonner";
import { useCart } from "../../../hooks/dashboard/cart/useCart";

export function ProductIdComponent() {
  const { id } = useParams();
  const { data, isLoading, isError } = useProductById(id as string);
  const product = data?.data.data;

  // Move hooks before any conditional returns
  const {
    selectedSize,
    quantity,
    handleSizeChange,
    handleQuantityChange,
    getStockForSize,
  } = useCart(product);

  // Handle loading and error serta render hooks setelah datanya muncul
  if (isLoading) return <ProductDetailSkeleton />;
  if (isError) return <ErrorComponent />;
  if (!product) return null;

  //    handle untuk menambahkan product ke cart
  const handleSubmit = () => {
    toast.success("SUBMIT BERHASIL");
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Size Selection with Stock Indicator */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.Inventory.map((inventoryItem: InventoryItem) => {
                  const isAvailable = inventoryItem.quantity > 0;
                  return (
                    <Button
                      key={inventoryItem.size}
                      variant={
                        selectedSize === inventoryItem.size
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleSizeChange(inventoryItem.size)}
                      disabled={!isAvailable}
                      className={`
                      ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                      relative
                    `}>
                      {inventoryItem.size}
                      {!isAvailable && (
                        <span className="absolute top-0 right-0 text-xs text-red-500">
                          Out
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Controls */}
            {selectedSize && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}>
                    -
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= getStockForSize(selectedSize)}>
                    +
                  </Button>
                </div>
                <span className="text-gray-500">
                  Stock: {getStockForSize(selectedSize)}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-2xl font-bold text-primary">
              {FormatPrice(product.price, "IDR")}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                className="flex-1 flex items-center gap-2"
                disabled={!selectedSize || quantity === 0}
                onClick={handleSubmit}>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">
                {FormatText(product.description, {
                  maxLength: 100,
                })}
              </p>
            </div>
            <div className="mt-8 border-t pt-4">
              <div className="flex items-center mt-4">
                {product.image ? (
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={product.seller.image}
                      alt={product.seller.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600">
                      {product.seller.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">
                    {product.seller.name}
                  </h3>
                  <p className="text-gray-600">{product.seller.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
