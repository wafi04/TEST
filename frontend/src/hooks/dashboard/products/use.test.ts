import { useEffect, useState } from "react";
import {
  InventoryItem,
  ProductData,
  ProductFormData,
} from "../../../types/products";

// Custom hook for product state management
const useProductState = ({ initialData }: { initialData?: ProductData }) => {
  // Initial state
  const initialProductState: ProductFormData = {
    name: "",
    gender: "Men",
    category: "RUNNING",
    description: "",
    color: "",
    price: 0,
    image: null,
    Inventory: [],
  };
  console.log(initialData?.Inventory);

  // Main state
  const [formData, setFormData] = useState<ProductFormData>(
    initialData
      ? {
          name: initialData.name,
          gender: initialData.gender as "Men" | "Women",
          category: initialData.category as "RUNNING" | "JORDAN" | "BASKETBALL",
          description: initialData.description,
          color: initialData.color,
          price: initialData.price,
          image: initialData.image,
          Inventory: initialData.Inventory.map((inv) => ({
            size: inv.size,
            quantity: inv.quantity,
          })),
        }
      : initialProductState
  );

  // Separate state for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Update image preview when formData.image changes
  useEffect(() => {
    if (formData.image instanceof File) {
      const objectUrl = URL.createObjectURL(formData.image);
      setImagePreview(objectUrl);

      // Clean up memory when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof formData.image === "string") {
      setImagePreview(formData.image);
    } else {
      setImagePreview(null);
    }
  }, [formData.image]);

  // Set form data
  const updateFormData = (data: Partial<ProductFormData>): void => {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  // Reset form data
  const resetFormData = (): void => {
    setFormData(initialProductState);
    setImagePreview(null);
  };

  // Handle product image
  const addProductImage = (image: File): void => {
    setFormData((prevState) => ({
      ...prevState,
      image,
    }));
  };

  const removeProductImage = (): void => {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
  };

  // Handle inventory
  const addInventory = (inventory: InventoryItem): void => {
    setFormData((prevState) => {
      // Check if the size already exists
      const existingInventoryIndex = prevState.Inventory.findIndex(
        (inv) => inv.size === inventory.size
      );

      if (existingInventoryIndex !== -1) {
        // If size exists, update the quantity
        const updatedInventory = [...prevState.Inventory];
        updatedInventory[existingInventoryIndex] = {
          ...updatedInventory[existingInventoryIndex],
          quantity: inventory.quantity,
        };

        return {
          ...prevState,
          Inventory: updatedInventory,
        };
      }

      // If size doesn't exist, add new inventory
      return {
        ...prevState,
        Inventory: [...prevState.Inventory, inventory],
      };
    });
  };

  const removeInventory = (size: string): void => {
    setFormData((prevState) => ({
      ...prevState,
      Inventory: prevState.Inventory.filter((inv) => inv.size !== size),
    }));
  };

  const updateInventory = (
    size: string,
    updates: Partial<InventoryItem>
  ): void => {
    setFormData((prevState) => ({
      ...prevState,
      Inventory: prevState.Inventory.map((inv) =>
        inv.size === size ? { ...inv, ...updates } : inv
      ),
    }));
  };

  return {
    formData,
    setFormData,
    imagePreview,
    updateFormData,
    resetFormData,
    addProductImage,
    removeProductImage,
    addInventory,
    removeInventory,
    updateInventory,
  };
};

export default useProductState;
