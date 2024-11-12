import { useState } from "react";
import { ProductData, InventoryItem } from "../../../types/products";

interface UseCartReturn {
  selectedSize: string | null;
  quantity: number;
  handleSizeChange: (size: string) => void;
  handleQuantityChange: (newQuantity: number) => void;
  getStockForSize: (size: string) => number;
}

export function useCart(product: ProductData): UseCartReturn {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const getStockForSize = (size: string): number => {
    const stockItem = product.Inventory.find(
      (item: InventoryItem) => item.size === size
    );
    return stockItem ? stockItem.quantity : 0;
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!selectedSize) return;

    const maxStock = getStockForSize(selectedSize);
    const adjustedQuantity = Math.max(1, Math.min(newQuantity, maxStock));
    setQuantity(adjustedQuantity);
  };

  return {
    selectedSize,
    quantity,
    handleSizeChange,
    handleQuantityChange,
    getStockForSize,
  };
}
