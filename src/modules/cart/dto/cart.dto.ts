// DTO untuk Create Cart
export class CreateCartDto {
  productId: string;
  quantity: number;
  userId: string;
  size: string;
}

// DTO untuk Update Cart
export class UpdateCartDto {
  quantity?: number;
  size?: string;
  color?: string;
}
