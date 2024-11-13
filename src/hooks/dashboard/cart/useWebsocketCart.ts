import { useEffect, useState } from "react";
import { toast } from "sonner";
import { socket } from "../../../constant";
import { Cart, CartItem } from "../../../types/cart";

export function useWebSocketCart(userId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  useEffect(() => {
    socket.emit("getCart", { userId });

    const handleCartData = (data: Cart) => {
      setCart(data);
      setLoading(false);
    };

    const handleError = (error: { message: string; details: string }) => {
      setError(error.message);
      setLoading(false);
    };

    const handleCartItemRemoved = (removedItemId: string) => {
      setCart((prevCart) => {
        if (!prevCart) return prevCart;
        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item.id !== removedItemId),
        };
      });
    };
    socket.on("cartData", handleCartData);
    socket.on("error", handleError);
    socket.on("cartItemRemoved", handleCartItemRemoved);

    return () => {
      socket.off("cartData", handleCartData);
      socket.off("error", handleError);
      socket.off("cartItemRemoved", handleCartItemRemoved);
    };
  }, [userId]);

  const addToCart = (productId: string, size: string, quantity: number) => {
    socket.emit("addToCart", {
      userId,
      productId,
      size,
      quantity,
    });
  };

  const removeFromCart = (cartItemId: string) => {
    socket.emit("removeFromCart", { cartItemId });
  };

  const clearCart = () => {
    socket.emit("clearCart", { userId });
  };

  return {
    loading,
    error,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
