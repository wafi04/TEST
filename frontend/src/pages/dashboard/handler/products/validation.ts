import { CreateProductType } from "../../../../types/products";

export function useProductValidation() {
  const validateStep = (step: number, formData: CreateProductType) => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 0: // Basic Information
        if (!formData.name) errors.name = "Product name is required";
        if (!formData.description)
          errors.description = "Description is required";
        if (formData.price <= 0) errors.price = "Price must be greater than 0";
        break;

      case 1: // Product Images
        if (!formData.image || formData.image === null) {
          errors.images = "At least one image is required";
        }
        break;

      case 2: // Inventory
        if (!formData.Inventory || formData.Inventory.length === 0) {
          errors.inventory = "At least one inventory item is required";
        } else {
          formData.Inventory.forEach((inv, index) => {
            if (!inv.size)
              errors[`inventory_size_${index}`] = "Size is required";
            if (inv.quantity < 0)
              errors[`inventory_quantity_${index}`] =
                "Quantity must be non-negative";
          });
        }
        break;

      default:
        break;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return { validateStep };
}
