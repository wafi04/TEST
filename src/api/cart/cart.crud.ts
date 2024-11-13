// cartService.ts

import { BASE_URL } from "../../constant";
export type CreateCartDto = {
  productId: string;
  quantity: number;
  size?: string;
};

// DTO untuk Update Cart
export type UpdateCartDto = {
  quantity?: number;
  size?: string;
};
export class CartService {
  private readonly baseUrl = `${BASE_URL}/cart`;

  // Add item to cart
  async addToCart(createCartDto: CreateCartDto): Promise<any> {
    const response = await fetch(`${this.baseUrl}/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCartDto),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    return await response.json();
  }

  // Get user's cart
  async getCart(): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    return await response.json();
  }

  // Get cart total
  async getCartTotal(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/total`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart total");
    }

    return await response.json();
  }

  // Update cart item
  async updateCartItem(
    cartItemId: number,
    updateCartDto: UpdateCartDto
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}/cartItem/${cartItemId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCartDto),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item");
    }

    return await response.json();
  }

  // Remove cart item
  async removeCartItem(cartItemId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/cartItem/${cartItemId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to remove cart item");
    }

    return await response.json();
  }

  // Clear entire cart
  async clearCart(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/clear`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    return await response.json();
  }
  async checkoutCart(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/checkout`, {
      method: "PUT",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    return await response.json();
  }

  async getcheckoutProduct() {
    const response = await fetch(`${this.baseUrl}/checkout`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get cart");
    }

    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    return await response.json();
  }
}
