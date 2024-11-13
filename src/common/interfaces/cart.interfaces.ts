import { Cart, CartItem, Product } from '@prisma/client';

export interface ExtendedCartItem extends CartItem {
  cart?: Cart;
  product?: Product & {
    availableQuantity: number;
    totalQuantity: number;
  };
}

export interface DataUpdate {
  cartItemId: number;
  quantity: number;
  price: number;
}
