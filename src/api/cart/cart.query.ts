import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/auth/Auth-Provider";
import { API_RESPONSE } from "../../types/types.utils";
import { CartService, CreateCartDto, UpdateCartDto } from "./cart.crud";
import { toast } from "sonner";
import { Cart, CartItem } from "../../types/cart";
import { ProductData } from "../../types/products";

const cartService = new CartService();

// Fetch user's cart
export const useGetCart = () => {
  const { user, isAuthenticated } = useAuth();
  const { data, isLoading, error } = useQuery<API_RESPONSE<Cart>>({
    queryKey: ["cart", "userCart", user?.id],
    queryFn: () => cartService.getCart(),
    enabled: !!isAuthenticated,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
};

export const useGetCartTotal = () => {
  const { user, isAuthenticated } = useAuth();
  const { data, isLoading, error } = useQuery<API_RESPONSE<number>>({
    queryKey: ["cart", "total", user?.id],
    queryFn: () => cartService.getCartTotal(),
    enabled: !!isAuthenticated,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
export const useGetCartTotalCheckout = () => {
  const { user, isAuthenticated } = useAuth();
  const { data, isLoading, error } = useQuery<API_RESPONSE<CartItem[]>>({
    queryKey: ["cart", "total", user?.id],
    queryFn: () => cartService.getcheckoutProduct(),
    enabled: !!isAuthenticated,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
};

// Add item to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CreateCartDto>({
    mutationFn: (createCartDto) => cartService.addToCart(createCartDto),
    onSuccess: () => {
      // Invalidate the queries after a successful mutation
      toast.success("Add to Cart success");
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Correct usage
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] }); // Correct usage
    },
  });
};

// Update cart item
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { cartItemId: number; updateCartDto: UpdateCartDto }
  >({
    mutationFn: ({ cartItemId, updateCartDto }) =>
      cartService.updateCartItem(cartItemId, updateCartDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Correct usage
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] }); // Correct usage
    },
  });
};

// Remove cart item
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (cartItemId) => cartService.removeCartItem(cartItemId),
    onSuccess: () => {
      toast.success("Remove From Cart Success");
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Correct usage
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] }); // Correct usage
    },
  });
};

// Clear entire cart
export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Correct usage
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] }); // Correct usage
    },
  });
};
export const useCheckoutCart = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => cartService.checkoutCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Correct usage
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] }); // Correct usage
    },
  });
};
