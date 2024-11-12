import { UserData } from './user';

export interface Inventory {
  id: number;
  size: string;
  quantity: number;
}
export interface ProductData {
  name: string;
  id: string;
  category: string;
  price: number;
  image: string;
  description: string;
  color: string;
  Inventory: Inventory[];
  sellerId: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  seller: UserData;
}
export interface ParamsFilter {
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  gender?: string;
  size?: string;
  limit?: number;
  offset?: number;
}

export interface ParamsSearch {
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest'; // Added sorting option
  gender?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  limit?: number;
  offset?: number;
}
