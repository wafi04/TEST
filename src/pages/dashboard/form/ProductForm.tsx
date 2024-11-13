import React from "react";
import { ProductBasicForm } from "./Product-Basic-Form";
import { ProductImage } from "./Product-Image-Form";
import { ProductInventoryForm } from "./Product-Inventory-Form";
import {
  CATEGORY,
  GENDER,
  InventoryItem,
  ProductData,
} from "../../../types/products";

interface ProductFormStepsProps {
  step: number;
  formData: {
    category: "RUNNING" | "JORDAN" | "BASKETBALL";
    color: string;
    description: string;
    gender: GENDER;
    name: string;
    price: number;
    Inventory: InventoryItem[];
  };
  imagePreview: string | null;
  onInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onSelectChange: (field: keyof ProductData, value: string) => void;
  onImageChange: (file: File) => void;
  onImageRemove: () => void;
  onInventoryAdd: (item: InventoryItem) => void;
  onInventoryRemove: (size: string) => void;
  onInventoryUpdate: (size: string, updates: Partial<InventoryItem>) => void;
  // isUpdate: boolean;
}

export const ProductFormSteps = ({
  step,
  formData,
  imagePreview,
  onInputChange,
  onSelectChange,
  onImageChange,
  onImageRemove,
  onInventoryAdd,
  onInventoryRemove,
  onInventoryUpdate,
}: ProductFormStepsProps) => {
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <ProductBasicForm
            formData={{
              category: formData.category,
              color: formData.color,
              description: formData.description,
              gender: formData.gender,
              name: formData.name,
              price: formData.price,
            }}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
          />
        );
      case 1:
        return (
          <ProductImage
            imagePreview={imagePreview}
            onImageChange={onImageChange}
            onImageRemove={onImageRemove}
            currentImage={imagePreview}
          />
        );
      case 2:
        // Hanya render jika bukan mode update

        return (
          <ProductInventoryForm
            inventory={formData.Inventory}
            onAdd={onInventoryAdd}
            onRemove={onInventoryRemove}
            onUpdate={onInventoryUpdate}
          />
        );

        return null;
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
};
