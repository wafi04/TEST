import { HeaderDashboard } from "./components/Header-Dashboard";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { FormatPrice } from "../../utils/format_Price";
import { OrderSUmmary } from "./@components/cart/OrderSummary";
import { CartItem } from "../../types/cart";
import { useAuth } from "../../hooks/auth/Auth-Provider";
import { useState } from "react";
import {
  useAddToCart,
  useGetCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "../../api/cart/cart.query";
import { toast } from "sonner";
import { ErrorComponent } from "../ErrrorComponent";
import { LoadingOverlay } from "../../components/ui/skeleton/LoadingOverlay";

// Types
interface CartItemsProps {
  item: CartItem;
  onRemoveFromCart: (cartItemId: number) => void;
}

export function DashboardCart() {
  const { data: cart, error, isLoading } = useGetCart();
  const removeFromCart = useRemoveCartItem();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  const handleRemoveFromCart = (cartItemId: number) => {
    removeFromCart.mutate(cartItemId);
  };

  return (
    <div className="space-y-8">
      <HeaderDashboard title="Cart" subTitle="My Shopping Cart">
        <p className="text-sm text-muted-foreground">
          {cart?.items.length || 0} items in cart
        </p>
      </HeaderDashboard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart?.items.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Your cart is empty</p>
              </CardContent>
            </Card>
          ) : (
            cart?.items.map((item) => (
              <CartItems
                key={item.id}
                item={item}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))
          )}
        </div>
        <OrderSUmmary
          length={cart?.items.length || 0}
          total={cart?.totalPrice || 0}
        />
      </div>
    </div>
  );
}

function CartItems({ item, onRemoveFromCart }: CartItemsProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateCartItem = useUpdateCartItem();

  // Hitung preview price
  const previewTotal = item.product.price * quantity;

  const handleQuantityUpdate = (change: number) => {
    const newQuantity = quantity + change;

    if (newQuantity >= 1 && newQuantity <= item.product.availableQuantity) {
      setQuantity(newQuantity);
      setHasChanges(newQuantity !== item.quantity);
    }
  };

  const handleSubmitChanges = () => {
    setIsUpdating(true);
    updateCartItem.mutate(
      {
        cartItemId: item.id,
        updateCartDto: {
          quantity: quantity,
          size: item.size,
        },
      },
      {
        onSuccess: () => {
          toast.success("update success");
          setIsUpdating(false);
          setHasChanges(false);
        },
        onError: () => {
          setIsUpdating(false);
          toast.error("something went wrong");
          setQuantity(item.quantity);
        },
      }
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.product.category} • {item.product.color}
                </p>
                <p className="text-sm text-muted-foreground">
                  Size: {item.size}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {FormatPrice(item.total, "IDR")}
                </p>
                {hasChanges && (
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-muted-foreground line-through">
                      {FormatPrice(item.total, "IDR")}
                    </p>
                    <p className="font-semibold text-green-600">
                      {FormatPrice(previewTotal, "IDR")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityUpdate(-1)}
                  disabled={quantity <= 1 || isUpdating}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">
                  {isUpdating ? "..." : quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={
                    quantity >= item.product.availableQuantity || isUpdating
                  }
                  onClick={() => handleQuantityUpdate(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                {hasChanges && (
                  <span className="text-sm text-muted-foreground">
                    Stock: {item.product.availableQuantity}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {hasChanges && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSubmitChanges}
                    disabled={isUpdating}
                    className="bg-green-600 hover:bg-green-700 text-white">
                    {isUpdating ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Updating...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => onRemoveFromCart(item.id)}
                  disabled={isUpdating}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardCart;
