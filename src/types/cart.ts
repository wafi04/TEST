import { ProductData } from "./products";

export type CartItem = {
  id: number;
  cartId: string;
  productId: string;
  isCheckout: boolean;
  quantity: number;
  size: string;
  total: number;
  createdAt: string;
  product: {
    id: string;
    name: string;
    category: string;
    description: string;
    color: string;
    gender: string;
    image: string;
    price: number;
    createdAt: string;
    updatedAt: string | null;
    sellerId: string;
    Inventory: {
      id: number;
      size: string;
      quantity: number;
      productId: string;
    }[];
    availableQuantity: number;
    totalQuantity: number;
  };
};

export type Cart = {
  id: string;
  userId: string;
  createdAt: string;
  totalPrice: number;
  items: CartItem[];
  total: number;
};
