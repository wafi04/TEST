import { UserData } from "./user";
//  type definition untuk image
export interface ProductImage {
  file: File;
}
// type definitioan untuk inventory
export interface InventoryItem {
  size: string;
  quantity: number;
}
//  type definition untuk crud product
export interface ProductFormData {
  name: string;
  gender: "Men" | "Women"; // type option of gender
  category: "RUNNING" | "JORDAN" | "BASKETBALL"; // type option of category
  description: string;
  color: string;
  price: number;
  image: File | null | string;
  Inventory: InventoryItem[];
}
//  type untuk  inventory
export interface Inventory {
  id: number;
  size: string;
  quantity: number;
}
//  type untuk details product
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

//   type untuk response untuk search product
export interface SearchProductsResults {
  products: ProductData[];
  totalCount: number;
}

//   type untuk category
export type CATEGORY = "RUNNING" | "JORDAN" | "BASKETBALL";
//  type untuk gender
export type GENDER = "Men" | "Women";

export type CreateInventoryType = {
  size: string;
  quantity: number;
};

export type ProductImageType = {
  file: File | null;
  preview: string; //  type untuk preview image sebelum submit
};
// Type definition for creating a product, including optional inventory
export type CreateProductType = {
  name: string;
  gender: GENDER;
  category: CATEGORY;
  description: string;
  color: string;
  price: string | number;
  image: ProductImageType | null;
  Inventory?: CreateInventoryType[]; //   optional: if wanna add inventory to add product
};
